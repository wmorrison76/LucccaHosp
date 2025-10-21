# Bundle 009 — Layers Panel v2 (reorder/rename/visibility/lock/opacity/duplicate/delete + blends) — 2025-08-18 02:54

## Files
- `src/modules/CustomCakeStudio/engine/types.ts` — defines `BlendMode` union + layer types.
- `src/modules/CustomCakeStudio/engine/store/useStudioStore.ts` — **layer ops**: delete/duplicate/move/reorder; blend setter.
- `src/modules/CustomCakeStudio/components/panels/LayersPanel.tsx` — full UI: eye/lock, rename (dbl-click), opacity slider, blend dropdown, move/dup/delete; add Raster/Text.
- `src/modules/CustomCakeStudio/components/panels/PropertiesPanel.tsx` — adds Layer section (opacity + blend) above Transform.
- `src/modules/CustomCakeStudio/engine/print/ExportManager.ts` — honors `blendMode` via `globalCompositeOperation`.
- `src/modules/CustomCakeStudio/hooks/useStudioHotkeys.ts` — duplicates (**⌘/Ctrl+D**), delete (Backspace/Delete), reorder (⌘/Ctrl+`[` / `]`).

## Test Steps
1. Create a few layers, toggle **👁 / 🔒**, rename by **double-click**, adjust **Opacity** and **Blend**.  
2. Use **↑/↓** buttons to reorder; try hotkeys **⌘+]/⌘+[** for up/down.  
3. **Duplicate** (**⧉** or **⌘/Ctrl+D**) and **Delete** (✕ or Delete key).  
4. Export PNG/JPG — blends should affect the flattened image.
