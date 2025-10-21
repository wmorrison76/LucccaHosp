#!/usr/bin/env bash
set -euo pipefail

echo "🔎 finding stray EOF lines under src/…"
grep -RIn '^[[:space:]]*EOF[[:space:]]*$' src 2>/dev/null || true

# delete lines that are just "EOF" in code files
while IFS= read -r -d '' f; do
  sed -i '' -e '/^[[:space:]]*EOF[[:space:]]*$/d' "$f"
  echo "🧹 cleaned $f"
done < <(grep -RIlZ '^[[:space:]]*EOF[[:space:]]*$' src 2>/dev/null || true)

# park any *.save files so Vite never scans them
while IFS= read -r -d '' f; do
  mkdir -p archive/misc
  mv -f "$f" "archive/misc/$(basename "$f")"
  echo "📦 moved $f -> archive/misc/"
done < <(find src -type f -name '*.save' -print0 2>/dev/null)

echo "✅ re-scan (should print nothing now):"
grep -RIn '^[[:space:]]*EOF[[:space:]]*$' src 2>/dev/null || true

# clear Vite cache and restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
