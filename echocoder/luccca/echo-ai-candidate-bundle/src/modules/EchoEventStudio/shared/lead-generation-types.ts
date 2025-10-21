export interface ClientDemographics {
  id: string;
  companyName: string;
  industry: string;
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  annualRevenue: number;
  location: {
    city: string;
    state: string;
    country: string;
    region: string;
  };
  decisionMakers: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  }[];
  eventFrequency: 'rarely' | 'occasionally' | 'regularly' | 'frequently';
  averageEventSize: number;
  averageEventBudget: number;
  preferredEventTypes: string[];
  seasonalPatterns: {
    month: number;
    likelihood: number; // 0-100
  }[];
}

export interface ClientClassification {
  id: string;
  clientId: string;
  classification: 'whale' | 'sweet-spot' | 'standard' | 'low-value';
  classificationDate: Date;
  criteria: {
    annualValue: number;
    eventFrequency: number;
    profitMargin: number;
    difficultyScore: number; // 1-10, higher = more difficult
    loyaltyScore: number; // 1-10
  };
  whalePercentile?: number; // Only for whale clients, top 4%
  notes: string;
}

export interface LeadGenerationRule {
  id: string;
  name: string;
  description: string;
  targetDemographics: {
    industries: string[];
    companySizes: string[];
    revenueRange: { min: number; max: number };
    regions: string[];
  };
  scoringWeights: {
    industryMatch: number;
    sizeMatch: number;
    revenueMatch: number;
    locationMatch: number;
    seasonalTiming: number;
  };
  minimumScore: number;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
}

export interface ProspectiveClient {
  id: string;
  demographics: ClientDemographics;
  leadScore: number;
  generatedBy: LeadGenerationRule;
  contactHistory: ClientContactRecord[];
  predictedClassification: 'whale' | 'sweet-spot' | 'standard' | 'low-value';
  probabilityScore: number; // 0-100
  estimatedAnnualValue: number;
  nextContactDate: Date;
  assignedSalesRep?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed-won' | 'closed-lost';
  createdDate: Date;
}

export interface ClientContactRecord {
  id: string;
  clientId: string;
  contactDate: Date;
  contactType: 'email' | 'phone' | 'meeting' | 'event' | 'proposal';
  salesRep: string;
  purpose: 'initial-contact' | 'follow-up' | 'proposal' | 'slow-period-outreach' | 'relationship-maintenance';
  notes: string;
  outcome: 'positive' | 'neutral' | 'negative' | 'no-response';
  nextAction?: {
    action: string;
    scheduledDate: Date;
  };
  eventId?: string; // If related to a specific event
}

export interface ClientEventHistory {
  id: string;
  clientId: string;
  eventId: string;
  eventName: string;
  eventDate: Date;
  eventType: string;
  attendeeCount: number;
  totalRevenue: number;
  profitMargin: number;
  guestFeedbackScore: number; // 1-10
  issues: ClientEventIssue[];
  salesRep: string;
  satisfactionLevel: 'very-dissatisfied' | 'dissatisfied' | 'neutral' | 'satisfied' | 'very-satisfied';
  repeatBookingLikelihood: number; // 0-100
}

export interface ClientEventIssue {
  id: string;
  eventId: string;
  category: 'catering' | 'venue' | 'av-tech' | 'service' | 'billing' | 'logistics' | 'other';
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  description: string;
  resolution: string;
  resolutionDate?: Date;
  preventionNotes?: string;
  wasResolved: boolean;
  impactOnSatisfaction: number; // -10 to 0
}

export interface SlowPeriodOutreach {
  id: string;
  clientId: string;
  targetContactDate: Date;
  reason: string;
  lastEventDate: Date;
  monthsToSlowPeriod: number;
  suggestedEventTypes: string[];
  estimatedBudgetRange: { min: number; max: number };
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'scheduled' | 'contacted' | 'completed' | 'deferred';
  assignedSalesRep?: string;
  createdDate: Date;
}

export interface LegacyClientReassignment {
  id: string;
  clientId: string;
  formerSalesRep: string;
  formerRepDepartureDate: Date;
  clientValue: {
    annualRevenue: number;
    profitMargin: number;
    eventFrequency: number;
  };
  difficultyAssessment: {
    score: number; // 1-10
    factors: string[];
    notes: string;
  };
  businessWorthAssessment: {
    isWorthRetaining: boolean;
    reasons: string[];
    estimatedCostToMaintain: number;
  };
  reassignmentDecision: 'reassign' | 'decline' | 'pending';
  newSalesRep?: string;
  decisionMadeBy: string;
  decisionDate?: Date;
  decisionNotes?: string;
  denialReason?: string; // Required if declined
  forceRequiredReason?: string; // For difficult cases that were forced to reassign
}

export interface WhaleClientAnalysis {
  id: string;
  clientId: string;
  analysisDate: Date;
  metrics: {
    annualValue: number;
    profitMargin: number;
    eventFrequency: number;
    averageEventSize: number;
    loyaltyYears: number;
    referralCount: number;
  };
  percentileRank: number; // 96-100 for whale clients (top 4%)
  retentionStrategies: string[];
  riskFactors: string[];
  nextReviewDate: Date;
  assignedAccountManager: string;
}

export interface SweetSpotAnalysis {
  id: string;
  businessSegment: string;
  optimalClientProfile: {
    industryTypes: string[];
    companySizeRange: string[];
    budgetRange: { min: number; max: number };
    eventFrequency: string;
    profitMarginTarget: number;
    difficultyThreshold: number;
  };
  performanceMetrics: {
    averageAcquisitionCost: number;
    averageLifetimeValue: number;
    conversionRate: number;
    retentionRate: number;
  };
  recommendedAllocation: {
    salesEffortPercentage: number;
    marketingBudgetPercentage: number;
  };
  lastUpdated: Date;
}
