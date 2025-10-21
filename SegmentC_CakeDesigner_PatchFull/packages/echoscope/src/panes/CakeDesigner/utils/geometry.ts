/**
 * LUCCCA | SEG-C-CD-03
 * File: packages/echoscope/src/panes/CakeDesigner/utils/geometry.ts
 * Created: 2025-07-27 by ChatGPT
 * Depends On: three
 * Exposes: geometry helpers
 * Location Notes: Consumed by CakeDesigner pane & sub-tools
 * Tests: __tests__/cake-designer/geometry.test.ts
 * ADR: docs/rfc/RFC-cake-designer-costing-and-rendering.md
 */

export function cmToM(cm: number) {
  return cm * 0.01;
}

export function roundTo(n: number, decimals = 3) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
