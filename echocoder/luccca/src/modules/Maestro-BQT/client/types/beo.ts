/**
 * Banquet Event Order (BEO) Data Models
 * Based on template and GIO manifest requirements
 */

export interface BEOHeader {
  account?: string;
  postAs?: string;
  eventName?: string;
  eventDate?: string;
  contact?: string;
  onSite?: string;
  cateringSrc?: string;
  paymentType?: string;
}

export interface BEOEvent {
  date: string;
  time: string;
  room: string;
  function: string;
  setup: string;
  expected: number;
  guaranteed: number;
  rental?: number;
}

export interface BEOMenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: 'appetizer' | 'salad' | 'entree' | 'dessert' | 'carving' | 'station' | 'other';
  course: 1 | 2 | 3 | 4 | 5; // Course number for cart system
  prepTime?: string;
  servingStyle?: string;
  ingredients?: string[];
  allergens?: string[];
  dietary?: string[];
  recipe?: Recipe;
  quantity?: number;
  notes?: string;
}

export interface BEOBeverageItem {
  id: string;
  name: string;
  type: 'beer' | 'wine' | 'spirits' | 'cocktail' | 'non-alcoholic';
  price?: number;
  description?: string;
  vintage?: string;
  origin?: string;
  abv?: number;
}

export interface BEOMenu {
  timeline?: {
    guestSeating?: string;
    serviceStart?: string;
    buffetInstructions?: string;
  };
  items: BEOMenuItem[];
  specialInstructions?: string[];
  carvingStation?: BEOMenuItem[];
}

export interface BEOBeverage {
  room: string;
  barType?: 'Premium' | 'Standard' | 'Wine Only' | 'Beer & Wine';
  consumption?: 'hosted' | 'cash' | 'combination';
  domesticBeer?: BEOBeverageItem[];
  importedBeer?: BEOBeverageItem[];
  wine?: BEOBeverageItem[];
  cocktails?: BEOBeverageItem[];
  nonAlcoholic?: BEOBeverageItem[];
  serviceNotes?: string;
}

export interface BEOSetup {
  room: string;
  layout?: string;
  capacity?: number;
  tables?: {
    type: string;
    count: number;
    seating?: number;
  }[];
  linens?: {
    color: string;
    type: string;
  };
  centerpieces?: string;
  audioVisual?: string[];
  lighting?: string;
  specialRequests?: string[];
}

// Sections for advanced editor (Golden Seed v2.1)
export type BEOPermission = 'EventManager' | 'ExecutiveChef' | 'SeniorExecSous' | 'Chef' | 'Coordinator' | 'Viewer';

export interface MenuCourseItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  linkedRecipeId?: string;
  ingredients?: string[];
  allergens?: string[];
}

export interface MenuCourse {
  id: string;
  name: string;
  description?: string;
  course: 'appetizer' | 'salad' | 'entree' | 'dessert' | 'carving' | 'station' | 'other';
  items: MenuCourseItem[];
  courseCost: number;
}

export interface SectionContentBase {
  [key: string]: any;
}

export interface MenuSectionContent extends SectionContentBase {
  menu: {
    courses: MenuCourse[];
    dietaryRestrictions: string[];
    allergies: string[];
    serviceStyle: 'plated' | 'buffet' | 'family_style' | 'stations';
    totalCost: number;
  };
}

export interface ServiceSectionContent extends SectionContentBase {
  service: {
    staffing: { role: string; count: number; hours: number }[];
    equipmentNeeds: { item: string; quantity: number }[];
  };
}

export interface SetupSectionContent extends SectionContentBase {
  setup: {
    layout: { area: string; setup: string; capacity?: number }[];
    furniture: { type: string; quantity: number }[];
  };
}

export interface BarSectionContent extends SectionContentBase {
  bar: {
    barType: 'Premium' | 'Standard' | 'Wine Only' | 'Beer & Wine';
    serviceNotes?: string;
  };
}

export type BEOSectionType = 'menu' | 'service' | 'setup' | 'bar' | 'custom';

export interface BEOSectionBase<T extends BEOSectionType, C = any> {
  id: string;
  title: string;
  order: number;
  type: T;
  required?: boolean;
  content: C;
  lastModified?: string;
}

