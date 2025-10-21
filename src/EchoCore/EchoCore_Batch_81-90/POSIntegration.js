// POSIntegration.js
/**
 * Handles integration with the POS (Point of Sale) system.
 */
export default class POSIntegration {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchSalesData() {
    const response = await fetch(`${this.apiEndpoint}/sales`);
    return response.json();
  }
}
