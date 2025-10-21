export interface MenuItemNutrition {
  calories?: number;
  allergens: string[];
  dietaryRestrictions: string[]; // vegetarian, vegan, gluten-free, etc.
  ingredients: string[];
}

export interface MenuItemPricing {
  basePrice: number;
  currency: string;
  portionSize: string;
  costPerPortion: number;
  markupPercentage: number;
  competitorPrices?: CompetitorPrice[];
}

export interface CompetitorPrice {
  venueName: string;
  location: string;
  price: number;
  distance: number; // in miles/km
  similarity: number; // 0-100% how similar the item is
  lastUpdated: Date;
}

export interface MenuItemBase {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  subcategory?: string;
  pricing: MenuItemPricing;
  nutrition: MenuItemNutrition;
  preparationTime: number; // in minutes
  servingSize: number;
  chefNotes?: string;
  seasonalAvailability?: string[];
  customizationOptions?: CustomizationOption[];
  imageUrl?: string;
  popularity: number; // 1-100
  isActive: boolean;
  createdDate: Date;
  lastModified: Date;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'addition' | 'substitution' | 'preparation-style';
  priceAdjustment: number;
  description: string;
  availableForDietary?: string[];
}

export type MenuCategory = 
  | 'appetizers' 
  | 'salads' 
  | 'soups' 
  | 'entrees' 
  | 'sides' 
  | 'desserts' 
  | 'beverages' 
  | 'cocktails' 
  | 'wine' 
  | 'beer' 
  | 'action-stations' 
  | 'breakfast' 
  | 'brunch' 
  | 'lunch' 
  | 'dinner';

export interface DigitalizedMenu {
  id: string;
  name: string;
  description?: string;
  venue: string;
  menuType: 'catering' | 'restaurant' | 'banquet' | 'cocktail' | 'breakfast' | 'lunch' | 'dinner';
  effectiveDate: Date;
  expirationDate?: Date;
  items: MenuItemBase[];
  packages?: MenuPackage[];
  minimumOrderValue?: number;
  servingStyles: ServingStyle[];
  pricing: MenuPricingStructure;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  version: number;
}

export interface MenuPackage {
  id: string;
  name: string;
  description: string;
  type: 'fixed-price' | 'per-person' | 'family-style' | 'buffet';
  items: PackageItem[];
  basePrice: number;
  minimumGuests: number;
  maximumGuests?: number;
  includedServices: string[];
  additionalFees: ServiceFee[];
}

export interface PackageItem {
  menuItemId: string;
  quantity: number;
  isRequired: boolean;
  substitutionAllowed: boolean;
  priceOverride?: number;
}

export interface ServingStyle {
  name: string;
  description: string;
  priceMultiplier: number;
  minimumGuests: number;
  setupRequirements: string[];
  staffingRequirements: StaffingRequirement[];
}

export interface StaffingRequirement {
  role: string;
  quantity: number;
  hourlyRate: number;
  minimumHours: number;
}

export interface MenuPricingStructure {
  baseMarkup: number;
  tierPricing: TierPricing[];
  serviceFees: ServiceFee[];
  gratuityPolicy: GratuityPolicy;
  taxRate: number;
  discountPolicies: DiscountPolicy[];
}

export interface TierPricing {
  tierName: string;
  guestCountMin: number;
  guestCountMax?: number;
  priceMultiplier: number;
  description: string;
  includedServices: string[];
}

export interface ServiceFee {
  id: string;
  name: string;
  type: 'fixed' | 'percentage' | 'per-person' | 'per-hour';
  amount: number;
  description: string;
  isOptional: boolean;
  conditions?: string[];
}

export interface GratuityPolicy {
  isAutomatic: boolean;
  percentage?: number;
  minimumAmount?: number;
  applicableServices: string[];
  description: string;
}

export interface DiscountPolicy {
  name: string;
  type: 'percentage' | 'fixed-amount' | 'buy-x-get-y';
  value: number;
  conditions: string[];
  validFrom: Date;
  validTo?: Date;
  minimumOrder?: number;
  maximumDiscount?: number;
}

export interface BEOFromMenu {
  id: string;
  menuId: string;
  eventName: string;
  eventDate: Date;
  guestCount: number;
  selectedItems: BEOMenuItem[];
  selectedPackages: BEOPackage[];
  dietaryRequirements: DietaryRequirement[];
  servicingStyle: ServingStyle;
  pricing: BEOPricing;
  chefNotes: ChefNote[];
  specialRequests: string[];
  timeline: EventTimeline[];
  staffingPlan: StaffingPlan;
  setupRequirements: SetupRequirement[];
  createdBy: string;
  createdDate: Date;
  lastModified: Date;
  status: 'draft' | 'pending-approval' | 'approved' | 'confirmed' | 'completed';
}

export interface BEOMenuItem {
  menuItemId: string;
  quantity: number;
  customizations: string[];
  specialInstructions?: string;
  allergenNotes?: string;
  portionAdjustments?: PortionAdjustment[];
}

export interface PortionAdjustment {
  reason: string;
  originalPortion: number;
  adjustedPortion: number;
  priceAdjustment: number;
}

