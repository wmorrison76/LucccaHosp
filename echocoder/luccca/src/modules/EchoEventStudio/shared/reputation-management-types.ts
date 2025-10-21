// Reputation Management Types
// This file defines all types for hospitality reputation monitoring and management
// Third-party integration points are commented throughout

export interface Review {
  id: string;
  platform: ReviewPlatform;
  externalId: string; // ID from the review platform
  
  // Guest Information
  guestId?: string; // link to guest profile if available
  reviewerName: string;
  reviewerLocation?: string;
  reviewerProfile?: ReviewerProfile;
  verified: boolean;
  
  // Review Content
  title?: string;
  content: string;
  language: string;
  
  // Ratings
  overallRating: number;
  maxRating: number; // 5 for most platforms, 10 for some
  categoryRatings: CategoryRating[];
  
  // Metadata
  reviewDate: Date;
  stayDate?: Date;
  roomType?: string;
  lengthOfStay?: number;
  
  // Analysis
  sentimentAnalysis: SentimentAnalysis;
  keywordTags: string[];
  topics: ReviewTopic[];
  
  // Response
  response?: ReviewResponse;
  
  // Internal tracking
  status: ReviewStatus;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  internalNotes?: string;
  
  // Platform specific data
  platformData?: any;
  
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewPlatform = 
  | 'tripadvisor'
  | 'google'
  | 'booking'
  | 'expedia'
  | 'hotels'
  | 'yelp'
  | 'airbnb'
  | 'agoda'
  | 'facebook'
  | 'internal';

export interface ReviewerProfile {
  totalReviews: number;
  memberSince?: Date;
  helpfulVotes?: number;
  badgeLevel?: string;
  isInfluencer: boolean;
  followerCount?: number;
  averageRating?: number;
  reviewFrequency: 'frequent' | 'occasional' | 'rare';
}

export interface CategoryRating {
  category: ReviewCategory;
  rating: number;
  maxRating: number;
}

export type ReviewCategory = 
  | 'service'
  | 'cleanliness'
  | 'location'
  | 'value'
  | 'amenities'
  | 'rooms'
  | 'food'
  | 'staff'
  | 'atmosphere'
  | 'wifi'
  | 'comfort'
  | 'facilities';

export interface SentimentAnalysis {
  overallSentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  sentimentScore: number; // -1 to 1
  confidence: number; // 0 to 1
  
  // Detailed sentiment by category
  categorySentiments: {
    [category in ReviewCategory]?: {
      sentiment: 'positive' | 'negative' | 'neutral';
      score: number;
      confidence: number;
      mentions: string[]; // specific text mentions
    };
  };
  
  // Emotion analysis
  emotions: EmotionAnalysis;
  
  // Language analysis
  tone: 'professional' | 'casual' | 'frustrated' | 'enthusiastic' | 'disappointed';
  urgency: 'low' | 'medium' | 'high';
  
  // AI model information
  // TODO: Connect to sentiment analysis APIs like AWS Comprehend, Google Cloud Natural Language
  modelVersion?: string;
  processingDate: Date;
}

export interface EmotionAnalysis {
  joy: number;
  anger: number;
  fear: number;
  sadness: number;
  surprise: number;
  disgust: number;
  trust: number;
  anticipation: number;
}

export interface ReviewTopic {
  topic: string;
  confidence: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  
  // Topic categories
  category: 'service-issue' | 'facility-issue' | 'praise' | 'suggestion' | 'complaint' | 'compliment';
  actionable: boolean;
  department?: string; // which department should handle this
}

export interface ReviewResponse {
  id: string;
  responseText: string;
  responseDate: Date;
  respondedBy: string;
  responseType: 'public' | 'private';
  
  // Response quality metrics
  tone: 'professional' | 'personal' | 'defensive' | 'apologetic' | 'grateful';
  addressesIssues: boolean;
  includesAction: boolean;
  
  // Engagement metrics
  likes?: number;
  replies?: number;
  
