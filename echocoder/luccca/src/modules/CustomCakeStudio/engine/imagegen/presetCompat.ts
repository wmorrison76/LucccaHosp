export { buildPrompt } from './presets';
import { PROMPT_PRESETS as RAW_PROMPTS, STYLE_PRESETS as RAW_STYLES } from './presets';

type Any = any;
function toTriple(x: Any, kind: 'prompt'|'style'): string {
  if (typeof x === 'string') return x;
  const id = (x?.id ?? '').toString().trim();
  const title = (x?.title ?? '').toString().trim();
  const val = (kind === 'prompt' ? (x?.prompt ?? '') : (x?.token ?? '')).toString().trim();
  return [id, title, val].join('|');
}

export const PROMPT_PRESETS_STR = (Array.isArray(RAW_PROMPTS) ? RAW_PROMPTS : []).map(x => toTriple(x, 'prompt'));
export const STYLE_PRESETS_STR  = (Array.isArray(RAW_STYLES)  ? RAW_STYLES  : []).map(x => toTriple(x, 'style'));

export default PROMPT_PRESETS_STR;
