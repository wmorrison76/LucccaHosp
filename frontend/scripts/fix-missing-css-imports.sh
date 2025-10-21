#!/usr/bin/env bash
set -euo pipefail

echo "🔎 Scanning CSS @import statements and creating missing local files..."

node - <<'NODE'
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules','.git','dist'].includes(ent.name)) continue;
      out.push(...walk(p));
    } else if (p.endsWith('.css')) {
      out.push(p);
    }
  }
  return out;
}

if (!fs.existsSync(SRC)) process.exit(0);

const files = walk(SRC);
const IMPORT_RE = /@import\s+(?:url\()?["']([^"']+)["']\)?\s*;/g;
const created = [];

for (const file of files) {
  const css = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = IMPORT_RE.exec(css))) {
    const spec = m[1];
    // only handle local relative imports (./ or ../)
    if (!spec.startsWith('./') && !spec.startsWith('../')) continue;

    const abs = path.resolve(path.dirname(file), spec);
    // If no extension and the path doesn't exist, try .css
    const exists = fs.existsSync(abs);
    const absCss = abs.endsWith('.css') ? abs : abs + '.css';
    const finalPath = exists ? abs : (fs.existsSync(absCss) ? absCss : abs);

    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(path.dirname(finalPath), { recursive: true });
      const relToSrc = path.relative(ROOT, finalPath);
      const name = path.basename(finalPath);
      const placeholder = `/* Auto-created placeholder: ${name}
   If you have a real skin/theme file, replace this content or update the @import path.
*/\n:root {\n  --backboard-bg: transparent;\n}\n`;
      fs.writeFileSync(finalPath, placeholder);
      created.push(relToSrc);
    }
  }
}

if (created.length) {
  console.log('✅ Created missing CSS files:');
  for (const f of created) console.log('  - ' + f);
} else {
  console.log('✅ No missing local CSS @imports detected.');
}
NODE

# Clear Vite cache and restart dev
if [ -d node_modules/.vite ]; then
  echo "🧹 clearing Vite cache..."
  rm -rf node_modules/.vite
fi

echo "🚀 starting dev server..."
npm run dev -- --force
