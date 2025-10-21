// Menu Analytics Service
// Processes BEO/REO data to provide menu performance insights and recommendations

import {
  MenuItemPerformance,
  MenuRevisionReport,
  CategoryPerformance,
  MenuAnalyticsFilters,
  BEOItemTracking,
  MenuAnalyticsConfig,
  MenuOptimizationSuggestion,
  ItemComparisonAnalysis,
  PerformanceMetric,
  RecommendationAction
} from './menu-analytics-types';

export class MenuAnalyticsService {
  private static config: MenuAnalyticsConfig = {
    scoring_weights: {
      revenue_weight: 0.4,
      frequency_weight: 0.3,
      trend_weight: 0.2,
      margin_weight: 0.1
    },
    thresholds: {
      keep_percentile: 75,
      replace_percentile: 25,
      min_events_for_analysis: 3,
      trend_significance_threshold: 10
    },
    reporting: {
      default_period_months: 6,
      include_seasonal_analysis: true,
      include_profit_margin_analysis: true,
      group_by_outlet: true
    }
  };

  /**
   * Analyze menu item performance from BEO/REO data
   */
  static async analyzeMenuPerformance(
    beoData: BEOItemTracking[],
    filters: MenuAnalyticsFilters
  ): Promise<MenuItemPerformance[]> {
    // Group BEO data by item
    const itemGroups = this.groupBEODataByItem(beoData, filters);
    
    const performances: MenuItemPerformance[] = [];

    for (const [itemId, itemData] of itemGroups.entries()) {
      const performance = await this.calculateItemPerformance(itemId, itemData, filters);
      if (performance) {
        performances.push(performance);
      }
    }

    // Calculate percentile scores and rankings
    return this.calculateRankingsAndPercentiles(performances);
  }

  /**
   * Generate comprehensive menu revision report
   */
  static async generateMenuRevisionReport(
    beoData: BEOItemTracking[],
    filters: MenuAnalyticsFilters
  ): Promise<MenuRevisionReport> {
    const performances = await this.analyzeMenuPerformance(beoData, filters);
    const categoryPerformance = this.analyzeCategoryPerformance(performances);

    // Categorize items by recommendation
    const itemsByRecommendation = this.categorizeItemsByRecommendation(performances);

    // Calculate summary statistics
    const totalRevenue = performances.reduce((sum, item) => sum + item.total_revenue, 0);
    const topCategory = categoryPerformance.reduce((prev, current) => 
      current.average_performance_score > prev.average_performance_score ? current : prev
    );
    const worstCategory = categoryPerformance.reduce((prev, current) => 
      current.average_performance_score < prev.average_performance_score ? current : prev
    );

    return {
      outlet_id: filters.outlet_ids?.[0],
      outlet_name: await this.getOutletName(filters.outlet_ids?.[0]),
      report_period: {
        start_date: filters.date_range.start_date,
        end_date: filters.date_range.end_date
      },
      category_performance: categoryPerformance,
      items_to_keep: itemsByRecommendation.keep,
      items_to_promote: itemsByRecommendation.promote,
      items_to_modify: itemsByRecommendation.modify,
      items_to_replace: itemsByRecommendation.replace,
      items_to_review: itemsByRecommendation.review,
      total_items_analyzed: performances.length,
      total_revenue_analyzed: totalRevenue,
      top_performing_category: topCategory.category,
      worst_performing_category: worstCategory.category,
      revenue_opportunity: this.calculateRevenueOpportunity(performances),
      recommended_changes_count: itemsByRecommendation.replace.length + itemsByRecommendation.modify.length,
      menu_health_score: this.calculateMenuHealthScore(performances),
      generated_at: new Date(),
      generated_by: 'System'
    };
  }

  /**
   * Compare two menu items for replacement decisions
   */
  static compareMenuItems(
    itemA: MenuItemPerformance,
    itemB: MenuItemPerformance
  ): ItemComparisonAnalysis {
    const revenueDiff = itemA.total_revenue - itemB.total_revenue;
    const frequencyDiff = itemA.order_frequency - itemB.order_frequency;
    
    let recommendation: 'keep_both' | 'choose_a' | 'choose_b' | 'replace_both';
    
    if (itemA.percentile_score > 75 && itemB.percentile_score > 75) {
      recommendation = 'keep_both';
    } else if (itemA.percentile_score < 25 && itemB.percentile_score < 25) {
      recommendation = 'replace_both';
    } else if (itemA.percentile_score > itemB.percentile_score) {
      recommendation = 'choose_a';
    } else {
      recommendation = 'choose_b';
    }

    return {
      item_a: itemA,
      item_b: itemB,
      comparison_metrics: {
        revenue_difference: revenueDiff,
        order_frequency_difference: frequencyDiff,
        trend_comparison: this.compareTrends(itemA.trend, itemB.trend),
        recommendation
      }
    };
  }

