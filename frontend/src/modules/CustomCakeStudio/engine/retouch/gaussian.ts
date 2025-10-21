export function gaussianKernel(radius: number): Float32Array {
  const r = Math.max(1, Math.floor(radius))
  const sigma = r / 2
  const a = 1 / (Math.sqrt(2 * Math.PI) * sigma)
  const b = -1 / (2 * sigma * sigma)
  const k = new Float32Array(r * 2 + 1)
  let sum = 0
  for (let i = -r; i <= r; i++) {
    const v = a * Math.exp(b * i * i)
    k[i + r] = v
    sum += v
  }
  for (let i = 0; i < k.length; i++) k[i] /= sum
  return k
}

export function blur1D(src: Uint8ClampedArray, dst: Uint8ClampedArray, w: number, h: number, r: number, horizontal: boolean) {
  const k = gaussianKernel(r)
  const kr = (k.length - 1) >> 1
  const channels = 4
  if (horizontal) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const o = (y * w + x) * channels
        let r0 = 0, g0 = 0, b0 = 0, a0 = 0
        for (let i = -kr; i <= kr; i++) {
          const xx = Math.max(0, Math.min(w - 1, x + i))
          const ii = (y * w + xx) * channels
          const wv = k[i + kr]
          r0 += src[ii] * wv
          g0 += src[ii + 1] * wv
          b0 += src[ii + 2] * wv
          a0 += src[ii + 3] * wv
        }
        dst[o] = r0; dst[o+1] = g0; dst[o+2] = b0; dst[o+3] = a0
      }
    }
  } else {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const o = (y * w + x) * channels
        let r0 = 0, g0 = 0, b0 = 0, a0 = 0
        for (let i = -kr; i <= kr; i++) {
          const yy = Math.max(0, Math.min(h - 1, y + i))
          const ii = (yy * w + x) * channels
          const wv = k[i + kr]
          r0 += src[ii] * wv
          g0 += src[ii + 1] * wv
          b0 += src[ii + 2] * wv
          a0 += src[ii + 3] * wv
        }
        dst[o] = r0; dst[o+1] = g0; dst[o+2] = b0; dst[o+3] = a0
      }
    }
  }
}

export default gaussianKernel;
