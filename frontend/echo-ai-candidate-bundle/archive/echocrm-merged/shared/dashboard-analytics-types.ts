// Advanced Dashboard Analytics Types

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  type: DashboardType;
  owner: string;
  visibility: DashboardVisibility;
  layout: DashboardLayout;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  refreshInterval: number; // in seconds
  lastUpdated: Date;
  createdAt: Date;
  tags: string[];
  permissions: DashboardPermission[];
}

export type DashboardType = 
  | 'executive'
  | 'operational'
  | 'financial'
  | 'marketing'
  | 'guest-experience'
  | 'revenue'
  | 'custom';

export type DashboardVisibility = 'private' | 'team' | 'organization' | 'public';

export interface DashboardLayout {
  columns: number;
  rows: number;
  gridGap: number;
  responsive: ResponsiveLayout[];
}

export interface ResponsiveLayout {
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large';
  columns: number;
  rows: number;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: WidgetType;
  position: WidgetPosition;
  size: WidgetSize;
  configuration: WidgetConfiguration;
  dataSource: DataSource;
  refreshInterval: number;
  isVisible: boolean;
  permissions: string[];
}

export type WidgetType = 
  | 'kpi-metric'
  | 'line-chart'
  | 'bar-chart'
  | 'pie-chart'
  | 'area-chart'
  | 'scatter-plot'
  | 'heat-map'
  | 'table'
  | 'metric-comparison'
  | 'trend-indicator'
  | 'gauge'
  | 'progress-bar'
  | 'sparkline'
  | 'text-summary'
  | 'alert-list'
  | 'calendar-view'
  | 'map-visualization';

export interface WidgetPosition {
  x: number;
  y: number;
  zIndex?: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetConfiguration {
  title: string;
  subtitle?: string;
  showTitle: boolean;
  showBorder: boolean;
  backgroundColor?: string;
  textColor?: string;
  chartConfig?: ChartConfiguration;
  tableConfig?: TableConfiguration;
  metricConfig?: MetricConfiguration;
  customConfig?: Record<string, unknown>;
}

export interface ChartConfiguration {
  chartType: string;
  xAxis: AxisConfiguration;
  yAxis: AxisConfiguration;
  series: SeriesConfiguration[];
  colors: string[];
  legend: LegendConfiguration;
  tooltip: TooltipConfiguration;
  animations: boolean;
  responsive: boolean;
}

export interface AxisConfiguration {
  label: string;
  type: 'category' | 'value' | 'time' | 'log';
  min?: number;
  max?: number;
  format?: string;
  gridLines: boolean;
  tickInterval?: number;
}

export interface SeriesConfiguration {
  name: string;
  type: 'line' | 'bar' | 'area' | 'scatter' | 'pie';
  dataField: string;
  color?: string;
  marker?: MarkerConfiguration;
  aggregation?: AggregationType;
}

export interface MarkerConfiguration {
  enabled: boolean;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
  size: number;
  color?: string;
}

export type AggregationType = 'sum' | 'average' | 'count' | 'min' | 'max' | 'median' | 'mode';

export interface LegendConfiguration {
  enabled: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
}

export interface TooltipConfiguration {
  enabled: boolean;
  format: string;
  backgroundColor?: string;
  borderColor?: string;
}

export interface TableConfiguration {
  columns: TableColumn[];
  pagination: PaginationConfiguration;
  sorting: SortingConfiguration;
  filtering: FilterConfiguration;
}

export interface TableColumn {
  key: string;
  title: string;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage';
  width?: number;
  sortable: boolean;
  filterable: boolean;
  format?: string;
  alignment: 'left' | 'center' | 'right';
}

export interface PaginationConfiguration {
  enabled: boolean;
  pageSize: number;
  pageSizeOptions: number[];
}

export interface SortingConfiguration {
  enabled: boolean;
  multiColumn: boolean;
  defaultSort?: SortRule[];
}

export interface SortRule {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfiguration {
  enabled: boolean;
  quickFilters: QuickFilter[];
  advancedFilters: boolean;
}

export interface QuickFilter {
  column: string;
  type: 'text' | 'select' | 'date-range' | 'number-range';
  options?: string[];
  defaultValue?: unknown;
}

export interface MetricConfiguration {
  value: MetricValue;
  target?: MetricTarget;
  comparison?: MetricComparison;
  trend?: TrendConfiguration;
  formatting: MetricFormatting;
}

export interface MetricValue {
  field: string;
  aggregation: AggregationType;
  calculation?: CalculationFormula;
}

export interface CalculationFormula {
  expression: string;
  variables: Record<string, string>;
}

export interface MetricTarget {
  value: number;
  type: 'greater' | 'less' | 'equal' | 'range';
  range?: { min: number; max: number };
}

export interface MetricComparison {
  period: 'previous-period' | 'previous-year' | 'budget' | 'forecast' | 'custom';
  customPeriod?: DateRange;
  showPercentage: boolean;
  showAbsolute: boolean;
}

export interface TrendConfiguration {
  enabled: boolean;
  period: number; // days
  showDirection: boolean;
  showSparkline: boolean;
}

export interface MetricFormatting {
  type: 'number' | 'currency' | 'percentage' | 'duration' | 'custom';
  decimals: number;
  prefix?: string;
  suffix?: string;
  thousandsSeparator: boolean;
  currency?: string;
  customFormat?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  connection: DataConnection;
  query: DataQuery;
  cache: CacheConfiguration;
  security: SecurityConfiguration;
}

export type DataSourceType = 
  | 'database'
  | 'api'
  | 'file'
  | 'real-time'
  | 'calculated'
  | 'ai-model';

export interface DataConnection {
  type: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  endpoint?: string;
  headers?: Record<string, string>;
  parameters?: Record<string, unknown>;
}

export interface DataQuery {
  query: string;
  parameters: QueryParameter[];
  filters: QueryFilter[];
  aggregations: QueryAggregation[];
  timeRange?: DateRange;
}

export interface QueryParameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  defaultValue?: unknown;
  required: boolean;
}

export interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
  condition: 'AND' | 'OR';
}