  /**
   * Get optimization suggestions for menu improvement
   */
  static getMenuOptimizationSuggestions(
    performances: MenuItemPerformance[]
  ): MenuOptimizationSuggestion[] {
    const suggestions: MenuOptimizationSuggestion[] = [];

    // Suggest removing poor performers
    const poorPerformers = performances.filter(item => item.percentile_score < 25);
    poorPerformers.forEach(item => {
      suggestions.push({
        type: 'remove_item',
        target_item: item.item_name,
        suggested_action: `Remove "${item.item_name}" - consistently underperforming`,
        expected_impact: {
          revenue_change: -item.total_revenue * 0.1, // Minimal impact since it's poor performing
          order_frequency_change: -item.order_frequency,
          confidence_level: 'high'
        },
        implementation_notes: `Replace with similar item from successful category. Last ordered ${item.order_frequency} times with only ${item.percentile_score}% performance.`
      });
    });

    // Suggest promoting hidden gems
    const hiddenGems = performances.filter(item => 
      item.percentile_score > 70 && item.order_frequency < this.getAverageOrderFrequency(performances) * 0.7
    );
    hiddenGems.forEach(item => {
      suggestions.push({
        type: 'change_position',
        target_item: item.item_name,
        suggested_action: `Promote "${item.item_name}" - high performance but low visibility`,
        expected_impact: {
          revenue_change: item.total_revenue * 0.3,
          order_frequency_change: item.order_frequency * 0.5,
          confidence_level: 'medium'
        },
        implementation_notes: `Move to prominent menu position or include in package deals. High performance score (${item.percentile_score}%) but underutilized.`
      });
    });

    // Suggest price adjustments for high performers
    const highPerformers = performances.filter(item => 
      item.percentile_score > 85 && item.trend === 'increasing'
    );
    highPerformers.forEach(item => {
      if (item.price_sensitivity_score && item.price_sensitivity_score < 0.3) {
        suggestions.push({
          type: 'modify_price',
          target_item: item.item_name,
          suggested_action: `Consider price increase for "${item.item_name}" - high demand, low price sensitivity`,
          expected_impact: {
            revenue_change: item.total_revenue * 0.15,
            order_frequency_change: item.order_frequency * -0.05,
            confidence_level: 'medium'
          },
          implementation_notes: `Strong performance with increasing trend. Price sensitivity analysis suggests 10-15% increase possible.`
        });
      }
    });

    return suggestions.slice(0, 10); // Return top 10 suggestions
  }

  /**
   * Private helper methods
   */
  private static groupBEODataByItem(
    beoData: BEOItemTracking[],
    filters: MenuAnalyticsFilters
  ): Map<string, BEOItemTracking[]> {
    const filteredData = this.applyFilters(beoData, filters);
    const itemGroups = new Map<string, BEOItemTracking[]>();

    filteredData.forEach(beo => {
      beo.items.forEach(item => {
        const key = `${item.catalog_item_id}_${beo.outlet_id || 'default'}`;
        if (!itemGroups.has(key)) {
          itemGroups.set(key, []);
        }
        itemGroups.get(key)!.push(beo);
      });
    });

    return itemGroups;
  }

