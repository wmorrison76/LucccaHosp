import fs from "fs";
import path from "path";

const args = {};
for (let i=2;i<process.argv.length;i+=2){
  const k = process.argv[i]; const v = process.argv[i+1];
  if (!k?.startsWith("--")) { i -= 1; continue; }
  args[k.slice(2)] = v ?? true;
}

const ROOT = args.root || ".";
const DRY  = !!args.dry;

const exts = new Set([".jsx",".tsx",".js",".ts"]);
const rootSrc = path.join(ROOT, "frontend", "src");

if (!fs.existsSync(rootSrc)) {
  console.error("✗ Can't find", rootSrc, "(pass --root if your repo is elsewhere)");
  process.exit(1);
}

const hits = [];
function walk(dir){
  for (const name of fs.readdirSync(dir)){
    const f = path.join(dir, name);
    const st = fs.statSync(f);
    if (st.isDirectory()) { walk(f); continue; }
    if (!exts.has(path.extname(f))) continue;
    const text = fs.readFileSync(f, "utf8");

    // Pattern 1: <NavItem icon={Info} label="About" id="about" .../>
    let next = text.replace(
      /<NavItem([^>]*?)label\s*=\s*["']About["']([^>]*?)id\s*=\s*["']about["']([^>]*)\/?>/g,
      (_m, a, b, c) => `<NavItem${a}label="About & Support"${b}id="about"${c}/>`
    );

    // Pattern 2: label/id in any order
    next = next.replace(
      /<NavItem([^>]*?)id\s*=\s*["']about["']([^>]*?)label\s*=\s*["']About["']([^>]*)\/?>/g,
      (_m, a, b, c) => `<NavItem${a}id="about"${b}label="About & Support"${c}/>`
    );

    // Pattern 3: object entries like { id: 'about', label: 'About', icon: ... }
    next = next.replace(
      /(\bid\s*:\s*['"]about['"][^}]*?\blabel\s*:\s*['"])About(['"])/g,
      (_m, pre, suf) => `${pre}About & Support${suf}`
    ).replace(
      /(\blabel\s*:\s*['"])About(['"][^}]*?\bid\s*:\s*['"]about['"])/g,
      (_m, pre, suf) => `${pre}About & Support${suf}`
    );

    if (next !== text) {
      hits.push(f);
      if (!DRY) {
        const bk = f + ".bak_about";
        try { fs.copyFileSync(f, bk); } catch {}
        fs.writeFileSync(f, next, "utf8");
      }
    }
  }
}

walk(rootSrc);
if (!hits.length) {
  console.log("= No files needed changes (already renamed or not found).");
} else {
  console.log((DRY?"~ Would patch ":"✓ Patched ") + hits.length + " file(s):");
  for (const f of hits) console.log("  - " + path.relative(ROOT, f));
  if (!DRY) console.log("\nBackups created next to each file with .bak_about suffix.");
}
