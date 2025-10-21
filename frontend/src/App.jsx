import React, { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "#0f1c2e", color: "white", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDark}
        toggleDarkMode={toggleDark}
      />

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#7fffd4", marginBottom: "16px" }}>LUCCCA</h1>
          <p style={{ color: "#999", fontSize: "16px" }}>Dashboard loading...</p>
        </div>
      </main>
    </div>
  );
}
