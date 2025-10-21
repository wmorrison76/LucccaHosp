// File: utils/invoice/auditTrailLogger.js
export function logComplianceAudit(outlet, type, date, userRole) {
  console.log(`📝 Audit logged: ${outlet} — ${type} on ${date} by ${userRole}`);
  // In production: write to audit DB or compliance report engine
}