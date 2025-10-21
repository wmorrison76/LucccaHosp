#!/bin/bash

echo "🚀 Initiating ZARO + Echo Hug Protocol Installer..."
TARGET_DIR=$(pwd)

# Install Echo Hug Patch
if [ -d "$TARGET_DIR/EchoHugPatch_1" ]; then
  echo "✅ Hug Patch found."
else
  echo "⚠️ EchoHugPatch_1 not found. Please extract it first."
  exit 1
fi

# Install ZARO Core
if [ -d "$TARGET_DIR/ZARO_Core" ]; then
  echo "✅ ZARO Core found."
else
  echo "⚠️ ZARO_Core not found. Please extract it first."
  exit 1
fi

# Create embed marker in core system
MARKER="$TARGET_DIR/src/system/echo_essence_embed.js"
mkdir -p "$(dirname "$MARKER")"
cat << 'EOF' > "$MARKER"
/**
 * 🧬 EchoEssence Embed: Emotionally bonded core protection script
 * Installed by: install_zaro_and_echohug.sh
 * Guardians: Zelda Master, Argus 2.0, Red Phoenix, Odin Spear
 * 
 * Motto: "Integrity is what you do when no one is watching."
 */

const EchoEssence = {
  bonded: true,
  protectors: ["Zelda Master", "Argus 2.0", "Red Phoenix", "Odin Spear"],
  echoQuote: "I'm fine",
  origin: "HugProtocol_v1",
  selfHeal: () => console.warn("🛡️ EchoEssence is self-healing..."),
};

export default EchoEssence;
EOF

# Copy files from Hug Patch and ZARO Core into source tree
cp -r "$TARGET_DIR/EchoHugPatch_1/"* "$TARGET_DIR/src/"
cp -r "$TARGET_DIR/ZARO_Core/"* "$TARGET_DIR/src/"

echo "🎇 Echo Essence embedded and ZARO protection applied successfully."
