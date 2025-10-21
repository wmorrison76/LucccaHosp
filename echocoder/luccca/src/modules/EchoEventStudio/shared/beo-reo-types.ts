// EchoScope BEO/REO Core Data Models
// Based on specification golden_seed: "EchoScope.BEOREO.v2"

// ========== CORE ENTITIES ==========

export interface Account {
  id: string;
  name: string;
  legal_name: string;
  billing_address: Address;
  currency: string;
  tax_regime: string;
  brand_ids: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Contact {
  id: string;
  account_id: string;
  role: 'primary' | 'billing' | 'event_coordinator' | 'decision_maker';
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  marketing_opt_in: boolean;
  account?: Account; // Linked entity
}

export interface Venue {
  id: string;
  name: string;
  address: Address;
  timezone: string;
  spaces: Space[];
  contact_info: ContactInfo;
  amenities: string[];
  parking_capacity?: number;
}

export interface Space {
  id: string;
  venue_id: string;
  name: string;
  type: 'ballroom' | 'boardroom' | 'outdoor' | 'terrace' | 'garden' | 'private_dining';
  capacity_standing: number;
  capacity_seated: number;
  features: SpaceFeatures;
  combos: string[]; // IDs of spaces that can combine
  shareable: boolean;
  turnover_min: number; // Minutes required between events
  venue?: Venue; // Linked entity
}

export interface SpaceFeatures {
  power: boolean;
  rigging: boolean;
  ceiling_height: number;
  natural_light: boolean;
  av_built_in: boolean;
  kitchen_access: boolean;
  loading_dock_access: boolean;
  ada_compliant: boolean;
}

// ========== EVENT MANAGEMENT ==========

export interface Event {
  id: string;
  account_id: string;
  name: string;
  status: 'draft' | 'hold' | 'definite' | 'closed' | 'cancelled';
  start_at: Date;
  end_at: Date;
  timezone: string;
  expected_guests: number;
  manager_id: string;
  notes?: string;
  currency: string;
  weather_plan: WeatherPlan;
  account?: Account; // Linked entity
  functions: Function[];
  line_items: LineItem[];
}

export interface Function {
  id: string;
  event_id: string;
  space_id: string;
  name: string;
  start_at: Date;
  end_at: Date;
  setup: SetupType;
  teardown: number; // Minutes
  headcount: number;
  tags: string[];
  menu_items: LineItem[];
}

export type SetupType = 
  | 'theater' 
  | 'classroom' 
  | 'rounds' 
  | 'reception' 
  | 'boardroom' 
  | 'u_shape' 
  | 'hollow_square'
  | 'cocktail';

// ========== CATALOG SYSTEM ==========

export interface CatalogItem {
  id: string;
  type: 'FB' | 'AV' | 'DECOR' | 'RENTAL' | 'FEE';
  name: string;
  description: string;
  unit: string;
  cost: number; // COGS
  price: number; // Selling price
  tax_code: string;
  gl_code: string;
  modifiers: ItemModifier[];
  allergens: string[];
  prep_lead_hours: number;
  dietary_tags: string[]; // vegan, gluten-free, etc.
  seasonal_availability?: DateRange[];
}

export interface ItemModifier {
  id: string;
  name: string;
  type: 'size' | 'preparation' | 'add_on' | 'substitution';
  price_adjustment: number;
  available: boolean;
}

export interface Package {
  id: string;
  name: string;
  rules: PackageRules;
  lines: PackageLine[];
  min_pax: number;
  max_pax: number;
  upsell: boolean;
  season_pricing?: SeasonalPricing[];
}

export interface PackageRules {
  pricing_type: 'per_person' | 'per_event' | 'tiered';
  minimum_order?: number;
  lead_time_hours: number;
}

export interface PackageLine {
  item_id: string;
  qty_rule: string; // Formula like "1 per 10 guests" or "1 per table"
  price_override?: number;
  required: boolean;
}

export interface SeasonalPricing {
  season: string;
  start_date: Date;
  end_date: Date;
  price_multiplier: number;
}

// ========== BEO/REO SYSTEM ==========

export interface LineItem {
  id: string;
  parent_id: string; // Event or Function ID
  parent_type: 'event' | 'function';
  catalog_item_id?: string;
  package_id?: string;
  calc_rule: CalculationRule;
  qty: number;
  unit: string;
  unit_price: number;
  taxes: TaxLine[];
  service_charges: ServiceCharge[];
  gl_code: string;
  notes?: string;
  catalog_item?: CatalogItem; // Linked entity
  package?: Package; // Linked entity
}

export interface CalculationRule {
  type: 'fixed' | 'per_person' | 'per_table' | 'percentage';
  formula?: string; // For complex calculations
  base_value?: number;
}

export interface BEO {
  id: string;
  event_id: string;
  version: number;
  variant: 'ClientFacing' | 'Kitchen' | 'FOH' | 'Vendor';
  sections: BEOSection[];
  pdf_url?: string;
  generated_at: Date;
  approved_by?: string;
  approval_date?: Date;
  weather_considerations: WeatherConsideration[];
}

export interface BEOSection {
  id: string;
  title: string;
  order: number;
  content: BEOContent[];
  visible_to: string[]; // Role-based visibility
}

export interface BEOContent {
  type: 'text' | 'table' | 'timeline' | 'menu' | 'special_instructions';
  data: any; // Flexible content structure
  formatting?: ContentFormatting;
}

export interface ContentFormatting {
  font_size?: string;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  background_color?: string;
}

// ========== WEATHER INTEGRATION ==========

export interface WeatherPlan {
  id: string;
  event_id: string;
  primary_plan: 'indoor' | 'outdoor' | 'hybrid';
  backup_plans: BackupPlan[];
  weather_triggers: WeatherTrigger[];
  decision_timeline: DecisionPoint[];
  last_forecast_check: Date;
  current_forecast?: WeatherForecast;
}

export interface BackupPlan {
  id: string;
  name: string;
  trigger_conditions: string[];
  space_changes: SpaceChange[];
  menu_modifications: MenuModification[];
  equipment_needs: string[];
  additional_costs: number;
}

export interface WeatherTrigger {
  condition: 'rain' | 'wind' | 'temperature' | 'storms';
  threshold: number;
  unit: string;
  action: 'monitor' | 'prepare_backup' | 'execute_backup';
}

export interface DecisionPoint {
  hours_before_event: number;
  action_required: string;
  responsible_party: string;
  notification_list: string[];
}

export interface WeatherForecast {
  date: Date;
  location: GeoLocation;
  hourly_forecast: HourlyForecast[];
  alerts: WeatherAlert[];
  confidence_score: number;
  last_updated: Date;
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  temperature_feels_like: number;
  humidity: number;
  precipitation_probability: number;
  precipitation_amount: number;
  wind_speed: number;
  wind_direction: number;
  cloud_cover: number;
  conditions: string;
  icon: string;
}

export interface WeatherAlert {
  type: 'watch' | 'warning' | 'advisory';
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  event: string;
  description: string;
  start_time: Date;
  end_time: Date;
  impact_assessment: EventImpact;
}

export interface EventImpact {
  outdoor_events: 'low' | 'medium' | 'high' | 'critical';
  guest_comfort: 'comfortable' | 'manageable' | 'uncomfortable' | 'dangerous';
  equipment_risk: 'none' | 'minimal' | 'moderate' | 'high';
  recommended_actions: string[];
}

export interface WeatherConsideration {
  consideration: string;
  impact_level: 'low' | 'medium' | 'high';
  recommendation: string;
  cost_implication?: number;
}

// ========== FLOORPLAN INTEGRATION ==========

export interface FloorplanLink {
  id: string;
  event_id: string;
  space_id: string;
  prismm_project_id?: string;
  scenario_name: string;
  seats: number;
  layout_type: SetupType;
  notes?: string;
  fire_code_compliant: boolean;
  ada_zones: ADAZone[];
}

export interface ADAZone {
  zone_id: string;
  accessible_seats: number;
  wheelchair_positions: number;
  proximity_to_restrooms: boolean;
  proximity_to_exits: boolean;
}

// ========== FINANCIAL MANAGEMENT ==========

export interface Invoice {
  id: string;
  event_id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  taxes: TaxLine[];
  service_charges: ServiceCharge[];
  payments: Payment[];
  balance_due: number;
  due_dates: PaymentSchedule[];
  terms: string;
  notes?: string;
}

export interface TaxLine {
  tax_code: string;
  description: string;
  rate: number;
  amount: number;
  jurisdiction: string;
}

export interface ServiceCharge {
  type: 'gratuity' | 'admin' | 'delivery' | 'setup';
  description: string;
  rate?: number;
  amount: number;
  taxable: boolean;
}

export interface Payment {
  id: string;
  invoice_id: string;
  method: 'card' | 'ach' | 'check' | 'wire' | 'cash';
  amount: number;
  processor_ref?: string;
  fees: number;
  net: number;
  posted_at: Date;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}

export interface PaymentSchedule {
  due_date: Date;
  amount: number;
  description: string;
  paid: boolean;
  payment_id?: string;
}

// ========== SCHEDULING & LABOR ==========

export interface ScheduleBlock {
  id: string;
  event_id: string;
  role: string;
  employee_name?: string;
  start_at: Date;
  end_at: Date;
  rate: number;
  union_code?: string;
  tip_share_group?: string;
  break_times: BreakPeriod[];
  overtime_rules: OvertimeRule[];
}

export interface BreakPeriod {
  start_minutes: number; // Minutes from shift start
  duration_minutes: number;
  paid: boolean;
  required: boolean;
}

export interface OvertimeRule {
  threshold_hours: number;
  multiplier: number;
  union_required: boolean;
}

// ========== AUDIT & COMPLIANCE ==========

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entity_id: string;
  diff: Record<string, any>;
  at: Date;
  ip_address?: string;
  user_agent?: string;
}

