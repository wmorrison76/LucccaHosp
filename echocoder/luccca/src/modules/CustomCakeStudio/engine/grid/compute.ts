import { convertLength } from '../print/units'
import type { GridSettings } from './types'

export type GridPoint = { cx:number; cy:number; rx:number; ry:number }

export function toPx(n:number, units:'px'|'in'|'mm'|'cm', dpi:number){
  return convertLength(n, units, 'px', dpi)
}

export function computeGridPoints(canvasW:number, canvasH:number, dpi:number, g: GridSettings): GridPoint[] {
  const u = g.units || 'in'
  const itemW = toPx(g.itemWidth||0, u as any, dpi)
  const itemH = toPx(g.itemHeight||0, u as any, dpi)
  const spX = toPx(g.spacingX||0, u as any, dpi)
  const spY = toPx(g.spacingY||0, u as any, dpi)
  const mX = toPx(g.marginX||0, u as any, dpi)
  const mY = toPx(g.marginY||0, u as any, dpi)

  const cols = g.cols || Math.max(1, Math.floor((canvasW - mX*2 + spX) / (itemW + spX)))
  const rows = g.rows || Math.max(1, Math.floor((canvasH - mY*2 + spY) / (itemH + spY)))

  const pts: GridPoint[] = []
  let y = mY + itemH/2
  for (let r=0; r<rows; r++){
    let x = mX + itemW/2
    for (let c=0; c<cols; c++){
      pts.push({ cx:x, cy:y, rx:itemW/2, ry:itemH/2 })
      x += itemW + spX
    }
    y += itemH + spY
  }
  return pts
}

export function snapToNearest(x:number, y:number, pts: GridPoint[]): {x:number;y:number} {
  if (!pts.length) return { x, y }
  let best = 1e12, bx=x, by=y
  for (const p of pts){
    const dx = p.cx - x, dy = p.cy - y
    const d2 = dx*dx + dy*dy
    if (d2 < best){ best = d2; bx = p.cx; by = p.cy }
  }
  return { x: bx, y: by }
}

export default toPx;
