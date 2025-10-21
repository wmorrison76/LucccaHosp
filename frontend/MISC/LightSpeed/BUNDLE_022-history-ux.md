# Bundle 022 — History UX (Named Marks with thumbnails) — 2025-08-18 03:59

## What’s new
- **Named Marks**: create labeled snapshots with 256px thumbnails.
- **Quick Restore**: jump back to any mark without disturbing Undo/Redo.
- **Independent Store**: marks live in a separate zustand store so we don’t risk main store merges.

## Files
- `engine/store/useHistoryMarks.ts` — dedicated store for marks (add/rename/delete/restore).
- `components/panels/HistoryPanel.tsx` — enhanced UI with Named Marks list and buttons.
- Uses existing `captureCheckpoint(...)` to render thumbnails.

## Tips
- Create a mark before major steps (“Mask ready”, “Background locked”).  
- Restore to compare looks or undo a big branch of edits in one click.
