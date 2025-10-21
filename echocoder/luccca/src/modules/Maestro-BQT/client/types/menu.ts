/**
 * Menu & Recipe Management Types for LUCCCA Ecosystem
 * 
 * Integration types for Maestro Banquets (Chef) and Nova Lab (Event Planner)
 * Powered by Echo AI for intelligent recipe scaling and menu optimization
 */

// Core Recipe Types
export interface EquipmentRequirement {
  equipmentId: string;
  quantity: number;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: RecipeCategory;
  cuisine: string;
  
  // Recipe basics
  servings: number;
  yield: RecipeYield;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  
  // Ingredients with scaling support
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  equipment: EquipmentRequirement[];
  
  // Nutritional and dietary info
  nutrition: NutritionInfo;
  allergens: string[];
  dietaryTags: DietaryTag[];
  
  // Chef information
  createdBy: string;
  authorizedBy?: string;
  lastModified: string;
  version: number;
  
  // Cost and scaling
  baseCost: number;
  costPerServing: number;
  scalingNotes?: string;
  minScale: number; // minimum multiplier
  maxScale: number; // maximum multiplier
  
  // Echo AI enhancements
  aiOptimized: boolean;
  popularityScore: number; // 0-100
  seasonalAvailability?: string[];
  suggestedPairings?: string[];
  
  // Integration with Nova Lab
  eventPlannerVisible: boolean;
  clientApproved: boolean;
  marketingDescription?: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  preparation?: string; // "diced", "chopped", etc.
  optional: boolean;
  substituteFor?: string; // ingredient ID this substitutes
  
  // Scaling properties
  scalingBehavior: 'linear' | 'logarithmic' | 'threshold' | 'fixed';
  scalingNotes?: string;
  
  // Cost and sourcing
  unitCost?: number;
  vendor?: string;
  availability: 'always' | 'seasonal' | 'limited' | 'special_order';
  
  // Allergen and dietary
  allergens: string[];
  dietaryFlags: string[];
}

export interface RecipeInstruction {
  step: number;
  instruction: string;
  technique?: string;
  timeMinutes?: number;
  temperature?: number;
  criticalPoint: boolean;
  haccp?: boolean; // HACCP critical control point
  equipmentRequired?: string[];
  chefNotes?: string;
}

export interface RecipeYield {
  amount: number;
  unit: string;
  description?: string; // "8-inch round cakes", "individual portions"
}

export type RecipeCategory = 
  | 'appetizer' | 'soup' | 'salad' | 'entree' | 'side' | 'dessert' 
  | 'bread' | 'sauce' | 'garnish' | 'beverage' | 'amuse' | 'petit_four';

export type DietaryTag = 
  | 'vegetarian' | 'vegan' | 'gluten_free' | 'dairy_free' | 'nut_free'
  | 'kosher' | 'halal' | 'keto' | 'paleo' | 'low_carb' | 'low_fat';

// Menu Management Types
export interface MenuCollection {
  id: string;
  name: string;
  description: string;
  type: MenuType;
  season?: string;
  
  // Menu structure
  sections: MenuSection[];
  totalItems: number;
  
  // Pricing and costs
  averageCostPerPerson: number;
  profitMargin: number;
  priceRange: { min: number; max: number };
  
  // Event integration (Nova Lab)
  eventTypes: string[]; // wedding, corporate, etc.
  guestCountRange: { min: number; max: number };
  
  // Chef workflow
  prepComplexity: number; // 1-10 scale
  staffRequirement: number; // minimum chef count
  equipmentRequirement: string[];
  
  // Status and approval
  status: 'draft' | 'review' | 'approved' | 'archived';
  approvedBy?: string;
  approvedAt?: string;
  
  // Echo AI optimization
  performanceMetrics: MenuPerformanceMetrics;
  aiRecommendations?: string[];
  lastOptimized?: string;
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  order: number;
  category: RecipeCategory;
  
  // Items in this section
  items: MenuItemLink[];
  
  // Section rules
  required: boolean;
  multipleChoice: boolean;
  maxSelections?: number;
  
  // Presentation
  displayStyle: 'list' | 'grid' | 'carousel';
  showPricing: boolean;
}

export interface MenuItemLink {
  id: string;
  recipeId: string;
  name: string; // can override recipe name
  description?: string; // can override recipe description
  
  // Pricing for this menu context
  price: number;
  costOverride?: number; // override recipe cost calculation
  
  // Availability and options
  available: boolean;
  featured: boolean;
  seasonalOnly: boolean;
  
  // Scaling settings for this menu
  defaultPortions: number;
  bufferPercentage: number; // extra to prepare
  scalingRules: ScalingRule[];
  
  // Missing recipe warnings
  hasLinkedRecipe: boolean;
  missingRecipeFlag: boolean;
  missingRecipeReason?: string;
  temporaryRecipe?: boolean; // using placeholder until real recipe ready
  
  // Client-facing info (Nova Lab integration)
  clientVisible: boolean;
  clientDescription?: string;
  dietaryIconsShow: boolean;
  allergenWarningsShow: boolean;
}

export interface ScalingRule {
  id: string;
  guestCountFrom: number;
  guestCountTo: number;
  scalingMultiplier: number;
  bufferPercentage: number;
  notes?: string;
  staffAdjustment?: number; // additional staff needed
  equipmentAdjustment?: string[]; // additional equipment needed
}

export type MenuType = 
  | 'tasting' | 'prix_fixe' | 'a_la_carte' | 'buffet' | 'family_style'
  | 'cocktail' | 'brunch' | 'lunch' | 'dinner' | 'late_night' | 'dessert_only';

