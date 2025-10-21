import { Event, WeatherAlert, WeatherForecast, GeoLocation } from '../../shared/beo-reo-types';
import { WeatherService } from '../../shared/weather-service';
import { EventLocationInfo, getEventLocation, isEventInWeatherAlert } from './event-location-utils';

export interface EventWeatherAlert {
  id: string;
  event: Event;
  location: EventLocationInfo;
  alert: WeatherAlert;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommended_actions: string[];
  created_at: Date;
  acknowledged: boolean;
}

export interface WeatherNotificationSettings {
  enabled: boolean;
  hours_before_event: number; // How many hours before event to start monitoring
  severity_threshold: 'minor' | 'moderate' | 'severe' | 'extreme';
  notification_types: ('popup' | 'email' | 'sms')[];
  auto_check_interval: number; // Minutes between automatic checks
}

class WeatherNotificationService {
  private static instance: WeatherNotificationService;
  private settings: WeatherNotificationSettings;
  private activeAlerts: Map<string, EventWeatherAlert> = new Map();
  private monitoringEvents: Set<string> = new Set();
  private checkInterval: NodeJS.Timeout | null = null;
  private subscribers: ((alert: EventWeatherAlert) => void)[] = [];

  private constructor() {
    this.settings = {
      enabled: true,
      hours_before_event: 72, // 3 days before
      severity_threshold: 'moderate',
      notification_types: ['popup'],
      auto_check_interval: 30 // 30 minutes
    };
    
    this.startMonitoring();
  }

  static getInstance(): WeatherNotificationService {
    if (!WeatherNotificationService.instance) {
      WeatherNotificationService.instance = new WeatherNotificationService();
    }
    return WeatherNotificationService.instance;
  }

  /**
   * Subscribe to weather alerts
   */
  subscribe(callback: (alert: EventWeatherAlert) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  /**
   * Add events to monitoring
   */
  async addEventsToMonitoring(events: Event[]): Promise<void> {
    for (const event of events) {
      // Only monitor events within the monitoring window
      const hoursUntilEvent = (event.start_at.getTime() - new Date().getTime()) / (1000 * 60 * 60);
      
      if (hoursUntilEvent > 0 && hoursUntilEvent <= this.settings.hours_before_event) {
        this.monitoringEvents.add(event.id);
        console.log(`Started monitoring weather for event: ${event.name}`);
      }
    }
  }

  /**
   * Remove event from monitoring
   */
  removeEventFromMonitoring(eventId: string): void {
    this.monitoringEvents.delete(eventId);
    this.activeAlerts.delete(eventId);
  }

  /**
   * Get all active alerts
   */
  getActiveAlerts(): EventWeatherAlert[] {
    return Array.from(this.activeAlerts.values());
  }

  /**
   * Get alerts for specific event
   */
  getEventAlerts(eventId: string): EventWeatherAlert | undefined {
    return this.activeAlerts.get(eventId);
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): void {
    for (const alert of this.activeAlerts.values()) {
      if (alert.id === alertId) {
        alert.acknowledged = true;
        break;
      }
    }
  }

  /**
   * Update notification settings
   */
  updateSettings(settings: Partial<WeatherNotificationSettings>): void {
    this.settings = { ...this.settings, ...settings };
    
    // Restart monitoring with new settings
    if (this.settings.enabled) {
      this.startMonitoring();
    } else {
      this.stopMonitoring();
    }
  }

  /**
   * Start automatic weather monitoring
   */
  private startMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    if (!this.settings.enabled) {
      return;
    }

    this.checkInterval = setInterval(() => {
      this.checkAllEvents();
    }, this.settings.auto_check_interval * 60 * 1000);

    // Run initial check
    this.checkAllEvents();
  }

