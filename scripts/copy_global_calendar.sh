#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/frontend/src/modules/EchoEventStudio"
DEST="$ROOT/frontend/src/modules/GlobalCalendar"
VENDOR="$ROOT/frontend/src/vendor/fullcalendar"

echo "== Copying Global Calendar from EchoEventStudio =="
if [ ! -d "$SRC" ]; then
  echo "❌ Not found: $SRC"; exit 1
fi

mkdir -p "$DEST/client/pages" "$DEST/client/components" "$DEST/client/lib" "$DEST/client/hooks"

# Always copy the page entry
if [ -f "$SRC/client/pages/GlobalCalendar.tsx" ]; then
  cp "$SRC/client/pages/GlobalCalendar.tsx" "$DEST/client/pages/GlobalCalendar.tsx"
else
  echo "❌ Missing: $SRC/client/pages/GlobalCalendar.tsx"; exit 1
fi

# Copy common places the page typically imports from (safe no-ops if absent)
for d in components lib hooks styles css assets data api; do
  if [ -d "$SRC/client/$d" ]; then
    rsync -a --delete --exclude 'node_modules' "$SRC/client/$d/" "$DEST/client/$d/"
    echo "• copied client/$d"
  fi
done

# Local global.css if used by components
if [ -f "$SRC/client/global.css" ]; then
  mkdir -p "$DEST/client"
  cp "$SRC/client/global.css" "$DEST/client/global.css"
fi

# Minimal module index to import it easily
cat > "$DEST/index.ts" <<'TS'
export { default } from "./client/pages/GlobalCalendar";
TS

# Ensure vendor FullCalendar CSS exists (we import these from our own src to dodge package exports)
mkdir -p "$VENDOR"
for pkg in daygrid timegrid list; do
  if [ ! -f "$VENDOR/$pkg.css" ]; then
    css="$ROOT/frontend/node_modules/@fullcalendar/$pkg/index.css"
    if [ -f "$css" ]; then
      cp "$css" "$VENDOR/$pkg.css"
      echo "• vendor CSS: $pkg.css"
    else
      echo "⚠ Could not find $css — run: pnpm -C frontend add @fullcalendar/$pkg"
    fi
  fi
done

echo "== Done =="
echo "Module at: frontend/src/modules/GlobalCalendar"
echo "Import with:  import GlobalCalendar from \"@/modules/GlobalCalendar\""
