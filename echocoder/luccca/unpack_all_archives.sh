#!/bin/bash

echo "🔍 Starting unpack of all .tar and .tar.gz files in $(pwd)..."
mkdir -p unpack_logs

for archive in *.tar *.tar.gz; do
  [ -e "$archive" ] || continue
  folder_name="${archive%.tar}"
  folder_name="${folder_name%.tar.gz}"

  if [ -d "$folder_name" ]; then
    echo "✅ Skipping '$archive' — already extracted to $folder_name"
    continue
  fi

  echo "📦 Extracting $archive → $folder_name/"
  mkdir -p "$folder_name"

  if [[ "$archive" == *.tar.gz ]]; then
    tar -xzf "$archive" -C "$folder_name" > "unpack_logs/${folder_name}_log.txt" 2>&1
  else
    tar -xf "$archive" -C "$folder_name" > "unpack_logs/${folder_name}_log.txt" 2>&1
  fi

  if [ $? -eq 0 ]; then
    echo "✅ Done extracting: $archive"
  else
    echo "❌ Failed to extract: $archive (see unpack_logs/${folder_name}_log.txt)"
  fi
done

echo "🎉 All archives processed. Logs saved in unpack_logs/"

