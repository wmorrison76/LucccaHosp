#!/usr/bin/env bash
# restore_frontend_*.sh — restore LUCCCA frontend from a backup archive
# Usage:
#   bash restore_frontend_<stamp>.sh /path/to/frontend-YYYYmmdd-HHMMSS.tar.gz [$HOME/Desktop/LUCCCA/frontend]
set -euo pipefail
ARCHIVE="${1:-}"
DEST="${2:-$HOME/Desktop/LUCCCA/frontend}"
if [ -z "$ARCHIVE" ]; then
  echo "Usage: $0 /path/to/frontend-backup.tar.gz [destination]"
  exit 1
fi
if [ ! -f "$ARCHIVE" ]; then
  echo "ERROR: Backup archive not found: $ARCHIVE"
  exit 1
fi
if [ -d "$DEST" ]; then
  TS="$(date +%Y%m%d-%H%M%S)"
  QUAR="$DEST.quarantine.$TS"
  echo "==> Moving current frontend to quarantine: $QUAR"
  mv "$DEST" "$QUAR"
fi
echo "==> Restoring from $ARCHIVE to $(dirname "$DEST") ..."
mkdir -p "$(dirname "$DEST")"
tar -xzf "$ARCHIVE" -C "$(dirname "$DEST")"
echo "==> Restore complete."
