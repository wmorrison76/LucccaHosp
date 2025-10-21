import React, { useState, useCallback, Suspense } from "react";

const Navigation = React.lazy(() => import("./components/Navigation.jsx"));
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
  const [isDark, setIsDark] = useState(true);

  return (
    <ErrorBoundary>
      <div className={isDark ? "dark" : "light"} style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, fontFamily: "system-ui, sans-serif", backgroundColor: isDark ? "#0a1420" : "#ffffff", color: isDark ? "#e0f2fe" : "#1f2937" }}>
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>

        <main style={{ width: "100%", height: "100%", overflow: "hidden" }}>
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
