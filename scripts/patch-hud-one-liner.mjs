// scripts/patch-hud-one-liner.mjs
// Usage examples:
//   node scripts/patch-hud-one-liner.mjs --scan
//   node scripts/patch-hud-one-liner.mjs --file frontend/src/components/EchoBackboard.jsx
//   node scripts/patch-hud-one-liner.mjs --file=frontend/src/components/EchoBackboard.jsx --setter mySetter
//   node scripts/patch-hud-one-liner.mjs --file frontend/src/components/EchoBackboard.jsx --no-alias
//
// What it does:
//   - Adds:   import { useHudAddListener } from "@/lib/hudBus";
//   - Adds:   useHudAddListener(<setter>);
//   - If --no-alias is set, it writes a relative import instead of "@/lib/hudBus".
//   - Idempotent (safe to re-run).

import fs from "fs";
import path from "path";

function parseArgs(argv){
  const out = { _: [] };
  for (let i = 2; i < argv.length; i++){
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k,v] = a.includes("=") ? a.slice(2).split("=",2) : [a.slice(2), null];
      if (v !== null) out[k] = v;
      else if (i+1 < argv.length && !argv[i+1].startsWith("--")) { out[k] = argv[++i]; }
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

const args = parseArgs(process.argv);
const SETTER = args.setter || process.env.WIDGET_SETTER || "setHudWidgets";
const NO_ALIAS = !!args["no-alias"];

function findRoot(start){
  let p = start;
  for (let i=0;i<6;i++){
    if (fs.existsSync(path.join(p,"frontend","src"))) return p;
    const up = path.dirname(p); if (up===p) break; p = up;
  }
  throw new Error("Cannot find repo root (needs frontend/src)");
}
const root = findRoot(process.cwd());
const FRONT = path.join(root, "frontend", "src");

function rel(p){ return path.relative(root, p); }

// scan for files containing the setter name
function scanForSetter(){
  const hits = [];
  function walk(dir){
    for (const name of fs.readdirSync(dir)){
      const p = path.join(dir, name);
      const s = fs.statSync(p);
      if (s.isDirectory()) { walk(p); continue; }
      if (!/\.(jsx?|tsx?)$/.test(name)) continue;
      const text = fs.readFileSync(p, "utf8");
      if (text.includes(SETTER)) hits.push(p);
    }
  }
  walk(FRONT);
  return hits;
}

if (args.scan) {
  const hits = scanForSetter();
  if (hits.length === 0) {
    console.log(`No files mention '${SETTER}'. Try --setter <name> or pass --file.`);
  } else {
    console.log(`Files containing '${SETTER}':`);
    for (const h of hits) console.log(" -", rel(h));
  }
  process.exit(0);
}

let target = args.file;
if (!target) {
  const hits = scanForSetter();
  if (hits.length === 0) {
    console.error(`! Could not auto-find a file containing '${SETTER}'.`);
    console.error("  Use --scan to list candidates or pass --file <path> explicitly.");
    process.exit(1);
  }
  target = hits[0];
}

if (!path.isAbsolute(target)) target = path.join(root, target);
if (!fs.existsSync(target)) {
  console.error("! File not found:", rel(target));
  process.exit(1);
}

let src = fs.readFileSync(target, "utf8");

// pick import path
let importPath = "@/lib/hudBus";
if (NO_ALIAS) {
  // compute relative path from target file to frontend/src/lib/hudBus.js
  const libFile = path.join(FRONT, "lib", "hudBus.js");
  importPath = path.relative(path.dirname(target), libFile).replace(/\\/g, "/");
  if (!importPath.startsWith(".")) importPath = "./" + importPath;
}

// 1) ensure import exists
const importLine = `import { useHudAddListener } from "${importPath}";`;
if (!src.includes("useHudAddListener") && !src.includes("lib/hudBus")) {
  const lines = src.split("\n");
  let lastImport = -1;
  for (let i=0;i<lines.length;i++) if (/^\s*import\s+/.test(lines[i])) lastImport = i;
  const insertAt = lastImport >= 0 ? lastImport + 1 : 0;
  lines.splice(insertAt, 0, importLine);
  src = lines.join("\n");
  console.log("~ added import:", importLine);
} else {
  // if user switches from alias to no-alias, rewrite import line
  if (NO_ALIAS && src.includes("@/lib/hudBus")) {
    src = src.replace(/import\s+\{\s*useHudAddListener\s*\}\s+from\s+["']@\/lib\/hudBus["'];?/, importLine);
    console.log("~ rewrote import to relative:", importPath);
  } else {
    console.log("= import already present");
  }
}

// 2) ensure hook call exists
const hookRegex = new RegExp(`useHudAddListener\\s*\\(\\s*${SETTER}\\s*\\)`);
if (!hookRegex.test(src)) {
  const lines = src.split("\n");
  let injectAt = -1;
  for (let i=0;i<lines.length;i++){
    if (lines[i].includes(SETTER)) { injectAt = i + 1; break; }
  }
  if (injectAt < 0) {
    for (let i=0;i<lines.length;i++) if (/\buseEffect\s*\(/.test(lines[i])) { injectAt = i; break; }
  }
  if (injectAt < 0) {
    let lastImport = -1;
    for (let i=0;i<lines.length;i++) if (/^\s*import\s+/.test(lines[i])) lastImport = i;
    injectAt = (lastImport >= 0 ? lastImport + 1 : 0) + 1;
  }
  lines.splice(injectAt, 0, `useHudAddListener(${SETTER});`);
  src = lines.join("\n");
  console.log(`~ added hook: useHudAddListener(${SETTER});`);
} else {
  console.log("= hook already present");
}

fs.writeFileSync(target, src, "utf8");
console.log("✓ patched", rel(target));
