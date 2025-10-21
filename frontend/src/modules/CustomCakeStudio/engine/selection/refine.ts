import type { Project } from '../types'

export interface RefineOpts {
  feather?: number   // px
  expand?: number    // px (negative = contract)
}

export function selectionToMask(project: Project, polys: Array<Array<{x:number;y:number}>>): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = project.canvas.width; c.height = project.canvas.height
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,c.width,c.height)
  ctx.fillStyle = '#fff'
  for (const poly of polys){
    if (!poly.length) continue
    ctx.beginPath()
    ctx.moveTo(poly[0].x, poly[0].y)
    for (let i=1;i<poly.length;i++){ ctx.lineTo(poly[i].x, poly[i].y) }
    ctx.closePath()
    ctx.fill()
  }
  return c
}

function copyCanvas(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height
  const ctx = c.getContext('2d')!; ctx.drawImage(src, 0, 0)
  return c
}

export function featherMask(mask: HTMLCanvasElement, radius: number): HTMLCanvasElement {
  radius = Math.max(0, radius||0)
  if (radius === 0) return mask
  const c = document.createElement('canvas'); c.width = mask.width; c.height = mask.height
  const ctx = c.getContext('2d')!
  ctx.filter = `blur(${radius}px)`
  ctx.drawImage(mask, 0, 0)
  ctx.filter = 'none'
  return c
}

/**
 * Approximate expand/contract by blurring and threshold remap.
 * Positive expand -> lower threshold (grow); negative -> higher threshold (shrink).
 */
export function expandContractMask(mask: HTMLCanvasElement, amount: number): HTMLCanvasElement {
  amount = Math.max(-100, Math.min(100, amount||0))
  if (amount === 0) return mask
  const blur = Math.abs(amount) * 0.75 + 0.01
  const blurred = featherMask(mask, blur)
  const ctx = blurred.getContext('2d')!
  const img = ctx.getImageData(0,0,blurred.width, blurred.height)
  const d = img.data
  // threshold shift around mid; amount>0 => lower threshold => expand
  const t = 128 - Math.sign(amount) * Math.min(100, Math.abs(amount))*0.8
  for (let i=0;i<d.length;i+=4){
    const v = d[i] // red channel (mask is grayscale)
    const keep = v >= t ? 255 : 0
    d[i] = d[i+1] = d[i+2] = keep
  }
  ctx.putImageData(img, 0, 0)
  return blurred
}

export function refineSelectionMask(project: Project, polys: Array<Array<{x:number;y:number}>>, opts: RefineOpts): HTMLCanvasElement {
  let m = selectionToMask(project, polys)
  if (opts.expand && opts.expand !== 0){
    m = expandContractMask(m, opts.expand)
  }
  if (opts.feather && opts.feather > 0){
    m = featherMask(m, opts.feather)
  }
  return m
}

export default selectionToMask;
