#!/bin/zsh

BASE_DIR=~/Desktop/LUCCCA/src/EchoCore
LOG_FILE=~/Desktop/LUCCCA/EchoCore_ComponentIndex.log

echo "Merging EchoCore components..."
> $LOG_FILE  # Clear old log

# Step 1: Build barrel.js for every subfolder
find "$BASE_DIR" -type d | while read -r dir; do
  jsfiles=($(ls "$dir"/*.js "$dir"/*.jsx 2>/dev/null))
  if [ ${#jsfiles[@]} -gt 0 ]; then
    barrel="$dir/barrel.js"
    echo "// Auto-generated barrel file" > "$barrel"
    for file in "${jsfiles[@]}"; do
      filename=$(basename "$file" .${file##*.})
      echo "export { default as $filename } from './$filename';" >> "$barrel"
      echo "$dir/$filename" >> "$LOG_FILE"
    done
  fi
done

# Step 2: Build master index.js
MASTER_INDEX="$BASE_DIR/index.js"
echo "// Master EchoCore index" > "$MASTER_INDEX"

find "$BASE_DIR" -type f -name "barrel.js" | while read -r barrelfile; do
  relpath=$(echo "$barrelfile" | sed "s|$BASE_DIR/||")
  folder=$(dirname "$relpath")
  echo "export * from './$folder/barrel';" >> "$MASTER_INDEX"
done

echo "EchoCore merging complete."
echo "Check $LOG_FILE and $MASTER_INDEX"

