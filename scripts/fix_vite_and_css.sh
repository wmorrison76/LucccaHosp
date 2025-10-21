#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VC="$ROOT/frontend/vite.config.ts"
mkdir -p "$ROOT/frontend/src/vendor/fullcalendar"

# Write a clean vite.config.ts with a single default export (prevents alias confusion)
cat > "$VC" <<'TS'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "maestro": path.resolve(__dirname, "src/modules/Maestro-BQT/client"),
    },
  },
  server: { host: true, port: 5173 },
});
TS
echo "✓ wrote frontend/vite.config.ts"

# Make PersonalCalendar import vendor css from src/vendor/fullcalendar
PC="$ROOT/frontend/src/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx"
if [ -f "$PC" ]; then
  cp "$PC" "$PC.bak.$(date +%Y%m%d-%H%M%S)"
  # Remove any @fc/... or @fullcalendar/... css imports and replace with vendor copies
  sed -i '' -E '/@fc\/(daygrid|timegrid|list)\.css/d' "$PC" 2>/dev/null || true
  sed -i '' -E '/@fullcalendar\/(daygrid|timegrid|list)\/(index|main)\.css/d' "$PC" 2>/dev/null || true
  # ensure exactly these three lines exist once near the top after the react import block
  awk '
    BEGIN{printed=0}
    NR==1{print}
    /@fullcalendar\/react/ && !printed {
      print "import \"@/vendor/fullcalendar/daygrid.css\";"
      print "import \"@/vendor/fullcalendar/timegrid.css\";"
      print "import \"@/vendor/fullcalendar/list.css\";"
      printed=1
      next
    }
    {print}
  ' "$PC" > "$PC.tmp" && mv "$PC.tmp" "$PC"
  echo "✓ rewired PersonalCalendar.tsx to use src/vendor/fullcalendar/*.css"
else
  echo "• PersonalCalendar.tsx not found; skipping CSS rewrite"
fi