  // Template information
  templateUsed?: string;
  personalized: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewStatus = 
  | 'new'
  | 'acknowledged'
  | 'investigating'
  | 'responded'
  | 'escalated'
  | 'resolved'
  | 'archived';

export interface ReputationMetrics {
  propertyId: string;
  period: { start: Date; end: Date };
  
  // Overall metrics
  overallRating: number;
  totalReviews: number;
  reviewVolume: number; // reviews per month
  responseRate: number; // percentage of reviews responded to
  averageResponseTime: number; // hours
  
  // Rating distribution
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  
  // Platform breakdown
  platformMetrics: PlatformMetrics[];
  
  // Category performance
  categoryScores: {
    [category in ReviewCategory]?: {
      averageRating: number;
      totalMentions: number;
      sentiment: number; // -1 to 1
      trend: 'improving' | 'declining' | 'stable';
    };
  };
  
  // Sentiment analysis
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
    mixed: number;
  };
  
  // Competitive benchmarking
  competitorComparison?: CompetitorComparison;
  
  // Key insights
  topCompliments: string[];
  topComplaints: string[];
  trendingTopics: TrendingTopic[];
  
  // Response performance
  responseMetrics: ResponseMetrics;
  
  calculatedAt: Date;
}

export interface PlatformMetrics {
  platform: ReviewPlatform;
  averageRating: number;
  totalReviews: number;
  recentReviews: number; // reviews in current period
  responseRate: number;
  averageResponseTime: number;
  sentimentScore: number;
  
  // Platform-specific metrics
  ranking?: number; // ranking on the platform
  totalViews?: number;
  photoCount?: number;
  
  // Trends
  ratingTrend: 'up' | 'down' | 'stable';
  volumeTrend: 'up' | 'down' | 'stable';
}

export interface CompetitorComparison {
  competitorCount: number;
  ranking: number;
  averageCompetitorRating: number;
  ratingGap: number; // vs average competitor
  volumeRank: number; // based on review volume
  responseRateRank: number;
  
  topCompetitors: CompetitorMetrics[];
  
  // Market insights
  marketAverageRating: number;
  marketAverageVolume: number;
  marketAverageResponseRate: number;
}

export interface CompetitorMetrics {
  competitorId: string;
  competitorName: string;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  lastUpdated: Date;
}

export interface TrendingTopic {
  topic: string;
  mentionCount: number;
  sentimentScore: number;
  trend: 'rising' | 'falling' | 'stable';
  platforms: ReviewPlatform[];
  
  // Impact assessment
  impactLevel: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  suggestedActions: string[];
}

export interface ResponseMetrics {
  totalResponses: number;
  responseRate: number;
  averageResponseTime: number; // hours
  medianResponseTime: number;
  
  // Response quality
  averageResponseLength: number; // characters
  personalizationRate: number; // percentage of personalized responses
  
  // Response performance by rating
  responseRateByRating: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  
  // Staff performance
  staffResponseMetrics: StaffResponseMetrics[];
  
  // Template usage
  templateUsage: TemplateUsage[];
}

export interface StaffResponseMetrics {
  staffId: string;
  staffName: string;
  responsesCount: number;
  averageResponseTime: number;
  responseQualityScore: number; // 1-10 based on various factors
  customerSatisfactionScore?: number; // if available from follow-ups
}

export interface TemplateUsage {
  templateId: string;
  templateName: string;
  usageCount: number;
  averageRating: number; // of reviews where template was used
  effectivenessScore: number; // based on subsequent engagement
}

export interface ReputationAlert {
  id: string;
  type: AlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Alert content
  title: string;
  description: string;
  details: Record<string, any>;
  
  // Trigger information
  triggeredBy: string; // what caused the alert
  triggerThreshold?: number;
  actualValue?: number;
  
  // Assignment and resolution
  assignedTo?: string;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'dismissed';
  resolution?: string;
  resolvedAt?: Date;
  
  // Related entities
  reviewIds?: string[];
  platformIds?: ReviewPlatform[];
  
