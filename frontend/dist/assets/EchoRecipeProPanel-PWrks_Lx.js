import { r as reactExports, j as jsxDevRuntimeExports, R as React } from "./index-DfBvRGLH.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
import { C as CircleAlert } from "./circle-alert-7ARiDXYh.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const LoadingFallback = () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "#f8f9fa",
  gap: "16px"
}, children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { size: 32, style: {
    color: "#00d9ff",
    animation: "spin 1s linear infinite"
  } }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 32,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { textAlign: "center" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: {
      fontWeight: "600",
      color: "#374151",
      fontSize: "14px",
      margin: "0 0 4px 0"
    }, children: "Loading EchoRecipePro" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: {
      fontSize: "12px",
      color: "#9CA3AF",
      margin: 0
    }, children: "This may take a few seconds..." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 36,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    ` }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 53,
    columnNumber: 5
  }, void 0)
] }, void 0, true, {
  fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
  lineNumber: 23,
  columnNumber: 3
}, void 0);
const ErrorFallback = ({ error, onRetry }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "#fee2e2",
  padding: "20px"
}, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { textAlign: "center", maxWidth: "400px" }, children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleAlert, { size: 32, style: {
    color: "#dc2626",
    margin: "0 auto 12px",
    display: "block"
  } }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 75,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: {
    fontWeight: "600",
    color: "#991b1b",
    fontSize: "14px",
    margin: "0 0 8px 0"
  }, children: "Failed to Load EchoRecipePro" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 80,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: {
    fontSize: "12px",
    color: "#7f1d1d",
    margin: "0 0 16px 0",
    whiteSpace: "pre-wrap"
  }, children: error?.message || "An unknown error occurred" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 88,
    columnNumber: 7
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: onRetry,
      style: {
        padding: "8px 16px",
        fontSize: "12px",
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500"
      },
      children: "Try Again"
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
      lineNumber: 96,
      columnNumber: 7
    },
    void 0
  )
] }, void 0, true, {
  fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
  lineNumber: 74,
  columnNumber: 5
}, void 0) }, void 0, false, {
  fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
  lineNumber: 66,
  columnNumber: 3
}, void 0);
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("[EchoRecipeProPanel] Error caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        ErrorFallback,
        {
          error: this.state.error,
          onRetry: () => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
          lineNumber: 136,
          columnNumber: 9
        },
        this
      );
    }
    return this.props.children;
  }
}
function EchoRecipeProPanel({ isActive = true, onClose }) {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const handleIframeLoad = () => {
    console.log("[EchoRecipeProPanel] Iframe loaded successfully");
    setIsLoading(false);
    setError(null);
  };
  const handleIframeError = (e) => {
    console.error("[EchoRecipeProPanel] Iframe error:", e);
    setError(new Error("Could not load EchoRecipePro application. Please check the server is running."));
    setIsLoading(false);
  };
  if (!isActive) {
    return null;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 188,
    columnNumber: 27
  }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    overflow: "hidden",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }, children: [
    isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
      lineNumber: 200,
      columnNumber: 25
    }, this),
    error && !isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      ErrorFallback,
      {
        error,
        onRetry: () => {
          setError(null);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 500);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
        lineNumber: 204,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "iframe",
      {
        src: "/modules/EchoRecipe_Pro/",
        style: {
          width: "100%",
          height: "100%",
          border: "none",
          display: error ? "none" : "block"
        },
        title: "EchoRecipePro Application",
        onLoad: handleIframeLoad,
        onError: handleIframeError,
        sandbox: "allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-downloads",
        allow: "camera; microphone; fullscreen"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
        lineNumber: 215,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 189,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 188,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx",
    lineNumber: 187,
    columnNumber: 5
  }, this);
}
export {
  EchoRecipeProPanel as default
};
