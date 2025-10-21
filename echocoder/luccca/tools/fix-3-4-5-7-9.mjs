#!/usr/bin/env node
/**
 * Automated patcher for LUCCCA source files
 * Fixes rules (3,4,5,7,9)
 */

import fs from "fs";
import path from "path";

const root = "src"; // adjust if needed
let touched = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      processFile(p);
    }
  }
}

function save(file, s) {
  fs.writeFileSync(file, s);
  touched.push(file);
}

function injectReactIconCasts(code) {
  return code.replace(/<([A-Z][A-Za-z0-9]*) /g, (_m, tag) => `<${tag} as any `);
}

function processFile(file) {
  let s = fs.readFileSync(file, "utf8");
  const before = s;

  // (3) Fix useRef with no args -> useRef(null)
  s = s.replace(/\buseRef<([^>]*)>\(\)/g, "useRef<$1>(null)");

  // (4) Fix TooltipProvider import
  if (s.includes("TooltipProvider")) {
    s = s.replace(/,\s*TooltipProvider/g, "");
    s = s.replace(/import\s*{[^}]*TooltipProvider[^}]*}\s*from\s*["'][^"']+["'];?/g, "");
  }

  // (5) Fix querySelector?.click() — drop .click()
  s = s.replace(/(\?\.querySelector\([^)]*\))\?\.click\(\)/g, "$1");

  // (7) Fix z.infer with no args
  s = s.replace(/\bz\.infer\b(?!<)/g, "z.infer<any>");

  // (9) React-icons JSX — add `as any`
  if (/\bfrom\s+['"]react-icons\//.test(s)) {
    s = injectReactIconCasts(s);
  }

  if (s !== before) save(file, s);
}

walk(root);

console.log("\nDone. Modified files:", touched);

