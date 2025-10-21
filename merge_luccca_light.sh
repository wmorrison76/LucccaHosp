#!/bin/zsh

BASE_DIR=~/Desktop/LUCCCA/src
LOG_FILE=~/Desktop/LUCCCA/LUCCCA_GlobalIndex.log

echo "Merging all LUCCCA components (global light mode)..."
> "$LOG_FILE"

# Step 1: Create barrels for each folder (skip certain dirs)
find "$BASE_DIR" -maxdepth 4 -type d | while read -r dir; do
  if [[ "$dir" == *"node_modules"* ]] || [[ "$dir" == *"assets"* ]] || [[ "$dir" == *"tests"* ]]; then
    continue
  fi

  jsfiles=($(find "$dir" -maxdepth 1 -type f \( -name "*.js" -o -name "*.jsx" \) ! -name "barrel.js" ! -name "index.js"))
  
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

# Step 2: Create a master index.js for LUCCCA
MASTER_INDEX="$BASE_DIR/index.js"
echo "// Master LUCCCA index" > "$MASTER_INDEX"
find "$BASE_DIR" -maxdepth 4 -type f -name "barrel.js" | while read -r barrelfile; do
  relpath=$(echo "$barrelfile" | sed "s|$BASE_DIR/||")
  folder=$(dirname "$relpath")
  echo "export * from './$folder/barrel';" >> "$MASTER_INDEX"
done

echo "LUCCCA merging complete."
echo "Check $LOG_FILE and $MASTER_INDEX"

