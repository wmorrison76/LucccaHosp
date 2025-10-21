export interface RoomType {
  id: string;
  name: string;
  category: 'standard' | 'deluxe' | 'suite' | 'presidential' | 'villa';
  baseRate: number;
  totalInventory: number;
}

export interface RateCode {
  id: string;
  code: string;
  description: string;
  restrictions?: string[];
  isActive: boolean;
}

export interface DemandForecast {
  date: Date;
  roomTypeId: string;
  demandLevel: 'very-high' | 'high' | 'medium' | 'low';
  demandScore: number;
  occupancyForecast: number;
  pickupRate: number;
  historicalOccupancy: number;
  historicalADR: number;
  historicalRevPAR: number;
  events: {
    id: string;
    name: string;
    type: string;
    startDate: Date;
    endDate: Date;
    expectedAttendance: number;
    impactRadius: number;
    demandImpact: number;
    source: string;
  }[];
  seasonality: number;
  weatherImpact: number;
  economicFactors: number;
  competitorOccupancy: number;
  competitorADR: number;
  marketPosition: 'above' | 'below' | 'at';
  recommendedRate: number;
  rateVariance: number;
  confidenceLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitorData {
  competitorId: string;
  competitorName: string;
  propertyType: string;
  starRating: number;
  distance: number;
  rates: {
    date: Date;
    roomType: string;
    rate: number;
    availability: string;
    restrictions: string[];
    channel: string;
    currency: string;
  }[];
  occupancyRate: number;
  averageDailyRate: number;
  revPAR: number;
  positioning: 'luxury' | 'upscale' | 'midscale' | 'budget';
  primaryMarkets: string[];
  dataSource: string;
  lastUpdated: Date;
}

export interface RevenueOptimization {
  date: Date;
  roomTypeId: string;
  currentRate: number;
  currentOccupancy: number;
  currentRevPAR: number;
  optimizedRate: number;
  projectedOccupancy: number;
  projectedRevPAR: number;
  revenueUpside: number;
  factors: {
    type: string;
    impact: number;
    confidence: number;
    description: string;
    weight: number;
  }[];
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: string[];
  implemented: boolean;
  modelConfidence: number;
  alternativeScenarios: {
    name: string;
    rate: number;
    projectedOccupancy: number;
    projectedRevPAR: number;
    probability: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  createdAt: Date;
}
export * from "../../echocrm-merged/shared/revenue-management-types";
export interface RevenueReport {
  id: string;
  date: Date;
  totalRevenue: number;
  occupancy: number;
  adr: number;
  revPAR: number;
}

export interface BudgetPlan {
  id: string;
  year: number;
  monthlyTargets: { month: string; revenue: number }[];
  createdAt: Date;
}

// Default mock data
export const defaultRoomTypes: RoomType[] = [
  { id: 'standard-queen', name: 'Standard Queen', category: 'standard', baseRate: 199, totalInventory: 50 },
  { id: 'deluxe-king', name: 'Deluxe King', category: 'deluxe', baseRate: 299, totalInventory: 30 },
  { id: 'suite-ocean', name: 'Ocean Suite', category: 'suite', baseRate: 499, totalInventory: 10 }
];

export const defaultRateCodes: RateCode[] = [
  { id: 'flex', code: 'FLEX', description: 'Flexible Rate', isActive: true },
  { id: 'nonref', code: 'NONREF', description: 'Non-Refundable', isActive: true },
  { id: 'corp', code: 'CORP', description: 'Corporate Rate', isActive: true },
];
