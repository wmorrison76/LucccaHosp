export type FontSource = { name: string; url?: string; style?: string; weight?: string | number }
export type FontStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface FontEntry extends FontSource {
  id: string
  status: FontStatus
  error?: string
}
