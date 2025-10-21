// AI/ML Enhancement Module Types

export interface AIModel {
  id: string;
  name: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
  accuracy: number;
  lastTrained: Date;
  trainingDataSize: number;
  features: ModelFeature[];
  hyperparameters: Record<string, unknown>;
  metrics: ModelMetrics;
  deploymentConfig: DeploymentConfig;
}

export type ModelType = 
  | 'guest-behavior-prediction'
  | 'churn-prevention'
  | 'demand-forecasting'
  | 'revenue-optimization'
  | 'sentiment-analysis'
  | 'recommendation-engine'
  | 'fraud-detection'
  | 'dynamic-pricing'
  | 'customer-segmentation'
  | 'personalization';

export type ModelStatus = 
  | 'training'
  | 'deployed'
  | 'testing'
  | 'deprecated'
  | 'failed'
  | 'pending';

export interface ModelFeature {
  name: string;
  type: 'numerical' | 'categorical' | 'boolean' | 'text' | 'datetime';
  importance: number;
  source: string;
  transformation?: string;
  description: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  mse?: number; // for regression models
  mae?: number; // for regression models
  confidenceInterval: number;
  validationDate: Date;
  testDataSize: number;
}

export interface DeploymentConfig {
  environment: 'production' | 'staging' | 'development';
  endpoint: string;
  scalingConfig: ScalingConfig;
  monitoringConfig: MonitoringConfig;
  rollbackConfig: RollbackConfig;
}

export interface ScalingConfig {
  minInstances: number;
  maxInstances: number;
  targetUtilization: number;
  autoScaling: boolean;
}

export interface MonitoringConfig {
  alertThresholds: AlertThreshold[];
  loggingLevel: 'debug' | 'info' | 'warn' | 'error';
  metricsCollection: boolean;
  driftDetection: boolean;
}

export interface AlertThreshold {
  metric: string;
  operator: '>' | '<' | '=' | '>=' | '<=';
  value: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  action: 'log' | 'email' | 'retrain' | 'rollback';
}

export interface RollbackConfig {
  enabled: boolean;
  previousVersions: number;
  automaticRollback: boolean;
  rollbackTriggers: string[];
}

// Predictive Analytics
export interface PredictiveAnalytics {
  id: string;
  type: AnalyticsType;
  model: AIModel;
  predictions: Prediction[];
  insights: AnalyticsInsight[];
  lastUpdate: Date;
  nextUpdate: Date;
  confidence: number;
}

export type AnalyticsType = 
  | 'guest-behavior'
  | 'churn-prediction'
  | 'demand-forecast'
  | 'revenue-optimization'
  | 'upselling-opportunities'
  | 'seasonal-patterns'
  | 'market-trends';

export interface Prediction {
  id: string;
  entityId: string; // guest ID, room ID, etc.
  entityType: 'guest' | 'room' | 'service' | 'event' | 'revenue';
  predictionType: string;
  value: unknown;
  confidence: number;
  probability?: number;
  timeframe: TimeFrame;
  factors: PredictionFactor[];
  generatedAt: Date;
  expiresAt: Date;
}

export interface TimeFrame {
  start: Date;
  end: Date;
  granularity: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface PredictionFactor {
  name: string;
  importance: number;
  value: unknown;
  description: string;
}

export interface AnalyticsInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  recommendations: Recommendation[];
  metrics: InsightMetric[];
  generatedAt: Date;
  validUntil: Date;
}

export type InsightType = 
  | 'trend'
  | 'anomaly'
  | 'opportunity'
  | 'risk'
  | 'pattern'
  | 'correlation'
  | 'forecast';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  action: RecommendedAction;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedImpact: ExpectedImpact;
  implementation: ImplementationGuide;
  dependencies: string[];
}

export interface RecommendedAction {
  type: 'increase-price' | 'decrease-price' | 'upsell' | 'retain' | 'target' | 'optimize' | 'investigate';
  parameters: Record<string, unknown>;
  targetEntity: string;
  timeframe: TimeFrame;
}

export interface ExpectedImpact {
  metric: string;
  currentValue: number;
  projectedValue: number;
  confidence: number;
  timeToRealize: number; // in days
}

