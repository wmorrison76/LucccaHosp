import type { Project } from '../types'

export type ProjectFile = {
  version: 1
  savedAt: string
  project: Project
  assets?: Record<string, string> // future: external assets map
}
