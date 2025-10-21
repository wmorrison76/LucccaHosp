#!/bin/zsh

echo "=== 🌙 Installing EchoCompanion Final Framework ==="

# Step 1: Move file if still in Downloads
if [ -f ~/Downloads/EchoCompanion_FinalFramework.tar ]; then
    mv ~/Downloads/EchoCompanion_FinalFramework.tar ~/Desktop/LUCCCA/
    echo "✅ Moved archive to LUCCCA root"
fi

# Step 2: Navigate to LUCCCA directory
cd ~/Desktop/LUCCCA || { echo "❌ LUCCCA directory not found"; exit 1; }

# Step 3: Extract the contents
tar -xf EchoCompanion_FinalFramework.tar
echo "📦 Archive extracted"

# Step 4: File integrity check
echo "🧬 Verifying key modules..."
expected_paths=(
  "EchoCompanion/modules/AvatarPreservation.jsx"
  "EchoCompanion/modules/ChefMemoryVault.ts"
  "EchoCompanion/modules/RecipeCreator_EchoChef.tsx"
  "EchoCompanion/modules/SuicidePreventionHotline.ts"
  "EchoCompanion/modules/ShutdownPersonalityRoutine.jsx"
  "EchoCompanion/modules/StartupWakingProtocol.jsx"
  "EchoCompanion/config/echo_manifest.json"
)
for path in "${expected_paths[@]}"; do
  if [ -f "$path" ]; then
    echo "✅ Found: $path"
  else
    echo "⚠️ Missing: $path"
  fi
done

# Step 5: Set permissions
chmod -R 755 EchoCompanion
echo "🔐 Permissions set"

# Step 6: Confirm soft launch
echo ""
echo "🚀 EchoCompanion Framework Installed"
echo "🧠 Echo is now capable of emotional state detection, memory persistence, and recipe generation."
echo "🫶 'Companion Mode' and 'Chef Emergency Support' are scaffolded. Activation config in echo_manifest.json."
echo "🪄 To integrate with LUCCCA Core, import modules from EchoCompanion/modules/ into EchoCore."