// Performance and Analytics
export interface MenuPerformanceMetrics {
  orderFrequency: number; // how often this menu is ordered
  guestSatisfaction: number; // 0-100 score
  profitability: number; // 0-100 score
  preparationTime: number; // average minutes
  complexityScore: number; // 1-10 scale
  seasonalPerformance: SeasonalMetrics[];
  popularItems: string[]; // recipe IDs
  problematicItems: string[]; // recipe IDs with issues
}

export interface SeasonalMetrics {
  season: string;
  orderCount: number;
  avgGuestCount: number;
  avgRevenue: number;
  avgCost: number;
  satisfaction: number;
}

// Nutrition and Health
export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbohydrates: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sodium: number; // mg
  sugar: number; // grams
  
  // Additional nutrients
  vitamins?: { [key: string]: number };
  minerals?: { [key: string]: number };
  
  // Calculated values
  caloriesFromFat: number;
  macroBalance: 'balanced' | 'high_protein' | 'high_carb' | 'high_fat';
}

// Recipe Scaling and Production
export interface ProductionPlan {
  id: string;
  menuCollectionId: string;
  eventId: string; // Nova Lab event ID
  plannedGuestCount: number;
  finalGuestCount?: number;
  
  // Scaling calculations
  scaledRecipes: ScaledRecipe[];
  totalIngredients: IngredientSummary[];
  totalCost: number;
  totalPrepTime: number;
  
  // Buffer management
  defaultBufferPercentage: number;
  customBuffers: { [recipeId: string]: number };
  totalBufferCost: number;
  
  // Production scheduling
  prepSchedule: PrepScheduleItem[];
  criticalPath: string[]; // recipe IDs in order of dependency
  
  // Staff and equipment
  staffRequirement: StaffRequirement[];
  equipmentSchedule: EquipmentScheduleItem[];
  
  // Status tracking
  status: 'planning' | 'approved' | 'in_prep' | 'ready' | 'served' | 'completed';
  approvedBy?: string;
  approvedAt?: string;
  
  // Echo AI optimization
  aiOptimized: boolean;
  optimizationSuggestions?: string[];
}

export interface ScaledRecipe {
  recipeId: string;
  originalServings: number;
  targetServings: number;
  scalingMultiplier: number;
  bufferPercentage: number;
  finalQuantity: number;
  
  // Scaled ingredients
  scaledIngredients: ScaledIngredient[];
  scaledCost: number;
  scaledPrepTime: number;
  scaledCookTime: number;
  
  // Production notes
  scalingNotes?: string[];
  criticalAdjustments?: string[];
  qualityConsiderations?: string[];
}

export interface ScaledIngredient {
  ingredientId: string;
  name: string;
  originalAmount: number;
  scaledAmount: number;
  unit: string;
  scaledCost: number;
  
  // Purchasing info
  purchaseQuantity: number; // accounting for package sizes
  purchaseUnit: string;
  vendor?: string;
  orderDeadline?: string;
}

export interface IngredientSummary {
  name: string;
  totalAmount: number;
  unit: string;
  totalCost: number;
  usedInRecipes: string[]; // recipe IDs
  vendor?: string;
  availability: 'in_stock' | 'order_required' | 'unavailable';
  substitutionSuggested?: boolean;
}

export interface PrepScheduleItem {
  recipeId: string;
  taskName: string;
  startTime: string; // ISO datetime
  duration: number; // minutes
  assignedChef?: string;
  dependencies: string[]; // other task IDs
  critical: boolean;
  haccp: boolean;
  temperature?: number;
  notes?: string;
}

export interface StaffRequirement {
  role: string;
  count: number;
  startTime: string;
  duration: number; // minutes
  skills: string[];
  assignments: string[]; // recipe IDs they're working on
}

export interface EquipmentScheduleItem {
  equipment: string;
  startTime: string;
  duration: number; // minutes
  usedForRecipes: string[]; // recipe IDs
  setup: string;
  breakdown: string;
  location?: string;
}

// Integration with Nova Lab Event Planner
export interface EventMenuConnection {
  eventId: string; // Nova Lab event ID
  menuCollectionId: string;
  customizations: MenuCustomization[];
  guestPreferences: GuestPreference[];
  dietaryRestrictions: DietaryRestriction[];
  lastSyncedAt: string;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'error';
}

export interface MenuCustomization {
  type: 'add' | 'remove' | 'modify' | 'substitute';
  targetRecipeId: string;
  customRecipeId?: string; // for substitutions
  reason: string;
  requestedBy: string; // user ID from Nova Lab
  approvedBy?: string;
  notes?: string;
}

export interface GuestPreference {
  category: string;
  preference: string;
  guestCount: number;
  severity: 'preference' | 'requirement' | 'allergy';
  notes?: string;
}

export interface DietaryRestriction {
  type: string;
  description: string;
  affectedRecipes: string[]; // recipe IDs that conflict
  alternativeRecipes: string[]; // recipe IDs that work
  guestCount: number;
}

// Echo AI Integration
export interface EchoAiMenuAnalysis {
  menuCollectionId: string;
  analysisDate: string;
  overallScore: number; // 0-100
  
  // AI insights
  profitabilityAnalysis: string[];
  seasonalRecommendations: string[];
  trendingIngredients: string[];
  costOptimizations: string[];
  
  // Predictive analytics
  demandForecast: { [recipeId: string]: number };
  seasonalAdjustments: { [recipeId: string]: string };
  pricingRecommendations: { [recipeId: string]: number };
  
  // Quality and satisfaction
  qualityPredictions: { [recipeId: string]: number };
  satisfactionPredictions: { [recipeId: string]: number };
  riskAssessments: { [recipeId: string]: string[] };
}
