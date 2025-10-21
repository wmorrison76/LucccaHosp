/**
 * presets.ts — string-compatible exports for ImageGenPanel
 * Supports both "id|Title|value" and object views via helper arrays.
 */
export type PromptObj = { id: string; title: string; prompt: string }
export type StyleObj  = { id: string; title: string; token: string }

export type PromptItem = string | PromptObj; // "id|Title|prompt" OR object
export type StyleItem  = string | StyleObj;  // "id|Title|token"  OR object

// === Primary exports used by panels (strings for p.split('|')) ===
export const PROMPT_PRESETS: PromptItem[] = [
  'hero-cake|Hero Cake|studio photo of a decorated custom cake on a cake stand, soft lighting, high detail, appetizing styling',
  'cupcake-grid|Cupcake Grid|top-down grid of assorted cupcakes with frosting swirls, pastel palette, soft shadows',
  'wedding-tier|Wedding Tiered Cake|elegant tiered wedding cake, white fondant, floral accents, natural window light',
  'kids-theme|Kids Theme|playful children birthday cake with bright colors, fun fondant characters, confetti, party backdrop',
];

export const STYLE_PRESETS: StyleItem[] = [
  'photo|Photoreal|photorealistic, 50mm lens, shallow depth of field',
  'watercolor|Watercolor|watercolor style, textured paper, light washes',
  'vector|Vector|flat vector illustration, clean lines, minimal shading',
  'kidsbook|Kids Book|children book illustration, playful, bright colors',
  'noir|Noir|moody cinematic lighting, high contrast',
];

// === Helpers to access object views (for engine code) ===
function parse3(s: string) {
  const parts = String(s).split('|');
  const [id = '', title = '', rest = ''] = parts;
  return { id: id.trim(), title: title.trim(), rest: rest.trim() };
}

export function toPromptObj(p: PromptItem): PromptObj {
  if (typeof p === 'string') {
    const { id, title, rest } = parse3(p); return { id, title, prompt: rest };
  }
  return p;
}
export function toStyleObj(s: StyleItem): StyleObj {
  if (typeof s === 'string') {
    const { id, title, rest } = parse3(s); return { id, title, token: rest };
  }
  return s;
}

export const PROMPT_PRESETS_OBJ: PromptObj[] = PROMPT_PRESETS.map(toPromptObj);
export const STYLE_PRESETS_OBJ:  StyleObj[]  = STYLE_PRESETS.map(toStyleObj);

export function buildPrompt(base: string, styleId?: string) {
  const s = STYLE_PRESETS_OBJ.find(x => x.id === styleId)?.token?.trim() || '';
  return s ? `${base}, ${s}` : base;
}
