#!/usr/bin/env node
import fg from "fast-glob";
import { init, parse } from "es-module-lexer";
import fs from "node:fs/promises";
import pc from "picocolors";
import path from "node:path";

const ROOT = process.cwd();
const SRC  = path.join(ROOT, "src");
const ENTRY = ["src/main.jsx", "src/App.jsx"];

await init;

const files = await fg(["src/**/*.{js,jsx,ts,tsx}"], { dot: false, ignore: ["**/__tests__/**", "**/*.d.ts"] });
const codeBy = new Map();
for (const f of files) {
  try { codeBy.set(f, await fs.readFile(f, "utf8")); }
  catch {}
}

const edges = new Map();
for (const f of files) {
  const code = codeBy.get(f) || "";
  const [imports] = parse(code);
  const out = new Set();
  for (const imp of imports) {
    let s = code.slice(imp.s, imp.e).trim();
    if (!s || s.startsWith("http")) continue;
    if (!s.startsWith(".") && !s.startsWith("/")) continue;
    const abs = path.normalize(path.join(path.dirname(f), s));
    const target = resolveToFile(abs, files);
    if (target) out.add(target);
  }
  edges.set(f, out);
}

function resolveToFile(abs, all) {
  const candidates = [
    abs, `${abs}.js`, `${abs}.jsx`, `${abs}.ts`, `${abs}.tsx`,
    path.join(abs, "index.js"), path.join(abs, "index.jsx"),
  ].map((p) => p.replaceAll("\\", "/"));
  return candidates.find((c) => all.includes(c));
}

const roots = ENTRY.filter((e) => files.includes(e));
const seen = new Set();
function dfs(f) {
  if (seen.has(f)) return;
  seen.add(f);
  const deps = edges.get(f) ?? new Set();
  for (const d of deps) dfs(d);
}
for (const r of roots) dfs(r);

const orphans = files.filter((f) => !seen.has(f));

console.log(pc.cyan(pc.bold("ZARO scan")) + " • " + pc.dim(new Date().toLocaleString()));
console.log(pc.bold("Roots:"));
for (const r of roots) console.log("  - " + pc.green(r));
console.log("");

console.log(pc.bold("Unreferenced modules (orphans):"));
if (orphans.length === 0) console.log(pc.gray("  (none)"));
else orphans.forEach((f) => console.log("  - " + pc.yellow(f)));

console.log("\n" + pc.bold("Summary:"));
console.log("  Files:", files.length);
console.log("  Reachable:", seen.size);
console.log("  Orphans:", orphans.length);
