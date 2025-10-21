import fs from "fs";
import path from "path";
import os from "os";
import { spawnSync } from "child_process";

const ROOT = process.argv[2] || ".";
const MANIFEST = process.argv[3] || "scripts/bundle.manifest";
const OUT = process.argv[4] || "dist/luccca-bundle.tgz";

function die(msg) { console.error("✗", msg); process.exit(1); }
if (!fs.existsSync(MANIFEST)) die(`Manifest not found: ${MANIFEST}`);

const list = fs.readFileSync(MANIFEST, "utf8")
  .split(/\r?\n/)
  .map(s => s.trim())
  .filter(s => s && !s.startsWith("#"));

const existing = [];
for (const p of list) {
  const full = path.join(ROOT, p);
  if (fs.existsSync(full) && fs.statSync(full).isFile()) {
    existing.push(p);
  } else {
    console.log(`• Skipping (not found): ${p}`);
  }
}
if (!existing.length) die("Nothing to bundle (manifest resolved to 0 files).");

fs.mkdirSync(path.dirname(OUT), { recursive: true });

// write a temp list so tar can read it
const tmp = path.join(os.tmpdir(), `bundle-${Date.now()}.list`);
fs.writeFileSync(tmp, existing.join("\n"));

console.log(`→ Writing bundle to ${OUT}`);
const tar = spawnSync("tar", ["-czf", OUT, "-C", ROOT, "-T", tmp], { stdio: "inherit" });
try { fs.unlinkSync(tmp); } catch {}
if (tar.status !== 0) die("tar failed (is tar available on this machine?)");

console.log(`✓ Bundle created: ${OUT}`);
