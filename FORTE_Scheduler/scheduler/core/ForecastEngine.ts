export const ForecastEngine = {
  async compute(input: any): Promise<{ covers: number; sales: number }> {
    return { covers: input.covers || 0, sales: input.sales || 0 };
  }
};
