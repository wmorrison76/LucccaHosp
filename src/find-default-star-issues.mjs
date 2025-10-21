#!/usr/bin/env node
// Scan `src/` for imports that can trigger
// "Importing binding name 'default' cannot be resolved by star export entries."

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as babel from "@babel/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(process.cwd(), process.argv[2] || "src");

// Mirror your vite aliases (add more if you use them)
const ALIASES = {
  "@": ROOT,
  "@components": path.join(ROOT, "components"),
  "@modules": path.join(ROOT, "modules"),
  "@assets": path.join(ROOT, "assets"),
  "@hooks": path.join(ROOT, "hooks"),
};

const EXTS = [".jsx", ".js", ".tsx", ".ts", ".mjs", ".cjs"];
const INDEX_BASENAMES = EXTS.map((e) => "index" + e);

// libs that are commonly re-exported or have mixed ESM/CJS shapes
const LIBS_TO_WARN_ON_DEFAULT = [
  /^react-rnd$/,
  /^react-grid-layout$/,
  /^react-icons\//,
  /^lucide-react$/,
];

function *walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      // skip node_modules if someone placed src under it
      if (ent.name === "node_modules" || ent.name.startsWith(".")) continue;
      yield* walk(p);
    } else if (/\.(m?jsx?|tsx?)$/.test(ent.name)) {
      yield p;
    }
  }
}

function read(p) {
  try { return fs.readFileSync(p, "utf8"); } catch { return null; }
}

function resolveWithExt(p) {
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  for (const ext of EXTS) {
    const cand = p + ext;
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

function resolveAlias(fromFile, spec) {
  if (!spec) return null;
  // alias like "@/x/y"
  for (const [alias, base] of Object.entries(ALIASES)) {
    if (spec === alias || spec.startsWith(alias + "/")) {
      const rest = spec.slice(alias.length).replace(/^\//, "");
      return path.join(base, rest);
    }
  }
  // relative
  if (spec.startsWith("./") || spec.startsWith("../")) {
    return path.resolve(path.dirname(fromFile), spec);
  }
  return null; // package import
}

function findIndexFile(dir) {
  for (const name of INDEX_BASENAMES) {
    const p = path.join(dir, name);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

function looksLikeStarOnlyBarrel(code) {
  // crude but effective: has at least one `export * from` and
  // does NOT have an explicit default passthrough
  const hasStar = /export\s*\*\s*from\s*['"][^'"]+['"]/.test(code);
  const forwardsDefault = /export\s*\{\s*default\s+as\s+[\w$]+\s*\}\s*from\s*['"][^'"]+['"]/.test(code);
  const hasOwnDefault = /export\s+default\s+/.test(code);
  return hasStar && !forwardsDefault && !hasOwnDefault;
}

function parse(src, file) {
  try {
    return babel.parse(src, {
      sourceType: "module",
      sourceFilename: file,
      plugins: [
        "jsx",
        "typescript",
        ["decorators", { decoratorsBeforeExport: true }],
        "classProperties",
        "objectRestSpread",
        "importAssertions",
        "topLevelAwait",
      ],
    });
  } catch (e) {
    return null;
  }
}

const issues = [];

for (const file of walk(ROOT)) {
  const code = read(file);
  if (!code) continue;

  const ast = parse(code, file);
  if (!ast) continue;

  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration") continue;

    const spec = node.source.value;
    const line = node.loc?.start?.line ?? 0;
    const col  = node.loc?.start?.column ?? 0;

    const hasCurlyDefault =
      node.specifiers.some((s) => s.type === "ImportSpecifier" && s.imported && s.imported.name === "default");

    const hasDefaultImport =
      node.specifiers.some((s) => s.type === "ImportDefaultSpecifier");

    // (1) import { default as X } from '...'
    if (hasCurlyDefault) {
      issues.push({
        type: "CurlyDefault",
        file, line, col, spec,
        hint: "Avoid `import { default as X } ...`; import the named export or the concrete file."
      });
    }

    // (2) default import from known-problem libs
    if (hasDefaultImport && LIBS_TO_WARN_ON_DEFAULT.some((r) => r.test(spec))) {
      issues.push({
        type: "DefaultFromLib",
        file, line, col, spec,
        hint: "Avoid default import from this package; prefer named import or a tolerant pattern."
      });
    }

    // (3) default import from a directory barrel that only does export *
    if (hasDefaultImport) {
      const resolved = resolveAlias(file, spec);
      if (resolved && fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
        const idx = findIndexFile(resolved);
        if (idx) {
          const idxCode = read(idx) || "";
          if (looksLikeStarOnlyBarrel(idxCode)) {
            issues.push({
              type: "DefaultFromStarBarrel",
              file, line, col, spec,
              indexFile: idx,
              hint: "Default import comes from a folder index that only `export *`—defaults are not forwarded."
            });
          }
        }
      }
    }

    // (4) import from alias/relative path with no filename (likely folder) — heuristic
    if (hasDefaultImport && !/\.[mc]?[tj]sx?$/.test(spec)) {
      const resolved = resolveAlias(file, spec);
      if (resolved && fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
        const idx = findIndexFile(resolved);
        if (!idx) {
          issues.push({
            type: "DefaultFromDirNoIndex",
            file, line, col, spec,
            hint: "Default import from a directory with no index file (or unsupported extension)."
          });
        }
      }
    }
  }
}

// Additionally, list all star-only barrels (so you know which folders can't forward default)
const starBarrels = [];
for (const file of walk(ROOT)) {
  if (!/index\.(m?jsx?|tsx?)$/.test(file)) continue;
  const code = read(file) || "";
  if (looksLikeStarOnlyBarrel(code)) {
    starBarrels.push(file);
  }
}

function rel(p) { return path.relative(process.cwd(), p) || p; }

if (!issues.length && !starBarrels.length) {
  console.log(`✅ No obvious default-from-star-export hazards found under ${rel(ROOT)}`);
  process.exit(0);
}

for (const it of issues) {
  const pos = `${rel(it.file)}:${it.line}:${it.col}`;
  const extra = it.indexFile ? `  (index: ${rel(it.indexFile)})` : "";
  console.log(`❗ ${it.type.padEnd(24)} ${pos}\n    import source: "${it.spec}"${extra}\n    hint: ${it.hint}\n`);
}

if (starBarrels.length) {
  console.log("ℹ️  Star-only barrels (these don't forward defaults):");
  for (const f of starBarrels) console.log("   - " + rel(f));
}
