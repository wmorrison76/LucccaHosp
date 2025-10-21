// PMS Integration Framework Types

export interface PMSProvider {
  id: string;
  name: string;
  type: PMSType;
  version: string;
  vendor: string;
  apiEndpoint: string;
  authentication: PMSAuthentication;
  capabilities: PMSCapability[];
  connectionStatus: ConnectionStatus;
  lastSync: Date;
  syncFrequency: number; // in minutes
  errorCount: number;
  configuration: PMSConfiguration;
}

export type PMSType = 
  | 'opera'
  | 'amadeus'
  | 'fidelio'
  | 'cloudbeds'
  | 'rms'
  | 'protel'
  | 'mews'
  | 'innroad'
  | 'maestro'
  | 'sirvoy'
  | 'custom';

export interface PMSAuthentication {
  type: 'oauth2' | 'api-key' | 'basic-auth' | 'token' | 'certificate';
  credentials: Record<string, string>;
  tokenExpiry?: Date;
  refreshToken?: string;
  scopes?: string[];
}

export type PMSCapability = 
  | 'reservation-management'
  | 'guest-profiles'
  | 'room-inventory'
  | 'rate-management'
  | 'billing-folio'
  | 'housekeeping'
  | 'maintenance'
  | 'reporting'
  | 'check-in-out'
  | 'payment-processing'
  | 'loyalty-programs'
  | 'group-bookings'
  | 'event-management'
  | 'channel-management';

export type ConnectionStatus = 
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'syncing'
  | 'pending'
  | 'maintenance';

export interface PMSConfiguration {
  hotelCode: string;
  propertyId: string;
  environment: 'production' | 'staging' | 'sandbox';
  endpoints: PMSEndpointConfig[];
  mappings: FieldMapping[];
  syncSettings: SyncSettings;
  errorHandling: ErrorHandlingConfig;
}

export interface PMSEndpointConfig {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  rateLimit: {
    requestsPerSecond: number;
    burstLimit: number;
  };
  timeout: number; // in milliseconds
  retryPolicy: RetryPolicy;
}

export interface RetryPolicy {
  maxAttempts: number;
  backoffStrategy: 'exponential' | 'linear' | 'fixed';
  initialDelay: number;
  maxDelay: number;
  retryConditions: string[]; // HTTP status codes or error types
}

export interface FieldMapping {
  source: string;
  target: string;
  transformation?: TransformationRule;
  validation?: ValidationRule;
  required: boolean;
}

export interface TransformationRule {
  type: 'format' | 'lookup' | 'calculation' | 'concatenation' | 'split';
  parameters: Record<string, unknown>;
}

export interface ValidationRule {
  type: 'required' | 'format' | 'range' | 'enum' | 'custom';
  parameters: Record<string, unknown>;
  errorMessage: string;
}

export interface SyncSettings {
  batchSize: number;
  syncInterval: number; // in minutes
  conflictResolution: ConflictResolution;
  syncDirection: SyncDirection;
  filters: SyncFilter[];
  triggers: SyncTrigger[];
}

export type ConflictResolution = 
  | 'pms-wins'
  | 'crm-wins'
  | 'latest-wins'
  | 'manual-review'
  | 'merge-fields';

export type SyncDirection = 
  | 'bidirectional'
  | 'pms-to-crm'
  | 'crm-to-pms'
  | 'read-only'
  | 'write-only';

export interface SyncFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater-than' | 'less-than' | 'in' | 'not-in';
  value: unknown;
  active: boolean;
}

export interface SyncTrigger {
  event: PMSEvent;
  action: SyncAction;
  conditions: TriggerCondition[];
  enabled: boolean;
}

export type PMSEvent = 
  | 'reservation-created'
  | 'reservation-modified'
  | 'reservation-cancelled'
  | 'guest-checked-in'
  | 'guest-checked-out'
  | 'room-status-changed'
  | 'rate-updated'
  | 'payment-processed'
  | 'maintenance-request'
  | 'housekeeping-complete';

export type SyncAction = 
  | 'immediate-sync'
  | 'batch-sync'
  | 'notification-only'
  | 'create-task'
  | 'trigger-workflow'
  | 'send-alert';

export interface TriggerCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface ErrorHandlingConfig {
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  retryFailedSyncs: boolean;
  maxRetryAttempts: number;
  escalationRules: EscalationRule[];
  notificationSettings: NotificationSettings;
}

export interface EscalationRule {
  errorType: string;
  threshold: number;
  timeWindow: number; // in minutes
  action: EscalationAction;
}

