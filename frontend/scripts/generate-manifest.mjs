#!/usr/bin/env node
/**
 * LUCCCA Project Manifest Generator — Alias-Aware
 *
 * Outputs (under --out, default ./manifest):
 *   - manifest.json           All files with {path, kind, mime, size, sha256, mtime}
 *   - manifest.csv            CSV of the same
 *   - dependencies.json       package.json deps/devDeps/scripts
 *   - import-graph.json       Per-file imports WITH alias/relative resolution
 *   - summary.md              Human-readable summary
 *
 * Alias resolution priority:
 *   1) CLI:   --alias @=src,~=/absolute/shared
 *   2) Vite:  vite.config.[js|ts|mjs|cjs]  (alias: {...} or alias: [{find,replacement}])
 *   3) Fallback: '@' → <root>/src  (if folder exists)
 *
 * Usage (from LUCCCA/frontend):
 *   node scripts/generate-manifest.mjs --out manifest
 *   node scripts/generate-manifest.mjs --out manifest --alias @=src,~=/shared
 */

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import crypto from "crypto";
import os from "os";
import { fileURLToPath } from "url";

// ───────────────── CLI ─────────────────
const args = process.argv.slice(2);
const getArg = (name, def = undefined) => {
  const i = args.findIndex(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return def;
  const a = args[i];
  if (a.includes("=")) return a.split("=")[1];
  const next = args[i + 1];
  return next && !next.startsWith("--") ? next : true;
};

const ROOT = path.resolve(getArg("root", "."));
const OUT  = path.resolve(getArg("out", "manifest"));
const aliasCLI = String(getArg("alias", "") || "").trim();

// Default excludes
const DEFAULT_EXCLUDES = [
  "node_modules", ".git", ".svn", ".hg",
  "dist", "build", ".next", ".turbo", ".svelte-kit", ".cache",
  ".vercel", ".netlify", ".output", ".vite",
  "coverage", ".nyc_output",
  ".DS_Store"
];

const extraExcludesArg = getArg("exclude", "");
const EXTRA_EXCLUDES = extraExcludesArg
  ? extraExcludesArg.split(",").map(s => s.trim()).filter(Boolean)
  : [];
const EXCLUDES = new Set([...DEFAULT_EXCLUDES, ...EXTRA_EXCLUDES]);

// ───────────────── Kinds/MIME ─────────────────
const KIND = {
  code:   new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".json", ".vue", ".svelte"]),
  style:  new Set([".css", ".scss", ".less"]),
  assets: new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".mp4", ".mov", ".mp3", ".wav", ".woff", ".woff2", ".ttf", ".eot", ".otf"]),
  html:   new Set([".html", ".htm"]),
  text:   new Set([".md", ".txt", ".csv", ".yml", ".yaml", ".env", ".env.local", ".env.development", ".env.production"]),
};

const MIME = {
  ".html": "text/html", ".htm": "text/html",
  ".js": "application/javascript", ".mjs": "application/javascript", ".cjs": "application/javascript",
  ".jsx": "text/jsx", ".ts": "text/typescript", ".tsx": "text/tsx",
  ".json": "application/json", ".vue": "text/vue", ".svelte": "text/svelte",
  ".css": "text/css", ".scss": "text/x-scss", ".less": "text/x-less",
  ".md": "text/markdown", ".txt": "text/plain", ".csv": "text/csv",
  ".yml": "text/yaml", ".yaml": "text/yaml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".mov": "video/quicktime", ".mp3": "audio/mpeg", ".wav": "audio/wav",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".eot": "application/vnd.ms-fontobject", ".otf": "font/otf",
  ".env": "text/plain"
};

