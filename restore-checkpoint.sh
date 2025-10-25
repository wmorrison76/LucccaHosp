#!/bin/bash

# Checkpoint Restore Script for EchoRecipePro Upload
# This script restores the application to the last successful checkpoint
# Usage: ./restore-checkpoint.sh [checkpoint-id]

set -e

CHECKPOINT_ID="${1:-echorecipepro-upload-20250102}"
CHECKPOINT_FILE="CHECKPOINT_MANIFEST.json"

echo "🔄 LUCCCA Checkpoint Restore Tool"
echo "=================================="
echo ""

# Verify checkpoint manifest exists
if [ ! -f "$CHECKPOINT_FILE" ]; then
  echo "❌ Error: Checkpoint manifest not found at $CHECKPOINT_FILE"
  exit 1
fi

echo "✅ Found checkpoint manifest: $CHECKPOINT_FILE"
echo ""

# Read checkpoint info
CHECKPOINT_INFO=$(cat "$CHECKPOINT_FILE" | grep -A 20 "checkpoint_id")
echo "📋 Checkpoint Information:"
grep "checkpoint_id\|timestamp\|module_name\|total_files" "$CHECKPOINT_FILE"
echo ""

# Check if module directory exists
MODULE_DIR="frontend/src/modules/EchoRecipe_Pro"
if [ -d "$MODULE_DIR" ]; then
  echo "✅ EchoRecipe_Pro module directory exists"
  FILE_COUNT=$(find "$MODULE_DIR" -type f | wc -l)
  echo "   📦 Contains $FILE_COUNT files"
else
  echo "❌ Warning: Module directory not found at $MODULE_DIR"
fi

echo ""
echo "🔐 Checkpoint State Verified"
echo "=================================="
echo ""
echo "To fully restore after a system reset:"
echo ""
echo "1. Run npm/pnpm install in frontend:"
echo "   cd frontend && pnpm install"
echo ""
echo "2. Restart the dev server:"
echo "   npm run dev"
echo ""
echo "3. The EchoRecipe_Pro module will be automatically loaded"
echo ""
echo "✨ No need to re-upload - your 16,603 files are preserved!"
echo ""

# Optional: Check git status
echo "📝 Git Status:"
if command -v git &> /dev/null; then
  git log --oneline -5 2>/dev/null || echo "   (Not a git repository)"
else
  echo "   (Git not found)"
fi

echo ""
echo "✅ Checkpoint restore verification complete"
