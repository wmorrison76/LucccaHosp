import React, { useState, useEffect } from "react";
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import { 
  Plus, Trash2, Save, RotateCcw, Users, Send, Clock, 
  Maximize2, Minimize2, Lock, Unlock, Download, FileText,
  Grid3X3, List, AlertTriangle, GripHorizontal, X, Zap,
  Pencil, Highlighter, Square, Circle, Type, StickyNote,
  Ruler, Image as ImageIcon, Video, Mic, MicOff, Settings,
  ZoomIn, ZoomOut
} from "lucide-react";

const LS_WHITEBOARD = 'luccca:whiteboard:state';
const LS_BOARD_HISTORY = 'luccca:board:history';

function AdvancedWhiteboardCore() {
  const canvasRef = React.useRef(null);
  const contextRef = React.useRef(null);

  // Drawing State
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [tool, setTool] = React.useState("pencil");
  const [color, setColor] = React.useState("#ffffff");
  const [brushSize, setBrushSize] = React.useState(3);
  const [history, setHistory] = React.useState([]);
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);
  const [startPoint, setStartPoint] = React.useState(null);
  const [textInputPos, setTextInputPos] = React.useState(null);
  const [textInput, setTextInput] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [draggingImage, setDraggingImage] = React.useState(null);
  const [mediaEmbeds, setMediaEmbeds] = React.useState([]);
  const [mediaInput, setMediaInput] = React.useState('');
  const [showMediaInput, setShowMediaInput] = React.useState(false);

  // Advanced Features
  const [objects, setObjects] = React.useState([]);
  const [objectId, setObjectId] = React.useState(0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showMembers, setShowMembers] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('canvas');
  const [floatingPanels, setFloatingPanels] = React.useState([]);
  const [zIndex, setZIndex] = React.useState(10);
  const [isLocked, setIsLocked] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [laserMode, setLaserMode] = React.useState(false);
  const [laserPos, setLaserPos] = React.useState(null);

  // Communication
  const [participants, setParticipants] = React.useState([
    { id: 'self', name: 'You', role: 'chef', isSpeaking: false, isMuted: false }
  ]);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [chatInput, setChatInput] = React.useState('');

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = ctx;
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    // Load saved state
    try {
      const saved = localStorage.getItem(LS_WHITEBOARD);
      if (saved) {
        const state = JSON.parse(saved);
        setObjects(state.objects || []);
        setZoom(state.zoom || 1);
        setPan(state.pan || { x: 0, y: 0 });
      }
    } catch (e) {
      console.warn('Could not load whiteboard state:', e);
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem(LS_WHITEBOARD, JSON.stringify({
      objects,
      zoom,
      pan,
      participants,
      chatMessages,
      images: images.map(img => ({ ...img, src: img.src.substring(0, 100) + '...' })) // Don't save full base64
    }));
  }, [objects, zoom, pan, participants, chatMessages, images]);

  // Render images on canvas updates
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Render all images
    images.forEach(img => {
      const imgElement = new Image();
      imgElement.onload = () => {
        ctx.drawImage(imgElement, img.x, img.y, img.width, img.height);

        // Draw selection box if selected
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x, img.y, img.width, img.height);
      };
      imgElement.src = img.src;
    });
  }, [images]);

  // Drawing functions
  const startDrawing = (e) => {
    if (isLocked) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "text") {
      setTextInputPos({ x, y });
      setTextInput('');
      return;
    }

    if (["line", "rect", "circle"].includes(tool)) {
      setStartPoint({ x, y });
      setIsDrawing(true);
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || isLocked) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "eraser") {
      ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      return;
    }

    if (tool === "pencil" || tool === "highlighter") {
      if (tool === "highlighter") {
        // Highlighter has transparency
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize * 2;
      } else {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      return;
    }

    // For shapes, redraw with preview
    if (["line", "rect", "circle"].includes(tool) && startPoint) {
      // Redraw canvas from history
      if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "rect") {
        const width = x - startPoint.x;
        const height = y - startPoint.y;
        ctx.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (tool === "circle") {
        const radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2));
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!isLocked) {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([...history, imgData]);
    }

    setIsDrawing(false);
    setStartPoint(null);
  };

  const clearCanvas = () => {
    if (window.confirm('Clear entire whiteboard? This cannot be undone.')) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#1a202c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }
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

  const exportAsJSON = () => {
    const boardData = {
      timestamp: new Date().toISOString(),
      zoom,
      pan,
      objects,
      participants,
      chatMessages,
      tool,
      color,
      brushSize
    };

    const link = document.createElement("a");
    link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(boardData, null, 2));
    link.download = `whiteboard-${Date.now()}.json`;
    link.click();
  };

  const importFromJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            setObjects(data.objects || []);
            setZoom(data.zoom || 1);
            setPan(data.pan || { x: 0, y: 0 });
            setParticipants(data.participants || []);
            setChatMessages(data.chatMessages || []);
            setTool(data.tool || 'pencil');
            setColor(data.color || '#ffffff');
            setBrushSize(data.brushSize || 3);
          } catch (err) {
            alert('Failed to import whiteboard: ' + err.message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const addStickyNote = () => {
    const newSticky = {
      id: objectId,
      type: 'sticky',
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 300,
      text: 'Click to edit',
      bgColor: ['#fff700', '#ffb3ba', '#baffc9', '#bae1ff', '#ffffba'][Math.floor(Math.random() * 5)]
    };
    setObjects(objs => [...objs, newSticky]);
    setObjectId(id => id + 1);
  };

  const addInjectedPanel = () => {
    const newPanel = {
      id: 'panel-' + objectId,
      type: 'panel',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: 300,
      height: 250,
      z: zIndex + 1,
      title: 'LUCCCA Panel',
      panelType: 'dashboard'
    };
    setFloatingPanels(panels => [...panels, newPanel]);
    setZIndex(z => z + 1);
    setObjectId(id => id + 1);
  };

  const loadTemplate = (templateName) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#00d9ff";
    ctx.fillText(templateName, 20, 40);

    if (templateName === 'BOH Mise en Place') {
      const items = [
        'Station 1: Prep Vegetables',
        'Station 2: Proteins',
        'Station 3: Sauces',
        'Station 4: Garnish'
      ];
      items.forEach((item, idx) => {
        ctx.font = "14px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText('□ ' + item, 40, 80 + idx * 30);
      });
    } else if (templateName === 'FOH Floor Plan') {
      ctx.strokeStyle = "#00d9ff";
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          ctx.strokeRect(40 + i * 150, 80 + j * 120, 130, 100);
          ctx.font = "12px Arial";
          ctx.fillStyle = "#fff";
          ctx.fillText(`T${i * 4 + j + 1}`, 80 + i * 150, 130 + j * 120);
        }
      }
    } else if (templateName === 'Corporate Cost Sheet') {
      const headers = ['Property', 'Labor Cost', 'Food Cost', 'Total'];
      const y = 80;
      let x = 40;

      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "#00d9ff";
      headers.forEach(h => {
        ctx.fillText(h, x, y);
        x += 150;
      });

      ctx.font = "12px Arial";
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 5; i++) {
        ctx.fillText(`Outlet ${i + 1}`, 40, y + 25 + i * 25);
      }
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([...history, imgData]);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: chatMessages.length + 1,
      author: 'You',
      text: chatInput,
      timestamp: new Date()
    };
    setChatMessages(msgs => [...msgs, newMsg]);
    setChatInput('');
  };

  const commitTextBox = () => {
    if (!textInputPos || !textInput.trim()) {
      setTextInputPos(null);
      setTextInput('');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.font = "14px Arial";
    ctx.fillStyle = color;
    ctx.fillText(textInput, textInputPos.x, textInputPos.y);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([...history, imgData]);

    setTextInputPos(null);
    setTextInput('');
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setImages([...images, {
              src: event.target.result,
              x, y,
              width: 150,
              height: 150,
              id: Math.random().toString(36).slice(2)
            }]);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const addMediaEmbed = (type) => {
    if (type === 'video') {
      const url = prompt('Enter YouTube or MP4 URL:');
      if (url) {
        setMediaEmbeds([...mediaEmbeds, {
          id: Math.random().toString(36).slice(2),
          type: 'video',
          url,
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 200,
          width: 300,
          height: 200
        }]);
      }
    } else if (type === 'audio') {
      const url = prompt('Enter audio URL (MP3, WAV):');
      if (url) {
        setMediaEmbeds([...mediaEmbeds, {
          id: Math.random().toString(36).slice(2),
          type: 'audio',
          url,
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 200,
          width: 300,
          height: 60
        }]);
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: "#0f1c2e",
      color: "#e2e8f0",
      position: 'relative'
    }}>
      {/* HEADER */}
      <div style={{
        padding: "8px 16px",
        backgroundColor: "rgba(10, 20, 35, 0.9)",
        borderBottom: "1px solid rgba(0, 217, 255, 0.2)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 'bold', color: '#00d9ff' }}>WHITEBOARD</span>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>Zoom: {(zoom * 100).toFixed(0)}% | Objects: {objects.length}</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            title="Advanced tools"
            style={{
              padding: '4px 8px',
              backgroundColor: showAdvanced ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.05)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '3px',
              color: '#7ff3ff',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            ⚙️
          </button>
          <button
            onClick={() => setShowMembers(!showMembers)}
            title="Members & chat"
            style={{
              padding: '4px 8px',
              backgroundColor: showMembers ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.05)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '3px',
              color: '#7ff3ff',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            👥
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* CANVAS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onWheel={(e) => {
              e.preventDefault();
              setZoom(z => Math.max(0.1, Math.min(5, z + (e.deltaY > 0 ? -0.1 : 0.1))));
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={handleImageDrop}
            onMouseMove={(e) => {
              if (laserMode) {
                const rect = canvasRef.current.getBoundingClientRect();
                setLaserPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            }}
            onMouseLeave={() => laserMode && setLaserPos(null)}
            style={{
              flex: 1,
              cursor: laserMode ? 'pointer' : tool === "pencil" ? "crosshair" : tool === "eraser" ? "grab" : tool === "text" ? "text" : "default",
              display: "block",
              backgroundColor: '#1a202c'
            }}
          />

          {/* LASER POINTER OVERLAY */}
          {laserMode && laserPos && (
            <div
              style={{
                position: 'absolute',
                left: laserPos.x - 6,
                top: laserPos.y - 6,
                width: '12px',
                height: '12px',
                backgroundColor: '#ff0000',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)',
                pointerEvents: 'none',
                zIndex: 999
              }}
            />
          )}

          {/* FLOATING PANELS OVERLAY */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {floatingPanels.map(panel => (
              <div
                key={panel.id}
                style={{
                  position: 'absolute',
                  left: panel.x,
                  top: panel.y,
                  width: panel.width,
                  height: panel.height,
                  zIndex: panel.z,
                  pointerEvents: 'auto',
                  border: '1px solid rgba(0, 217, 255, 0.4)',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
                  backdropFilter: 'blur(10px)',
                  padding: '10px',
                  color: '#00d9ff',
                  fontSize: '11px'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{panel.title}</div>
                <div style={{ opacity: 0.6, fontSize: '10px' }}>Type: {panel.panelType}</div>
              </div>
            ))}
          </div>

          {/* TEXT INPUT DIALOG */}
          {textInputPos && (
            <div style={{
              position: 'absolute',
              left: textInputPos.x + 'px',
              top: (textInputPos.y - 40) + 'px',
              zIndex: 1000,
              backgroundColor: 'rgba(15, 28, 46, 0.95)',
              border: '2px solid rgba(0, 217, 255, 0.5)',
              borderRadius: '4px',
              padding: '8px',
              display: 'flex',
              gap: '4px'
            }}>
              <input
                autoFocus
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && commitTextBox()}
                placeholder="Enter text..."
                style={{
                  padding: '4px 6px',
                  backgroundColor: 'rgba(0, 217, 255, 0.1)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '3px',
                  color: color,
                  fontSize: '13px',
                  minWidth: '150px',
                  outline: 'none'
                }}
              />
              <button
                onClick={commitTextBox}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'rgba(0, 217, 255, 0.2)',
                  border: '1px solid rgba(0, 217, 255, 0.4)',
                  borderRadius: '3px',
                  color: '#00d9ff',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                OK
              </button>
            </div>
          )}

          {/* ZOOM CONTROLS */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '4px',
            padding: '4px'
          }}>
            <button onClick={() => setZoom(z => Math.min(5, z + 0.1))} style={{ padding: '4px 6px', color: '#7ff3ff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '11px' }}>+</button>
            <button onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} style={{ padding: '4px 6px', color: '#7ff3ff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '11px' }}>−</button>
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} style={{ padding: '4px 6px', color: '#7ff3ff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '11px' }}>Reset</button>
          </div>
        </div>

        {/* SIDEBAR: MEMBERS & CHAT */}
        {showMembers && (
          <div style={{
            width: '300px',
            borderLeft: '1px solid rgba(0, 217, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(10, 20, 35, 0.6)',
            overflow: 'hidden'
          }}>
            {/* TABS */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0, 217, 255, 0.2)' }}>
              {[
                { id: 'members', label: '👥 Members' },
                { id: 'chat', label: '💬 Chat' },
                { id: 'history', label: '⏱️ History' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: activeTab === tab.id ? 'rgba(0, 217, 255, 0.2)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid rgba(0, 217, 255, 0.6)' : 'none',
                    color: activeTab === tab.id ? '#00d9ff' : '#7ff3ff',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
              <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
                {participants.map(p => (
                  <div
                    key={p.id}
                    style={{
                      padding: '8px',
                      marginBottom: '6px',
                      backgroundColor: 'rgba(0, 217, 255, 0.05)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#00d9ff', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ opacity: 0.6, fontSize: '10px' }}>Role: {p.role}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ flex: 1, overflow: 'auto', padding: '8px', borderBottom: '1px solid rgba(0, 217, 255, 0.2)' }}>
                  {chatMessages.length === 0 ? (
                    <div style={{ fontSize: '11px', opacity: 0.5, textAlign: 'center', paddingTop: '20px' }}>No messages yet</div>
                  ) : (
                    chatMessages.map(msg => (
                      <div key={msg.id} style={{ marginBottom: '8px', fontSize: '11px' }}>
                        <span style={{ color: '#00d9ff', fontWeight: 'bold' }}>{msg.author}:</span> {msg.text}
                      </div>
                    ))
                  )}
                </div>
                <div style={{ padding: '8px', display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type message..."
                    style={{
                      flex: 1,
                      padding: '4px 6px',
                      backgroundColor: 'rgba(0, 217, 255, 0.1)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      borderRadius: '3px',
                      color: '#e2e8f0',
                      fontSize: '11px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: 'rgba(0, 217, 255, 0.2)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                      borderRadius: '3px',
                      color: '#00d9ff',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
              <div style={{ flex: 1, padding: '8px', fontSize: '11px', opacity: 0.5 }}>
                History timeline coming soon...
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOOLBAR - BASIC TOOLS */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        backgroundColor: "rgba(10, 20, 35, 0.8)",
        borderTop: "1px solid rgba(0, 217, 255, 0.2)",
        flexWrap: "wrap",
        fontSize: '12px'
      }}>
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          style={{
            padding: "4px 8px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
            color: "#7ff3ff",
            fontSize: "11px",
            cursor: "pointer"
          }}
        >
          <option value="pencil">Pencil</option>
          <option value="highlighter">Highlighter</option>
          <option value="eraser">Eraser</option>
          <option value="line">Line</option>
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="text">Text</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: "32px",
            height: "32px",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
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
            width: "80px",
            cursor: "pointer"
          }}
          title={`Brush size: ${brushSize}px`}
        />

        <button
          onClick={undo}
          title="Undo (Ctrl+Z)"
          style={{
            padding: "4px 8px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
            color: "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "11px"
          }}
        >
          ↶ Undo
        </button>

        <button
          onClick={clearCanvas}
          title="Clear canvas"
          style={{
            padding: "4px 8px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "3px",
            color: "#fca5a5",
            cursor: "pointer",
            fontSize: "11px"
          }}
        >
          🗑️ Clear
        </button>

        {/* ADVANCED TOOLS */}
        {showAdvanced && (
          <>
            <button
              onClick={addStickyNote}
              title="Add sticky note"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(255, 200, 0, 0.1)",
                border: "1px solid rgba(255, 200, 0, 0.3)",
                borderRadius: "3px",
                color: "#ffd966",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              📌 Note
            </button>

            <label
              title="Upload image (or drag-drop onto canvas)"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(100, 150, 255, 0.1)",
                border: "1px solid rgba(100, 150, 255, 0.3)",
                borderRadius: "3px",
                color: "#6496ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              🖼️ Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const img = new Image();
                      img.onload = () => {
                        setImages([...images, {
                          src: event.target.result,
                          x: 50,
                          y: 50,
                          width: 150,
                          height: 150,
                          id: Math.random().toString(36).slice(2)
                        }]);
                      };
                      img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={addInjectedPanel}
              title="Inject LUCCCA panel"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(0, 217, 255, 0.1)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "3px",
                color: "#00d9ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              ➕ Panel
            </button>

            <button
              onClick={() => setIsRecording(!isRecording)}
              title={isRecording ? 'Recording...' : 'Start recording'}
              style={{
                padding: "4px 8px",
                backgroundColor: isRecording ? "rgba(239, 68, 68, 0.2)" : "rgba(0, 217, 255, 0.1)",
                border: isRecording ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "3px",
                color: isRecording ? "#fca5a5" : "#7ff3ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              {isRecording ? '🔴 Recording' : '⭕ Record'}
            </button>

            <button
              onClick={() => setLaserMode(!laserMode)}
              title="Laser pointer (training mode)"
              style={{
                padding: "4px 8px",
                backgroundColor: laserMode ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 217, 255, 0.1)",
                border: laserMode ? "1px solid rgba(255, 0, 0, 0.5)" : "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "3px",
                color: laserMode ? "#ff6b6b" : "#7ff3ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              {laserMode ? '🔴 Laser' : '🔦 Laser'}
            </button>

            <button
              onClick={() => setIsLocked(!isLocked)}
              title={isLocked ? 'Unlock board' : 'Lock board'}
              style={{
                padding: "4px 8px",
                backgroundColor: isLocked ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 217, 255, 0.1)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "3px",
                color: isLocked ? "#fca5a5" : "#7ff3ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              {isLocked ? '🔒 Locked' : '🔓 Lock'}
            </button>

            <button
              onClick={() => setShowTemplate(!showTemplate)}
              title="Load hospitality templates"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(200, 100, 255, 0.1)",
                border: "1px solid rgba(200, 100, 255, 0.3)",
                borderRadius: "3px",
                color: "#c864ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              📋 Template
            </button>

            {showTemplate && (
              <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '12px',
                backgroundColor: 'rgba(10, 20, 35, 0.95)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '4px',
                padding: '6px',
                zIndex: 100
              }}>
                {[
                  { name: 'BOH Mise en Place', emoji: '🍳' },
                  { name: 'FOH Floor Plan', emoji: '🪑' },
                  { name: 'Corporate Cost Sheet', emoji: '💰' }
                ].map(t => (
                  <button
                    key={t.name}
                    onClick={() => {
                      loadTemplate(t.name);
                      setShowTemplate(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '6px 8px',
                      margin: '2px 0',
                      backgroundColor: 'rgba(0, 217, 255, 0.1)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      borderRadius: '3px',
                      color: '#7ff3ff',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'left'
                    }}
                  >
                    {t.emoji} {t.name}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={exportAsJSON}
              title="Export board as JSON"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(100, 200, 255, 0.1)",
                border: "1px solid rgba(100, 200, 255, 0.3)",
                borderRadius: "3px",
                color: "#64c8ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              📤 Export
            </button>

            <button
              onClick={importFromJSON}
              title="Import board from JSON"
              style={{
                padding: "4px 8px",
                backgroundColor: "rgba(100, 200, 255, 0.1)",
                border: "1px solid rgba(100, 200, 255, 0.3)",
                borderRadius: "3px",
                color: "#64c8ff",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              📥 Import
            </button>
          </>
        )}

        <button
          onClick={downloadCanvas}
          title="Download as PNG"
          style={{
            padding: "4px 8px",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "3px",
            color: "#86efac",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "11px",
            marginLeft: "auto"
          }}
        >
          💾 Save
        </button>
      </div>
    </div>
  );
}

// Main component
export default function AdvancedWhiteboard() {
  return <AdvancedWhiteboardCore />;
}
