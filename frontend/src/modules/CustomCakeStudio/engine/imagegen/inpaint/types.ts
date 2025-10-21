export type InpaintParams = {
  prompt: string
  negativePrompt?: string
  strength?: number   // 0..1
  seed?: number
  width?: number
  height?: number
}

export type InpaintSource = {
  image: HTMLCanvasElement | HTMLImageElement | ImageBitmap
  mask: HTMLCanvasElement
}
