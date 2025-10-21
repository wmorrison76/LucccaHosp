/**
 * Maestro Banquets - Chef Launch Board Type Definitions
 * 
 * Comprehensive type system for chef workflow management including:
 * - Echo Event Studio CRM calendar integration
 * - Recipe scaling and buffer management
 * - Purchasing integration with vendor management
 * - Prep scheduling with staff performance tracking
 * - Equipment pull lists and FOH coordination
 * - Order acceptance and delivery scheduling
 */

import { ServiceStyle, CourseCode } from './captains';

// Echo Event Studio CRM Integration
export interface EchoEventStudioEvent {
  id: string;
  crmId: string; // External CRM identifier
  title: string;
  eventType: 'wedding' | 'corporate' | 'birthday' | 'anniversary' | 'holiday' | 'other';
  
  // Basic event details
  date: string; // ISO date
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  timezone: string;
  
  // Guest and service information
  guestCount: number;
  confirmedCount?: number;
  serviceStyle: ServiceStyle;
  courseCount: number;
  
  // Venue details
  venueId?: string;
  venueName: string;
  roomName?: string;
  setupStyle: 'banquet' | 'classroom' | 'theater' | 'cocktail' | 'buffet' | 'custom';
  
  // Client information
  clientId: string;
  clientName: string;
  clientContact: {
    name: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone' | 'text';
  };
  
  // Event coordinator
  coordinatorId?: string;
  coordinatorName?: string;
  
  // Special requirements
  dietaryRestrictions: string[];
  allergenConcerns: string[];
  accessibilityNeeds: string[];
  specialRequests: string[];
  
  // Budget and billing
  budgetTotal?: number;
  budgetFood?: number;
  budgetBeverage?: number;
  budgetService?: number;
  contractStatus: 'draft' | 'pending' | 'signed' | 'cancelled';
  
  // Sync status
  lastSyncFromCRM: string; // ISO timestamp
  crmLastModified: string; // ISO timestamp
  syncStatus: 'synced' | 'pending' | 'error' | 'conflict';
  syncErrors?: string[];
}

// Recipe management and scaling
export interface Recipe {
  id: string;
  name: string;
  description?: string;
  category: 'appetizer' | 'soup' | 'salad' | 'main' | 'side' | 'dessert' | 'sauce' | 'garnish';
  cuisine: string; // 'american', 'french', 'italian', etc.
  
  // Recipe metadata
  baseServings: number; // Number of servings this recipe originally makes
  servingSize: string; // "6 oz", "1 piece", etc.
  totalYield: number; // Total yield in consistent units (grams, liters, etc.)
  yieldUnit: string; // 'g', 'ml', 'pieces', etc.
  
  // Ingredients with scaling information
  ingredients: RecipeIngredient[];
  
  // Preparation steps
  instructions: RecipeStep[];
  
  // Timing and logistics
  prepTime: number; // Minutes
  cookTime: number; // Minutes
  plateTime: number; // Minutes
  totalTime: number; // Minutes
  
  // Equipment and skill requirements
  equipmentRequired: string[];
  skillLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  staffRequired: number;
  
  // Quality and holding
  holdTime: number; // Minutes it can be held before quality degrades
  reheatingInstructions?: string;
  temperatureRequirement: 'hot' | 'cold' | 'room_temp';
  
  // Nutritional and allergen information
  allergens: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
    fiber: number;
  };
  
  // Cost calculation
  costPerServing: number;
  lastCostUpdate: string; // ISO timestamp
  costVariance: number; // Percentage variance from last calculation
  
  // Version control
  version: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModified: string; // ISO timestamp
  approved: boolean;
  approvedBy?: string;
  approvedDate?: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: string; // 'lb', 'oz', 'g', 'ml', 'cup', 'piece', etc.
  
  // Purchasing information
  productId?: string; // Links to purchasing system
  vendor?: string;
  cost: number; // Cost per unit
  
  // Quality specifications
  quality: string; // 'prime', 'choice', 'organic', etc.
  brand?: string;
  specifications?: string; // "1-inch thick", "Grade A", etc.
  
  // Handling instructions
  storageType: 'dry' | 'refrigerated' | 'frozen' | 'ambient';
  shelfLife: number; // Days
  
  // Yield and waste
  yieldPercentage: number; // How much usable product from purchased amount
  wastePercentage: number; // Expected waste during prep
  
  // Substitutions
  substitutes: string[]; // Alternative ingredient names
  allergenInfo: string[];
  
  // Preparation notes
  prepNotes?: string; // "diced", "julienned", "brunoise", etc.
  optional: boolean;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  duration?: number; // Minutes for this step
  temperature?: number; // Celsius
  equipment?: string[];
  skillRequired: 'basic' | 'intermediate' | 'advanced';
  criticalPoint: boolean; // Is this a critical control point for food safety
  notes?: string;
}

