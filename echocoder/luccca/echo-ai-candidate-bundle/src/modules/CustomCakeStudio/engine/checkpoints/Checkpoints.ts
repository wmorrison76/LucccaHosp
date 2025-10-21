import type { Project, RasterLayer, TextLayer } from '../types'
import { getRenderSurface } from '../composite/getRenderSurface'

export type Checkpoint = {
  id: string
  label: string
  ts: number
  state: string            // JSON of Project
  thumb: string            // dataURL
}

function drawProjectToCanvas(project: Project, targetW?: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  const W = project.canvas.width, H = project.canvas.height
  let scale = 1
  if (targetW && targetW > 0) {
    scale = targetW / W
  }
  c.width = Math.max(1, Math.round(W * scale))
  c.height = Math.max(1, Math.round(H * scale))
  const ctx = c.getContext('2d')!

  // Transparent background by default
  ctx.clearRect(0,0,c.width,c.height)

  for (const l of project.layers.slice().reverse()){ // reverse to draw bottom->top visually
    if (!l.visible) continue
    if (l.type === 'raster'){
      const R = l as RasterLayer
      const surf = getRenderSurface(R, project)
      if (!surf) continue
      const s = (R.transform.scale || 1) * scale
      ctx.save()
      ctx.globalAlpha = R.opacity ?? 1
      ctx.translate(R.transform.x*scale, R.transform.y*scale)
      ctx.translate(surf.width*0.5*s, surf.height*0.5*s)
      ctx.rotate((R.transform.rotation||0) * Math.PI/180)
      ctx.translate(-surf.width*0.5*s, -surf.height*0.5*s)
      ctx.drawImage(surf, 0, 0, surf.width, surf.height, 0, 0, surf.width*s, surf.height*s)
      ctx.restore()
    } else if (l.type === 'text'){
      const T = l as TextLayer
      ctx.save()
      ctx.globalAlpha = T.opacity ?? 1
      ctx.translate(T.transform.x*scale, T.transform.y*scale)
      ctx.font = `${T.weight>=600?'bold':''} ${Math.round((T.size||24)*scale)}px ${T.font||'Inter, system-ui, sans-serif'}`
      ctx.fillStyle = '#ffffff'
      ctx.fillText(T.text||'', 0, 0)
      ctx.restore()
    }
  }
  return c
}

export function captureCheckpoint(project: Project, label?: string): { state: string, thumb: string } {
  const state = JSON.stringify(project)
  // create small thumbnail (~256 px width)
  const thumbCanvas = drawProjectToCanvas(project, 256)
  let thumb = ''
  try { thumb = thumbCanvas.toDataURL('image/png') } catch { thumb = '' }
  return { state, thumb }
}
