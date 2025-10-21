set -euo pipefail

CAKE_DIR="src/modules/pastry/cake"
JS="$CAKE_DIR/index.js"
TS="$CAKE_DIR/index.ts"

if   [ -f "$CAKE_DIR/CakeCanvasBuilder.jsx" ]; then BUILDER="./CakeCanvasBuilder.jsx"
elif [ -f "$CAKE_DIR/CanvasBuilder.jsx" ];    then BUILDER="./CanvasBuilder.jsx"
elif [ -f "$CAKE_DIR/CakeCanvasBuilder.tsx" ]; then BUILDER="./CakeCanvasBuilder.tsx"
elif [ -f "$CAKE_DIR/CanvasBuilder.tsx" ];     then BUILDER="./CanvasBuilder.tsx"
else
  echo "❌ No *CanvasBuilder*.jsx/tsx file found in $CAKE_DIR"
  exit 1
fi
mkdir -p "$(dirname "$JS")"
cat > "$JS" <<EOT
// Auto-generated barrel for Cake module (explicit extensions)

// Builder
export { default as CanvasBuilder } from "$BUILDER";

// QA exporter (named export only)
export { CakeQAExporter } from "./CakeQAExporter.jsx";

// Top-level
export { default as CakeExportFinalizer } from "./CakeExportFinalizer.jsx";

// Local 'componets' folder (note spelling)
export { default as WorkOrderBuilder } from "./componets/WorkOrderBuilder.jsx";
export { default as Cake360Viewer } from "./componets/Cake360Viewer.jsx";
export { default as WraparoundDecorationTool } from "./componets/WraparoundDecorationTool.jsx";
export { default as CakeSupportOverlay } from "./componets/CakeSupportOverlay.jsx";
export { default as DecorationPalette } from "./componets/DecorationPalette.jsx";
export { default as LayerBlock } from "./componets/LayerBlock.jsx";

// Utils
export { generateSupportMap } from "./utils/SupportMapEngine.js";
export { estimateBuildTime } from "./utils/TimeEstimator.js";
EOT

# Remove TypeScript barrel if present (it can shadow)
[ -f "$TS" ] && mv "$TS" "$TS.bak"

echo "✔ Wrote $JS using BUILDER=$BUILDER"
[ -f "$TS.bak" ] && echo "⚠️  Moved index.ts -> index.ts.bak to avoid conflicts"
