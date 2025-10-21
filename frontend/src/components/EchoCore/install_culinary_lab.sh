#!/bin/bash

echo "=== 🍽️ Installing LUCCCA Culinary Lab ==="

# Step 1: Navigate to LUCCCA frontend directory
cd ~/Desktop/LUCCCA/frontend || {
  echo "❌ Could not find LUCCCA frontend folder."
  exit 1
}

# Step 2: Extract the full tar package
tar -xf ~/Downloads/CulinaryLab_FullInstall.tar -C .

# Step 3: Confirm structure
echo "✅ Files extracted to:"
find src/components/CulinaryLab
find src/components/LiquidWhiteBoard

# Step 4: Check if node_modules exists and run dev if desired
if [ -d "node_modules" ]; then
  echo "✅ Node modules present. You can now run:"
  echo "   ➜ npm run dev"
else
  echo "📦 Installing dependencies..."
  npm install
  echo "✅ Now run:"
  echo "   ➜ npm run dev"
fi

echo "=== ✅ Culinary Lab installed successfully ==="

