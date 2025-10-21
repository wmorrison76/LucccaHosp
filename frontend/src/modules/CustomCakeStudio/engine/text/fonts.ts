import type { FontSource } from './types'
import { registerFont } from './FontManager'

export const DEFAULT_FONTS: FontSource[] = [
  { name: 'Inter' },
  { name: 'Poppins' },
  { name: 'Roboto' },
  { name: 'Montserrat' },
  { name: 'Lora' },
  { name: 'Playfair Display' },
  { name: 'Great Vibes' },
  { name: 'Pacifico' },
  { name: 'Bebas Neue' },
  { name: 'Oswald' },
]

export function registerDefaultFonts(){
  for (const f of DEFAULT_FONTS) registerFont(f)
}

export default DEFAULT_FONTS;
