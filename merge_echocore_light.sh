#!/bin/zsh

BASE_DIR=~/Desktop/LUCCCA/src/EchoCore
LOG_FILE=~/Desktop/LUCCCA/EchoCore_ComponentIndex.log

echo "Merging EchoCore components (light scan)..."
> "$LOG_FILE"

# Only scan up to 4 levels for .jsx and .js files
find "$BASE_DIR" -maxdepth 4 -type d | while read -r dir; do
  jsfiles=($(find "$dir" -maxdepth 1 -type f \( -name "*.jsx" -o -name "*.js" \) ! -name "barrel.js"))
  
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

# Build master index
MASTER_INDEX="$BASE_DIR/index.js"
echo "// Master EchoCore index" > "$MASTER_INDEX"
find "$BASE_DIR" -name "barrel.js" -maxdepth 4 | while read -r barrelfile; do
  relpath=$(echo "$barrelfile" | sed "s|$BASE_DIR/||")
  folder=$(dirname "$relpath")
  echo "export * from './$folder/barrel';" >> "$MASTER_INDEX"
done

echo "EchoCore merging complete."
echo "Check $LOG_FILE and $MASTER_INDEX"

