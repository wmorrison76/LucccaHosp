// Database Models for HospitalityCRM System
// These models correspond to the database schema

// =============================================================================
// BASE TYPES
// =============================================================================

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: Record<string, string>;
}

// =============================================================================
// USER MANAGEMENT
// =============================================================================

export interface User extends BaseEntity {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'manager' | 'chef' | 'server' | 'coordinator' | 'user';
  department?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  email_verified: boolean;
  last_login_at?: string;
  password_reset_token?: string;
  password_reset_expires?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface UserVenueAccess {
  id: string;
  user_id: string;
  venue_id: string;
  role: string;
  permissions: string[];
  created_at: string;
}

// =============================================================================
// VENUE MANAGEMENT
// =============================================================================

export interface VenueSettings {
  currency: string;
  timezone: string;
  serviceChargePercent: number;
  taxPercent: number;
  minimumSpend?: number;
  autoApprovalLimit?: number;
  leadTimeMinimum?: number;
  depositPercent?: number;
}

export interface VenueBranding {
  logo?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
}

export interface Venue extends BaseEntity {
  name: string;
  slug: string;
  address: Address;
  contact_info: ContactInfo;
  capacity: number;
  settings: VenueSettings;
  branding: VenueBranding;
  pricing_config: Record<string, any>;
  is_active: boolean;
}

export interface VenueRoom extends BaseEntity {
  venue_id: string;
  name: string;
  capacity: number;
  width_ft?: number;
  depth_ft?: number;
  setup_styles: string[];
  features: string[];
  pricing: {
    baseRate?: number;
    peakMultiplier?: number;
    minimumHours?: number;
    setupFee?: number;
  };
  is_active: boolean;
}

// =============================================================================
// CLIENT MANAGEMENT
// =============================================================================

export interface ClientPreferences {
  communicationMethod: 'email' | 'phone' | 'text';
  menuRestrictions: string[];
  preferredVendors: string[];
  budgetRange?: { min: number; max: number };
  eventTypes: string[];
}

export interface ClientHistory {
  totalEvents: number;
  totalSpent: number;
  averageEventSize: number;
  lastEventDate?: string;
  satisfaction?: number;
  referrals: number;
}

export interface BillingInfo {
  paymentTerms: string;
  creditLimit?: number;
  preferredPaymentMethod: 'check' | 'credit' | 'ach' | 'wire';
  taxExempt: boolean;
  taxId?: string;
}

export interface Client extends BaseEntity {
  venue_id: string;
  type: 'individual' | 'corporate' | 'organization';
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: Address;
  preferences: ClientPreferences;
  history: ClientHistory;
  billing_info: BillingInfo;
  notes?: string;
  tags: string[];
  is_active: boolean;
  created_by?: string;
}

export interface ClientContact {
  id: string;
  client_id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  is_primary: boolean;
  created_at: string;
}

// =============================================================================
// PROJECT MANAGEMENT
// =============================================================================

export interface EventRequirements {
  menuStyle: 'plated' | 'buffet' | 'cocktail' | 'family-style' | 'stations';
  serviceStyle: 'full-service' | 'buffet' | 'cocktail' | 'self-service';
  specialDietary: string[];
  avNeeds: string[];
  decorRequests: string[];
  specialRequests: string[];
  setupNotes: string;
  breakdownNotes: string;
}

export interface Project extends BaseEntity {
  venue_id: string;
  client_id: string;
  room_id?: string;
  name: string;
  description?: string;
  event_date: string;
  event_time?: string;
  end_time?: string;
  guest_count?: number;
  lead_status: 'cold' | 'warm' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  event_status: 'tentative' | 'in-progress' | 'confirmed' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget?: number;
  estimated_revenue?: number;
  requirements: EventRequirements;
  notes?: string;
  tags: string[];
  assigned_to: string[];
  created_by?: string;
}

export interface ProjectTimeline {
  id: string;
  project_id: string;
  status: string;
  description: string;
  created_by?: string;
  created_at: string;
}

export interface ProjectDocument extends BaseEntity {
  project_id: string;
  name: string;
  type: 'contract' | 'beo' | 'reo' | 'invoice' | 'floorplan' | 'menu' | 'proposal' | 'other';
  file_url: string;
  mime_type?: string;
  file_size?: number;
  status: 'pending' | 'processing' | 'processed' | 'approved' | 'rejected';
  parsed_data?: Record<string, any>;
  processing_results?: Record<string, any>;
  uploaded_by?: string;
}

export interface ProjectNote extends BaseEntity {
  project_id: string;
  content: string;
  type: 'general' | 'important' | 'follow-up' | 'internal' | 'client-facing';
  is_private: boolean;
  tags: string[];
  created_by?: string;
}

// =============================================================================
// QUOTE/BEO MANAGEMENT
// =============================================================================

export interface QuotePricing {
  subtotal: number;
  serviceCharge: number;
  serviceChargePercent: number;
  tax: number;
  taxPercent: number;
  gratuity: number;
  gratuityPercent: number;
  adminFee: number;
  discount: number;
  discountPercent: number;
  total: number;
  deposit: number;
  depositPercent: number;
  balance: number;
}

export interface QuoteTerms {
  paymentTerms: string;
  cancellationPolicy: string;
  changePolicy: string;
  setupTime: string;
  breakdownTime: string;
  overtime: string;
  minimumGuarantee: number;
  finalCountDeadline: string;
  specialTerms: string[];
}

export interface QuoteTimeline {
  time: string;
  duration: number; // minutes
  activity: string;
  department: string;
  location: string;
  notes?: string;
  assignedTo: string[];
}

export interface KitchenNotes {
  prepTime: string;
  cookingInstructions: string[];
  platingInstructions: string[];
  allergenAlerts: string[];
  specialEquipment: string[];
  staffingNeeds: number;
  temperatureRequirements: string[];
}

export interface ServiceNotes {
  serviceFlow: string[];
  stationSetup: string[];
  serverInstructions: string[];
  beverageService: string[];
  specialRequests: string[];
  uniformRequirements: string;
  staffingLevels: Array<{
    role: string;
    count: number;
    startTime: string;
    endTime: string;
    specialSkills: string[];
  }>;
}

export interface SetupNotes {
  setupStart: string;
  setupDuration: number;
  breakdownStart: string;
  breakdownDuration: number;
  equipmentList: Array<{
    name: string;
    quantity: number;
    supplier: string;
    deliveryTime: string;
    specialInstructions: string;
  }>;
  roomConfiguration: string;
  decorativeElements: string[];
  lightingRequirements: string[];
  climateRequirements: string;
}

export interface AVRequirements {
  audioSystem: string[];
  videoSystem: string[];
  lightingSystem: string[];
  staging: string[];
  powerRequirements: string[];
  internetRequirements: string;
  techRehearsal: string;
  onSiteTech: boolean;
}

export interface FloorPlan {
  id: string;
  name: string;
  roomLayout: string;
  tableConfiguration: Array<{
    tableNumber: number;
    shape: 'round' | 'rectangular' | 'square' | 'serpentine' | 'crescent';
    seating: number;
    position: { x: number; y: number };
    specialNeeds: string[];
    vipTable: boolean;
  }>;
  totalSeating: number;
  accessibility: string[];
  emergencyExits: string[];
  diagramUrl?: string;
  lastUpdated: string;
}

export interface ExecutionItem {
  id: string;
  time: string;
  task: string;
  assignedTo: string;
  department: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  estimatedDuration: number;
  actualDuration?: number;
  notes?: string;
  completedAt?: string;
  completedBy?: string;
}

export interface Quote extends BaseEntity {
  project_id: string;
  venue_id: string;
  version: number;
  status: 'draft' | 'pending-approval' | 'approved' | 'final' | 'executed';
  title: string;
  description?: string;
  event_date: string;
  guest_count: number;
  setup_style?: string;
  service_style?: string;
  pricing: QuotePricing;
  terms: QuoteTerms;
  timeline: QuoteTimeline[];
  kitchen_notes: KitchenNotes;
  service_notes: ServiceNotes;
  setup_notes: SetupNotes;
  av_requirements: AVRequirements;
  floor_plan: FloorPlan;
  execution_checklist: ExecutionItem[];
  approved_by?: string;
  approved_at?: string;
  created_by?: string;
}

export interface QuoteLine {
  id: string;
  quote_id: string;
  category: 'food' | 'beverage' | 'av' | 'floral' | 'rental' | 'labor' | 'fee';
  name: string;
  description?: string;
  quantity: number;
  unit: 'per_person' | 'each' | 'hour' | 'day' | 'package' | 'dozen';
  unit_price: number;
  total_price: number;
  is_optional: boolean;
  department_code?: string;
  gl_code?: string;
  supplier?: string;
  special_instructions?: string;
  allergens: string[];
  dietary: string[];
  minimum_quantity?: number;
  maximum_quantity?: number;
  sort_order: number;
  created_at: string;
}

export interface QuoteApproval {
  id: string;
  quote_id: string;
  role: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  signature?: string;
  approved_at?: string;
  created_at: string;
}

export interface QuoteRevision {
  id: string;
  quote_id: string;
  version: number;
  changes: Record<string, any>;
  reason?: string;
  previous_total?: number;
  new_total?: number;
  created_by?: string;
  created_at: string;
}

export interface QuoteAttachment {
  id: string;
  quote_id: string;
  name: string;
  type: 'floorplan' | 'menu' | 'timeline' | 'contract' | 'addendum' | 'other';
  file_url: string;
  file_size?: number;
  created_by?: string;
  created_at: string;
}

// =============================================================================
// CATALOG MANAGEMENT
// =============================================================================

export interface CatalogItem extends BaseEntity {
  venue_id: string;
  sku?: string;
  category: 'food' | 'beverage' | 'av' | 'floral' | 'rental' | 'labor' | 'fee';
  name: string;
  description?: string;
  unit_price?: number;
  cost_price?: number;
  unit: 'per_person' | 'each' | 'hour' | 'day' | 'package' | 'dozen';
  dietary: string[];
  allergens: string[];
  department_code?: string;
  gl_code?: string;
  supplier?: string;
  minimum_quantity?: number;
  is_active: boolean;
  tags: string[];
  created_by?: string;
}

// =============================================================================
// INTEGRATION MANAGEMENT
// =============================================================================

export interface Integration extends BaseEntity {
  venue_id: string;
  type: 'crm' | 'pms' | 'diagramming' | 'payment' | 'email' | 'sms';
  provider: string;
  config: Record<string, any>;
  is_active: boolean;
  last_sync_at?: string;
  sync_status: 'idle' | 'syncing' | 'error' | 'completed';
  error_log: Array<{
    timestamp: string;
    error: string;
    details?: any;
  }>;
  created_by?: string;
}

export interface IntegrationSyncLog {
  id: string;
  integration_id: string;
  project_id?: string;
  quote_id?: string;
  operation: string;
  status: 'pending' | 'success' | 'error' | 'timeout';
  external_id?: string;
  request_data?: Record<string, any>;
  response_data?: Record<string, any>;
  error_message?: string;
  duration_ms?: number;
  created_at: string;
}

// =============================================================================
// ECHOSCOPE WEBSITE MANAGEMENT
// =============================================================================

export interface EchoScopeWebsite extends BaseEntity {
  venue_id: string;
  domain: string;
  config: Record<string, any>;
  theme: 'modern' | 'luxury' | 'classic' | 'minimal';
  is_active: boolean;
  published_at?: string;
  created_by?: string;
}

export interface WebsiteLead extends BaseEntity {
  venue_id: string;
  website_id?: string;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  event_date?: string;
  guest_count?: number;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  qualification: {
    score?: number;
    level?: 'hot' | 'warm' | 'cold';
    reasons?: string[];
  };
  assigned_to?: string;
  project_id?: string;
}

export interface WebsiteAnalytics {
  id: string;
  website_id: string;
  date: string;
  visitors: number;
  page_views: number;
  leads: number;
  conversions: number;
  bounce_rate?: number;
  avg_session_duration?: number;
  top_pages: Array<{
    page: string;
    views: number;
    conversions: number;
  }>;
  traffic_sources: Record<string, number>;
  created_at: string;
}

// =============================================================================
// PAYMENT PROCESSING
// =============================================================================

export interface PaymentMethod extends BaseEntity {
  venue_id: string;
  provider: 'stripe' | 'square' | 'paypal' | 'authorize_net';
  config: Record<string, any>;
  is_active: boolean;
  is_default: boolean;
  created_by?: string;
}

export interface Payment extends BaseEntity {
  project_id: string;
  quote_id?: string;
  payment_method_id: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'partial' | 'final' | 'refund';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  external_transaction_id?: string;
  external_payment_id?: string;
  payment_intent_id?: string;
  metadata: Record<string, any>;
  processed_at?: string;
  created_by?: string;
}

// =============================================================================
// SYSTEM MANAGEMENT
// =============================================================================

export interface ActivityLog {
  id: string;
  user_id?: string;
  venue_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  description?: string;
  metadata: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  is_public: boolean;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface KPIMetric {
  id: string;
  venue_id: string;
  date: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  metrics: {
    timeToValue?: number;
    dataQuality?: {
      autoMappedPercent: number;
      priceConfidence: number;
      quantityConfidence: number;
      manualReviewRequired: number;
    };
    opsAccuracy?: {
      roomResetAvoidance: number;
      beoVariance: number;
      onTimeExecution: number;
      qualityScore: number;
    };
    salesVelocity?: {
      leadToSignedDays: number;
      depositConversion: number;
      averageCheck: number;
      proposalAcceptanceRate: number;
    };
    marginLift?: {
      menuMixMargin: number;
      rentalUpsellRate: number;
      addOnRevenue: number;
      profitMargin: number;
    };
    customerSatisfaction?: {
      npsScore: number;
      repeatBookingRate: number;
      referralRate: number;
      complaintRate: number;
    };
  };
  created_at: string;
}

// =============================================================================
// VIEW TYPES (AGGREGATED DATA)
// =============================================================================

export interface ProjectSummary extends Project {
  client_name: string;
  client_email?: string;
  client_company?: string;
  venue_name: string;
  room_name?: string;
  quote_total?: number;
  quote_status?: string;
  quote_version?: number;
}

export interface KPIDashboard {
  venue_id: string;
  venue_name: string;
  total_projects: number;
  won_projects: number;
  upcoming_events: number;
  total_revenue: number;
  avg_event_value: number;
  website_leads: number;
  converted_leads: number;
}

// =============================================================================
// REQUEST/RESPONSE TYPES
// =============================================================================

export interface CreateUserRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
  department?: string;
  phone?: string;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  role?: string;
  department?: string;
  phone?: string;
  avatar_url?: string;
  is_active?: boolean;
}

export interface CreateProjectRequest {
  client_id: string;
  room_id?: string;
  name: string;
  description?: string;
  event_date: string;
  event_time?: string;
  end_time?: string;
  guest_count?: number;
  budget?: number;
  estimated_revenue?: number;
  requirements?: Partial<EventRequirements>;
  tags?: string[];
  assigned_to?: string[];
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  event_date?: string;
  event_time?: string;
  end_time?: string;
  guest_count?: number;
  lead_status?: Project['lead_status'];
  event_status?: Project['event_status'];
  priority?: Project['priority'];
  budget?: number;
  estimated_revenue?: number;
  requirements?: Partial<EventRequirements>;
  notes?: string;
  tags?: string[];
  assigned_to?: string[];
}

export interface CreateQuoteRequest {
  project_id: string;
  title: string;
  description?: string;
  guest_count: number;
  setup_style?: string;
  service_style?: string;
  lines: Omit<QuoteLine, 'id' | 'quote_id' | 'created_at'>[];
  terms?: Partial<QuoteTerms>;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    timing?: {
      requestId: string;
      duration: number;
    };
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

// =============================================================================
// EXPORT ALL TYPES
// =============================================================================

export type {
  // Base types
  BaseEntity,
  Address,
  ContactInfo,

  // Authentication and users
  User,
  UserSession,
  UserVenueAccess,

  // Venues
  Venue,
  VenueRoom,
  VenueSettings,
  VenueBranding,

  // Clients
  Client,
  ClientContact,
  ClientPreferences,
  ClientHistory,
  BillingInfo,

  // Projects
  Project,
  ProjectTimeline,
  ProjectDocument,
  ProjectNote,
  EventRequirements,

  // Quotes/BEOs
  Quote,
  QuoteLine,
  QuoteApproval,
  QuoteRevision,
  QuoteAttachment,
  QuotePricing,
  QuoteTerms,
  QuoteTimeline,
  KitchenNotes,
  ServiceNotes,
  SetupNotes,
  AVRequirements,
  FloorPlan,
  ExecutionItem,

  // Catalog
  CatalogItem,

  // Integrations
  Integration,
  IntegrationSyncLog,

  // EchoScope
  EchoScopeWebsite,
  WebsiteLead,
  WebsiteAnalytics,

  // Payments
  PaymentMethod,
  Payment,

  // System
  ActivityLog,
  SystemSetting,
  KPIMetric,

  // Views
  ProjectSummary,
  KPIDashboard,

  // Request/Response
  CreateUserRequest,
  UpdateUserRequest,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateQuoteRequest,
  APIResponse,
  PaginationParams,
  SearchParams,
};