const classify = (ext) => {
  if (KIND.code.has(ext))   return "code";
  if (KIND.style.has(ext))  return "style";
  if (KIND.assets.has(ext)) return "asset";
  if (KIND.html.has(ext))   return "html";
  if (KIND.text.has(ext))   return "text";
  return "other";
};
const mimeOf = (ext) => MIME[ext] || "application/octet-stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ───────────────── Utils ─────────────────
const sha256File = async (absPath) => {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(absPath);
  return new Promise((resolve, reject) => {
    stream.on("data", (d) => hash.update(d));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
};

const isExcluded = (rel) => {
  const parts = rel.split(path.sep);
  return parts.some(p => EXCLUDES.has(p));
};

const walk = async (rootDir) => {
  const out = [];
  const stack = [rootDir];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try { entries = await fsp.readdir(dir, { withFileTypes: true }); } catch { continue; }
    for (const ent of entries) {
      const abs = path.join(dir, ent.name);
      const rel = path.relative(ROOT, abs);
      if (isExcluded(rel)) continue;
      if (ent.isDirectory()) stack.push(abs);
      else if (ent.isFile()) out.push(abs);
    }
  }
  return out;
};

// import detection
const importRegexes = [
  /import\s+(?:[\w*\s{},]*\s+from\s+)?["']([^"']+)["']/g,
  /export\s+[^'"]*from\s+["']([^"']+)["']/g,
  /require\(\s*["']([^"']+)["']\s*\)/g,
  /import\(\s*["']([^"']+)["']\s*\)/g
];

// Try to resolve a specifier to a file on disk
const RESOLVE_EXTS = [".js",".jsx",".ts",".tsx",".mjs",".cjs",".json",".css",".scss",".less"];
async function resolveToFile(absBaseDir, spec) {
  // Absolute path (starts with /)
  if (path.isAbsolute(spec)) {
    const cand = await tryFileVariants(spec);
    return cand;
  }
  // Relative path
  if (spec.startsWith("./") || spec.startsWith("../")) {
    const abs = path.resolve(absBaseDir, spec);
    const cand = await tryFileVariants(abs);
    return cand;
  }
  return null; // package or alias (handled elsewhere)
}

async function tryFileVariants(absPathNoExtMaybe) {
  // If exact file exists
  try {
    const st = await fsp.stat(absPathNoExtMaybe);
    if (st.isFile()) return absPathNoExtMaybe;
  } catch {}

  const dirname = absPathNoExtMaybe;
  // If dir with index
  try {
    const st = await fsp.stat(dirname);
    if (st.isDirectory()) {
      for (const ext of RESOLVE_EXTS) {
        const p = path.join(dirname, `index${ext}`);
        try { const s = await fsp.stat(p); if (s.isFile()) return p; } catch {}
      }
    }
  } catch {}

  // Try with extensions
  for (const ext of RESOLVE_EXTS) {
    const p = absPathNoExtMaybe + ext;
    try { const s = await fsp.stat(p); if (s.isFile()) return p; } catch {}
  }
  return null;
}

// ───────────────── Alias loading ─────────────────
function parseAliasCLI(str) {
  // "@=src,~=/shared" → { "@": "<root>/src", "~": "/shared" (if absolute) }
  const map = {};
  if (!str) return map;
  for (const entry of str.split(",")) {
    const [find, replRaw] = entry.split("=").map(s => s?.trim()).filter(Boolean);
    if (!find || !replRaw) continue;
    const repl = replRaw.startsWith("/")
      ? replRaw
      : path.resolve(ROOT, replRaw);
    map[find] = repl;
  }
  return map;
}

async function parseViteAliases() {
  const candidates = ["vite.config.js", "vite.config.ts", "vite.config.mjs", "vite.config.cjs"];
  for (const fname of candidates) {
    const full = path.join(ROOT, fname);
    try {
      const txt = await fsp.readFile(full, "utf8");
      // Handle array form: alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }, ...]
      const arrMatches = [...txt.matchAll(/alias\s*:\s*\[\s*([\s\S]*?)\]/g)];
      const map = {};
      for (const m of arrMatches) {
        const body = m[1];
        const items = body.matchAll(/\{\s*find\s*:\s*['"]([^'"]+)['"]\s*,\s*replacement\s*:\s*([^\}]+)\}/g);
        for (const it of items) {
          const find = it[1];
          const repExpr = it[2].trim();
          const repPath = guessReplacement(repExpr);
          if (repPath) map[find] = repPath;
        }
      }
      // Handle object form: alias: { '@': path.resolve(__dirname,'src'), 'react': 'preact/compat', ... }
      const objMatch = txt.match(/alias\s*:\s*\{([\s\S]*?)\}/m);
      if (objMatch) {
        const body = objMatch[1];
        const pairs = body.matchAll(/['"]([^'"]+)['"]\s*:\s*([^,}]+)/g);
        for (const p of pairs) {
          const find = p[1];
          const repExpr = p[2].trim();
          const repPath = guessReplacement(repExpr);
          if (repPath) map[find] = repPath;
        }
      }
      // Only return if we found something
      if (Object.keys(map).length) return map;
    } catch {}
  }
  return {};
}

function guessReplacement(expr) {
  // crude resolver: if it looks like path.resolve(__dirname, 'src'[, ...])
  // or a quoted string path.
  const strLit = expr.match(/^['"]([^'"]+)['"]$/);
  if (strLit) {
    const val = strLit[1];
    return val.startsWith("/")
      ? val
      : path.resolve(ROOT, val);
  }
  const resMatch = expr.match(/path\.resolve\(\s*__dirname\s*,\s*['"]([^'"]+)['"](.*?)\)/);
  if (resMatch) {
    const seg1 = resMatch[1];
    // Ignore additional segments for simplicity; most configs use one segment ('src')
    return path.resolve(ROOT, seg1);
  }
  // Could be import.meta.dirname or other expressions — best effort:
  const srcHint = expr.includes("'src'") || expr.includes('"src"');
  if (srcHint) return path.resolve(ROOT, "src");
  return null;
}

async function loadAliases() {
  // 1) CLI
  const fromCLI = parseAliasCLI(aliasCLI);

  // 2) Vite config
  const fromVite = await parseViteAliases();

  // 3) Fallback @ → src
  const fallback = {};
  try {
    const srcStat = await fsp.stat(path.join(ROOT, "src"));
    if (srcStat.isDirectory()) fallback["@"] = path.join(ROOT, "src");
  } catch {}

  // Merge (CLI highest priority)
  return { ...fallback, ...fromVite, ...fromCLI };
}

// Resolve alias in a spec (e.g., '@/foo' with '@'→'<root>/src')
function replaceAlias(spec, aliasMap) {
  const keys = Object.keys(aliasMap).sort((a,b) => b.length - a.length); // longest first
  for (const k of keys) {
    if (spec === k || spec.startsWith(k + "/")) {
      const rest = spec.slice(k.length);
      const abs = path.resolve(aliasMap[k], "." + rest);
      return abs;
    }
  }
  return null;
}

// ───────────────── Main ─────────────────
(async () => {
  await fsp.mkdir(OUT, { recursive: true });

  // deps
  const pkgPath = path.join(ROOT, "package.json");
  let pkg = {};
  try { pkg = JSON.parse(await fsp.readFile(pkgPath, "utf8")); } catch {}
  const dependencies = {
    name: pkg.name,
    version: pkg.version,
    packageManager: pkg.packageManager || null,
    dependencies: pkg.dependencies || {},
    devDependencies: pkg.devDependencies || {},
    scripts: pkg.scripts || {},
  };
  await fsp.writeFile(path.join(OUT, "dependencies.json"), JSON.stringify(dependencies, null, 2), "utf8");

  // aliases
  const aliasMap = await loadAliases();

  // files
  const files = await walk(ROOT);
  const records = [];
  const graph = {}; // { [relativeFile]: Array<{ raw, type, resolvedAbs?, resolvedRel? }> }

  for (const abs of files) {
    const rel = path.relative(ROOT, abs);
    let stat; try { stat = await fsp.stat(abs); } catch { continue; }
    const ext  = path.extname(abs).toLowerCase();
    const kind = classify(ext);
    const mime = mimeOf(ext);
    const size = stat.size;
    const mtime = stat.mtime.toISOString();
    const sha256 = await sha256File(abs);

    records.push({ relative: rel, absolute: abs, kind, ext, mime, size, sha256, mtime });

    if ([".js",".jsx",".ts",".tsx",".mjs",".cjs"].includes(ext)) {
      let src = "";
      try { src = await fsp.readFile(abs, "utf8"); } catch {}
      const imports = [];
      for (const rx of importRegexes) {
        rx.lastIndex = 0;
        let m;
        while ((m = rx.exec(src))) {
          const raw = m[1];
          let entry = { raw, type: "pkg" }; // default: package

          // alias?
          const aliasedAbs = replaceAlias(raw, aliasMap);
          if (aliasedAbs) {
            const hit = await tryFileVariants(aliasedAbs) || aliasedAbs; // keep path even if not found
            entry = {
              raw,
              type: "alias",
              resolvedAbs: hit,
              resolvedRel: path.relative(ROOT, hit)
            };
            imports.push(entry);
            continue;
          }

          // relative/absolute file?
          if (raw.startsWith("./") || raw.startsWith("../") || raw.startsWith("/")) {
            const baseDir = path.dirname(abs);
            const resolved = await resolveToFile(baseDir, raw);
            if (resolved) {
              entry = {
                raw,
                type: raw.startsWith("/") ? "abs" : "rel",
                resolvedAbs: resolved,
                resolvedRel: path.relative(ROOT, resolved)
              };
            } else {
              // keep unresolved attempt to help scanner
              entry = {
                raw,
                type: raw.startsWith("/") ? "abs" : "rel",
                resolvedAbs: null,
                resolvedRel: null
              };
            }
          }

          imports.push(entry);
        }
      }
      graph[rel] = imports;
    }
  }

  // manifest.json
  const manifest = {
    generatedAt: new Date().toISOString(),
    host: os.hostname(),
    root: ROOT,
    excludes: Array.from(EXCLUDES),
    aliasMap,
    totals: {
      files: records.length,
      bytes: records.reduce((a, r) => a + (r.size || 0), 0),
      byKind: records.reduce((acc, r) => ((acc[r.kind]=(acc[r.kind]||0)+1), acc), {})
    },
    files: records
  };
  await fsp.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

  // manifest.csv
  const header = ["relative","absolute","kind","ext","mime","size","sha256","mtime"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csvBody = records.map(r => header.map(h => esc(r[h])).join(",")).join("\n");
  const csv = header.join(",") + "\n" + csvBody + "\n";
  await fsp.writeFile(path.join(OUT, "manifest.csv"), csv, "utf8");

  // import-graph.json (enhanced)
  await fsp.writeFile(path.join(OUT, "import-graph.json"), JSON.stringify(graph, null, 2), "utf8");

  // summary.md
  const md = [
    `# LUCCCA Manifest`,
    ``,
    `- Generated: \`${manifest.generatedAt}\``,
    `- Root: \`${manifest.root}\``,
    `- Files: **${manifest.totals.files}** | Bytes: **${manifest.totals.bytes.toLocaleString()}**`,
    `- Excludes: ${manifest.excludes.map(e => `\`${e}\``).join(", ")}`,
    ``,
    `## Alias Map`,
    ...Object.entries(aliasMap).map(([k,v]) => `- \`${k}\` → \`${v}\``),
    ``,
    `## Counts by kind`,
    ...Object.entries(manifest.totals.byKind).map(([k,v]) => `- ${k}: ${v}`),
    ``,
    `## Outputs`,
    `- \`manifest.json\` – files (paths, hashes, kind, mime) + aliasMap`,
    `- \`manifest.csv\` – spreadsheet/ingest`,
    `- \`dependencies.json\` – package.json deps/devDeps/scripts`,
    `- \`import-graph.json\` – imports with {raw,type,resolvedAbs,resolvedRel}`,
    ``
  ].join("\n");
  await fsp.writeFile(path.join(OUT, "summary.md"), md, "utf8");

  console.log(`\n✅ Manifest written to: ${OUT}`);
  console.log(`   - manifest.json`);
  console.log(`   - manifest.csv`);
  console.log(`   - dependencies.json`);
  console.log(`   - import-graph.json`);
  console.log(`   - summary.md\n`);
})().catch((err) => {
  console.error("Manifest generation failed:", err);
  process.exit(1);
});
