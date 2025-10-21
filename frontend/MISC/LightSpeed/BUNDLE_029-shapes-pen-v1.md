# Bundle 029 — Vector Shapes & Pen v1 — 2025-08-18 04:41

## Features
- **Shapes**: Rectangle, Ellipse, Polygon layers with fill, stroke, width.
- **Shape Tool**: click‑drag to draw Rect/Ellipse; Polygon previews a simple triangle while dragging.
- **Pen Tool (v1)**: click to add points for a polygon; **double‑click** to finish.

## Files (~18)
- `engine/shapes/types.ts`
- `engine/store/useShapeStore.ts`, `engine/store/shapeOps.ts`
- `components/canvas/ShapeRender.tsx`
- `engine/tools/ShapeTool.ts`, `engine/tools/PenTool.ts`, `engine/tools/index.ts`
- `components/panels/ShapePanel.tsx`
- `components/layout/RightPanels.tsx` (adds Shape panel)
- `components/layout/TopBar.tsx` (adds Shape & Pen tools)
- `components/canvas/StageCanvas.tsx` (renders shape layers)

## Notes
- Boolean ops (union/intersect) can come in v2; this v1 focuses on drawing + styling.
- Shapes respect grid snapping on drag just like other layers.