export interface ImplementationGuide {
  steps: ImplementationStep[];
  estimatedEffort: number; // in hours
  skillsRequired: string[];
  tools: string[];
}

export interface ImplementationStep {
  order: number;
  title: string;
  description: string;
  duration: number; // in hours
  dependencies: number[];
}

export interface InsightMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  changePercent?: number;
}

// Guest Behavior Prediction
export interface GuestBehaviorPrediction {
  id: string;
  guestId: string;
  predictions: {
    churnRisk: ChurnRisk;
    spendingPrediction: SpendingPrediction;
    servicePreferences: ServicePreference[];
    loyaltyScore: LoyaltyScore;
    nextBookingProbability: BookingProbability;
    upsellOpportunities: UpsellOpportunity[];
  };
  lastUpdated: Date;
  modelVersion: string;
}

export interface ChurnRisk {
  score: number; // 0-1 probability
  risk: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  recommendations: ChurnPreventionAction[];
  nextReviewDate: Date;
}

export interface RiskFactor {
  factor: string;
  impact: number; // -1 to 1
  description: string;
  weight: number;
}

export interface ChurnPreventionAction {
  action: string;
  description: string;
  expectedEffectiveness: number;
  cost: number;
  priority: number;
}

export interface SpendingPrediction {
  predictedAmount: number;
  currency: string;
  confidence: number;
  timeframe: TimeFrame;
  spendingCategories: SpendingCategory[];
  factors: SpendingFactor[];
}

