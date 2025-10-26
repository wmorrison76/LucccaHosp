import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function useSystemStatus() {
  const [status, setStatus] = reactExports.useState({
    system: "LUCCCA",
    status: "online",
    uptime: 0,
    health: "good"
  });
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        uptime: prev.uptime + 1
      }));
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  return status;
}
function SystemStatusDisplay() {
  const status = useSystemStatus();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "system-status-display", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { children: status.system }, void 0, false, {
      fileName: "/app/code/frontend/src/components/SystemStatusDisplay.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      "Status: ",
      status.status
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/SystemStatusDisplay.jsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/SystemStatusDisplay.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
export {
  SystemStatusDisplay
};
