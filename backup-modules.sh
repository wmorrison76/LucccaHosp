#!/bin/bash

# Module Backup Utility
# Creates compressed backups of the modules folder
# Usage: ./backup-modules.sh [output-dir]

set -e

OUTPUT_DIR="${1:-.}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="luccca-modules-backup_${TIMESTAMP}.tar.gz"
BACKUP_PATH="${OUTPUT_DIR}/${BACKUP_NAME}"

MODULE_DIR="frontend/src/modules"

echo "📦 LUCCCA Module Backup Utility"
echo "=================================="
echo ""

# Check if modules directory exists
if [ ! -d "$MODULE_DIR" ]; then
  echo "❌ Error: Modules directory not found at $MODULE_DIR"
  exit 1
fi

# Count files
FILE_COUNT=$(find "$MODULE_DIR" -type f | wc -l)
DIR_COUNT=$(find "$MODULE_DIR" -type d | wc -l)

echo "📋 Backup Information:"
echo "   Module directory: $MODULE_DIR"
echo "   Files: $FILE_COUNT"
echo "   Directories: $DIR_COUNT"
echo "   Output: $BACKUP_PATH"
echo ""

# Create backup
echo "⏳ Creating backup archive (this may take a minute)..."
tar --exclude='node_modules' --exclude='.git' --exclude='*.log' \
    -czf "$BACKUP_PATH" "$MODULE_DIR"

# Get backup size
BACKUP_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)

echo "✅ Backup completed successfully!"
echo ""
echo "📊 Backup Details:"
echo "   File: $(basename $BACKUP_PATH)"
echo "   Size: $BACKUP_SIZE"
echo "   Location: $BACKUP_PATH"
echo ""
echo "💾 To restore this backup later:"
echo "   tar -xzf $BACKUP_PATH -C ."
echo ""
