import type { Tool } from './Tool'
import { useStudioStore } from '../store/useStudioStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class PatchTool implements Tool {
  id = 'patch' as const
  private dragging = false
  private start: {x:number;y:number} | null = null

  onPointerDown(e:any){ this.dragging = true; this.start = getPointer(e) }
  onPointerMove(_e:any){ /* visualize via selection overlay (future) */ }
  onPointerUp(e:any){
    if (!this.dragging) return
    this.dragging = false
    const end = getPointer(e)
    const s = useStudioStore.getState()
    const id = s.activeLayerId
    const L:any = s.project.layers.find(l=>l.id===id && l.type==='raster')
    if (!L || !this.start) return
    const sel = s.selection
    if (!sel || !sel[0]?.length){ /* require selection */ return }
    const W = s.project.canvas.width, H = s.project.canvas.height
    const c = document.createElement('canvas'); c.width=W; c.height=H
    const ctx = c.getContext('2d')!
    const img = new Image(); img.src = String(L.src||'')
    // draw base
    ctx.drawImage(img, L.transform.x, L.transform.y)
    // make selection mask
    const mask = document.createElement('canvas'); mask.width=W; mask.height=H
    const mctx = mask.getContext('2d')!
    mctx.beginPath()
    for (const poly of sel){
      if (!poly.length) continue
      mctx.moveTo(poly[0].x, poly[0].y)
      for (let i=1;i<poly.length;i++) mctx.lineTo(poly[i].x, poly[i].y)
      mctx.closePath()
    }
    mctx.fillStyle = '#fff'; mctx.fill()
    // build source image shifted by delta
    const dx = end.x - this.start.x, dy = end.y - this.start.y
    const srcCanvas = document.createElement('canvas'); srcCanvas.width=W; srcCanvas.height=H
    const sctx = srcCanvas.getContext('2d')!
    sctx.drawImage(img, L.transform.x - dx, L.transform.y - dy)
    // apply mask
    sctx.globalCompositeOperation = 'destination-in'
    sctx.drawImage(mask, 0, 0)
    // composite with soft alpha
    ctx.globalAlpha = 0.85
    ctx.drawImage(srcCanvas, 0, 0)
    ctx.globalAlpha = 1
    // write back
    L.src = c.toDataURL('image/png')
    s.historyMark('Patch')
  }
}
