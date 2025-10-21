import { BanquetForecastEngine } from './BanquetForecastEngine';
import { PastryForecastEngine } from './PastryForecastEngine';
import { ProductionPlanner } from './ProductionPlanner';

export const GlobalForecastOrchestrator = {
  async compute(inputs) {
    const banquet = BanquetForecastEngine.compute(inputs.beos || []);
    const pastry = PastryForecastEngine.plan(inputs.pastryDemands || [], inputs.pastrySpecs || []);
    const production = ProductionPlanner.plan(inputs.productionOrders || []);
    return { banquet, pastry, production };
  }
};
