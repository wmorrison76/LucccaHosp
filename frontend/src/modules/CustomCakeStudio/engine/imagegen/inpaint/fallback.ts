/**
 * Naive inpaint fallback:
 * - Blur the source layer
 * - Composite the blurred content only where mask=white
 * This gives a quick patch so UI remains functional without a backend model.
 */
export function naiveInpaint(source: HTMLCanvasElement, mask: HTMLCanvasElement, blurPx = 12): HTMLCanvasElement {
  const out = document.createElement('canvas'); out.width = source.width; out.height = source.height
  const ctx = out.getContext('2d')!
  // Base = original
  ctx.drawImage(source, 0, 0)
  // Blurred version
  const blur = document.createElement('canvas'); blur.width = source.width; blur.height = source.height
  const bctx = blur.getContext('2d')!
  ;(bctx as any).filter = `blur(${blurPx}px)`
  bctx.drawImage(source, 0, 0)
  ;(bctx as any).filter = 'none'
  // Composite blurred only where mask is white
  ctx.globalCompositeOperation = 'destination-over'
  const masked = document.createElement('canvas'); masked.width = source.width; masked.height = source.height
  const mctx = masked.getContext('2d')!
  mctx.drawImage(blur, 0, 0)
  mctx.globalCompositeOperation = 'destination-in'
  mctx.drawImage(mask, 0, 0)
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(masked, 0, 0)
  return out
}

export default naiveInpaint;
