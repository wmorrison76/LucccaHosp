import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Polyfill requestIdleCallback
if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => setTimeout(cb, 1);
}
if (!window.cancelIdleCallback) {
  window.cancelIdleCallback = (id) => clearTimeout(id);
}

// Simple render without CSS
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
