import type { Tool } from './Tool'
import { beginTextEdit, createText } from '../store/textOps'
import { useStudioStore } from '../store/useStudioStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class TextTool implements Tool {
  id = 'text' as const
  private lastClickTime = 0
  private lastPt: {x:number;y:number} | null = null

  onPointerDown(e:any){
    const now = Date.now()
    const p = getPointer(e)
    const s = useStudioStore.getState()
    const hit = s.hitTestLayerAt?.(p.x, p.y) // if your store has one; otherwise we simply check active
    const activeId = s.activeLayerId
    const isDouble = (now - this.lastClickTime) < 300 && this.lastPt && Math.hypot(this.lastPt.x-p.x, this.lastPt.y-p.y) < 8

    if (isDouble && activeId){
      beginTextEdit(activeId)
      this.lastPt = p; this.lastClickTime = now
      return
    }

    if (!activeId || (hit && hit.type!=='text')){
      const id = createText(p.x, p.y, 'Text')
      beginTextEdit(id)
      s.setActiveLayer(id)
      this.lastPt = p; this.lastClickTime = now
      return
    }

    // Single click on existing text selects it
    this.lastPt = p; this.lastClickTime = now
  }
  onPointerMove(_e:any){}
  onPointerUp(_e:any){}
}
