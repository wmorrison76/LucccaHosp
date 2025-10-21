// Menu Performance Analytics Types
// Tracks item performance across BEO/REO documents for menu revision decisions

export interface MenuItemPerformance {
  item_id: string;
  item_name: string;
  category: 'appetizer' | 'entree' | 'dessert' | 'beverage' | 'package' | 'service';
  outlet_id?: string;
  outlet_name?: string;
  
  // Performance Metrics
  total_orders: number;
  total_revenue: number;
  total_quantity: number;
  unique_events: number;
  
  // Time-based Performance
  performance_period: {
    start_date: Date;
    end_date: Date;
    period_type: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  };
  
  // Statistical Analysis
  average_order_size: number;
  revenue_per_event: number;
  order_frequency: number; // How often it appears in events
  
  // Comparative Performance
  rank_in_category: number;
  percentile_score: number; // 0-100, where 100 is top performer
  
  // Trend Analysis
  trend: 'increasing' | 'decreasing' | 'stable';
  trend_percentage: number; // % change vs previous period
  
  // Menu Revision Recommendations
  recommendation: 'keep' | 'modify' | 'replace' | 'promote' | 'review';
  recommendation_reason: string;
  
  // Additional Context
  seasonal_performance?: SeasonalPerformance[];
  price_sensitivity_score?: number;
  guest_feedback_score?: number;
  profit_margin?: number;
  
  last_updated: Date;
}

export interface SeasonalPerformance {
  season: 'spring' | 'summer' | 'fall' | 'winter';
  performance_score: number;
  order_count: number;
  revenue: number;
}

export interface MenuRevisionReport {
  outlet_id?: string;
  outlet_name?: string;
  report_period: {
    start_date: Date;
    end_date: Date;
  };
  
  // Category Breakdown
  category_performance: CategoryPerformance[];
  
  // Recommendations by Action
  items_to_keep: MenuItemPerformance[];
  items_to_promote: MenuItemPerformance[]; // High performance, low visibility
  items_to_modify: MenuItemPerformance[]; // Medium performance, high potential
  items_to_replace: MenuItemPerformance[]; // Poor performance
  items_to_review: MenuItemPerformance[]; // Inconsistent or new items
  
  // Summary Statistics
  total_items_analyzed: number;
  total_revenue_analyzed: number;
  top_performing_category: string;
  worst_performing_category: string;
  
  // Menu Optimization Insights
  revenue_opportunity: number; // Potential revenue increase
  recommended_changes_count: number;
  menu_health_score: number; // 0-100 overall menu performance
  
  generated_at: Date;
  generated_by: string;
}

export interface CategoryPerformance {
  category: string;
  total_items: number;
  total_revenue: number;
  average_performance_score: number;
  top_performer: {
    item_name: string;
    performance_score: number;
  };
  worst_performer: {
    item_name: string;
    performance_score: number;
  };
  category_trend: 'growing' | 'declining' | 'stable';
  recommendation: string;
}

export interface MenuAnalyticsFilters {
  outlet_ids?: string[];
  categories?: string[];
  date_range: {
    start_date: Date;
    end_date: Date;
  };
  min_events?: number; // Only include items with at least X events
  performance_threshold?: number; // Filter by performance percentile
  event_types?: string[]; // Wedding, corporate, etc.
  guest_count_range?: {
    min: number;
    max: number;
  };
}

export interface ItemComparisonAnalysis {
  item_a: MenuItemPerformance;
  item_b: MenuItemPerformance;
  comparison_metrics: {
    revenue_difference: number;
    order_frequency_difference: number;
    trend_comparison: string;
    recommendation: 'keep_both' | 'choose_a' | 'choose_b' | 'replace_both';
  };
}

export interface MenuOptimizationSuggestion {
  type: 'add_item' | 'remove_item' | 'modify_price' | 'change_position' | 'bundle_items';
  target_item?: string;
  suggested_action: string;
  expected_impact: {
    revenue_change: number;
    order_frequency_change: number;
    confidence_level: 'high' | 'medium' | 'low';
  };
  implementation_notes: string;
}

export interface BEOItemTracking {
  beo_id: string;
  event_id: string;
  event_date: Date;
  outlet_id?: string;
  guest_count: number;
  event_type: string;
  
  // Ordered Items
  items: BEOOrderedItem[];
  
  // Event Context
  season: 'spring' | 'summer' | 'fall' | 'winter';
  day_of_week: string;
  is_weekend: boolean;
  is_holiday: boolean;
  
  total_revenue: number;
  revenue_per_guest: number;
  
  created_at: Date;
}

export interface BEOOrderedItem {
  catalog_item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  
  // Additional Context
  is_upgrade?: boolean;
  is_substitution?: boolean;
  guest_special_request?: boolean;
  dietary_restriction?: string[];
}

// Analytics Configuration
export interface MenuAnalyticsConfig {
  // Performance Scoring Weights
  scoring_weights: {
    revenue_weight: number; // 0-1
    frequency_weight: number; // 0-1
    trend_weight: number; // 0-1
    margin_weight: number; // 0-1
  };
  
  // Thresholds for Recommendations
  thresholds: {
    keep_percentile: number; // Items above this percentile should be kept
    replace_percentile: number; // Items below this percentile should be replaced
    min_events_for_analysis: number;
    trend_significance_threshold: number; // % change to be considered significant
  };
  
  // Reporting Preferences
  reporting: {
    default_period_months: number;
    include_seasonal_analysis: boolean;
    include_profit_margin_analysis: boolean;
    group_by_outlet: boolean;
  };
}

// Export utility types
export type PerformanceMetric = 'revenue' | 'frequency' | 'trend' | 'margin' | 'overall';
export type RecommendationAction = 'keep' | 'modify' | 'replace' | 'promote' | 'review';
export type AnalysisPeriod = 'last_30_days' | 'last_quarter' | 'last_6_months' | 'last_year' | 'custom';

// API Response Types
export interface MenuAnalyticsAPIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  filters_applied: MenuAnalyticsFilters;
  generated_at: Date;
  cache_expires_at?: Date;
}

export interface MenuPerformanceAPIResponse extends MenuAnalyticsAPIResponse<MenuItemPerformance[]> {
  summary: {
    total_items: number;
    date_range: string;
    top_performer: string;
    worst_performer: string;
  };
}

export interface MenuRevisionAPIResponse extends MenuAnalyticsAPIResponse<MenuRevisionReport> {
  recommendations_summary: {
    high_priority_changes: number;
    potential_revenue_impact: number;
    estimated_implementation_time: string;
  };
}
