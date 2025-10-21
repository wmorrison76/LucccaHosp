# Bundle 004 — Paint & Export (Bucket, Gradient, Clone, Spot Heal, Export) — 2025-08-18 02:21

## Files
- `src/modules/CustomCakeStudio/engine/raster/floodFill.ts`
- `src/modules/CustomCakeStudio/engine/tools/PaintBucketTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/GradientTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/CloneStampTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/SpotHealingTool.ts`
- `src/modules/CustomCakeStudio/engine/print/ExportManager.ts` (render + PNG/JPG)
- `src/modules/CustomCakeStudio/components/layout/TopBar.tsx` (tool select + export buttons)
- `src/modules/CustomCakeStudio/engine/tools/index.ts` (registry update)
- `src/modules/CustomCakeStudio/hooks/useStudioHotkeys.ts` (add P/G/S/J)
- `LightSpeed/BUNDLE_004-paint-export.md` (this doc)

## Test Steps
1. **P**aint Bucket (**P**): click to fill with primary color (tolerance uses *Selection Tolerance* for now).  
2. **G**radient: click-drag to lay down a linear gradient (to transparent).  
3. **S**tamp (Clone): **Alt-click** to set source, then drag to clone.  
4. **J** Spot Healing (naive blur): drag to smooth small blemishes.  
5. **TopBar → Export PNG/JPG** to download a flattened image.  

## Notes
- Bucket uses a simple flood fill; large images may be slower (we'll optimize in a Worker later).  
- Gradient fills across the full canvas in the drag direction for now.  
- Clone stamp respects brush size (double the slider).  
- Spot healing is a basic blur-based patch; we'll upgrade to content-aware in a later bundle.
