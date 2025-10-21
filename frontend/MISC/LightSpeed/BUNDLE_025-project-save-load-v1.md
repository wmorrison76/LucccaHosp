# Bundle 025 — Project Save/Load v1 (embedded assets + autosave) — 2025-08-18 04:13

## Features
- **Save Project (.ccs.json)**: serializes the full project; image layer bitmaps get embedded as data URLs for portability.
- **Load Project**: opens a previously saved .ccs.json and restores state.
- **Autosave**: debounced 1s, written to `localStorage` and auto-restored on Studio mount.

## Files (~11)
- `engine/persist/` — `types.ts`, `data.ts`, `serialize.ts`, `deserialize.ts`, `download.ts`, `autosave.ts`, `index.ts`
- `components/panels/ProjectPanel.tsx`
- `components/layout/RightPanels.tsx` (adds Project panel)
- `pages/Studio.tsx` (initializes autosave; restores previous session if present)
- `LightSpeed/BUNDLE_025-project-save-load-v1.md`

## Notes
- If a raster layer `src` is a URL, the saver tries to fetch & embed it; if it can’t, it leaves the URL as-is.
- Future v2 can add compression or zip packaging; this version prioritizes zero dependencies and reliability.