  private static async calculateItemPerformance(
    itemId: string,
    beoData: BEOItemTracking[],
    filters: MenuAnalyticsFilters
  ): Promise<MenuItemPerformance | null> {
    if (beoData.length < this.config.thresholds.min_events_for_analysis) {
      return null;
    }

    // Extract item details from first occurrence
    const firstItem = beoData[0].items.find(item => 
      `${item.catalog_item_id}_${beoData[0].outlet_id || 'default'}` === itemId
    );
    if (!firstItem) return null;

    // Calculate metrics
    const totalQuantity = beoData.reduce((sum, beo) => {
      const item = beo.items.find(i => i.catalog_item_id === firstItem.catalog_item_id);
      return sum + (item?.quantity || 0);
    }, 0);

    const totalRevenue = beoData.reduce((sum, beo) => {
      const item = beo.items.find(i => i.catalog_item_id === firstItem.catalog_item_id);
      return sum + (item?.total_price || 0);
    }, 0);

    const uniqueEvents = beoData.length;
    const averageOrderSize = totalQuantity / uniqueEvents;
    const revenuePerEvent = totalRevenue / uniqueEvents;

    // Calculate trend (compare first half vs second half of period)
    const { trend, trendPercentage } = this.calculateTrend(beoData, firstItem.catalog_item_id);

    // Calculate seasonal performance if enabled
    const seasonalPerformance = this.config.reporting.include_seasonal_analysis 
      ? this.calculateSeasonalPerformance(beoData, firstItem.catalog_item_id)
      : undefined;

    return {
      item_id: firstItem.catalog_item_id,
      item_name: firstItem.item_name,
      category: firstItem.category as any,
      outlet_id: beoData[0].outlet_id,
      outlet_name: await this.getOutletName(beoData[0].outlet_id),
      total_orders: uniqueEvents,
      total_revenue: totalRevenue,
      total_quantity: totalQuantity,
      unique_events: uniqueEvents,
      performance_period: {
        start_date: filters.date_range.start_date,
        end_date: filters.date_range.end_date,
        period_type: 'custom'
      },
      average_order_size: averageOrderSize,
      revenue_per_event: revenuePerEvent,
      order_frequency: uniqueEvents,
      rank_in_category: 0, // Will be calculated later
      percentile_score: 0, // Will be calculated later
      trend,
      trend_percentage: trendPercentage,
      recommendation: 'review', // Will be calculated later
      recommendation_reason: '',
      seasonal_performance: seasonalPerformance,
      last_updated: new Date()
    };
  }

  private static calculateRankingsAndPercentiles(
    performances: MenuItemPerformance[]
  ): MenuItemPerformance[] {
    // Sort by overall performance score
    const sorted = performances.sort((a, b) => {
      const scoreA = this.calculateOverallScore(a);
      const scoreB = this.calculateOverallScore(b);
      return scoreB - scoreA;
    });

    // Calculate percentiles and rankings by category
    const categories = [...new Set(performances.map(p => p.category))];
    
    categories.forEach(category => {
      const categoryItems = sorted.filter(p => p.category === category);
      categoryItems.forEach((item, index) => {
        item.rank_in_category = index + 1;
        item.percentile_score = Math.round(((categoryItems.length - index) / categoryItems.length) * 100);
        
        // Generate recommendation based on percentile
        const recommendation = this.generateRecommendation(item);
        item.recommendation = recommendation.action;
        item.recommendation_reason = recommendation.reason;
      });
    });

    return sorted;
  }

  private static calculateOverallScore(performance: MenuItemPerformance): number {
    const weights = this.config.scoring_weights;
    
    const revenueScore = performance.total_revenue; // Raw revenue
    const frequencyScore = performance.order_frequency; // Raw frequency
    const trendScore = this.getTrendScore(performance.trend, performance.trend_percentage);
    const marginScore = performance.profit_margin || 50; // Default if not available

    return (
      (revenueScore * weights.revenue_weight) +
      (frequencyScore * weights.frequency_weight) +
      (trendScore * weights.trend_weight) +
      (marginScore * weights.margin_weight)
    );
  }

  private static generateRecommendation(performance: MenuItemPerformance): {
    action: RecommendationAction;
    reason: string;
  } {
    const { percentile_score, trend, order_frequency } = performance;
    const thresholds = this.config.thresholds;

    if (percentile_score >= thresholds.keep_percentile) {
      if (order_frequency < 5) {
        return {
          action: 'promote',
          reason: 'High performance but low visibility - consider featuring prominently'
        };
      }
      return {
        action: 'keep',
        reason: 'Strong performer - maintain current positioning'
      };
    } else if (percentile_score <= thresholds.replace_percentile) {
      return {
        action: 'replace',
        reason: 'Consistently underperforming - consider removal or major modification'
      };
    } else {
      if (trend === 'decreasing') {
        return {
          action: 'modify',
          reason: 'Declining performance - needs attention to prevent further decline'
        };
      } else if (trend === 'increasing') {
        return {
          action: 'promote',
          reason: 'Improving performance - capitalize on positive trend'
        };
      } else {
        return {
          action: 'review',
          reason: 'Moderate performance - monitor closely for changes'
        };
      }
    }
  }