// Purchasing and vendor management
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  type: 'requisition' | 'vendor_order';
  
  // Order details
  eventId: string;
  eventName: string;
  deliveryDate: string; // ISO date
  deliveryTime?: string; // Preferred delivery time
  
  // Vendor information (for vendor orders)
  vendorId?: string;
  vendorName?: string;
  vendorContact?: {
    name: string;
    email: string;
    phone: string;
  };
  
  // Order items
  items: PurchaseOrderItem[];
  
  // Totals and pricing
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  
  // Status and workflow
  status: 'draft' | 'pending' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';
  createdBy: string;
  createdAt: string; // ISO timestamp
  sentAt?: string;
  confirmedAt?: string;
  deliveredAt?: string;
  
  // Special instructions
  deliveryInstructions?: string;
  specialRequests?: string;
  
  // Performance tracking
  onTimeDelivery?: boolean;
  qualityRating?: number; // 1-5 stars
  accuracyRating?: number; // 1-5 stars
  issues?: string[];
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  description?: string;
  
  // Quantities
  quantityNeeded: number;
  quantityOrdered: number;
  quantityReceived?: number;
  unit: string;
  
  // Pack size optimization
  packSize: number; // How many units per pack
  packsNeeded: number; // Calculated packs needed
  packsOrdered: number; // Actual packs ordered
  
  // Pricing
  unitCost: number;
  packCost: number;
  totalCost: number;
  
  // Specifications
  quality: string;
  brand?: string;
  specifications?: string;
  
  // Substitution handling
  acceptSubstitutes: boolean;
  substituteProducts?: string[]; // Alternative product IDs
  
  // Receiving information
  receivedAt?: string; // ISO timestamp
  receivedBy?: string;
  qualityAcceptable?: boolean;
  notes?: string;
}

// Vendor management and performance tracking
export interface Vendor {
  id: string;
  name: string;
  type: 'produce' | 'meat' | 'seafood' | 'dairy' | 'dry_goods' | 'specialty' | 'equipment';
  
  // Contact information
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
    mobile?: string;
  };
  
  // Business details
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Service capabilities
  deliveryAreas: string[];
  minimumOrder: number;
  deliveryDays: string[]; // ['monday', 'tuesday', etc.]
  leadTime: number; // Days needed for ordering
  cutoffTime: string; // Time orders must be placed by
  
  // Preferred status and agreements
  preferredVendor: boolean;
  contractPricing: boolean;
  creditTerms: string; // "Net 30", "COD", etc.
  discountStructure?: {
    volumeDiscounts: { minimumAmount: number; discountPercent: number }[];
    earlyPayDiscount?: number;
  };
  
  // Performance metrics
  onTimeDeliveryRate: number; // Percentage
  qualityRating: number; // 1-5 average
  priceCompetitiveness: number; // 1-5 rating vs others
  responsiveness: number; // 1-5 rating for communication
  reliabilityScore: number; // Overall 1-5 rating
  
  // Product catalog
  products: VendorProduct[];
  
  // Relationship management
  accountManager?: string;
  lastContact: string; // ISO timestamp
  notes?: string;
  certifications: string[]; // 'organic', 'kosher', 'halal', etc.
  
  // Status
  active: boolean;
  suspendedReason?: string;
  lastOrderDate?: string;
}

export interface VendorProduct {
  id: string;
  vendorSKU: string;
  name: string;
  description?: string;
  category: string;
  
  // Packaging and sizing
  packSize: number;
  packUnit: string;
  caseSize?: number; // If items come in cases
  
  // Pricing
  unitPrice: number;
  packPrice: number;
  casePrice?: number;
  lastPriceUpdate: string; // ISO timestamp
  
  // Availability
  seasonal: boolean;
  availableMonths?: number[]; // [1,2,3...12] for months available
  leadTime: number; // Days
  minimumOrder: number;
  
  // Quality specifications
  quality: string;
  brand?: string;
  origin?: string;
  shelfLife: number; // Days
  storageRequirements: string;
  
