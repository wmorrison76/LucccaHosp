# Bundle 008 — History/Undo v1 (snapshots + hotkeys + UI) — 2025-08-18 02:46

## Files
- `src/modules/CustomCakeStudio/engine/commands/History.ts` — bounded stacks, undo/redo ops.
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` — adds `historyMark()`, `undo()`, `redo()`, reactive flags.
- `src/modules/CustomCakeStudio/components/panels/HistoryPanel.tsx` — Undo/Redo buttons + status.
- `src/modules/CustomCakeStudio/components/layout/RightPanels.tsx` — includes History panel.
- `src/modules/CustomCakeStudio/components/layout/TopBar.tsx` — Undo/Redo buttons.
- `src/modules/CustomCakeStudio/hooks/useStudioHotkeys.ts` — ⌘/Ctrl+Z and ⇧⌘/Ctrl+Z.
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` — marks history on drag/transform end.
- `src/modules/CustomCakeStudio/engine/tools/BrushTool.ts` — marks history on stroke start.
- `src/modules/CustomCakeStudio/engine/tools/EraserTool.ts` — marks history on stroke start.
- `src/modules/CustomCakeStudio/engine/tools/CloneStampTool.ts` — marks history on paint start.
- `src/modules/CustomCakeStudio/engine/tools/PaintBucketTool.ts` — marks history on click.

## Test Steps
1. Draw with **B**, then press **⌘/Ctrl+Z** → stroke undoes; **⇧⌘/Ctrl+Z** → redo.  
2. Move/scale/rotate a layer → use Undo/Redo.  
3. Bucket-fill and Clone Stamp also create single undo steps.  
4. **TopBar** and **History panel** buttons mirror hotkeys.

## Notes
- Snapshot-based for speed and simplicity; we can switch to command-deltas later.  
- Cap = 100 states; adjust in `new History(100)` if needed.
