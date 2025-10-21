# Bundle 017 — Performance v1 (workerized selection refine + async adjust helper) — 2025-08-18 03:37

## Highlights
- **Selection Refine in a Web Worker** — offloads feather/expand operations for smoother UI on large canvases.
- **Fast (Worker) buttons** in Selection Refinement panel to use the async path.
- **Async adjust helper** (`getAdjustedSurfaceAsync`) for future idle/off-thread precompute without breaking Stage sync API.

## Files
- `engine/workers/refineWorker.ts` — worker script.
- `engine/selection/refineClient.ts` — client wrapper.
- `engine/adjust/adjustAsync.ts` — optional async wrapper for adjustments.
- `engine/store/useStudioStore.ts` — adds `applyRefinedSelectionToMaskFast` async action.
- `components/panels/SelectionRefinePanel.tsx` — adds **Fast (Worker)** buttons.
- `LightSpeed/BUNDLE_017-performance-v1.md` — notes.

## Notes
- Vite bundles `new Worker(new URL(...), {{ type: 'module' }})` out of the box.
- Fallback path keeps features working if Workers are unavailable.
- We can extend the worker approach to healing/clone later.
