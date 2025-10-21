#!/usr/bin/env bash
set -euo pipefail

# This script is meant to be run from *inside* the frontend/ folder
APP="$(pwd)"                                      # …/LUCCCA/frontend
SRC="$APP/src/modules/EchoEventStudio"            # source module root
DEST="$APP/src/modules/GlobalCalendar"            # destination module root

# Find the entry file (try common locations)
if [ -f "$SRC/client/pages/GlobalCalendar.tsx" ]; then
  ENTRY="$SRC/client/pages/GlobalCalendar.tsx"
else
  # fallback: search anywhere under EchoEventStudio for that file name
  ENTRY="$(find "$SRC" -type f -name GlobalCalendar.tsx | head -n1 || true)"
fi

echo "== Copying GlobalCalendar dependency graph =="
echo "Source root: $SRC"
echo "Entry file : ${ENTRY:-[NOT FOUND]}"
echo "Dest root  : $DEST"
if [ -z "${ENTRY:-}" ] || [ ! -f "$ENTRY" ]; then
  echo "❌ Could not find GlobalCalendar.tsx under EchoEventStudio."
  echo "   Make sure it exists (e.g. src/modules/EchoEventStudio/client/pages/GlobalCalendar.tsx)."
  exit 1
fi

# Node helper: walk relative-import graph and copy files, preserving client/ structure
node - <<'NODE' "$SRC" "$ENTRY" "$DEST"
const fs = require('fs');
const path = require('path');
const [SRC, ENTRY, DEST] = process.argv.slice(2);
const CLIENT = path.join(SRC, 'client');  // only copy things under client/

const exts = ['', '.tsx', '.ts', '.jsx', '.js', '.css', '.json'];
const seen = new Set();
const files = [];

function resolveImport(from, spec) {
  if (!spec.startsWith('.')) return null;            // only chase local/relative imports
  const baseDir = path.dirname(from);
  const tryFile = p => (fs.existsSync(p) && fs.statSync(p).isFile()) ? p : null;

  // direct file with/without ext
  let p = path.resolve(baseDir, spec);
  for (const e of exts) {
    const hit = tryFile(p + e);
    if (hit) return hit;
  }
  // index.* inside a folder
  for (const e of exts.slice(1)) {
    const hit = tryFile(path.join(p, 'index' + e));
    if (hit) return hit;
  }
  return null;
}

function parseImports(code, isCss) {
  const out = [];
  const re = /\b(?:import|export)\b[^'"]*?from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m; while ((m = re.exec(code))) out.push(m[1] || m[2] || m[3]);
  if (isCss) {
    const re2 = /@import\s+['"]([^'"]+)['"]/g;
    let m2; while ((m2 = re2.exec(code))) out.push(m2[1]);
  }
  return out;
}

const queue = [ENTRY];
while (queue.length) {
  const file = queue.pop();
  if (seen.has(file)) continue;
  seen.add(file);

  const code = fs.readFileSync(file, 'utf8');
  files.push(file);

  const imports = parseImports(code, file.endsWith('.css'));
  for (const spec of imports) {
    const abs = resolveImport(file, spec);
    if (abs && abs.startsWith(CLIENT)) queue.push(abs);  // only copy things under client/
  }
}

function copyPreservingClientRoot(srcFile, destRoot) {
  const relFromClient = path.relative(CLIENT, srcFile);
  const out = path.join(destRoot, 'client', relFromClient);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.copyFileSync(srcFile, out);
  return out;
}

fs.mkdirSync(DEST, { recursive: true });
let copied = 0;
for (const f of files) {
  copyPreservingClientRoot(f, DEST);
  copied++;
}
fs.writeFileSync(path.join(DEST, 'index.ts'), 'export { default } from "./client/pages/GlobalCalendar";\n');

console.log(`COPIED ${copied} files under: ${DEST}`);
NODE

# Ensure FullCalendar CSS is available for imports like "@/vendor/fullcalendar/*.css"
VENDOR="$APP/src/vendor/fullcalendar"
mkdir -p "$VENDOR"
for pkg in daygrid timegrid list; do
  if [ -f "$VENDOR/$pkg.css" ]; then
    echo "✓ vendor/$pkg.css exists"
  else
    SRC_CSS="$APP/node_modules/@fullcalendar/$pkg/index.css"
    if [ -f "$SRC_CSS" ]; then
      cp "$SRC_CSS" "$VENDOR/$pkg.css"
      echo "✓ copied $pkg.css to src/vendor/fullcalendar/"
    else
      echo "⚠ Missing $SRC_CSS — install @fullcalendar/$pkg in frontend and re-run."
    fi
  fi
done

echo
echo "== Done =="
echo "• New module: $DEST"
echo "• Import with:  import GlobalCalendar from \"@/modules/GlobalCalendar\""
