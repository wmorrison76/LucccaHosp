import React, { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar.jsx";

// Simple placeholder for Board until we add the full dashboard
function SimpleDashboard() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      background: "linear-gradient(135deg, #0f1c2e 0%, #1a2a3f 100%)",
      borderLeft: "1px solid rgba(22, 224, 255, 0.1)"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#7fffd4", marginBottom: "16px" }}>LUCCCA</h1>
        <p style={{ color: "#999", fontSize: "16px", marginBottom: "32px" }}>Unified Dashboard</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          padding: "0 20px"
        }}>
          {["Whiteboard", "Kitchen", "Pastry", "Schedules"].map(item => (
            <button key={item} style={{
              padding: "12px 16px",
              backgroundColor: "rgba(22, 224, 255, 0.1)",
              border: "1px solid rgba(22, 224, 255, 0.3)",
              color: "#7fffd4",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "14px"
            }} onMouseOver={e => {
              e.target.style.backgroundColor = "rgba(22, 224, 255, 0.2)";
              e.target.style.borderColor = "rgba(22, 224, 255, 0.6)";
            }} onMouseOut={e => {
              e.target.style.backgroundColor = "rgba(22, 224, 255, 0.1)";
              e.target.style.borderColor = "rgba(22, 224, 255, 0.3)";
            }}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <main style={{ flex: 1, overflow: "hidden" }}>
        <SimpleDashboard />
      </main>
    </div>
  );
}