export type EscalationAction = 
  | 'email-admin'
  | 'create-ticket'
  | 'disable-sync'
  | 'switch-backup'
  | 'trigger-alert';

export interface NotificationSettings {
  email: {
    enabled: boolean;
    recipients: string[];
    errorThreshold: number;
  };
  slack: {
    enabled: boolean;
    webhook: string;
    channels: string[];
  };
  sms: {
    enabled: boolean;
    numbers: string[];
  };
}

// Data Models for PMS Integration
export interface PMSReservation {
  id: string;
  pmsId: string;
  confirmationNumber: string;
  status: ReservationStatus;
  guest: PMSGuest;
  room: PMSRoom;
  dates: {
    arrival: Date;
    departure: Date;
    created: Date;
    modified: Date;
  };
  rates: PMSRate[];
  charges: PMSCharge[];
  payments: PMSPayment[];
  preferences: string[];
  specialRequests: string[];
  source: ReservationSource;
  groupCode?: string;
  companyCode?: string;
  metadata: Record<string, unknown>;
}

export type ReservationStatus = 
  | 'confirmed'
  | 'pending'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled'
  | 'no-show'
  | 'waitlisted';

export interface PMSGuest {
  id: string;
  pmsId: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: PMSAddress;
  dateOfBirth?: Date;
  nationality?: string;
  passportNumber?: string;
  loyaltyProgram?: LoyaltyMembership;
  preferences: GuestPreference[];
  vipStatus?: string;
  creditLimit?: number;
  blacklisted: boolean;
  notes: string[];
}