export interface BEOPackage {
  packageId: string;
  guestCount: number;
  customizations: PackageCustomization[];
  priceOverride?: number;
}

export interface PackageCustomization {
  originalItemId: string;
  substitutionItemId?: string;
  additionalItems: string[];
  removedItems: string[];
  specialInstructions?: string;
}

export interface DietaryRequirement {
  type: 'allergy' | 'intolerance' | 'preference' | 'religious';
  restriction: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  guestCount: number;
  alternativeItems: string[];
  specialPreparation?: string;
}

export interface ChefNote {
  id: string;
  category: 'preparation' | 'presentation' | 'timing' | 'dietary' | 'equipment';
  note: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  relatedItems: string[];
  createdBy: string;
  createdDate: Date;
}

export interface BEOPricing {
  subtotal: number;
  serviceFees: ServiceFeeCalculation[];
  taxes: TaxCalculation[];
  gratuity: GratuityCalculation;
  discounts: DiscountCalculation[];
  total: number;
  paymentTerms: PaymentTerms;
  breakdown: PricingBreakdown[];
}

export interface ServiceFeeCalculation {
  feeId: string;
  name: string;
  calculationMethod: string;
  amount: number;
  appliedTo: number;
}

export interface TaxCalculation {
  name: string;
  rate: number;
  taxableAmount: number;
  amount: number;
}

export interface GratuityCalculation {
  isApplied: boolean;
  rate?: number;
  amount: number;
  distribution?: StaffGratuityDistribution[];
}

export interface StaffGratuityDistribution {
  staffRole: string;
  staffCount: number;
  percentage: number;
  amount: number;
}

export interface DiscountCalculation {
  discountName: string;
  type: string;
  appliedAmount: number;
  savedAmount: number;
}

export interface PaymentTerms {
  depositPercentage: number;
  depositDueDate: Date;
  finalPaymentDueDate: Date;
  acceptedPaymentMethods: string[];
  cancellationPolicy: string;
  refundPolicy: string;
}

export interface PricingBreakdown {
  category: string;
  itemCount: number;
  subtotal: number;
  details: PricingDetail[];
}

export interface PricingDetail {
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface EventTimeline {
  id: string;
  time: string;
  activity: string;
  duration: number;
  staffRequired: string[];
  equipment: string[];
  notes?: string;
  isDeadline: boolean;
  dependencies: string[];
}

export interface StaffingPlan {
  totalStaffRequired: number;
  roles: StaffRole[];
  shiftSchedule: StaffShift[];
  specialSkillsRequired: string[];
  briefingNotes: string;
}

export interface StaffRole {
  role: string;
  count: number;
  hourlyRate: number;
  totalHours: number;
  responsibilities: string[];
  qualificationsRequired: string[];
}

export interface StaffShift {
  staffRole: string;
  startTime: string;
  endTime: string;
  duration: number;
  breakSchedule: BreakSchedule[];
}

export interface BreakSchedule {
  type: 'meal' | 'rest';
  startTime: string;
  duration: number;
}

export interface SetupRequirement {
  id: string;
  category: 'kitchen' | 'dining' | 'bar' | 'av-equipment' | 'furniture' | 'decor';
  item: string;
  quantity: number;
  specifications: string;
  setupTime: number;
  breakdown: number;
  vendor?: string;
  cost: number;
  isClientProvided: boolean;
  deliveryInstructions?: string;
}

export interface MenuUploadResult {
  success: boolean;
  menuId?: string;
  itemsProcessed: number;
  itemsSuccessful: number;
  itemsFailed: number;
  errors: ProcessingError[];
  warnings: ProcessingWarning[];
  extractedData: ExtractedMenuData;
  processingTime: number;
}

export interface ProcessingError {
  line?: number;
  field?: string;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface ProcessingWarning {
  line?: number;
  field?: string;
  message: string;
  impact: string;
  recommendation: string;
}

export interface ExtractedMenuData {
  venueName?: string;
  menuName?: string;
  menuType?: string;
  effectiveDate?: Date;
  itemCategories: string[];
  totalItems: number;
  priceRange: { min: number; max: number };
  detecteddietaryOptions: string[];
  suggestedPackages: SuggestedPackage[];
}

export interface SuggestedPackage {
  name: string;
  items: string[];
  estimatedPrice: number;
  targetGuestCount: number;
  reasoning: string;
}

export interface RegionalPricingAnalysis {
  itemName: string;
  ourPrice: number;
  competitorPrices: CompetitorPrice[];
  averageMarketPrice: number;
  pricePosition: 'below-market' | 'market-rate' | 'above-market' | 'premium';
  recommendedPriceRange: { min: number; max: number };
  confidenceScore: number;
  lastAnalyzed: Date;
  recommendations: PricingRecommendation[];
}

export interface PricingRecommendation {
  type: 'increase' | 'decrease' | 'maintain' | 'investigate';
  reasoning: string;
  expectedImpact: string;
  riskLevel: 'low' | 'medium' | 'high';
  implementationNotes: string;
}
