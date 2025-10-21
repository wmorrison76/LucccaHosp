// Guest Experience Management Types
// This file defines all types for hospitality guest management
// Third-party integration points are commented throughout

export interface Guest {
  id: string;
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  nationality?: string;
  language: string;
  
  // Contact Preferences
  preferredContactMethod: 'email' | 'phone' | 'sms' | 'whatsapp';
  marketingOptIn: boolean;
  communicationFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  
  // Guest Profile
  guestType: 'leisure' | 'business' | 'group' | 'vip' | 'returning';
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'none';
  lifetimeValue: number;
  averageSpend: number;
  totalStays: number;
  
  // Preferences & Special Needs
  preferences: GuestPreferences;
  specialRequests: string[];
  allergies: string[];
  accessibilityNeeds: string[];
  
  // Social & Reviews
  socialProfiles: SocialProfile[];
  reviewHistory: ReviewHistory[];
  
  // System Data
  createdAt: Date;
  updatedAt: Date;
  lastStayDate?: Date;
  nextReservationDate?: Date;
  
  // PMS Integration Fields
  // TODO: Connect to Cloud PMS Pro, Hotel Management Suite, or Fidelio
  pmsGuestId?: string;
  pmsProfile?: any; // Will be replaced with actual PMS guest profile structure
  
  // Marketing Integration
  // TODO: Connect to Mailchimp, SendGrid, or similar
  marketingSegments: string[];
  emailEngagementScore: number;
}

export interface GuestPreferences {
  // Room Preferences
  roomType: string[];
  floor: 'low' | 'high' | 'any';
  bedType: 'twin' | 'queen' | 'king' | 'any';
  smokingRoom: boolean;
  quietRoom: boolean;
  
  // Amenity Preferences
  amenities: string[]; // Pool, Gym, Spa, Restaurant, etc.
  services: string[]; // Housekeeping, Concierge, Room Service, etc.
  
  // Dining Preferences
  dietaryRestrictions: string[];
  favoriteRestaurants: string[];
  cuisinePreferences: string[];
  drinkPreferences: string[];
  
  // Activity Preferences
  interests: string[];
  activityLevel: 'low' | 'medium' | 'high';
  groupSize: 'solo' | 'couple' | 'family' | 'group';
  
  // Business Preferences (for business travelers)
  meetingRoomNeeds: boolean;
  businessCenterAccess: boolean;
  earlyCheckIn: boolean;
  lateCheckOut: boolean;
  loyaltyPrograms: string[];
}

export interface SocialProfile {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  profileUrl: string;
  followerCount?: number;
  influencerStatus: boolean;
  lastUpdated: Date;
}

export interface ReviewHistory {
  id: string;
  platform: 'tripadvisor' | 'google' | 'booking' | 'expedia' | 'yelp' | 'internal';
  rating: number; // 1-5 or 1-10 depending on platform
  reviewText: string;
  reviewDate: Date;
  propertyResponse?: string;
  responseDate?: Date;
  sentimentScore: number; // -1 to 1, calculated by sentiment analysis
  categories: ReviewCategory[];
  verified: boolean;
  
  // TODO: Connect to reputation management APIs
  // ReviewPro, TrustYou, or similar platforms
  externalReviewId?: string;
  platformSpecificData?: any;
}

