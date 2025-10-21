# Bundle 027 — Retouch Pack v1 — 2025-08-18 04:29

## What’s inside
- **Spot Healing (workerized)**: faster brush that blends blemishes using a separable Gaussian blur in a Web Worker.
- **Clone Stamp (source preview)**: Alt/Option‑click to set source; paint with soft circular brush; live crosshair shows the source.
- **Patch Tool (selection‑based, v1)**: Make a selection, then drag to define a source offset. The selection area gets patched from the offset with soft alpha.

## Files (~18)
- `engine/retouch/gaussian.ts`, `engine/retouch/spotHeal.ts`
- `engine/workers/spotHealWorker.ts`, `engine/workers/spotHealClient.ts`
- `engine/store/useRetouchStore.ts`
- `components/canvas/RetouchOverlay.tsx`
- `engine/tools/CloneStampTool.ts`, `engine/tools/SpotHealingTool.ts`, `engine/tools/PatchTool.ts`, `engine/tools/index.ts`
- `components/panels/RetouchPanel.tsx`
- `components/layout/RightPanels.tsx` (mounts Retouch panel)
- `components/canvas/StageCanvas.tsx` (adds Retouch overlay)
- `components/layout/TopBar.tsx` (adds Patch in tool list)

## Usage
- **Clone**: Press **Alt/Option** and click to set a source. Then paint. Brush size is in **Retouch** panel.
- **Spot Heal**: Click/drag to heal. Uses worker thread for responsiveness.
- **Patch**: Create a selection (Marquee/Lasso/etc). Click inside selection, drag to where you want to sample from, release to patch.

## Notes
- These are CPU‑based and safe defaults. We can swap Spot Heal to a model‑guided inpaint later while keeping the same UI.
- Performance tip: keep brush sizes moderate on very large canvases.
