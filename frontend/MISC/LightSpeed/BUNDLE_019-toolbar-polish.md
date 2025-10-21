# Bundle 019 — Toolbar polish & icons — 2025-08-18 03:45

## What’s new
- **Left Toolbar** with clean icon buttons, hotkey hints (via titles), and active‑tool highlighting.
- **Quick Color** picker for the primary color.
- **Quick Brush Size** sliders for Brush and Mask Brush.
- Re‑composed **Studio** page layout to include the Left Toolbar.

## Files
- `components/layout/LeftToolbar.tsx` — vertical toolbar with icons + quick controls.
- `pages/Studio.tsx` — places TopBar + LeftToolbar + StageCanvas + RightPanels.

## Notes
- No extra dependencies; icons are inline SVG.
- Sliders update store via `useStudioStore.setState(...)` to avoid store churn.
- Next polish: tooltip micro‑overlays and small status bar.
