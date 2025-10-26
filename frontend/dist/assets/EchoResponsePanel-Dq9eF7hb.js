import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function EchoResponsePanel() {
  const [response, setResponse] = reactExports.useState("System Standing By...");
  const handleEchoCall = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/echo");
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse("Error connecting to Echo.");
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-panel", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { children: "Echo Core Communication" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoResponsePanel.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: response }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoResponsePanel.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: handleEchoCall, children: "Ping Echo" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoResponsePanel.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoResponsePanel.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  EchoResponsePanel
};
