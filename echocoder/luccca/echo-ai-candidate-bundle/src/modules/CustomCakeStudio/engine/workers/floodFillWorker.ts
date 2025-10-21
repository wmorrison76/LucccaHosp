/* eslint-disable no-restricted-globals */
type FloodMsg = { type: 'flood', x:number, y:number, tol:number, width:number, height:number, data: ArrayBuffer }

function floodFillMask(w: number, h: number, x: number, y: number, data: Uint8ClampedArray, tol: number): Uint8Array {
  const mask = new Uint8Array(w*h)
  if (x<0||y<0||x>=w||y>=h) return mask
  const idx0 = (y*w + x) * 4
  const r0 = data[idx0], g0 = data[idx0+1], b0 = data[idx0+2], a0 = data[idx0+3]
  const match = (i:number) => Math.abs(data[i]-r0)<=tol && Math.abs(data[i+1]-g0)<=tol && Math.abs(data[i+2]-b0)<=tol && Math.abs(data[i+3]-a0)<=tol

  const stack = [x,y]
  while (stack.length){
    const cy = stack.pop() as number
    const cx = stack.pop() as number
    if (cx<0||cy<0||cx>=w||cy>=h) continue
    let i = (cy*w + cx) * 4
    const m = cy*w + cx
    if (mask[m]===1 || !match(i)) continue

    // Walk west
    let west = cx
    while (west>=0){
      i = (cy*w + west) * 4
      const m2 = cy*w + west
      if (mask[m2]===1 || !match(i)) break
      west--
    }
    west++

    // Walk east, marking mask and pushing neighbors
    let east = cx
    while (east<w){
      i = (cy*w + east) * 4
      const m3 = cy*w + east
      if (mask[m3]===1 || !match(i)) break
      mask[m3] = 1
      if (cy>0){
        const iN = ((cy-1)*w + east) * 4
        const mN = (cy-1)*w + east
        if (mask[mN]!==1 && match(iN)) { stack.push(east, cy-1) }
      }
      if (cy<h-1){
        const iS = ((cy+1)*w + east) * 4
        const mS = (cy+1)*w + east
        if (mask[mS]!==1 && match(iS)) { stack.push(east, cy+1) }
      }
      east++
    }
  }
  return mask
}

self.onmessage = (evt: MessageEvent<FloodMsg>) => {
  const msg = evt.data
  if (msg.type === 'flood') {
    const arr = new Uint8ClampedArray(msg.data)
    const result = floodFillMask(msg.width, msg.height, msg.x, msg.y, arr, msg.tol)
    // Transfer back
    ;(self as any).postMessage({ type: 'mask', width: msg.width, height: msg.height, mask: result.buffer }, [result.buffer])
  }
}
