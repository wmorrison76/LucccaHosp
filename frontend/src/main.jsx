import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

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
  try {
    createRoot(root).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } catch (err) {
    console.error("[Root Error]", err);
    root.innerHTML = `<div style="width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; flex-direction:column; background:#0f1c2e; color:#fff; font-family:system-ui">
      <h1 style="color:#7fffd4">ERROR</h1>
      <pre style="color:#f87171; max-width:90%; white-space:pre-wrap; overflow:auto; max-height:60vh; font-size:12px">${err.message}\n\n${err.stack}</pre>
    </div>`;
  }
}
