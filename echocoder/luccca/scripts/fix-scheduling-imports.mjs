// scripts/fix-scheduling-imports.mjs
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const schedRoot = path.join(projectRoot, "src", "modules", "scheduling");
const exts = new Set([".ts", ".tsx", ".js", ".jsx"]);
const files = [];

/** Walk scheduling directory recursively */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (exts.has(path.extname(entry.name))) files.push(p);
  }
}

/** Convert Windows/Unix separators */
function posixJoin(...parts) {
  return path.join(...parts).split(path.sep).join("/");
}

/** Get relative path from file to scheduling root */
function relFromFileDirToSchedRoot(fileDir) {
  return posixJoin(path.relative(fileDir, schedRoot) || ".");
}

/** Replace @/lib and @/features imports */
function patch(text, fileDir) {
  const relBase = relFromFileDirToSchedRoot(fileDir);

  text = text.replace(
    /from\s+["']@\/lib\/([^"']+)["']/g,
    (_m, rest) => `from "${posixJoin(relBase, "lib", rest)}"`
  );

  text = text.replace(
    /from\s+["']@\/features\/([^"']+)["']/g,
    (_m, rest) => `from "${posixJoin(relBase, "features", rest)}"`
  );

  return text;
}

walk(schedRoot);

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = patch(before, path.dirname(file));
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("✔ patched:", posixJoin(path.relative(projectRoot, file)));
  }
}
console.log(`\nDone. Patched ${changed} file(s).`);

