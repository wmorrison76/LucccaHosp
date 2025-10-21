// analytics.test.js
import PredictiveAnalyticsEngine from './PredictiveAnalyticsEngine';

test('forecasts next value correctly', () => {
  const engine = new PredictiveAnalyticsEngine([1, 2, 3]);
  expect(engine.forecastNextValue()).toBe(4);
});
