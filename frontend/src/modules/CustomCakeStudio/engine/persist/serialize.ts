import type { Project } from '../types'
import type { ProjectFile } from './types'
import { fetchAsDataURL, isDataURL } from './data'

async function ensureLayerEmbedded(layer: any): Promise<any> {
  if (layer?.type === 'raster' && layer.src && !isDataURL(layer.src as string)) {
    try { layer.src = await fetchAsDataURL(String(layer.src)) } catch {}
  }
  return layer
}

export async function serializeProject(project: Project): Promise<ProjectFile> {
  const layers = []
  for (const L of project.layers){
    const copy = JSON.parse(JSON.stringify(L))
    layers.push(await ensureLayerEmbedded(copy))
  }
  const projCopy: Project = JSON.parse(JSON.stringify(project))
  ;(projCopy as any).layers = layers
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    project: projCopy,
    assets: project.assets || {}
  }
}
