/**
 * Very lightweight CMYK-ish soft proof simulation.
 * This is NOT a color-managed ICC conversion, just a perceptual clamp:
 * - reduce saturation and contrast slightly
 * - limit very bright saturated colors to simulate gamut clipping
 */
export function cssSoftProofFilter(intensity: number = 1): string {
  const sat = 0.92 + (1-intensity)*0.0
  const con = 0.98
  const bri = 0.98
  return `saturate(${sat}) contrast(${con}) brightness(${bri})`
}

export function cssSoftProofOverlayStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  }
}

export default cssSoftProofFilter;
