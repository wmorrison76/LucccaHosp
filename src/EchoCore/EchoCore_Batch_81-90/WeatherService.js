// WeatherService.js
/**
 * Fetches weather data for forecasting operations.
 */
export default class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeather(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${location}`
    );
    return response.json();
  }
}
