#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"

# Where your real CRM components might live (ordered by priority)
CANDIDATE_ROOTS=(
  "src/modules/crm/client/components"
  "echocrm-merged/client/components"
)

bridge () {
  local spec="$1"                         # e.g., "SalesPipeline" or "ui/card"
  local out="src/components/$spec.tsx"    # bridge lives under src/components

  # If we already have something, skip.
  if [ -f "$out" ] || [ -f "${out%.tsx}.jsx" ]; then
    echo "↩︎ $out already exists"
    return
  fi

  # Find the first real file that exists for this spec in the candidate roots
  local found=""
  for root in "${CANDIDATE_ROOTS[@]}"; do
    for ext in tsx jsx ts js; do
      local p="$root/$spec.$ext"
      if [ -f "$p" ]; then
        found="$p"
        break 2
      fi
      # also allow index files under a folder
      local p2="$root/$spec/index.$ext"
      if [ -f "$p2" ]; then
        found="$p2"
        break 2
      fi
    done
  done

  mkdir -p "$(dirname "$out")"

  if [ -n "$found" ]; then
    # create a re-export bridge
    rel="$(python3 - <<PY
import os, sys
print(os.path.relpath("$found", os.path.dirname("$out")).replace(os.sep,"/"))
PY
)"
    cat > "$out" <<TSX
export { default } from "./${rel}";
export * from "./${rel}";
TSX
    echo "✅ bridged @$spec -> $found"
  else
    # last resort: stub so the app can run
    cat > "$out" <<'TSX'
export default function StubComponent() {
  return <div className="p-4 border rounded-lg">Stub: missing component</div>;
}
TSX
    echo "⚠️  stubbed @$spec (no real file found in candidates)"
  fi
}

# Bridge the components used by the SalesPipeline page
bridge "SalesPipeline"
bridge "DailyTodos"
bridge "LeadQualification"
bridge "EmailIntegration"
bridge "FollowUpAutomation"
bridge "CustomerLifecycle"
bridge "AISalesAssistant"

# Clear vite cache and restart
if [ -d node_modules/.vite ]; then rm -rf node_modules/.vite; fi
npm run dev -- --force
