/**
 * LUCCCA | CD-01 (PATCH V1)
 * Central repository for cake textures + metadata.
 */
import { TextureMeta } from './types';

export const TextureLibrary: Record<string, TextureMeta> = {
  smooth: { key: 'smooth', path: '/textures/smooth.jpg' },
  creamy: { key: 'creamy', path: '/textures/creamy.jpg' },
  shiny:  { key: 'shiny',  path: '/textures/shiny.jpg'  },
  grainy: { key: 'grainy', path: '/textures/grainy.jpg' },
};
