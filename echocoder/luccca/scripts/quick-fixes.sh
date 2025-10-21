#!/usr/bin/env bash
set -euo pipefail

echo "🛠  Running quick project fixes..."

# 1) Node helper that:
#    - Reorders @import to top of CSS files
#    - Renames .jsx files that contain TS syntax (type/interface) to .tsx
#    - Strips stray "[plugin:vite:...]" lines accidentally pasted into source
node - <<'NODE'
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

function walk(dir, exts = null) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules','.git','dist'].includes(ent.name)) continue;
      out.push(...walk(p, exts));
    } else {
      if (!exts || exts.some(e => p.endsWith(e))) out.push(p);
    }
  }
  return out;
}

// --- CSS: move all @import lines to the very top (PostCSS requirement) ---
const cssFiles = fs.existsSync(SRC) ? walk(SRC, ['.css']) : [];
for (const file of cssFiles) {
  let txt = fs.readFileSync(file, 'utf8');
  const lines = txt.split(/\r?\n/);
  const imports = [];
  const others = [];
  for (const ln of lines) {
    const t = ln.trim();
    if (t.startsWith('@import ')) imports.push(ln);
    else others.push(ln);
  }
  const newTxt = (imports.length ? imports.join('\n')+'\n' : '') + others.join('\n');
  if (newTxt !== txt) {
    fs.writeFileSync(file, newTxt);
    console.log('✅ CSS imports moved to top:', path.relative(ROOT, file));
  }
}

// --- JSX with TS syntax: rename to .tsx when they contain "type"/"interface" ---
const jsxFiles = fs.existsSync(SRC) ? walk(SRC, ['.jsx']) : [];
for (const file of jsxFiles) {
  const txt = fs.readFileSync(file, 'utf8');
  const hasTS = /\btype\s+[A-Za-z_]/.test(txt) || /\binterface\s+[A-Za-z_]/.test(txt);
  if (hasTS) {
    const tsx = file.replace(/\.jsx$/, '.tsx');
    if (!fs.existsSync(tsx)) {
      fs.renameSync(file, tsx);
      console.log('✅ Renamed to .tsx due to TS syntax:', path.relative(ROOT, tsx));
    } else {
      console.log('↩︎ Already exists (skip rename):', path.relative(ROOT, tsx));
    }
  }
}

// --- Strip stray "[plugin:vite:...]" lines at top of files (merge/paste artifacts) ---
const codeFiles = fs.existsSync(SRC) ? walk(SRC, ['.jsx','.tsx','.js','.ts']) : [];
for (const file of codeFiles) {
  let txt = fs.readFileSync(file, 'utf8');
  const lines = txt.split(/\r?\n/);
  let changed = false;
  while (lines.length && /^\s*\[plugin:vite:/.test(lines[0])) {
    lines.shift();
    changed = true;
  }
  // Occasionally a bare "[" was left at the top — clean that too
  while (lines.length && /^\s*\[/.test(lines[0]) && lines[0].includes('plugin:vite')) {
    lines.shift();
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, lines.join('\n'));
    console.log('✅ Removed stray [plugin:vite:...] header:', path.relative(ROOT, file));
  }
}
NODE

# 2) Clear Vite cache and restart dev
if [ -d node_modules/.vite ]; then
  echo "🧹 clearing Vite cache..."
  rm -rf node_modules/.vite
fi

echo "🚀 starting dev server..."
npm run dev -- --force
