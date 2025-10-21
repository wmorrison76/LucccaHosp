/**
 * Chef Kitchen Types - Maestro Banquets
 * Production management, recipe scaling, and kitchen operations
 */

export interface KitchenEvent {
  id: string;
  beoId: string;
  eventName: string;
  eventDate: string;
  guestCount: number;
  venue: string;
  chefResponsible: string;
  mealService: 'breakfast' | 'lunch' | 'dinner' | 'brunch' | 'reception' | 'cocktail';
  prepStartTime: string;
  serviceStartTime: string;
  serviceEndTime: string;
  status: 'prep' | 'cooking' | 'plating' | 'service' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dietaryRestrictions: DietaryRestriction[];
  allergens: Allergen[];
  menuItems: KitchenMenuItem[];
}

export interface DietaryRestriction {
  id: string;
  type: 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free' | 'keto' | 'halal' | 'kosher';
  guestCount: number;
  notes?: string;
  color: string; // Color code for visual identification
  icon: string; // Icon identifier
}

export interface Allergen {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'anaphylaxis';
  guestCount: number;
  notes: string;
  color: string;
  requiresSeparatePrep: boolean;
}

export interface KitchenMenuItem {
  id: string;
  name: string;
  category: 'appetizer' | 'salad' | 'entree' | 'side' | 'dessert' | 'beverage';
  recipe: Recipe;
  quantity: number;
  scaledIngredients: ScaledIngredient[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  station: KitchenStation;
  chefAssigned?: string;
  status: 'not_started' | 'prep' | 'cooking' | 'plating' | 'completed';
  specialInstructions?: string;
}

export interface Recipe {
  id: string;
  name: string;
  baseYield: number; // base serving size
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeStep[];
  costPerServing: number;
  nutritionalInfo?: NutritionalInfo;
  allergenInfo: string[];
  dietaryTags: string[];
  equipment: string[];
  techniques: string[];
  qualityStandards: string[];
  platingInstructions: string;
  holdingInstructions?: string;
  reheatingInstructions?: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  costPerUnit: number;
  supplier?: string;
  substitutions?: string[];
  preparationNotes?: string;
  criticalIngredient: boolean; // Cannot be substituted
}

export interface ScaledIngredient extends RecipeIngredient {
  scaledAmount: number;
  scaledCost: number;
  availableInventory: number;
  needsToPurchase: number;
  purchaseUrgency: 'normal' | 'urgent' | 'critical';
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  instruction: string;
  timeMinutes: number;
  temperature?: number;
  equipment: string[];
  qualityCheck: string;
  photos?: string[];
  videoUrl?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  sugar: number;
}

export interface KitchenStation {
  id: string;
  name: string;
  type: 'prep' | 'grill' | 'saute' | 'cold' | 'pastry' | 'garde_manger' | 'hot_line' | 'pantry' | 'saucier' | 'custom';
  capacity: number; // max items that can be prepared simultaneously
  equipment: string[];
  currentLoad: number;
  chefAssigned?: string;
  assistantsAssigned?: string[];
}

export interface ProductionList {
  id: string;
  date: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'overnight';
  venue: string;
  chefResponsible: string;
  events: KitchenEvent[];
  totalGuestCount: number;
  items: ProductionItem[];
  generatedAt: string;
  status: 'draft' | 'approved' | 'in_progress' | 'completed';
  notes?: string;
}

export interface ProductionItem {
  id: string;
  menuItemName: string;
  recipe: Recipe;
  totalQuantity: number;
  batchSize: number;
  numberOfBatches: number;
  ingredients: ScaledIngredient[];
  totalPrepTime: number;
  totalCookTime: number;
  station: KitchenStation;
  startTime: string;
  targetCompletionTime: string;
  actualCompletionTime?: string;
  qualityNotes?: string;
  variance?: string; // Any deviations from standard recipe
}

export interface PullList {
  id: string;
  date: string;
  venue: string;
  shift: string;
  generatedAt: string;
  ingredients: PullListItem[];
  totalCost: number;
  status: 'pending' | 'pulled' | 'verified' | 'issued';
  pulledBy?: string;
  verifiedBy?: string;
  issuedBy?: string;
}

export interface PullListItem {
  ingredientId: string;
  name: string;
  totalAmount: number;
  unit: string;
  storageLocation: string;
  currentInventory: number;
  costPerUnit: number;
  totalCost: number;
  supplier: string;
  expirationDates: string[];
  lotNumbers: string[];
  pulled: boolean;
  pulledAmount?: number;
  pulledAt?: string;
  notes?: string;
}

export interface RunSheet {
  id: string;
  eventId: string;
  beoId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  timeline: RunSheetItem[];
  staffAssignments: StaffAssignment[];
  equipmentNeeds: EquipmentNeed[];
  keyContacts: KeyContact[];
  emergencyContacts: KeyContact[];
  specialInstructions: string[];
  revisionNumber: number;
  generatedAt: string;
  approvedBy?: string;
  distributedTo: string[];
}

export interface RunSheetItem {
  id: string;
  time: string;
  duration: number; // minutes
  activity: string;
  department: 'kitchen' | 'service' | 'bar' | 'management' | 'client' | 'entertainment';
  responsible: string[];
  location: string;
  equipment?: string[];
  notes?: string;
  criticalPath: boolean; // Cannot be delayed
  dependencies?: string[]; // IDs of other items that must complete first
  status?: 'pending' | 'in_progress' | 'completed' | 'delayed';
  actualStartTime?: string;
  actualEndTime?: string;
  variance?: string;
}

export interface StaffAssignment {
  id: string;
  staffMember: string;
  role: string;
  department: 'kitchen' | 'service' | 'bar' | 'management';
  shiftStart: string;
  shiftEnd: string;
  breakTimes: string[];
  responsibilities: string[];
  station?: string;
  supervisor: string;
  skillLevel: 1 | 2 | 3 | 4 | 5;
  certifications: string[];
  hourlyRate: number;
  uniformRequirements: string[];
}

export interface EquipmentNeed {
  id: string;
  equipment: string;
  quantity: number;
  timeNeeded: string;
  duration: number; // minutes
  location: string;
  responsible: string;
  setupTime: number; // minutes before use
  breakdown: number; // minutes after use
  backupAvailable: boolean;
  critical: boolean;
}

export interface KeyContact {
  name: string;
  role: string;
  phone: string;
  email?: string;
  availability: string;
  department: string;
}

export interface VenueCalendar {
  venueId: string;
  venueName: string;
  location: string;
  capacity: number;
  events: KitchenEvent[];
  kitchenCapacity: number;
  storageCapacity: number;
  equipmentList: string[];
  specialFeatures: string[];
  restrictions: string[];
  operatingHours: {
    open: string;
    close: string;
    prepStart: string;
    lastSeating: string;
  };
}

export interface PerformanceMetrics {
  id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  startDate: string;
  endDate: string;
  venue?: string;
  metrics: {
    eventVolume: number;
    totalRevenue: number;
    averageRevenuePerEvent: number;
    averageGuestCount: number;
    foodCostPercentage: number;
    laborCostPercentage: number;
    profitMargin: number;
    customerSatisfactionScore: number;
    onTimeServicePercentage: number;
    wastePercentage: number;
    inventoryTurnover: number;
  };
  topMenuItems: {
    name: string;
    orderCount: number;
    revenue: number;
    profitMargin: number;
  }[];
  costBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  trends: {
    metric: string;
    trend: 'up' | 'down' | 'stable';
    changePercentage: number;
    significance: 'minor' | 'moderate' | 'major';
  }[];
}

export interface AlertConfiguration {
  id: string;
  userId: string;
  alertType: 'status_change' | 'new_beo' | 'last_minute_change' | 'inventory_low' | 'cost_variance' | 'quality_issue';
  venues: string[]; // Empty array means all venues
  departments: string[]; // Empty array means all departments
  priority: 'low' | 'medium' | 'high' | 'critical';
  channels: ('email' | 'sms' | 'in_app' | 'push')[];
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
    value: any;
  }[];
  enabled: boolean;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

export interface RevisionHistory {
  id: string;
  documentType: 'beo' | 'recipe' | 'production_list' | 'run_sheet';
  documentId: string;
  changeType: 'created' | 'updated' | 'deleted' | 'approved' | 'rejected';
  changedBy: string;
  changedAt: string;
  fieldChanges: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  reason?: string;
  ipAddress: string;
  userAgent: string;
}

// Builder.io model extensions
export interface BEOBuilderModel {
  beoNumber: string;
  status: 'Pending' | 'Confirmed' | 'Canceled';
  eventTitle: string;
  clientName: string;
  venue: string; // Reference to Venue
  eventDate: string;
  startTime: string;
  endTime: string;
  estimatedGuests: number;
  finalGuests: number;
  eventManager: string; // Reference to User
  menuDetails: {
    menuItem: string;
    dietaryRestrictions: { restriction: string }[];
  }[];
  notesForChef: string;
  revisionHistory: {
    change: string;
    changedBy: string; // Reference to User
    timestamp: string;
  }[];
  
