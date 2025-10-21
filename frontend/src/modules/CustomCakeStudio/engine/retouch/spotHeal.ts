import { blur1D } from './gaussian'

export function spotHealInplace(data: ImageData, cx: number, cy: number, radius: number){
  const { width:w, height:h } = data
  const r = Math.max(2, Math.floor(radius))
  const src = data.data
  const tmp = new Uint8ClampedArray(src.length)
  const out = new Uint8ClampedArray(src.length)

  // Copy
  tmp.set(src)

  // Blur pass (separable)
  blur1D(tmp, out, w, h, Math.max(1, Math.floor(r*0.6)), true)
  tmp.set(out)
  blur1D(tmp, out, w, h, Math.max(1, Math.floor(r*0.6)), false)

  // Replace only inside brush circle with blurred version blended with original edges
  const r2 = r*r
  for (let y = Math.max(0, cy - r); y <= Math.min(h - 1, cy + r); y++){
    for (let x = Math.max(0, cx - r); x <= Math.min(w - 1, cx + r); x++){
      const dx = x - cx, dy = y - cy
      const d2 = dx*dx + dy*dy
      if (d2 > r2) continue
      const idx = (y*w + x) * 4
      const t = Math.sqrt(d2)/r  // 0 at center, 1 at edge
      const feather = Math.pow(1 - t, 2) // soften edges
      src[idx]   = out[idx]   * feather + src[idx]   * (1-feather)
      src[idx+1] = out[idx+1] * feather + src[idx+1] * (1-feather)
      src[idx+2] = out[idx+2] * feather + src[idx+2] * (1-feather)
    }
  }
}

export default spotHealInplace;
