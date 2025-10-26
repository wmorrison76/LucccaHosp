import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const listeners = /* @__PURE__ */ new Set();
function onDock(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function DockHost() {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => onDock((evt) => {
    if (evt?.type === "add") {
      setItems((x) => [...x, evt.item]);
    }
    if (evt?.type === "remove") {
      setItems((x) => x.filter((i) => i.id !== evt.id));
    }
  }), []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    position: "fixed",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 20,
    background: "var(--bg-elev)",
    border: "1px solid var(--panel-border)",
    boxShadow: "var(--shadow-elev)",
    zIndex: 999
  }, children: items.map((i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "btn", onClick: i.onClick, title: i.label, children: [
    i.icon ?? "◻",
    " ",
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "small", children: i.label }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DockHost.jsx",
      lineNumber: 22,
      columnNumber: 27
    }, this)
  ] }, i.id, true, {
    fileName: "/app/code/frontend/src/components/DockHost.jsx",
    lineNumber: 21,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/DockHost.jsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  DockHost
};
