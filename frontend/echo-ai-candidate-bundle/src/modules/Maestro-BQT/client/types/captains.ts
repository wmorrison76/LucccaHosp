/**
 * Maestro Banquets - Captain & Sections Type Definitions
 * 
 * Comprehensive type system for captain workflow management including:
 * - Table shapes and floor layout management
 * - Captain section assignments and firing sequences  
 * - Seat mapping with guest details and dietary requirements
 * - Course timing and kitchen call sheet management
 * - Live pacing and performance tracking
 * - Demographic learning and preference patterns
 */

// Base enums for captain workflow
export type TableShape = 'round' | 'square' | 'rectangle' | 'head' | 'king';
export type FloorAddonType = 'dance_floor' | 'photo_booth' | 'dj_booth' | 'stage' | 'bar' | 'buffet_station' | 'other';
export type MealChoice = 'beef' | 'fish' | 'chicken' | 'pork' | 'veg' | 'vegan' | 'kosher' | 'halal' | 'custom';
export type CourseCode = 'amuse' | 'starter' | 'soup' | 'salad' | 'mid' | 'main' | 'cheese' | 'dessert' | 'coffee' | 'custom';
export type ServiceStyle = 'plated' | 'family_style' | 'buffet' | 'cocktail' | 'stations';
export type PacingStatus = 'pending' | 'firing' | 'clearing' | 'picking_up' | 'landed' | 'done';

// Floor layout and capacity management
export interface FloorAddon {
  id: string;
  type: FloorAddonType;
  label: string;
  description?: string;
  x: number;
  y: number;
  width: number;
  length: number;
  capacityImpact: number; // How many seats this addon removes/adds
  flowImpact: 'blocks_aisle' | 'creates_bottleneck' | 'improves_flow' | 'neutral';
  setupTime: number; // Minutes to setup
  teardownTime: number; // Minutes to teardown
  staffRequired: number; // Number of staff needed for operation
  powerRequired: boolean;
  audioRequired: boolean;
}

// Individual seat management with full guest details
export interface Seat {
  seatNo: number; // Clockwise numbering starting from 1
  name?: string;
  email?: string;
  phone?: string;
  allergens: string[]; // ['nuts', 'dairy', 'shellfish', etc.]
  dietaryRestrictions: string[]; // ['vegetarian', 'vegan', 'kosher', 'halal', etc.]
  mealChoice?: MealChoice;
  drinkPreference?: string;
  specialNotes?: string; // "no potato", "double protein", "birthday", etc.
  accessibilityNeeds?: string; // "wheelchair", "hearing_impaired", etc.
  vipStatus?: 'standard' | 'vip' | 'celebrity' | 'vendor';
  relationshipToHost?: string; // "bride_family", "groom_family", "work_colleague", etc.
  ageGroup?: 'child' | 'teen' | 'adult' | 'senior';
  plusOne?: boolean;
  rsvpStatus: 'confirmed' | 'pending' | 'declined' | 'no_response';
  arrivalTime?: string; // ISO timestamp for late arrivals
}

// Enhanced table definition with operational details
export interface CaptainTable {
  id: string;
  number: number; // Physical table number (1-100+)
  label: string; // Display label "Table 12" or "Head Table"
  shape: TableShape;
  seats: Seat[];
  maxCapacity: number; // Physical maximum seats possible
  currentCapacity: number; // Seats currently set up
  captainId?: string;
  section?: string; // Section label ("A", "B", "VIP", etc.)
  x: number; // Position coordinates for layout
  y: number;
  rotation?: number; // Rotation in degrees
  
  // Service flow configuration
  plannedCourseOrder?: CourseCode[];
  firingPriority: number; // 1 = first to fire, higher = later
  specialInstructions?: string;
  
  // Operational status
  setupStatus: 'not_started' | 'in_progress' | 'complete' | 'needs_attention';
  serviceStatus: 'waiting' | 'active' | 'clearing' | 'reset' | 'done';
  
  // Performance tracking
  averageServiceTime?: number; // Historical average in minutes
  lastServiceTime?: number; // Most recent service time
  complexity: 'low' | 'medium' | 'high'; // Based on dietary restrictions, VIPs, etc.
  
  // Layout and logistics
  accessibilityFriendly: boolean;
  proximityToKitchen: number; // Distance/difficulty score 1-10
  proximityToBar: number;
  viewQuality: 'excellent' | 'good' | 'fair' | 'poor';
  noiseLevel: 'quiet' | 'moderate' | 'loud';
}

