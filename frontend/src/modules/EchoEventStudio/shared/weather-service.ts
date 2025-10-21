// Weather Forecasting Service for Event Planning
// Provides 3-day forecasts with event impact analysis

import { WeatherForecast, HourlyForecast, WeatherAlert, EventImpact, GeoLocation, Event } from './beo-reo-types';
import { getConfig } from './config';

export class WeatherService {
  private static getConfig() {
    return getConfig().weather;
  }
  
  /**
   * Get weather forecast for event location
   * @param location Event location coordinates
   * @param eventDate Event date and time
   * @returns Detailed weather forecast with event impact analysis
   */
  static async getEventWeatherForecast(
    location: GeoLocation,
    eventDate: Date
  ): Promise<WeatherForecast> {
    try {
      const config = this.getConfig();

      // Get 5-day forecast with 3-hour intervals
      const forecastUrl = `${config.baseUrl}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${config.apiKey}&units=metric`;

      // Simulate API call for demo purposes
      const mockForecast = this.generateMockForecast(location, eventDate);

      // In production, would fetch from actual API:
      // const response = await fetch(forecastUrl);
      // const data = await response.json();

      return mockForecast;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw new Error('Unable to retrieve weather forecast');
    }
  }

  /**
   * Generate weather alerts for events
   * @param forecast Weather forecast data
   * @param eventType Type of event (indoor/outdoor/hybrid)
   * @returns Array of weather alerts relevant to the event
   */
  static generateEventAlerts(forecast: WeatherForecast, eventType: string): WeatherAlert[] {
    const alerts: WeatherAlert[] = [];
    
    forecast.hourly_forecast.forEach(hour => {
      // Rain alerts for outdoor events
      if (eventType.includes('outdoor') && hour.precipitation_probability > 30) {
        alerts.push({
          type: hour.precipitation_probability > 70 ? 'warning' : 'watch',
          severity: hour.precipitation_probability > 90 ? 'severe' : 'moderate',
          event: 'precipitation',
          description: `${hour.precipitation_probability}% chance of rain at ${hour.time.toLocaleTimeString()}`,
          start_time: hour.time,
          end_time: new Date(hour.time.getTime() + 3 * 60 * 60 * 1000), // 3 hours
          impact_assessment: {
            outdoor_events: hour.precipitation_probability > 70 ? 'high' : 'medium',
            guest_comfort: hour.precipitation_probability > 50 ? 'uncomfortable' : 'manageable',
            equipment_risk: hour.precipitation_probability > 80 ? 'high' : 'minimal',
            recommended_actions: [
              'Prepare tent/covered area backup',
              'Have umbrellas available for guests',
              'Protect electrical equipment',
              'Consider indoor backup venue'
            ]
          }
        });
      }

      // Wind alerts
      if (hour.wind_speed > 25) { // 25 km/h = ~15 mph
        alerts.push({
          type: hour.wind_speed > 40 ? 'warning' : 'watch',
          severity: hour.wind_speed > 60 ? 'severe' : 'moderate',
          event: 'high_winds',
          description: `Wind speeds of ${hour.wind_speed} km/h expected`,
          start_time: hour.time,
          end_time: new Date(hour.time.getTime() + 3 * 60 * 60 * 1000),
          impact_assessment: {
            outdoor_events: hour.wind_speed > 40 ? 'high' : 'medium',
            guest_comfort: hour.wind_speed > 30 ? 'uncomfortable' : 'manageable',
            equipment_risk: hour.wind_speed > 50 ? 'high' : 'moderate',
            recommended_actions: [
              'Secure all decorations and signage',
              'Weight down tents and structures',
              'Avoid tall floral arrangements',
              'Consider wind-resistant menu options'
            ]
          }
        });
      }

      // Temperature alerts
      if (hour.temperature > 35 || hour.temperature < 0) {
        alerts.push({
          type: 'advisory',
          severity: hour.temperature > 40 || hour.temperature < -10 ? 'severe' : 'moderate',
          event: 'extreme_temperature',
          description: `${hour.temperature > 35 ? 'High' : 'Low'} temperature: ${hour.temperature}°C`,
          start_time: hour.time,
          end_time: new Date(hour.time.getTime() + 3 * 60 * 60 * 1000),
          impact_assessment: {
            outdoor_events: hour.temperature > 35 || hour.temperature < 5 ? 'high' : 'medium',
            guest_comfort: hour.temperature > 30 || hour.temperature < 10 ? 'uncomfortable' : 'manageable',
            equipment_risk: 'minimal',
            recommended_actions: hour.temperature > 35 ? [
              'Provide shade structures',
              'Increase hydration stations',
              'Adjust menu to lighter options',
              'Consider portable cooling solutions'
            ] : [
              'Provide heating solutions',
              'Offer warm beverages',
              'Ensure indoor backup option',
              'Adjust menu to warming options'
            ]
          }
        });
      }
    });

    // Remove duplicate alerts and sort by severity
    return alerts
      .filter((alert, index, self) => 
        index === self.findIndex(a => a.event === alert.event && a.start_time.getTime() === alert.start_time.getTime())
      )
      .sort((a, b) => {
        const severityOrder = { extreme: 4, severe: 3, moderate: 2, minor: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      });
  }

  /**
   * Analyze weather impact on specific event
   * @param event Event details
   * @param forecast Weather forecast
   * @returns Event impact analysis with recommendations
   */
  static analyzeEventImpact(event: Event, forecast: WeatherForecast): EventImpact {
    const eventHours = forecast.hourly_forecast.filter(hour => 
      hour.time >= event.start_at && hour.time <= event.end_at
    );

    const avgPrecipitation = eventHours.reduce((sum, hour) => sum + hour.precipitation_probability, 0) / eventHours.length;
    const maxWindSpeed = Math.max(...eventHours.map(hour => hour.wind_speed));
    const avgTemp = eventHours.reduce((sum, hour) => sum + hour.temperature, 0) / eventHours.length;

    let outdoorEventRisk: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let guestComfort: 'comfortable' | 'manageable' | 'uncomfortable' | 'dangerous' = 'comfortable';
    let equipmentRisk: 'none' | 'minimal' | 'moderate' | 'high' = 'none';

    // Assess outdoor event risk
    if (avgPrecipitation > 70 || maxWindSpeed > 50 || avgTemp > 40 || avgTemp < -5) {
      outdoorEventRisk = 'critical';
    } else if (avgPrecipitation > 40 || maxWindSpeed > 30 || avgTemp > 35 || avgTemp < 0) {
      outdoorEventRisk = 'high';
    } else if (avgPrecipitation > 20 || maxWindSpeed > 20 || avgTemp > 30 || avgTemp < 5) {
      outdoorEventRisk = 'medium';
    }

    // Assess guest comfort
    if (avgTemp > 35 || avgTemp < 0 || avgPrecipitation > 60) {
      guestComfort = avgTemp > 40 || avgTemp < -10 ? 'dangerous' : 'uncomfortable';
    } else if (avgTemp > 30 || avgTemp < 5 || avgPrecipitation > 30) {
      guestComfort = 'manageable';
    }

    // Assess equipment risk
    if (maxWindSpeed > 60 || avgPrecipitation > 80) {
      equipmentRisk = 'high';
    } else if (maxWindSpeed > 30 || avgPrecipitation > 50) {
      equipmentRisk = 'moderate';
    } else if (maxWindSpeed > 15 || avgPrecipitation > 20) {
      equipmentRisk = 'minimal';
    }

    // Generate recommendations
    const recommendations: string[] = [];

    if (outdoorEventRisk === 'critical') {
      recommendations.push('🚨 CRITICAL: Move event indoors or postpone');
      recommendations.push('📞 Contact all guests immediately about venue change');
    } else if (outdoorEventRisk === 'high') {
      recommendations.push('⚠️ HIGH RISK: Prepare full indoor backup plan');
      recommendations.push('🏠 Confirm backup venue availability');
    } else if (outdoorEventRisk === 'medium') {
      recommendations.push('🌦️ Monitor weather closely until event day');
      recommendations.push('⛺ Prepare covered areas and backup equipment');
    }

    if (avgPrecipitation > 30) {
      recommendations.push('☂️ Provide umbrellas for guests');
      recommendations.push('🚪 Ensure covered entry/exit paths');
    }

    if (maxWindSpeed > 25) {
      recommendations.push('💨 Secure all decorations and signage');
      recommendations.push('🎪 Weight down tents and structures');
    }

    if (avgTemp > 30) {
      recommendations.push('🌞 Provide shade and cooling stations');
      recommendations.push('💧 Increase water/beverage service');
    } else if (avgTemp < 10) {
      recommendations.push('🔥 Arrange heating solutions');
      recommendations.push('☕ Provide warm beverages and comfort items');
    }

    return {
      outdoor_events: outdoorEventRisk,
      guest_comfort: guestComfort,
      equipment_risk: equipmentRisk,
      recommended_actions: recommendations
    };
  }

  /**
   * Generate mock forecast for demo purposes
   */
  private static generateMockForecast(location: GeoLocation, eventDate: Date): WeatherForecast {
    const now = new Date();
    const hourly: HourlyForecast[] = [];

    // Generate 72 hours of forecast (3 days)
    for (let i = 0; i < 72; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      
      // Simulate realistic weather patterns
      const baseTemp = 22 + Math.sin(i * Math.PI / 12) * 8; // Daily temperature cycle
      const precipChance = Math.max(0, 30 + Math.sin(i * Math.PI / 24) * 40 + (Math.random() - 0.5) * 30);
      
      hourly.push({
        time,
        temperature: Math.round(baseTemp + (Math.random() - 0.5) * 4),
        temperature_feels_like: Math.round(baseTemp + (Math.random() - 0.5) * 6),
        humidity: Math.round(60 + (Math.random() - 0.5) * 30),
        precipitation_probability: Math.round(Math.max(0, Math.min(100, precipChance))),
        precipitation_amount: precipChance > 50 ? Math.random() * 5 : 0,
        wind_speed: Math.round(10 + Math.random() * 20),
        wind_direction: Math.round(Math.random() * 360),
        cloud_cover: Math.round(Math.random() * 100),
        conditions: precipChance > 70 ? 'rain' : precipChance > 40 ? 'cloudy' : 'clear',
        icon: precipChance > 70 ? '🌧️' : precipChance > 40 ? '☁️' : '☀️'
      });
    }

    return {
      date: now,
      location,
      hourly_forecast: hourly,
      alerts: [], // Will be generated separately
      confidence_score: 0.85,
      last_updated: now
    };
  }

  /**
   * Get weather planning recommendations for specific event
   */
  static getEventPlanningRecommendations(event: Event, forecast: WeatherForecast): string[] {
    const impact = this.analyzeEventImpact(event, forecast);
    const alerts = this.generateEventAlerts(forecast, 'outdoor'); // Assume outdoor for max safety
    
    const recommendations: string[] = [];
    
    // Add timeline-based recommendations
    const hoursUntilEvent = (event.start_at.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilEvent <= 24 && impact.outdoor_events !== 'low') {
      recommendations.push('🕐 24-hour checkpoint: Final weather decision needed');
      recommendations.push('📋 Confirm backup plan details with all vendors');
    }
    
    if (hoursUntilEvent <= 72 && alerts.length > 0) {
      recommendations.push('🌤️ 3-day weather watch: Monitor conditions closely');
      recommendations.push('📞 Alert client about potential weather considerations');
    }

    // Add impact-specific recommendations
    recommendations.push(...impact.recommended_actions);
    
    // Add unique recommendations based on alerts
    alerts.forEach(alert => {
      if (alert.severity === 'severe' || alert.severity === 'extreme') {
        recommendations.push(`⚠️ ${alert.event.toUpperCase()}: ${alert.description}`);
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }
}

// Export weather utilities
export const WeatherUtils = {
  /**
   * Format weather for display
   */
  formatWeatherCondition: (forecast: HourlyForecast): string => {
    return `${forecast.icon} ${forecast.temperature}°C, ${forecast.conditions} (${forecast.precipitation_probability}% rain)`;
  },

  /**
   * Get weather emoji based on conditions
   */
  getWeatherEmoji: (conditions: string): string => {
    const emojiMap: Record<string, string> = {
      'clear': '☀️',
      'sunny': '☀️',
      'cloudy': '☁️',
      'overcast': '☁️',
      'rain': '🌧️',
      'heavy_rain': '⛈️',
      'snow': '❄️',
      'storm': '⛈️',
      'wind': '💨',
      'fog': '🌫️',
    };
    return emojiMap[conditions.toLowerCase()] || '🌤️';
  },

  /**
   * Determine if weather is suitable for outdoor events
   */
  isOutdoorSuitable: (forecast: HourlyForecast): boolean => {
    return forecast.precipitation_probability < 30 && 
           forecast.wind_speed < 30 && 
           forecast.temperature > 5 && 
           forecast.temperature < 35;
  }
};

export default WeatherUtils;
