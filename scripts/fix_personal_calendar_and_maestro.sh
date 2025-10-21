#!/usr/bin/env bash
set -euo pipefail

ROOT="$PWD"
FE="$ROOT/frontend"
PC="$FE/src/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx"
VITE_MAIN="$FE/vite.config.ts"
EES_CFG="$FE/src/modules/EchoEventStudio/vite.config.server.ts"

echo "== Fix PersonalCalendar CSS + Maestro wrapper =="

# --- ensure vendor fc css exists under frontend/src/vendor/fullcalendar
NM="$ROOT/node_modules"
[[ -d "$NM" ]] || NM="$FE/node_modules"
mkdir -p "$FE/src/vendor/fullcalendar"

copy_css () {
  local src="$NM/@fullcalendar/$1/index.css"
  local dst="$FE/src/vendor/fullcalendar/$2.css"
  if [[ -f "$src" ]]; then cp "$src" "$dst"; echo "  • $2.css ✓"; else echo "  • WARN: $src missing"; fi
}
copy_css daygrid daygrid
copy_css timegrid timegrid
copy_css list list

# --- make PersonalCalendar import the shared vendor css (works from any module)
if [[ -f "$PC" ]]; then
  cp "$PC" "$PC.bak.$(date +%Y%m%d-%H%M%S)"
  # remove any previous fc css imports
  sed -i '' -E '/@fullcalendar\/(daygrid|timegrid|list)\/(index|main)\.css/d' "$PC" 2>/dev/null || true
  sed -i '' -E '/@fc\/(daygrid|timegrid|list)\.css/d' "$PC" 2>/dev/null || true
  sed -i '' -E '@/vendor/fullcalendar/(daygrid|timegrid|list)\.css/d' "$PC" 2>/dev/null || true
  # insert our 3 imports right after the @fullcalendar/react import
  awk '
    BEGIN{done=0}
    {
      print
      if(!done && $0 ~ /@fullcalendar\/react/){
        print "import \x27@shared/vendor/fullcalendar/daygrid.css\x27;";
        print "import \x27@shared/vendor/fullcalendar/timegrid.css\x27;";
        print "import \x27@shared/vendor/fullcalendar/list.css\x27;";
        done=1
      }
    }
  ' "$PC" > "$PC.tmp" && mv "$PC.tmp" "$PC"
  echo "✓ PersonalCalendar.tsx now uses @shared/vendor/fullcalendar/*.css"
else
  echo "⚠ PersonalCalendar not found at $PC (skipped)"
fi

# --- ensure aliases in main vite config
if [[ -f "$VITE_MAIN" ]]; then
  cp "$VITE_MAIN" "$VITE_MAIN.bak.$(date +%Y%m%d-%H%M%S)"
  # add @shared -> ./src if missing
  grep -q "@shared" "$VITE_MAIN" || \
    sed -i '' 's#alias: {#alias: {\n      "@shared": path.resolve(__dirname, "./src"),#' "$VITE_MAIN"
  # ensure "@" -> ./src exists
  grep -q "alias: {[^}]*'@': path.resolve(__dirname, './src')" "$VITE_MAIN" || \
    sed -i '' 's#alias: {#alias: {\n      "@": path.resolve(__dirname, "./src"),#' "$VITE_MAIN"
  echo "✓ vite.config.ts has @ and @shared aliases"
else
  echo "⚠ vite.config.ts not found under frontend (skipped)"
fi

# --- ensure @shared alias in Echo Event Studio vite config
if [[ -f "$EES_CFG" ]]; then
  cp "$EES_CFG" "$EES_CFG.bak.$(date +%Y%m%d-%H%M%S)"
  grep -q "@shared" "$EES_CFG" || \
    sed -i '' 's#alias: {#alias: {\n      "@shared": require("path").resolve(__dirname, "../../"),#' "$EES_CFG"
  grep -q "server:" "$EES_CFG" || \
    sed -i '' 's#build:#server: { host: true, port: 8080 },\n  build:#' "$EES_CFG"
  echo "✓ EchoEventStudio config has @shared alias and server:8080"
else
  echo "ℹ EchoEventStudio vite config not found (ok if you start it via script)"
fi

# --- fix Maestro wrapper: nova-lab-App.tsx must default-export
NOVA="$FE/src/modules/Maestro-BQT/nova-lab-App.tsx"
PANEL="$FE/src/modules/Maestro-BQT/MaestroAppPanel.tsx"
if [[ -f "$PANEL" ]]; then
  :
else
  mkdir -p "$(dirname "$PANEL")"
  cat > "$PANEL" <<'TSX'
import React from "react";
import "./client/global.css";
import App from "./client/App";
export default function MaestroBqtPanel(props:any){
  return <div className="h-full w-full overflow-auto"><App {...props}/></div>;
}
TSX
fi
echo 'export { default } from "./MaestroAppPanel";' > "$NOVA"
echo "✓ nova-lab-App.tsx now re-exports MaestroAppPanel"

echo
echo "== Done =="
echo "Restart dev servers from the repo root:"
echo "  pnpm -C frontend dev         # 5173 main app"
echo "  pnpm -C frontend dev:echo    # 8080 Echo Event Studio"
