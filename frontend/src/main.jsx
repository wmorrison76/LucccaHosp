import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/theme-base.css";

if (typeof window !== 'undefined') {
  if (!window.requestIdleCallback) {
    window.requestIdleCallback = (callback) => setTimeout(callback, 1);
  }
  if (!window.cancelIdleCallback) {
    window.cancelIdleCallback = (id) => clearTimeout(id);
  }
}

const root = document.getElementById("root");
if (root) {
  root.style.width = "100vw";
  root.style.height = "100vh";
  root.style.margin = "0";
  root.style.padding = "0";
  createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
