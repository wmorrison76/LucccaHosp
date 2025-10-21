/**
 * Sales Commission and User Profile Types
 * Comprehensive commission tracking, sales goals, and performance metrics
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'sales_agent' | 'manager' | 'director' | 'admin';
  avatar: string;
  phone: string;
  startDate: string;
  isActive: boolean;
  commissionSettings: CommissionSettings;
  salesGoals: SalesGoals;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommissionSettings {
  baseCommissionRate: number; // Percentage (e.g., 5.5 for 5.5%)
  tieredRates: TieredCommissionRate[];
  bonusStructure: BonusStructure[];
  isActive: boolean;
  effectiveDate: string;
  paymentSchedule: 'monthly' | 'quarterly' | 'annual';
  clawbackPeriod: number; // Days for clawback if client cancels
}

export interface TieredCommissionRate {
  id: string;
  threshold: number; // Dollar amount threshold
  rate: number; // Commission rate for this tier
  description: string;
}

export interface BonusStructure {
  id: string;
  type: 'goal_achievement' | 'quality_bonus' | 'retention_bonus' | 'upsell_bonus';
  threshold: number;
  amount: number; // Fixed amount or percentage
  isPercentage: boolean;
  description: string;
  period: 'monthly' | 'quarterly' | 'annual';
}

export interface SalesGoals {
  currentPeriod: string; // e.g., "2024-Q1"
  monthlyRevenue: number;
  quarterlyRevenue: number;
  annualRevenue: number;
  monthlyClients: number;
  quarterlyClients: number;
  annualClients: number;
  conversionRate: number; // Target conversion rate percentage
  averageDealSize: number;
  retentionRate: number;
  upsellTarget: number;
  prospectingTarget: number; // Weekly prospecting target (15 per week)
  lastUpdated: string;
}

export interface CommissionRecord {
  id: string;
  userId: string;
  dealId: string;
  clientId: string;
  clientName: string;
  dealValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'approved' | 'paid' | 'clawed_back' | 'disputed';
  earnedDate: string;
  paymentDate?: string;
  payPeriod: string; // e.g., "2024-01"
  bonusesApplied: AppliedBonus[];
  notes: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppliedBonus {
  bonusId: string;
  type: string;
  amount: number;
  description: string;
}

export interface SalesPerformance {
  userId: string;
  period: string;
  revenue: {
    actual: number;
    target: number;
    percentage: number;
  };
  clients: {
    actual: number;
    target: number;
    percentage: number;
  };
  deals: {
    won: number;
    lost: number;
    pending: number;
    conversionRate: number;
  };
  commission: {
    earned: number;
    paid: number;
    pending: number;
  };
  pipeline: {
    qualified: number;
    proposal: number;
    negotiation: number;
    totalValue: number;
  };
  activities: {
    calls: number;
    emails: number;
    meetings: number;
    proposals: number;
  };
  qualityMetrics: {
    clientSatisfaction: number;
    retentionRate: number;
    upsellRate: number;
    averageDealSize: number;
  };
}

export interface ClientInteraction {
  id: string;
  clientId: string;
  userId: string;
  type: 'call_talked' | 'call_voicemail' | 'call_no_answer' | 'call_unresponsive' | 'email_sent' | 'email_received' | 'meeting_onsite' | 'meeting_offsite' | 'meeting_virtual' | 'travel_meeting';
  outcome: 'positive' | 'neutral' | 'negative' | 'follow_up_needed' | 'proposal_requested' | 'deal_advanced' | 'deal_stalled' | 'deal_lost';
  duration?: number; // For calls and meetings (in minutes)
  notes: string;
  nextAction?: string;
  nextActionDate?: string;
  location?: string; // For travel meetings
  attachments: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientBudgetTracking {
  id: string;
  clientId: string;
  userId: string;
  totalBudget: number;
  spentAmount: number;
  budgetCategories: BudgetCategory[];
  isOverBudget: boolean;
  directorApproval?: DirectorApproval;
  roi: number; // Return on investment
  costPerAcquisition: number;
  clientValue: number; // Lifetime value or current deal value
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  description: string;
  expenseItems: ExpenseItem[];
}

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  approvedBy?: string;
  receiptUrl?: string;
}

export interface DirectorApproval {
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  status: 'pending' | 'approved' | 'denied';
  originalBudget: number;
  requestedBudget: number;
  reason: string;
  directorNotes?: string;
}

export interface ProspectingActivity {
  id: string;
  userId: string;
  date: string;
  prospectsContacted: number;
  qualified: number;
  notQualified: number;
  followUpScheduled: number;
  sources: ProspectSource[];
  notes: string;
  weeklyTarget: number; // Usually 15 per week
  createdAt: string;
}

export interface ProspectSource {
  source: string;
  count: number;
}

export interface SalesTarget {
  period: string;
  type: 'revenue' | 'clients' | 'conversion' | 'retention';
  target: number;
  actual: number;
  unit: 'dollars' | 'count' | 'percentage';
  description: string;
}

// 10:3:1 Ratio tracking
export interface SalesRatioTracking {
  userId: string;
  period: string;
  qualifiedProspects: number; // Should be 10
  expectedClients: number; // Should be 3
  immediateAction: number; // Should be 1
  actualResults: {
    convertedClients: number;
    immediateDeals: number;
  };
  ratioPerformance: {
    prospectToClientRatio: number; // Actual ratio vs 10:3
    clientToActionRatio: number; // Actual ratio vs 3:1
    overallEfficiency: number; // Percentage of target efficiency
  };
  weeklyTargets: {
    prospectsTarget: number; // 15 per week
    actualProspects: number;
    weekNumber: number;
  }[];
  longTermGoals: {
    regularClients: number; // Target: 40 after 6-12 months
    idealTarget: number; // Target: 80 clients
    currentRegularClients: number;
    contractClients: number; // Multi-year contracts
  };
}

export interface MassEmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  templateId?: string;
  recipientLists: string[];
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  repliedCount: number;
  unsubscribedCount: number;
  bouncedCount: number;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'completed';
  scheduledDate?: string;
  sentDate?: string;
  completedDate?: string;
  createdBy: string;
  tags: string[];
  analytics: EmailAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface EmailAnalytics {
  openRate: number;
  clickRate: number;
  replyRate: number;
  unsubscribeRate: number;
  bounceRate: number;
  conversionRate: number;
  generatedLeads: number;
  qualifiedLeads: number;
  revenue: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'follow_up' | 'proposal' | 'thank_you' | 'nurture' | 'promotional' | 'event_invitation';
  variables: TemplateVariable[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
}

export interface LeadScore {
  clientId: string;
  score: number;
  factors: ScoreFactor[];
  lastUpdated: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ScoreFactor {
  factor: string;
  weight: number;
  value: number;
  contribution: number;
}
