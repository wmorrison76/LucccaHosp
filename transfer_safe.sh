#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage:"
  echo "  cd ~/Desktop/LUCCCA           # destination (working project)"
  echo "  bash ./transfer_safe.sh \"../LUCCCA_Broken\"         # dry run"
  echo "  bash ./transfer_safe.sh \"../LUCCCA_Broken\" --apply # apply"
  exit 1
}

SRC="${1:-}"; [[ -z "${SRC}" ]] && usage
APPLY="${2:-}"
DEST="$(pwd)"

[[ -d "${SRC}" ]] || { echo "Source not found: ${SRC}"; exit 1; }
[[ -d "${SRC}/src" ]] || { echo "Expected ${SRC}/src to exist"; exit 1; }
mkdir -p "${DEST}/src"

echo "Source:      ${SRC}"
echo "Destination: ${DEST}"

RSYNC_FILTERS=(
  "--exclude=.DS_Store"
  "--exclude=package-lock.json"
  "--exclude=yarn.lock"
  "--exclude=pnpm-lock.yaml"
  "--exclude=bun.lockb"
  "--exclude=package.json"
  "--exclude=postcss.config.*"
  "--exclude=tailwind.config.*"
  "--exclude=vite.config.*"
  "--exclude=index.html"
  "--exclude=public/tw.css"
  "--exclude=src/index.css"
  "--exclude=src/styles/*.css"
  "--exclude=src/main.jsx"
)

if [[ "${APPLY}" == "--apply" ]]; then
  if command -v git >/dev/null 2>&1 && [[ -d .git ]]; then
    echo "Creating safety commit..."
    git add -A || true
    git commit -m "Pre-transfer safety snapshot" || true
  fi
  echo "APPLYING copy from Broken → Working…"
  rsync -avh --progress "${RSYNC_FILTERS[@]}" "${SRC}/src/" "./src/"
  echo "Done."

  if command -v git >/dev/null 2>&1 && [[ -d .git ]]; then
    git add src || true
    git commit -m "Transfer safe app code from ${SRC} ($(date))" || true
  fi
else
  echo "DRY RUN (no changes)…"
  rsync -avh --dry-run "${RSYNC_FILTERS[@]}" "${SRC}/src/" "./src/"
  echo ""
  echo "Review the DRY RUN above."
  echo "When ready to APPLY the copy, run:"
  echo "  bash ./transfer_safe.sh \"${SRC}\" --apply"
fi
