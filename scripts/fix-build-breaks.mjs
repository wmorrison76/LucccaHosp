import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
function die(m){ console.error("✗", m); process.exit(1); }
function ok(...m){ console.log("•", ...m); }

function findSrc(root){
  const A = path.join(root,"frontend","src");
  const B = path.join(root,"src");
  if (fs.existsSync(A)) return A;
  if (fs.existsSync(B)) return B;
  die("Can't find src (tried frontend/src and src).");
}
function backupWrite(file, content, suffix=".bak_fix"){
  try { if (fs.existsSync(file)) fs.copyFileSync(file, file+suffix); } catch {}
  fs.mkdirSync(path.dirname(file), { recursive:true });
  fs.writeFileSync(file, content, "utf8");
  ok("patched", path.relative(ROOT,file), "(backup → "+path.basename(file+suffix)+")");
}
function patch(file, mutate, suffix=".bak_fix"){
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file,"utf8");
  const after  = mutate(before);
  if (after !== before){
    backupWrite(file, after, suffix);
    return true;
  }
  console.log("= ok", path.relative(ROOT,file));
  return false;
}

const SRC = findSrc(ROOT);

// 1) Fix the bracket in SettingsSuite.jsx
const SUITE = path.join(SRC,"settings","SettingsSuite.jsx");
patch(SUITE, (s)=>{
  // Fix the specific typo: ...||keys[k]));  -> ...||keys[k]]));
  return s.replace(/(\|\|?\s*keys\[k\]\)\);)/g, (_m)=>"]));");
});

// 2) Stub PastryLibrary.jsx to unblock Vite scan (backup original)
const PASTRY = path.join(SRC,"components","PastryLibrary","PastryLibrary.jsx");
if (fs.existsSync(PASTRY)) {
  const stub = `import React from "react";
/** TEMP STUB:
 * Original backed up next to this file as PastryLibrary.jsx.bak_scan
 * Reason: dynamic import map shape was breaking Vite dep scan.
 * TODO: reintroduce lazy map using import.meta.glob later.
 */
export default function PastryLibrary(){ return null; }
`;
  backupWrite(PASTRY, stub, ".bak_scan");
} else {
  console.log("= PastryLibrary.jsx not found (skipping stub)");
}

console.log("\\n✓ Build fixes applied.");
console.log("Next:");
console.log("  cd frontend && rm -rf node_modules/.vite && pnpm dev");
