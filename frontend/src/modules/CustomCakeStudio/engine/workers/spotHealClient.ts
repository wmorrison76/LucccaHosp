export class SpotHealClient {
  private worker: Worker

  constructor(){
    // @ts-ignore
    this.worker = new Worker(new URL('./spotHealWorker.ts', import.meta.url), { type: 'module' })
  }

  run(imageData: ImageData, x: number, y: number, radius: number): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const onMessage = (e: MessageEvent) => {
        const { ok, imageData, error } = e.data || {}
        this.worker.removeEventListener('message', onMessage as any)
        if (!ok) reject(new Error(error || 'spotHeal failed'))
        else resolve(imageData)
      }
      this.worker.addEventListener('message', onMessage as any)
      this.worker.postMessage({ imageData, x, y, radius }, [imageData.data.buffer])
    })
  }
}

export const spotHealClient = new SpotHealClient()

export default spotHealClient;
