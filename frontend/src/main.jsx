import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Polyfill requestIdleCallback
if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => setTimeout(cb, 1);
}
if (!window.cancelIdleCallback) {
  window.cancelIdleCallback = (id) => clearTimeout(id);
}

// Simple render
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
