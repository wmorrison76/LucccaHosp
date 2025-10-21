import fs from "fs";
import path from "path";

const ROOT = process.cwd();
// scan these file types
const exts = new Set([".ts",".tsx",".js",".jsx",".css",".html",".md",".mdx"]);
const token = /^(?:\s*)(?:EOF|BASH|TSX|NODE|END|JSON|YAML|HEREDOC|SQL|HTML|CSS|heredoc>|quote>)\s*;?\s*$/i;

function* walk(dir) {
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (["node_modules",".git",".next","dist","build",".vite"].includes(d.name)) continue;
      yield* walk(p);
    } else if (exts.has(path.extname(d.name))) {
      yield p;
    }
  }
}

let changed = 0;
for (const file of walk(ROOT)) {
  const txt = fs.readFileSync(file, "utf8");
  if (!token.test(txt)) continue;
  const out = txt.split(/\r?\n/).filter(line => !token.test(line)).join("\n");
  if (out !== txt) {
    fs.writeFileSync(file, out);
    console.log("🧹 removed stray token(s) in", path.relative(ROOT, file));
    changed++;
  }
}

console.log(changed ? `✅ Cleaned ${changed} file(s).` : "ℹ️ No stray heredoc tokens found.");
