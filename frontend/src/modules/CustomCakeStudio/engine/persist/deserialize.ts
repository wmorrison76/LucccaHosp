import type { Project } from '../types'
import type { ProjectFile } from './types'

function defaults(p: Project): Project {
  const out = p as any
  out.canvas = out.canvas || { width: 1024, height: 1024, dpi: 300, background: 'transparent' }
  out.layers = Array.isArray(out.layers) ? out.layers : []
  out.assets = out.assets || {}
  for (const L of out.layers){
    L.visible = L.visible!==false
    L.locked = !!L.locked
    L.opacity = typeof L.opacity==='number' ? L.opacity : 1
    L.blendMode = L.blendMode || 'normal'
    L.transform = L.transform || { x:0, y:0, scale:1, rotation:0 }
  }
  return out as Project
}

export function deserializeProjectFile(file: ProjectFile): Project {
  const p = file.project || ({} as any)
  return defaults(p as Project)
}

export default deserializeProjectFile;
