import fs from "fs";
import path from "path";

// ---------- args ----------
const args = {};
for (let i=2;i<process.argv.length;i++){
  const a = process.argv[i];
  if (a.startsWith("--")) {
    const [k,v] = a.replace(/^--/,"").split("=");
    if (typeof v === "string" && v.length) args[k]=v; else args[k]=true;
  }
}
const ROOT = path.resolve(args.root || ".");

// ---------- locate src (repo root or frontend/) ----------
let srcDir = path.join(ROOT, "frontend", "src");
if (!fs.existsSync(srcDir)) {
  const alt = path.join(ROOT, "src");
  if (fs.existsSync(alt)) srcDir = alt;
}
if (!fs.existsSync(srcDir)) {
  console.error("✗ Can't find src folder. Tried:", path.join(ROOT,"frontend","src"), "and", path.join(ROOT,"src"));
  process.exit(1);
}

// ---------- walk + patch ----------
const exts = new Set([".jsx",".tsx",".js",".ts"]);
const hits = [];
function walk(dir){
  for (const name of fs.readdirSync(dir)){
    const f = path.join(dir, name);
    const st = fs.statSync(f);
    if (st.isDirectory()) { walk(f); continue; }
    if (!exts.has(path.extname(f))) continue;

    const text = fs.readFileSync(f, "utf8");

    // Pattern 1: <NavItem ... label="About" ... id="about" ... />
    let next = text.replace(
      /<NavItem([^>]*?)label\s*=\s*["']About["']([^>]*?)id\s*=\s*["']about["']([^>]*)\/?>/g,
      (_m, a, b, c) => `<NavItem${a}label="About & Support"${b}id="about"${c}/>`
    );

    // Pattern 2: <NavItem ... id="about" ... label="About" ... />
    next = next.replace(
      /<NavItem([^>]*?)id\s*=\s*["']about["']([^>]*?)label\s*=\s*["']About["']([^>]*)\/?>/g,
      (_m, a, b, c) => `<NavItem${a}id="about"${b}label="About & Support"${c}/>`
    );

    // Pattern 3: object style { id: 'about', label: 'About', ... }
    next = next.replace(
      /(\bid\s*:\s*['"]about['"][^}]*?\blabel\s*:\s*['"])About(['"])/g,
      (_m, pre, suf) => `${pre}About & Support${suf}`
    ).replace(
      /(\blabel\s*:\s*['"])About(['"][^}]*?\bid\s*:\s*['"]about['"])/g,
      (_m, pre, suf) => `${pre}About & Support${suf}`
    );

    if (next !== text) {
      const bk = f + ".bak_about";
      try { fs.copyFileSync(f, bk); } catch {}
      fs.writeFileSync(f, next, "utf8");
      hits.push(f);
    }
  }
}

walk(srcDir);

if (!hits.length) {
  console.log("= No files needed changes (already renamed or not found).");
} else {
  console.log("✓ Patched " + hits.length + " file(s):");
  for (const f of hits) console.log("  - " + path.relative(ROOT, f));
  console.log("\nBackups created next to each file with .bak_about suffix.");
}
