#!/bin/bash
set -e
echo "=== Installing FORTE Scheduler Update 3 ==="
TARGET_DIR="$HOME/Desktop/LUCCCA/FORTE_Scheduler"
SRC_DIR="$(pwd)/FORTE_Scheduler_Update3"
if [ ! -d "$SRC_DIR" ]; then
  echo "Run this script from the directory where FORTE_Scheduler_Update3 exists."
  exit 1
fi
rsync -av "$SRC_DIR/" "$TARGET_DIR/"
echo "Installed to $TARGET_DIR"