  // Historical data
  lastOrdered?: string; // ISO timestamp
  averageOrderQuantity?: number;
  priceHistory: { date: string; price: number }[];
}

// Prep scheduling and staff management
export interface PrepSchedule {
  id: string;
  eventId: string;
  eventName: string;
  prepDate: string; // ISO date
  shiftType: 'morning' | 'afternoon' | 'evening' | 'overnight';
  
  // Prep assignments
  tasks: PrepTask[];
  
  // Staffing
  staffAssigned: StaffAssignment[];
  staffRequired: number;
  skillLevelRequired: 'basic' | 'intermediate' | 'advanced' | 'expert';
  
  // Timeline
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  totalDuration: number; // Minutes
  
  // Equipment and space
  equipmentNeeded: string[];
  spaceRequired: string[]; // Kitchen areas needed
  cartAssignments: CartAssignment[];
  
  // Progress tracking
  status: 'scheduled' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  progressPercentage: number; // 0-100
  completedTasks: string[]; // Task IDs
  
  // Performance metrics
  estimatedTime: number; // Minutes estimated
  actualTime?: number; // Minutes actually taken
  efficiency: number; // Percentage of estimated vs actual
  qualityScore?: number; // 1-5 rating
  
  // Issues and notes
  issues: PrepIssue[];
  notes?: string;
}

export interface PrepIssue {
  id: string;
  taskId?: string;
  type: 'equipment_failure' | 'ingredient_shortage' | 'staff_absence' | 'timing_delay' | 'quality_issue' | 'safety_concern' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  reportedBy: string; // Staff member ID
  reportedAt: string; // ISO timestamp

  // Impact assessment
  impactOnSchedule: number; // Minutes of delay caused
  impactOnQuality: 'none' | 'minor' | 'moderate' | 'major';
  impactOnCost: number; // Additional cost incurred

  // Resolution
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  resolutionAction?: string;
  resolvedBy?: string;
  resolvedAt?: string; // ISO timestamp

  // Prevention
  preventable: boolean;
  preventionMeasures?: string;
  rootCause?: string;

  // Follow-up
  followUpRequired: boolean;
  followUpDate?: string; // ISO date
  lessonsLearned?: string;
}

export interface PrepTask {
  id: string;
  recipeId: string;
  recipeName: string;
  description: string;
  
  // Quantities and scaling
  baseQuantity: number;
  scaledQuantity: number;
  unit: string;
  guestCount: number;
  bufferPercentage: number; // Default 4%
  
  // Timing
  estimatedTime: number; // Minutes
  actualTime?: number; // Minutes
  startTime?: string; // ISO timestamp when started
  endTime?: string; // ISO timestamp when completed
  
  // Assignment
  assignedTo?: string; // Staff member ID
  skillRequired: 'basic' | 'intermediate' | 'advanced' | 'expert';
  
  // Dependencies
  prerequisiteTasks: string[]; // Task IDs that must complete first
  canParallel: boolean; // Can be done simultaneously with other tasks
  
  // Equipment and space
  equipmentNeeded: string[];
  workstationRequired: string;
  
  // Progress and quality
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  qualityCheck: boolean;
  qualityRating?: number; // 1-5
  
  // Storage and labeling
  cartNumber: string; // Which cart/container for storage
  labelingRequired: boolean;
  storageType: 'refrigerated' | 'frozen' | 'hot_hold' | 'room_temp';
  storageLocation: string;
  
  // Notes and issues
  notes?: string;
  issues?: string[];
  completedBy?: string; // Staff member who completed
}

export interface StaffAssignment {
  staffId: string;
  staffName: string;
  role: 'prep_cook' | 'sous_chef' | 'chef_de_partie' | 'commis' | 'extern';
  skillLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  
  // Schedule
  shiftStart: string; // ISO timestamp
  shiftEnd: string; // ISO timestamp
  breakTimes: { start: string; end: string }[]; // ISO timestamps
  
  // Performance tracking
  efficiency: number; // Percentage of tasks completed on time
  qualityScore: number; // 1-5 average quality rating
  reliability: number; // 1-5 for showing up and working full shifts
  teamwork: number; // 1-5 for working well with others
  
  // Specializations
  specialties: string[]; // 'pastry', 'sauce', 'butchery', etc.
  certifications: string[]; // 'food_safety', 'allergen_aware', etc.
  