export type FilterOperator = 
  | 'equals'
  | 'not-equals'
  | 'greater-than'
  | 'less-than'
  | 'greater-equal'
  | 'less-equal'
  | 'contains'
  | 'not-contains'
  | 'starts-with'
  | 'ends-with'
  | 'in'
  | 'not-in'
  | 'between'
  | 'is-null'
  | 'is-not-null';

export interface QueryAggregation {
  field: string;
  function: AggregationType;
  alias?: string;
  groupBy?: string[];
}

export interface CacheConfiguration {
  enabled: boolean;
  ttl: number; // seconds
  strategy: 'time-based' | 'invalidation-based' | 'hybrid';
  invalidationTriggers: string[];
}

export interface SecurityConfiguration {
  authentication: boolean;
  authorization: AuthorizationRule[];
  encryption: boolean;
  masking: DataMaskingRule[];
}

export interface AuthorizationRule {
  role: string;
  permissions: string[];
  conditions: string[];
}

export interface DataMaskingRule {
  field: string;
  maskingType: 'partial' | 'full' | 'hash' | 'tokenize';
  roles: string[];
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: FilterType;
  field: string;
  operator: FilterOperator;
  value: unknown;
  global: boolean;
  widgetIds: string[];
}

export type FilterType = 
  | 'text'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'date-range'
  | 'number'
  | 'number-range'
  | 'boolean'
  | 'slider';

export interface DashboardPermission {
  userId?: string;
  roleId?: string;
  permissions: Permission[];
  conditions?: PermissionCondition[];
}

export type Permission = 'view' | 'edit' | 'delete' | 'share' | 'export' | 'admin';

export interface PermissionCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface DateRange {
  start: Date;
  end: Date;
  timezone?: string;
}

