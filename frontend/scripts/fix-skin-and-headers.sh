#!/usr/bin/env bash
set -euo pipefail

echo "🧩 Ensuring src/backboard.skin.css exists..."
mkdir -p src
if [ ! -f src/backboard.skin.css ]; then
  cat > src/backboard.skin.css <<'CSS'
/* Auto-created placeholder: backboard.skin.css
   If you have a real skin/theme file, replace this or remove the import in src/index.css. */
:root {
  --backboard-bg: transparent;
}
CSS
  echo "✅ created src/backboard.skin.css"
else
  echo "↩︎ src/backboard.skin.css already present"
fi

echo "🧹 Removing stray absolute-path/plugin headers at file tops..."
node - <<'NODE'
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules','.git','dist'].includes(ent.name)) continue;
      out.push(...walk(p));
    } else if (/\.(tsx|jsx|ts|js)$/.test(ent.name)) {
      out.push(p);
    }
  }
  return out;
}

if (!fs.existsSync(SRC)) process.exit(0);

const files = walk(SRC);

// remove junk lines at the very top like:
//   /Users/cami/Desktop/... (accidentally pasted path)
//   [plugin:vite:react-babel] ...
for (const file of files) {
  const txt = fs.readFileSync(file,'utf8');
  const lines = txt.split(/\r?\n/);
  let changed = false;

  // drop leading garbage lines
  while (lines.length && (
         /^\s*\[plugin:vite:/.test(lines[0]) ||
         /^\/Users\//.test(lines[0])
       )) {
    lines.shift();
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, lines.join('\n'));
    console.log('✅ cleaned header:', path.relative(ROOT, file));
  }
}
NODE

# clear vite cache and restart
if [ -d node_modules/.vite ]; then
  echo "🧽 clearing Vite cache..."
  rm -rf node_modules/.vite
fi

echo "🚀 starting dev server..."
npm run dev -- --force
