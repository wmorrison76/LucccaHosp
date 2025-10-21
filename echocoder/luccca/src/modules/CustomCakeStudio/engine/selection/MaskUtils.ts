export type Point = { x:number, y:number }
export type Polygon = Point[]

/**
 * Trace a rough outline from a binary mask using a simplified marching squares.
 * For performance, 'step' can be >1 to downsample. Returns a single polygon (outer boundary).
 */
export function maskToPolygon(mask: Uint8Array, width:number, height:number, step=2): Polygon {
  // Find first pixel in mask
  let start = -1
  for (let i=0;i<mask.length;i++){ if (mask[i]) { start = i; break } }
  if (start<0) return []
  const sx = start % width, sy = Math.floor(start/width)

  // marching squares
  const pts: Polygon = []
  let x = sx, y = sy
  let dir = 0 // 0=right,1=down,2=left,3=up
  let safety = width*height*4
  const inside = (xx:number, yy:number) => {
    if (xx<0||yy<0||xx>=width||yy>=height) return false
    return mask[yy*width + xx]===1
  }
  do {
    pts.push({ x, y })
    // Determine next direction based on neighbor occupancy (very simplified)
    const right = inside(x+step, y)
    const down = inside(x, y+step)
    if (dir===0){ // moving right
      if (down){ y += step; dir = 1 }
      else { x += step }
    } else if (dir===1){ // down
      if (!right){ x += step; dir = 0 }
      else { y += step }
    } else if (dir===2){ // left
      if (down){ y += step; dir = 1 }
      else { x -= step }
    } else { // up
      if (!right){ x += step; dir = 0 }
      else { y -= step }
    }
    safety--
    if (safety<=0) break
  } while (!(Math.abs(x - sx) <= step && Math.abs(y - sy) <= step && pts.length>10))

  return pts
}

export default maskToPolygon;
