#!/usr/bin/env bash
set -euo pipefail
changed=0
while IFS= read -r -d '' f; do
  if grep -qE '(useState|useRef)<' "$f"; then
    tmp="$f.tmp"
    sed -E 's/(useState|useRef)<[^>]*>\s*\(/\1(/g' "$f" > "$tmp"
    if ! diff -q "$f" "$tmp" >/dev/null; then
      mv "$tmp" "$f"
      echo "🛠  stripped TS generics in $f"
      changed=$((changed+1))
    else
      rm "$tmp"
    fi
  fi
done < <(find src -type f -name '*.jsx' -print0)

echo "✅ Updated $changed file(s)."
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev…"
npm run dev -- --force
