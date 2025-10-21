// Revenue Management Types
// This file defines all types for hospitality revenue optimization
// Third-party integration points are commented throughout

export interface RoomType {
  id: string;
  name: string;
  code: string;
  category: 'standard' | 'deluxe' | 'suite' | 'presidential' | 'villa';
  baseRate: number;
  capacity: {
    adults: number;
    children: number;
    total: number;
  };
  amenities: string[];
  size: number; // square feet/meters
  bedConfiguration: string[];
  totalInventory: number;
  description: string;
  images: string[];
  
  // Revenue optimization
  demandMultiplier: number; // base multiplier for demand-based pricing
  upsellValue: number; // average upsell value to this room type
  
  // PMS Integration
  // TODO: Connect to Cloud PMS Pro, Hotel Management Suite, or Fidelio room type mapping
  pmsRoomTypeId?: string;
  pmsRateCode?: string;
}

export interface RateCode {
  id: string;
  name: string;
  code: string;
  type: 'standard' | 'promotional' | 'package' | 'corporate' | 'government' | 'group';
  description: string;
  
  // Rate restrictions
  advanceBookingDays?: number;
  minimumStay?: number;
  maximumStay?: number;
  nonRefundable: boolean;
  cancellationPolicy: string;
  
  // Seasonal pricing
  baseRate: number;
  seasonalMultipliers: SeasonalMultiplier[];
  weekdayMultiplier: number;
  weekendMultiplier: number;
  
  // Availability restrictions
  blackoutDates: Date[];
  validDates?: { start: Date; end: Date };
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  
  // Revenue optimization
  demandBasedPricing: boolean;
  dynamicPricingEnabled: boolean;
  competitorPricingEnabled: boolean;
  
  // Package inclusions (if type is 'package')
  inclusions?: PackageInclusion[];
  
  // Marketing
  isPublic: boolean;
  marketingChannels: string[];
  
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface SeasonalMultiplier {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  multiplier: number; // 1.0 = base rate, 1.5 = 50% increase
  priority: number; // for overlapping seasons
}

export interface PackageInclusion {
  type: 'dining' | 'spa' | 'activity' | 'transport' | 'amenity';
  name: string;
  description: string;
  value: number;
  included: boolean;
  optional: boolean;
  additionalCost?: number;
}

export interface DemandForecast {
  date: Date;
  roomTypeId: string;
  
  // Demand metrics
  demandLevel: 'low' | 'medium' | 'high' | 'very-high';
  demandScore: number; // 0-100
  occupancyForecast: number; // percentage
  pickupRate: number; // bookings per day
  
  // Historical data
  historicalOccupancy: number;
  historicalADR: number; // Average Daily Rate
  historicalRevPAR: number; // Revenue Per Available Room
  
  // External factors
  events: LocalEvent[];
  seasonality: number; // -1 to 1, impact of season
  weatherImpact: number; // -1 to 1
  economicFactors: number; // -1 to 1
  
  // Competitive data
  competitorOccupancy?: number;
  competitorADR?: number;
  marketPosition: 'below' | 'at' | 'above'; // relative to comp set
  
  // Calculated recommendations
  recommendedRate: number;
  rateVariance: number; // +/- from base rate
  confidenceLevel: number; // 0-1
  
  // ML model predictions
  // TODO: Connect to ML services like AWS SageMaker, Google AI Platform
  modelVersion?: string;
  predictionAccuracy?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalEvent {
  id: string;
  name: string;
  type: 'conference' | 'festival' | 'sports' | 'concert' | 'holiday' | 'weather';
  startDate: Date;
  endDate: Date;
  expectedAttendance?: number;
  impactRadius: number; // miles/kilometers
  demandImpact: number; // multiplier effect on demand
  source: string; // where event data comes from
}

export interface CompetitorData {
  competitorId: string;
  competitorName: string;
  propertyType: string;
  starRating: number;
  distance: number; // from your property
  
  // Rate data
  rates: CompetitorRate[];
  
  // Performance metrics
  occupancyRate?: number;
  averageDailyRate?: number;
  revPAR?: number;
  
  // Market position
  positioning: 'economy' | 'midscale' | 'upscale' | 'luxury';
  primaryMarkets: string[];
  
  // Data source
  // TODO: Connect to rate shopping tools like RateGain, TravelClick
  dataSource: 'manual' | 'api' | 'scraping';
  lastUpdated: Date;
}

export interface CompetitorRate {
  date: Date;
  roomType: string;
  rate: number;
  availability: 'available' | 'limited' | 'sold-out';
  restrictions: string[];
  channel: 'direct' | 'ota' | 'wholesale';
  currency: string;
}

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  
  // Conditions
  conditions: PricingCondition[];
  
