# Bundle 002 — Core Tools v1 (Brush, Eraser, Eyedropper, Text) — 2025-08-18 02:06

## Files
- `src/modules/CustomCakeStudio/engine/raster/RasterSurface.ts`
- `src/modules/CustomCakeStudio/engine/tools/BrushTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/EraserTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/EyedropperTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/TextTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/index.ts` (registry update)
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` (color, size, addTextLayer)
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` (layer rendering + dispatch)
- `src/modules/CustomCakeStudio/components/panels/PropertiesPanel.tsx` (brush UI)

## Test Steps
1. `npm run dev` → open Studio.
2. Press **B** and drag → paint on active raster layer (default color from Properties).
3. Press **E** and drag → erase (alpha holes).
4. Press **I** then click a colored pixel → primary color updates.
5. Press **T** then click → new Text layer appears; drag with **V** Move tool.
6. Toggle layer visibility/lock and opacity as needed.

## Notes
- Brushes draw directly into a per-layer canvas (`RasterSurface`).
- Coordinates account for layer translation; scaling/rotation coming in later bundles.
- Eyedrop samples topmost visible raster layer with non-zero alpha at the pointer.
