/**
 * floodFill — stack-based flood fill with tolerance (0-255).
 * Mutates the given surface.
 */
export function floodFill(surface: HTMLCanvasElement, x: number, y: number, rgba: [number,number,number,number], tol: number){
  const w = surface.width, h = surface.height
  if (x<0||y<0||x>=w||y>=h) return
  const ctx = surface.getContext('2d')!
  const img = ctx.getImageData(0,0,w,h)
  const data = img.data

  const idx = (y*w + x) * 4
  const target = [data[idx], data[idx+1], data[idx+2], data[idx+3]] as [number,number,number,number]
  const match = (i:number) => {
    return Math.abs(data[i]-target[0]) <= tol &&
           Math.abs(data[i+1]-target[1]) <= tol &&
           Math.abs(data[i+2]-target[2]) <= tol &&
           Math.abs(data[i+3]-target[3]) <= tol
  }
  const set = (i:number) => {
    data[i]   = rgba[0]
    data[i+1] = rgba[1]
    data[i+2] = rgba[2]
    data[i+3] = rgba[3]
  }

  if (rgba[0]===target[0] && rgba[1]===target[1] && rgba[2]===target[2] && rgba[3]===target[3]) return

  const stack: number[] = [x, y]
  while (stack.length){
    const cy = stack.pop() as number
    const cx = stack.pop() as number
    if (cx<0||cy<0||cx>=w||cy>=h) continue
    let i = (cy*w + cx) * 4
    if (!match(i)) continue

    // Walk west
    let west = cx
    while (west>=0){
      i = (cy*w + west) * 4
      if (!match(i)) break
      west--
    }
    west++

    // Walk east and fill
    let east = cx
    while (east<w){
      i = (cy*w + east) * 4
      if (!match(i)) break
      set(i)
      // scanline neighbors
      if (cy>0){
        const iN = ((cy-1)*w + east) * 4
        if (match(iN)) { stack.push(east, cy-1) }
      }
      if (cy<h-1){
        const iS = ((cy+1)*w + east) * 4
        if (match(iS)) { stack.push(east, cy+1) }
      }
      east++
    }
  }
  ctx.putImageData(img, 0, 0)
}

export default floodFill;
