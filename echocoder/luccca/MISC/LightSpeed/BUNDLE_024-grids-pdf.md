# Bundle 024 — Topper Grids + PDF Export Stub — 2025-08-18 04:10

## Features
- **Topper Grids**: circle/rect guides with presets (2.0" and 2.5" cupcake toppers on Letter, Round 8", Sheet 12×18). Options for cut‑guides, center marks.
- **Snap to Grid**: drag a layer and it magnetizes to the nearest grid cell center.
- **PDF Export (stub)**: one‑click PDF via jsPDF if present; otherwise opens a print‑friendly page so users can “Save as PDF”.

## Files (~15)
- `engine/grid/types.ts`, `engine/grid/presets.ts`, `engine/grid/compute.ts`, `engine/grid/index.ts`, `engine/grid/snap.ts`
- `engine/store/useGridStore.ts`
- `components/canvas/GridOverlay.tsx`
- `components/panels/GridPanel.tsx`
- `components/canvas/StageCanvas.tsx` (adds overlay + snap)
- `components/layout/RightPanels.tsx` (mounts Grid panel)
- `components/layout/TopBar.tsx` (quick Grid toggle)
- `engine/print/ExportPDF.ts`
- `components/panels/PrintPanel.tsx` (Export PDF button)
- `LightSpeed/BUNDLE_024-grids-pdf.md`

## Notes
- Units respect DPI. Presets assume Letter canvas sizes; for other canvases, rows/cols can be edited or auto‑fit.
- If you later add jsPDF as a dependency, the export will switch from fallback to true PDF automatically.
