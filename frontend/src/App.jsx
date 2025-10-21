import React, { useState, useCallback, Suspense } from "react";

// Lazy load Board to catch issues
const Board = React.lazy(() => import("./board/Board.jsx"));
const Sidebar = React.lazy(() => import("./components/Sidebar.jsx"));

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "#0f1c2e", color: "white", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Suspense fallback={<div style={{ width: "60px", background: "#111" }} />}>
        <React.lazy>
          {React.lazy(() => import("./components/Sidebar.jsx")).type && (
            React.lazy(() => import("./components/Sidebar.jsx"))
          )}
        </React.lazy>
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDark}
          toggleDarkMode={toggleDark}
        />
      </Suspense>

      {/* Main Content - Full Board */}
      <main style={{ flex: 1, overflow: "hidden" }}>
        <Suspense fallback={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#999" }}>
            Loading dashboard...
          </div>
        }>
          <Board />
        </Suspense>
      </main>
    </div>
  );
}
