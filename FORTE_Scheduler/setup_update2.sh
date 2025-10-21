#!/bin/bash
set -e
echo "=== Installing FORTE Scheduler Update 2 ==="
TARGET_DIR="$HOME/Desktop/LUCCCA/FORTE_Scheduler"
SRC_DIR="$(pwd)/FORTE_Scheduler_Update2"
if [ ! -d "$SRC_DIR" ]; then
  echo "Run this script from the directory where FORTE_Scheduler_Update2 exists."
  exit 1
fi
rsync -av "$SRC_DIR/" "$TARGET_DIR/"
echo "Installed to $TARGET_DIR"
