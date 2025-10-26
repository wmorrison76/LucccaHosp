import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeCanvas({ designData = {} }) {
  const { color = "#f7e1d7" } = designData;
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#d9a5b3";
    ctx.fillRect(60, 60, 180, 90);
    ctx.fillStyle = "#b88ea3";
    ctx.fillRect(60, 140, 180, 90);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 180, 170);
  }, [color]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "canvas",
    {
      ref: canvasRef,
      width: 320,
      height: 260,
      className: "border rounded-lg shadow bg-white max-w-full h-auto"
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/CakeCanvas.jsx",
      lineNumber: 31,
      columnNumber: 5
    },
    this
  );
}
export {
  CakeCanvas as default
};
