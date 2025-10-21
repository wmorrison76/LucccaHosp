import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Board from "./board/Board.jsx";
import { PresenceProvider, MultiCursorOverlay } from "./framework/presence/PresenceProvider";
import { TelemetryOverlay } from "./framework/telemetry/TelemetryOverlay";
import { RescueShell } from "./framework/errors/RescueShell";
import { CommandPalette } from "./framework/command/CommandPalette";

const Culinary     = lazy(() => import("./components/KitchenLibraryTabs.jsx"));
const BakingPastry = lazy(() => import("./components/PastryLibrary/PastryLibrary.jsx"));
const Mixology     = lazy(() => import("./components/MixologyTabs.jsx"));
const Scheduling   = lazy(() => import("./modules/scheduling/client/App.tsx"));
const EchoBuilder  = lazy(() => import("./modules/EchoBuilder/EchoBuilder.jsx"));

const REAL_DASHBOARD_PATH = "/whiteboard";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "#0f1c2e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#7fffd4", marginBottom: "16px" }}>LUCCCA</h1>
        <p style={{ color: "#999", fontSize: "16px" }}>Loading application...</p>
      </div>
    </div>
  );
}
