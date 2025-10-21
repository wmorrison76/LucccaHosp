/**
 * SelectionManager — minimal selection state and helpers
 * - Polygons only for now (marquee/lasso). Wand/QuickSelect stub create circular polygons.
 */
export type Point = { x:number, y:number }
export type Polygon = Point[]

export function rectToPolygon(x1:number,y1:number,x2:number,y2:number): Polygon {
  const x = Math.min(x1,x2), y = Math.min(y1,y2)
  const w = Math.abs(x2-x1), h = Math.abs(y2-y1)
  return [{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}]
}

export function circleToPolygon(cx:number, cy:number, r:number, steps=24): Polygon {
  const pts: Polygon = []
  for (let i=0;i<steps;i++){
    const a = (i/steps) * Math.PI*2
    pts.push({ x: cx + Math.cos(a)*r, y: cy + Math.sin(a)*r })
  }
  return pts
}

export default rectToPolygon;