export interface PMSAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface LoyaltyMembership {
  programName: string;
  membershipNumber: string;
  tier: string;
  points: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface GuestPreference {
  category: string;
  type: string;
  value: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PMSRoom {
  id: string;
  pmsId: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  features: string[];
  floor: number;
  block?: string;
  capacity: {
    adults: number;
    children: number;
    extraBeds: number;
  };
  housekeeping: HousekeepingStatus;
  maintenance: MaintenanceStatus;
}

export interface RoomType {
  id: string;
  code: string;
  name: string;
  description: string;
  baseRate: number;
  maxOccupancy: number;
  bedConfiguration: string;
  amenities: string[];
  size: number; // in square meters
}

export type RoomStatus = 
  | 'available'
  | 'occupied'
  | 'reserved'
  | 'out-of-order'
  | 'maintenance'
  | 'dirty'
  | 'clean'
  | 'inspected';

export interface HousekeepingStatus {
  status: 'clean' | 'dirty' | 'inspected' | 'out-of-order';
  assignedTo?: string;
  lastCleaned?: Date;
  estimatedCompletion?: Date;
  notes: string[];
}

export interface MaintenanceStatus {
  status: 'operational' | 'minor-issue' | 'major-issue' | 'out-of-order';
  issues: MaintenanceIssue[];
  lastInspection?: Date;
  nextInspection?: Date;
}

export interface MaintenanceIssue {
  id: string;
  type: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'reported' | 'assigned' | 'in-progress' | 'completed';
  reportedDate: Date;
  assignedTo?: string;
  estimatedCompletion?: Date;
}

export interface PMSRate {
  id: string;
  code: string;
  name: string;
  amount: number;
  currency: string;
  date: Date;
  roomType: string;
  restrictions: RateRestriction[];
  inclusions: string[];
}

export interface RateRestriction {
  type: 'minimum-stay' | 'maximum-stay' | 'advance-booking' | 'age-limit';
  value: number;
  description: string;
}

export interface PMSCharge {
  id: string;
  type: 'room' | 'tax' | 'service' | 'addon' | 'penalty';
  description: string;
  amount: number;
  currency: string;
  date: Date;
  posted: boolean;
  reversible: boolean;
}

export interface PMSPayment {
  id: string;
  type: 'cash' | 'credit-card' | 'debit-card' | 'bank-transfer' | 'check' | 'voucher';
  amount: number;
  currency: string;
  date: Date;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  cardDetails?: {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

export type ReservationSource = 
  | 'direct'
  | 'booking-com'
  | 'expedia'
  | 'agoda'
  | 'airbnb'
  | 'travel-agent'
  | 'corporate'
  | 'group'
  | 'walk-in'
  | 'phone'
  | 'email'
  | 'other';

// Integration Monitoring and Analytics
export interface PMSIntegrationLog {
  id: string;
  providerId: string;
  timestamp: Date;
  operation: string;
  direction: 'inbound' | 'outbound';
  status: 'success' | 'warning' | 'error';
  recordCount: number;
  processingTime: number; // in milliseconds
  errors: IntegrationError[];
  metadata: Record<string, unknown>;
}

export interface IntegrationError {
  id: string;
  type: 'validation' | 'mapping' | 'network' | 'authentication' | 'business-rule';
  code: string;
  message: string;
  field?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolution?: string;
  occurredAt: Date;
}

export interface PMSIntegrationMetrics {
  providerId: string;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  metrics: {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    averageResponseTime: number;
    dataVolume: number; // in KB
    errorRate: number; // percentage
    uptime: number; // percentage
    peakHourOperations: number;
  };
  operationBreakdown: OperationMetric[];
  errorBreakdown: ErrorMetric[];
}

export interface OperationMetric {
  operation: string;
  count: number;
  successRate: number;
  averageTime: number;
}

export interface ErrorMetric {
  errorType: string;
  count: number;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

// Channel Manager Integration
export interface ChannelManager {
  id: string;
  name: string;
  provider: string;
  connectedChannels: Channel[];
  inventorySync: InventorySync;
  rateSync: RateSync;
  reservationSync: ReservationSync;
  lastSync: Date;
  status: ConnectionStatus;
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  commission: number;
  active: boolean;
  mapping: ChannelMapping;
  restrictions: ChannelRestriction[];
}

export type ChannelType = 
  | 'ota'
  | 'gds'
  | 'meta-search'
  | 'direct'
  | 'corporate'
  | 'wholesale';

export interface ChannelMapping {
  roomTypes: Record<string, string>;
  ratePlans: Record<string, string>;
  policies: Record<string, string>;
}

export interface ChannelRestriction {
  type: 'closed-to-arrival' | 'closed-to-departure' | 'minimum-stay' | 'maximum-stay';
  dates: Date[];
  roomTypes: string[];
}

export interface InventorySync {
  enabled: boolean;
  syncFrequency: number; // in minutes
  roomTypes: string[];
  lastSync: Date;
  conflicts: InventoryConflict[];
}

export interface InventoryConflict {
  date: Date;
  roomType: string;
  pmsInventory: number;
  channelInventory: number;
  resolution: 'manual' | 'pms-wins' | 'channel-wins';
}

export interface RateSync {
  enabled: boolean;
  syncFrequency: number;
  ratePlans: string[];
  markupRules: MarkupRule[];
  lastSync: Date;
}

export interface MarkupRule {
  channelId: string;
  type: 'percentage' | 'fixed-amount';
  value: number;
  currency?: string;
  conditions: RuleCondition[];
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface ReservationSync {
  enabled: boolean;
  autoConfirm: boolean;
  mappingRules: ReservationMappingRule[];
  lastSync: Date;
}

export interface ReservationMappingRule {
  sourceField: string;
  targetField: string;
  transformation?: string;
  defaultValue?: unknown;
}

// Booking Engine Integration
export interface BookingEngine {
  id: string;
  name: string;
  provider: string;
  websiteUrl: string;
  configuration: BookingEngineConfig;
  analytics: BookingAnalytics;
  lastSync: Date;
  status: ConnectionStatus;
}

export interface BookingEngineConfig {
  theme: BookingTheme;
  features: BookingFeature[];
  policies: BookingPolicy[];
  paymentGateways: PaymentGateway[];
  languages: string[];
  currencies: string[];
}

export interface BookingTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl: string;
  customCss?: string;
}

export interface BookingFeature {
  name: string;
  enabled: boolean;
  configuration: Record<string, unknown>;
}

export interface BookingPolicy {
  type: 'cancellation' | 'modification' | 'no-show' | 'deposit';
  name: string;
  description: string;
  rules: PolicyRule[];
}

export interface PolicyRule {
  condition: string;
  penalty: {
    type: 'percentage' | 'fixed' | 'nights';
    value: number;
    currency?: string;
  };
}

export interface PaymentGateway {
  id: string;
  name: string;
  provider: string;
  enabled: boolean;
  currencies: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
  testMode: boolean;
}

export interface BookingAnalytics {
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  metrics: {
    visits: number;
    conversions: number;
    conversionRate: number;
    averageBookingValue: number;
    abandonmentRate: number;
    averageStayLength: number;
  };
  sources: TrafficSource[];
  devices: DeviceBreakdown[];
}

export interface TrafficSource {
  source: string;
  visits: number;
  conversions: number;
  conversionRate: number;
}

export interface DeviceBreakdown {
  device: 'desktop' | 'mobile' | 'tablet';
  visits: number;
  conversions: number;
  conversionRate: number;
}
