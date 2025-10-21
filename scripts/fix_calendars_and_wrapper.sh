#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONT="$ROOT/frontend"
SRC="$FRONT/src"

echo "== calendar + wrapper fix =="

# workspace file so pnpm -F works nicely
if [ ! -f "$ROOT/pnpm-workspace.yaml" ]; then
  cat > "$ROOT/pnpm-workspace.yaml" <<'YAML'
packages:
  - frontend
YAML
  echo "✓ created pnpm-workspace.yaml"
fi

# vendor the FC css
install -d "$SRC/vendor/fullcalendar"
cp "$ROOT/node_modules/@fullcalendar/daygrid/index.css"  "$SRC/vendor/fullcalendar/daygrid.css"  2>/dev/null || true
cp "$ROOT/node_modules/@fullcalendar/timegrid/index.css" "$SRC/vendor/fullcalendar/timegrid.css" 2>/dev/null || true
cp "$ROOT/node_modules/@fullcalendar/list/index.css"     "$SRC/vendor/fullcalendar/list.css"     2>/dev/null || true
echo "✓ vendor css placed in src/vendor/fullcalendar"

# patch PersonalCalendar imports
PC="$SRC/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx"
if [ -f "$PC" ]; then
  cp "$PC" "$PC.bak.$(date +%Y%m%d-%H%M%S)"
  sed -i '' '/@fc\/.*\.css/d' "$PC" 2>/dev/null || true
  sed -i '' '/@fullcalendar\/\(daygrid\|timegrid\|list\)\/.*\.css/d' "$PC" 2>/dev/null || true
  awk '
    BEGIN{ins=0}
    /@fullcalendar\/react/ && ins==0 {
      print $0;
      print "import \"@/vendor/fullcalendar/daygrid.css\";";
      print "import \"@/vendor/fullcalendar/timegrid.css\";";
      print "import \"@/vendor/fullcalendar/list.css\";";
      ins=1; next
    }
    {print}
  ' "$PC" > "$PC.tmp" && mv "$PC.tmp" "$PC"
  echo "✓ PersonalCalendar.tsx now imports vendor css"
fi

# ensure vite '@' alias
VC="$FRONT/vite.config.ts"
if [ -f "$VC" ]; then
  cp "$VC" "$VC.bak.$(date +%Y%m%d-%H%M%S)"
  sed -i '' '/@fc\/.*\.css/d' "$VC" 2>/dev/null || true
  grep -q "['\"]@['\"]:" "$VC" || \
    sed -i '' 's/alias: {/&\n      "@": path.resolve(__dirname, ".\/src"),/' "$VC"
  echo "✓ ensured '@' alias in vite.config.ts"
fi

# maestro wrapper + nova alias
MBQT_DIR="$SRC/modules/Maestro-BQT"
install -d "$MBQT_DIR"
cat > "$MBQT_DIR/MaestroAppPanel.tsx" <<'TSX'
import React from "react";
import "./client/global.css";
import App from "./client/App";
export default function MaestroBqtPanel(props: any) {
  return <div className="h-full w-full overflow-auto"><App {...props} /></div>;
}
TSX
echo 'export { default } from "./MaestroAppPanel";' > "$MBQT_DIR/nova-lab-App.tsx"
echo "✓ Maestro wrapper & nova re-export ready"

# GlobalCalendar scaffold (re-use personal for now)
GC_DIR="$SRC/modules/GlobalCalendar"
install -d "$GC_DIR"
echo 'export { default } from "../Maestro-BQT/client/pages/PersonalCalendar";' > "$GC_DIR/GlobalCalendar.tsx"
echo "✓ GlobalCalendar module created"

# inject route in Maestro App (/global-calendar)
APP="$SRC/modules/Maestro-BQT/client/App.tsx"
if [ -f "$APP" ]; then
  cp "$APP" "$APP.bak.$(date +%Y%m%d-%H%M%S)"
  grep -q 'from "../../GlobalCalendar/GlobalCalendar"' "$APP" || \
    sed -i '' '1,/^$/ s#^#import GlobalCalendar from "../../GlobalCalendar/GlobalCalendar";\n#' "$APP"
  if ! grep -q 'path="/global-calendar"' "$APP"; then
    sed -i '' 's#<Route path="\\\*" element={<NotFound />} />#<Route path="/global-calendar" element={<GlobalCalendar />} />\n          <Route path="*" element={<NotFound />} />#' "$APP"
    echo "✓ added /global-calendar route"
  fi
fi

echo "== done =="
