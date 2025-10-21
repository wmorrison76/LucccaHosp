export interface Particle {
  x:number; y:number;
  px:number; py:number; // previous position (for tendril strokes)
  vx:number; vy:number;
  size:number;
  hue:number; sat:number; light:number; alpha:number;
  sparkle:number; // 0..1
}
