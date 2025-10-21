# Bundle 011 — ImageGen bridge (mock or API), prompt presets, queue UI — 2025-08-18 03:02

## Files
- `src/modules/CustomCakeStudio/engine/imagegen/types.ts` — types for params/jobs.
- `src/modules/CustomCakeStudio/engine/imagegen/presets.ts` — common styles + prompt presets.
- `src/modules/CustomCakeStudio/engine/imagegen/ImageGenClient.ts` — uses `VITE_IMAGEGEN_URL` if present; otherwise generates a **mock** PNG data URL client-side.
- `src/modules/CustomCakeStudio/engine/imagegen/useImageGen.ts` — React hook: create/poll/cancel/remove/insert.
- `src/modules/CustomCakeStudio/components/panels/ImageGenPanel.tsx` — UI for prompts, styles, sizes, seed/guidance/steps, transparent toggle; job list with preview, **Insert as Layer**.
- `src/modules/CustomCakeStudio/components/layout/RightPanels.tsx` — includes ImageGen panel at the top.

## Usage
- Open **Image Generator** on the right → write a prompt or tap a preset → **Generate**.  
- Without a backend, it runs in **mock mode** (creates a labeled PNG). When `VITE_IMAGEGEN_URL` is set, it POSTs `/jobs` and polls `/jobs/:id`.  
- When a job **succeeds**, press **Insert as Layer** to add it to the canvas (auto-fit + history).

## Backend expectation (optional)
- POST `/jobs` with JSON `{ prompt, negative?, size?, seed?, guidance?, steps?, style?, transparent? }` → `{ id }`
- GET `/jobs/:id` → `{ status, progress?, output?: { dataUrl } }`
- DELETE `/jobs/:id` → 204 to cancel.
