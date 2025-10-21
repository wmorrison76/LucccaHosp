import type { Project, RasterLayer } from '../types'

const CACHE = new WeakMap<RasterLayer, HTMLCanvasElement>()

export function getMaskCanvas(layer: RasterLayer, project: Project): HTMLCanvasElement {
  let c = CACHE.get(layer)
  if (!c){
    c = document.createElement('canvas')
    c.width = project.canvas.width
    c.height = project.canvas.height
    const ctx = c.getContext('2d')!
    ctx.fillStyle = layer.maskInverted ? '#000' : '#fff'
    ctx.fillRect(0,0,c.width,c.height)
    if (layer.maskSrc){
      const img = new Image(); img.src = layer.maskSrc
      img.onload = () => { ctx.drawImage(img, 0, 0) }
    }
    CACHE.set(layer, c)
  }
  return c!
}

function save(layer: RasterLayer){
  const c = CACHE.get(layer); if (!c) return
  try { layer.maskSrc = c.toDataURL('image/png') } catch {}
}

export function setMaskFromCanvas(layer: RasterLayer, sourceCanvas: HTMLCanvasElement){
  let c = CACHE.get(layer)
  if (!c){ CACHE.set(layer, sourceCanvas); c = sourceCanvas }
  const ctx = c.getContext('2d')!
  ctx.clearRect(0,0,c.width,c.height)
  ctx.drawImage(sourceCanvas, 0, 0)
  save(layer)
}

export function maskFill(layer: RasterLayer, project: Project, reveal: boolean){
  const c = getMaskCanvas(layer, project)
  const ctx = c.getContext('2d')!
  ctx.fillStyle = reveal ? '#fff' : '#000'
  ctx.fillRect(0,0,c.width,c.height)
  save(layer)
}

export function maskInvert(layer: RasterLayer, project: Project){
  const c = getMaskCanvas(layer, project)
  const ctx = c.getContext('2d')!
  const img = ctx.getImageData(0,0,c.width,c.height)
  const d = img.data
  for (let i=0;i<d.length;i+=4){
    d[i] = 255 - d[i]
    d[i+1] = 255 - d[i+1]
    d[i+2] = 255 - d[i+2]
  }
  ctx.putImageData(img, 0, 0)
  save(layer)
}

export function maskStroke(layer: RasterLayer, project: Project, x:number, y:number, size:number, reveal:boolean){
  const c = getMaskCanvas(layer, project)
  const ctx = c.getContext('2d')!
  const r = size/2
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  const col = reveal ? 255 : 0
  g.addColorStop(0, `rgba(${col},${col},${col},1)`)
  g.addColorStop(1, `rgba(${col},${col},${col},0)`)
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill()
  save(layer)
}

export function maskFromSelection(layer: RasterLayer, project: Project, polys: Array<Array<{x:number;y:number}>>, reveal:boolean){
  const c = getMaskCanvas(layer, project)
  const ctx = c.getContext('2d')!
  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = reveal ? '#fff' : '#000'
  for (const poly of polys){
    ctx.beginPath()
    if (poly.length){
      ctx.moveTo(poly[0].x, poly[0].y)
      for (let i=1;i<poly.length;i++){ ctx.lineTo(poly[i].x, poly[i].y) }
      ctx.closePath()
      ctx.fill()
    }
  }
  ctx.restore()
  save(layer)
}

export default getMaskCanvas;
