/**
 * LUCCCA | WB-04
 * Detects device performance and toggles light/heavy UI modes.
 */
export function detectPerfMode() {
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  return hardwareConcurrency > 4 ? 'high' : 'low';
}
