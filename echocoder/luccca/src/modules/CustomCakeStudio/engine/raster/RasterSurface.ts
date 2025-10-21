/**
 * RasterSurface — keeps an HTMLCanvasElement per raster layer for painting.
 * The canvas size matches the project canvas. We draw in layer-local coords.
 */
import type { Project, RasterLayer } from '../../engine/types'

const surfaces = new Map<string, HTMLCanvasElement>()

export function getSurfaceForLayer(layer: RasterLayer, project: Project): HTMLCanvasElement {
  let c = surfaces.get(layer.id)
  const w = project.canvas.width, h = project.canvas.height
  if (!c) {
    c = document.createElement('canvas')
    c.width = w; c.height = h
    surfaces.set(layer.id, c)
    // If layer.src exists, preload it
    if (layer.src) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const ctx = c!.getContext('2d')!
        ctx.clearRect(0,0,w,h)
        ctx.drawImage(img, 0, 0, w, h)
      }
      img.src = layer.src
    }
  } else if (c.width !== w || c.height !== h) {
    // Resize preserving content (rare)
    const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h
    const tctx = tmp.getContext('2d')!
    tctx.drawImage(c, 0, 0)
    c.width = w; c.height = h
    const ctx = c.getContext('2d')!
    ctx.drawImage(tmp, 0, 0)
  }
  return c
}

export function sampleColorAt(project: Project, x: number, y: number) : [number, number, number, number] | null {
  // Check top-down visible raster layers
  for (const L of project.layers) {
    if (L.type !== 'raster' || !L.visible) continue
    const R = L as RasterLayer
    const cx = Math.floor(x - R.transform.x)
    const cy = Math.floor(y - R.transform.y)
    if (cx < 0 || cy < 0) continue
    const surf = surfaces.get(R.id)
    if (!surf) continue
    if (cx >= surf.width || cy >= surf.height) continue
    const ctx = surf.getContext('2d')!
    const data = ctx.getImageData(cx, cy, 1, 1).data
    if (data[3] > 0) return [data[0], data[1], data[2], data[3]]
  }
  return null
}

export default getSurfaceForLayer;
