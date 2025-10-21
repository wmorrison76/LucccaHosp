export function canvasToPNGDataURL(c: HTMLCanvasElement): string {
  try { return c.toDataURL('image/png') } catch { return '' }
}

export async function imageToCanvas(img: HTMLImageElement | HTMLCanvasElement | ImageBitmap): Promise<HTMLCanvasElement> {
  if (img instanceof HTMLCanvasElement) return img
  const c = document.createElement('canvas')
  const w = (img as any).width || (img as HTMLImageElement).naturalWidth
  const h = (img as any).height || (img as HTMLImageElement).naturalHeight
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.drawImage(img as any, 0, 0)
  return c
}

export default canvasToPNGDataURL;