  createdAt: Date;
  updatedAt: Date;
}

export type AlertType = 
  | 'negative-review'
  | 'rating-drop'
  | 'review-volume-spike'
  | 'competitor-outperforming'
  | 'slow-response-time'
  | 'trending-complaint'
  | 'influential-reviewer'
  | 'fake-review-suspected'
  | 'crisis-potential';

export interface ReputationCampaign {
  id: string;
  name: string;
  description: string;
  
  // Campaign configuration
  type: CampaignType;
  objectives: string[];
  targetPlatforms: ReviewPlatform[];
  
  // Timing
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  
  // Targeting
  guestSegments: string[];
  triggerConditions: CampaignTrigger[];
  
  // Content
  emailTemplate?: string;
  smsTemplate?: string;
  incentives?: CampaignIncentive[];
  
  // Performance tracking
  metrics: CampaignMetrics;
  
  // Automation settings
  automated: boolean;
  automationRules: AutomationRule[];
  
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignType = 
  | 'review-solicitation'
  | 'reputation-recovery'
  | 'positive-amplification'
  | 'competitor-monitoring'
  | 'crisis-management';

export interface CampaignTrigger {
  event: 'checkout' | 'stay-completion' | 'negative-review' | 'positive-review' | 'anniversary';
  delay: number; // hours after event
  conditions: TriggerCondition[];
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface CampaignIncentive {
  type: 'discount' | 'upgrade' | 'amenity' | 'points';
  value: string;
  description: string;
  expirationDays: number;
}

export interface CampaignMetrics {
  invitationsSent: number;
  reviewsReceived: number;
  conversionRate: number;
  averageRatingReceived: number;
  platformDistribution: { [platform: string]: number };
  
  // ROI metrics
  cost: number;
  estimatedValue: number; // value of positive reviews received
  roi: number;
  
  // Engagement metrics
  emailOpenRate?: number;
  emailClickRate?: number;
  smsResponseRate?: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  
  // Trigger conditions
  triggers: AutomationTrigger[];
  
  // Actions to take
  actions: AutomationAction[];
  
  // Scheduling
  enabled: boolean;
  schedule?: AutomationSchedule;
  
  // Performance
  executionCount: number;
  successRate: number;
  lastExecuted?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationTrigger {
  type: 'new-review' | 'rating-threshold' | 'keyword-detection' | 'competitor-change' | 'time-based';
  conditions: TriggerCondition[];
  platforms?: ReviewPlatform[];
}

export interface AutomationAction {
  type: 'send-notification' | 'assign-review' | 'auto-respond' | 'escalate' | 'tag-review' | 'update-status';
  parameters: Record<string, any>;
  delay?: number; // minutes to wait before executing
}

export interface AutomationSchedule {
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  timeOfDay?: string; // HH:MM format
  timezone: string;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  description: string;
  
  // Template content
  subject?: string; // for private responses
  content: string;
  
  // Usage conditions
  platforms: ReviewPlatform[];
  ratingRange: { min: number; max: number };
  keywords?: string[]; // when to suggest this template
  categories?: ReviewCategory[];
  
  // Personalization
  personalizationFields: PersonalizationField[];
  dynamicContent: DynamicContent[];
  
  // Performance tracking
  usageCount: number;
  averageEffectiveness: number; // based on follow-up engagement
  lastUsed?: Date;
  
  // Approval workflow
  requiresApproval: boolean;
  approvedBy?: string;
  approvalDate?: Date;
  
  // Version control
  version: number;
  previousVersions?: string[];
  
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalizationField {
  field: string; // guest_name, room_type, stay_date, etc.
  placeholder: string; // {{guest_name}}
  required: boolean;
  defaultValue?: string;
}

export interface DynamicContent {
  condition: string; // JavaScript-like condition
  content: string;
  fallbackContent?: string;
}

export interface SocialMediaMention {
  id: string;
  platform: SocialPlatform;
  externalId: string;
  
  // Author information
  authorName: string;
  authorHandle: string;
  authorFollowers?: number;
  authorVerified: boolean;
  authorInfluencer: boolean;
  
  // Content
  content: string;
  mediaUrls: string[];
  hashtags: string[];
  mentions: string[];
  
