import React, { useState, useCallback, Suspense } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "#0f1c2e", color: "white", fontFamily: "system-ui, sans-serif" }}>
      {/* Test: Just render simple content to verify app works */}
      <div style={{ width: "60px", background: "#111", borderRight: "1px solid rgba(22,224,255,0.2)" }}>
        <button onClick={toggleSidebar} style={{ width: "100%", padding: "12px", background: "transparent", border: "none", color: "#7fffd4", cursor: "pointer" }}>
          ☰
        </button>
      </div>

      <main style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#7fffd4", marginBottom: "16px" }}>Test View</h1>
          <p style={{ color: "#999" }}>If you see this, the app renders</p>
          <p style={{ color: "#666", marginTop: "20px", fontSize: "12px" }}>Now loading Sidebar...</p>
          <Suspense fallback={<p style={{ color: "#999" }}>Sidebar loading...</p>}>
            <SidebarTest isOpen={isOpen} toggleSidebar={toggleSidebar} isDarkMode={isDark} toggleDarkMode={toggleDark} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// Separate component to test Sidebar loading
function SidebarTest(props) {
  try {
    const Sidebar = require("./components/Sidebar.jsx").default;
    return <Sidebar {...props} />;
  } catch (err) {
    return (
      <div style={{ color: "#f87171", marginTop: "16px", padding: "12px", border: "1px solid #f87171", borderRadius: "4px" }}>
        <p>Sidebar Error:</p>
        <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap", maxWidth: "400px" }}>{String(err)}</pre>
      </div>
    );
  }
}
