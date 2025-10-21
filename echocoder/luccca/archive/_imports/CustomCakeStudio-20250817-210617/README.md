
# CustomCakeStudio (Starter Frame)
Photoshop-style image generator & editor for **CustomCakeOrders**. This starter is the **empty house**: full folder structure, barrels, and stubs for tools, layers, selections, print/export, and image generation. Transparent background by default.

## Quick Start
```bash
# 1) Extract
tar -xzf CustomCakeStudio_starter.tar.gz
cd CustomCakeStudio

# 2) Install
npm i

# 3) Dev
npm run dev
```

This starts a Vite dev server and opens a minimal studio with: top bar, left tools, right panels, and a Konva canvas with a checkerboard transparency.

## What’s Included
- React + Vite + TypeScript
- State: Zustand (+ Immer)
- Canvas: React-Konva (Konva)
- Tailwind (pre-configured)
- Placeholder/stub files for all major tools (Marquee, Lasso, Magic Wand, Brush, Clone, etc.)
- Layer model (raster, vector, text, adjustment), commands/history, export scaffold
- Image generation client stub (`/src/engine/imagegen/ImageGenClient.ts`)

## Light Speed Flow (Multi-Window Team)
See `TEAM_SEED.md` and `LightSpeed/` for roles, task routing, bundle naming, and guardrails to prevent cross-window drift.

## Milestones (build-breaking checkpoints)
- v0.1: Frame compiles. Canvas appears. Layers panel functional (add/rename/hide/lock). Export PNG (transparent).
- v0.2: Selections (Marquee, Lasso, Magic Wand), Bucket/Gradient, Clone. Project save/load (JSON).
- v0.3: Healing, Adjustments, Filters, Print polish, PSD (basic).

## Notes
- This is a scaffold. Many files are stubs with TODOs and rich comments.
- Keep PRs small: **bundles of 10 files** max per task cluster.
- Use the included templates for patches and test plans.
