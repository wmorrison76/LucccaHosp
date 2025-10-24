import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Pencil, Highlighter, Trash2, Square, Circle, Line, Type, StickyNote,
  Ruler, Image, FileText, Video, Mic, MicOff, Video as VideoCam,
  VideoOff, Users, Send, Settings, MoreVertical, Save, Share2, Download,
  ZoomIn, ZoomOut, RotateCcw, Plus, GripHorizontal, X, Clock, Zap, Undo, Redo,
  Maximize2, Minimize2, Lock, Unlock, Eye, EyeOff, Palette, Copy, Trash,
  BarChart3, TrendingUp, AlertTriangle, ChefHat
} from 'lucide-react';

const LS_WHITEBOARD = 'luccca:whiteboard:v1';
const LS_BOARD_STATE = 'luccca:board:state:v1';
const GRID_SIZE = 20; // Snap-to-grid spacing
const GRID_SNAP_THRESHOLD = 8; // Distance to snap

/**
 * Advanced EchoDesk Hospitality Whiteboard
 * - Infinite canvas with pan/zoom
 * - Multi-tool drawing (pen, highlighter, shapes, text, sticky notes)
 * - WebRTC video/voice conferencing
 * - Members panel with participant management
 * - GlowDesk panel injection (drag LUCCCA modules into whiteboard)
 * - Board history & versioning
 * - Hospitality-specific templates & tools
 * - Export system (PDF, PNG, MP4, JSON)
 */
