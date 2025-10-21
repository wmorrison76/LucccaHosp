import React, { Suspense, lazy } from "react";

const StudioComponent = lazy(() =>
  import("../modules/CustomCakeStudio/pages/Studio")
    .then((m) => ({ default: m.default || m.Studio }))
    .catch(() => {
      console.warn("[EchoCanvasStudio] CustomCakeStudio/pages/Studio not found, trying fallback");
      return import("../components/EchoCanvas.jsx");
    })
);

class EchoCanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[EchoCanvasErrorBoundary] Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          backgroundColor: "#0f1c2e",
          color: "#f87171",
          borderRadius: "8px",
          fontSize: "13px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          overflowY: "auto",
          maxHeight: "300px"
        }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
            EchoCanvas Studio Error
          </div>
          <div>{String(this.state.error?.message || this.state.error)}</div>
          {this.state.error?.stack && (
            <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.7 }}>
              {this.state.error.stack}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default function EchoCanvasStudio() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#0a1420",
      overflow: "hidden"
    }}>
      <EchoCanvasErrorBoundary>
        <Suspense fallback={
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: "#7ff3ff",
            fontSize: "14px",
            backgroundColor: "#0a1420"
          }}>
            <div>
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                Loading EchoCanvas Studio...
              </div>
              <div style={{
                width: "40px",
                height: "40px",
                border: "2px solid rgba(127, 243, 255, 0.2)",
                borderTop: "2px solid #7ff3ff",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto"
              }} />
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        }>
          <StudioComponent />
        </Suspense>
      </EchoCanvasErrorBoundary>
    </div>
  );
}
