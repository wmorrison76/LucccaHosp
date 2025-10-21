// Mobile Applications/PWA Module Types

export interface MobileApp {
  id: string;
  name: string;
  platform: 'ios' | 'android' | 'pwa';
  version: string;
  buildNumber: number;
  status: 'development' | 'testing' | 'production' | 'maintenance';
  features: MobileFeature[];
  downloadCount: number;
  rating: number;
  reviewCount: number;
  lastUpdate: Date;
  createdAt: Date;
}

export interface MobileFeature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  enabled: boolean;
  permissions: Permission[];
  apiEndpoints: string[];
  lastModified: Date;
}

export type FeatureCategory = 
  | 'authentication'
  | 'guest-services'
  | 'staff-tools'
  | 'notifications'
  | 'payments'
  | 'communication'
  | 'reservations'
  | 'feedback'
  | 'analytics';

export type Permission = 
  | 'camera'
  | 'location'
  | 'notifications'
  | 'contacts'
  | 'calendar'
  | 'storage'
  | 'microphone'
  | 'biometric'
  | 'nfc';

export interface StaffMobileAccess {
  id: string;
  userId: string;
  deviceId: string;
  deviceType: 'ios' | 'android';
  appVersion: string;
  permissions: StaffPermission[];
  lastActive: Date;
  isOnline: boolean;
  location?: GeoLocation;
}

export type StaffPermission = 
  | 'checkin-checkout'
  | 'guest-management'
  | 'event-management'
  | 'inventory-access'
  | 'reporting'
  | 'communication'
  | 'emergency-alerts'
  | 'maintenance-requests';

export interface GuestMobilePortal {
  id: string;
  guestId: string;
  sessionToken: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomNumber: string;
  accessLevel: GuestAccessLevel;
  preferences: GuestMobilePreferences;
  services: MobileService[];
  notifications: MobileNotification[];
}

export type GuestAccessLevel = 'basic' | 'premium' | 'vip' | 'loyalty';

export interface GuestMobilePreferences {
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  services: {
    roomService: boolean;
    housekeeping: boolean;
    concierge: boolean;
    spa: boolean;
    dining: boolean;
  };
  privacy: {
    shareLocation: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

export interface MobileService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  icon: string;
  isAvailable: boolean;
  estimatedTime?: number; // in minutes
  price?: number;
  rating: number;
  features: string[];
}

export type ServiceCategory = 
  | 'room-service'
  | 'housekeeping'
  | 'concierge'
  | 'dining'
  | 'spa-wellness'
  | 'transportation'
  | 'entertainment'
  | 'business-services';

export interface MobileNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'staff' | 'guests' | 'management' | 'all';
  scheduledTime?: Date;
  sentTime?: Date;
  readBy: string[];
  actionRequired: boolean;
  relatedEntity?: {
    type: 'reservation' | 'event' | 'service' | 'maintenance';
    id: string;
  };
}

export type NotificationType = 
  | 'check-in-reminder'
  | 'check-out-reminder'
  | 'service-ready'
  | 'event-update'
  | 'maintenance-alert'
  | 'promotional'
  | 'system-update'
  | 'emergency';

export interface PWAConfiguration {
  id: string;
  name: string;
  shortName: string;
  description: string;
  version: string;
  manifestUrl: string;
  iconSizes: PWAIcon[];
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
  features: PWAFeature[];
  offlineCapabilities: OfflineCapability[];
  cacheStrategy: CacheStrategy;
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export interface PWAFeature {
  name: string;
  enabled: boolean;
  configuration: Record<string, unknown>;
}

export interface OfflineCapability {
  feature: string;
  cacheType: 'static' | 'dynamic' | 'runtime';
  strategy: 'cache-first' | 'network-first' | 'cache-only' | 'network-only';
  expiration: number; // in hours
}

export type CacheStrategy = 'aggressive' | 'balanced' | 'minimal' | 'custom';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

export interface MobileAnalytics {
  id: string;
  appId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: {
    activeUsers: number;
    sessions: number;
    averageSessionDuration: number; // in minutes
    screenViews: number;
    crashes: number;
    errors: number;
    features: FeatureUsage[];
    performance: PerformanceMetrics;
  };
  startDate: Date;
  endDate: Date;
}

export interface FeatureUsage {
  featureId: string;
  featureName: string;
  usageCount: number;
  uniqueUsers: number;
  averageUsageTime: number;
  conversionRate: number;
}

export interface PerformanceMetrics {
  appStartTime: number; // in milliseconds
  apiResponseTime: number; // in milliseconds
  crashRate: number; // percentage
  memoryUsage: number; // in MB
  batteryImpact: 'low' | 'medium' | 'high';
  networkUsage: number; // in MB
}

export interface MobileFeedback {
  id: string;
  userId: string;
  appVersion: string;
  platform: 'ios' | 'android' | 'pwa';
  category: FeedbackCategory;
  rating: number;
  subject: string;
  description: string;
  attachments: string[];
  deviceInfo: DeviceInfo;
  status: 'open' | 'in-review' | 'resolved' | 'closed';
  response?: string;
  respondedBy?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export type FeedbackCategory = 
  | 'bug-report'
  | 'feature-request'
  | 'usability'
  | 'performance'
  | 'content'
  | 'general';

export interface DeviceInfo {
  model: string;
  osVersion: string;
  appVersion: string;
  screenResolution: string;
  memoryTotal: number;
  storageAvailable: number;
  networkType: 'wifi' | 'cellular' | 'none';
}

// API Integration Types for Mobile
export interface MobileAPIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authentication: AuthenticationType;
  rateLimit: RateLimit;
  caching: CacheConfiguration;
  offline: OfflineConfiguration;
  documentation: string;
}

export type AuthenticationType = 
  | 'bearer-token'
  | 'api-key'
  | 'oauth2'
  | 'basic-auth'
  | 'session-based';

export interface RateLimit {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
}

export interface CacheConfiguration {
  enabled: boolean;
  ttl: number; // time to live in seconds
  strategy: 'memory' | 'disk' | 'hybrid';
  maxSize: number; // in MB
}

export interface OfflineConfiguration {
  enabled: boolean;
  queueRequests: boolean;
  maxQueueSize: number;
  retryStrategy: RetryStrategy;
}

export interface RetryStrategy {
  maxAttempts: number;
  backoffStrategy: 'linear' | 'exponential' | 'fixed';
  initialDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
}