  // Availability
  preferredShifts: string[]; // 'morning', 'afternoon', 'evening'
  availableDates: string[]; // ISO dates
  unavailableDates: string[]; // ISO dates
  maxHoursPerWeek: number;
  
  // Equipment familiarity
  equipmentSkills: { equipment: string; proficiency: number }[]; // 1-5 rating
  
  // Performance history
  completedTasks: number; // Total tasks completed
  averageTaskTime: number; // Average minutes per task
  errorRate: number; // Percentage of tasks with quality issues
  improvementTrend: 'improving' | 'stable' | 'declining';
}

export interface CartAssignment {
  cartId: string;
  cartLabel: string; // "A1", "B2", "VIP Cart", etc.
  eventId: string;
  eventName: string;
  
  // Contents
  items: CartItem[];
  
  // Status and location
  status: 'loading' | 'ready' | 'in_transit' | 'delivered' | 'empty';
  currentLocation: string;
  destinationLocation: string;
  
  // Timing
  loadingStarted?: string; // ISO timestamp
  loadingCompleted?: string; // ISO timestamp
  departureTime?: string; // ISO timestamp
  arrivalTime?: string; // ISO timestamp
  
  // Handling requirements
  temperatureControlled: boolean;
  handlingInstructions: string;
  fragile: boolean;
  
  // Tracking
  assignedTo?: string; // Staff member responsible
  checkedBy?: string; // Who verified contents
  deliveredBy?: string; // Who delivered
  
  // Cross-contamination prevention
  allergenFree: boolean;
  allergensConcern: string[]; // If any allergens present
  separationRequired: boolean; // Keep separate from other carts
}

export interface CartItem {
  taskId: string;
  recipeName: string;
  description: string;
  quantity: number;
  unit: string;
  
  // Storage requirements
  storageType: 'refrigerated' | 'frozen' | 'hot_hold' | 'room_temp';
  containerType: string; // 'hotel_pan', 'cambro', 'lexan', etc.
  
  // Labeling
  labelInfo: {
    beoNumber: string;
    eventName: string;
    recipeName: string;
    quantity: string;
    prepDate: string;
    useBy: string;
    allergens: string[];
    specialInstructions?: string;
  };
  
  // Quality control
  qualityChecked: boolean;
  qualityApproved: boolean;
  qualityNotes?: string;
  
  // Safety information
  haccp: boolean; // Requires HACCP tracking
  temperatureLogged: boolean;
  currentTemp?: number; // Celsius
}

// Equipment and FOH coordination
export interface EquipmentPullList {
  id: string;
  eventId: string;
  eventName: string;
  generatedFor: 'kitchen' | 'foh' | 'service' | 'bar' | 'av';
  
  // Event context
  guestCount: number;
  serviceStyle: ServiceStyle;
  courseCount: number;
  
  // Equipment items
  items: EquipmentItem[];
  
  // Logistics
  pullDate: string; // ISO date
  setupDate: string; // ISO date
  returnDate: string; // ISO date
  
  // Assignments
  pulledBy?: string; // Staff member who pulled items
  checkedBy?: string; // Who verified the list
  setupBy?: string; // Who set up equipment
  returnedBy?: string; // Who returned equipment
  
  // Status tracking
  status: 'pending' | 'pulled' | 'setup' | 'in_use' | 'returned' | 'cleaning';
  itemsAvailable: number; // How many items are available
  itemsShort: number; // How many items are short
  shortageItems: string[]; // Item IDs that are short
  
  // Quality and condition
  conditionCheck: boolean;
  damageReported: string[]; // Item IDs with damage
  cleaningRequired: string[]; // Item IDs needing cleaning
  
  // Notes and special instructions
  setupInstructions: string;
  specialRequirements: string;
  notes?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  category: 'service_ware' | 'cooking' | 'preparation' | 'storage' | 'transport' | 'presentation';
  
  // Quantities
  quantityNeeded: number;
  quantityAvailable: number;
  quantityAllocated: number;
  unit: string; // 'pieces', 'sets', 'each', etc.
  
  // Specifications
  size?: string; // "10-inch", "2-gallon", etc.
  material?: string; // "stainless_steel", "ceramic", "glass", etc.
  color?: string;
  style?: string;
  
  // Condition and maintenance
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  lastCleaned?: string; // ISO timestamp
  lastInspected?: string; // ISO timestamp
  maintenanceRequired: boolean;
  
  // Availability
  available: boolean;
  reservedFor?: string; // Event ID if reserved
  location: string; // Where it's stored
  
