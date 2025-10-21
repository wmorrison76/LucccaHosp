import type { Project } from '../types'
import { getRenderSurface } from '../composite/getRenderSurface'

function pageHTML(canvasEl: HTMLCanvasElement, title: string){
  const data = canvasEl.toDataURL('image/png')
  return `<div class="page"><img src="${data}" alt="${title}"/></div>`
}

export const ExportPDFMulti = {
  preview(projects: Project[], opts?: { title?: string }){
    const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>${opts?.title||'Export'}</title>
<style>
  @page { margin: 0; }
  body { margin: 0; background: #222; }
  .page { page-break-after: always; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
  .page img { max-width: 95vw; max-height: 95vh; }
</style>
</head>
<body>
${projects.map((p,i)=>{
  const c = document.createElement('canvas'); c.width = p.canvas.width; c.height = p.canvas.height
  const ctx = c.getContext('2d')!
  for (const L of p.layers){
    if (!L.visible) continue
    if (L.type === 'raster'){
      const surf = getRenderSurface(L as any, p)
      ctx.drawImage(surf, L.transform.x, L.transform.y)
    } else if (L.type === 'text'){
      const T:any = L
      ctx.save()
      ctx.font = `${T.weight>=600?'bold':''} ${T.size||24}px ${T.font||'Inter, sans-serif'}`
      ctx.fillStyle = T.fill || '#fff'
      ctx.globalAlpha = T.opacity ?? 1
      ctx.translate(T.transform.x, T.transform.y)
      ctx.fillText(T.text||'', 0, 0)
      ctx.restore()
    } else if (L.type === 'shape'){
      // Very basic canvas drawing for shapes
      const S:any = L
      ctx.save()
      ctx.translate(S.transform.x, S.transform.y)
      ctx.globalAlpha = S.opacity ?? 1
      ctx.lineWidth = S.shape.strokeWidth || 2
      ctx.strokeStyle = S.shape.stroke || '#fff'
      ctx.fillStyle = S.shape.fill || 'transparent'
      if (S.shape.kind === 'rect'){
        if (ctx.fillStyle !== 'transparent') ctx.fillRect(0,0,S.shape.width||100,S.shape.height||100)
        ctx.strokeRect(0,0,S.shape.width||100,S.shape.height||100)
      } else if (S.shape.kind === 'ellipse'){
        ctx.beginPath()
        ctx.ellipse((S.shape.width||100)/2,(S.shape.height||100)/2,(S.shape.width||100)/2,(S.shape.height||100)/2,0,0,Math.PI*2)
        if (ctx.fillStyle !== 'transparent') ctx.fill()
        ctx.stroke()
      } else if (S.shape.kind === 'polygon'){
        const pts = S.shape.points||[]
        if (pts.length){
          ctx.beginPath()
          ctx.moveTo(pts[0].x, pts[0].y)
          for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x, pts[i].y)
          ctx.closePath()
          if (ctx.fillStyle !== 'transparent') ctx.fill()
          ctx.stroke()
        }
      }
      ctx.restore()
    }
  }
  return pageHTML(c, 'page_'+(i+1))
}).join('')}
</body>
</html>`
    const win = window.open('', '_blank')
    if (!win) return
    win.document.open()
    win.document.write(html)
    win.document.close()
  }
}

export default ExportPDFMulti;
