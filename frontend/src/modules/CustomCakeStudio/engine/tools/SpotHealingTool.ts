import type { Tool } from './Tool'
import { useStudioStore } from '../store/useStudioStore'
import { spotHealClient } from '../workers/spotHealClient'
import { useRetouchStore } from '../store/useRetouchStore'

function getPointer(e:any){ const p=e?.target?.getStage()?.getPointerPosition?.(); return p||{x:0,y:0} }

export class SpotHealingTool implements Tool {
  id = 'spothealing' as const
  private dragging = false

  async healAt(x:number, y:number){
    const s = useStudioStore.getState()
    const id = s.activeLayerId
    const L:any = s.project.layers.find(l=>l.id===id && l.type==='raster')
    if (!L) return
    const img = new Image(); img.src = String(L.src||'')
    await img.decode().catch(()=>{})
    const W = s.project.canvas.width, H = s.project.canvas.height
    const c = document.createElement('canvas'); c.width=W; c.height=H
    const ctx = c.getContext('2d')!
    ctx.drawImage(img, L.transform.x, L.transform.y)
    const r = Math.max(4, Math.floor(useRetouchStore.getState().brushSize/2))
    const imageData = ctx.getImageData(0,0,W,H)
    const out = await spotHealClient.run(imageData, Math.round(x), Math.round(y), r)
    ctx.putImageData(out, 0, 0)
    L.src = c.toDataURL('image/png')
    s.historyMark('Spot Heal')
  }

  onPointerDown(e:any){ this.dragging = true; const p = getPointer(e); this.healAt(p.x, p.y) }
  onPointerMove(e:any){ if(!this.dragging) return; const p = getPointer(e); this.healAt(p.x, p.y) }
  onPointerUp(_e:any){ this.dragging = false }
}
