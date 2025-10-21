// system.test.js
import SystemHealthMonitor from './SystemHealthMonitor';
import AuditLog from './AuditLog';

test('SystemHealthMonitor updates and retrieves status', () => {
  const monitor = new SystemHealthMonitor();
  monitor.updateStatus('WARN');
  expect(monitor.getStatus()).toBe('WARN');
});

test('AuditLog adds and retrieves logs', () => {
  const log = new AuditLog();
  log.addLog('Test log');
  expect(log.getLogs().length).toBe(1);
});
