import fs from "fs";
import path from "path";
import os from "os";
import { spawnSync } from "child_process";

const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i];
  const v = process.argv[i+1];
  if (!k?.startsWith("--")) { i -= 1; continue; }
  args[k.slice(2)] = v ?? true;
}
const ROOT = args.root || ".";
const BUNDLE = args.bundle;
const BACKUP = args["no-backup"] ? false : true;

function die(m){ console.error("✗", m); process.exit(1); }
function ok(m){ console.log("•", m); }

if (!BUNDLE) die("Usage: node scripts/install-bundle.mjs --root <repo-root> --bundle dist/luccca-bundle.tgz [--no-backup]");
if (!fs.existsSync(path.join(ROOT, "frontend", "src"))) die(`Invalid --root (${ROOT}): missing frontend/src`);
if (!fs.existsSync(BUNDLE)) die(`Bundle not found: ${BUNDLE}`);

const stamp = new Date().toISOString().replace(/[:.]/g,"-");
const bkupDir = path.join(ROOT, ".bundle_backups", stamp);
fs.mkdirSync(bkupDir, { recursive: true });

console.log("→ Inspecting bundle file list…");
const listProc = spawnSync("tar", ["-tzf", BUNDLE], { encoding: "utf8" });
if (listProc.status !== 0) die("Could not list bundle contents (tar -tzf failed).");
const files = listProc.stdout.split(/\r?\n/).filter(f => f && !f.endsWith("/"));

if (BACKUP) {
  console.log(`→ Backing up files that will be overwritten to: ${bkupDir}`);
  for (const rel of files) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      const dest = path.join(bkupDir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(full, dest);
      ok(`backed up: ${rel}`);
    }
  }
} else {
  console.log("⚠️  --no-backup: skipping backups");
}

console.log(`→ Extracting bundle into ${ROOT}`);
const x = spawnSync("tar", ["-xzf", BUNDLE, "-C", ROOT], { stdio: "inherit" });
if (x.status !== 0) die("tar extract failed.");

const idx = path.join(ROOT, "frontend", "index.html");
if (fs.existsSync(idx)) {
  let s = fs.readFileSync(idx, "utf8");
  if (s.includes("/src/main.jsx")) {
    s = s.replace(/\/src\/main\.jsx/g, "/src/main.tsx");
    fs.writeFileSync(idx, s, "utf8");
    ok("Patched index.html → /src/main.tsx");
  }
}

console.log("\n✓ Install complete.");
if (BACKUP) console.log("Backups at:", bkupDir);
console.log("\nNext:");
console.log("  cd " + path.join(ROOT, "frontend"));
console.log("  rm -rf node_modules/.vite");
console.log("  pnpm dev   # or npm run dev / yarn dev");
