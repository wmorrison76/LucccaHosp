// PerfModeDetector.test.js
import { detectPerfMode } from './PerfModeDetector';

test('detectPerfMode returns a string', () => {
  expect(typeof detectPerfMode()).toBe('string');
});
