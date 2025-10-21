import type { InpaintParams, InpaintSource } from './types'
import { callInpaintAPI } from './api'
import { naiveInpaint } from './fallback'
import { imageToCanvas } from './encode'

export class InpaintClient {
  async inpaint(params: InpaintParams, src: InpaintSource): Promise<HTMLCanvasElement> {
    try {
      const img = await callInpaintAPI(params, src)
      const c = document.createElement('canvas')
      c.width = img.naturalWidth; c.height = img.naturalHeight
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      return c
    } catch (err) {
      // Fallback: naive blur-based fill so the workflow still functions offline
      const base = await imageToCanvas(src.image as any)
      return naiveInpaint(base, src.mask, Math.round((params.strength||0.6)*24))
    }
  }
}

export const inpaintClient = new InpaintClient()

export default inpaintClient;