// KPI and Metrics
export interface KPIMetric {
  id: string;
  name: string;
  description: string;
  category: KPICategory;
  value: number;
  unit: string;
  target?: number;
  benchmark?: number;
  trend: TrendData;
  status: MetricStatus;
  lastUpdated: Date;
  calculation: KPICalculation;
  alerts: MetricAlert[];
}

export type KPICategory = 
  | 'revenue'
  | 'occupancy'
  | 'guest-satisfaction'
  | 'operational'
  | 'marketing'
  | 'financial'
  | 'staff'
  | 'sustainability';

export interface TrendData {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  data: TrendPoint[];
}

export interface TrendPoint {
  date: Date;
  value: number;
}

export type MetricStatus = 'excellent' | 'good' | 'warning' | 'critical' | 'unknown';

export interface KPICalculation {
  formula: string;
  dataSources: string[];
  parameters: CalculationParameter[];
  schedule: CalculationSchedule;
}

export interface CalculationParameter {
  name: string;
  value: unknown;
  type: 'static' | 'dynamic' | 'user-input';
}

export interface CalculationSchedule {
  frequency: 'real-time' | 'minutely' | 'hourly' | 'daily' | 'weekly';
  time?: string; // HH:MM format
  timezone?: string;
}

export interface MetricAlert {
  id: string;
  condition: AlertCondition;
  threshold: AlertThreshold;
  notification: AlertNotification;
  enabled: boolean;
}

export interface AlertCondition {
  metric: string;
  operator: FilterOperator;
  value: number;
  duration?: number; // minutes
}

export interface AlertThreshold {
  warning: number;
  critical: number;
  recovery?: number;
}

export interface AlertNotification {
  channels: NotificationChannel[];
  recipients: NotificationRecipient[];
  template: string;
  frequency: 'immediate' | 'batched' | 'digest';
}

export type NotificationChannel = 'email' | 'sms' | 'slack' | 'webhook' | 'in-app';

export interface NotificationRecipient {
  type: 'user' | 'role' | 'email';
  value: string;
}

// Report Builder
export interface Report {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  template: ReportTemplate;
  parameters: ReportParameter[];
  schedule: ReportSchedule;
  distribution: ReportDistribution;
  lastGenerated?: Date;
  status: ReportStatus;
  owner: string;
  tags: string[];
}

export type ReportType = 
  | 'financial'
  | 'operational'
  | 'guest-analytics'
  | 'marketing'
  | 'staff-performance'
  | 'compliance'
  | 'custom';

export interface ReportTemplate {
  sections: ReportSection[];
  styling: ReportStyling;
  header: ReportHeader;
  footer: ReportFooter;
  layout: ReportLayout;
}

export interface ReportSection {
  id: string;
  title: string;
  type: SectionType;
  content: SectionContent;
  conditions?: SectionCondition[];
}

export type SectionType = 
  | 'summary'
  | 'chart'
  | 'table'
  | 'metrics'
  | 'text'
  | 'image'
  | 'page-break';

export interface SectionContent {
  data?: unknown;
  template?: string;
  configuration?: Record<string, unknown>;
}

