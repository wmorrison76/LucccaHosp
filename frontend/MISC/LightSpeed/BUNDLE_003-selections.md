# Bundle 003 — Selections v1 (Marquee, Lasso, Wand stub, QuickSelect stub) — 2025-08-18 02:14

## Files
- `src/modules/CustomCakeStudio/engine/selection/SelectionManager.ts`
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` (selection state/actions)
- `src/modules/CustomCakeStudio/engine/tools/MarqueeTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/LassoTool.ts`
- `src/modules/CustomCakeStudio/engine/tools/MagicWandTool.ts` (stub radius = tolerance)
- `src/modules/CustomCakeStudio/engine/tools/QuickSelectTool.ts` (stub circular add along drag)
- `src/modules/CustomCakeStudio/components/canvas/SelectionOverlay.tsx` (marching ants)
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` (include overlay)
- `src/modules/CustomCakeStudio/components/panels/PropertiesPanel.tsx` (feather/tolerance/clear)
- `src/modules/CustomCakeStudio/hooks/useStudioHotkeys.ts` (keys M/L/W/A)

## Test Steps
1. Press **M** → drag to create a rectangle selection (replace).  
   - Hold **Shift** to add another. Hold **Option/Alt** to subtract (placeholder).
2. Press **L** → freehand lasso selection, release to commit.
3. Press **W** → click to create a circular region (tolerance controls radius in this stub).  
4. Press **A** → drag to paint-add small circular selections along the path; **Alt** to subtract.
5. See animated **marching ants** overlay. Use **Clear Selection** in Properties to reset.
6. Brush/Eraser should respect selected region in later bundle (not wired yet).

## Notes
- Wand/QuickSelect are **stubs** for now to keep bundle light. We’ll replace with flood-fill + contour tracing in a WebWorker in a later bundle.
