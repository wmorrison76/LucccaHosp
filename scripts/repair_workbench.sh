#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
FE="$ROOT/frontend"

echo "== Repairing workspace, Vite caches, calendar CSS, wrappers =="

# 1) Ensure pnpm workspace
if [[ ! -f pnpm-workspace.yaml ]]; then
  printf "packages:\n  - frontend\n" > pnpm-workspace.yaml
  echo "✓ pnpm-workspace.yaml created"
else
  echo "• pnpm-workspace.yaml already exists"
fi

# 2) Make sure frontend has dev scripts for web (5173) and Echo (8080)
if command -v jq >/dev/null 2>&1; then
  jq '.scripts += {"dev:echo":"vite --config src/modules/EchoEventStudio/vite.config.server.ts"}' "$FE/package.json" > "$FE/package.tmp" && mv "$FE/package.tmp" "$FE/package.json"
else
  # light fallback: add if missing
  grep -q '"dev:echo"' "$FE/package.json" || \
    sed -i '' 's#"scripts": {#"scripts": {\n    "dev:echo": "vite --config src/modules/EchoEventStudio/vite.config.server.ts",#' "$FE/package.json"
fi
echo "✓ frontend/package.json has dev:echo"

# 3) Use npm Excalidraw CSS (stop using unpkg URL)
( cd "$FE" && pnpm add @excalidraw/excalidraw@latest -D --silent || true )
grep -RIl --include="*.{html,jsx,tsx}" 'unpkg.com/@excalidraw' "$FE" | while read -r f; do
  cp "$f" "$f.bak.$(date +%Y%m%d-%H%M%S)"
  sed -i '' '/unpkg\.com\/@excalidraw/d' "$f" || true
  echo "• removed unpkg excalidraw link from $f"
done
# ensure global import exists
GLOBAL="$FE/src/global.css"
mkdir -p "$(dirname "$GLOBAL")"
touch "$GLOBAL"
grep -q "@excalidraw/excalidraw/dist/excalidraw.min.css" "$GLOBAL" || \
  echo "@import '@excalidraw/excalidraw/dist/excalidraw.min.css';" >> "$GLOBAL"
echo "✓ Excalidraw CSS imported via npm"

# 4) PersonalCalendar CSS: use shared vendor copies so both 5173 and 8080 resolve paths
mkdir -p "$FE/src/vendor/fullcalendar"
NM="$ROOT/node_modules"; [[ -d "$FE/node_modules" ]] && NM="$FE/node_modules"
for pair in "daygrid daygrid" "timegrid timegrid" "list list"; do
  set -- $pair
  [[ -f "$NM/@fullcalendar/$1/index.css" ]] && cp "$NM/@fullcalendar/$1/index.css" "$FE/src/vendor/fullcalendar/$2.css"
done
PC="$FE/src/modules/Maestro-BQT/client/pages/PersonalCalendar.tsx"
if [[ -f "$PC" ]]; then
  cp "$PC" "$PC.bak.$(date +%Y%m%d-%H%M%S)"
  sed -i '' -E '/@fullcalendar\/(daygrid|timegrid|list)\/(main|index)\.css/d' "$PC" 2>/dev/null || true
  sed -i '' -E '@/vendor\/fullcalendar\/(daygrid|timegrid|list)\.css/d' "$PC" 2>/dev/null || true
  awk '
    BEGIN{ins=0}
    {print}
    /@fullcalendar\/react/ && !ins {
      print "import \"@/vendor/fullcalendar/daygrid.css\";";
      print "import \"@/vendor/fullcalendar/timegrid.css\";";
      print "import \"@/vendor/fullcalendar/list.css\";";
      ins=1
    }' "$PC" > "$PC.tmp" && mv "$PC.tmp" "$PC"
  echo "✓ PersonalCalendar now imports vendor fc css"
fi

# 5) Ensure vite aliases (@ and @shared) exist
VITE="$FE/vite.config.ts"
if [[ -f "$VITE" ]]; then
  cp "$VITE" "$VITE.bak.$(date +%Y%m%d-%H%M%S)"
  grep -q "@shared" "$VITE" || sed -i '' 's#alias: {#alias: {\n      "@shared": path.resolve(__dirname, "./src"),#' "$VITE"
  grep -q "['\"]@['\"]: path.resolve(__dirname, './src')" "$VITE" || \
    sed -i '' 's#alias: {#alias: {\n      "@": path.resolve(__dirname, "./src"),#' "$VITE"
  echo "✓ vite aliases ensured"
fi

# 6) Fix Maestro wrapper default export
echo 'export { default } from "./MaestroAppPanel";' > "$FE/src/modules/Maestro-BQT/nova-lab-App.tsx"
echo "✓ nova-lab-App.tsx re-exports MaestroAppPanel"

# 7) Clear Vite caches so 504s go away
rm -rf "$FE/node_modules/.vite" "$FE/.vite" || true
echo "✓ cleared frontend/.vite caches"

# 8) Simple dev-all launcher (no workspace flags)
cat > "$ROOT/scripts/dev-all.sh" <<'RUN'
#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/frontend"
pnpm i
pnpm add -D concurrently@8 --silent || true
./node_modules/.bin/concurrently -k -n WEB,ECHO \
  "pnpm dev -- --force" \
  "pnpm dev:echo"
RUN
chmod +x "$ROOT/scripts/dev-all.sh"

echo
echo "== Done =="
echo "Start servers with:"
echo "  cd \"$ROOT\" && ./scripts/dev-all.sh"
