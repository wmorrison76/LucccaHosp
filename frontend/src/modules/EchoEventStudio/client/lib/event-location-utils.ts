import { Event, GeoLocation, Address, Function, Space, Venue } from '../../shared/beo-reo-types';

export interface EventLocationInfo {
  event: Event;
  location: GeoLocation;
  address: Address;
  displayName: string;
  venue?: Venue;
}

/**
 * Extract geographic location from an event
 * Follows the chain: Event -> Function -> Space -> Venue -> Address.coordinates
 */
export async function getEventLocation(event: Event): Promise<EventLocationInfo | null> {
  try {
    // For demo purposes, we'll use mock data since we don't have a database connection
    // In a real application, this would query the database for related entities
    
    // Check if event has functions with spaces
    if (!event.functions?.length) {
      // Fallback to mock data for demo
      return createMockEventLocation(event);
    }

    const firstFunction = event.functions[0];
    
    // In production, would query: Space -> Venue -> Address
    // For now, return mock data based on event
    return createMockEventLocation(event);
    
  } catch (error) {
    console.error('Error extracting event location:', error);
    return null;
  }
}

/**
 * Get locations for multiple events
 */
export async function getMultipleEventLocations(events: Event[]): Promise<EventLocationInfo[]> {
  const locations: EventLocationInfo[] = [];
  
  for (const event of events) {
    const location = await getEventLocation(event);
    if (location) {
      locations.push(location);
    }
  }
  
  return locations;
}

/**
 * Create mock location data for demo purposes
 * In production, this would be replaced with actual database queries
 */
function createMockEventLocation(event: Event): EventLocationInfo {
  // Mock venue locations in Florida region
  const mockVenues = [
    {
      name: "Tampa Convention Center",
      address: {
        street_1: "333 S Franklin St",
        city: "Tampa",
        state: "FL",
        postal_code: "33602",
        country: "USA",
        coordinates: { latitude: 27.9506, longitude: -82.4572 }
      }
    },
    {
      name: "Orlando World Center Marriott",
      address: {
        street_1: "8701 World Center Dr",
        city: "Orlando", 
        state: "FL",
        postal_code: "32821",
        country: "USA",
        coordinates: { latitude: 28.3772, longitude: -81.5387 }
      }
    },
    {
      name: "Miami Beach Convention Center",
      address: {
        street_1: "1901 Convention Center Dr",
        city: "Miami Beach",
        state: "FL", 
        postal_code: "33139",
        country: "USA",
        coordinates: { latitude: 25.7907, longitude: -80.1300 }
      }
    },
    {
      name: "Jacksonville Marriott",
      address: {
        street_1: "4670 Salisbury Rd",
        city: "Jacksonville",
        state: "FL",
        postal_code: "32256", 
        country: "USA",
        coordinates: { latitude: 30.2672, longitude: -81.5707 }
      }
    },
    {
      name: "The Vinoy Renaissance Resort",
      address: {
        street_1: "501 5th Ave NE",
        city: "St. Petersburg",
        state: "FL",
        postal_code: "33701",
        country: "USA", 
        coordinates: { latitude: 27.7676, longitude: -82.6292 }
      }
    }
  ];

  // Assign venue based on event name or ID
  const venueIndex = event.name.length % mockVenues.length;
  const mockVenue = mockVenues[venueIndex];

  return {
    event,
    location: mockVenue.address.coordinates!,
    address: mockVenue.address,
    displayName: `${event.name} - ${mockVenue.name}`,
    venue: {
      id: `venue_${venueIndex}`,
      name: mockVenue.name,
      address: mockVenue.address,
      timezone: "America/New_York",
      spaces: [],
      contact_info: {
        phone: "+1 (555) 123-4567",
        email: "events@venue.com"
      },
      amenities: ["parking", "wifi", "catering", "av_equipment"],
      parking_capacity: 500
    }
  };
}

/**
 * Format address for display
 */
export function formatAddress(address: Address): string {
  const parts = [
    address.street_1,
    address.street_2,
    address.city,
    `${address.state} ${address.postal_code}`,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
}

/**
 * Calculate distance between two geographic points (in kilometers)
 */
export function calculateDistance(point1: GeoLocation, point2: GeoLocation): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
  const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Check if an event is within a weather alert area
 */
export function isEventInWeatherAlert(
  eventLocation: GeoLocation,
  alertCenter: GeoLocation,
  alertRadius: number // in kilometers
): boolean {
  const distance = calculateDistance(eventLocation, alertCenter);
  return distance <= alertRadius;
}

/**
 * Convert GeoLocation format for different APIs
 * WeatherRadarMap expects { lat, lng }
 * WeatherService expects { latitude, longitude }
 */
export function convertToRadarFormat(location: GeoLocation): { lat: number; lng: number } {
  return {
    lat: location.latitude,
    lng: location.longitude
  };
}

export default formatAddress;
