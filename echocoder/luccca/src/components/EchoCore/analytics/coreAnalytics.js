// File: src/components/EchoCore/analytics/coreAnalytics.js
// [TEAM LOG: Analytics] - Core telemetry and usage tracking for Echo assistant

export function trackEvent(eventName, data = {}) {
  console.log(`[EchoAnalytics] Event: ${eventName}`, data);
  // TODO: Connect to remote analytics pipeline
}

export function trackInteraction(componentName, action, meta = {}) {
  trackEvent(`Interaction:${componentName}`, {
    action,
    ...meta,
  });
}

export function trackError(error, context = {}) {
  trackEvent("Error", {
    message: error?.message || "Unknown error",
    stack: error?.stack,
    ...context,
  });
}
