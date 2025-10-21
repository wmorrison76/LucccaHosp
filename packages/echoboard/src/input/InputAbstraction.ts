
/**
 * LUCCCA | SEG-A-WB-17
 * Unified pointer/touch/pen handler.
 */
export type Pointer = { x: number; y: number; type: 'mouse' | 'touch' | 'pen' };

export const normalizeEvent = (e: any): Pointer => {
  if (e.touches && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY, type: 'touch' };
  }
  return { x: e.clientX, y: e.clientY, type: e.pointerType || 'mouse' };
};
