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
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  const fallback = <div className="p-6 text-gray-400">Loading…</div>;

  useEffect(() => { document.title = "LUCCCA | Unified Dashboard"; }, []);

  return (
    <PresenceProvider>
      <CommandPalette />
      <RescueShell>
        <div className={`flex h-screen w-screen ${isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
          <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isDarkMode={isDark}
            toggleDarkMode={toggleDark}
          />
          <main className="flex-1 overflow-hidden">
            <Suspense fallback={fallback}>
              <Routes>
                <Route path="/" element={<Navigate to={REAL_DASHBOARD_PATH} replace />} />
                <Route path={REAL_DASHBOARD_PATH} element={<Board />} />
                <Route path="/kitchen-library" element={<Culinary />} />
                <Route path="/baking-pastry" element={<BakingPastry />} />
                <Route path="/mixology" element={<Mixology />} />
                <Route path="/schedules" element={<Scheduling />} />
                <Route path="/builder" element={<EchoBuilder />} />
                <Route path="*" element={<Navigate to={REAL_DASHBOARD_PATH} replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        <TelemetryOverlay />
      </RescueShell>
      <MultiCursorOverlay />
    </PresenceProvider>
  );
}