  // Extended fields for kitchen operations
  chefAssigned?: string;
  mealService?: 'breakfast' | 'lunch' | 'dinner' | 'brunch' | 'reception' | 'cocktail';
  prepStartTime?: string;
  serviceStartTime?: string;
  dietaryFlags?: DietaryRestriction[];
  allergenAlerts?: Allergen[];
  productionListGenerated?: boolean;
  runSheetGenerated?: boolean;
  kitchenApproved?: boolean;
  kitchenApprovedBy?: string;
  kitchenApprovedAt?: string;
}

export interface VenueBuilderModel {
  name: string;
  location: string;
  capacity: number;
  
  // Extended fields for kitchen operations
  kitchenCapacity?: number;
  storageCapacity?: number;
  equipmentList?: string[];
  specialFeatures?: string[];
  operatingHours?: {
    open: string;
    close: string;
    prepStart: string;
    lastSeating: string;
  };
  chefInCharge?: string; // Reference to User
  assistantChefs?: string[]; // References to Users
}

export interface UserBuilderModel {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Administrator' | 'Event Manager' | 'Chef' | 'Staff';
  
  // Extended fields for kitchen operations
  department?: 'kitchen' | 'service' | 'bar' | 'management';
  skillLevel?: 1 | 2 | 3 | 4 | 5;
  certifications?: string[];
  hourlyRate?: number;
  venuesAssigned?: string[]; // References to Venues
  alertPreferences?: AlertConfiguration[];
  availabilitySchedule?: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
}
