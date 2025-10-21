#!/usr/bin/env bash
set -euo pipefail

# Locate the frontend dir (supports running from repo root or from frontend/)
if [ -f "vite.config.ts" ] && [ -f "package.json" ]; then
  FRONT="$(pwd)"
elif [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
  FRONT="$(cd frontend && pwd)"
else
  echo "Could not find frontend/. Run this from repo root or from frontend/."; exit 1
fi
echo "• frontend: $FRONT"
cd "$FRONT"

echo "== 1) Ensure FullCalendar libs =="
pnpm add @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list @fullcalendar/interaction @fullcalendar/rrule -w || true

echo "== 2) Vendor FullCalendar CSS =="
mkdir -p src/vendor/fullcalendar
for pkg in daygrid timegrid list; do
  SRC="node_modules/@fullcalendar/$pkg/index.css"
  DST="src/vendor/fullcalendar/$pkg.css"
  if [ -f "$SRC" ]; then
    cp "$SRC" "$DST"
    echo "  - wrote $DST"
  else
    echo "  ⚠ missing $SRC (install @fullcalendar/$pkg if styles are blank)"
  fi
done

echo "== 3) Normalize FC CSS imports in PersonalCalendar.tsx =="
PC="src/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx"
if [ -f "$PC" ]; then
  TMP="$PC.tmp.$$"
  # drop any existing vendor FC css imports (both @/vendor and @shared/vendor)
  awk '!/@shared\/vendor\/fullcalendar\/(daygrid|timegrid|list)\.css/ && !/@\/vendor\/fullcalendar\/(daygrid|timegrid|list)\.css/' "$PC" > "$TMP" || true
  {
    echo 'import "@/vendor/fullcalendar/daygrid.css";'
    echo 'import "@/vendor/fullcalendar/timegrid.css";'
    echo 'import "@/vendor/fullcalendar/list.css";'
    cat "$TMP"
  } > "$PC"
  rm -f "$TMP"
  echo "  - updated $PC"
else
  echo "  • Skipped: $PC not found (ok if PersonalCalendar lives elsewhere)"
fi

echo "== 4) Maestro shim so loader stops failing =="
SHIM="src/modules/Maestro-BQT/nova-lab-App.tsx"
mkdir -p "$(dirname "$SHIM")"
cat > "$SHIM" <<'TSX'
import React from "react";
// Temporary shim. Replace with your real Maestro app when ready, e.g.:
// export { default } from "./client/builder/maestro/App";
export default function NovaLabApp() {
  return <div style={{padding:16}}>Maestro BQT is wiring up…</div>;
}
TSX
echo "  - wrote $SHIM"

echo "== 5) Clean Vite cache =="
rm -rf node_modules/.vite .vite || true

echo "== 6) Free common dev ports =="
for p in 5173 5174 5175 8080 8081 8082 9091; do
  lsof -ti tcp:$p | tr '\n' '\0' | xargs -0 -n1 kill -9 2>/dev/null || true
done

echo
echo "== Done. Start servers in two tabs =="
echo "TAB A: cd \"$FRONT\" && pnpm vite --port 5173 --strictPort"
echo "TAB B: cd \"$FRONT\" && pnpm vite --config src/modules/EchoEventStudio/vite.config.server.ts --port 8080 --strictPort"
