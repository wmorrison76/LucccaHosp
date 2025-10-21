# Bundle 010 — Asset Import (drag‑drop, file picker, paste, URL) — 2025-08-18 02:58

## Files
- `src/modules/CustomCakeStudio/utils/files.ts` — `readFileAsDataURL(file)`.
- `src/modules/CustomCakeStudio/engine/assets/ImageImporter.ts` — core import helpers (`importFile`, `importUrl`, `importDataUrl`), fit-to-canvas, center, history mark.
- `src/modules/CustomCakeStudio/hooks/useClipboardImport.ts` — paste image or image URL.
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` — drag & drop overlay and handlers.
- `src/modules/CustomCakeStudio/components/layout/TopBar.tsx` — **Import Image** button + URL input.

## Usage
- **Drag & drop** an image onto the checkerboard → added as a new raster layer, auto‑fit and centered.  
- **Paste** an image or direct image URL (png/jpg/webp/gif) → imported.  
- **TopBar → Import Image…** to pick files; or paste URL and press **Enter**/**Add**.

## Notes
- For cross‑origin image URLs without CORS, we fallback to drawing via direct URL which may taint the canvas in some browsers. Prefer local files, same‑origin URLs, or data URLs.  
- Imported pixels are drawn into the layer’s internal surface and the layer’s `src` is preserved for persistence.  
- A history step is created for each import.