// Captain profile and assignment management
export interface Captain {
  id: string;
  name: string;
  employeeId?: string;
  level: 'junior' | 'senior' | 'lead' | 'master';
  specialties: string[]; // ['fine_dining', 'high_volume', 'vip_service', etc.]
  tableIds: string[]; // Currently assigned tables
  firingSequence: string[]; // Custom firing order (non-sequential)
  maxTables: number; // Maximum tables this captain can handle
  currentLoad: number; // Current workload percentage
  
  // Performance metrics
  averageServiceTime: number;
  accuracyRating: number; // 0-100 for order accuracy
  guestSatisfactionScore: number; // 0-100 based on feedback
  reliabilityScore: number; // 0-100 for consistency
  
  // Availability and preferences
  shiftPreference: 'morning' | 'afternoon' | 'evening' | 'any';
  availableDates: string[]; // ISO date strings
  unavailableDates: string[]; // ISO date strings
  languagesSpoken: string[];
  certifications: string[]; // ['wine_service', 'allergen_aware', etc.]
  
  // Communication preferences
  preferredDevice: 'ipad' | 'handheld' | 'phone';
  notificationPreferences: {
    kitchenAlerts: boolean;
    guestRequests: boolean;
    managementMessages: boolean;
    urgentOnly: boolean;
  };
}

// Course planning and timing management
export interface CoursePlan {
  code: CourseCode;
  label: string; // "Amuse Bouche", "First Course", etc.
  description?: string;
  targetDurationMin: number; // How long guests should have this course
  serviceWindowMin: number; // How long service should take
  toleranceMin: number; // Acceptable variance (+/-)
  
  // Service requirements
  staffRequired: number;
  kitchenPrepTime: number; // Minutes before service
  platingSLA: number; // Minutes from fire to pickup
  
  // Dependencies
  prerequisiteCourses: CourseCode[];
  canOverlapWith: CourseCode[]; // Courses that can be served simultaneously
  
  // Special handling
  temperatureCritical: boolean;
  allergenRisk: 'low' | 'medium' | 'high';
  complexityLevel: 'simple' | 'moderate' | 'complex';
  
  // Historical data
  averageActualDuration?: number;
  successRate?: number; // Percentage of times served within SLA
}

// Dish metadata for allergen management and kitchen coordination
export interface DishMeta {
  id: string;
  label: string; // "Beef Tenderloin with Truffle Sauce"
  shortName: string; // "Beef" for kitchen calls
  category: 'appetizer' | 'soup' | 'salad' | 'main' | 'side' | 'dessert' | 'beverage';
  
  // Allergen and dietary information
  allergens: string[]; // Derived from recipe ingredients
  ingredients: string[]; // Short list for quick reference
  dietaryFlags: string[]; // 'vegetarian', 'vegan', 'gluten_free', etc.
  
  // Kitchen operational data
  prepTime: number; // Minutes to prepare
  cookTime: number; // Minutes to cook
  plateTime: number; // Minutes to plate
  holdTime: number; // Maximum minutes it can be held hot
  
  // Service information
  temperatureRequirement: 'hot' | 'cold' | 'room_temp' | 'frozen';
  garnishRequired: boolean;
  specialEquipment: string[]; // ['salamander', 'immersion_circulator', etc.]
  skillLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  
  // Substitution options
  substitutions: {
    allergenFree: { [key: string]: string }; // allergen -> substitute dish id
    dietary: { [key: string]: string }; // dietary restriction -> substitute
  };
  
  // Cost and yield
  costPerPortion: number;
  yieldPercentage: number; // How much of raw ingredients become finished dish
  wastagePercentage: number; // Expected waste during prep/service
}

// Kitchen call sheet and fire management
export interface CourseFire {
  id: string;
  tableId: string;
  course: CourseCode;
  captainId: string;
  
  // Order details
  counts: Record<MealChoice, number>; // How many of each choice
  specialRequests: string[]; // "T12 s3 vegan", "T12 s5 no potato"
  allergenAlerts: string[]; // Auto-flagged allergen concerns
  
  // Timing
  firedAt: string; // ISO timestamp when called to kitchen
  estimatedReadyAt?: string; // When kitchen expects to have ready
  actualReadyAt?: string; // When kitchen actually finished
  pickedUpAt?: string; // When captain picked up
  servedAt?: string; // When delivered to table
  
  // Status tracking
  status: 'fired' | 'cooking' | 'ready' | 'picked_up' | 'served' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  // Quality control
  qualityCheck: boolean; // Did expo check before pickup
  temperatureGood: boolean; // Was temperature acceptable
  presentationGood: boolean; // Was plating acceptable
  
