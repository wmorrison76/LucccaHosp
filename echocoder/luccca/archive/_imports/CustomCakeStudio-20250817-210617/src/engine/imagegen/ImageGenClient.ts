
/**
 * Pluggable image generation client stub.
 * Implement POST /api/generate-image on your server; return a PNG with alpha.
 */
export interface GenerateOptions {
  prompt: string
  negative?: string
  width?: number; height?: number
  seed?: number
  style?: string
}

export async function generateImage(opts: GenerateOptions): Promise<string> {
  console.info('[ImageGen] Stub called with:', opts)
  // Return a 1x1 transparent PNG data URL as a placeholder.
  const png =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
  return png
}