export type MenuSection = BEOSectionBase<'menu', MenuSectionContent>;
export type ServiceSection = BEOSectionBase<'service', ServiceSectionContent>;
export type SetupSection = BEOSectionBase<'setup', SetupSectionContent>;
export type BarSection = BEOSectionBase<'bar', BarSectionContent>;
export type CustomSection = BEOSectionBase<'custom', SectionContentBase>;

export type BEOSection = MenuSection | ServiceSection | SetupSection | BarSection | CustomSection;

export interface BEODocument {
  id: string;
  version: number;
  status: 'draft' | 'pending' | 'confirmed' | 'in_prep' | 'execution' | 'closed' | 'pending_approval' | 'approved';
  header: BEOHeader;
  event: BEOEvent;
  // Golden Seed editor fields
  type?: 'BEO' | 'REO';
  eventId?: string;
  title?: string;
  description?: string;
  sections?: BEOSection[];
  approvalRequired?: boolean;
  // Legacy/linked structured sections
  menu: BEOMenu;
  beverage: BEOBeverage;
  setup: BEOSetup;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  approvedAt?: string;
  notes?: string[];
  attachments?: string[];
  pricing?: {
    subtotal: number;
    tax: number;
    serviceCharge: number;
    total: number;
  };
  // High-level scheduling (editor-friendly)
  serviceDate?: string;
  setupTime?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  breakdownTime?: string;
  // Convenience fields used by editor/UI
  guestCount?: number;
  totalCost?: number;
  costPerGuest?: number;
  timeline?: {
    prepDay: string;
    executionDay: string;
    phases: TimelinePhase[];
  };
  staffing?: {
    frontOfHouse: StaffAssignment[];
    backOfHouse: StaffAssignment[];
    totalStaffCount: number;
    laborCost: number;
  };
  cart?: {
    speedRacks: SpeedRack[];
    firingLocations: FiringLocation[];
    cartNumberPrefix: string;
    courseStructure: CourseDefinition[];
  };
  prepSchedule?: {
    dailyPrepCounts: DailyPrepCount[];
    totalPrepDays: number;
    criticalPath: string[]; // Recipe IDs in order of dependency
    staffingRequirements: PrepStaffingRequirement[];
  };
}

export interface StaffAssignment {
  id: string;
  name: string;
  role: string;
  area: 'front_of_house' | 'back_of_house';
  shift: string;
  startTime: string;
  endTime: string;
  tasks: string[];
  skillLevel: 1 | 2 | 3 | 4 | 5;
  certifications?: string[];
}

export interface Recipe {
  id: string;
  name: string;
  yield: number; // Servings this recipe makes
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  complexity: 1 | 2 | 3 | 4 | 5; // 1=simple, 5=very complex
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  equipment: string[];
  skillRequired: 1 | 2 | 3 | 4 | 5; // Minimum skill level needed
  prepDaysAdvance: number; // How many days before event to start prep
  storageRequirements: string[];
  scalingFactor?: number; // Multiplier for scaling recipe up/down
  dependsOn?: string[]; // Other recipe IDs this depends on
  truthStatements?: TruthStatement[]; // Configurable logic rules
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  prepRequired?: string; // e.g., "diced", "blanched", "marinated"
  prepTimeMinutes?: number;
  advancePrepDays?: number; // How many days before this ingredient should be prepped
  critical?: boolean; // If missing, cannot complete recipe
}

export interface RecipeStep {
  id: string;
  order: number;
  instruction: string;
  timeMinutes: number;
  equipment?: string[];
  temperature?: number;
  skillRequired?: 1 | 2 | 3 | 4 | 5;
  canParallelize?: boolean; // Can this step be done by multiple people?
  dependsOnStep?: string; // Must wait for this step ID to complete
}

export interface TruthStatement {
  id: string;
  condition: string; // e.g., "guestCount > 100"
  action: string; // e.g., "requireExtraStaff"
  priority: 1 | 2 | 3; // 1=highest priority
  description: string;
}

export interface CourseDefinition {
  courseNumber: 1 | 2 | 3 | 4 | 5;
  name: string; // e.g., "Appetizer", "Entree", "Dessert"
  description: string;
  typicalServiceTime: string; // e.g., "7:00 PM"
  cartPrefix: string; // e.g., "C1", "C2", etc.
  maxItems: number; // Maximum items per course
  prepLeadTime: number; // Days before event to start prep
}

