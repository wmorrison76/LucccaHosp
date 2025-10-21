import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const exts = new Set([".ts",".tsx",".js",".jsx",".css",".scss",".mdx",".json"]);
const srcRoot = path.join(ROOT, "src");
let filesChanged = 0;

// walk src for code-like files
function* walk(dir){
  for (const name of fs.readdirSync(dir, { withFileTypes:true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) { yield* walk(p); continue; }
    if (exts.has(path.extname(name.name))) yield p;
  }
}

// 1) remove lines that are exactly "EOF" (allowing whitespace & optional ;)
const EOF_LINE = /^\s*EOF\s*;?\s*$/gm;
// also scrub common comment leftovers like /* EOF */ or // EOF
const EOF_COMMENT = /^\s*\/\/\s*EOF\s*$/gm;
const EOF_BLOCK = /\/\*\s*EOF\s*\*\//gm;

for (const f of walk(srcRoot)) {
  const before = fs.readFileSync(f, "utf8");
  const after = before.replace(EOF_LINE, "").replace(EOF_COMMENT, "").replace(EOF_BLOCK, "");
  if (after !== before) {
    fs.writeFileSync(f, after);
    console.log("🧹 cleaned", path.relative(ROOT, f));
    filesChanged++;
  }
}

// 2) move any *.save out of src so Vite never sees them
function moveSaves(dir){
  for (const ent of fs.readdirSync(dir, { withFileTypes:true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) moveSaves(p);
    else if (ent.name.endsWith(".save")) {
      const dstDir = path.join(ROOT, "archive", "misc");
      fs.mkdirSync(dstDir, { recursive:true });
      const dst = path.join(dstDir, path.basename(p));
      fs.renameSync(p, dst);
      console.log("📦 moved", path.relative(ROOT,p), "→", path.relative(ROOT,dst));
    }
  }
}
moveSaves(srcRoot);

console.log(filesChanged ? `✅ Updated ${filesChanged} file(s).` : "ℹ️ No stray EOF lines found.");

