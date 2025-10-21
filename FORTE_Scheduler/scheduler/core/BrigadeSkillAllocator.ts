/**
 * BrigadeSkillAllocator
 * Assigns pastry tasks based on brigade skill ratings.
 */
export const BrigadeSkillAllocator = {
  allocate(plan, employees) {
    // Placeholder: Assign tasks based on skill tags matching employee roles
    return plan.batches.map(batch => ({
      ...batch,
      assignedTo: employees.filter(e => e.roles.some(r => batch.stageBreakdown.some(s => s.skillTags.includes(r)))).map(e => e.name)
    }));
  }
};
