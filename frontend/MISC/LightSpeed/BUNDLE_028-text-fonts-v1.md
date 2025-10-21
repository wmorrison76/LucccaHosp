# Bundle 028 — Text & Fonts v1 — 2025-08-18 04:34

## Features
- **Text Panel:** font family, size, weight, line-height, letter-spacing, align, color picker.
- **Font Loader:** import `.ttf/.otf/.woff/.woff2`, auto-registers and loads via `FontFace` (with CSS fallback).
- **On‑canvas Editing:** double‑click text to open an inline textarea overlay; `Esc` or `Cmd/Ctrl+Enter` to finish.
- **Defaults:** registers popular font names for quick selection; you can import real files anytime.

## Files (~20+)
- `engine/text/` — `types.ts`, `FontManager.ts`, `fonts.ts`, `index.ts`
- `engine/assets/FontImporter.ts`
- `engine/store/useTextEditStore.ts`, `engine/store/textOps.ts`
- `hooks/useFontLoader.ts`
- `components/canvas/TextEditOverlay.tsx`
- `components/panels/TextPanel.tsx`
- `components/layout/RightPanels.tsx` (mounts Text panel)
- `engine/tools/TextTool.ts` (enhanced: create & double‑click to edit)
- `components/canvas/StageCanvas.tsx` (mounts TextEditOverlay)

## Tips
- Import actual font files for brand‑accurate outputs. The project saver (Bundle 025) will embed image layers; font files are not embedded—ship them with your app or keep to system fonts for portability.
- We can extend this with **stroke/outline**, **shadow**, **curved text**, and **font management UI** next.
