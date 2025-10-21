#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = "src";
const touched = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      // skip big dirs
      if (name === "node_modules" || name === ".next" || name === "dist" || name === ".vite") continue;
      walk(p);
    } else if (/\.(tsx|ts|jsx|js)$/.test(name)) {
      fixFile(p);
    }
  }
}

function save(p, s) {
  fs.writeFileSync(p, s);
  touched.push(p);
}

function fixFile(file) {
  let s = fs.readFileSync(file, "utf8");
  const before = s;

  // --- (A) Strip `as any` *attributes* in JSX like: <Card as any ...>
  // handles things like <Card as any ...>, <CardContent as any ...>, <Badge as any ...>, and icon tags
  s = s.replace(/<([A-Z][A-Za-z0-9_]*)\s+as\s+any(\s|>)/g, "<$1$2");

  // Also clean accidental props: as={any} variants
  s = s.replace(/<([A-Z][A-Za-z0-9_]*)\s+as=\{?\s*any\s*\}?(\s|>)/g, "<$1$2");

  // --- (B) querySelector(... )?.click() → cast to HTMLElement then safe click
  // Pattern: document.querySelector('...')?.click();
  s = s.replace(
    /document\.querySelector\(([^)]*)\)\?\.\s*click\(\)\s*;?/g,
    (m, sel) => `(document.querySelector(${sel}) as HTMLElement | null)?.click();`
  );

  // --- (C) Remove orphan <TooltipProvider>...</TooltipProvider> when not imported
  const hasTooltipImport = /from\s+['"][^'"]*tooltip['"]/.test(s) || /TooltipProvider\s*[,}]/.test(s.split("\n")[0] || "");
  if (!hasTooltipImport) {
    s = s
      .replace(/<TooltipProvider>\s*/g, "")
      .replace(/\s*<\/TooltipProvider>/g, "");
  }
  // And drop import lines that contain TooltipProvider entirely (safe if not used)
  s = s.replace(/^\s*import\s*{[^}]*TooltipProvider[^}]*}\s*from\s*['"][^'"]*['"]\s*;?\s*$/gm, "");

  if (s !== before) save(file, s);
}

walk(root);
console.log("\nDone. Modified files:", touched);
