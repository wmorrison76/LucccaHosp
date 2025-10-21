import React, { useState, useCallback, Suspense } from "react";

let SidebarComponent = null;
let BoardComponent = null;

try {
  SidebarComponent = require("./components/Sidebar.jsx").default;
} catch (e) {
  console.error("Sidebar error:", e);
}

try {
  BoardComponent = require("./board/Board.jsx").default;
} catch (e) {
  console.error("Board error:", e);
}

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  if (!SidebarComponent) {
    return <div style={{ color: "red", padding: "20px" }}>Sidebar failed to load</div>;
  }

  if (!BoardComponent) {
    return <div style={{ color: "red", padding: "20px" }}>Board failed to load</div>;
  }

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "#0f1c2e", color: "white", fontFamily: "system-ui, sans-serif" }}>
      <SidebarComponent
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDark}
        toggleDarkMode={toggleDark}
      />

      <main style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <Suspense fallback={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#999" }}>
            Loading dashboard...
          </div>
        }>
          <BoardComponent />
        </Suspense>
      </main>
    </div>
  );
}
