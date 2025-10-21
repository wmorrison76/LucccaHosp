import type { Tool } from './Tool'
import { addShapeLayer, updateActiveShapeProps } from '../store/shapeOps'
import { useShapeStore } from '../store/useShapeStore'
import { useStudioStore } from '../store/useStudioStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class ShapeTool implements Tool {
  id = 'shape' as const
  private start: {x:number;y:number} | null = null
  private currentId: string | null = null

  onPointerDown(e:any){
    const p = getPointer(e)
    this.start = p
    const opt = useShapeStore.getState()
    const id = addShapeLayer('Shape', {
      kind: opt.current as any,
      width: 1,
      height: 1,
      points: opt.current==='polygon' ? [{x:0,y:0}] : undefined,
      stroke: opt.stroke,
      fill: opt.fill,
      strokeWidth: opt.strokeWidth,
    })
    this.currentId = id
    useStudioStore.getState().updateActiveLayerTransform({ x: p.x, y: p.y })
  }
  onPointerMove(e:any){
    if (!this.start || !this.currentId) return
    const p = getPointer(e)
    const dx = p.x - this.start.x
    const dy = p.y - this.start.y
    const opt = useShapeStore.getState()
    if (opt.current === 'polygon'){
      // simple two-point line until mouse up (we'll close to triangle)
      updateActiveShapeProps({ points: [{x:0,y:0}, {x:dx, y:dy}, {x:dx, y:0}] })
    } else {
      updateActiveShapeProps({ width: Math.abs(dx), height: Math.abs(dy) })
    }
  }
  onPointerUp(_e:any){
    this.start = null
    this.currentId = null
  }
}
