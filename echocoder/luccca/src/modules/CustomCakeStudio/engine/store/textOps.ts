import { useStudioStore } from './useStudioStore'
import { useTextEditStore } from './useTextEditStore'

export function activeTextLayer(): any | null {
  const s = useStudioStore.getState()
  const id = s.activeLayerId
  const L:any = s.project.layers.find(l=>l.id===id && l.type==='text')
  return L || null
}

export function setActiveTextProps(patch: Partial<any>){
  const s = useStudioStore.getState()
  const L = activeTextLayer()
  if (!L) return
  Object.assign(L, patch)
  s.historyMark('Text')
}

export function beginTextEdit(id: string){ useTextEditStore.getState().setEditing(id) }
export function endTextEdit(){ useTextEditStore.getState().setEditing(null) }

export function createText(x:number, y:number, text='Text'){
  const s = useStudioStore.getState()
  const id = s.addTextLayer(text)
  s.updateActiveLayerTransform({ x, y })
  return id
}

export default activeTextLayer;
