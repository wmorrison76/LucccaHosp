// File: utils/invoice/auditAI.js
export function auditIntelligenceFlags(currentInventory, previousInventory, purchases) {
  return currentInventory.map(item => {
    const prev = previousInventory.find(p => p.id === item.id) || {};
    const purchased = purchases.find(p => p.id === item.id);

    return {
      ...item,
      flags: [
        item.quantity === 0 && prev.quantity > 0 ? '🔍 Missing - Was Previously Stocked' : null,
        item.quantity > 100 && item.unit === 'case' ? '⚠️ Unusual Quantity' : null,
        purchased ? '🛒 New Purchase Since Last Inventory' : null,
        Math.abs((item.quantity || 0) - (prev.quantity || 0)) > 50 ? '📈 Significant Quantity Change' : null
      ].filter(Boolean)
    };
  });
}

