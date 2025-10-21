#!/bin/bash
set -e

TARGET_DIR="$(pwd)"
SUMMARY_FILE="$TARGET_DIR/post_install_summary.txt"

echo "=== LUCCCA Post-Install ==="
echo "Target: $TARGET_DIR"
echo "Generating summary: $SUMMARY_FILE"

# Step 1: Confirm frontend dependencies
if [ -d "$TARGET_DIR/EchoCore_Framework_Ready" ]; then
  echo "Installing npm packages in EchoCore_Framework_Ready..."
  cd "$TARGET_DIR/EchoCore_Framework_Ready"
  npm install
  cd "$TARGET_DIR"
fi

# Step 2: Create summary
echo "File summary generated on $(date)" > "$SUMMARY_FILE"
echo "==================================" >> "$SUMMARY_FILE"
find "$TARGET_DIR" -type f >> "$SUMMARY_FILE"

echo "Post-install complete. Summary is at $SUMMARY_FILE"
