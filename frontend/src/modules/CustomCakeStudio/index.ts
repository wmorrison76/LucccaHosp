// Explicit default re-exports (avoid star-only barrels)

// Forward defaults + named, so folder imports never break
export { default as CustomCakeStudio } from "./pages/Studio";
export * from "./pages/Studio";

export { default as EchoCanvas } from "./bridge/EchoCanvas";
export * from "./bridge/EchoCanvas";

// Delete these two-line pairs if the target file doesn't exist in your repo:
export { default as CustomCakeStudioLegacy } from "./pages/LegacyHost";
export * from "./pages/LegacyHost";

export { default as App } from "./App";
export * from "./App";

export { default as Tabs } from "./tabs";
export * from "./tabs";