export interface SpendingCategory {
  category: string;
  predictedAmount: number;
  probability: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface SpendingFactor {
  factor: string;
  influence: number;
  description: string;
}

export interface ServicePreference {
  service: string;
  preferenceScore: number; // 0-1
  confidence: number;
  reason: string;
  lastUpdated: Date;
}

export interface LoyaltyScore {
  score: number; // 0-100
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: LoyaltyFactor[];
  nextTierRequirements?: TierRequirement[];
}

export interface LoyaltyFactor {
  factor: string;
  contribution: number;
  weight: number;
  description: string;
}

export interface TierRequirement {
  requirement: string;
  current: number;
  required: number;
  progress: number; // percentage
}

export interface BookingProbability {
  probability: number; // 0-1
  timeframe: TimeFrame;
  factors: BookingFactor[];
  recommendedActions: BookingAction[];
}

export interface BookingFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface BookingAction {
  action: string;
  description: string;
  expectedLift: number; // percentage increase in probability
  cost: number;
}

export interface UpsellOpportunity {
  service: string;
  probability: number;
  expectedRevenue: number;
  confidence: number;
  reasoning: string;
  optimalTiming: OptimalTiming;
  approach: UpsellApproach;
}

export interface OptimalTiming {
  phase: 'pre-arrival' | 'check-in' | 'during-stay' | 'check-out' | 'post-stay';
  specificTime?: Date;
  factors: string[];
}

export interface UpsellApproach {
  channel: 'email' | 'sms' | 'in-person' | 'app' | 'kiosk';
  message: string;
  incentive?: Incentive;
  expectedConversion: number;
}

export interface Incentive {
  type: 'discount' | 'upgrade' | 'addon' | 'points' | 'experience';
  value: number;
  description: string;
}

// Demand Forecasting
export interface DemandForecast {
  id: string;
  property: string;
  forecastDate: Date;
  horizon: number; // days into future
  granularity: 'daily' | 'weekly' | 'monthly';
  forecasts: DemandPrediction[];
  accuracy: ForecastAccuracy;
  factors: DemandFactor[];
  lastUpdated: Date;
  nextUpdate: Date;
}

export interface DemandPrediction {
  date: Date;
  roomType?: string;
  predictedDemand: number;
  confidence: number;
  occupancyForecast: number;
  revenueForecast: number;
  optimalRate: OptimalRate;
  recommendations: DemandRecommendation[];
}

export interface OptimalRate {
  rate: number;
  currency: string;
  confidence: number;
  factors: RateFactor[];
  priceElasticity: number;
}

export interface RateFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface DemandRecommendation {
  type: 'pricing' | 'inventory' | 'marketing' | 'restrictions';
  action: string;
  description: string;
  expectedImpact: number;
  confidence: number;
}

export interface ForecastAccuracy {
  mape: number; // Mean Absolute Percentage Error
  rmse: number; // Root Mean Square Error
  mae: number; // Mean Absolute Error
  accuracy: number; // percentage
  lastEvaluated: Date;
  evaluationPeriod: number; // days
}

export interface DemandFactor {
  factor: string;
  type: 'internal' | 'external' | 'seasonal' | 'event-based';
  impact: number;
  confidence: number;
  source: string;
  description: string;
}

// Personalization Engine
export interface PersonalizationEngine {
  id: string;
  guestId: string;
  profile: GuestPersonalizationProfile;
  recommendations: PersonalizedRecommendation[];
  content: PersonalizedContent[];
  offers: PersonalizedOffer[];
  experiences: PersonalizedExperience[];
  lastUpdated: Date;
  version: string;
}

export interface GuestPersonalizationProfile {
  demographics: Demographics;
  preferences: Preferences;
  behaviors: BehaviorProfile;
  segments: GuestSegment[];
  lifetimeValue: number;
  engagementScore: number;
  satisfactionScore: number;
}

export interface Demographics {
  ageRange: string;
  gender?: string;
  location: string;
  income?: string;
  occupation?: string;
  familyStatus: string;
  travelFrequency: string;
}

export interface Preferences {
  roomTypes: string[];
  amenities: string[];
  services: string[];
  dining: DiningPreferences;
  activities: string[];
  communication: CommunicationPreferences;
  privacy: PrivacyPreferences;
}

export interface DiningPreferences {
  cuisines: string[];
  dietaryRestrictions: string[];
  mealTimes: string[];
  diningStyle: string[];
  budgetRange: string;
}

export interface CommunicationPreferences {
  channels: string[];
  frequency: 'low' | 'medium' | 'high';
  topics: string[];
  language: string;
  timezone: string;
}

export interface PrivacyPreferences {
  dataSharing: boolean;
  marketing: boolean;
  analytics: boolean;
  thirdParty: boolean;
  retention: number; // months
}

export interface BehaviorProfile {
  bookingPatterns: BookingPattern[];
  spendingPatterns: SpendingPattern[];
  serviceUsage: ServiceUsage[];
  feedbackPatterns: FeedbackPattern[];
  digitalEngagement: DigitalEngagement;
}

export interface BookingPattern {
  pattern: string;
  frequency: number;
  seasonality: Seasonality;
  leadTime: number; // days
  partySize: number;
  stayDuration: number;
}

export interface Seasonality {
  pattern: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  peaks: string[];
  troughs: string[];
}

export interface SpendingPattern {
  category: string;
  averageAmount: number;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  elasticity: number;
}

export interface ServiceUsage {
  service: string;
  frequency: number;
  satisfaction: number;
  value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface FeedbackPattern {
  channels: string[];
  frequency: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  responsiveness: number;
}

export interface DigitalEngagement {
  channels: EngagementChannel[];
  devices: DeviceUsage[];
  contentPreferences: ContentPreference[];
  interactionPatterns: InteractionPattern[];
}

export interface EngagementChannel {
  channel: string;
  frequency: number;
  engagement: number;
  conversion: number;
  preference: number;
}

export interface DeviceUsage {
  device: string;
  usage: number;
  preference: number;
  capabilities: string[];
}

export interface ContentPreference {
  type: string;
  preference: number;
  engagement: number;
  topics: string[];
}

export interface InteractionPattern {
  pattern: string;
  frequency: number;
  timing: string;
  duration: number;
}

export interface GuestSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria[];
  size: number;
  characteristics: string[];
  behaviors: string[];
  preferences: string[];
}

export interface SegmentCriteria {
  field: string;
  operator: string;
  value: unknown;
  weight: number;
}

export interface PersonalizedRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  confidence: number;
  relevance: number;
  timing: RecommendationTiming;
  content: RecommendationContent;
  tracking: RecommendationTracking;
}

export type RecommendationType = 
  | 'room-upgrade'
  | 'service-addon'
  | 'dining-experience'
  | 'activity'
  | 'amenity'
  | 'package'
  | 'offer'
  | 'content';

