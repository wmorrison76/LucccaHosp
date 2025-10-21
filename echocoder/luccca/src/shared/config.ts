// Shim for configuration helpers

export const ConfigHelpers = {
  getIntegrationStatus: () => ({
    weather: true,
    echoCRM: true,
    prismm: false,
    accounting: false,
  }),
};
