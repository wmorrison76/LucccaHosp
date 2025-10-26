import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const listeners = /* @__PURE__ */ new Set();
function onToast(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function ToastHost() {
  const [toasts, setToasts] = reactExports.useState([]);
  reactExports.useEffect(() => onToast((t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((x) => [...x, { id, ...t }]);
    setTimeout(() => setToasts((x) => x.filter((tt) => tt.id !== id)), t.duration ?? 3e3);
  }), []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "fixed", right: 16, bottom: 16, display: "grid", gap: 10, zIndex: 1e3 }, children: toasts.map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "card", style: { minWidth: 240 }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: 600 }, children: t.title ?? "Notice" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/ToastHost.jsx",
      lineNumber: 18,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "small muted", children: t.message }, void 0, false, {
      fileName: "/app/code/frontend/src/components/ToastHost.jsx",
      lineNumber: 19,
      columnNumber: 11
    }, this)
  ] }, t.id, true, {
    fileName: "/app/code/frontend/src/components/ToastHost.jsx",
    lineNumber: 17,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/ToastHost.jsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
export {
  ToastHost
};
