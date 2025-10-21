// Utility to analyze item trends and behaviors
export function analyzeItemTrends(itemName, purchaseHistory, recipeUsage, forecastData) {
    const recentOrders = purchaseHistory.filter(entry => entry.name === itemName);
    const trend = calculatePriceTrend(recentOrders);
    const recentFrequency = recentOrders.length;

    if (recentFrequency >= 3 && forecastData[itemName] < 1) {
        return `Chef, you've ordered ${itemName} 3+ times this week, but forecast shows low need. Let's go check the walk-in?`;
    }
    if (trend === 'up') {
        return `Heads up: ${itemName} has been trending upward in price.`;
    }
    return null;
}

function calculatePriceTrend(orders) {
    if (orders.length < 2) return 'flat';
    const prices = orders.map(o => o.price);
    return prices[0] < prices[prices.length - 1] ? 'up' : 'down';
}
