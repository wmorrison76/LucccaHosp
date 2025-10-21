export function logSystemEvent(event) {
  const timestamp = new Date().toISOString();
  console.log(`[LUCCCA LOG] ${timestamp}: ${event}`);
}
// Lightweight logger with levels
export const logger = {
  info: (msg, ...args) => console.log(`[INFO] ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN] ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[ERROR] ${msg}`, ...args),
};
