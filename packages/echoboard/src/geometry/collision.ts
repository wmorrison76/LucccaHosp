
/**
 * LUCCCA | SEG-A-WB-10
 * Axis-aligned bounding boxes collision utility.
 */
export type Rect = { x: number; y: number; w: number; h: number };

export const collide = (a: Rect, b: Rect): boolean => {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
};

export const resolve = (moving: Rect, fixed: Rect): Rect => {
  // naive push out resolution (left side as default)
  if (!collide(moving, fixed)) return moving;
  return { ...moving, x: fixed.x - moving.w - 1 };
};
