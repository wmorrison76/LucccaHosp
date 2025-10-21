import type { Polygon } from './MaskUtils'

/** Apply selection polygons as a clip path to a 2D canvas context.
 * Coordinates are in stage-space; offsetX/offsetY translate them into layer-local coords.
 */
export function applySelectionClip(ctx: CanvasRenderingContext2D, polys: Polygon[], offsetX=0, offsetY=0){
  if (!polys || polys.length===0) return
  ctx.save()
  ctx.beginPath()
  for (const poly of polys){
    if (!poly || poly.length===0) continue
    ctx.moveTo(poly[0].x - offsetX, poly[0].y - offsetY)
    for (let i=1;i<poly.length;i++){
      ctx.lineTo(poly[i].x - offsetX, poly[i].y - offsetY)
    }
    ctx.closePath()
  }
  ctx.clip()
}
export function restoreClip(ctx: CanvasRenderingContext2D){
  ctx.restore()
}

export default applySelectionClip;
