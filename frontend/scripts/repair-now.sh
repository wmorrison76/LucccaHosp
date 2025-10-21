#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Repairing common build blockers..."

# 1) Make sure the backboard skin exists (satisfies @import in index.css)
if [ ! -f src/backboard.skin.css ]; then
  mkdir -p src
  cat > src/backboard.skin.css <<'CSS'
/* placeholder file created by repair-now.sh */
:root {}
CSS
  echo "✅ wrote src/backboard.skin.css (stub)"
fi

# 2) Any .jsx files that use TS keywords get renamed to .tsx
while IFS= read -r -d '' f; do
  new="${f%.jsx}.tsx"
  mv "$f" "$new"
  echo "🔁 renamed $f -> $new"
done < <(grep -RIlZ --include='*.jsx' -e '^\s*type\s' -e '^\s*interface\s' src 2>/dev/null || true)

# 3) Strip accidental absolute path or plugin headers on first lines
node - <<'NODE'
const fs = require('fs'), p = require('path');
function clean(file){
  let txt = fs.readFileSync(file,'utf8');
  const lines = txt.split(/\r?\n/);
  let changed=false;
  while (lines.length && (
    /^\s*\/(Users|home|var|Volumes)\//.test(lines[0]) ||
    /^\s*\[plugin:vite:/.test(lines[0]) ||
    /^\s*\[.+babel\]/i.test(lines[0])
  )) { lines.shift(); changed=true; }
  if (changed){ fs.writeFileSync(file, lines.join('\n')); console.log('🧼 cleaned header in', file); }
}
(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})) {
  const f = p.join(d,e.name);
  if (e.isDirectory()) walk(f);
  else if (/\.(t|j)sx?$/.test(e.name)) clean(f);
}})('src');
NODE

# 4) Fix duplicate type name in EmailIntegration component
target="src/modules/crm/client/components/EmailIntegration.tsx"
if [ -f "$target" ]; then
node - "$target" <<'NODE'
const fs=require('fs'); const file=process.argv[1];
let s=fs.readFileSync(file,'utf8'), before=s;
s=s.replace(/\binterface\s+EmailIntegration\b/g,'interface EmailService');
s=s.replace(/\btype\s+EmailIntegration\b/g,'type EmailService');
s=s.replace(/<\s*EmailIntegration\s*\[/g,'<EmailService[');
s=s.replace(/<\s*EmailIntegration\s*>/g,'<EmailService>');
s=s.replace(/:\s*EmailIntegration(\s*[\];}|])/g,': EmailService$1');
if (s!==before){ fs.writeFileSync(file,s); console.log('🧩 patched duplicate type name in', file); }
NODE
fi

# 5) Clear vite cache & restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev server..."
npm run dev -- --force
