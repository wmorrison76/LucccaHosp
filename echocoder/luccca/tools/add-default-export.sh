#!/usr/bin/env bash
set -euo pipefail

FILE="${1:-}"
if [[ -z "$FILE" || ! -f "$FILE" ]]; then
  echo "Usage: $0 <path-to-.jsx/.tsx>"
  exit 1
fi

# Already has a default export?
if grep -q 'export default' "$FILE"; then
  echo "✅ $FILE already has a default export."
  exit 0
fi

# If the file declares a symbol named CakeDesignSummary, alias that
if grep -Eq '(^|[[:space:]])(function|class)[[:space:]]+CakeDesignSummary\b|(^|[[:space:]])const[[:space:]]+CakeDesignSummary\b' "$FILE"; then
  printf '\nexport default CakeDesignSummary;\n' >> "$FILE"
  echo "✅ Added: export default CakeDesignSummary; to $FILE"
  exit 0
fi

# Otherwise, pick the first exported symbol and alias it
NAME="$(awk 'match($0,/export[ \t]+(const|function|class)[ \t]+([A-Za-z_][A-Za-z0-9_]*)/,m){ print m[2]; exit }' "$FILE")"
if [[ -n "$NAME" ]]; then
  printf '\n// Default alias for consumers expecting a default export\nexport default %s;\n' "$NAME" >> "$FILE"
  echo "✅ Added: export default $NAME; to $FILE"
  exit 0
fi

echo "⚠️  Could not detect an exported symbol in $FILE. Tell me the component name and I’ll alias it."
exit 2
