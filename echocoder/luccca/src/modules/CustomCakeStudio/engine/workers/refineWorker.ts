/* eslint-disable no-restricted-globals */
export type RefineReq = {
  type: 'refine'
  width: number
  height: number
  polys: Array<Array<{x:number;y:number}>>
  feather: number
  expand: number
}

export type RefineRes = {
  type: 'refined'
  width: number
  height: number
  data: ImageData
}

function selectionToMask(width:number, height:number, polys: Array<Array<{x:number;y:number}>>): OffscreenCanvas {
  const c = new OffscreenCanvas(width, height)
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#000'; ctx.fillRect(0,0,width,height)
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

function featherMask(src: OffscreenCanvas, r:number): OffscreenCanvas {
  if (r<=0) return src
  const c = new OffscreenCanvas(src.width, src.height)
  const ctx = c.getContext('2d')!
  ctx.filter = `blur(${r}px)`
  ctx.drawImage(src, 0, 0)
  ctx.filter = 'none'
  return c
}

function expandContract(src: OffscreenCanvas, amt:number): OffscreenCanvas {
  if (amt===0) return src
  const blur = Math.abs(amt) * 0.75 + 0.01
  const blurred = featherMask(src, blur)
  const ctx = blurred.getContext('2d')!
  const img = ctx.getImageData(0,0,blurred.width, blurred.height)
  const d = img.data
  const t = 128 - Math.sign(amt) * Math.min(100, Math.abs(amt))*0.8
  for (let i=0;i<d.length;i+=4){
    const v = d[i]
    const keep = v >= t ? 255 : 0
    d[i] = d[i+1] = d[i+2] = keep
  }
  ctx.putImageData(img, 0, 0)
  return blurred
}

self.onmessage = (ev: MessageEvent<RefineReq>) => {
  const m = ev.data
  if (m.type !== 'refine') return
  let mask = selectionToMask(m.width, m.height, m.polys||[])
  if (m.expand) mask = expandContract(mask, m.expand)
  if (m.feather) mask = featherMask(mask, m.feather)
  const ctx = mask.getContext('2d')!
  const out = ctx.getImageData(0,0,mask.width, mask.height)
  const res: RefineRes = { type:'refined', width: mask.width, height: mask.height, data: out }
  ;(self as any).postMessage(res, [out.data.buffer])
}