  /**
   * Stop automatic weather monitoring
   */
  private stopMonitoring(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Check weather for all monitored events
   */
  private async checkAllEvents(): Promise<void> {
    if (!this.settings.enabled || this.monitoringEvents.size === 0) {
      return;
    }

    console.log(`Checking weather for ${this.monitoringEvents.size} monitored events`);

    // In a real application, this would fetch events from a database
    // For demo, we'll use the sample events from the dashboard
    const sampleEvents = this.getSampleEvents();
    
    for (const event of sampleEvents) {
      if (this.monitoringEvents.has(event.id)) {
        await this.checkEventWeather(event);
      }
    }
  }

  /**
   * Check weather for a specific event
   */
  private async checkEventWeather(event: Event): Promise<void> {
    try {
      const locationInfo = await getEventLocation(event);
      if (!locationInfo) {
        console.warn(`No location found for event: ${event.name}`);
        return;
      }

      const forecast = await WeatherService.getEventWeatherForecast(
        locationInfo.location,
        event.start_at
      );

      const alerts = WeatherService.generateEventAlerts(forecast, 'outdoor');
      
      // Filter alerts by severity threshold
      const relevantAlerts = alerts.filter(alert => 
        this.isAlertRelevant(alert)
      );

      if (relevantAlerts.length > 0) {
        for (const alert of relevantAlerts) {
          await this.processWeatherAlert(event, locationInfo, alert, forecast);
        }
      } else {
        // Clear any existing alerts for this event if weather has improved
        this.activeAlerts.delete(event.id);
      }

    } catch (error) {
      console.error(`Error checking weather for event ${event.name}:`, error);
    }
  }

  /**
   * Process a weather alert for an event
   */
  private async processWeatherAlert(
    event: Event,
    locationInfo: EventLocationInfo,
    alert: WeatherAlert,
    forecast: WeatherForecast
  ): Promise<void> {
    const existingAlert = this.activeAlerts.get(event.id);
    
    // Create new alert or update existing one
    const severity = this.calculateAlertSeverity(alert, event);
    const message = this.generateAlertMessage(event, alert, locationInfo);
    const recommendations = WeatherService.getEventPlanningRecommendations(event, forecast);

    const eventAlert: EventWeatherAlert = {
      id: existingAlert?.id || `alert_${event.id}_${Date.now()}`,
      event,
      location: locationInfo,
      alert,
      severity,
      message,
      recommended_actions: recommendations,
      created_at: existingAlert?.created_at || new Date(),
      acknowledged: existingAlert?.acknowledged || false
    };

    this.activeAlerts.set(event.id, eventAlert);

    // Notify subscribers if this is a new alert or severity has increased
    if (!existingAlert || this.getSeverityLevel(severity) > this.getSeverityLevel(existingAlert.severity)) {
      this.notifySubscribers(eventAlert);
    }
  }

  /**
   * Check if alert meets the severity threshold
   */
  private isAlertRelevant(alert: WeatherAlert): boolean {
    const severityLevels = { minor: 1, moderate: 2, severe: 3, extreme: 4 };
    const threshold = severityLevels[this.settings.severity_threshold];
    const alertLevel = severityLevels[alert.severity];
    
    return alertLevel >= threshold;
  }

  /**
   * Calculate alert severity based on weather alert and event timing
   */
  private calculateAlertSeverity(alert: WeatherAlert, event: Event): 'low' | 'medium' | 'high' | 'critical' {
    const hoursUntilEvent = (event.start_at.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    
    let baseSeverity = 1;
    switch (alert.severity) {
      case 'extreme': baseSeverity = 4; break;
      case 'severe': baseSeverity = 3; break;
      case 'moderate': baseSeverity = 2; break;
      case 'minor': baseSeverity = 1; break;
    }

    // Increase severity as event approaches
    if (hoursUntilEvent <= 24) baseSeverity += 1;
    if (hoursUntilEvent <= 6) baseSeverity += 1;

    // Consider impact on outdoor events
    if (alert.impact_assessment.outdoor_events === 'critical') baseSeverity += 2;
    else if (alert.impact_assessment.outdoor_events === 'high') baseSeverity += 1;

    if (baseSeverity >= 6) return 'critical';
    if (baseSeverity >= 4) return 'high';
    if (baseSeverity >= 3) return 'medium';
    return 'low';
  }

  /**
   * Generate alert message
   */
  private generateAlertMessage(event: Event, alert: WeatherAlert, locationInfo: EventLocationInfo): string {
    const hoursUntilEvent = Math.round((event.start_at.getTime() - new Date().getTime()) / (1000 * 60 * 60));
    
    return `Weather Alert for "${event.name}" at ${locationInfo.venue?.name || 'Event Venue'} (${hoursUntilEvent}h): ${alert.description}. Impact: ${alert.impact_assessment.outdoor_events} risk to outdoor activities.`;
  }

  /**
   * Get numeric severity level for comparison
   */
  private getSeverityLevel(severity: 'low' | 'medium' | 'high' | 'critical'): number {
    const levels = { low: 1, medium: 2, high: 3, critical: 4 };
    return levels[severity];
  }

  /**
   * Notify all subscribers of new alert
   */
  private notifySubscribers(alert: EventWeatherAlert): void {
    this.subscribers.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Error notifying weather alert subscriber:', error);
      }
    });
  }

  /**
   * Get sample events for demo purposes
   * In production, this would query the database
   */
  private getSampleEvents(): Event[] {
    const now = new Date();
    return [
      {
        id: '1',
        account_id: 'acc_1',
        name: 'Corporate Leadership Summit',
        status: 'definite',
        start_at: new Date(now.getTime() + 15 * 60 * 60 * 1000), // 15 hours from now
        end_at: new Date(now.getTime() + 23 * 60 * 60 * 1000), // 23 hours from now
        timezone: 'America/New_York',
        expected_guests: 250,
        manager_id: 'mgr_1',
        currency: 'USD',
        weather_plan: {
          id: 'wp_1',
          event_id: '1',
          primary_plan: 'hybrid',
          backup_plans: [],
          weather_triggers: [],
          decision_timeline: [],
          last_forecast_check: now
        },
        functions: [],
        line_items: []
      },
      {
        id: '2', 
        account_id: 'acc_2',
        name: 'Tech Innovation Conference',
        status: 'definite',
        start_at: new Date(now.getTime() + 36 * 60 * 60 * 1000), // 36 hours from now
        end_at: new Date(now.getTime() + 42 * 60 * 60 * 1000), // 42 hours from now
        timezone: 'America/New_York',
        expected_guests: 180,
        manager_id: 'mgr_2',
        currency: 'USD',
        weather_plan: {
          id: 'wp_2',
          event_id: '2',
          primary_plan: 'indoor',
          backup_plans: [],
          weather_triggers: [],
          decision_timeline: [],
          last_forecast_check: now
        },
        functions: [],
        line_items: []
      },
      {
        id: '3',
        account_id: 'acc_3',
        name: 'Wedding Reception',
        status: 'definite', 
        start_at: new Date(now.getTime() + 60 * 60 * 60 * 1000), // 60 hours from now
        end_at: new Date(now.getTime() + 66 * 60 * 60 * 1000), // 66 hours from now
        timezone: 'America/New_York',
        expected_guests: 120,
        manager_id: 'mgr_3',
        currency: 'USD',
        weather_plan: {
          id: 'wp_3',
          event_id: '3',
          primary_plan: 'outdoor',
          backup_plans: [],
          weather_triggers: [],
          decision_timeline: [],
          last_forecast_check: now
        },
        functions: [],
        line_items: []
      }
    ];
  }
}

// Export singleton instance
export const weatherNotificationService = WeatherNotificationService.getInstance();

// Export utility functions
export { WeatherNotificationService };
