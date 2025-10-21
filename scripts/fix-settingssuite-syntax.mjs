import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
function srcDir(root){
  const A = path.join(root,"frontend","src");
  const B = path.join(root,"src");
  if (fs.existsSync(A)) return A;
  if (fs.existsSync(B)) return B;
  throw new Error("Can't find src (tried frontend/src and src).");
}
const SRC = srcDir(ROOT);
const FILE = path.join(SRC,"settings","SettingsSuite.jsx");
if (!fs.existsSync(FILE)) {
  console.error("✗ Not found:", FILE);
  process.exit(1);
}
let s = fs.readFileSync(FILE,"utf8");
const before = s;

// Normalize any bad variants into a single, correct block.
// We’ll replace ANY Object.fromEntries(...map...) line that tries to read CSS vars.
const re = /Object\.fromEntries\s*\(\s*keys\.map\s*\(\s*k\s*=>[\s\S]*?\)\s*\)\s*;?/m;

const fixedBlock = `
const css = getComputedStyle(document.documentElement);
const tokenDefaults = Object.fromEntries(
  keys.map(k => [k, css.getPropertyValue(k).trim() || ""])
);
`.trim();

if (re.test(s)) {
  s = s.replace(re, fixedBlock);
} else {
  // Try a looser replace when the code is inline without "keys" alias
  const loose = /getComputedStyle\s*\(\s*document\.documentElement\s*\)\.getPropertyValue\s*\(\s*k\s*\)\.trim\(\)[\s\S]*?\)\s*\)\s*;?/m;
  if (loose.test(s)) s = s.replace(loose, `css.getPropertyValue(k).trim() || ""])\n);`);
  // Ensure the block exists (if not, append near the top after imports)
  if (!/tokenDefaults\s*=/.test(s)) {
    s = s.replace(/(^\s*import .+?;[\r\n]+)/s, `$1\n${fixedBlock}\n\n`);
  }
}

// Safeguard: if tokenDefaults is used later, keep existing name; otherwise, add a harmless const
if (!/tokenDefaults\s*=/.test(s)) {
  s = s.replace(/(\nexport default function|^export default function)/m,
    `\nconst tokenDefaults = {};\n$1`);
}

if (s !== before) {
  const bak = FILE + ".bak_settingssuite_syntax";
  try { fs.copyFileSync(FILE, bak); } catch {}
  fs.writeFileSync(FILE, s, "utf8");
  console.log("✓ patched", path.relative(ROOT, FILE));
  console.log("  backup:", path.relative(ROOT, bak));
} else {
  console.log("= no change needed (already correct)");
}
