# Bundle 030 — Export v2 + Help Search + Command Palette — 2025-08-18 04:43

## Features
- **PDF Preview (multi-page):** exports current project(s) to a printable HTML preview in a new tab. Use browser **Print… → Save as PDF** for a PDF file.
- **Help Center Search:** searchable how‑to articles (selections, retouch, text, shapes, printing, imagegen).
- **Command Palette (Cmd/Ctrl+K):** quick access to tools, export, and help; also searches top help articles.

## Files (~14)
- `engine/print/ExportPDFMulti.ts`
- `engine/help/articles.ts` (expanded)
- `engine/store/useHelpStore.ts`
- `components/help/HelpCenter.tsx` (adds search UI)
- `components/help/CommandPalette.tsx` (Cmd/Ctrl+K)
- `components/layout/TopBar.tsx` (adds PDF Preview + palette)

## Usage
- Click **PDF Preview** to open a print‑ready tab; then use your browser to **Save as PDF**.
- Press **Cmd/Ctrl+K** to open the palette; type “text”, “brush”, or “export” to jump to actions; or search help.
