// Sales Pipeline Types for Hospitality CRM

export interface Deal {
  id: string;
  leadId: string;
  name: string;
  description: string;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  eventDetails?: {
    eventType: string;
    eventDate: Date;
    guestCount: number;
    venue: string;
    requirements: string[];
    specialRequests?: string;
  };
  activities: DealActivity[];
  proposals: Proposal[];
  objections: Objection[];
  competitors: string[];
  tags: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  temperature: 'hot' | 'warm' | 'cold';
  assignedTo: string;
  createdAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  eventType?: string;
  estimatedValue?: number;
  notes: string;
  tags: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  order: number;
  probability: number;
  color: string;
  isActive: boolean;
}

export interface SalesActivity {
  id: string;
  dealId: string;
  leadId?: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'note';
  title: string;
  description: string;
  completedAt: Date;
  completedBy: string;
  outcome?: 'positive' | 'neutral' | 'negative';
  nextSteps?: string[];
}

export interface Objection {
  id: string;
  dealId: string;
  type: 'price' | 'timing' | 'authority' | 'competition' | 'value' | 'need';
  objection: string;
  response?: string;
  handledBy?: string;
  handledAt?: Date;
  resolved: boolean;
}

export interface DealActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'objection' | 'note';
  title: string;
  description: string;
  completedAt: Date;
  completedBy: string;
  outcome?: 'positive' | 'neutral' | 'negative';
}

export interface Proposal {
  id: string;
  dealId: string;
  name: string;
  value: number;
  sentAt: Date;
  viewedAt?: Date;
  respondedAt?: Date;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  version: number;
}

export interface SalesMetrics {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  newLeads: number;
  qualifiedLeads: number;
  proposals: number;
  closedWon: number;
  closedLost: number;
  totalRevenue: number;
  averageDealSize: number;
  salesCycleLength: number;
  leadToQualified: number;
  qualifiedToProposal: number;
  proposalToClose: number;
  overallConversion: number;
  calls: number;
  emails: number;
  meetings: number;
  demos: number;
  topPerformers: {
    salesPerson: string;
    revenue: number;
    deals: number;
    activities: number;
  }[];
  pipelineValue: number;
  weightedPipeline: number;
  forecastAccuracy: number;
}

export interface DailyTodo {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'follow_up' | 'demo' | 'admin';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date;
  dueTime?: string;
  completed: boolean;
  completedAt?: Date;
  leadId?: string;
  dealId?: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  followUpType?: 'cold_outreach' | 'warm_lead' | 'proposal_follow_up' | 'check_in' | 'post_meeting';
  emailIntegration?: {
    templateId?: string;
    emailsSent: number;
    lastEmailSent?: Date;
    trackingEnabled: boolean;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'cold_outreach' | 'follow_up' | 'proposal' | 'meeting_request' | 'thank_you' | 'objection_handling';
  variables: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  usageCount: number;
  successRate: number;
}

export interface EmailIntegration {
  id: string;
  provider: 'outlook' | 'gmail' | 'exchange';
  email: string;
  isConnected: boolean;
  lastSync?: Date;
  settings: {
    autoSync: boolean;
    syncInterval: number;
    trackOpens: boolean;
    trackClicks: boolean;
    syncSentItems: boolean;
    syncCalendar: boolean;
  };
  credentials: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
  };
}

// Default pipeline stages for hospitality industry
export const defaultHospitalityPipeline: PipelineStage[] = [
  {
    id: 'prospecting',
    name: 'Prospecting',
    description: 'Identifying and reaching out to potential clients',
    order: 1,
    probability: 10,
    color: '#6B7280',
    isActive: true
  },
  {
    id: 'initial_contact',
    name: 'Initial Contact',
    description: 'First meaningful conversation with prospect',
    order: 2,
    probability: 20,
    color: '#3B82F6',
    isActive: true
  },
  {
    id: 'qualified',
    name: 'Qualified Lead',
    description: 'Lead has been qualified and shows genuine interest',
    order: 3,
    probability: 35,
    color: '#10B981',
    isActive: true
  },
  {
    id: 'proposal',
    name: 'Proposal Sent',
    description: 'Formal proposal has been presented to client',
    order: 4,
    probability: 60,
    color: '#F59E0B',
    isActive: true
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    description: 'Active discussion on terms, pricing, and details',
    order: 5,
    probability: 80,
    color: '#EF4444',
    isActive: true
  },
  {
    id: 'closed_won',
    name: 'Closed Won',
    description: 'Deal successfully closed and contract signed',
    order: 6,
    probability: 100,
    color: '#059669',
    isActive: true
  },
  {
    id: 'closed_lost',
    name: 'Closed Lost',
    description: 'Deal was unsuccessful',
    order: 0,
    probability: 0,
    color: '#DC2626',
    isActive: true
  }
];

// Event types for hospitality industry
export const hospitalityEventTypes = [
  'wedding',
  'corporate',
  'conference',
  'gala',
  'birthday',
  'anniversary',
  'reunion',
  'fundraiser',
  'product_launch',
  'networking',
  'training',
  'seminar',
  'workshop',
  'exhibition',
  'awards_ceremony',
  'holiday_party',
  'other'
] as const;

export type HospitalityEventType = typeof hospitalityEventTypes[number];

// Lead sources
export const leadSources = [
  'website',
  'referral',
  'social_media',
  'email_marketing',
  'cold_outreach',
  'event',
  'advertisement',
  'partner',
  'google_ads',
  'content_marketing',
  'other'
] as const;

export type LeadSource = typeof leadSources[number];

export default defaultHospitalityPipeline;
