import type { InpaintParams, InpaintSource } from './types'
import { canvasToPNGDataURL, imageToCanvas } from './encode'

export async function callInpaintAPI(params: InpaintParams, src: InpaintSource): Promise<HTMLImageElement> {
  const imgCanvas = await imageToCanvas(src.image)
  const payload = {
    ...params,
    image: canvasToPNGDataURL(imgCanvas),
    mask: canvasToPNGDataURL(src.mask)
  }
  const res = await fetch('/api/imagegen/inpaint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`Inpaint API error ${res.status}`)
  const data = await res.json()
  const out = new Image()
  out.src = data.image || data.result || data.url
  await out.decode().catch(()=>{})
  return out
}
