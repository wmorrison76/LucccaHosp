# Bundle 007 — Canvas & Print Presets + Export-for-Print + Crop Marks — 2025-08-18 02:39

## Files
- `src/modules/CustomCakeStudio/engine/print/units.ts` — px/in/mm converters.
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` — **merged store** with print settings and actions.
- `src/modules/CustomCakeStudio/components/panels/PrintPanel.tsx` — canvas sizing, DPI, bleed/margin, export scale, buttons.
- `src/modules/CustomCakeStudio/components/layout/RightPanels.tsx` — includes PrintPanel.
- `src/modules/CustomCakeStudio/components/canvas/PrintMarks.tsx` — on-canvas crop marks + safe margin overlay.
- `src/modules/CustomCakeStudio/components/canvas/StageCanvas.tsx` — renders PrintMarks.
- `src/modules/CustomCakeStudio/engine/print/ExportManager.ts` — export for print (PNG/JPG) with bleed + crop marks.
- `src/modules/CustomCakeStudio/components/layout/TopBar.tsx` — adds Print PNG/JPG buttons.
- `LightSpeed/BUNDLE_007-print.md` — test steps and notes.

## Test Steps
1. Open **Right Panels → Print**. Pick a **Preset** (e.g., Letter), set **DPI**, **Bleed**, and **Margin**.  
2. Click **Apply Canvas Size** to resize the canvas. You’ll see **crop marks/safe area** overlay (toggle “Show marks”).  
3. Use **Export for Print** (PNG/JPG) or the **TopBar Print** buttons: files include optional **bleed** and **crop marks**, with **export scale** applied.  
4. Switch **Units** (px/in/mm), widths/heights convert automatically; DPI updates affect conversions.

## Notes
- No changes to `Project` shape were required; print settings live separately.
- Crop marks use a simple 24px length; adjust in a later bundle if needed.
- This bundle replaces the store with a **merged** version containing selections, transforms, brushes, and print settings.
