import { spotHealInplace } from '../retouch/spotHeal'

self.onmessage = (e: MessageEvent) => {
  const { imageData, x, y, radius } = e.data
  try {
    spotHealInplace(imageData, x|0, y|0, Math.max(2, radius|0))
    // @ts-ignore
    postMessage({ ok: true, imageData }, [imageData.data.buffer])
  } catch (err:any){
    // @ts-ignore
    postMessage({ ok: false, error: err?.message || 'spotHeal failed' })
  }
}