  // Actions
  action: 'multiply' | 'add' | 'subtract' | 'set' | 'min' | 'max';
  value: number;
  
  // Application scope
  roomTypes: string[];
  rateCodes: string[];
  channels: string[];
  
  // Date restrictions
  validDates?: { start: Date; end: Date };
  daysOfWeek?: number[];
  
  // Demand thresholds
  minOccupancy?: number;
  maxOccupancy?: number;
  minAdvanceBooking?: number;
  maxAdvanceBooking?: number;
  
  // Performance tracking
  timesApplied: number;
  revenueImpact: number;
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingCondition {
  field: string; // occupancy, demand, competitor_rate, advance_booking, etc.
  operator: 'equals' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
  values?: any[]; // for 'in' operator
  weight?: number; // for weighted conditions
}

export interface RevenueOptimization {
  date: Date;
  roomTypeId: string;
  
  // Current state
  currentRate: number;
  currentOccupancy: number;
  currentRevPAR: number;
  
  // Optimized recommendations
  optimizedRate: number;
  projectedOccupancy: number;
  projectedRevPAR: number;
  revenueUpside: number; // potential additional revenue
  
  // Optimization factors
  factors: OptimizationFactor[];
  
  // Risk assessment
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  
  // Implementation
  implemented: boolean;
  implementedAt?: Date;
  actualResults?: OptimizationResult;
  
  // ML insights
  // TODO: Connect to AI/ML platforms for advanced optimization
  modelConfidence: number;
  alternativeScenarios: AlternativeScenario[];
  
  createdAt: Date;
}

export interface OptimizationFactor {
  type: 'demand' | 'competition' | 'seasonality' | 'inventory' | 'booking-pace' | 'events';
  impact: number; // -1 to 1
  confidence: number; // 0 to 1
  description: string;
  weight: number; // contribution to final recommendation
}

export interface OptimizationResult {
  actualOccupancy: number;
  actualRevPAR: number;
  actualRevenue: number;
  variance: number; // vs projection
  accuracy: number; // how close projection was
}

export interface AlternativeScenario {
  name: string;
  rate: number;
  projectedOccupancy: number;
  projectedRevPAR: number;
  probability: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface RevenueReport {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  period: { start: Date; end: Date };
  
  // Summary metrics
  summary: RevenueSummary;
  
  // Detailed breakdowns
  roomTypePerformance: RoomTypePerformance[];
  rateCodePerformance: RateCodePerformance[];
  channelPerformance: ChannelPerformance[];
  
  // Trends and analysis
  trends: RevenueTrend[];
  forecasts: RevenueForecast[];
  
  // Competitive analysis
  competitivePosition: CompetitivePosition;
  
  // Optimization insights
  optimizationOpportunities: OptimizationOpportunity[];
  
  generatedAt: Date;
  generatedBy: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  roomRevenue: number;
  totalRevPAR: number;
  averageDailyRate: number;
  occupancyRate: number;
  
  // Comparisons
  vsLastPeriod: {
    revenue: number; // percentage change
    revPAR: number;
    adr: number;
    occupancy: number;
  };
  
  vsBudget: {
    revenue: number;
    revPAR: number;
    adr: number;
    occupancy: number;
  };
  
  vsMarket: {
    revPAR: number;
    adr: number;
    occupancy: number;
  };
}

export interface RoomTypePerformance {
  roomTypeId: string;
  roomTypeName: string;
  
  // Performance metrics
  revenue: number;
  revPAR: number;
  adr: number;
  occupancy: number;
  
  // Volume metrics
  roomsSold: number;
  roomNights: number;
  noShows: number;
  cancellations: number;
  
  // Optimization
  optimizationScore: number; // how well optimized pricing was
  missedRevenueOpportunity: number;
  
  // Trends
  trendDirection: 'up' | 'down' | 'stable';
  trendStrength: number; // 0-1
}

export interface RateCodePerformance {
  rateCodeId: string;
  rateCodeName: string;
  
  // Volume and revenue
  bookings: number;
  revenue: number;
  averageRate: number;
  
  // Conversion metrics
  shopToBuy: number; // percentage
  cancellationRate: number;
  noShowRate: number;
  
  // Channel distribution
  channelMix: { [channel: string]: number };
  
  // Profitability
  netRevenue: number; // after commissions/fees
  profitMargin: number;
}

export interface ChannelPerformance {
  channel: string;
  
  // Volume metrics
  bookings: number;
  revenue: number;
  roomNights: number;
  
  // Quality metrics
  averageRate: number;
  cancellationRate: number;
  noShowRate: number;
  
  // Costs and profitability
  commissionCost: number;
  marketingCost: number;
  netRevenue: number;
  profitMargin: number;
  