export default function AdvancedEchoWhiteboard() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Canvas & Drawing State
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#00d9ff');
  const [brushSize, setBrushSize] = useState(3);
  const [fontSize, setFontSize] = useState(16);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState('freehand'); // freehand, line, rect, circle, text
  const [objects, setObjects] = useState([]);
  const [objectId, setObjectId] = useState(0);
  const [previewShape, setPreviewShape] = useState(null); // Shape being drawn (preview)
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [guideLines, setGuideLines] = useState([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [selectedMediaObject, setSelectedMediaObject] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [snapshots, setSnapshots] = useState([]);
  const [snapshotName, setSnapshotName] = useState('');
  const [snapshotDialogOpen, setSnapshotDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Canvas Transform State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // UI State
  const [activeTab, setActiveTab] = useState('canvas'); // canvas, chat, members, history
  const [showToolbar, setShowToolbar] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [isMaximized, setIsMaximized] = useState(true);
  const [toolbarOpacity, setToolbarOpacity] = useState(1);
  const [showTemplate, setShowTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Communication State
  const [participants, setParticipants] = useState([
    { id: 'self', name: 'You', role: 'chef', isSpeaking: false, isMuted: false, isCameraOff: false }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, author: 'System', text: 'Whiteboard initialized. Ready for collaboration.', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Floating Panels (GlowDesk Injection)
  const [floatingPanels, setFloatingPanels] = useState([]);
  const [zIndex, setZIndex] = useState(10);

  // Board History
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    
    const context = canvas.getContext('2d');
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    contextRef.current = context;

    // Set background
    context.fillStyle = '#0f1628';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(context, canvas.width, canvas.height);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(LS_BOARD_STATE, JSON.stringify({
      objects,
      zoom,
      pan,
      participants,
      chatMessages,
      isLocked
    }));
  }, [objects, zoom, pan, participants, chatMessages, isLocked]);

  // Canvas Drawing Methods
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!ctx) return;

    // Clear and redraw background
    ctx.fillStyle = '#0f1628';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);

    // Apply transform
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw all objects
    objects.forEach(obj => {
      drawObject(ctx, obj);
    });

    // Draw shape preview (dotted line while drawing)
    if (previewShape) {
      ctx.strokeStyle = previewShape.color || '#00d9ff';
      ctx.lineWidth = previewShape.size || 2;
      ctx.setLineDash([5, 5]);

      const { start, end, type } = previewShape;
      if (type === 'line') {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      } else if (type === 'rect') {
        const width = end.x - start.x;
        const height = end.y - start.y;
        ctx.strokeRect(start.x, start.y, width, height);
      } else if (type === 'circle') {
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Draw guide lines
    if (showGuides && guideLines.length > 0) {
      ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
      ctx.lineWidth = 1;
      guideLines.forEach(guide => {
        ctx.setLineDash([3, 3]);
        if (guide.type === 'vertical') {
          ctx.beginPath();
          ctx.moveTo(guide.pos, -10000);
          ctx.lineTo(guide.pos, 10000);
          ctx.stroke();
        } else if (guide.type === 'horizontal') {
          ctx.beginPath();
          ctx.moveTo(-10000, guide.pos);
          ctx.lineTo(10000, guide.pos);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [objects, pan, zoom, previewShape, showGuides, guideLines]);

  const drawObject = (ctx, obj) => {
    ctx.strokeStyle = obj.color || '#00d9ff';
    ctx.fillStyle = obj.fillColor || 'transparent';
    ctx.lineWidth = obj.size || 3;
    ctx.globalAlpha = obj.opacity ?? 1;

    switch (obj.type) {
      case 'stroke':
        ctx.beginPath();
        if (obj.points && obj.points.length > 0) {
          ctx.moveTo(obj.points[0].x, obj.points[0].y);
          obj.points.forEach(p => ctx.lineTo(p.x, p.y));
        }
        ctx.stroke();
        break;

      case 'line':
        if (obj.start && obj.end) {
          ctx.beginPath();
          ctx.moveTo(obj.start.x, obj.start.y);
          ctx.lineTo(obj.end.x, obj.end.y);
          ctx.stroke();
          // Draw endpoints
          ctx.fillStyle = obj.color || '#00d9ff';
          ctx.beginPath();
          ctx.arc(obj.start.x, obj.start.y, 3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(obj.end.x, obj.end.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;

      case 'rect':
        if (obj.start && obj.end) {
          const width = obj.end.x - obj.start.x;
          const height = obj.end.y - obj.start.y;
          ctx.strokeRect(obj.start.x, obj.start.y, width, height);
        }
        break;

      case 'circle':
        if (obj.start && obj.end) {
          const radius = Math.sqrt(Math.pow(obj.end.x - obj.start.x, 2) + Math.pow(obj.end.y - obj.start.y, 2));
          ctx.beginPath();
          ctx.arc(obj.start.x, obj.start.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;

      case 'text':
        if (obj.start) {
          ctx.font = `${obj.fontSize || 16}px Arial`;
          ctx.fillStyle = obj.color || '#00d9ff';
          ctx.fillText(obj.text || '', obj.start.x, obj.start.y);
        }
        break;

      case 'sticky':
        ctx.fillStyle = obj.bgColor || '#fff700';
        ctx.fillRect(obj.x, obj.y, 150, 150);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(obj.x, obj.y, 150, 150);
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(obj.text || '...', obj.x + 5, obj.y + 20);
        break;

      case 'image':
        if (obj.src) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
            // Border
            ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
          };
          img.src = obj.src;
        }
        break;

      case 'pdf':
        ctx.fillStyle = '#ff6b4d';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('📄', obj.x + obj.width / 2, obj.y + obj.height / 2 - 10);
        ctx.font = '11px Arial';
        ctx.fillText('PDF', obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = 'left';
        break;

      case 'video':
        ctx.fillStyle = '#4d7aff';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('▶️', obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = '11px Arial';
        ctx.fillText('VIDEO', obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = 'left';
        break;

      case 'audio':
        ctx.fillStyle = '#f39c12';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔊', obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = '11px Arial';
        ctx.fillText('AUDIO', obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = 'left';
        break;

      case 'model-link':
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎨', obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = '11px Arial';
        ctx.fillText('3D', obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = 'left';
        break;

      default:
        break;
    }

    ctx.globalAlpha = 1;
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    if (tool === 'pointer' || e.button === 2) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left - pan.x) / zoom;
    let y = (e.clientY - rect.top - pan.y) / zoom;

    // Apply snap-to-grid
    if (snapToGrid && (tool === 'line' || tool === 'rect' || tool === 'circle')) {
      const snapped = snapToGrid({ x, y }, GRID_SIZE, GRID_SNAP_THRESHOLD);
      x = snapped.x;
      y = snapped.y;
    }

    // Detect guides
    const guides = showGuides ? detectGuideLines({ x, y }, objects) : [];
    setGuideLines(guides);

    // Handle text tool
    if (tool === 'text') {
      setTextInputPos({ x, y });
      setTextInputOpen(true);
      return;
    }

    const newObj = { id: objectId, type: tool, color, size: brushSize, start: { x, y }, fontSize };
    setObjectId(id => id + 1);

    if (tool === 'pen' || tool === 'highlighter') {
      newObj.type = 'stroke';
      newObj.points = [{ x, y }];
      newObj.opacity = tool === 'highlighter' ? 0.4 : 1;
    } else if (tool === 'eraser') {
      setObjects(objs => objs.filter(o => !isNearPoint(o, x, y)));
      return;
    } else if (['line', 'rect', 'circle'].includes(tool)) {
      setPreviewShape({ type: tool, start: { x, y }, end: { x, y }, color, size: brushSize });
    }

    setObjects(objs => [...objs, newObj]);
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left - pan.x) / zoom;
    let y = (e.clientY - rect.top - pan.y) / zoom;

    // Apply snap-to-grid
    if (snapToGrid && (tool === 'line' || tool === 'rect' || tool === 'circle')) {
      const snapped = snapToGrid({ x, y }, GRID_SIZE, GRID_SNAP_THRESHOLD);
      x = snapped.x;
      y = snapped.y;
    }

    // Detect guides
    const guides = showGuides ? detectGuideLines({ x, y }, objects) : [];
    setGuideLines(guides);

    // Update shape preview
    if (['line', 'rect', 'circle'].includes(tool)) {
      setPreviewShape(prev => prev ? { ...prev, end: { x, y } } : null);
      return;
    }

    setObjects(objs => {
      const lastObj = objs[objs.length - 1];
      if (!lastObj) return objs;

      if (tool === 'pen' || tool === 'highlighter') {
        lastObj.points = [...(lastObj.points || []), { x, y }];
      }
      return [...objs.slice(0, -1), lastObj];
    });
  };

  const handleMouseUp = () => {
    if (previewShape && ['line', 'rect', 'circle'].includes(tool)) {
      setObjects(objs => {
        const lastObj = objs[objs.length - 1];
        if (!lastObj) return objs;

        // Finalize shape with end point
        lastObj.end = previewShape.end;
        lastObj.points = undefined; // Remove points from shapes

        return [...objs.slice(0, -1), lastObj];
      });
      setPreviewShape(null);
    }

    setIsDrawing(false);
    setIsPanning(false);
    setGuideLines([]);
  };

  // Drag/Drop Media File Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const files = Array.from(e.dataTransfer.files || []);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let dropX = (e.clientX - rect.left - pan.x) / zoom;
    let dropY = (e.clientY - rect.top - pan.y) / zoom;

    for (const file of files) {
      const mediaObj = await processMediaFile(file, { x: dropX, y: dropY });
      if (mediaObj) {
        setObjects(objs => [...objs, mediaObj]);
        dropX += 120;
        dropY += 100;
      }
    }
  };

  const processMediaFile = async (file, pos) => {
    const type = file.type;
    let mediaType = 'unknown';

    if (type.startsWith('image/')) mediaType = 'image';
    else if (type === 'application/pdf') mediaType = 'pdf';
    else if (type.startsWith('video/')) mediaType = 'video';
    else if (type.startsWith('audio/')) mediaType = 'audio';
    else if (['.obj', '.gltf', '.glb', '.usdz'].some(ext => file.name.toLowerCase().endsWith(ext))) {
      mediaType = 'model-link';
    }

    if (mediaType === 'image') {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: objectId,
            type: 'image',
            src: e.target.result,
            x: pos.x,
            y: pos.y,
            width: 200,
            height: 150,
          });
          setObjectId(id => id + 1);
        };
        reader.readAsDataURL(file);
      });
    } else {
      return {
        id: objectId,
        type: mediaType,
        fileName: file.name,
        file: file,
        fileUrl: URL.createObjectURL(file),
        x: pos.x,
        y: pos.y,
        width: 150,
        height: 100,
      };
    }
  };

  const handleCanvasClick = (e) => {
    if (tool !== 'pointer') return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    for (const obj of objects) {
      const isClickOnMedia = x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height;

      if (isClickOnMedia && obj.type === 'pdf') {
        setSelectedMediaObject(obj);
        setPdfViewerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === 'video') {
        setSelectedMediaObject(obj);
        setVideoPlayerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === 'audio') {
        setSelectedMediaObject(obj);
        setAudioPlayerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === 'model-link') {
        setSelectedMediaObject(obj);
        window.open(`https://model-viewer.editing.web.app/?url=${obj.fileUrl}`, '_blank');
        return;
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const newZoom = Math.max(0.1, Math.min(5, zoom + (e.deltaY > 0 ? -zoomFactor : zoomFactor)));
    setZoom(newZoom);
  };

  // Tool Actions
  const clearBoard = useCallback(() => {
    if (window.confirm('Clear entire board? This cannot be undone.')) {
      setObjects([]);
      redrawCanvas();
    }
  }, [redrawCanvas]);

  const addStickyNote = useCallback(() => {
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
  }, [objectId]);

  const addInjectedPanel = useCallback(() => {
    const newPanel = {
      id: 'panel-' + objectId,
      type: 'panel',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: 300,
      height: 250,
      z: zIndex + 1,
      title: 'LUCCCA Panel',
      panelType: 'dashboard' // Cost, Labor, BEO, Calendar, Inventory, etc.
    };
    setFloatingPanels(panels => [...panels, newPanel]);
    setZIndex(z => z + 1);
    setObjectId(id => id + 1);
  }, [objectId, zIndex]);

  const sendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: chatMessages.length + 1,
      author: 'You',
      text: chatInput,
      timestamp: new Date()
    };
    setChatMessages(msgs => [...msgs, newMsg]);
    setChatInput('');
  }, [chatInput, chatMessages]);

  const toggleRecording = useCallback(() => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setChatMessages(msgs => [...msgs, {
        id: msgs.length + 1,
        author: 'System',
        text: '⏺️ Recording started',
        timestamp: new Date()
      }]);
    }
  }, [isRecording]);

  // Redraw canvas when objects change
  useEffect(() => {
    redrawCanvas();
  }, [objects, pan, zoom, redrawCanvas, previewShape, guideLines, showGuides]);

  // Auto-save to history
  useEffect(() => {
    if (isDrawing || textInputOpen) return; // Don't save while actively drawing or inputting text

    const timer = setTimeout(() => {
      if (historyIndex === -1 || JSON.stringify(history[historyIndex]?.objects) !== JSON.stringify(objects)) {
        saveToHistory();
      }
    }, 500); // Save 500ms after user stops drawing

    return () => clearTimeout(timer);
  }, [objects, isDrawing, textInputOpen, history, historyIndex, saveToHistory]);

  // History Management
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      timestamp: new Date().toISOString(),
      objects: JSON.parse(JSON.stringify(objects)),
      title: `Save at ${new Date().toLocaleTimeString()}`
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, objects]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setObjects(history[newIndex].objects);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setObjects(history[newIndex].objects);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const handleSaveSnapshot = useCallback(() => {
    if (!snapshotName.trim()) return;

    const newSnapshot = {
      id: Date.now(),
      name: snapshotName,
      timestamp: new Date().toISOString(),
      objects: JSON.parse(JSON.stringify(objects))
    };
    setSnapshots([...snapshots, newSnapshot]);
    setSnapshotName('');
    setSnapshotDialogOpen(false);
  }, [snapshotName, objects, snapshots]);

  const handleRestoreSnapshot = useCallback((snapshotId) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (snapshot) {
      setObjects(JSON.parse(JSON.stringify(snapshot.objects)));
      saveToHistory();
    }
  }, [snapshots, saveToHistory]);

  const handleDeleteSnapshot = useCallback((snapshotId) => {
    setSnapshots(snapshots.filter(s => s.id !== snapshotId));
  }, [snapshots]);

  const handleExportPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `whiteboard-${Date.now()}.png`;
    link.click();
  }, []);

  const handleExportJSON = useCallback(() => {
    const boardData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      objects: objects,
      zoom: zoom,
      pan: pan,
    };

    const json = JSON.stringify(boardData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `whiteboard-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [objects, zoom, pan]);

  // Text input dialog handler
  const handleAddText = useCallback(() => {
    if (!textInputValue.trim()) {
      setTextInputOpen(false);
      return;
    }

    const newText = {
      id: objectId,
      type: 'text',
      start: textInputPos,
      text: textInputValue,
      color,
      fontSize
    };
    setObjects(objs => [...objs, newText]);
    setObjectId(id => id + 1);
    setTextInputValue('');
    setTextInputOpen(false);
  }, [textInputValue, textInputPos, color, fontSize, objectId]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden bg-slate-900"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f1f34 100%)',
        userSelect: 'none'
      }}
    >
      {/* HEADER */}
      <div className="flex-shrink-0 border-b border-cyan-400/30 px-4 py-2 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-cyan-300">EchoDesk Whiteboard</h1>
          <div className="text-xs text-cyan-400/70 flex items-center gap-2">
            <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
            <span>Objects: {objects.length}</span>
            <span>Participants: {participants.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowToolbar(!showToolbar)}
            className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
            title="Toggle toolbar"
          >
            {showToolbar ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
            title="Toggle members"
          >
            <Users size={16} />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* CANVAS */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <canvas
            ref={canvasRef}
            className="flex-1 cursor-crosshair bg-slate-900"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={handleCanvasClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              cursor: isDraggingFile ? 'copy' : isPanning ? 'grabbing' : 'crosshair',
              border: isDraggingFile ? '2px dashed rgba(0, 217, 255, 0.8)' : 'none',
              transition: 'border 0.2s'
            }}
          />

          {/* FLOATING PANELS INJECTION */}
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
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
                  padding: '12px',
                }}
              >
                <div style={{ color: '#00d9ff', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {panel.title}
                </div>
                <div style={{ color: '#00d9ff', fontSize: '10px', opacity: 0.6 }}>
                  Panel Type: {panel.panelType}
                </div>
              </div>
            ))}
          </div>

          {/* TEXT INPUT DIALOG */}
          {textInputOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50">
              <div className="bg-slate-800 rounded-lg p-6 border border-cyan-400/40 shadow-2xl max-w-md w-96">
                <h2 className="text-lg font-bold text-cyan-300 mb-4">Add Text</h2>
                <textarea
                  value={textInputValue}
                  onChange={e => setTextInputValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && e.ctrlKey && handleAddText()}
                  placeholder="Enter text (Ctrl+Enter to add)..."
                  className="w-full h-24 bg-cyan-400/10 border border-cyan-400/20 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/40 mb-4 text-sm"
                  autoFocus
                />
                <div className="flex items-center gap-3 mb-4">
                  <label className="text-xs text-cyan-400">Font Size:</label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={fontSize}
                    onChange={e => setFontSize(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs text-cyan-300 w-8">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-xs text-cyan-400">Color:</label>
                  <input
                    type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddText}
                    className="flex-1 px-4 py-2 bg-cyan-500/30 rounded hover:bg-cyan-500/50 text-cyan-200 text-sm font-semibold"
                  >
                    Add Text
                  </button>
                  <button
                    onClick={() => {
                      setTextInputOpen(false);
                      setTextInputValue('');
                      setObjects(objs => objs.slice(0, -1)); // Remove incomplete object
                    }}
                    className="flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PDF VIEWER MODAL */}
          {pdfViewerOpen && selectedMediaObject && (
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
            }}>
              <div style={{
                backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '16px',
                border: '1px solid #ff6b4d', maxWidth: '90vw', maxHeight: '90vh',
                display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h2 style={{ margin: 0, color: '#ff6b4d', fontSize: '16px' }}>
                    📄 {selectedMediaObject.fileName}
                  </h2>
                  <button onClick={() => setPdfViewerOpen(false)} style={{
                    background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px'
                  }}>×</button>
                </div>
                <iframe src={selectedMediaObject.fileUrl} style={{
                  width: '600px', height: '400px', border: 'none', borderRadius: '6px'
                }} />
              </div>
            </div>
          )}

          {/* VIDEO PLAYER MODAL */}
          {videoPlayerOpen && selectedMediaObject && (
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
            }}>
              <div style={{
                backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '16px',
                border: '1px solid #4d7aff', maxWidth: '90vw'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h2 style={{ margin: 0, color: '#4d7aff', fontSize: '16px' }}>
                    ▶️ {selectedMediaObject.fileName}
                  </h2>
                  <button onClick={() => setVideoPlayerOpen(false)} style={{
                    background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px'
                  }}>×</button>
                </div>
                <video src={selectedMediaObject.fileUrl} controls style={{
                  maxWidth: '600px', width: '100%', borderRadius: '6px'
                }} />
              </div>
            </div>
          )}

          {/* AUDIO PLAYER MODAL */}
          {audioPlayerOpen && selectedMediaObject && (
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
            }}>
              <div style={{
                backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '16px',
                border: '1px solid #f39c12', minWidth: '300px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h2 style={{ margin: 0, color: '#f39c12', fontSize: '16px' }}>
                    🔊 {selectedMediaObject.fileName}
                  </h2>
                  <button onClick={() => setAudioPlayerOpen(false)} style={{
                    background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px'
                  }}>×</button>
                </div>
                <audio src={selectedMediaObject.fileUrl} controls style={{ width: '100%' }} />
              </div>
            </div>
          )}

          {/* SNAPSHOT SAVE DIALOG */}
          {snapshotDialogOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50">
              <div className="bg-slate-800 rounded-lg p-6 border border-green-400/40 shadow-2xl max-w-md w-80">
                <h2 className="text-lg font-bold text-green-300 mb-4">💾 Save Snapshot</h2>
                <input
                  type="text"
                  value={snapshotName}
                  onChange={e => setSnapshotName(e.target.value)}
                  placeholder="Enter snapshot name..."
                  className="w-full bg-green-400/10 border border-green-400/20 rounded px-3 py-2 text-green-100 placeholder-green-400/40 mb-4 text-sm"
                  autoFocus
                  onKeyPress={e => e.key === 'Enter' && handleSaveSnapshot()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveSnapshot}
                    disabled={!snapshotName.trim()}
                    className={`flex-1 px-4 py-2 rounded text-sm font-semibold transition-colors ${
                      snapshotName.trim()
                        ? 'bg-green-500/30 hover:bg-green-500/50 text-green-200'
                        : 'bg-green-500/10 text-green-400/50 cursor-not-allowed'
                    }`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setSnapshotDialogOpen(false);
                      setSnapshotName('');
                    }}
                    className="flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ZOOM CONTROLS */}
          <div className="absolute bottom-4 right-4 flex gap-2 bg-black/40 rounded-lg p-2 border border-cyan-400/20">
            <button
              onClick={() => setZoom(z => Math.min(5, z + 0.1))}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoom(z => Math.max(0.1, z - 0.1))}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title="Reset view"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* SIDEBAR: TABS */}
        {showMembers && (
          <div className="w-80 border-l border-cyan-400/30 flex flex-col bg-black/20">
            {/* TAB BUTTONS */}
            <div className="flex border-b border-cyan-400/20">
              {[
                { id: 'members', icon: Users, label: 'Members' },
                { id: 'chat', icon: Send, label: 'Chat' },
                { id: 'history', icon: Clock, label: 'History' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 flex items-center justify-center gap-2 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-200 bg-cyan-400/10'
                      : 'border-transparent text-cyan-400/60 hover:text-cyan-300'
                  }`}
                >
                  <tab.icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
              <div className="flex-1 overflow-auto p-3 space-y-2">
                {participants.map(p => (
                  <div
                    key={p.id}
                    className="p-2 rounded border border-cyan-400/20 bg-cyan-400/5 text-xs"
                  >
                    <div className="font-semibold text-cyan-200 flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${p.isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`} />
                      {p.name}
                    </div>
                    <div className="text-cyan-400/60 text-[10px] mb-2">Role: {p.role}</div>
                    <div className="flex gap-1">
                      <button className="flex-1 px-1 py-1 bg-cyan-500/20 rounded text-[9px] hover:bg-cyan-500/30">
                        {p.isMuted ? <MicOff size={10} /> : <Mic size={10} />}
                      </button>
                      <button className="flex-1 px-1 py-1 bg-cyan-500/20 rounded text-[9px] hover:bg-cyan-500/30">
                        {p.isCameraOff ? <VideoOff size={10} /> : <VideoCam size={10} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-3 space-y-2 text-xs">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="text-cyan-100/70">
                      <span className="font-semibold text-cyan-300">{msg.author}:</span> {msg.text}
                    </div>
                  ))}
                </div>
                <div className="border-t border-cyan-400/20 p-2 flex gap-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type message..."
                    className="flex-1 bg-cyan-400/10 border border-cyan-400/20 rounded px-2 py-1 text-xs text-cyan-100 placeholder-cyan-400/40"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-2 py-1 bg-cyan-500/20 rounded hover:bg-cyan-500/30 text-cyan-300"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="flex-1 overflow-auto p-3 space-y-3">
                {/* Timeline Section */}
                <div>
                  <h3 className="text-xs font-bold text-cyan-300 mb-2">Timeline ({history.length})</h3>
                  <div className="space-y-1">
                    {history.length === 0 ? (
                      <div className="text-center py-4 text-cyan-400/50 text-xs">No history yet</div>
                    ) : (
                      history.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setObjects(JSON.parse(JSON.stringify(item.objects)));
                            setHistoryIndex(idx);
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                            historyIndex === idx
                              ? 'bg-cyan-500/40 text-cyan-100'
                              : 'bg-cyan-400/10 text-cyan-100/70 hover:bg-cyan-400/20'
                          }`}
                        >
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Snapshots Section */}
                <div className="border-t border-cyan-400/20 pt-3">
                  <h3 className="text-xs font-bold text-cyan-300 mb-2">Snapshots ({snapshots.length})</h3>
                  <div className="space-y-1">
                    {snapshots.length === 0 ? (
                      <div className="text-center py-4 text-cyan-400/50 text-xs">No snapshots saved</div>
                    ) : (
                      snapshots.map(snap => (
                        <div key={snap.id} className="bg-cyan-400/10 rounded p-2">
                          <div className="text-cyan-100 text-xs font-semibold truncate">{snap.name}</div>
                          <div className="text-cyan-400/60 text-xs">{new Date(snap.timestamp).toLocaleString()}</div>
                          <div className="flex gap-1 mt-1">
                            <button
                              onClick={() => handleRestoreSnapshot(snap.id)}
                              className="flex-1 px-1 py-0.5 bg-cyan-500/30 rounded text-xs hover:bg-cyan-500/50 text-cyan-200"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => handleDeleteSnapshot(snap.id)}
                              className="flex-1 px-1 py-0.5 bg-red-500/20 rounded text-xs hover:bg-red-500/30 text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOOLBAR */}
      {showToolbar && (
        <div
          className="flex-shrink-0 border-t border-cyan-400/30 px-4 py-3 flex flex-wrap gap-3 bg-black/40"
          style={{ opacity: toolbarOpacity }}
        >
          {/* Drawing Tools */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            {[
              { id: 'pen', icon: Pencil, label: 'Pen' },
              { id: 'highlighter', icon: Highlighter, label: 'Highlighter' },
              { id: 'eraser', icon: Trash2, label: 'Eraser' },
              { id: 'pointer', icon: Zap, label: 'Pointer (Pan)' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`p-2 rounded transition-colors ${
                  tool === t.id
                    ? 'bg-cyan-400/30 text-cyan-200'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
                title={t.label}
              >
                <t.icon size={16} />
              </button>
            ))}
          </div>

          {/* Shape Tools */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            {[
              { id: 'line', icon: Line, label: 'Line' },
              { id: 'rect', icon: Square, label: 'Rectangle' },
              { id: 'circle', icon: Circle, label: 'Circle' },
              { id: 'text', icon: Type, label: 'Text' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`p-2 rounded transition-colors ${
                  tool === t.id
                    ? 'bg-cyan-400/30 text-cyan-200'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
                title={t.label}
              >
                <t.icon size={16} />
              </button>
            ))}
          </div>

          {/* Undo/Redo & History */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-2 rounded transition-colors ${
                historyIndex <= 0
                  ? 'text-cyan-400/30 cursor-not-allowed'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={16} />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`p-2 rounded transition-colors ${
                historyIndex >= history.length - 1
                  ? 'text-cyan-400/30 cursor-not-allowed'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo size={16} />
            </button>
          </div>

          {/* Export & Snapshots */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            <button
              onClick={handleExportPNG}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors"
              title="Export as PNG"
            >
              <Image size={16} />
            </button>
            <button
              onClick={handleExportJSON}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors"
              title="Export as JSON"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => setSnapshotDialogOpen(true)}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors"
              title="Save snapshot"
            >
              <Save size={16} />
            </button>
          </div>

          {/* Sticky Note & Panel Injection */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            <button
              onClick={addStickyNote}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title="Add sticky note"
            >
              <StickyNote size={16} />
            </button>
            <button
              onClick={addInjectedPanel}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title="Inject LUCCCA panel"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Color & Size */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-cyan-400">Color:</label>
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-cyan-400">Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={e => setBrushSize(parseInt(e.target.value))}
              className="w-24"
            />
          </div>

          {/* Precision Tools */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            <button
              onClick={() => setSnapToGrid(!snapToGrid)}
              className={`p-2 rounded transition-colors ${
                snapToGrid
                  ? 'bg-cyan-400/30 text-cyan-200'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title={snapToGrid ? 'Snap-to-grid ON' : 'Snap-to-grid OFF'}
            >
              <Ruler size={16} />
            </button>
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`p-2 rounded transition-colors ${
                showGuides
                  ? 'bg-cyan-400/30 text-cyan-200'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title={showGuides ? 'Alignment guides ON' : 'Alignment guides OFF'}
            >
              <AlertTriangle size={16} />
            </button>
          </div>

          {/* Board Controls */}
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20 ml-auto">
            <button
              onClick={toggleRecording}
              className={`p-2 rounded transition-colors ${
                isRecording
                  ? 'bg-red-500/30 text-red-300'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title={isRecording ? 'Recording' : 'Start recording'}
            >
              <Zap size={16} />
            </button>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className="p-2 rounded hover:bg-cyan-400/10 text-cyan-400"
              title={isLocked ? 'Unlock board' : 'Lock board'}
            >
              {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
            <button
              onClick={clearBoard}
              className="p-2 rounded hover:bg-red-500/10 text-red-400"
              title="Clear board"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to check if point is near an object
function isNearPoint(obj, x, y, threshold = 10) {
  if (obj.type === 'sticky') {
    return x > obj.x - threshold && x < obj.x + 150 + threshold &&
           y > obj.y - threshold && y < obj.y + 150 + threshold;
  }
  return false;
}

// Snap point to grid
function snapToGrid(point, gridSize, threshold) {
  const snappedX = Math.abs((point.x % gridSize) - gridSize) < threshold ?
    Math.round(point.x / gridSize) * gridSize : point.x;
  const snappedY = Math.abs((point.y % gridSize) - gridSize) < threshold ?
    Math.round(point.y / gridSize) * gridSize : point.y;
  return { x: snappedX, y: snappedY };
}

// Detect alignment guides
function detectGuideLines(point, objects, threshold = 10) {
  const guides = [];
  const verticalLines = new Set();
  const horizontalLines = new Set();

  // Add grid guides
  verticalLines.add(Math.round(point.x / GRID_SIZE) * GRID_SIZE);
  horizontalLines.add(Math.round(point.y / GRID_SIZE) * GRID_SIZE);

  // Check alignment with existing objects
  objects.forEach(obj => {
    if (obj.type === 'sticky') {
      verticalLines.add(obj.x);
      verticalLines.add(obj.x + 150);
      verticalLines.add(obj.x + 75);
      horizontalLines.add(obj.y);
      horizontalLines.add(obj.y + 150);
      horizontalLines.add(obj.y + 75);
    } else if (obj.type === 'rect' || obj.type === 'line') {
      verticalLines.add(obj.start?.x || obj.x);
      verticalLines.add(obj.end?.x || obj.x + obj.width);
      horizontalLines.add(obj.start?.y || obj.y);
      horizontalLines.add(obj.end?.y || obj.y + obj.height);
    }
  });

  // Return guides within threshold
  verticalLines.forEach(x => {
    if (Math.abs(point.x - x) < threshold) {
      guides.push({ type: 'vertical', pos: x });
    }
  });
  horizontalLines.forEach(y => {
    if (Math.abs(point.y - y) < threshold) {
      guides.push({ type: 'horizontal', pos: y });
    }
  });

  return guides;
}