export interface SectionCondition {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface ReportStyling {
  theme: string;
  colors: ColorPalette;
  fonts: FontConfiguration;
  spacing: SpacingConfiguration;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface FontConfiguration {
  heading: FontStyle;
  body: FontStyle;
  caption: FontStyle;
}

export interface FontStyle {
  family: string;
  size: number;
  weight: string;
  lineHeight: number;
}

export interface SpacingConfiguration {
  section: number;
  paragraph: number;
  line: number;
}

export interface ReportHeader {
  enabled: boolean;
  logo?: string;
  title: string;
  subtitle?: string;
  date: boolean;
  pageNumbers: boolean;
}

export interface ReportFooter {
  enabled: boolean;
  text?: string;
  pageNumbers: boolean;
  disclaimer?: string;
}

export interface ReportLayout {
  orientation: 'portrait' | 'landscape';
  size: 'letter' | 'a4' | 'legal' | 'tabloid';
  margins: Margins;
  columns: number;
}

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ReportParameter {
  name: string;
  label: string;
  type: ParameterType;
  required: boolean;
  defaultValue?: unknown;
  options?: ParameterOption[];
  validation?: ParameterValidation;
}

export type ParameterType = 
  | 'text'
  | 'number'
  | 'date'
  | 'date-range'
  | 'select'
  | 'multi-select'
  | 'boolean'
  | 'user'
  | 'department';

export interface ParameterOption {
  label: string;
  value: unknown;
}

export interface ParameterValidation {
  min?: number;
  max?: number;
  pattern?: string;
  required?: boolean;
  custom?: string;
}

export interface ReportSchedule {
  enabled: boolean;
  frequency: ScheduleFrequency;
  time: string; // HH:MM format
  timezone: string;
  days?: number[]; // 0-6, Sunday=0
  dates?: number[]; // 1-31
  endDate?: Date;
}

export type ScheduleFrequency = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'
  | 'custom';

export interface ReportDistribution {
  channels: DistributionChannel[];
  recipients: DistributionRecipient[];
  formats: ReportFormat[];
  settings: DistributionSettings;
}

export interface DistributionChannel {
  type: 'email' | 'ftp' | 'sftp' | 'api' | 'storage';
  configuration: Record<string, unknown>;
}

export interface DistributionRecipient {
  type: 'user' | 'email' | 'role' | 'department';
  value: string;
  permissions?: string[];
}

export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'html' | 'json';

export interface DistributionSettings {
  compression: boolean;
  encryption: boolean;
  password?: string;
  watermark?: string;
  retentionDays: number;
}

export type ReportStatus = 'draft' | 'published' | 'generating' | 'completed' | 'failed' | 'archived';

// Industry Benchmarks
export interface IndustryBenchmark {
  id: string;
  name: string;
  category: BenchmarkCategory;
  industry: string;
  region: string;
  propertyType: PropertyType[];
  metric: string;
  value: number;
  unit: string;
  percentiles: BenchmarkPercentile[];
  lastUpdated: Date;
  source: string;
  methodology?: string;
}

export type BenchmarkCategory = 
  | 'revenue'
  | 'operational'
  | 'guest-satisfaction'
  | 'financial'
  | 'sustainability'
  | 'digital';

export type PropertyType = 
  | 'hotel'
  | 'resort'
  | 'boutique'
  | 'extended-stay'
  | 'luxury'
  | 'budget'
  | 'vacation-rental';

export interface BenchmarkPercentile {
  percentile: number;
  value: number;
}

export interface BenchmarkComparison {
  metricId: string;
  currentValue: number;
  benchmarkValue: number;
  percentile: number;
  performance: BenchmarkPerformance;
  gap: number;
  gapPercentage: number;
  recommendations: BenchmarkRecommendation[];
}

export type BenchmarkPerformance = 
  | 'top-quartile'
  | 'above-average'
  | 'average'
  | 'below-average'
  | 'bottom-quartile';

export interface BenchmarkRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  timeline: string;
  category: string;
}

// Analytics and Insights
export interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  category: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  impact: InsightImpact;
  evidence: Evidence[];
  recommendations: InsightRecommendation[];
  generatedAt: Date;
  expiresAt?: Date;
  status: InsightStatus;
  feedback?: InsightFeedback;
}

export type InsightType = 
  | 'anomaly'
  | 'trend'
  | 'correlation'
  | 'prediction'
  | 'optimization'
  | 'alert'
  | 'summary';

export interface InsightImpact {
  metric: string;
  currentValue: number;
  potentialValue: number;
  impactAmount: number;
  impactPercentage: number;
  timeframe: string;
}

export interface Evidence {
  type: 'data' | 'chart' | 'statistical' | 'external';
  description: string;
  data?: unknown;
  visualization?: VisualizationConfig;
  significance?: number;
}

export interface VisualizationConfig {
  type: string;
  data: unknown;
  options: Record<string, unknown>;
}

