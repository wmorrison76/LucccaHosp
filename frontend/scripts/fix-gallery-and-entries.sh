#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
echo "🔧 Fixing PastryPhotoGallery + pruning extra HTML entries…"

# 1) Overwrite broken gallery file with a safe stub
GALLERY="src/pages/PastryPhotoGallery.tsx"
mkdir -p "$(dirname "$GALLERY")"
cat > "$GALLERY" <<'TSX'
import React from "react";

export default function PastryPhotoGallery() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Pastry Photo Gallery</h1>
      <p className="text-muted-foreground">
        Temporary stub. Replace with your real gallery when ready.
      </p>
    </div>
  );
}
TSX
echo "✅ Rewrote $GALLERY"

# 2) Rename non-root index.html files so Vite ignores them
ROOT_INDEX="$ROOT/index.html"
RENAMED=0
while IFS= read -r -d '' f; do
  # skip the project root index.html
  if [ "$f" != "$ROOT_INDEX" ]; then
    mv "$f" "${f%.html}.archived.html"
    echo "🗂  archived: ${f#"$ROOT"/}"
    RENAMED=$((RENAMED+1))
  fi
done < <(find "$ROOT" -type f -name "index.html" -print0)

if [ "$RENAMED" -eq 0 ]; then
  echo "ℹ️  no extra index.html files found."
else
  echo "✅ Renamed $RENAMED extra index.html file(s)."
fi

# 3) Clear Vite cache & restart dev
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev (force)…"
npm run dev -- --force
