/**
 * LUCCCA | DB-05
 * File: packages/echoscope/src/voice/VoiceEchoFaceTrigger.ts
 * Created: 2025-07-27 by Window B
 * Depends On: DB-02 GlobalStateBus
 * Exposes: startVoiceControl, stopVoiceControl
 * Location Notes: Bridges voice commands to EchoAvatar / presence bus
 * Tests: packages/echo-testing/src/voice/VoiceEchoFaceTrigger.test.ts
 * ADR: ADR-0005-voice-trigger-and-avatar-bridge.md
 */
export function startVoiceControl() {
  // TODO: integrate with Web Speech API / vosk, dispatch to bus
  return true;
}

export function stopVoiceControl() {
  // TODO: clean up streams
  return true;
}