  private static calculateTrend(
    beoData: BEOItemTracking[],
    itemId: string
  ): { trend: 'increasing' | 'decreasing' | 'stable'; trendPercentage: number } {
    const sortedData = beoData.sort((a, b) => a.event_date.getTime() - b.event_date.getTime());
    const midPoint = Math.floor(sortedData.length / 2);
    
    const firstHalf = sortedData.slice(0, midPoint);
    const secondHalf = sortedData.slice(midPoint);

    const firstHalfRevenue = this.getRevenueForPeriod(firstHalf, itemId);
    const secondHalfRevenue = this.getRevenueForPeriod(secondHalf, itemId);

    if (firstHalfRevenue === 0) {
      return { trend: 'stable', trendPercentage: 0 };
    }

    const percentageChange = ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100;
    const threshold = this.config.thresholds.trend_significance_threshold;

    if (percentageChange > threshold) {
      return { trend: 'increasing', trendPercentage: percentageChange };
    } else if (percentageChange < -threshold) {
      return { trend: 'decreasing', trendPercentage: percentageChange };
    } else {
      return { trend: 'stable', trendPercentage: percentageChange };
    }
  }

  private static getRevenueForPeriod(beoData: BEOItemTracking[], itemId: string): number {
    return beoData.reduce((sum, beo) => {
      const item = beo.items.find(i => i.catalog_item_id === itemId);
      return sum + (item?.total_price || 0);
    }, 0);
  }

  private static calculateSeasonalPerformance(
    beoData: BEOItemTracking[],
    itemId: string
  ) {
    const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
    return seasons.map(season => {
      const seasonData = beoData.filter(beo => beo.season === season);
      const revenue = this.getRevenueForPeriod(seasonData, itemId);
      const orderCount = seasonData.filter(beo => 
        beo.items.some(item => item.catalog_item_id === itemId)
      ).length;

      return {
        season,
        performance_score: orderCount > 0 ? revenue / orderCount : 0,
        order_count: orderCount,
        revenue
      };
    });
  }

  private static applyFilters(
    beoData: BEOItemTracking[],
    filters: MenuAnalyticsFilters
  ): BEOItemTracking[] {
    return beoData.filter(beo => {
      // Date range filter
      if (beo.event_date < filters.date_range.start_date || 
          beo.event_date > filters.date_range.end_date) {
        return false;
      }

      // Outlet filter
      if (filters.outlet_ids && filters.outlet_ids.length > 0) {
        if (!beo.outlet_id || !filters.outlet_ids.includes(beo.outlet_id)) {
          return false;
        }
      }

      // Guest count filter
      if (filters.guest_count_range) {
        if (beo.guest_count < filters.guest_count_range.min || 
            beo.guest_count > filters.guest_count_range.max) {
          return false;
        }
      }

      // Event type filter
      if (filters.event_types && filters.event_types.length > 0) {
        if (!filters.event_types.includes(beo.event_type)) {
          return false;
        }
      }

      return true;
    });
  }

  private static analyzeCategoryPerformance(
    performances: MenuItemPerformance[]
  ): CategoryPerformance[] {
    const categories = [...new Set(performances.map(p => p.category))];
    
    return categories.map(category => {
      const categoryItems = performances.filter(p => p.category === category);
      const totalRevenue = categoryItems.reduce((sum, item) => sum + item.total_revenue, 0);
      const avgScore = categoryItems.reduce((sum, item) => sum + item.percentile_score, 0) / categoryItems.length;
      
      const topPerformer = categoryItems.reduce((prev, current) => 
        current.percentile_score > prev.percentile_score ? current : prev
      );
      
      const worstPerformer = categoryItems.reduce((prev, current) => 
        current.percentile_score < prev.percentile_score ? current : prev
      );

      // Determine category trend
      const increasingItems = categoryItems.filter(item => item.trend === 'increasing').length;
      const decreasingItems = categoryItems.filter(item => item.trend === 'decreasing').length;
      
      let categoryTrend: 'growing' | 'declining' | 'stable';
      if (increasingItems > decreasingItems * 1.5) {
        categoryTrend = 'growing';
      } else if (decreasingItems > increasingItems * 1.5) {
        categoryTrend = 'declining';
      } else {
        categoryTrend = 'stable';
      }

      return {
        category,
        total_items: categoryItems.length,
        total_revenue: totalRevenue,
        average_performance_score: Math.round(avgScore),
        top_performer: {
          item_name: topPerformer.item_name,
          performance_score: topPerformer.percentile_score
        },
        worst_performer: {
          item_name: worstPerformer.item_name,
          performance_score: worstPerformer.percentile_score
        },
        category_trend: categoryTrend,
        recommendation: this.getCategoryRecommendation(categoryTrend, avgScore)
      };
    });
  }

