import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function useEchoStatus() {
  const [status, setStatus] = reactExports.useState("offline");
  reactExports.useEffect(() => {
    fetch("http://localhost:5000/api/echo/status").then((res) => res.json()).then((data) => {
      if (data.message === "Echo AI Core Operational.") {
        setStatus("online");
      }
    }).catch(() => setStatus("offline"));
  }, []);
  return status;
}
function EchoStatusMonitor() {
  const status = useEchoStatus();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-status-monitor", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { children: "Echo AI Status:" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoStatusMonitor.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: status === "online" ? "Online and Responsive" : "Offline or Unreachable" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoStatusMonitor.jsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoStatusMonitor.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
export {
  EchoStatusMonitor
};
