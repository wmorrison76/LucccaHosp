export class RefineClient {
  private worker: Worker | null = null
  private ready = false

  private ensure(){
    if (this.worker) return
    this.worker = new Worker(new URL('../workers/refineWorker.ts', import.meta.url), { type: 'module' })
  }

  async refine(width:number, height:number, polys: Array<Array<{x:number;y:number}>>, feather:number, expand:number): Promise<HTMLCanvasElement> {
    if (typeof Worker === 'undefined'){
      // fallback: do it inline by drawing a simple mask; feather/expand skipped for fallback
      const c = document.createElement('canvas'); c.width = width; c.height = height
      const ctx = c.getContext('2d')!; ctx.fillStyle = '#000'; ctx.fillRect(0,0,width,height)
      ctx.fillStyle = '#fff'
      for (const poly of polys){
        if (!poly.length) continue
        ctx.beginPath(); ctx.moveTo(poly[0].x, poly[0].y)
        for (let i=1;i<poly.length;i++){ ctx.lineTo(poly[i].x, poly[i].y) }
        ctx.closePath(); ctx.fill()
      }
      return c
    }
    this.ensure()
    return new Promise((resolve) => {
      const w = this.worker!
      const onMsg = (ev: MessageEvent) => {
        const res = ev.data
        if (res?.type === 'refined'){
          w.removeEventListener('message', onMsg)
          const c = document.createElement('canvas'); c.width = res.width; c.height = res.height
          const ctx = c.getContext('2d')!
          const img = new ImageData(new Uint8ClampedArray(res.data.data), res.width, res.height)
          ctx.putImageData(img, 0, 0)
          resolve(c)
        }
      }
      w.addEventListener('message', onMsg)
      w.postMessage({ type:'refine', width, height, polys, feather, expand })
    })
  }
}

export const refineClient = new RefineClient()

export default refineClient;
