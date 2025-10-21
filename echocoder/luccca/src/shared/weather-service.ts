// Simple shim for weather service

export const WeatherService = {
  getForecast: (location: string) => {
    console.log("WeatherService.getForecast called for:", location);
    return Promise.resolve({
      location,
      temperature: 24,
      conditions: "sunny",
      precipitation: 5,
      wind: 10,
    });
  },
};

export const WeatherUtils = {
  formatForecast: (data: any) =>
    `${data.temperature}°C, ${data.conditions}, ${data.precipitation}% chance of rain`,
};
