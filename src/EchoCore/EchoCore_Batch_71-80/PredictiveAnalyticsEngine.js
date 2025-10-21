// PredictiveAnalyticsEngine.js
/**
 * Basic predictive analytics engine for EchoCore.
 */
export default class PredictiveAnalyticsEngine {
  constructor(data = []) {
    this.data = data;
  }

  forecastNextValue() {
    if (this.data.length < 2) return null;
    const diff = this.data[this.data.length - 1] - this.data[this.data.length - 2];
    return this.data[this.data.length - 1] + diff;
  }
}
