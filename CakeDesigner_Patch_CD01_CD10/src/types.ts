/**
 * Shared types for Cake Designer patch set.
 */
export type TextureKey = 'smooth' | 'creamy' | 'shiny' | 'grainy';
export interface TextureMeta {
  key: TextureKey;
  path: string;
  normal?: string;
  roughness?: string;
}
export interface PrecisionConfig {
  epsilon: number; // target: 1e-5
}
