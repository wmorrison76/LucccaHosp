#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
DEST="$ROOT/src/vendor/fullcalendar"
echo "== Repair FullCalendar & Vite alias =="
echo "Project: $ROOT"

need_pkg() {
  local pkg="$1"
  if [ ! -d "$ROOT/node_modules/@fullcalendar/$pkg" ]; then
    echo "• installing @fullcalendar/$pkg …"
    if command -v pnpm >/dev/null 2>&1; then pnpm add @fullcalendar/$pkg; else npm i -S @fullcalendar/$pkg; fi
  fi
}
need_pkg react
need_pkg daygrid
need_pkg timegrid
need_pkg list

mkdir -p "$DEST"
copy_css() {
  local pkg="$1" out="$2"
  local v6="$ROOT/node_modules/@fullcalendar/$pkg/index.css"
  local v5="$ROOT/node_modules/@fullcalendar/$pkg/main.css"
  if [ -f "$v6" ]; then cp "$v6" "$DEST/$out.css"; echo "✓ $out.css from index.css"
  elif [ -f "$v5" ]; then cp "$v5" "$DEST/$out.css"; echo "✓ $out.css from main.css"
  else echo "✗ missing CSS for @fullcalendar/$pkg"; exit 1; fi
}
copy_css daygrid daygrid
copy_css timegrid timegrid
copy_css list list

# Patch ALL vite config files to have an @fc alias → absolute path
node <<'NODE'
const fs = require('fs');
const path = require('path');
const glob = (p)=>require('child_process').execSync(`bash -lc 'ls -1 ${p} 2>/dev/null || true'`).toString().trim().split('\n').filter(Boolean);
const files = [
  ...glob('vite.config.{ts,js}'),
  ...glob('src/**/vite.config*.{ts,js}')
].filter((f,i,a)=>a.indexOf(f)===i);

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f,'utf8');
  let changed = false;

  if (!/from ['"]node:path['"]/.test(t) && !/from ['"]path['"]/.test(t)) {
    t = `import path from 'node:path';\n` + t; changed = true;
  }
  // ensure exactly one export default defineConfig (comment extras, if any)
  const matches = [...t.matchAll(/export\s+default\s+defineConfig\s*\(/g)];
  if (matches.length > 1) {
    let seen = 0;
    t = t.replace(/export\s+default\s+defineConfig\s*\(/g, m => (++seen>1 ? `// ${m}` : m));
    changed = true;
  }
  // inject @fc alias (absolute path so we don't care where the config lives)
  const aliasBlockRe = /resolve\s*:\s*{[^}]*alias\s*:\s*{[^}]*}/m;
  const resolveBlockRe = /resolve\s*:\s*{[^}]*}/m;
  const fcLine = `'@fc': path.resolve(process.cwd(), 'src/vendor/fullcalendar'),`;

  if (aliasBlockRe.test(t)) {
    const had = t.includes(fcLine);
    t = t.replace(aliasBlockRe, blk => blk.includes("'@fc'")||blk.includes('"@fc"') ? blk : blk.replace(/alias\s*:\s*{/, m=>`${m}\n      ${fcLine}\n      `));
    changed = changed || !had;
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
    fs.writeFileSync(f+'.bak', fs.readFileSync(f));
    fs.writeFileSync(f, t);
    console.log('✓ Patched', f);
  } else {
    console.log('• No changes needed for', f);
  }
}
NODE

# Normalize PersonalCalendar imports
fix_calendar_file() {
  local f="$1"
  [ -f "$f" ] || return 0
  node <<'NODE'
const fs = require('fs');
const f = process.argv[1];
let t = fs.readFileSync(f,'utf8'); let changed=false;

// remove any old css imports
t = t.replace(/^\s*import\s+['"]@fullcalendar\/(?:daygrid|timegrid|list)\/(?:index|main)\.css['"];\s*$/mg, ()=>{changed=true; return ''});
t = t.replace(/^\s*import\s+['"]@shared\/vendor\/fullcalendar\/(?:daygrid|timegrid|list)\.css['"];\s*$/mg, ()=>{changed=true; return ''});
t = t.replace(/^\s*import\s+['"]@fc\/(?:daygrid|timegrid|list)\.css['"];\s*$/mg, ()=>{changed=true; return ''});

// add our three lines right after FullCalendar react import
const css = "import '@fc/daygrid.css';\nimport '@fc/timegrid.css';\nimport '@fc/list.css';\n";
if (!t.includes("import '@fc/daygrid.css'")) {
  const re = /import\s+FullCalendar\s+from\s+['"]@fullcalendar\/react['"];\s*/;
  if (re.test(t)) { t = t.replace(re, m => m + css); changed = true; }
  else { t = css + t; changed = true; }
}

if (changed) { fs.writeFileSync(f+'.bak', fs.readFileSync(f)); fs.writeFileSync(f,t); console.log('✓ Updated CSS imports in', f); }
else { console.log('• CSS imports already OK in', f); }
NODE
}

while IFS= read -r f; do fix_calendar_file "$f"; done < <(find "$ROOT/src" -type f \( -name "PersonalCalendar.tsx" -o -name "PersonalCalendar.jsx" \))

echo "== Done. Restart your dev server =="
