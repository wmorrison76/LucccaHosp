export type Article = { id:string; title:string; body:string; tags?:string[] }

export const ARTICLES: Article[] = [
  { id:'getting-started', title:'Getting Started', body:`
1) Create a new canvas in Top Bar (set size & units).
2) Import an image (Import Image… or paste URL).
3) Use **Move (V)** to position layers; **Transform** panel to scale/rotate.
4) Save with **Project → Save Project (.ccs.json)**. Autosave restores on refresh.
`},
  { id:'selections', title:'Selections — marquee, lasso, wand', body:`
- **Marquee (M):** click-drag rectangles/ellipses (hold Shift for square/circle).
- **Lasso (L):** freeform polygon. Close with double-click.
- **Magic Wand (W):** click by color; tweak tolerance in the right panel.
- **Quick Select (A):** paint to auto-detect edges.
`},
  { id:'retouch', title:'Retouch — clone, heal, patch', body:`
- **Clone (S):** Alt/Option-click to set source; paint to stamp.
- **Spot Heal (J):** brush to auto-blend blemishes (runs in a Web Worker).
- **Patch:** make a selection, drag to choose source offset, release to patch.
`},
  { id:'text', title:'Text — fonts & inline edit', body:`
- **Text (T):** click to add; double-click to edit inline.
- **Fonts:** import .ttf/.otf/.woff/.woff2 in the Text panel, then pick family.
- **Style:** size, weight, line-height, letter-spacing, align, color.
`},
  { id:'shapes', title:'Shapes & Pen', body:`
- **Shape tool:** pick Rectangle/Ellipse/Polygon in the Shapes panel, click-drag to draw.
- **Pen:** click to place points; double-click to finish the polygon.
- Change **stroke/fill/width** in the Shapes panel (or for the active shape).
`},
  { id:'printing', title:'Printing & PDF', body:`
- Use **Print** panel to set units, DPI, soft-proof, bleed/crop marks.
- Export: **PNG/JPG** directly, or **PDF Preview** (multi-page) from the Top Bar.
- For exact color-managed PDF, use your RIP/printer pipeline with embedded ICCs.
`},
  { id:'imagegen', title:'AI Image Generation & Inpainting', body:`
- Use **ImageGen** to create from text; optional **reference image** for style or identity.
- **Inpaint:** make a selection mask, then describe the change you want.
- For consistent subjects (e.g., the same child on a giraffe), supply a clear reference photo.
`},
]

export function searchArticles(q: string): Article[] {
  const s = q.trim().toLowerCase()
  if (!s) return ARTICLES
  return ARTICLES.filter(a => (a.title + ' ' + a.body + ' ' + (a.tags||[]).join(' ')).toLowerCase().includes(s))
}

export default ARTICLES;