  // Engagement metrics
  likes: number;
  shares: number;
  comments: number;
  reach?: number;
  impressions?: number;
  
  // Analysis
  sentiment: SentimentAnalysis;
  topics: string[];
  brand_mention: boolean;
  property_tagged: boolean;
  
  // Response
  response?: SocialResponse;
  
  // Internal tracking
  status: 'new' | 'acknowledged' | 'responded' | 'escalated' | 'resolved';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Timestamps
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type SocialPlatform = 
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'youtube'
  | 'reddit'
  | 'foursquare';

export interface SocialResponse {
  id: string;
  responseType: 'reply' | 'direct-message' | 'quote-tweet' | 'comment';
  content: string;
  responseDate: Date;
  respondedBy: string;
  
  // Engagement on response
  likes?: number;
  shares?: number;
  replies?: number;
  
  createdAt: Date;
}

export interface ReputationReport {
  id: string;
  reportType: 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'custom';
  period: { start: Date; end: Date };
  
  // Executive summary
  executiveSummary: ExecutiveSummary;
  
  // Detailed metrics
  performanceMetrics: ReputationMetrics;
  
  // Trends and analysis
  trends: TrendAnalysis[];
  
  // Competitive insights
  competitiveAnalysis: CompetitiveInsights;
  
  // Key findings
  keyFindings: KeyFinding[];
  
  // Recommendations
  recommendations: Recommendation[];
  
  // Action items
  actionItems: ActionItem[];
  
  // Appendices
  rawData?: any;
  methodology?: string;
  
  generatedAt: Date;
  generatedBy: string;
}

export interface ExecutiveSummary {
  overallRating: number;
  ratingChange: number; // vs previous period
  totalReviews: number;
  reviewGrowth: number; // vs previous period
  
  // Key highlights
  highlights: string[];
  concerns: string[];
  
  // Performance indicators
  performanceIndicators: {
    reputation: 'excellent' | 'good' | 'average' | 'poor';
    trend: 'improving' | 'stable' | 'declining';
    marketPosition: 'leading' | 'competitive' | 'lagging';
  };
}

export interface TrendAnalysis {
  metric: string;
  period: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number; // percentage change
  significance: 'high' | 'medium' | 'low';
  explanation: string;
  
  // Supporting data
  dataPoints: { date: Date; value: number }[];
  correlations?: CorrelationInsight[];
}

export interface CorrelationInsight {
  factor: string;
  correlation: number; // -1 to 1
  explanation: string;
}

export interface CompetitiveInsights {
  marketRanking: number;
  rankingChange: number;
  marketShare: number;
  
  // Key competitors
  topCompetitors: CompetitorInsight[];
  
  // Competitive advantages
  advantages: string[];
  disadvantages: string[];
  
  // Opportunities
  marketOpportunities: string[];
}

export interface CompetitorInsight {
  name: string;
  rating: number;
  ratingChange: number;
  reviews: number;
  strengths: string[];
  weaknesses: string[];
}

export interface KeyFinding {
  type: 'positive' | 'negative' | 'neutral' | 'opportunity' | 'threat';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  evidence: string[];
  recommendations: string[];
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'operations' | 'marketing' | 'training' | 'technology' | 'policy';
  title: string;
  description: string;
  
  // Implementation details
  estimatedEffort: 'low' | 'medium' | 'high';
  timeline: string;
  resources: string[];
  
  // Expected impact
  expectedImpact: string;
  successMetrics: string[];
  
  // Dependencies
  dependencies?: string[];
  risks?: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  
  // Related entities
  relatedReviews?: string[];
  relatedFindings?: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

// Integration interfaces for third-party platforms
export interface PlatformIntegration {
  platform: ReviewPlatform | SocialPlatform;
  enabled: boolean;
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  lastSync?: Date;
  
  // Platform-specific configuration
  configuration: Record<string, any>;
  
  // Sync settings
  syncFrequency: 'real-time' | 'hourly' | 'daily' | 'weekly';
  dataRetention: number; // days
  
