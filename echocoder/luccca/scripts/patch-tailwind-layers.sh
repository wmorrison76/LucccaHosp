#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Patching Tailwind layer directives…"

node - <<'NODE'
const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(d => {
      const p = path.join(dir, d.name);
      return d.isDirectory() ? walk(p) : [p];
    });
}

if (!fs.existsSync('src')) process.exit(0);

const cssFiles = walk('src').filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
  let s = fs.readFileSync(file, 'utf8');

  // Skip our main index.css (it already has the directives)
  if (path.normalize(file) === path.normalize('src/index.css')) continue;

  const needs = {
    base: /@layer\s+base\b/.test(s),
    components: /@layer\s+components\b/.test(s),
    utilities: /@layer\s+utilities\b/.test(s),
  };
  const has = {
    base: /@tailwind\s+base\b/.test(s),
    components: /@tailwind\s+components\b/.test(s),
    utilities: /@tailwind\s+utilities\b/.test(s),
  };

  let header = '';
  if (needs.base && !has.base) header += '@tailwind base;\n';
  if (needs.components && !has.components) header += '@tailwind components;\n';
  if (needs.utilities && !has.utilities) header += '@tailwind utilities;\n';

  if (header) {
    // Prepend after any @charset (keep CSS valid)
    const charsetMatch = s.match(/^@charset\s+["'][^"']+["'];\s*/i);
    if (charsetMatch) {
      const idx = charsetMatch[0].length;
      s = s.slice(0, idx) + header + s.slice(idx);
    } else {
      s = header + s;
    }
    fs.writeFileSync(file, s);
    console.log('✅ Prepended Tailwind directives in', file);
  }
}
NODE

# Clear Vite cache and restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev (forcing fresh)…"
npm run dev -- --force
