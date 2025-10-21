#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
DEST="$ROOT/src/vendor/fullcalendar"
mkdir -p "$DEST"

copy_css() {
  local pkg="$1" name="$2"
  local v6="$ROOT/node_modules/@fullcalendar/$pkg/index.css"
  local v5="$ROOT/node_modules/@fullcalendar/$pkg/main.css"
  if [ -f "$v6" ]; then
    cp "$v6" "$DEST/$name.css"
    echo "✓ Copied $v6 -> $DEST/$name.css"
  elif [ -f "$v5" ]; then
    cp "$v5" "$DEST/$name.css"
    echo "✓ Copied $v5 -> $DEST/$name.css"
  else
    echo "✗ Could not find CSS for @fullcalendar/$pkg (index.css or main.css)"
    exit 1
  fi
}

copy_css daygrid daygrid
copy_css timegrid timegrid
copy_css list list
echo "All done. Import with: import '@fc/daygrid.css'; import '@fc/timegrid.css'; import '@fc/list.css';"
