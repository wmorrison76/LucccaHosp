export type GenSize = '512'|'768'|'1024'
export type RefMode = 'style'|'composition'|'pose'

export interface GenParams {
  prompt: string
  negative?: string
  size?: GenSize
  seed?: number | null
  guidance?: number
  steps?: number
  style?: string
  transparent?: boolean

  // NEW: reference images & strengths
  refs?: string[]            // dataURLs (or URLs) of reference images
  refMode?: RefMode          // how to use refs
  refStrength?: number       // 0..1 weight
  img2imgStrength?: number   // 0..1 image-to-image influence (if a single ref is used as base)
  maskDataUrl?: string       // optional mask for inpainting
}

export type JobStatus = 'queued'|'running'|'succeeded'|'failed'|'canceled'

export interface GenJob {
  id: string
  createdAt: number
  status: JobStatus
  params: GenParams
  progress?: number
  dataUrl?: string
  error?: string
}