export interface RecommendationTiming {
  phase: 'pre-booking' | 'pre-arrival' | 'during-stay' | 'post-stay';
  optimalTime?: Date;
  frequency: number;
  duration: number; // hours
}

export interface RecommendationContent {
  headline: string;
  description: string;
  images: string[];
  callToAction: string;
  pricing?: PricingInfo;
  benefits: string[];
  social_proof?: SocialProof;
}

export interface PricingInfo {
  price: number;
  currency: string;
  discount?: number;
  originalPrice?: number;
  paymentOptions: string[];
}

export interface SocialProof {
  type: 'reviews' | 'bookings' | 'popularity' | 'trending';
  value: number;
  description: string;
}

export interface RecommendationTracking {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number; // click-through rate
  conversion_rate: number;
  roi: number;
}

export interface PersonalizedContent {
  id: string;
  type: ContentType;
  title: string;
  content: string;
  personalizationFactors: PersonalizationFactor[];
  targeting: ContentTargeting;
  performance: ContentPerformance;
  schedule: ContentSchedule;
}

export type ContentType = 
  | 'email'
  | 'sms'
  | 'push-notification'
  | 'in-app-message'
  | 'web-banner'
  | 'social-media'
  | 'print-material';

export interface PersonalizationFactor {
  factor: string;
  value: unknown;
  weight: number;
  source: string;
}

export interface ContentTargeting {
  segments: string[];
  demographics: Record<string, unknown>;
  behaviors: Record<string, unknown>;
  preferences: Record<string, unknown>;
  exclusions: string[];
}

export interface ContentPerformance {
  impressions: number;
  engagements: number;
  conversions: number;
  revenue: number;
  engagement_rate: number;
  conversion_rate: number;
  cost_per_engagement: number;
}

export interface ContentSchedule {
  startDate: Date;
  endDate: Date;
  frequency: string;
  timezone: string;
  optimalTimes: string[];
}

export interface PersonalizedOffer {
  id: string;
  name: string;
  description: string;
  type: OfferType;
  value: OfferValue;
  conditions: OfferCondition[];
  targeting: OfferTargeting;
  performance: OfferPerformance;
  schedule: OfferSchedule;
}

export type OfferType = 
  | 'discount'
  | 'upgrade'
  | 'package'
  | 'loyalty-points'
  | 'free-service'
  | 'early-access'
  | 'exclusive-experience';

export interface OfferValue {
  type: 'percentage' | 'fixed-amount' | 'upgrade' | 'addon' | 'points';
  value: number;
  currency?: string;
  maximum?: number;
  minimum?: number;
}

export interface OfferCondition {
  type: 'minimum-spend' | 'stay-duration' | 'advance-booking' | 'membership' | 'frequency';
  value: unknown;
  description: string;
}

export interface OfferTargeting {
  segments: string[];
  criteria: TargetingCriteria[];
  exclusions: string[];
  priority: number;
}

export interface TargetingCriteria {
  field: string;
  operator: string;
  value: unknown;
  weight: number;
}

export interface OfferPerformance {
  impressions: number;
  clicks: number;
  redemptions: number;
  revenue: number;
  cost: number;
  roi: number;
  lift: number; // percentage increase in conversion
}

export interface OfferSchedule {
  startDate: Date;
  endDate: Date;
  availability: number; // total quantity
  remaining: number;
  restrictions: ScheduleRestriction[];
}

export interface ScheduleRestriction {
  type: 'blackout-dates' | 'time-restrictions' | 'quantity-limits' | 'usage-limits';
  values: unknown[];
  description: string;
}

export interface PersonalizedExperience {
  id: string;
  name: string;
  description: string;
  components: ExperienceComponent[];
  personalization: ExperiencePersonalization;
  delivery: ExperienceDelivery;
  measurement: ExperienceMeasurement;
}

export interface ExperienceComponent {
  id: string;
  type: ComponentType;
  name: string;
  configuration: Record<string, unknown>;
  personalizationRules: PersonalizationRule[];
  dependencies: string[];
}

export type ComponentType = 
  | 'welcome-message'
  | 'room-setup'
  | 'amenity-selection'
  | 'dining-recommendation'
  | 'activity-suggestion'
  | 'service-timing'
  | 'communication-style'
  | 'departure-experience';

