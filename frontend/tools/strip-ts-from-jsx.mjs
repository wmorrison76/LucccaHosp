#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
let changed = 0;

function listJsxFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listJsxFiles(p));
    else if (e.isFile() && p.endsWith(".jsx")) out.push(p);
  }
  return out;
}

// naive, but safe-ish cleaners for .jsx files
function cleanJsxTypes(s) {
  let before = s;

  // 1) top-level type aliases: `type Foo = ...;`
  s = s.replace(/^[ \t]*type[ \t]+[A-Za-z0-9_]+[ \t]*=[\s\S]*?;[ \t]*$/gm, "");

  // 2) interfaces: `interface Foo { ... }` (single-block naive match)
  s = s.replace(/^[ \t]*interface[ \t]+[A-Za-z0-9_]+[ \t]*\{[\s\S]*?\}[ \t]*$/gm, "");

  // 3) enums: `enum Foo { ... }`
  s = s.replace(/^[ \t]*enum[ \t]+[A-Za-z0-9_]+[ \t]*\{[\s\S]*?\}[ \t]*$/gm, "");

  // 4) common React generic call-sites in .jsx (invalid in JS): useRef<T>(), useState<T>(), etc.
  s = s.replace(/\b(use(State|Ref|Memo|Effect|Reducer|Callback)|createContext|forwardRef|useImperativeHandle)<[^>]*>\s*\(/g, "$1(");

  // 5) non-null assertions on call results like `getContext("2d")!`
  s = s.replace(/\)![ \t]*(?=[;,)])/g, ")");

  // 6) super-common assertion `as const` in JS context — drop it
  s = s.replace(/[ \t]+as[ \t]+const\b/g, "");

  return s === before ? null : s;
}

const files = listJsxFiles(path.join(root, "src"));
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const out = cleanJsxTypes(src);
  if (out !== null) {
    fs.writeFileSync(f, out);
    console.log("fixed:", f);
    changed++;
  }
}

console.log(changed ? `\nDone. Modified ${changed} file(s).` : "No .jsx files needed changes.");
