import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { ProgressBar } from "./ProgressBar-DIvQK5ni.js";
function LoadingProgress({ duration = 3e3 }) {
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(elapsed / duration * 100, 100);
      setProgress(percent);
      if (percent === 100) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [duration]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "loading-progress", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ProgressBar, { value: progress }, void 0, false, {
      fileName: "/app/code/frontend/src/components/LoadingProgress.jsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      Math.round(progress),
      "% Loading..."
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/LoadingProgress.jsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/LoadingProgress.jsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
export {
  LoadingProgress
};
