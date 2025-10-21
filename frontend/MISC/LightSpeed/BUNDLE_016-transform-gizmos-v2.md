# Bundle 016 — Transform Gizmos v2 (Konva Transformer, snapping, numeric panel) — 2025-08-18 03:32

## What’s new
- Upgraded **ActiveTransformer**: 8 resize anchors + rotation handle, nicer styling.
- **Shift** keeps aspect; **Alt** scales from center.
- **Angle Snap** (15°) toggle; rotate with **,** / **.** (±1°), hold **Cmd/Ctrl** for ±15°.
- **Transform** panel: numeric X/Y/Scale/Rotation + toggles for Keep Aspect & Centered Scale.

## Files
- `components/canvas/ActiveTransformer.tsx` — upgraded transformer and styling.
- `hooks/useTransformHotkeys.ts` — modifier keys + fine rotation.
- `engine/store/useStudioStore.ts` — transform preferences & actions.
- `components/panels/TransformPanel.tsx` — numeric controls & toggles.
- `components/layout/RightPanels.tsx` — includes Transform panel.

## Tips
- Select a layer → drag anchors to scale; rotate via the top handle or use keys.
- For pixel-perfect placement, type exact numbers into the **Transform** panel.
