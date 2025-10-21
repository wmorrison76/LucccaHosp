# Bundle 018 — Help Center v1 (searchable How‑To drop‑down) — 2025-08-18 03:41

## Features
- **Shift + ?** toggles a Help overlay anywhere in the app.
- Search box filters by title/tags/body; click a result to expand a concise guide.
- Covers: Import, Tools, Masks, Selection Refine, Adjustments, Transform, ImageGen, Printing, Export, Shortcuts.

## Files
- `engine/store/useHelpStore.ts` — lightweight state for open/query.
- `engine/help/articles.ts` — curated how‑to content.
- `components/help/HelpCenter.tsx` — drop‑down overlay (fixed, top‑right) with search + collapsible items.
- `components/layout/TopBar.tsx` — adds **Help ▾** button and mounts the Help overlay.

## Notes
- Articles are plain text for simplicity; we can upgrade to rich markdown later.
- To deep‑link to panels/actions, we can extend articles with action callbacks in v2.