  private static categorizeItemsByRecommendation(
    performances: MenuItemPerformance[]
  ) {
    return {
      keep: performances.filter(p => p.recommendation === 'keep'),
      promote: performances.filter(p => p.recommendation === 'promote'),
      modify: performances.filter(p => p.recommendation === 'modify'),
      replace: performances.filter(p => p.recommendation === 'replace'),
      review: performances.filter(p => p.recommendation === 'review')
    };
  }

  private static calculateRevenueOpportunity(performances: MenuItemPerformance[]): number {
    const poorPerformers = performances.filter(p => p.percentile_score < 25);
    const avgGoodPerformerRevenue = performances
      .filter(p => p.percentile_score > 75)
      .reduce((sum, p) => sum + p.total_revenue, 0) / performances.filter(p => p.percentile_score > 75).length || 0;

    return poorPerformers.reduce((opportunity, performer) => {
      return opportunity + Math.max(0, avgGoodPerformerRevenue - performer.total_revenue);
    }, 0);
  }

  private static calculateMenuHealthScore(performances: MenuItemPerformance[]): number {
    const avgPercentile = performances.reduce((sum, p) => sum + p.percentile_score, 0) / performances.length;
    const goodPerformers = performances.filter(p => p.percentile_score > 70).length;
    const poorPerformers = performances.filter(p => p.percentile_score < 30).length;
    
    const diversityScore = Math.min(100, (goodPerformers / performances.length) * 100);
    const consistencyScore = Math.max(0, 100 - (poorPerformers / performances.length) * 100);
    
    return Math.round((avgPercentile + diversityScore + consistencyScore) / 3);
  }

  private static getTrendScore(trend: string, percentage: number): number {
    switch (trend) {
      case 'increasing': return 80 + Math.min(20, percentage);
      case 'decreasing': return 20 - Math.min(20, Math.abs(percentage));
      case 'stable': return 50;
      default: return 50;
    }
  }

  private static compareTrends(trendA: string, trendB: string): string {
    if (trendA === 'increasing' && trendB === 'decreasing') return 'A is trending up, B is declining';
    if (trendA === 'decreasing' && trendB === 'increasing') return 'B is trending up, A is declining';
    if (trendA === trendB) return `Both items are ${trendA}`;
    return `Mixed trends: A is ${trendA}, B is ${trendB}`;
  }

  private static getAverageOrderFrequency(performances: MenuItemPerformance[]): number {
    return performances.reduce((sum, p) => sum + p.order_frequency, 0) / performances.length;
  }

  private static getCategoryRecommendation(trend: string, avgScore: number): string {
    if (avgScore > 75) {
      return trend === 'growing' ? 'Expand category offerings' : 'Maintain strong performers';
    } else if (avgScore < 40) {
      return 'Review entire category for major changes';
    } else {
      return trend === 'declining' ? 'Focus on category improvement' : 'Monitor category performance';
    }
  }

  private static async getOutletName(outletId?: string): Promise<string | undefined> {
    // In production, this would query the database for outlet information
    const outletMap = new Map([
      ['main_dining', 'Main Dining Room'],
      ['banquet', 'Banquet Hall'],
      ['outdoor', 'Outdoor Pavilion'],
      ['private_dining', 'Private Dining Room'],
      ['bar_lounge', 'Bar & Lounge']
    ]);
    
    return outletMap.get(outletId || 'main_dining');
  }

  /**
   * Update analytics configuration
   */
  static updateConfig(newConfig: Partial<MenuAnalyticsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  static getConfig(): MenuAnalyticsConfig {
    return { ...this.config };
  }
}
