# Bundle 006 — Layer Transforms (scale/rotate/flip, transformer, nudges) — 2025-08-18 02:34

## Files
- `src/modules/CustomCakeStudio/engine/transform/index.ts` — helpers (degNorm, clamp).
- `src/modules/CustomCakeStudio/components/canvas/ActiveTransformer.tsx` — Konva Transformer for active layer.
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` — draggable nodes, transform handlers, attach transformer.
- `src/modules/CustomCakeStudio/hooks/useTransformHotkeys.ts` — arrow nudges, [] rotate, ⌘+- scale.
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` — transform mutators & flips.
- `src/modules/CustomCakeStudio/components/panels/PropertiesPanel.tsx` — numeric transform inputs & quick actions.
- `src/modules/CustomCakeStudio/components/layout/TopBar.tsx` — rotate/flip quick buttons.
- `src/modules/CustomCakeStudio/pages/Studio.tsx` — wires transform-hotkeys.
- `LightSpeed/BUNDLE_006-transforms.md` — test plan.

## Test Steps
1. Select a layer in the Layers panel, press **V**. Drag to move; handles appear — drag corners to scale; rotate via handle.  
2. Use **Arrow keys** to nudge (Shift = 10px).  
3. Press **[** / **]** to rotate ±1° (Shift = ±15°).  
4. **TopBar**: Rotate ±90°, Flip. **Properties → Transform** shows live X/Y/Rotation/Scale and allows typing values.