  // Performance trends
  bookingTrend: 'up' | 'down' | 'stable';
  revenueTrend: 'up' | 'down' | 'stable';
}

export interface RevenueTrend {
  metric: 'revenue' | 'revPAR' | 'adr' | 'occupancy';
  period: 'daily' | 'weekly' | 'monthly';
  data: TrendDataPoint[];
  trendDirection: 'up' | 'down' | 'stable';
  growthRate: number; // percentage
  seasonalPattern?: SeasonalPattern;
}

export interface TrendDataPoint {
  date: Date;
  value: number;
  forecast?: boolean;
}

export interface SeasonalPattern {
  pattern: 'weekly' | 'monthly' | 'yearly';
  cycles: SeasonalCycle[];
  strength: number; // 0-1, how strong the pattern is
}

export interface SeasonalCycle {
  period: string; // e.g., "Monday", "January", "Q1"
  averageValue: number;
  variance: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RevenueForecast {
  metric: 'revenue' | 'revPAR' | 'adr' | 'occupancy';
  forecastPeriod: { start: Date; end: Date };
  predictions: ForecastPrediction[];
  confidence: number; // 0-1
  methodology: 'statistical' | 'ml' | 'hybrid' | 'manual';
  
  // Scenario analysis
  scenarios: ForecastScenario[];
  
  // Model performance
  historicalAccuracy?: number;
  lastTrainingDate?: Date;
}

export interface ForecastPrediction {
  date: Date;
  predictedValue: number;
  confidenceInterval: { lower: number; upper: number };
  factorsConsidered: string[];
}

export interface ForecastScenario {
  name: string;
  description: string;
  probability: number;
  impact: number; // multiplier vs base forecast
  assumptions: string[];
}

export interface CompetitivePosition {
  marketRank: number;
  totalCompetitors: number;
  
  // Rate positioning
  ratePosition: 'premium' | 'competitive' | 'value';
  rateIndex: number; // vs comp set average (1.0 = at market)
  
  // Performance vs comp set
  revPARIndex: number;
  occupancyIndex: number;
  adrIndex: number;
  
  // Market share
  marketShare: number; // percentage of total market
  fairShare: number; // expected share based on room count
  
  // Trends vs market
  shareGrowth: number; // percentage change in market share
  
  keyCompetitors: CompetitorComparison[];
}

export interface CompetitorComparison {
  competitorName: string;
  
  // Rate comparison
  rateGap: number; // difference in ADR
  ratePosition: 'higher' | 'lower' | 'similar';
  
  // Performance comparison
  revPARGap: number;
  occupancyGap: number;
  
  // Strengths/weaknesses
  competitorStrengths: string[];
  competitorWeaknesses: string[];
  
  // Recommendations
  recommendations: string[];
}

export interface OptimizationOpportunity {
  type: 'pricing' | 'inventory' | 'channel' | 'length-of-stay' | 'upsell';
  title: string;
  description: string;
  
  // Impact assessment
  revenueImpact: number;
  implementationEffort: 'low' | 'medium' | 'high';
  timeToImplement: number; // days
  
  // Risk assessment
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  
  // Implementation details
  actionItems: string[];
  kpis: string[];
  
  // Priority
  priority: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'this-week' | 'this-month' | 'this-quarter';
  
  createdAt: Date;
  status: 'identified' | 'planned' | 'in-progress' | 'implemented' | 'rejected';
}

export interface BudgetPlan {
  id: string;
  year: number;
  property: string;
  
  // Annual targets
  annualTargets: BudgetTargets;
  
  // Monthly breakdown
  monthlyTargets: MonthlyBudget[];
  
  // Room type targets
  roomTypeTargets: RoomTypeBudget[];
  
  // Assumptions
  assumptions: BudgetAssumption[];
  
  // Scenarios
  scenarios: BudgetScenario[];
  
  // Performance tracking
  actualPerformance?: BudgetPerformance;
  
  createdAt: Date;
  createdBy: string;
  version: number;
  status: 'draft' | 'approved' | 'active' | 'archived';
}

export interface BudgetTargets {
  revenue: number;
  roomRevenue: number;
  revPAR: number;
  adr: number;
  occupancy: number;
  roomsSold: number;
  
