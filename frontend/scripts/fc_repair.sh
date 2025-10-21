#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
DEST="$ROOT/src/vendor/fullcalendar"
echo "== FullCalendar CSS + Vite alias repair =="
echo "Project: $ROOT"

# 1) Make sure the FullCalendar packages exist (safe if already installed)
if command -v pnpm >/dev/null 2>&1; then
  PKG="pnpm add -w"
else
  PKG="npm i -S"
fi
for P in core react daygrid timegrid list interaction; do
  [ -d "node_modules/@fullcalendar/$P" ] || $PKG @fullcalendar/$P
done

# 2) Copy CSS into a stable vendor location
mkdir -p "$DEST"
copy_css() {
  local pkg="$1" out="$2"
  local v6="$ROOT/node_modules/@fullcalendar/$pkg/index.css"
  local v5="$ROOT/node_modules/@fullcalendar/$pkg/main.css"
  if [ -f "$v6" ]; then cp "$v6" "$DEST/$out.css"; echo "✓ $out.css ← $pkg/index.css"
  elif [ -f "$v5" ]; then cp "$v5" "$DEST/$out.css"; echo "✓ $out.css ← $pkg/main.css"
  else echo "✗ Missing CSS in @fullcalendar/$pkg"; exit 1; fi
}
copy_css daygrid daygrid
copy_css timegrid timegrid
copy_css list list

# 3) Inject @fc alias into ALL vite configs (root + any module vite.config.*)
node <<'NODE'
const fs = require('fs');
const path = require('path');
function ls(glob) {
  const { execSync } = require('child_process');
  const out = execSync(`bash -lc 'ls -1 ${glob} 2>/dev/null || true'`).toString().trim();
  return out ? out.split('\n') : [];
}
const files = [
  ...ls('vite.config.{ts,js}'),
  ...ls('src/**/vite.config*.{ts,js}')
].filter((f,i,a)=>a.indexOf(f)===i);

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  let changed = false;

  // ensure path import
  if (!/from ['"]node:path['"]/.test(t) && !/from ['"]path['"]/.test(t)) {
    t = `import path from 'node:path';\n` + t; changed = true;
  }
  // comment out duplicate export default defineConfig if any
  const matches = [...t.matchAll(/export\s+default\s+defineConfig\s*\(/g)];
  if (matches.length > 1) {
    let seen = 0;
    t = t.replace(/export\s+default\s+defineConfig\s*\(/g, m => (++seen>1 ? `// ${m}` : m));
    changed = true;
  }

  const fcLine = `'@fc': path.resolve(process.cwd(), 'src/vendor/fullcalendar'),`;
  const aliasBlockRe = /resolve\s*:\s*{[^}]*alias\s*:\s*{[^}]*}/ms;
  const resolveBlockRe = /resolve\s*:\s*{[^}]*}/ms;

  if (aliasBlockRe.test(t)) {
    if (!t.includes("'@fc'") && !t.includes('"@fc"')) {
      t = t.replace(aliasBlockRe, blk => blk.replace(/alias\s*:\s*{/, m => `${m}\n      ${fcLine}\n      `));
      changed = true;
    }
  } else if (resolveBlockRe.test(t)) {
    t = t.replace(resolveBlockRe, blk => blk.replace(/{/, `{\n    alias: {\n      ${fcLine}\n    },`));
    changed = true;
  } else {
    t = t.replace(/defineConfig\(\s*{/, m => `${m}
  resolve: {
    alias: {
      ${fcLine}
    },
  },`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f + '.bak', fs.readFileSync(f));
    fs.writeFileSync(f, t);
    console.log('✓ Patched', f);
  } else {
    console.log('• No changes needed for', f);
  }
}
NODE

# 4) Replace CSS imports in PersonalCalendar with RELATIVE imports (never fail)
node <<'NODE'
const fs = require('fs');
const path = require('path');

function fix(file) {
  if (!fs.existsSync(file)) return;
  let t = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove any old FullCalendar css imports (various variants)
  t = t.replace(/^\s*import\s+['"]@fullcalendar\/(?:daygrid|timegrid|list)\/(?:index|main)\.css['"];\s*$/mg, s=>{changed=true; return ''});
  t = t.replace(/^\s*import\s+['"]@fc\/(?:daygrid|timegrid|list)\.css['"];\s*$/mg, s=>{changed=true; return ''});
  t = t.replace(/^\s*import\s+['"]@shared\/vendor\/fullcalendar\/(?:daygrid|timegrid|list)\.css['"];\s*$/mg, s=>{changed=true; return ''});

  const here = path.dirname(file);
  const vendor = path.resolve('src/vendor/fullcalendar');
  const rel = p => {
    let r = path.relative(here, path.join(vendor, p)).split(path.sep).join('/');
    if (!r.startsWith('.')) r = './' + r;
    return r;
  };

  const cssBlock =
    `import '${rel('daygrid.css')}';\n` +
    `import '${rel('timegrid.css')}';\n` +
    `import '${rel('list.css')}';\n`;

  if (!/daygrid\.css['"];/.test(t)) {
    // Place right after the FullCalendar react import if present
    const re = /import\s+FullCalendar\s+from\s+['"]@fullcalendar\/react['"];\s*/;
    if (re.test(t)) t = t.replace(re, m => m + cssBlock);
    else t = cssBlock + t;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file + '.bak', fs.readFileSync(file));
    fs.writeFileSync(file, t);
    console.log('✓ Updated CSS imports in', file);
  } else {
    console.log('• CSS imports already OK in', file);
  }
}

['src/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx',
 'src/modules/Maestro-BQT/client/pages/PersonalCalendar.jsx',
].forEach(fix);
NODE

echo "== Done. Now restart your dev server =="
