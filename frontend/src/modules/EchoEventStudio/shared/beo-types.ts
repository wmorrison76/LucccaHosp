// Core BEO/REO System Types

export type UUID = string;

// Pipeline Status Types
export type LeadStatus = 'cold' | 'warm' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type EventStatus = 'tentative' | 'in-progress' | 'confirmed' | 'completed' | 'cancelled';
export type BeoStatus = 'draft' | 'pending-approval' | 'approved' | 'final' | 'executed';

// Item Categories
export type ItemCategory = 'food' | 'beverage' | 'av' | 'floral' | 'rental' | 'labor' | 'fee';
export type Unit = 'per_person' | 'each' | 'hour' | 'day' | 'package';

// Document Processing Interfaces
export interface ParseMenuDocumentFn {
  (args: { venueId: string; fileUrl: string; mime: string }): Promise<{
    items: Array<{
      category: ItemCategory;
      name: string;
      desc?: string;
      price?: number;
      unit?: Unit;
      dietary?: string[];
      minGuests?: number;
    }>;
    notes?: string[];
  }>;
}

export interface AutoBuildBeoFn {
  (args: { 
    venueId: string; 
    project: Project; 
    items: ReturnType<ParseMenuDocumentFn>["items"] 
  }): Promise<{
    beoId: UUID;
    lines: QuoteLine[];
    views: {
      clientPdfUrl: string;
      kitchenPdfUrl: string;
      opsPdfUrl: string;
    };
  }>;
}

// External System Integration
export interface SyncCrmFn {
  (args: { 
    venueId: string; 
    project: Project; 
    system: "salesforce" | "hubspot" | "pipedrive"; 
  }): Promise<{ ok: boolean; externalId?: string }>;
}

export interface SyncDiagramFn {
  (args: { 
    venueId: string; 
    projectId: UUID; 
    provider: "cvent" | "prismm" | "socialtables" 
  }): Promise<{ url: string; diagramId?: string }>;
}

export interface RulesEvaluateFn {
  (args: { 
    venueId: string; 
    project: Project; 
    draft: Quote 
  }): Promise<Quote>;
}

// Core Data Models
export interface Venue {
  id: UUID;
  name: string;
  address: string;
  capacity: number;
  rooms: VenueRoom[];
  amenities: string[];
  pricing: VenuePricing;
  contacts: VenueContact[];
  settings: VenueSettings;
}

export interface VenueRoom {
  id: UUID;
  name: string;
  capacity: number;
  setupStyles: SetupStyle[];
  features: string[];
  pricing: RoomPricing;
}

export interface SetupStyle {
  name: string;
  capacity: number;
  description: string;
  imageUrl?: string;
}

export interface VenuePricing {
  minimumSpend: number;
  serviceChargePercent: number;
  taxPercent: number;
  gratuityPercent: number;
  adminFee: number;
}

export interface RoomPricing {
  baseRate: number;
  peakMultiplier: number;
  minimumHours: number;
  setupFee: number;
}