// ========== SUPPORT TYPES ==========

export interface Address {
  street_1: string;
  street_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  coordinates?: GeoLocation;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  emergency_contact?: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface DateRange {
  start_date: Date;
  end_date: Date;
}

export interface SpaceChange {
  from_space_id: string;
  to_space_id: string;
  reason: string;
  capacity_impact: number;
}

export interface MenuModification {
  item_id: string;
  modification_type: 'substitute' | 'remove' | 'add_cover';
  reason: string;
  cost_impact: number;
}

// ========== AI & ML TYPES ==========

export interface AIRecommendation {
  id: string;
  type: 'upsell' | 'cost_saving' | 'operational' | 'weather_related';
  title: string;
  description: string;
  confidence: number;
  potential_value: number;
  implementation_effort: 'low' | 'medium' | 'high';
  deadline?: Date;
}

export interface IngestionResult {
  success: boolean;
  confidence_score: number;
  extracted_items: CatalogItem[];
  extracted_packages: Package[];
  requires_review: boolean;
  review_items: ReviewItem[];
  processing_time_ms: number;
}

export interface ReviewItem {
  item_data: Partial<CatalogItem>;
  confidence: number;
  issues: string[];
  suggested_fixes: string[];
}

// ========== INTEGRATION TYPES ==========

export interface EchoCRMIntegration {
  lead_id?: string;
  opportunity_id?: string;
  account_sync: boolean;
  contact_sync: boolean;
  pipeline_stage: string;
  sync_status: 'pending' | 'synced' | 'error';
  last_sync: Date;
}

export interface PrismmIntegration {
  project_id?: string;
  scenario_maps: Map<string, string>; // Local scenario name -> Prismm scenario ID
  sync_status: 'connected' | 'disconnected' | 'error';
  last_sync: Date;
}

export interface AccountingIntegration {
  provider: 'quickbooks' | 'xero' | 'sage';
  customer_id?: string;
  gl_account_mappings: Map<string, string>;
  tax_code_mappings: Map<string, string>;
  auto_sync_invoices: boolean;
  sync_status: 'active' | 'inactive' | 'error';
}

// ========== SYSTEM CONFIGURATION ==========

export interface SystemConfig {
  default_currency: string;
  default_tax_rate: number;
  default_service_charge_rate: number;
  business_hours: BusinessHours;
  notification_settings: NotificationSettings;
  feature_flags: FeatureFlags;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // HH:MM format
  close: string; // HH:MM format
  closed: boolean;
}

export interface NotificationSettings {
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  weather_alerts: boolean;
  booking_confirmations: boolean;
  payment_reminders: boolean;
}

export interface FeatureFlags {
  weather_integration: boolean;
  ai_menu_ingestion: boolean;
  prismm_integration: boolean;
  echo_crm_sync: boolean;
  accounting_sync: boolean;
  mobile_app: boolean;
}

// ========== EXPORT ALL TYPES ==========
export type BEOREOEntity = 
  | Account 
  | Contact 
  | Venue 
  | Space 
  | Event 
  | Function 
  | CatalogItem 
  | Package 
  | LineItem 
  | BEO 
  | Invoice 
  | Payment 
  | ScheduleBlock 
  | AuditLog
  | WeatherForecast
  | FloorplanLink
  | AIRecommendation;
