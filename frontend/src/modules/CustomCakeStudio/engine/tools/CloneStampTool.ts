import type { Tool } from './Tool'
import { useStudioStore } from '../store/useStudioStore'
import { useRetouchStore } from '../store/useRetouchStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class CloneStampTool implements Tool {
  id = 'clone' as const
  private painting = false
  private startPt: {x:number;y:number} | null = null

  onPointerDown(e:any){
    const p = getPointer(e)
    const alt = !!(e?.evt?.altKey || e?.evt?.metaKey)
    const ret = useRetouchStore.getState()
    if (alt){
      ret.setCloneSource(p.x, p.y)
      return
    }
    this.painting = true
    this.startPt = p
  }
  onPointerMove(e:any){
    const p = getPointer(e)
    // Update cursor overlay
    // @ts-ignore
    window.__retouch_cursor = p
    if (!this.painting) return
    const src = useRetouchStore.getState().cloneSource
    if (!src) return
    const s = useStudioStore.getState()
    const id = s.activeLayerId
    const L:any = s.project.layers.find(l=>l.id===id && l.type==='raster')
    if (!L || !L.src) return
    const img = new Image(); img.src = String(L.src)
    const c = document.createElement('canvas'); c.width = s.project.canvas.width; c.height = s.project.canvas.height
    const ctx = c.getContext('2d')!
    // draw base
    ctx.drawImage(img, L.transform.x, L.transform.y)
    // source offset
    const dx = p.x - (this.startPt?.x || p.x)
    const dy = p.y - (this.startPt?.y || p.y)
    const offX = (src.x + dx)
    const offY = (src.y + dy)
    // simple stamp: copy a soft circle region from source to dest
    const r = useRetouchStore.getState().brushSize/2
    const circle = document.createElement('canvas'); circle.width=c.width; circle.height=c.height
    const m = circle.getContext('2d')!
    const g = m.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    m.fillStyle = g; m.beginPath(); m.arc(p.x, p.y, r, 0, Math.PI*2); m.fill()
    // draw source image shifted so offX/offY lands under mask center
    const srcCanvas = document.createElement('canvas'); srcCanvas.width=c.width; srcCanvas.height=c.height
    const sctx = srcCanvas.getContext('2d')!
    sctx.drawImage(img, L.transform.x + (offX - p.x), L.transform.y + (offY - p.y))
    // composite
    sctx.globalCompositeOperation = 'destination-in'
    sctx.drawImage(circle, 0, 0)
    ctx.drawImage(srcCanvas, 0, 0)
    // write back
    L.src = c.toDataURL('image/png')
    s.historyMark('Clone')
  }
  onPointerUp(_e:any){ this.painting = false; this.startPt = null }
}
