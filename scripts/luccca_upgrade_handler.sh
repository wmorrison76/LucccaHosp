#!/bin/bash

# ========== LUCCCA SuperAdmin Remote Upgrade Handler ==========
# This script should be run with sudo or admin privileges.

# CONFIGURABLE VARIABLES
DOWNLOAD_DIR="$HOME/Downloads"
TARGET_DIR="$HOME/LUCCCA"
LOG_FILE="$TARGET_DIR/logs/guardian_upgrade.log"

# Create log directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Find the latest upgrade archive (.tar.gz or .tar)
UPGRADE_FILE=$(ls "$DOWNLOAD_DIR"/EchoStratus_LUCCCA_SuperAdmin_v1.tar{.gz,} 2>/dev/null | head -n 1)

if [ -z "$UPGRADE_FILE" ]; then
  echo "[ERROR] No upgrade file found in $DOWNLOAD_DIR." | tee -a "$LOG_FILE"
  exit 1
fi

echo "[INFO] Upgrade file detected: $UPGRADE_FILE" | tee -a "$LOG_FILE"

# (Optional) Validate the archive (gzip check only if .gz)
if [[ "$UPGRADE_FILE" == *.tar.gz ]]; then
  echo "[INFO] Verifying gzip integrity..." | tee -a "$LOG_FILE"
  if ! gzip -t "$UPGRADE_FILE"; then
    echo "[ERROR] File is corrupted or incomplete: $UPGRADE_FILE" | tee -a "$LOG_FILE"
    exit 1
  fi
  echo "[INFO] Archive format is gzip." | tee -a "$LOG_FILE"
  EXTRACT_CMD="tar -xvzf"
else
  echo "[INFO] Archive format is plain tar." | tee -a "$LOG_FILE"
  EXTRACT_CMD="tar -xvf"
fi

# Extracting safely
echo "[INFO] Extracting to $TARGET_DIR..." | tee -a "$LOG_FILE"
$EXTRACT_CMD "$UPGRADE_FILE" -C "$TARGET_DIR" --strip-components=1

# Post-extraction success
echo "[SUCCESS] Upgrade applied successfully at $(date)." | tee -a "$LOG_FILE"

# Trigger remote guardian hook if exists
if [ -f "$TARGET_DIR/guardian/hook.sh" ]; then
  echo "[INFO] Triggering Guardian Hook..." | tee -a "$LOG_FILE"
  bash "$TARGET_DIR/guardian/hook.sh" --event "upgrade_applied" --source "$UPGRADE_FILE"
fi

exit 0
