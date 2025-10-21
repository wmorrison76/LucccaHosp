#!/usr/bin/env node
import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const SRC = path.join(projectRoot, "src");
const DRY_RUN = process.argv.includes("--dry-run");

const exts = new Set([".js", ".jsx", ".ts", ".tsx"]);
const ignoreDirs = new Set(["node_modules", "dist", "build", ".next", ".git"]);
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (exts.has(path.extname(entry.name))) files.push(p);
  }
}

function toAtAlias(fromFile, spec) {
  if (!spec.startsWith(".")) return null; // only rewrite relatives
  const absTarget = path.resolve(path.dirname(fromFile), spec);
  if (!absTarget.startsWith(SRC)) return null; // don’t cross src boundary

  // map to src-relative
  let relFromSrc = absTarget.slice(SRC.length + 1).replaceAll("\\", "/");

  // prefer directory index if present
  if (fs.existsSync(absTarget) && fs.statSync(absTarget).isDirectory()) {
    const idx = ["index.tsx","index.ts","index.jsx","index.js"].some(f => fs.existsSync(path.join(absTarget, f)));
    if (idx) return "@/" + relFromSrc;
  }
  const ext = path.extname(relFromSrc);
  if (exts.has(ext)) relFromSrc = relFromSrc.slice(0, -ext.length);

  return "@/" + relFromSrc;
}

const SPEC_REGEX =
  /(import\s+[^'"]*?\sfrom\s*|export\s+(?:\*\s+from|{[\s\S]*?}\s+from)\s*|import\s*\()\s*['"]([^'"]+)['"]/g;

function rewrite(content, filePath) {
  return content.replace(SPEC_REGEX, (m, lead, spec) => {
    const aliased = toAtAlias(filePath, spec);
    if (!aliased) return m;
    return `${lead}"${aliased}"`;
  });
}

walk(SRC);

let changed = 0, scanned = 0;
for (const f of files) {
  scanned++;
  const before = fs.readFileSync(f, "utf8");
  const after = rewrite(before, f);
  if (after !== before) {
    changed++;
    if (DRY_RUN) {
      console.log(`[DRY] Would change: ${path.relative(projectRoot, f)}`);
    } else {
      fs.writeFileSync(f + ".bak", before, "utf8");
      fs.writeFileSync(f, after, "utf8");
      console.log(`Updated: ${path.relative(projectRoot, f)} (+ .bak)`);
    }
  }
}

console.log(`${DRY_RUN ? "Dry run complete." : "Done."} Scanned ${scanned} files; ${changed} ${DRY_RUN ? "would change" : "changed"}.`);
