import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function FloatingTextOverlay({ text = "LIVE", opacity = 0.12 }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const dx = (e.clientX - w / 2) / (w / 2);
      const dy = (e.clientY - h / 2) / (h / 2);
      el.style.transform = `translate3d(${dx * 8}px, ${dy * 6}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      "aria-hidden": true,
      className: "pointer-events-none select-none fixed top-16 left-1/2 -translate-x-1/2",
      style: { filter: "blur(1.2px)", letterSpacing: "0.18em", opacity },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[72px] md:text-[96px] font-black tracking-widest text-white/90 drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]", children: text }, void 0, false, {
        fileName: "/app/code/frontend/src/components/FloatingTextOverlay.jsx",
        lineNumber: 27,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/FloatingTextOverlay.jsx",
      lineNumber: 21,
      columnNumber: 5
    },
    this
  );
}
export {
  FloatingTextOverlay as default
};
