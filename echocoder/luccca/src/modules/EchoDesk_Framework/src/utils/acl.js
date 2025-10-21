export const Access = {
  canView(key, user, policy){
    if (!policy || !policy[key]) return true
    const rules = policy[key]
    if (rules === 'none') return false
    if (rules === 'all') return true
    if (Array.isArray(rules.roles)) {
      return user?.roles?.some(r => rules.roles.includes(r))
    }
    return !!rules.allow
  },
  summaryOnly(key, user, policy){
    const rules = policy?.[key]
    return !!rules?.summaryOnly
  }
}

export default Access;
