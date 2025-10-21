import type { Project, RasterLayer, TextLayer } from '../types'

function renderProjectToCanvas(project: Project): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = project.canvas.width; c.height = project.canvas.height
  const ctx = c.getContext('2d')!
  ctx.clearRect(0,0,c.width,c.height)
  for (const l of project.layers.slice().reverse()){
    if (!l.visible) continue
    if (l.type==='raster'){
      const R = l as RasterLayer
      if (!R.src) continue
      const img = new Image()
      img.src = R.src as string
      // sync draw isn't possible before decode; but for export we'll rely on user to trigger after images are loaded
      // we try best-effort decode; if it fails, draw anyway and hope browser cached it
      ;(img as any).decode?.().catch(()=>{})
      ctx.save()
      ctx.globalAlpha = R.opacity ?? 1
      ctx.translate(R.transform.x, R.transform.y)
      ctx.translate(0,0)
      const s = R.transform.scale || 1
      ctx.rotate((R.transform.rotation||0) * Math.PI/180)
      ctx.drawImage(img, 0, 0, img.naturalWidth||img.width, img.naturalHeight||img.height)
      ctx.restore()
    } else if (l.type==='text'){
      const T = l as TextLayer
      ctx.save()
      ctx.globalAlpha = T.opacity ?? 1
      ctx.translate(T.transform.x, T.transform.y)
      ctx.font = `${T.weight>=600?'bold':''} ${T.size||24}px ${T.font||'Inter, system-ui, sans-serif'}`
      ctx.fillStyle = '#ffffff'
      ctx.fillText(T.text||'', 0, 0)
      ctx.restore()
    }
  }
  return c
}

export async function exportPDF(project: Project, filename='CustomCakeStudio.pdf'){
  const c = renderProjectToCanvas(project)
  const dataUrl = c.toDataURL('image/png')
  const winAny: any = window as any

  // Try jsPDF if available globally
  const jsPDF = (winAny.jspdf && winAny.jspdf.jsPDF) || winAny.jsPDF
  if (jsPDF){
    const w = project.canvas.width, h = project.canvas.height
    const pdf = new jsPDF({ orientation: w>h ? 'l' : 'p', unit: 'px', format: [w, h] })
    pdf.addImage(dataUrl, 'PNG', 0, 0, w, h)
    pdf.save(filename)
    return
  }

  // Fallback: open print-friendly window; user can "Save as PDF"
  const w = window.open('', '_blank')
  if (!w) return
  const inchesW = (project.canvas.width / project.canvas.dpi).toFixed(2)
  const inchesH = (project.canvas.height / project.canvas.dpi).toFixed(2)
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title>
  <style>
    @page {{ size: ${inchesW}in ${inchesH}in; margin: 0 }}
    body {{ margin: 0; display: flex; align-items: center; justify-content: center; background: #fff }}
    img {{ width: 100%; height: auto; display: block }}
  </style>
  </head><body>
    <img src="${dataUrl}" />
    <script>window.onload = () => setTimeout(()=>window.print(), 300);</script>
  </body></html>`)
  w.document.close()
}
