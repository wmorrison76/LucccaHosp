// PMSIntegration.js
/**
 * Handles integration with the Property Management System (PMS).
 */
export default class PMSIntegration {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchGuestData() {
    const response = await fetch(`${this.apiEndpoint}/guests`);
    return response.json();
  }
}
