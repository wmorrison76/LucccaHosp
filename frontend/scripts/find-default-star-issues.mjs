#!/usr/bin/env node
// Scan `src/` for import patterns that trigger
// “Importing binding name 'default' cannot be resolved by star export entries.”

import fs from "fs";
import path from "path";
import * as babel from "@babel/parser";

const ROOT = path.resolve(process.cwd(), process.argv[2] || "src");

// mirror common Vite aliases (edit if you use more)
const ALIASES = {
  "@": ROOT,
  "@components": path.join(ROOT, "components"),
  "@modules": path.join(ROOT, "modules"),
  "@assets": path.join(ROOT, "assets"),
  "@hooks": path.join(ROOT, "hooks"),
};

const EXTS = [".jsx", ".js", ".tsx", ".ts", ".mjs", ".cjs"];
const INDEX_BASENAMES = EXTS.map((e) => "index" + e);

// libs that often cause trouble with default / star re-exports
const LIBS_TO_WARN = [/^react-rnd$/, /^react-grid-layout$/, /^react-icons\//, /^lucide-react$/];

function *walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name.startsWith(".")) continue;
      yield* walk(p);
    } else if (/\.(m?jsx?|tsx?)$/.test(ent.name)) {
      yield p;
    }
  }
}
const read = (p) => { try { return fs.readFileSync(p, "utf8"); } catch { return ""; } };

function resolveAlias(fromFile, spec) {
  for (const [alias, base] of Object.entries(ALIASES)) {
    if (spec === alias || spec.startsWith(alias + "/")) {
      const rest = spec.slice(alias.length).replace(/^\//, "");
      return path.join(base, rest);
    }
  }
  if (spec.startsWith("./") || spec.startsWith("../")) {
    return path.resolve(path.dirname(fromFile), spec);
  }
  return null; // package import
}
function findIndexFile(dir) {
  for (const b of INDEX_BASENAMES) {
    const p = path.join(dir, b);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}
function isStarOnlyBarrel(code) {
  const hasStar = /export\s*\*\s*from\s*['"][^'"]+['"]/.test(code);
  const forwardsDefault = /export\s*\{\s*default\s+as\s+[\w$]+\s*\}\s*from\s*['"][^'"]+['"]/.test(code);
  const hasOwnDefault = /export\s+default\s+/.test(code);
  return hasStar && !forwardsDefault && !hasOwnDefault;
}

function parse(code, file) {
  try {
    return babel.parse(code, {
      sourceType: "module",
      sourceFilename: file,
      plugins: ["jsx", "typescript", "classProperties", "objectRestSpread"],
    });
  } catch { return null; }
}

const issues = [];
for (const file of walk(ROOT)) {
  const code = read(file);
  const ast = parse(code, file);
  if (!ast) continue;

  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration") continue;
    const spec = node.source.value;
    const line = node.loc?.start?.line ?? 0;

    const hasCurlyDefault = node.specifiers.some(
      (s) => s.type === "ImportSpecifier" && s.imported?.name === "default"
    );
    const hasDefaultImport = node.specifiers.some((s) => s.type === "ImportDefaultSpecifier");

    // 1) import { default as X } from '...'
    if (hasCurlyDefault) {
      issues.push({ type: "CurlyDefault", file, line, spec,
        hint: "Avoid `import { default as X } ...`; import the concrete file or named export." });
    }

    // 2) default import from libs known to be re-exported/mixed
    if (hasDefaultImport && LIBS_TO_WARN.some((r) => r.test(spec))) {
      issues.push({ type: "DefaultFromLib", file, line, spec,
        hint: "Avoid default import; use named or tolerant pattern." });
    }

    // 3) default import from a directory whose index only `export *`
    if (hasDefaultImport) {
      const resolved = resolveAlias(file, spec);
      if (resolved && fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
        const idx = findIndexFile(resolved);
        if (idx && isStarOnlyBarrel(read(idx))) {
          issues.push({ type: "DefaultFromStarBarrel", file, line, spec, indexFile: idx,
            hint: "Default import via a star-only barrel. Import the concrete file or re-export default explicitly." });
        }
      }
    }
  }
}

// List star-only barrels so you know which folders can't forward defaults
const barrels = [];
for (const file of walk(ROOT)) {
  if (!/index\.(m?jsx?|tsx?)$/.test(file)) continue;
  if (isStarOnlyBarrel(read(file))) barrels.push(file);
}

function rel(p) { return path.relative(process.cwd(), p) || p; }

if (!issues.length && !barrels.length) {
  console.log(`✅ No obvious default-from-star-export hazards in ${rel(ROOT)}`);
  process.exit(0);
}
for (const it of issues) {
  console.log(`❗ ${it.type.padEnd(22)} ${rel(it.file)}:${it.line}\n   import from: "${it.spec}"`);
  if (it.indexFile) console.log(`   index: ${rel(it.indexFile)}`);
  console.log(`   hint: ${it.hint}\n`);
}
if (barrels.length) {
  console.log("ℹ️ Star-only barrels (these don't forward default):");
  for (const b of barrels) console.log("   - " + rel(b));
}
