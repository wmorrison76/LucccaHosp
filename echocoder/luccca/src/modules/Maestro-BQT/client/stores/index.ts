/**
 * Maestro Banquets - Stores Barrel File
 * 
 * Centralized exports for all Zustand stores including
 * event management, captain workflow, and chef operations.
 */

// Event Management Store
export { useEventStore } from './eventStore';
export type { EventState } from './eventStore';

// Captain & Chef Operations Store
export { useCaptainStore, useChefStore } from './captainStore';

// BEO Management Store
export { useBEOStore } from './beoStore';
export type { CalendarEvent } from './beoStore';

export { useCommunicationStore } from './communicationStore';
export type { CommunicationStore } from './communicationStore';

// Re-export all store types for convenience
export * from './eventStore';
export { default as eventStore } from './eventStore';
export * from './captainStore';
export { default as captainStore } from './captainStore';
export * from './beoStore';
export { default as beoStore } from './beoStore';
