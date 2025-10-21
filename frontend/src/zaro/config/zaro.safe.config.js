// ZARO Safe Mode Config
export const ZARO_CONFIG = {
  mode: "safe", // [safe, diagnostic, override]
  allowWrite: false,
  allowDelete: false,
  allowSystemEdit: false,
  logging: true,
  logLevel: "verbose",
  requireConfirmation: true,
  UIDGuard: true, // Guardian-secure UID requirement
  checkpointFrequency: 3, // after every 3 file actions, checkpoint must succeed
  echoWhisperEnabled: true,
  maxWritePerMinute: 1,
  linkedGuardians: ["Argus2.0", "RedPhoenix", "OdinSpear"],
};
