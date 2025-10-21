// AuditLog.js
/**
 * Stores and retrieves audit logs for system events.
 */
export default class AuditLog {
  constructor() {
    this.logs = [];
  }

  addLog(message) {
    this.logs.push({ message, timestamp: new Date() });
  }

  getLogs() {
    return this.logs;
  }
}
