#!/bin/zsh

BASE_DIR=~/Downloads
TARGET_DIR=~/Desktop/LUCCCA/src/EchoCore

echo "Installing EchoCore batches..."
mkdir -p $TARGET_DIR

# Extract all tar batches from Downloads
for tarfile in $BASE_DIR/*.tar; do
  echo "Extracting $tarfile..."
  tar -xf "$tarfile" -C "$TARGET_DIR"
done

# Generate tree log
echo "Generating EchoCore_FileTree.log..."
cd ~/Desktop/LUCCCA
tree -L 5 src/EchoCore > EchoCore_FileTree.log
echo "Done. Check EchoCore_FileTree.log"
