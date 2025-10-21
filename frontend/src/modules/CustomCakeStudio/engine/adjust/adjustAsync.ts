import type { RasterLayer, Project } from '../types'
import { getAdjustedSurface } from './adjustCanvas'

/**
 * Lightweight async wrapper that yields to the browser before doing sync pixel ops.
 * This keeps UI responsive without changing StageCanvas sync rendering.
 */
export async function getAdjustedSurfaceAsync(layer: RasterLayer, project: Project): Promise<HTMLCanvasElement> {
  await new Promise(r=>setTimeout(r, 0)) // yield
  return getAdjustedSurface(layer, project)
}
