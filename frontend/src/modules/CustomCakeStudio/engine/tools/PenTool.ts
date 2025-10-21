import type { Tool } from './Tool'
import { addShapeLayer, updateActiveShapeProps } from '../store/shapeOps'
import { useStudioStore } from '../store/useStudioStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class PenTool implements Tool {
  id = 'pen' as const
  private id: string | null = null
  private done = false
  private lastTime = 0

  onPointerDown(e:any){
    const p = getPointer(e)
    const now = Date.now()
    const dbl = now - this.lastTime < 300
    this.lastTime = now

    if (!this.id){
      this.id = addShapeLayer('Path', { kind: 'polygon', points: [{x:0,y:0}], stroke:'#ffffff', strokeWidth:2, fill:'transparent' })
      useStudioStore.getState().updateActiveLayerTransform({ x: p.x, y: p.y })
      return
    }
    if (dbl){
      this.done = true
      this.id = null
      return
    }
    const s = useStudioStore.getState()
    const L:any = s.project.layers.find(l=>l.id===s.activeLayerId && l.type==='shape')
    if (!L) return
    const pts = (L.shape.points || []).concat([{ x: p.x - L.transform.x, y: p.y - L.transform.y }])
    updateActiveShapeProps({ points: pts })
  }
  onPointerMove(_e:any){}
  onPointerUp(_e:any){}
}
