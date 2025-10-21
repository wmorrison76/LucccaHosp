# Bundle 014 — Layer Masks v1 (paint/invert/fill, from selection, export‑safe) — 2025-08-18 03:20

## Files
- `engine/types.ts` — adds `maskEnabled`, `maskInverted`, `maskSrc` to layers.
- `engine/mask/LayerMask.ts` — runtime mask canvas with ops: fill, invert, stroke, from selection; persists to `maskSrc`.
- `engine/composite/getRenderSurface.ts` — composes raster layer with mask, then adjustments.
- `engine/print/ExportManager.ts` — renders using `getRenderSurface` so masks apply in export.
- `engine/store/useStudioStore.ts` — actions: `setLayerMaskEnabled`, `invertLayerMask`, `fillLayerMask`, `applySelectionToMask`, `setMaskBrushSize`.
- `engine/tools/MaskBrushTool.ts` — paint with soft brush (Alt/right‑click hides).
- `components/panels/MaskPanel.tsx` — UI: enable, invert, reveal/hide all, brush size, apply current selection.
- `components/layout/RightPanels.tsx` — includes Mask panel.
- `components/canvas/StageCanvas.tsx` — uses `getRenderSurface`.

## Usage
- Select a raster layer → open **Layer Mask** panel → toggle **Enabled**.  
- Pick **Mask Brush (K)** to paint: left‑click reveals, **Alt/right‑click** hides; adjust brush size in panel.  
- Use selections (Marquee/Lasso/Wand/Quick Select) then **Reveal/Hide Selection**.  
- **Export** respects masks.

## Notes
- Masks are saved as data URLs per layer (`maskSrc`) so Undo/Redo and reloads keep them.  
- This is v1 (no feather slider yet); we can add Refine Edge in a follow‑up.
