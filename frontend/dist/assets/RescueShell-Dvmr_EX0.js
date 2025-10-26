import { R as React, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
class RescueShell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("🚨 LUCCCA RescueShell caught an error:", error, errorInfo);
    const errorLog = {
      message: error.toString(),
      location: errorInfo?.componentStack,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem("luccca_error_log", JSON.stringify(errorLog));
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-red-50 text-red-700 p-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold", children: "🚧 LUCCCA encountered a problem" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/RescueShell.jsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2", children: "We've logged the error and will continue rendering what we can." }, void 0, false, {
          fileName: "/app/code/frontend/src/components/RescueShell.jsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "mt-4 bg-red-100 p-2 rounded text-sm overflow-auto", children: this.state.errorInfo?.componentStack || "No component stack available" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/RescueShell.jsx",
          lineNumber: 39,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/RescueShell.jsx",
        lineNumber: 36,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
export {
  RescueShell as default
};
