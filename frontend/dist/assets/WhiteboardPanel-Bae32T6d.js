import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { P as Pencil } from "./pencil-BDNSeP0d.js";
import { E as Eraser } from "./eraser-DWEha_hD.js";
import "./settings-CL5KYzJi.js";
function WhiteboardPanel() {
  const canvasRef = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [tool, setTool] = reactExports.useState("pencil");
  const [color, setColor] = reactExports.useState("#ffffff");
  const [brushSize, setBrushSize] = reactExports.useState(3);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (tool === "pencil") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#111827",
    color: "#e2e8f0",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "16px",
      borderBottom: "1px solid rgba(0, 217, 255, 0.2)",
      backgroundColor: "rgba(10, 20, 35, 0.6)"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { fontSize: "20px", fontWeight: "bold", margin: 0 }, children: "Advanced Whiteboard" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "4px 0 0 0", fontSize: "12px", opacity: 0.7 }, children: "Collaborative drawing and sketching" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      backgroundColor: "rgba(10, 20, 35, 0.4)",
      borderBottom: "1px solid rgba(0, 217, 255, 0.15)",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setTool("pencil"),
          style: {
            padding: "8px 12px",
            backgroundColor: tool === "pencil" ? "rgba(0, 217, 255, 0.3)" : "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "6px",
            color: "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.2)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = tool === "pencil" ? "rgba(0, 217, 255, 0.3)" : "rgba(0, 217, 255, 0.1)";
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pencil, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
              lineNumber: 119,
              columnNumber: 11
            }, this),
            "Pencil"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
          lineNumber: 97,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setTool("eraser"),
          style: {
            padding: "8px 12px",
            backgroundColor: tool === "eraser" ? "rgba(0, 217, 255, 0.3)" : "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "6px",
            color: "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eraser, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
              lineNumber: 139,
              columnNumber: 11
            }, this),
            "Eraser"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
          lineNumber: 123,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "12px", color: "#7ff3ff" }, children: "Color:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
          lineNumber: 144,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "color",
            value: color,
            onChange: (e) => setColor(e.target.value),
            style: {
              width: "40px",
              height: "32px",
              borderRadius: "6px",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              cursor: "pointer"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
            lineNumber: 147,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "12px", color: "#7ff3ff" }, children: [
          "Size: ",
          brushSize,
          "px"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
          lineNumber: 162,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "range",
            min: "1",
            max: "20",
            value: brushSize,
            onChange: (e) => setBrushSize(Number(e.target.value)),
            style: { width: "80px", cursor: "pointer" }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
            lineNumber: 165,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
        lineNumber: 161,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: clearCanvas,
          style: {
            padding: "8px 12px",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "6px",
            color: "#fca5a5",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.3)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
          },
          children: "Clear"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
          lineNumber: 175,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, overflow: "hidden", position: "relative" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        onMouseDown: startDrawing,
        onMouseMove: draw,
        onMouseUp: stopDrawing,
        onMouseLeave: stopDrawing,
        style: {
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "crosshair"
        }
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
        lineNumber: 203,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
      lineNumber: 202,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/WhiteboardPanel.jsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
export {
  WhiteboardPanel as default
};