  // Growth metrics
  revenueGrowth: number; // vs previous year
  revPARGrowth: number;
  adrGrowth: number;
  occupancyChange: number;
}

export interface MonthlyBudget {
  month: number; // 1-12
  targets: BudgetTargets;
  seasonalFactors: SeasonalFactor[];
  events: string[];
  notes?: string;
}

export interface RoomTypeBudget {
  roomTypeId: string;
  targets: BudgetTargets;
  inventory: number;
  averageRate: number;
  mixPercentage: number; // percentage of total revenue
}

export interface BudgetAssumption {
  category: 'market' | 'competition' | 'property' | 'economic' | 'operational';
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-1
  source: string;
}

export interface SeasonalFactor {
  type: 'event' | 'weather' | 'holiday' | 'business-cycle' | 'tourism';
  impact: number; // multiplier
  description: string;
}

export interface BudgetScenario {
  name: string;
  description: string;
  probability: number;
  revenueImpact: number; // vs base scenario
  keyChanges: string[];
  targets: BudgetTargets;
}

export interface BudgetPerformance {
  actualToDate: BudgetTargets;
  forecastToGo: BudgetTargets;
  fullYearForecast: BudgetTargets;
  
  // Variance analysis
  variance: {
    revenue: number; // vs budget
    revPAR: number;
    adr: number;
    occupancy: number;
  };
  
  // Performance indicators
  onTrack: boolean;
  riskFactors: string[];
  opportunities: string[];
  
  lastUpdated: Date;
}

// Integration interfaces for third-party systems
export interface PMSIntegration {
  // TODO: Define interfaces for major PMS systems
  cloudPMSConnection?: CloudPMSData;
  hotelSuiteConnection?: HotelSuiteData;
  fidelioConnection?: FidelioPMSData;
}

export interface CloudPMSData {
  propertyCode: string;
  hotelId: string;
  chainCode: string;
  // Additional cloud PMS-specific fields
}

export interface HotelSuiteData {
  propertyId: string;
  groupId: string;
  // Additional hotel suite-specific fields
}

export interface FidelioPMSData {
  hotelCode: string;
  version: string;
  // Additional Fidelio-specific fields
}

// Default room types for hospitality properties
export const defaultRoomTypes: RoomType[] = [
  {
    id: 'standard-queen',
    name: 'Standard Queen Room',
    code: 'STD-Q',
    category: 'standard',
    baseRate: 199,
    capacity: { adults: 2, children: 2, total: 4 },
    amenities: ['WiFi', 'Coffee Maker', 'Iron & Ironing Board'],
    size: 300,
    bedConfiguration: ['Queen Bed'],
    totalInventory: 50,
    description: 'Comfortable standard room with queen bed',
    images: [],
    demandMultiplier: 1.0,
    upsellValue: 50
  },
  {
    id: 'deluxe-king',
    name: 'Deluxe King Room',
    code: 'DLX-K',
    category: 'deluxe',
    baseRate: 299,
    capacity: { adults: 2, children: 2, total: 4 },
    amenities: ['WiFi', 'Coffee Maker', 'Mini Fridge', 'City View'],
    size: 400,
    bedConfiguration: ['King Bed'],
    totalInventory: 30,
    description: 'Upgraded room with king bed and city views',
    images: [],
    demandMultiplier: 1.2,
    upsellValue: 75
  },
  {
    id: 'ocean-suite',
    name: 'Ocean View Suite',
    code: 'OCN-STE',
    category: 'suite',
    baseRate: 499,
    capacity: { adults: 4, children: 2, total: 6 },
    amenities: ['WiFi', 'Coffee Maker', 'Mini Fridge', 'Ocean View', 'Sitting Area', 'Balcony'],
    size: 600,
    bedConfiguration: ['King Bed', 'Sofa Bed'],
    totalInventory: 15,
    description: 'Luxurious suite with stunning ocean views',
    images: [],
    demandMultiplier: 1.5,
    upsellValue: 150
  }
];

// Default rate codes
export const defaultRateCodes: RateCode[] = [
  {
    id: 'standard',
    name: 'Standard Rate',
    code: 'STD',
    type: 'standard',
    description: 'Best available rate with standard terms',
    baseRate: 199,
    seasonalMultipliers: [],
    weekdayMultiplier: 1.0,
    weekendMultiplier: 1.2,
    blackoutDates: [],
    nonRefundable: false,
    cancellationPolicy: 'Cancel up to 24 hours before arrival',
    demandBasedPricing: true,
    dynamicPricingEnabled: true,
    competitorPricingEnabled: true,
    isPublic: true,
    marketingChannels: ['Direct', 'OTA', 'GDS'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: 'advance-purchase',
    name: 'Advance Purchase',
    code: 'ADV21',
    type: 'promotional',
    description: 'Save 15% with 21-day advance booking',
    advanceBookingDays: 21,
    baseRate: 169,
    seasonalMultipliers: [],
    weekdayMultiplier: 1.0,
    weekendMultiplier: 1.15,
    blackoutDates: [],
    nonRefundable: true,
    cancellationPolicy: 'Non-refundable',
    demandBasedPricing: false,
    dynamicPricingEnabled: false,
    competitorPricingEnabled: false,
    isPublic: true,
    marketingChannels: ['Direct', 'OTA'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
];
