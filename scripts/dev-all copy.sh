#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "== LUCCCA multi-dev launcher =="
echo "root: $ROOT"
echo "web:  http://localhost:5173"
echo "echo: http://localhost:8080"
echo

# ensure concurrently is present in the workspace
pnpm add -w -D concurrently >/dev/null 2>&1 || true

CMDS=()
NAMES=()

# 8080 Echo Event Studio (only if script OR vite config exists)
if jq -e '.scripts["dev:echo"]' "$ROOT/frontend/package.json" >/dev/null 2>&1; then
  CMDS+=("pnpm -C frontend dev:echo"); NAMES+=("ECHO:8080")
elif [ -f "$ROOT/frontend/src/modules/EchoEventStudio/vite.config.server.ts" ]; then
  CMDS+=("pnpm -C frontend vite --config src/modules/EchoEventStudio/vite.config.server.ts"); NAMES+=("ECHO:8080")
else
  echo "⚠ Skipping Echo Event Studio (no dev:echo script or vite.config.server.ts)."
fi

# 5173 Web
CMDS+=("pnpm -C frontend dev"); NAMES+=("WEB:5173")

# Optional services if you add them later
[ -d "$ROOT/services/image-gen" ] && { CMDS+=("pnpm -C services/image-gen dev"); NAMES+=("IMG"); }
[ -d "$ROOT/services/echo-ai"   ] && { CMDS+=("pnpm -C services/echo-ai dev");   NAMES+=("AI");  }

pnpm -w exec concurrently -k --prefix "[{name}]" --names "$(IFS=,; echo "${NAMES[*]}")" "${CMDS[@]}"
