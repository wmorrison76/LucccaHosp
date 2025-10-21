// scripts/patch-hud-auto.mjs
// Usage examples:
//   node scripts/patch-hud-auto.mjs               # scan & patch first good match
//   node scripts/patch-hud-auto.mjs --dry         # scan only, print what it would do
//   node scripts/patch-hud-auto.mjs --file path/to/Hud.jsx  # patch specific file
//   node scripts/patch-hud-auto.mjs --no-alias    # use relative import instead of "@/lib/hudBus"
//
// What it does:
//   - Finds React state like: const [widgets, setWidgets] = useState(...)
//     (also matches 'cards' and 'panels')
//   - Inserts: import { useHudAddListener } from "<alias or relative>/lib/hudBus";
//   - Inserts: useHudAddListener(<detectedSetter>);

import fs from "fs";
import path from "path";

function findRoot(start){
  let p = start;
  for (let i=0;i<6;i++){
    if (fs.existsSync(path.join(p, "frontend", "src"))) return p;
    const up = path.dirname(p); if (up===p) break; p = up;
  }
  throw new Error("Cannot find repo root (needs frontend/src)");
}
const args = Object.fromEntries(
  process.argv.slice(2).map((a,i,arr)=>{
    if (!a.startsWith("--")) return [`_${i}`, a];
    if (a.includes("=")){ const [k,v] = a.slice(2).split("=",2); return [k,v]; }
    // support --flag value
    const k = a.slice(2); const v = (arr[i+1] && !arr[i+1].startsWith("--")) ? arr[i+1] : true;
    return [k,v];
  })
);

const root  = findRoot(process.cwd());
const FRONT = path.join(root, "frontend", "src");
const DRY   = !!args.dry;
const NO_ALIAS = !!args["no-alias"];

const HUD_BUS_ABS = path.join(FRONT, "lib", "hudBus.js");

function rel(p){ return path.relative(root, p); }

function findCandidates(){
  const hits = [];
  function walk(dir){
    for (const name of fs.readdirSync(dir)){
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) { walk(p); continue; }
      if (!/\.(jsx?|tsx?)$/.test(name)) continue;
      if (/\/lib\/hudBus\.(j|t)sx?$/.test(p)) continue; // skip our bus
      const text = fs.readFileSync(p, "utf8");
      // Find: const [widgets, setWidgets] = useState(   or cards/panels
      const m = text.match(/const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*([a-zA-Z0-9_$]+)\s*\]\s*=\s*useState\s*\(/);
      if (!m) continue;
      const stateName = m[1].toLowerCase();
      if (/(widgets|cards|panels)/.test(stateName)) {
        hits.push({ file:p, setter:m[2], state:m[1] });
      }
    }
  }
  walk(FRONT);
  return hits;
}

function computeImportPath(targetFile){
  if (!NO_ALIAS) return "@/lib/hudBus";
  let relPath = path.relative(path.dirname(targetFile), HUD_BUS_ABS).replace(/\\/g, "/");
  if (!relPath.startsWith(".")) relPath = "./" + relPath;
  return relPath;
}

function patchFile(file, setter){
  let src = fs.readFileSync(file, "utf8");
  const importPath = computeImportPath(file);
  const importLine = `import { useHudAddListener } from "${importPath}";`;
  let changed = false;

  // import
  if (!src.includes("useHudAddListener")) {
    const lines = src.split("\n");
    let lastImport = -1;
    for (let i=0;i<lines.length;i++) if (/^\s*import\s+/.test(lines[i])) lastImport = i;
    lines.splice(lastImport >= 0 ? lastImport+1 : 0, 0, importLine);
    src = lines.join("\n");
    changed = true;
    console.log("~ add import:", importLine);
  } else if (NO_ALIAS && src.includes("@/lib/hudBus")) {
    src = src.replace(/import\s+\{\s*useHudAddListener\s*\}\s+from\s+["']@\/lib\/hudBus["'];?/, importLine);
    changed = true;
    console.log("~ rewrite import →", importPath);
  } else {
    console.log("= import ok");
  }

  // hook
  const hookRe = new RegExp(`useHudAddListener\\s*\\(\\s*${setter}\\s*\\)`);
  if (!hookRe.test(src)) {
    const lines = src.split("\n");
    let injectAt = -1;
    for (let i=0;i<lines.length;i++){
      if (lines[i].includes(setter)) { injectAt = i + 1; break; }
    }
    if (injectAt < 0){
      for (let i=0;i<lines.length;i++) if (/\buseEffect\s*\(/.test(lines[i])) { injectAt = i; break; }
    }
    if (injectAt < 0){
      let lastImport = -1;
      for (let i=0;i<lines.length;i++) if (/^\s*import\s+/.test(lines[i])) lastImport = i;
      injectAt = (lastImport >= 0 ? lastImport + 1 : 0) + 1;
    }
    lines.splice(injectAt, 0, `useHudAddListener(${setter});`);
    src = lines.join("\n");
    changed = true;
    console.log(`~ add hook: useHudAddListener(${setter});`);
  } else {
    console.log("= hook ok");
  }

  if (!changed) { console.log("= no changes for", rel(file)); return; }
  if (DRY) { console.log("… dry-run, not writing", rel(file)); return; }
  fs.writeFileSync(file, src, "utf8");
  console.log("✓ patched", rel(file));
}

(function main(){
  let target = args.file ? (path.isAbsolute(args.file) ? args.file : path.join(root, args.file)) : null;

  if (!target) {
    const hits = findCandidates();
    if (hits.length === 0) {
      console.error("! No HUD-like state found (looked for useState([... widgets/cards/panels ...])).");
      console.error("  Pass --file <path/to/YourHud.jsx> to patch explicitly.");
      process.exit(1);
    }
    const pick = hits[0];
    console.log("Found candidate:", rel(pick.file), "setter:", pick.setter);
    patchFile(pick.file, pick.setter);
    return;
  }

  if (!fs.existsSync(target)) {
    console.error("! File not found:", rel(target));
    process.exit(1);
  }
  const text = fs.readFileSync(target, "utf8");
  const m = text.match(/const\s*\[\s*([a-zA-Z0-9_$]+)\s*,\s*([a-zA-Z0-9_$]+)\s*\]\s*=\s*useState\s*\(/);
  const setter = (m && m[2]) || (args.setter && String(args.setter));
  if (!setter) {
    console.error("! Could not detect setter. Re-run with --setter <name>.");
    process.exit(1);
  }
  patchFile(target, setter);
})();
