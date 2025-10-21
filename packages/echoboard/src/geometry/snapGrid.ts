
/**
 * LUCCCA | SEG-A-WB-09
 * Subpixel-safe snapping.
 */
export const snap = (value: number, step = 8): number => {
  const snapped = Math.round(value / step) * step;
  return Number(snapped.toFixed(4));
};
