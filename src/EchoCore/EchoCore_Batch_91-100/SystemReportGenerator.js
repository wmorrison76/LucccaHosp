// SystemReportGenerator.js
/**
 * Generates a simple system report from health and audit logs.
 */
export default class SystemReportGenerator {
  constructor(healthMonitor, auditLog) {
    this.healthMonitor = healthMonitor;
    this.auditLog = auditLog;
  }

  generateReport() {
    return {
      status: this.healthMonitor.getStatus(),
      logs: this.auditLog.getLogs(),
      generatedAt: new Date(),
    };
  }
}
