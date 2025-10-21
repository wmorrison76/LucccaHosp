#!/bin/bash

SOURCE_DIR="/Users/cami/Desktop/LUCCCA"
BACKUP_DIR="/Users/cami/Desktop/LUCCCA_BACKUP"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Copy new or modified files to backup (preserves structure)
rsync -av --update "$SOURCE_DIR/" "$BACKUP_DIR/"

echo "Backup completed at $(date)"
