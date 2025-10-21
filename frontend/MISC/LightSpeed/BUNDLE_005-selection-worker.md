# Bundle 005 — Selection-aware Painting + Worker Wand — 2025-08-18 02:29

## Files
- `src/modules/CustomCakeStudio/engine/workers/floodFillWorker.ts` — WebWorker flood-fill → binary mask.
- `src/modules/CustomCakeStudio/engine/selection/MaskUtils.ts` — convert mask → polygon (rough marching squares).
- `src/modules/CustomCakeStudio/engine/selection/clip.ts` — apply selection polygons as canvas clip paths.
- `src/modules/CustomCakeStudio/engine/tools/MagicWandTool.ts` — now uses the worker + polygon trace.
- `src/modules/CustomCakeStudio/engine/tools/BrushTool.ts` — painting respects active selection.
- `src/modules/CustomCakeStudio/engine/tools/EraserTool.ts` — erasing respects active selection.

## Test Steps
1. Press **W** and click on a raster area → selection conforms to color region (rough outline).  
2. Adjust **Tolerance** in Properties → repeat W-click to see region change.  
3. With a selection active, use **B**rush or **E**raser: strokes are **clipped** to the selection.  
4. Clear Selection to paint freely again.

## Notes
- The polygon tracing is intentionally light-weight; we’ll swap in a higher-precision contour in a later bundle.  
- Worker uses transferable buffers for speed; Vite handles `new Worker(new URL(...))` import.  
