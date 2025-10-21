// integration.test.js
import POSIntegration from './POSIntegration';
import PMSIntegration from './PMSIntegration';

test('POSIntegration has fetchSalesData method', () => {
  const pos = new POSIntegration('http://localhost');
  expect(typeof pos.fetchSalesData).toBe('function');
});

test('PMSIntegration has fetchGuestData method', () => {
  const pms = new PMSIntegration('http://localhost');
  expect(typeof pms.fetchGuestData).toBe('function');
});
