# Bundle 015 — Selection Refine v1 (feather + expand/contract → apply to mask) — 2025-08-18 03:27

## Files
- `engine/selection/refine.ts` — build selection mask from polygons; feather via canvas blur; expand/contract via blur + threshold mapping.
- `engine/mask/LayerMask.ts` — new `setMaskFromCanvas(...)` to replace a layer’s mask from a refined canvas.
- `engine/store/useStudioStore.ts` — state for `selectionFeather`, `selectionExpand`; actions `setSelectionFeather`, `setSelectionExpand`, `applyRefinedSelectionToMask`.
- `components/panels/SelectionRefinePanel.tsx` — sliders + **Apply → Mask (Reveal/Hide)** buttons.
- `components/layout/RightPanels.tsx` — includes the new panel above Layer Mask.

## Usage
1. Create a selection (Marquee/Lasso/Wand/Quick Select).  
2. Open **Selection Refinement** → adjust **Feather** and **Expand/Contract**.  
3. Click **Apply → Mask (Reveal/Hide)** to write a grayscale mask onto the active raster layer.  
4. Tweak further with **Layer Mask** brush or Adjustments.

## Notes
- This is a fast, canvas-based approximation; it’s intentionally lightweight for the browser.  
- We can upgrade to workerized morphological ops (true dilation/erosion) in a **Perf v2** bundle if needed.
