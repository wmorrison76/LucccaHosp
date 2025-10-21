
# First 40 Tasks (Concrete)

001 [FRAME] Ensure project compiles; verify Vite + Tailwind + TS; fix any import paths.
002 [FRAME] Implement global error boundary + minimal logger stub.
003 [FRAME] Implement feature flags (v0.1/v0.2/v0.3) via env.
004 [CANVAS] Render checkerboard background and artboard shadow.
005 [CANVAS] Stage pan/zoom (wheel + pinch), fit-to-screen, reset zoom.
006 [LAYERS] Add/rename/hide/lock/opacity in LayersPanel; set active layer.
007 [LAYERS] Reorder layers (drag-and-drop), z-index updates.
008 [LAYERS] Duplicate/delete layer actions + confirmation.
009 [TOOLS-CORE] Tool dispatcher: route pointer events by active tool.
010 [TOOLS-CORE] MoveTool: transform active layer (translate only v0.1).
011 [TOOLS-CORE] BrushTool: simple stroke on temporary overlay (no commit).
012 [TOOLS-CORE] BrushTool: commit stroke to raster layer bitmap.
013 [TOOLS-CORE] EraserTool: subtract alpha from raster layer bitmap.
014 [TOOLS-CORE] EyedropperTool: sample color under cursor; update UI swatch.
015 [TOOLS-CORE] TextTool: place and edit inline text (simple, no bbox yet).
016 [TOOLS-CORE] ShapeTool: rect/ellipse with fill/stroke; transform handles.
017 [SELECTIONS] Marquee rectangular/elliptical; feather slider; marching ants.
018 [SELECTIONS] Lasso freehand; polygonal lasso.
019 [SELECTIONS] MagicWand: tolerance + contiguous toggle; sample all layers.
020 [SELECTIONS] Quick Selection: brush-based grow; basic edge awareness.
021 [TOOLS-CORE] Bucket/Gradient: tolerance fill; linear/radial gradient.
022 [RETOUCH] CloneStamp: sample (Alt+click) and paint.
023 [RETOUCH] SpotHealing (v1): simple patch-blend in small radius.
024 [TEXT-SHAPE] Text styles: font family/size/weight/align; transform box.
025 [PRINT-EXPORT] Export PNG/JPEG with DPI; preserve transparency for PNG.
026 [PRINT-EXPORT] Canvas setup dialog: inches/cm/px, DPI, bleed guides.
027 [IMAGE-GEN] Prompt modal: prompt/size/seed/style; insert as raster layer.
028 [IMAGE-GEN] Inpaint mode: use selection as mask (stub call).
029 [PERF] OffscreenCanvas for brush/eraser; cache tiles for repaint.
030 [PERF] WebWorker for Magic Wand & Quick Selection compute.
031 [CANVAS] Rulers, guides, and snapping (to pixel / to guides).
032 [LAYERS] Blend modes: normal/multiply/screen/overlay.
033 [LAYERS] Group layers; collapse/expand; drag in/out of groups.
034 [TOOLS-CORE] Hand/Zoom tools; Spacebar temporary pan.
035 [QA-DOCS] Write initial test plan: tools, layers, export; capture GIFs.
036 [FRAME] Autosave snapshots to localStorage; restore on reload.
037 [QA-DOCS] Developer handbook: coding standards, comments, commit style.
038 [FRAME] Shortcut manager; map hotkeys; show ? overlay for cheat sheet.
039 [TOOLS-CORE] Crop tool: non-destructive crop rect; export respects crop.
040 [PRINT-EXPORT] Soft-proof preview (approximate CMYK) toggle (stub).
