import React, { useState, useCallback, Suspense, useEffect } from "react";

const Sidebar = React.lazy(() => import("./components/Sidebar.jsx"));
const Board = React.lazy(() => import("./board/Board.jsx"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0f1c2e",
          color: "#f87171",
          fontFamily: "system-ui, sans-serif",
          flexDirection: "column",
          gap: "16px",
          padding: "20px"
        }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>Application Error</div>
          <pre style={{
            maxWidth: "600px",
            padding: "12px",
            backgroundColor: "#1f2937",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "12px"
          }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleDark = useCallback(() => setIsDark(v => !v), []);

  return (
    <ErrorBoundary>
      <div className={isDark ? "dark" : "light"} style={{ display: "flex", width: "100vw", height: "100vh", margin: 0, padding: 0, fontFamily: "system-ui, sans-serif" }}>
        <Suspense fallback={<div style={{ width: "45px", flexShrink: 0 }} />}>
          <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isDarkMode={isDark}
            toggleDarkMode={toggleDark}
          />
        </Suspense>

        <main style={{ flex: 1, overflow: "hidden", position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          <Suspense fallback={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "16px" }}>
              Loading dashboard...
            </div>
          }>
            <Board />
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