export interface ReviewCategory {
  category: 'service' | 'cleanliness' | 'location' | 'value' | 'amenities' | 'food' | 'room';
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Reservation {
  id: string;
  guestId: string;
  confirmationNumber: string;
  
  // Dates & Occupancy
  checkInDate: Date;
  checkOutDate: Date;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  
  // Room & Rate Information
  roomType: string;
  roomNumber?: string;
  rateCode: string;
  roomRate: number;
  totalAmount: number;
  currency: string;
  
  // Booking Details
  bookingSource: 'direct' | 'ota' | 'gds' | 'phone' | 'walk-in' | 'corporate';
  bookingDate: Date;
  bookingAgent?: string;
  groupCode?: string;
  
  // Status & Payment
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  paymentMethod: string;
  
  // Guest Requests
  specialRequests: string[];
  roomPreferences: string[];
  arrivalTime?: string;
  departureTime?: string;
  
  // Revenue & Upsells
  packageDeals: string[];
  addOns: ReservationAddOn[];
  upsellOpportunities: UpsellOpportunity[];
  
  // Communication
  communicationLog: CommunicationEntry[];
  guestSatisfactionScore?: number;
  
  // PMS Integration
  // TODO: Sync with property management system
  pmsReservationId?: string;
  folioNumber?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationAddOn {
  id: string;
  type: 'spa' | 'dining' | 'activity' | 'transport' | 'package';
  name: string;
  description: string;
  price: number;
  date?: Date;
  time?: string;
  quantity: number;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled';
}

export interface UpsellOpportunity {
  id: string;
  type: 'room-upgrade' | 'package' | 'dining' | 'spa' | 'activity';
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice?: number;
  validUntil: Date;
  priority: 'high' | 'medium' | 'low';
  automatedOffer: boolean;
  conversionProbability: number; // 0-1, calculated by ML model
}

export interface GuestJourney {
  guestId: string;
  reservationId: string;
  
  // Journey Stages
  stages: JourneyStage[];
  currentStage: string;
  
  // Touchpoints
  touchpoints: Touchpoint[];
  
  // Satisfaction & Experience
  overallSatisfaction?: number;
  npsScore?: number;
  experienceRating?: number;
  
  // Journey Analytics
  engagementScore: number;
  responseRate: number;
  conversionEvents: ConversionEvent[];
  
  createdAt: Date;
  completedAt?: Date;
}

export interface JourneyStage {
  id: string;
  name: string;
  order: number;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  startDate?: Date;
  completedDate?: Date;
  
  // Stage-specific data
  expectedActions: string[];
  completedActions: string[];
  automatedMessages: AutomatedMessage[];
  
  // Personalization
  personalizedContent: PersonalizedContent[];
  recommendations: Recommendation[];
}

export interface Touchpoint {
  id: string;
  type: 'email' | 'sms' | 'push' | 'phone' | 'in-person' | 'app' | 'website';
  channel: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
  
  // Content
  subject?: string;
  message: string;
  attachments: string[];
  
  // Engagement
  opened?: boolean;
  clicked?: boolean;
  responded?: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
  
  // Staff Information
  staffMember?: string;
  department?: string;
  
  // Integration Data
  // TODO: Connect to communication platforms
  externalMessageId?: string;
  platformData?: any;
}

export interface CommunicationEntry {
  id: string;
  timestamp: Date;
  type: 'email' | 'sms' | 'phone' | 'chat' | 'in-person' | 'system';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  staffMember?: string;
  department?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read' | 'responded' | 'failed';
  
  // Follow-up tracking
  requiresFollowUp: boolean;
  followUpDate?: Date;
  followUpCompleted?: boolean;
  
  // Automation flags
  automated: boolean;
  templateUsed?: string;
  
  // External integration IDs
  // TODO: Connect to email/SMS providers
  externalId?: string;
  campaignId?: string;
}

export interface AutomatedMessage {
  id: string;
  name: string;
  type: 'pre-arrival' | 'arrival' | 'in-stay' | 'departure' | 'post-stay';
  channel: 'email' | 'sms' | 'push' | 'in-app';
  
  // Timing
  triggerEvent: string;
  delayHours: number;
  sendTime?: string; // Specific time of day
  
  // Content
  subject: string;
  content: string;
  personalizedFields: string[];
  
  // Targeting
  guestSegments: string[];
  conditions: MessageCondition[];
  
  // Performance
  enabled: boolean;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  
  // A/B Testing
  isTestVariant: boolean;
  testGroup?: 'A' | 'B';
  
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'exists';
  value: any;
}

export interface PersonalizedContent {
  type: 'offer' | 'recommendation' | 'information' | 'upsell';
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  priority: number;
  validUntil?: Date;
  
  // Personalization data
  personalizationScore: number;
  basedon: string[]; // preferences, history, behavior, etc.
}

export interface Recommendation {
  id: string;
  type: 'room' | 'dining' | 'activity' | 'spa' | 'local-attraction' | 'package';
  title: string;
  description: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  
  // Recommendation logic
  confidence: number; // 0-1
  reasoning: string[];
  algorithm: 'collaborative-filtering' | 'content-based' | 'hybrid' | 'manual';
  
  // Performance tracking
  impressions: number;
  clicks: number;
  conversions: number;
  
  createdAt: Date;
  expiresAt?: Date;
}

export interface ConversionEvent {
  id: string;
  type: 'booking' | 'upsell' | 'add-on' | 'package' | 'review' | 'referral';
  timestamp: Date;
  value: number;
  currency: string;
  
  // Attribution
  touchpointId?: string;
  campaignId?: string;
  source: string;
  
  // Details
  details: Record<string, any>;
}

export interface GuestSegment {
  id: string;
  name: string;
  description: string;
  
  // Segmentation criteria
  criteria: SegmentCriteria[];
  
  // Segment analytics
  guestCount: number;
  averageLifetimeValue: number;
  averageStayValue: number;
  conversionRate: number;
  
  // Marketing performance
  campaignPerformance: CampaignPerformance[];
  
  // Automation
  automatedCampaigns: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface SegmentCriteria {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'between';
  value: any;
  values?: any[]; // for 'in' operator
  logicalOperator: 'AND' | 'OR';
}

export interface CampaignPerformance {
  campaignId: string;
  campaignName: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  revenue: number;
  roi: number;
  lastSent: Date;
}

// Default guest segments for hospitality
export const defaultGuestSegments: GuestSegment[] = [
  {
    id: 'vip-guests',
    name: 'VIP Guests',
    description: 'High-value guests with lifetime value > $10,000',
    criteria: [
      { field: 'lifetimeValue', operator: 'greater_than', value: 10000, logicalOperator: 'AND' },
      { field: 'loyaltyTier', operator: 'in', values: ['gold', 'platinum'], logicalOperator: 'OR' }
    ],
    guestCount: 0,
    averageLifetimeValue: 0,
    averageStayValue: 0,
    conversionRate: 0,
    campaignPerformance: [],
    automatedCampaigns: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'business-travelers',
    name: 'Business Travelers',
    description: 'Guests traveling for business purposes',
    criteria: [
      { field: 'guestType', operator: 'equals', value: 'business', logicalOperator: 'AND' }
    ],
    guestCount: 0,
    averageLifetimeValue: 0,
    averageStayValue: 0,
    conversionRate: 0,
    campaignPerformance: [],
    automatedCampaigns: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'leisure-families',
    name: 'Leisure Families',
    description: 'Family travelers with children',
    criteria: [
      { field: 'guestType', operator: 'equals', value: 'leisure', logicalOperator: 'AND' },
      { field: 'preferences.groupSize', operator: 'equals', value: 'family', logicalOperator: 'AND' }
    ],
    guestCount: 0,
    averageLifetimeValue: 0,
    averageStayValue: 0,
    conversionRate: 0,
    campaignPerformance: [],
    automatedCampaigns: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'returning-guests',
    name: 'Returning Guests',
    description: 'Guests with multiple stays',
    criteria: [
      { field: 'totalStays', operator: 'greater_than', value: 1, logicalOperator: 'AND' }
    ],
    guestCount: 0,
    averageLifetimeValue: 0,
    averageStayValue: 0,
    conversionRate: 0,
    campaignPerformance: [],
    automatedCampaigns: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'at-risk-guests',
    name: 'At-Risk Guests',
    description: 'Guests who haven\'t stayed in over 12 months',
    criteria: [
      { field: 'totalStays', operator: 'greater_than', value: 0, logicalOperator: 'AND' },
      { field: 'lastStayDate', operator: 'less_than', value: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), logicalOperator: 'AND' }
    ],
    guestCount: 0,
    averageLifetimeValue: 0,
    averageStayValue: 0,
    conversionRate: 0,
    campaignPerformance: [],
    automatedCampaigns: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