export interface InsightRecommendation {
  title: string;
  description: string;
  action: RecommendedAction;
  priority: number;
  effort: EffortLevel;
  expectedOutcome: ExpectedOutcome;
  dependencies: string[];
  resources: RequiredResource[];
}

export interface RecommendedAction {
  type: ActionType;
  description: string;
  parameters: ActionParameter[];
  automation?: AutomationConfig;
}

export type ActionType = 
  | 'adjust-pricing'
  | 'increase-marketing'
  | 'staff-training'
  | 'process-improvement'
  | 'technology-upgrade'
  | 'policy-change'
  | 'investigation'
  | 'monitoring';

export interface ActionParameter {
  name: string;
  value: unknown;
  type: string;
}

export interface AutomationConfig {
  enabled: boolean;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
}

export interface AutomationCondition {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface AutomationAction {
  type: string;
  parameters: Record<string, unknown>;
}

export type EffortLevel = 'low' | 'medium' | 'high' | 'very-high';

export interface ExpectedOutcome {
  metrics: OutcomeMetric[];
  timeline: string;
  confidence: number;
  riskFactors: string[];
}

export interface OutcomeMetric {
  name: string;
  currentValue: number;
  expectedValue: number;
  unit: string;
}

export interface RequiredResource {
  type: ResourceType;
  description: string;
  quantity?: number;
  cost?: number;
  availability?: string;
}

export type ResourceType = 
  | 'staff'
  | 'budget'
  | 'technology'
  | 'training'
  | 'vendor'
  | 'consultant'
  | 'equipment';

export type InsightStatus = 'new' | 'reviewed' | 'accepted' | 'rejected' | 'implemented' | 'archived';

export interface InsightFeedback {
  useful: boolean;
  accuracy: number; // 1-5 scale
  clarity: number; // 1-5 scale
  actionability: number; // 1-5 scale
  comments?: string;
  submittedBy: string;
  submittedAt: Date;
}

// Executive Summary
export interface ExecutiveSummary {
  id: string;
  period: DateRange;
  generatedAt: Date;
  highlights: ExecutiveHighlight[];
  keyMetrics: ExecutiveMetric[];
  trends: ExecutiveTrend[];
  alerts: ExecutiveAlert[];
  recommendations: ExecutiveRecommendation[];
  outlook: ExecutiveOutlook;
}

export interface ExecutiveHighlight {
  title: string;
  description: string;
  type: 'achievement' | 'concern' | 'opportunity' | 'milestone';
  impact: 'high' | 'medium' | 'low';
  metrics?: HighlightMetric[];
}

export interface HighlightMetric {
  name: string;
  value: number;
  change: number;
  unit: string;
}

export interface ExecutiveMetric {
  name: string;
  value: number;
  target?: number;
  benchmark?: number;
  trend: TrendIndicator;
  status: MetricStatus;
  context: string;
}

export interface TrendIndicator {
  direction: 'up' | 'down' | 'stable';
  magnitude: 'slight' | 'moderate' | 'significant';
  period: string;
}

export interface ExecutiveTrend {
  title: string;
  description: string;
  type: 'operational' | 'financial' | 'market' | 'guest';
  significance: 'high' | 'medium' | 'low';
  timeframe: string;
  data: TrendData;
}

export interface ExecutiveAlert {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  category: string;
  actionRequired: boolean;
  deadline?: Date;
}

export interface ExecutiveRecommendation {
  title: string;
  description: string;
  rationale: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  expectedImpact: string;
  resources: string[];
}

export interface ExecutiveOutlook {
  summary: string;
  risks: OutlookRisk[];
  opportunities: OutlookOpportunity[];
  forecast: OutlookForecast[];
}

export interface OutlookRisk {
  description: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface OutlookOpportunity {
  description: string;
  potential: string;
  requirements: string[];
  timeline: string;
}

export interface OutlookForecast {
  metric: string;
  period: string;
  prediction: number;
  confidence: number;
  factors: string[];
}