  // Rate limiting
  rateLimitRemaining?: number;
  rateLimitReset?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Platform-specific integration interfaces
export interface TripAdvisorIntegration {
  // TripAdvisor Content API configuration
  apiKey: string;
  propertyId: string;
  webhookUrl?: string;
}

export interface GoogleIntegration {
  // Google My Business API configuration
  businessAccountId: string;
  locationId: string;
  refreshToken: string;
}

export interface BookingIntegration {
  // Booking.com Partner API configuration
  hotelId: string;
  apiKey: string;
  channelManagerId?: string;
}

// Default response templates
export const defaultResponseTemplates: ResponseTemplate[] = [
  {
    id: 'positive-general',
    name: 'Positive Review - General',
    description: 'Standard thank you response for positive reviews',
    content: 'Dear {{guest_name}}, Thank you so much for taking the time to share your wonderful experience! We\'re thrilled to hear that you enjoyed your stay with us. Your kind words mean the world to our team. We look forward to welcoming you back soon!',
    platforms: ['tripadvisor', 'google', 'booking', 'expedia'],
    ratingRange: { min: 4, max: 5 },
    personalizationFields: [
      { field: 'guest_name', placeholder: '{{guest_name}}', required: true },
      { field: 'specific_mention', placeholder: '{{specific_mention}}', required: false }
    ],
    dynamicContent: [],
    usageCount: 0,
    averageEffectiveness: 0,
    requiresApproval: false,
    version: 1,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'negative-service',
    name: 'Negative Review - Service Issues',
    description: 'Apologetic response for service-related complaints',
    content: 'Dear {{guest_name}}, Thank you for bringing this to our attention. We sincerely apologize that your experience did not meet your expectations, particularly regarding {{issue_area}}. We take all feedback seriously and are already working to address these concerns. I would love the opportunity to discuss this further with you directly. Please feel free to contact me at [contact_info]. We hope to have the chance to provide you with a much better experience in the future.',
    platforms: ['tripadvisor', 'google', 'booking', 'expedia'],
    ratingRange: { min: 1, max: 3 },
    categories: ['service', 'staff'],
    personalizationFields: [
      { field: 'guest_name', placeholder: '{{guest_name}}', required: true },
      { field: 'issue_area', placeholder: '{{issue_area}}', required: true },
      { field: 'contact_info', placeholder: '[contact_info]', required: true }
    ],
    dynamicContent: [],
    usageCount: 0,
    averageEffectiveness: 0,
    requiresApproval: true,
    version: 1,
    createdBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Default automation rules
export const defaultAutomationRules: AutomationRule[] = [
  {
    id: 'urgent-negative-alert',
    name: 'Urgent Negative Review Alert',
    description: 'Send immediate notification for 1-2 star reviews',
    triggers: [
      {
        type: 'new-review',
        conditions: [
          { field: 'overallRating', operator: 'less_than', value: 3 }
        ]
      }
    ],
    actions: [
      {
        type: 'send-notification',
        parameters: {
          recipients: ['manager@hotel.com'],
          message: 'Urgent: New negative review requires immediate attention'
        }
      },
      {
        type: 'assign-review',
        parameters: {
          assignTo: 'guest-relations-manager'
        }
      }
    ],
    enabled: true,
    executionCount: 0,
    successRate: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'response-reminder',
    name: 'Response Time Reminder',
    description: 'Remind staff to respond to reviews older than 24 hours',
    triggers: [
      {
        type: 'time-based',
        conditions: [
          { field: 'hours_since_review', operator: 'greater_than', value: 24 },
          { field: 'has_response', operator: 'equals', value: false }
        ]
      }
    ],
    actions: [
      {
        type: 'send-notification',
        parameters: {
          recipients: ['assigned_staff'],
          message: 'Reminder: Review response pending for over 24 hours'
        }
      }
    ],
    enabled: true,
    schedule: {
      frequency: 'daily',
      timeOfDay: '09:00',
      timezone: 'UTC'
    },
    executionCount: 0,
    successRate: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default defaultResponseTemplates;