export interface PersonalizationRule {
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  enabled: boolean;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: unknown;
  logic?: 'AND' | 'OR';
}

export interface RuleAction {
  type: string;
  parameters: Record<string, unknown>;
  fallback?: RuleAction;
}

export interface ExperiencePersonalization {
  factors: PersonalizationFactor[];
  adaptability: number; // 0-1 scale
  learningEnabled: boolean;
  feedbackLoop: boolean;
}

export interface ExperienceDelivery {
  channels: string[];
  timing: DeliveryTiming;
  coordination: ComponentCoordination[];
  fallbacks: string[];
}

export interface DeliveryTiming {
  triggers: string[];
  sequence: TimingSequence[];
  flexibility: number; // minutes of acceptable variation
}

export interface TimingSequence {
  component: string;
  timing: 'immediate' | 'scheduled' | 'conditional';
  delay?: number; // minutes
  conditions?: string[];
}

export interface ComponentCoordination {
  components: string[];
  type: 'sequential' | 'parallel' | 'conditional';
  dependencies: string[];
}

export interface ExperienceMeasurement {
  kpis: ExperienceKPI[];
  tracking: ExperienceTracking;
  feedback: FeedbackCollection;
  optimization: ExperienceOptimization;
}

export interface ExperienceKPI {
  name: string;
  target: number;
  current: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
}

export interface ExperienceTracking {
  events: TrackedEvent[];
  metrics: TrackingMetric[];
  attribution: AttributionModel;
}

export interface TrackedEvent {
  name: string;
  category: string;
  properties: Record<string, unknown>;
  timestamp: Date;
}

export interface TrackingMetric {
  name: string;
  value: number;
  unit: string;
  context: Record<string, unknown>;
}

export interface AttributionModel {
  type: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based';
  window: number; // days
  touchpoints: Touchpoint[];
}

export interface Touchpoint {
  channel: string;
  timestamp: Date;
  attribution: number; // percentage
  value: number;
}

export interface FeedbackCollection {
  methods: FeedbackMethod[];
  frequency: string;
  timing: string;
  incentives: FeedbackIncentive[];
}

export interface FeedbackMethod {
  type: 'survey' | 'rating' | 'review' | 'interview' | 'observation';
  questions: FeedbackQuestion[];
  timing: string;
  channel: string;
}

export interface FeedbackQuestion {
  question: string;
  type: 'rating' | 'multiple-choice' | 'open-text' | 'binary';
  required: boolean;
  options?: string[];
}

export interface FeedbackIncentive {
  type: 'points' | 'discount' | 'upgrade' | 'gift' | 'recognition';
  value: number;
  conditions: string[];
}

export interface ExperienceOptimization {
  algorithms: OptimizationAlgorithm[];
  testing: ABTestConfig[];
  automation: AutomationRule[];
  learning: LearningConfig;
}

export interface OptimizationAlgorithm {
  name: string;
  type: 'genetic' | 'gradient-descent' | 'reinforcement-learning' | 'bayesian';
  parameters: Record<string, unknown>;
  objective: string;
  constraints: string[];
}

export interface ABTestConfig {
  name: string;
  variants: TestVariant[];
  trafficSplit: number[];
  duration: number; // days
  successMetric: string;
  significance: number;
}

export interface TestVariant {
  name: string;
  description: string;
  changes: Record<string, unknown>;
  hypothesis: string;
}

export interface AutomationRule {
  name: string;
  trigger: AutomationTrigger;
  conditions: RuleCondition[];
  actions: AutomationAction[];
  enabled: boolean;
}

export interface AutomationTrigger {
  type: 'time-based' | 'event-based' | 'condition-based' | 'performance-based';
  configuration: Record<string, unknown>;
}

export interface AutomationAction {
  type: 'update-configuration' | 'send-notification' | 'trigger-experiment' | 'adjust-parameters';
  parameters: Record<string, unknown>;
}

export interface LearningConfig {
  enabled: boolean;
  frequency: string;
  dataRetention: number; // days
  adaptationRate: number; // 0-1 scale
  validationRequired: boolean;
}
