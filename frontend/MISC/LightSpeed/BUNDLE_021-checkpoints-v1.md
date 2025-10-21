# Bundle 021 — Checkpoints v1 (named snapshots + thumbnails) — 2025-08-18 03:55

## Why
History stacks are linear and opaque. **Checkpoints** give you named, visual milestones you can jump back to at any time—perfect for experiments or before risky edits.

## Features
- **Create Checkpoint**: captures the full project state + a 256px thumbnail.
- **Rename, Restore, Delete** a checkpoint from the panel.
- Lives alongside the existing Undo/Redo History without interfering.

## Files
- `engine/checkpoints/Checkpoints.ts` — snapshot + thumbnail helpers.
- `engine/store/useStudioStore.ts` — adds `checkpoints` state and actions.
- `components/panels/CheckpointsPanel.tsx` — UI list with previews and controls.
- `components/layout/RightPanels.tsx` — includes the new panel above History.

## Notes
- Thumbnails are generated client‑side via canvas; transparency preserved.
- Restore loads the saved JSON state directly (non‑destructive to other checkpoints).