export interface PrepStaffingRequirement {
  date: string; // YYYY-MM-DD
  course: 1 | 2 | 3 | 4 | 5;
  requiredStaff: {
    role: string;
    skillLevel: 1 | 2 | 3 | 4 | 5;
    count: number;
    hoursNeeded: number;
  }[];
  totalHours: number;
  criticalTasks: string[];
}

export interface DailyPrepCount {
  date: string; // YYYY-MM-DD
  course: 1 | 2 | 3 | 4 | 5;
  items: {
    menuItemId: string;
    recipeId: string;
    targetQuantity: number;
    preparedQuantity: number;
    remainingQuantity: number;
    assignedStaff: string[];
    estimatedTimeMinutes: number;
    actualTimeMinutes?: number;
    status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
    dependencies: string[]; // Other items that must be completed first
  }[];
  totalTimeRequired: number;
  totalTimeUsed: number;
  efficiency: number; // actualTime / estimatedTime
}

export interface SpeedRack {
  id: string;
  rackNumber: string; // Now follows Course-based format: SR-[BEO]-C[1-5]-[A-Z]
  beoNumber: string;
  course: 1 | 2 | 3 | 4 | 5;
  location: string;
  firingLocation?: string;
  items: {
    menuItemId: string;
    recipeId?: string;
    quantity: number;
    prepStatus: 'pending' | 'in_progress' | 'completed';
    prepDate?: string; // When this item should be prepped
    notes?: string;
  }[];
  status: 'staged' | 'prep' | 'ready' | 'service' | 'complete';
  assignedTo?: string[];
  estimatedPrepTime: number; // Total minutes for all items
  actualPrepTime?: number;
}

export interface FiringLocation {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  maxSimultaneousEvents: number;
  assignedEvents: string[];
  coordinates?: { x: number; y: number };
}

export interface TimelinePhase {
  id: string;
  phase: string;
  plannedAt?: string;
  plannedDurationMin?: number;
  actualAt?: string;
  actualDurationMin?: number;
  varianceMin?: number;
  reason?: ReasonCode;
  notes?: string;
  assignedTo?: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  staffAssignments?: StaffAssignment[];
  speedRacks?: string[]; // References to SpeedRack IDs
  firingLocation?: string; // Reference to FiringLocation ID
}

export type ReasonCode =
  | 'kitchen_delay' | 'bar_queue' | 'late_vip' | 'room_flip' | 'vendor_late'
  | 'equipment_issue' | 'weather' | 'floor_congestion' | 'plating_bottleneck'
  | 'speech_overrun' | 'other';

export interface BEOTemplate {
  id: string;
  name: string;
  description?: string;
  category: 'wedding' | 'corporate' | 'social' | 'holiday' | 'custom';
  defaultMenu: Partial<BEOMenu>;
  defaultBeverage: Partial<BEOBeverage>;
  defaultSetup: Partial<BEOSetup>;
  pricingModel?: string;
}

export interface BEOValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completeness: number; // 0-1
}

// Golden Seed v2.1 versioning and parsing types
export interface VersionChange {
  id: string;
  field: string;
  previous?: any;
  current?: any;
  changedAt: string;
  changedBy: string;
}

export interface BEOVersion {
  id: string;
  documentId: string;
  version: number;
  title: string;
  createdAt: string;
  createdBy: string;
  changes: VersionChange[];
  snapshot: BEODocument;
  approved: boolean;
}

export interface BEOParseMessage {
  path?: string;
  message: string;
  suggestion?: string;
  autoFixable?: boolean;
}

export interface BEOParseResult {
  errors: BEOParseMessage[];
  warnings: BEOParseMessage[];
  suggestions: BEOParseMessage[];
}

export interface AutosaveState {
  enabled: boolean;
  interval: number; // seconds
  lastSaved?: string;
  hasUnsavedChanges: boolean;
  saveInProgress: boolean;
  conflicts: { id: string; field: string; theirs: any; yours: any; resolved?: boolean }[];
}

// GIO-specific precision requirements
export const BEO_PRECISION_REQUIREMENTS = {
  TIMING_ACCURACY: 0.00005, // 5e-05 as per manifest
  PORTION_ACCURACY: 0.04, // 4% buffer on guaranteed count
  COST_ACCURACY: 0.001, // $0.01 precision
  PREP_COMPLETION_TARGET: 0.90, // 90% by day before
} as const;

export default BEO_PRECISION_REQUIREMENTS;
