# Bundle 013 — Adjustments v1 (brightness/contrast/saturation/hue/invert) — 2025-08-18 03:12

## Files
- `engine/adjust/adjustCanvas.ts` — pixel ops with HSL; cached per source canvas + params.
- `engine/types.ts` — adds `LayerAdjust` and `adjust` on `BaseLayer`.
- `engine/store/useStudioStore.ts` — `setLayerAdjust(id, next)` and `resetLayerAdjust(id)`; defaults for new raster layers.
- `components/panels/AdjustmentsPanel.tsx` — sliders for brightness/contrast/saturation/hue + invert + reset.
- `components/layout/RightPanels.tsx` — adds **Adjustments** panel.
- `engine/print/ExportManager.ts` — applies adjustments when exporting.
- `components/canvas/StageCanvas.tsx` — applies adjustments live on canvas.

## Test
1. Import a photo → select the raster layer → tweak sliders in **Adjustments** panel.  
2. Toggle **Invert**; rotate **Hue**; check that stage view and **Export PNG/JPG** match.  
3. Duplicate the layer; different adjustments should stay independent.

## Notes
- Sliders are **non-destructive** (stored as params; pixels aren’t permanently changed).  
- For heavy images, real-time adjustment may be CPU intensive; we can workerize later in the Perf bundle.
