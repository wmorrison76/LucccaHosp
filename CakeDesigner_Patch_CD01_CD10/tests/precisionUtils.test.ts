import { approxEqual, clampPrecision, EPS } from '../src/precisionUtils';

test('approxEqual within EPS', () => {
  expect(approxEqual(0.000001, 0.000002, 1e-5)).toBe(true);
});

test('clampPrecision rounds to EPS', () => {
  const v = 0.1234567;
  expect(clampPrecision(v, 1e-5)).toBeCloseTo(0.12346, 5);
});

test('EPS constant', () => {
  expect(EPS).toBe(1e-5);
});