  // Performance metrics
  kitchenTime?: number; // Minutes from fire to ready
  serviceTime?: number; // Minutes from ready to served
  totalTime?: number; // Minutes from fire to served
}

// Live pacing and performance tracking
export interface PacingEvent {
  id: string;
  tableId: string;
  course: CourseCode;
  captainId: string;
  status: PacingStatus;
  timestamp: string; // ISO timestamp
  
  // Context
  guestCount: number;
  complexity: 'low' | 'medium' | 'high';
  specialCircumstances?: string; // "birthday", "anniversary", "complaint", etc.
  
  // Performance impact
  efficiencyScore?: number; // 0-100 based on timing vs expectations
  guestSatisfaction?: number; // 0-100 if feedback available
  teamCoordination?: number; // 0-100 for how well team worked together
}

// Demographic learning and preference tracking
export interface DemographicPattern {
  id: string;
  eventType: 'wedding' | 'corporate' | 'birthday' | 'anniversary' | 'holiday' | 'other';
  
  // Demographics
  ageDistribution: { [key: string]: number }; // age_group -> percentage
  genderDistribution: { [key: string]: number }; // gender -> percentage
  dietaryDistribution: { [key: string]: number }; // restriction -> percentage
  
  // Preferences learned
  mealPreferences: { [key: string]: number }; // meal_choice -> popularity percentage
  drinkPreferences: { [key: string]: number }; // drink -> popularity percentage
  servicePreferences: {
    pacingPreference: 'fast' | 'moderate' | 'leisurely';
    interactionLevel: 'minimal' | 'friendly' | 'engaging';
    attentionNeeds: 'low' | 'medium' | 'high';
  };
  
  // Operational insights
  averageConsumption: { [key: string]: number }; // dish -> average portions per person
  wastePatterns: { [key: string]: number }; // dish -> waste percentage
  timingPatterns: {
    arrivalVariance: number; // minutes guests typically arrive late/early
    eatingPace: number; // average minutes per course
    lingering: number; // minutes guests stay after last course
  };
  
  // Learning metadata
  sampleSize: number; // Number of events this pattern is based on
  confidence: number; // 0-100 confidence in this pattern
  lastUpdated: string; // ISO timestamp
  dataQuality: 'low' | 'medium' | 'high';
}

// Section assignment and optimization
export interface Section {
  id: string;
  label: string; // "A", "B", "VIP", "Terrace", etc.
  description?: string;
  captainId?: string;
  tableIds: string[];
  
  // Physical characteristics
  area: number; // Square feet/meters
  capacity: number; // Total guest capacity
  layout: 'open' | 'intimate' | 'linear' | 'clustered';
  
  // Service characteristics
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  requiredSkillLevel: 'junior' | 'senior' | 'lead' | 'master';
  averageServiceTime: number;
  
  // Logistics
  distanceToKitchen: number; // Meters or difficulty score
  distanceToBar: number;
  accessibilityScore: number; // 0-100 for wheelchair access, etc.
  noiseLevel: number; // 0-100 decibel rating
  
  // Equipment and setup
  equipmentNeeded: string[]; // ['serving_cart', 'wine_fridge', etc.]
  setupTime: number; // Minutes to set up section
  teardownTime: number; // Minutes to tear down
  
  // Performance tracking
  guestSatisfactionAvg: number; // 0-100 average satisfaction
  serviceEfficiencyAvg: number; // 0-100 efficiency rating
  errorRate: number; // Percentage of orders with errors
}

// Real-time event coordination
export interface EventCoordination {
  eventId: string;
  currentCourse: CourseCode;
  nextCourse?: CourseCode;
  
  // Overall timing
  serviceStartTime: string; // ISO timestamp
  currentCourseStartTime?: string;
  estimatedEndTime?: string;
  actualEndTime?: string;
  
  // Live status
  tablesActive: number; // Currently being served
  tablesWaiting: number; // Waiting for service
  tablesComplete: number; // Finished current course
  
  // Performance metrics
  overallPace: 'ahead' | 'on_time' | 'behind' | 'significantly_behind';
  varianceMinutes: number; // How far off schedule
  bottlenecks: string[]; // Current operational bottlenecks
  
  // Alerts and issues
  activeAlerts: {
    id: string;
    type: 'allergen' | 'timing' | 'staffing' | 'quality' | 'guest_issue';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    tableId?: string;
    captainId?: string;
    timestamp: string;
  }[];
  
  // Communication log
  communicationLog: {
    id: string;
    from: string; // captain id, kitchen, management, etc.
    to: string[];
    message: string;
    timestamp: string;
    type: 'info' | 'request' | 'alert' | 'confirmation';
    read: boolean;
  }[];
}