export interface VenueContact {
  id: UUID;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface VenueSettings {
  autoApprovalLimit: number;
  leadTimeMinimum: number;
  cancellationPolicy: string;
  depositPercent: number;
  finalPaymentDays: number;
}

// Project/Event Models
export interface Project {
  id: UUID;
  venueId: string;
  clientId: UUID;
  name: string;
  description: string;
  eventDate: string;
  eventTime: string;
  endTime: string;
  guestCount: number;
  leadStatus: LeadStatus;
  eventStatus: EventStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  estimatedRevenue: number;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
  timeline: ProjectTimeline[];
  requirements: EventRequirements;
  contacts: ProjectContact[];
  documents: ProjectDocument[];
  notes: ProjectNote[];
  tags: string[];
}

export interface ProjectTimeline {
  id: UUID;
  date: string;
  status: LeadStatus | EventStatus;
  description: string;
  userId: string;
  createdAt: string;
}

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

export interface ProjectContact {
  id: UUID;
  type: 'primary' | 'billing' | 'decision-maker' | 'day-of-contact';
  name: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
  relationship: string;
}

export interface ProjectDocument {
  id: UUID;
  name: string;
  type: 'contract' | 'beo' | 'reo' | 'invoice' | 'floorplan' | 'menu' | 'proposal' | 'other';
  url: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'processed' | 'approved' | 'rejected';
  parsedData?: any;
}

export interface ProjectNote {
  id: UUID;
  content: string;
  type: 'general' | 'important' | 'follow-up' | 'internal' | 'client-facing';
  createdBy: string;
  createdAt: string;
  tags: string[];
  isPrivate: boolean;
}

// Client Models
export interface Client {
  id: UUID;
  type: 'individual' | 'corporate' | 'organization';
  name: string;
  company?: string;
  email: string;
  phone: string;
  address: Address;
  contacts: ClientContact[];
  preferences: ClientPreferences;
  history: ClientHistory;
  billing: BillingInfo;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ClientContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface ClientPreferences {
  communicationMethod: 'email' | 'phone' | 'text';
  menuRestrictions: string[];
  preferredVendors: string[];
  budgetRange: { min: number; max: number };
  eventTypes: string[];
  seasonalPreferences: string[];
}

export interface ClientHistory {
  totalEvents: number;
  totalSpent: number;
  averageEventSize: number;
  lastEventDate?: string;
  satisfaction: number; // 1-5 rating
  referrals: number;
  notes: string[];
}

export interface BillingInfo {
  paymentTerms: string;
  creditLimit: number;
  preferredPaymentMethod: 'check' | 'credit' | 'ach' | 'wire';
  billingContact: ClientContact;
  taxExempt: boolean;
  taxId?: string;
}

// Quote/BEO Models
export interface Quote {
  id: UUID;
  projectId: UUID;
  venueId: string;
  version: number;
  status: BeoStatus;
  title: string;
  description: string;
  eventDate: string;
  guestCount: number;
  setupStyle: string;
  serviceStyle: string;
  timeline: QuoteTimeline[];
  lines: QuoteLine[];
  pricing: QuotePricing;
  terms: QuoteTerms;
  approvals: QuoteApproval[];
  revisions: QuoteRevision[];
  attachments: QuoteAttachment[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
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

export interface QuoteLine {
  id: UUID;
  category: ItemCategory;
  name: string;
  description: string;
  quantity: number;
  unit: Unit;
  unitPrice: number;
  totalPrice: number;
  isOptional: boolean;
  departmentCode: string;
  glCode?: string;
  supplier?: string;
  specialInstructions?: string;
  allergens: string[];
  dietary: string[];
  minimumQuantity?: number;
  maximumQuantity?: number;
}

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

export interface QuoteApproval {
  id: UUID;
  role: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  approvedAt?: string;
  signature?: string;
}

export interface QuoteRevision {
  id: UUID;
  version: number;
  changes: string[];
  changedBy: string;
  changedAt: string;
  reason: string;
  previousTotal: number;
  newTotal: number;
}

export interface QuoteAttachment {
  id: UUID;
  name: string;
  type: 'floorplan' | 'menu' | 'timeline' | 'contract' | 'addendum' | 'other';
  url: string;
  createdAt: string;
}

// BEO Specific Models
export interface BEO extends Quote {
  beoNumber: string;
  kitchenNotes: KitchenNotes;
  serviceNotes: ServiceNotes;
  setupNotes: SetupNotes;
  avRequirements: AVRequirements;
  floorPlan: FloorPlan;
  executionChecklist: ExecutionItem[];
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
  staffingLevels: StaffingLevel[];
}

export interface StaffingLevel {
  role: string;
  count: number;
  startTime: string;
  endTime: string;
  specialSkills: string[];
}

export interface SetupNotes {
  setupStart: string;
  setupDuration: number;
  breakdownStart: string;
  breakdownDuration: number;
  equipmentList: EquipmentItem[];
  roomConfiguration: string;
  decorativeElements: string[];
  lightingRequirements: string[];
  climateRequirements: string;
}

export interface EquipmentItem {
  name: string;
  quantity: number;
  supplier: string;
  deliveryTime: string;
  specialInstructions: string;
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
  id: UUID;
  name: string;
  roomLayout: string;
  tableConfiguration: TableConfiguration[];
  totalSeating: number;
  accessibility: string[];
  emergencyExits: string[];
  diagramUrl?: string;
  lastUpdated: string;
}

export interface TableConfiguration {
  tableNumber: number;
  shape: 'round' | 'rectangular' | 'square' | 'serpentine' | 'crescent';
  seating: number;
  position: { x: number; y: number };
  specialNeeds: string[];
  vipTable: boolean;
}

export interface ExecutionItem {
  id: UUID;
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

// Integration Registry
export type Connector = Partial<{
  parseMenuDocument: ParseMenuDocumentFn;
  autoBuildBeo: AutoBuildBeoFn;
  syncCrm: SyncCrmFn;
  syncDiagram: SyncDiagramFn;
  rulesEvaluate: RulesEvaluateFn;
}>;

// Events for System Integration
export type EventName =
  | "PROJECT_CREATED"
  | "LAYOUT_PLANNED"
  | "DECOR_APPLIED"
  | "QUOTE_UPDATED"
  | "VALIDATION_RESULT"
  | "DOC_PARSED"
  | "BEO_BUILT"
  | "CRM_SYNCED"
  | "DIAGRAM_READY"
  | "LEAD_CONVERTED"
  | "EVENT_CONFIRMED"
  | "BEO_APPROVED"
  | "EXECUTION_STARTED"
  | "EXECUTION_COMPLETED";

// Pipeline Management
export interface Pipeline {
  id: UUID;
  venueId: string;
  name: string;
  stages: PipelineStage[];
  automations: PipelineAutomation[];
  kpis: PipelineKPI[];
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: UUID;
  name: string;
  order: number;
  type: LeadStatus;
  requirements: string[];
  automations: string[];
  averageDuration: number; // days
  conversionRate: number; // percentage
}

export interface PipelineAutomation {
  id: UUID;
  trigger: EventName;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  isActive: boolean;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface AutomationAction {
  type: 'send_email' | 'create_task' | 'update_field' | 'notify_user' | 'sync_crm';
  parameters: Record<string, any>;
}

export interface PipelineKPI {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

// KPI Tracking Models
export interface KPIMetrics {
  venueId: string;
  period: string;
  timeToValue: number; // minutes from upload to draft BEO
  dataQuality: DataQuality;
  opsAccuracy: OpsAccuracy;
  salesVelocity: SalesVelocity;
  marginLift: MarginLift;
  customerSatisfaction: CustomerSatisfaction;
}

export interface DataQuality {
  autoMappedPercent: number;
  priceConfidence: number;
  quantityConfidence: number;
  manualReviewRequired: number;
}

export interface OpsAccuracy {
  roomResetAvoidance: number;
  beoVariance: number;
  onTimeExecution: number;
  qualityScore: number;
}

export interface SalesVelocity {
  leadToSignedDays: number;
  depositConversion: number;
  averageCheck: number;
  proposalAcceptanceRate: number;
}

export interface MarginLift {
  menuMixMargin: number;
  rentalUpsellRate: number;
  addOnRevenue: number;
  profitMargin: number;
}

export interface CustomerSatisfaction {
  npsScore: number;
  repeatBookingRate: number;
  referralRate: number;
  complaintRate: number;
}

// EchoScope Integration
export interface EchoScopeConnection {
  venueId: string;
  websiteUrl: string;
  apiKey: string;
  isActive: boolean;
  leadFormConfig: LeadFormConfig;
  pricingConfig: PricingConfig;
  autoNotifications: EchoScopeNotification[];
}

export interface LeadFormConfig {
  requiredFields: string[];
  optionalFields: string[];
  autoQualification: boolean;
  leadRouting: LeadRouting;
}

export interface LeadRouting {
  defaultAssignee: string;
  routingRules: RoutingRule[];
}

export interface RoutingRule {
  condition: string;
  assignTo: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PricingConfig {
  showPricing: boolean;
  pricingLevel: 'basic' | 'detailed' | 'custom';
  minimumBudget: number;
  allowCustomQuotes: boolean;
}

export interface EchoScopeNotification {
  trigger: 'new_lead' | 'quote_request' | 'contact_form';
  recipients: string[];
  template: string;
  delay: number; // minutes
}

// API Response Types
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

export interface BulkOperationResult {
  processed: number;
  successful: number;
  failed: number;
  errors: Array<{
    id: string;
    error: string;
  }>;
}

// Search and Filter Types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface ProjectFilters {
  status?: LeadStatus[];
  eventStatus?: EventStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  venueId?: string;
  assignedTo?: string[];
  priority?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  guestCountRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}

// Permissions and Access Control
export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'execute';
  conditions?: Record<string, any>;
}

export interface Role {
  id: UUID;
  name: string;
  description: string;
  permissions: Permission[];
  venueAccess: string[]; // venue IDs
  isSystemRole: boolean;
}

export interface UserPermissions {
  userId: string;
  roles: Role[];
  explicitPermissions: Permission[];
  venueAccess: string[];
}