  // Cost and replacement
  replacementCost: number;
  supplier?: string;
  warrantyExpiry?: string; // ISO date
  
  // Usage tracking
  usageCount: number; // How many times used
  lastUsed?: string; // ISO date
  popularityScore: number; // 1-5 based on usage frequency
  
  // Special handling
  fragile: boolean;
  specialCareInstructions?: string;
  setupInstructions?: string;
  
  // Alternative options
  alternatives: string[]; // Alternative equipment item IDs
  substitutable: boolean;
}

// Order acceptance and delivery coordination
export interface DeliverySchedule {
  id: string;
  purchaseOrderId: string;
  vendorId: string;
  vendorName: string;
  
  // Delivery details
  deliveryDate: string; // ISO date
  deliveryWindow: {
    start: string; // ISO timestamp
    end: string; // ISO timestamp
  };
  actualDeliveryTime?: string; // ISO timestamp
  
  // Receiving information
  receivingLocation: string;
  receivingDock: string;
  specialInstructions: string;
  
  // Staff coordination
  receivingStaff: string[]; // Staff member IDs assigned to receive
  backupStaff: string[]; // Backup staff if primary unavailable
  
  // Status tracking
  status: 'scheduled' | 'confirmed' | 'en_route' | 'delivered' | 'rejected' | 'rescheduled';
  confirmationNumber?: string;
  trackingNumber?: string;
  
  // Quality control
  inspectionRequired: boolean;
  temperatureCheck: boolean;
  qualityApproved?: boolean;
  rejectionReason?: string;
  
  // Performance metrics
  onTime: boolean;
  accurate: boolean; // All items correct
  qualityMet: boolean;
  overallRating?: number; // 1-5 stars
  
  // Issues and resolution
  issues: DeliveryIssue[];
  resolutionNotes?: string;
  
  // Documentation
  receipts: string[]; // URLs to receipt images/PDFs
  photos: string[]; // URLs to delivery photos
  signatures: string[]; // URLs to signature images
}

export interface DeliveryIssue {
  id: string;
  type: 'late_delivery' | 'wrong_items' | 'damaged_items' | 'quality_issue' | 'quantity_short' | 'temperature_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedItems: string[]; // Item IDs
  discoveredAt: string; // ISO timestamp
  discoveredBy: string; // Staff member ID
  
  // Resolution
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  resolutionAction?: string;
  resolvedAt?: string; // ISO timestamp
  resolvedBy?: string; // Staff member ID
  
  // Impact
  impactOnService: 'none' | 'minor' | 'moderate' | 'major' | 'critical';
  alternativesUsed: string[]; // Alternative products/vendors used
  costImpact?: number; // Additional cost incurred
  
  // Follow-up
  preventionMeasures: string;
  vendorFeedback: string;
  creditIssued?: number;
}

// Performance analytics and improvement tracking
export interface ChefPerformanceMetrics {
  chefId: string;
  period: {
    start: string; // ISO date
    end: string; // ISO date
  };
  
  // Order accuracy and efficiency
  orderAccuracy: number; // Percentage of orders fulfilled correctly
  timingAccuracy: number; // Percentage of orders ready on time
  costEfficiency: number; // Actual cost vs budgeted cost percentage
  wasteReduction: number; // Percentage improvement in waste reduction
  
  // Vendor management
  vendorRelationshipScore: number; // 1-5 rating
  negotiationSuccess: number; // Percentage of successful price negotiations
  onTimeDeliveryRate: number; // Percentage of on-time deliveries managed
  qualityConsistency: number; // 1-5 rating for consistent quality
  
  // Staff management
  staffEfficiency: number; // Percentage of prep tasks completed on time
  staffSatisfaction: number; // 1-5 rating from staff feedback
  trainingEffectiveness: number; // Improvement in staff performance
  staffRetention: number; // Percentage of staff retained
  
  // Innovation and improvement
  menuDevelopment: number; // Number of new recipes/dishes developed
  processImprovements: number; // Number of workflow improvements implemented
  costSavingInitiatives: number; // Dollar amount saved through initiatives
  sustainabilityScore: number; // 1-5 rating for sustainable practices
  
  // Guest satisfaction impact
  foodQualityRating: number; // 1-5 average from guest feedback
  serviceTimingRating: number; // 1-5 average for timing satisfaction
  specialDietaryHandling: number; // 1-5 rating for handling special diets
  overallGuestExperience: number; // 1-5 overall rating
}
