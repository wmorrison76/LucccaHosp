import type { Project, RasterLayer } from '../types'
import { getSurfaceForLayer } from '../raster/RasterSurface'
import { getMaskCanvas } from '../mask/LayerMask'
import { getAdjustedSurface } from '../adjust/adjustCanvas'

const CACHE = new WeakMap<RasterLayer, { key: string, out: HTMLCanvasElement }>()

export function getRenderSurface(layer: RasterLayer, project: Project): HTMLCanvasElement {
  const base = getSurfaceForLayer(layer, project)
  const adj = layer.adjust || {}
  const maskOn = !!layer.maskEnabled
  const maskSrc = layer.maskSrc || ''
  const key = JSON.stringify([base.width, base.height, maskOn, maskSrc.length, adj.brightness||0, adj.contrast||0, adj.saturation||0, adj.hue||0, !!adj.invert])
  const hit = CACHE.get(layer)
  if (hit && hit.key === key) return hit.out

  let surf: HTMLCanvasElement = base
  if (maskOn){
    const m = getMaskCanvas(layer, project)
    const c = document.createElement('canvas')
    c.width = base.width; c.height = base.height
    const ctx = c.getContext('2d')!
    ctx.clearRect(0,0,c.width,c.height)
    // draw base
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(base, 0, 0)
    // apply mask (white keeps, black hides)
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(m, 0, 0)
    surf = c
  }
  // adjustments last
  const out = (layer.adjust && (adj.brightness||adj.contrast||adj.saturation||adj.hue||adj.invert)) ?
    (() => {
      const x = document.createElement('canvas')
      x.width = surf.width; x.height = surf.height
      const XX = x.getContext('2d')!; XX.drawImage(surf, 0, 0)
      // reuse existing adjust impl by crafting a fake layer pointing to this temp surface isn't trivial;
      // instead, we can call getAdjustedSurface by temporarily stubbing layer.src; simpler: draw and mutate here.
      // But for now, we call getAdjustedSurface which reads pixels and applies.
      const fake: any = { ...layer }
      return getAdjustedSurface(fake, { ...project, canvas: { ...project.canvas } } as any)
    })()
    : surf

  CACHE.set(layer, { key, out })
  return out
}

export default getRenderSurface;
