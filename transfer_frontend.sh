#!/usr/bin/env bash
set -euo pipefail
SRC="${1:-$HOME/Desktop/LUCCCA_Broken/frontend}"
DST="$HOME/Desktop/LUCCCA/frontend"

echo "Source:      $SRC"
echo "Destination: $DST"

# What we will NOT copy (we keep your working project’s build/css entry points)
EXCLUDES=(
  "--exclude" ".git/"
  "--exclude" "node_modules/"
  "--exclude" "**/.DS_Store"
  "--exclude" "dist/"
  "--exclude" "package.json"
  "--exclude" "package-lock.json"
  "--exclude" "yarn.lock"
  "--exclude" "pnpm-lock.yaml"
  "--exclude" "bun.lockb"
  "--exclude" "vite.config.*"
  "--exclude" "postcss.config.*"
  "--exclude" "tailwind.config.*"
  "--exclude" "index.html"
  "--exclude" "public/tw.css"
  "--exclude" "src/index.css"
  "--exclude" "src/styles/*.css"
  "--exclude" "src/main.jsx"
)

if [[ "${2:-}" == "--apply" ]]; then
  echo "Creating safety snapshot…"
  if command -v git >/dev/null 2>&1 && [[ -d "$DST/.git" ]]; then
    (cd "$DST" && git add -A && git commit -m "Pre-transfer snapshot" || true)
  fi

  echo "APPLYING copy…"
  rsync -avh --progress --delete \
    "${EXCLUDES[@]}" \
    "$SRC/" "$DST/"

  echo "✅ Copy done."
  if command -v git >/dev/null 2>&1 && [[ -d "$DST/.git" ]]; then
    (cd "$DST" && git add -A && git commit -m "Transfer frontend from LUCCCA_Broken" || true)
  fi
else
  echo "🧪 DRY RUN (no changes)…"
  rsync -avh --dry-run \
    "${EXCLUDES[@]}" \
    "$SRC/" "$DST/"
  echo ""
  echo "When ready, run:"
  echo "  bash ../transfer_frontend.sh \"$SRC\" --apply"
fi
