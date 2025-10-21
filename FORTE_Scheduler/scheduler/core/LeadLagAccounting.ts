/**
 * LeadLagAccounting
 * Tracks pastry labor spent weeks ahead of revenue.
 */
export const LeadLagAccounting = {
  compute(pastryPlan, revenueCalendar) {
    // Maps labor vs revenue by date
    const wipLabor = pastryPlan.batches.map(batch => ({
      date: batch.plannedDate,
      laborHours: batch.laborMinutesActive / 60
    }));
    return { wipLabor, laborVsRevenue: [] };
  }
};
