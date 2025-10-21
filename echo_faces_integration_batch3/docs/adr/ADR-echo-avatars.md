# ADR-echo-avatars.md

## Title
Echo Avatars Integration & Multi-Persona Identity

## Context
Echo avatars represent user personas (man, woman, binary) with voice-synced lip animations and emotional states. This ADR defines their integration with LUCCCA's Fluid Whiteboard and telemetry.

## Decision
- Avatar components (EF-01 to EF-05) are dockable panels integrated into the PaneRegistry.
- Voice sync uses Web Audio API amplitude mapping.
- Telemetry emits avatar interaction events (`avatar:change`, `avatar:talk`, `avatar:emotion`).

## Status
Accepted - 2025-07-27

## Consequences
- Users can switch avatars and visualize state changes.
- Observability is enhanced via OTel events for avatar interactions.
