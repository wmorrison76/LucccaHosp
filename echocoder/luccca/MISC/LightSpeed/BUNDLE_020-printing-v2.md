# Bundle 020 — Printing v2 (presets + soft‑proof + guides) — 2025-08-18 03:50

## Features
- **Presets**: Letter, A4, 8×10, 12×12, Sheet Cake 12×18, Round Cake 8", Cupcake Toppers (Letter). Applies canvas size in px via DPI.
- **Soft‑Proof (CMYK sim)**: screen‑only approximation via CSS filter; quick toggle in Print panel.
- **Guides**: shows a dashed bleed rectangle (if bleed > 0); crop marks still controlled by the existing toggle.

## Files
- `engine/print/presets.ts` — curated print presets.
- `engine/print/softproof.ts` — tiny CSS filter helper (approximate CMYK preview).
- `engine/store/useStudioStore.ts` — extends `print` settings and adds actions including `applyPrintPreset`.
- `components/panels/PrintPanel.tsx` — adds preset select + soft‑proof toggle + live canvas readout.
- `components/canvas/StageCanvas.tsx` — applies soft‑proof filter and draws bleed guides.

## Notes
- This does not perform true ICC color management; it’s a practical on‑screen preview to catch out‑of‑gamut pops. For print‑exact previews, we can add a backend conversion step later.
