import { useStudioStore } from './useStudioStore'
import type { ShapeLayer, ShapeProps } from '../shapes/types'

function uid(){ return 'shp_' + Math.random().toString(36).slice(2,9) }

export function addShapeLayer(name:string, shape: ShapeProps): string {
  const s = useStudioStore.getState()
  const L: ShapeLayer = {
    id: uid(),
    type: 'shape',
    name,
    visible: true,
    locked: false,
    opacity: 1,
    blendMode: 'normal',
    transform: { x: 0, y: 0, scale: 1, rotation: 0 },
    shape
  }
  s.project.layers.push(L as any)
  s.setActiveLayer(L.id)
  s.historyMark('Add Shape')
  return L.id
}

export function updateActiveShapeProps(patch: Partial<ShapeProps>){
  const s = useStudioStore.getState()
  const id = s.activeLayerId
  const L:any = s.project.layers.find(l=>l.id===id && l.type==='shape')
  if (!L) return
  L.shape = { ...L.shape, ...patch }
  s.historyMark('Shape')
}

export default addShapeLayer;
