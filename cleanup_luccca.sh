#!/bin/zsh

BASE_DIR=~/Desktop/LUCCCA/src
LOG_FILE=~/Desktop/LUCCCA/LUCCCA_Cleanup.log

echo "Starting LUCCCA cleanup..."
> "$LOG_FILE"

# 1. Remove placeholder or dummy files
echo "Removing placeholder files..." | tee -a "$LOG_FILE"
find "$BASE_DIR" -type f \( \
  -name "Placeholder.jsx" -o \
  -name "placeholder.js" -o \
  -name "temp.js" -o \
  -name "dummy.jsx" -o \
  -name "*.bak" \
\) -print -delete | tee -a "$LOG_FILE"

# 2. Remove empty directories
echo "Pruning empty directories..." | tee -a "$LOG_FILE"
find "$BASE_DIR" -type d -empty -print -delete | tee -a "$LOG_FILE"

# 3. Log size after cleanup
echo "Disk usage after cleanup:" | tee -a "$LOG_FILE"
du -sh "$BASE_DIR" | tee -a "$LOG_FILE"

echo "Cleanup complete. See $LOG_FILE"

