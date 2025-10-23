import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, RotateCcw } from "lucide-react";

// Fallback to basic canvas whiteboard
function BasicWhiteboard() {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [tool, setTool] = React.useState("pencil");
  const [color, setColor] = React.useState("#ffffff");
  const [brushSize, setBrushSize] = React.useState(3);
  const [history, setHistory] = React.useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([...history, imgData]);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(newHistory[newHistory.length - 1], 0, 0);
      setHistory(newHistory);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `whiteboard-${Date.now()}.png`;
    link.click();
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: "#0f1c2e",
      color: "#e2e8f0"
    }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: "rgba(10, 20, 35, 0.8)",
        borderBottom: "1px solid rgba(0, 217, 255, 0.2)",
        flexWrap: "wrap"
      }}>
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          style={{
            padding: "6px 10px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "4px",
            color: "#7ff3ff",
            fontSize: "12px",
            cursor: "pointer"
          }}
        >
          <option value="pencil">Pencil</option>
          <option value="eraser">Eraser</option>
          <option value="line">Line</option>
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          title="Color"
        />

        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          style={{
            width: "100px",
            cursor: "pointer"
          }}
          title={`Brush size: ${brushSize}px`}
        />

        <button
          onClick={undo}
          title="Undo (Ctrl+Z)"
          style={{
            padding: "6px 10px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "4px",
            color: "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px"
          }}
        >
          <RotateCcw size={14} /> Undo
        </button>

        <button
          onClick={clearCanvas}
          title="Clear canvas"
          style={{
            padding: "6px 10px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "4px",
            color: "#fca5a5",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          <Trash2 size={14} /> Clear
        </button>

        <button
          onClick={downloadCanvas}
          title="Download as PNG"
          style={{
            padding: "6px 10px",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "4px",
            color: "#86efac",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            marginLeft: "auto"
          }}
        >
          <Save size={14} /> Save
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          flex: 1,
          cursor: tool === "pencil" ? "crosshair" : "default",
          display: "block"
        }}
      />
    </div>
  );
}

// Main component - just use BasicWhiteboard
export default function AdvancedWhiteboard() {
  return <BasicWhiteboard />;
}
