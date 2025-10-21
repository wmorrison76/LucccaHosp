import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Eraser, Square, Circle, Type, Undo2, Download } from 'lucide-react';

export default function WhiteboardPanel() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set canvas size to fill container
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#111827',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid rgba(0, 217, 255, 0.2)',
        backgroundColor: 'rgba(10, 20, 35, 0.6)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
          Advanced Whiteboard
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
          Collaborative drawing and sketching
        </p>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: 'rgba(10, 20, 35, 0.4)',
        borderBottom: '1px solid rgba(0, 217, 255, 0.15)',
        flexWrap: 'wrap',
      }}>
        <button
          onClick={() => setTool('pencil')}
          style={{
            padding: '8px 12px',
            backgroundColor: tool === 'pencil' ? 'rgba(0, 217, 255, 0.3)' : 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '6px',
            color: '#7ff3ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = tool === 'pencil' ? 'rgba(0, 217, 255, 0.3)' : 'rgba(0, 217, 255, 0.1)';
          }}
        >
          <Pencil size={16} />
          Pencil
        </button>

        <button
          onClick={() => setTool('eraser')}
          style={{
            padding: '8px 12px',
            backgroundColor: tool === 'eraser' ? 'rgba(0, 217, 255, 0.3)' : 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '6px',
            color: '#7ff3ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
        >
          <Eraser size={16} />
          Eraser
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '12px', color: '#7ff3ff' }}>
            Color:
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: '40px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              cursor: 'pointer',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '12px', color: '#7ff3ff' }}>
            Size: {brushSize}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: '80px', cursor: 'pointer' }}
          />
        </div>

        <button
          onClick={clearCanvas}
          style={{
            padding: '8px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#fca5a5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
          }}
        />
      </div>
    </div>
  );
}
