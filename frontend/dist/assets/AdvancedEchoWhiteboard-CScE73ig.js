import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { I as Image, M as Maximize2, V as Video, d as Ruler } from "./Board-6RvNRUqx.js";
import { M as Minimize2 } from "./minimize-2-DaPLM2HR.js";
import { U as Users } from "./users-DPrj24jF.js";
import { Z as ZoomIn, a as ZoomOut, T as Type, L as Lock } from "./zoom-out-CyY6YGtM.js";
import { R as RotateCcw } from "./rotate-ccw-BtE446Kb.js";
import { S as Send } from "./send-CDUeeG5G.js";
import { C as Clock } from "./clock-BJR8nEFt.js";
import { M as MicOff, a as Mic, V as VideoOff } from "./video-off-D4RbRVok.js";
import { P as Pencil } from "./pencil-BDNSeP0d.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
import { T as Trash2 } from "./trash-2-Bv0uM_qc.js";
import { Z as Zap } from "./zap-D7rSfwrr.js";
import { D as Download } from "./download-DJY62jCL.js";
import { S as Save } from "./save-C03uEDxe.js";
import { S as StickyNote } from "./sticky-note-BIaj4bqy.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { T as TriangleAlert } from "./triangle-alert-BirfCPt0.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$5);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m9 11-6 6v3h9l3-3", key: "1a3l36" }],
  ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4", key: "14a9rk" }]
];
const Highlighter = createLucideIcon("highlighter", __iconNode$4);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode$3);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 7v6h-6", key: "3ptur4" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]
];
const Redo = createLucideIcon("redo", __iconNode$2);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
];
const Undo = createLucideIcon("undo", __iconNode);
const LS_BOARD_STATE = "luccca:board:state:v1";
const GRID_SIZE = 20;
const GRID_SNAP_THRESHOLD = 8;
function AdvancedEchoWhiteboard() {
  const containerRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const contextRef = reactExports.useRef(null);
  const [tool, setTool] = reactExports.useState("pen");
  const [color, setColor] = reactExports.useState("#00d9ff");
  const [brushSize, setBrushSize] = reactExports.useState(3);
  const [fontSize, setFontSize] = reactExports.useState(16);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [drawingMode, setDrawingMode] = reactExports.useState("freehand");
  const [objects, setObjects] = reactExports.useState([]);
  const [objectId, setObjectId] = reactExports.useState(0);
  const [previewShape, setPreviewShape] = reactExports.useState(null);
  const [textInputOpen, setTextInputOpen] = reactExports.useState(false);
  const [textInputValue, setTextInputValue] = reactExports.useState("");
  const [textInputPos, setTextInputPos] = reactExports.useState({ x: 0, y: 0 });
  const [snapToGrid2, setSnapToGrid] = reactExports.useState(true);
  const [showGuides, setShowGuides] = reactExports.useState(true);
  const [guideLines, setGuideLines] = reactExports.useState([]);
  const [isDraggingFile, setIsDraggingFile] = reactExports.useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = reactExports.useState(false);
  const [videoPlayerOpen, setVideoPlayerOpen] = reactExports.useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = reactExports.useState(false);
  const [selectedMediaObject, setSelectedMediaObject] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [historyIndex, setHistoryIndex] = reactExports.useState(-1);
  const [snapshots, setSnapshots] = reactExports.useState([]);
  const [snapshotName, setSnapshotName] = reactExports.useState("");
  const [snapshotDialogOpen, setSnapshotDialogOpen] = reactExports.useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = reactExports.useState(false);
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState(null);
  const [expoRailOpen, setExpoRailOpen] = reactExports.useState(false);
  const [liveOrders, setLiveOrders] = reactExports.useState([
    { id: 1, table: 5, items: "Beef Wellington", fireSince: 8, status: "plating" },
    { id: 2, table: 3, items: "Coq au Vin", fireSince: 12, status: "plating" },
    { id: 3, table: 7, items: "French Onion Soup", fireSince: 3, status: "sent" },
    { id: 4, table: 1, items: "Hollandaise", fireSince: 2, status: "ready" }
  ]);
  const [wasteNotes, setWasteNotes] = reactExports.useState([
    { id: 1, category: "spoilage", item: "Old lettuce", cost: 15 },
    { id: 2, category: "prep", item: "Carrot trim", cost: 3.5 },
    { id: 3, category: "returned", item: "Overcooked steak", cost: 32 }
  ]);
  const [aiApiKey, setAiApiKey] = reactExports.useState(localStorage.getItem("echo:ai:key") || "");
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [voiceTranscript, setVoiceTranscript] = reactExports.useState("");
  const [aiSummaryOpen, setAiSummaryOpen] = reactExports.useState(false);
  const [aiSummary, setAiSummary] = reactExports.useState("");
  const [actionItems, setActionItems] = reactExports.useState([]);
  const [promptDialogOpen, setPromptDialogOpen] = reactExports.useState(false);
  const [diagramPrompt, setDiagramPrompt] = reactExports.useState("");
  const [videoOpen, setVideoOpen] = reactExports.useState(false);
  const [participants, setParticipants] = reactExports.useState([
    { id: 1, name: "You", color: "#00d9ff", cursorX: 100, cursorY: 100, speaking: false },
    { id: 2, name: "Chef Marcus", color: "#ff6b4d", cursorX: 300, cursorY: 200, speaking: false },
    { id: 3, name: "Manager Sarah", color: "#4dff9e", cursorX: 200, cursorY: 150, speaking: false }
  ]);
  const [followPresenterMode, setFollowPresenterMode] = reactExports.useState(false);
  const [presenterZoom, setPresenterZoom] = reactExports.useState(1);
  const [presenterPan, setPresenterPan] = reactExports.useState({ x: 0, y: 0 });
  const [helpOpen, setHelpOpen] = reactExports.useState(false);
  const [zoom, setZoom] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = reactExports.useState(false);
  const [panStart, setPanStart] = reactExports.useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = reactExports.useState("canvas");
  const [showToolbar, setShowToolbar] = reactExports.useState(true);
  const [showMembers, setShowMembers] = reactExports.useState(true);
  const [isMaximized, setIsMaximized] = reactExports.useState(true);
  const [toolbarOpacity, setToolbarOpacity] = reactExports.useState(1);
  const [showTemplate, setShowTemplate] = reactExports.useState(false);
  const [chatMessages, setChatMessages] = reactExports.useState([
    { id: 1, author: "System", text: "Whiteboard initialized. Ready for collaboration.", timestamp: /* @__PURE__ */ new Date() }
  ]);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [floatingPanels, setFloatingPanels] = reactExports.useState([]);
  const [zIndex, setZIndex] = reactExports.useState(10);
  const [isLocked, setIsLocked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const context = canvas.getContext("2d");
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    contextRef.current = context;
    context.fillStyle = "#0f1628";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, canvas.width, canvas.height);
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_BOARD_STATE, JSON.stringify({
      objects,
      zoom,
      pan,
      participants,
      chatMessages,
      isLocked
    }));
  }, [objects, zoom, pan, participants, chatMessages, isLocked]);
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = "rgba(0, 217, 255, 0.05)";
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
  const redrawCanvas = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.fillStyle = "#0f1628";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    objects.forEach((obj) => {
      drawObject(ctx, obj);
    });
    if (previewShape) {
      ctx.strokeStyle = previewShape.color || "#00d9ff";
      ctx.lineWidth = previewShape.size || 2;
      ctx.setLineDash([5, 5]);
      const { start, end, type } = previewShape;
      if (type === "line") {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      } else if (type === "rect") {
        const width = end.x - start.x;
        const height = end.y - start.y;
        ctx.strokeRect(start.x, start.y, width, height);
      } else if (type === "circle") {
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    if (showGuides && guideLines.length > 0) {
      ctx.strokeStyle = "rgba(255, 100, 100, 0.5)";
      ctx.lineWidth = 1;
      guideLines.forEach((guide) => {
        ctx.setLineDash([3, 3]);
        if (guide.type === "vertical") {
          ctx.beginPath();
          ctx.moveTo(guide.pos, -1e4);
          ctx.lineTo(guide.pos, 1e4);
          ctx.stroke();
        } else if (guide.type === "horizontal") {
          ctx.beginPath();
          ctx.moveTo(-1e4, guide.pos);
          ctx.lineTo(1e4, guide.pos);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);
    }
    ctx.restore();
  }, [objects, pan, zoom, previewShape, showGuides, guideLines]);
  const drawObject = (ctx, obj) => {
    ctx.strokeStyle = obj.color || "#00d9ff";
    ctx.fillStyle = obj.fillColor || "transparent";
    ctx.lineWidth = obj.size || 3;
    ctx.globalAlpha = obj.opacity ?? 1;
    switch (obj.type) {
      case "stroke":
        ctx.beginPath();
        if (obj.points && obj.points.length > 0) {
          ctx.moveTo(obj.points[0].x, obj.points[0].y);
          obj.points.forEach((p) => ctx.lineTo(p.x, p.y));
        }
        ctx.stroke();
        break;
      case "line":
        if (obj.start && obj.end) {
          ctx.beginPath();
          ctx.moveTo(obj.start.x, obj.start.y);
          ctx.lineTo(obj.end.x, obj.end.y);
          ctx.stroke();
          ctx.fillStyle = obj.color || "#00d9ff";
          ctx.beginPath();
          ctx.arc(obj.start.x, obj.start.y, 3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(obj.end.x, obj.end.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;
      case "rect":
        if (obj.start && obj.end) {
          const width = obj.end.x - obj.start.x;
          const height = obj.end.y - obj.start.y;
          ctx.strokeRect(obj.start.x, obj.start.y, width, height);
        }
        break;
      case "circle":
        if (obj.start && obj.end) {
          const radius = Math.sqrt(Math.pow(obj.end.x - obj.start.x, 2) + Math.pow(obj.end.y - obj.start.y, 2));
          ctx.beginPath();
          ctx.arc(obj.start.x, obj.start.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;
      case "text":
        if (obj.start) {
          ctx.font = `${obj.fontSize || 16}px Arial`;
          ctx.fillStyle = obj.color || "#00d9ff";
          ctx.fillText(obj.text || "", obj.start.x, obj.start.y);
        }
        break;
      case "sticky":
        ctx.fillStyle = obj.bgColor || "#fff700";
        ctx.fillRect(obj.x, obj.y, 150, 150);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(obj.x, obj.y, 150, 150);
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";
        ctx.fillText(obj.text || "...", obj.x + 5, obj.y + 20);
        break;
      case "image":
        if (obj.src) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
            ctx.strokeStyle = "rgba(0, 217, 255, 0.3)";
            ctx.lineWidth = 2;
            ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
          };
          img.src = obj.src;
        }
        break;
      case "pdf":
        ctx.fillStyle = "#ff6b4d";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("📄", obj.x + obj.width / 2, obj.y + obj.height / 2 - 10);
        ctx.font = "11px Arial";
        ctx.fillText("PDF", obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = "left";
        break;
      case "video":
        ctx.fillStyle = "#4d7aff";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("▶️", obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = "11px Arial";
        ctx.fillText("VIDEO", obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = "left";
        break;
      case "audio":
        ctx.fillStyle = "#f39c12";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🔊", obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = "11px Arial";
        ctx.fillText("AUDIO", obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = "left";
        break;
      case "model-link":
        ctx.fillStyle = "#9b59b6";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🎨", obj.x + obj.width / 2, obj.y + obj.height / 2 - 8);
        ctx.font = "11px Arial";
        ctx.fillText("3D", obj.x + obj.width / 2, obj.y + obj.height / 2 + 12);
        ctx.textAlign = "left";
        break;
    }
    ctx.globalAlpha = 1;
  };
  const handleMouseDown = (e) => {
    if (tool === "pointer" || e.button === 2) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left - pan.x) / zoom;
    let y = (e.clientY - rect.top - pan.y) / zoom;
    if (snapToGrid2 && (tool === "line" || tool === "rect" || tool === "circle")) {
      const snapped = snapToGrid2({ x, y }, GRID_SIZE, GRID_SNAP_THRESHOLD);
      x = snapped.x;
      y = snapped.y;
    }
    const guides = showGuides ? detectGuideLines({ x, y }, objects) : [];
    setGuideLines(guides);
    if (tool === "text") {
      setTextInputPos({ x, y });
      setTextInputOpen(true);
      return;
    }
    const newObj = { id: objectId, type: tool, color, size: brushSize, start: { x, y }, fontSize };
    setObjectId((id) => id + 1);
    if (tool === "pen" || tool === "highlighter") {
      newObj.type = "stroke";
      newObj.points = [{ x, y }];
      newObj.opacity = tool === "highlighter" ? 0.4 : 1;
    } else if (tool === "eraser") {
      setObjects((objs) => objs.filter((o) => !isNearPoint(o, x, y)));
      return;
    } else if (["line", "rect", "circle"].includes(tool)) {
      setPreviewShape({ type: tool, start: { x, y }, end: { x, y }, color, size: brushSize });
    }
    setObjects((objs) => [...objs, newObj]);
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
    if (snapToGrid2 && (tool === "line" || tool === "rect" || tool === "circle")) {
      const snapped = snapToGrid2({ x, y }, GRID_SIZE, GRID_SNAP_THRESHOLD);
      x = snapped.x;
      y = snapped.y;
    }
    const guides = showGuides ? detectGuideLines({ x, y }, objects) : [];
    setGuideLines(guides);
    if (["line", "rect", "circle"].includes(tool)) {
      setPreviewShape((prev) => prev ? { ...prev, end: { x, y } } : null);
      return;
    }
    setObjects((objs) => {
      const lastObj = objs[objs.length - 1];
      if (!lastObj) return objs;
      if (tool === "pen" || tool === "highlighter") {
        lastObj.points = [...lastObj.points || [], { x, y }];
      }
      return [...objs.slice(0, -1), lastObj];
    });
  };
  const handleMouseUp = () => {
    if (previewShape && ["line", "rect", "circle"].includes(tool)) {
      setObjects((objs) => {
        const lastObj = objs[objs.length - 1];
        if (!lastObj) return objs;
        lastObj.end = previewShape.end;
        lastObj.points = void 0;
        return [...objs.slice(0, -1), lastObj];
      });
      setPreviewShape(null);
    }
    setIsDrawing(false);
    setIsPanning(false);
    setGuideLines([]);
  };
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
        setObjects((objs) => [...objs, mediaObj]);
        dropX += 120;
        dropY += 100;
      }
    }
  };
  const processMediaFile = async (file, pos) => {
    const type = file.type;
    let mediaType = "unknown";
    if (type.startsWith("image/")) mediaType = "image";
    else if (type === "application/pdf") mediaType = "pdf";
    else if (type.startsWith("video/")) mediaType = "video";
    else if (type.startsWith("audio/")) mediaType = "audio";
    else if ([".obj", ".gltf", ".glb", ".usdz"].some((ext) => file.name.toLowerCase().endsWith(ext))) {
      mediaType = "model-link";
    }
    if (mediaType === "image") {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: objectId,
            type: "image",
            src: e.target.result,
            x: pos.x,
            y: pos.y,
            width: 200,
            height: 150
          });
          setObjectId((id) => id + 1);
        };
        reader.readAsDataURL(file);
      });
    } else {
      return {
        id: objectId,
        type: mediaType,
        fileName: file.name,
        file,
        fileUrl: URL.createObjectURL(file),
        x: pos.x,
        y: pos.y,
        width: 150,
        height: 100
      };
    }
  };
  const handleCanvasClick = (e) => {
    if (tool !== "pointer") return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    for (const obj of objects) {
      const isClickOnMedia = x > obj.x && x < obj.x + obj.width && y > obj.y && y < obj.y + obj.height;
      if (isClickOnMedia && obj.type === "pdf") {
        setSelectedMediaObject(obj);
        setPdfViewerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === "video") {
        setSelectedMediaObject(obj);
        setVideoPlayerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === "audio") {
        setSelectedMediaObject(obj);
        setAudioPlayerOpen(true);
        return;
      }
      if (isClickOnMedia && obj.type === "model-link") {
        setSelectedMediaObject(obj);
        window.open(`https://model-viewer.editing.web.app/?url=${obj.fileUrl}`, "_blank");
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
  const clearBoard = reactExports.useCallback(() => {
    if (window.confirm("Clear entire board? This cannot be undone.")) {
      setObjects([]);
      redrawCanvas();
    }
  }, [redrawCanvas]);
  const addStickyNote = reactExports.useCallback(() => {
    const newSticky = {
      id: objectId,
      type: "sticky",
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 300,
      text: "Click to edit",
      bgColor: ["#fff700", "#ffb3ba", "#baffc9", "#bae1ff", "#ffffba"][Math.floor(Math.random() * 5)]
    };
    setObjects((objs) => [...objs, newSticky]);
    setObjectId((id) => id + 1);
  }, [objectId]);
  const addInjectedPanel = reactExports.useCallback(() => {
    const newPanel = {
      id: "panel-" + objectId,
      type: "panel",
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: 300,
      height: 250,
      z: zIndex + 1,
      title: "LUCCCA Panel",
      panelType: "dashboard"
      // Cost, Labor, BEO, Calendar, Inventory, etc.
    };
    setFloatingPanels((panels) => [...panels, newPanel]);
    setZIndex((z) => z + 1);
    setObjectId((id) => id + 1);
  }, [objectId, zIndex]);
  const sendMessage = reactExports.useCallback(() => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: chatMessages.length + 1,
      author: "You",
      text: chatInput,
      timestamp: /* @__PURE__ */ new Date()
    };
    setChatMessages((msgs) => [...msgs, newMsg]);
    setChatInput("");
  }, [chatInput, chatMessages]);
  const toggleRecording = reactExports.useCallback(() => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setChatMessages((msgs) => [...msgs, {
        id: msgs.length + 1,
        author: "System",
        text: "⏺️ Recording started",
        timestamp: /* @__PURE__ */ new Date()
      }]);
    }
  }, [isRecording]);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setSnapshotDialogOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault();
        handleExportPNG();
      }
      if (e.key === "Delete") {
        e.preventDefault();
        setObjects((objs) => objs.filter((o) => o.id !== selectedMediaObject?.id));
      }
      if (e.key === "Escape") {
        setTextInputOpen(false);
        setTemplateDialogOpen(false);
        setPromptDialogOpen(false);
        setAiSummaryOpen(false);
        setPdfViewerOpen(false);
        setVideoPlayerOpen(false);
        setAudioPlayerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, handleExportPNG, selectedMediaObject]);
  reactExports.useEffect(() => {
    redrawCanvas();
  }, [objects, pan, zoom, redrawCanvas, previewShape, guideLines, showGuides]);
  reactExports.useEffect(() => {
    if (isDrawing || textInputOpen) return;
    const timer = setTimeout(() => {
      if (historyIndex === -1 || JSON.stringify(history[historyIndex]?.objects) !== JSON.stringify(objects)) {
        saveToHistory();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [objects, isDrawing, textInputOpen, history, historyIndex, saveToHistory]);
  const saveToHistory = reactExports.useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      objects: JSON.parse(JSON.stringify(objects)),
      title: `Save at ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, objects]);
  const handleUndo = reactExports.useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setObjects(history[newIndex].objects);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);
  const handleRedo = reactExports.useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setObjects(history[newIndex].objects);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);
  const handleSaveSnapshot = reactExports.useCallback(() => {
    if (!snapshotName.trim()) return;
    const newSnapshot = {
      id: Date.now(),
      name: snapshotName,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      objects: JSON.parse(JSON.stringify(objects))
    };
    setSnapshots([...snapshots, newSnapshot]);
    setSnapshotName("");
    setSnapshotDialogOpen(false);
  }, [snapshotName, objects, snapshots]);
  const handleRestoreSnapshot = reactExports.useCallback((snapshotId) => {
    const snapshot = snapshots.find((s) => s.id === snapshotId);
    if (snapshot) {
      setObjects(JSON.parse(JSON.stringify(snapshot.objects)));
      saveToHistory();
    }
  }, [snapshots, saveToHistory]);
  const handleDeleteSnapshot = reactExports.useCallback((snapshotId) => {
    setSnapshots(snapshots.filter((s) => s.id !== snapshotId));
  }, [snapshots]);
  const handleExportPNG = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `whiteboard-${Date.now()}.png`;
    link.click();
  }, []);
  const handleExportJSON = reactExports.useCallback(() => {
    const boardData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0",
      objects,
      zoom,
      pan
    };
    const json = JSON.stringify(boardData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `whiteboard-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [objects, zoom, pan]);
  const extractActionItems = reactExports.useCallback(() => {
    const items = [];
    const stickyNotes = objects.filter((o) => o.type === "sticky");
    stickyNotes.forEach((note) => {
      const text = note.text || "";
      const mentions = text.match(/@(\w+)/g) || [];
      mentions.forEach((mention) => {
        items.push({
          type: "mention",
          assignee: mention.slice(1),
          text,
          priority: "normal"
        });
      });
      if (text.includes("TODO:") || text.toUpperCase().includes("TODO")) {
        items.push({
          type: "todo",
          assignee: "Unassigned",
          text,
          priority: "high"
        });
      }
      if (text.includes("DONE:") || text.toUpperCase().includes("DONE")) {
        items.push({
          type: "done",
          assignee: "Completed",
          text,
          priority: "low"
        });
      }
    });
    setActionItems(items);
    return items;
  }, [objects]);
  const startVoiceRecording = reactExports.useCallback(() => {
    if (typeof window === "undefined" || !window.webkitSpeechRecognition && !window.SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setVoiceTranscript(transcript);
      if (transcript.trim()) {
        const newNote = {
          id: objectId,
          type: "sticky",
          x: 100 + Math.random() * 200,
          y: 100 + Math.random() * 200,
          bgColor: "#fff700",
          text: transcript
        };
        setObjects((objs) => [...objs, newNote]);
        setObjectId((id) => id + 1);
      }
    };
    recognition.start();
  }, [objectId]);
  const generateDiagramFromPrompt = reactExports.useCallback(() => {
    if (!diagramPrompt.trim()) return;
    const prompt = diagramPrompt.toLowerCase();
    let newObjects = [];
    const startX = 100;
    const startY = 100;
    if (prompt.includes("flowchart")) {
      const steps = ["Start", "Process", "Decision", "End"];
      steps.forEach((step, idx) => {
        newObjects.push({
          id: objectId + idx * 2,
          type: "rect",
          start: { x: startX, y: startY + idx * 100 },
          end: { x: startX + 150, y: startY + idx * 100 + 60 },
          color: "#00d9ff",
          size: 2
        });
        newObjects.push({
          id: objectId + idx * 2 + 1,
          type: "text",
          start: { x: startX + 40, y: startY + idx * 100 + 30 },
          text: step,
          color: "#fff",
          fontSize: 12
        });
      });
    } else if (prompt.includes("org chart") || prompt.includes("organization")) {
      const positions = [
        { x: startX + 50, y: startY, label: "CEO" },
        { x: startX, y: startY + 100, label: "Manager 1" },
        { x: startX + 100, y: startY + 100, label: "Manager 2" }
      ];
      positions.forEach((pos, idx) => {
        newObjects.push({
          id: objectId + idx,
          type: "rect",
          start: { x: pos.x, y: pos.y },
          end: { x: pos.x + 100, y: pos.y + 60 },
          color: "#b84dff",
          size: 2
        });
        newObjects.push({
          id: objectId + 10 + idx,
          type: "text",
          start: { x: pos.x + 25, y: pos.y + 30 },
          text: pos.label,
          color: "#fff",
          fontSize: 11
        });
      });
    } else if (prompt.includes("kanban")) {
      const columns = ["To Do", "In Progress", "Done"];
      columns.forEach((col, idx) => {
        newObjects.push({
          id: objectId + idx,
          type: "rect",
          start: { x: startX + idx * 150, y: startY },
          end: { x: startX + idx * 150 + 120, y: startY + 300 },
          color: "#4d7aff",
          size: 2
        });
        newObjects.push({
          id: objectId + 10 + idx,
          type: "text",
          start: { x: startX + idx * 150 + 20, y: startY + 10 },
          text: col,
          color: "#fff",
          fontSize: 12
        });
      });
    }
    setObjects((objs) => [...objs, ...newObjects]);
    setObjectId((id) => id + (newObjects.length + 20));
    setPromptDialogOpen(false);
    setDiagramPrompt("");
  }, [diagramPrompt, objectId]);
  const applyTemplate = reactExports.useCallback((templateType) => {
    let newObjects = [];
    const startX = 100;
    const startY = 100;
    switch (templateType) {
      case "mise-en-place":
        newObjects = [
          {
            id: objectId + 0,
            type: "text",
            start: { x: startX, y: startY },
            text: "MISE EN PLACE CHECKLIST",
            color: "#00d9ff",
            fontSize: 20
          },
          {
            id: objectId + 1,
            type: "rect",
            start: { x: startX, y: startY + 40 },
            end: { x: startX + 400, y: startY + 400 },
            color: "#00d9ff",
            size: 2
          }
        ];
        for (let i = 0; i < 5; i++) {
          newObjects.push({
            id: objectId + 2 + i,
            type: "sticky",
            x: startX + 20,
            y: startY + 60 + i * 70,
            bgColor: "#fff700",
            text: `☐ Item ${i + 1}`
          });
        }
        break;
      case "production-timeline":
        newObjects = [
          {
            id: objectId + 0,
            type: "text",
            start: { x: startX, y: startY },
            text: "PRODUCTION TIMELINE",
            color: "#ff6b4d",
            fontSize: 20
          }
        ];
        const tasks = ["Prep", "Cook", "Plate", "Serve"];
        tasks.forEach((task, idx) => {
          newObjects.push({
            id: objectId + 1 + idx,
            type: "rect",
            start: { x: startX + idx * 120, y: startY + 60 },
            end: { x: startX + idx * 120 + 100, y: startY + 140 },
            color: "#ff6b4d",
            size: 2
          });
          newObjects.push({
            id: objectId + 5 + idx,
            type: "text",
            start: { x: startX + idx * 120 + 25, y: startY + 100 },
            text: task,
            color: "#fff",
            fontSize: 12
          });
        });
        break;
      case "floor-plan":
        newObjects = [
          {
            id: objectId + 0,
            type: "text",
            start: { x: startX, y: startY },
            text: "FLOOR PLAN",
            color: "#4d7aff",
            fontSize: 20
          }
        ];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            newObjects.push({
              id: objectId + 1 + row * 3 + col,
              type: "circle",
              start: { x: startX + col * 130, y: startY + 60 + row * 130 },
              end: { x: startX + col * 130 + 100, y: startY + 60 + row * 130 + 100 },
              color: "#4d7aff",
              size: 2
            });
            newObjects.push({
              id: objectId + 10 + row * 3 + col,
              type: "text",
              start: { x: startX + col * 130 + 35, y: startY + 110 + row * 130 },
              text: `T${row * 3 + col + 1}`,
              color: "#fff",
              fontSize: 14
            });
          }
        }
        break;
      case "allergen-matrix":
        newObjects = [
          {
            id: objectId + 0,
            type: "text",
            start: { x: startX, y: startY },
            text: "ALLERGEN MATRIX",
            color: "#f39c12",
            fontSize: 20
          },
          {
            id: objectId + 1,
            type: "text",
            start: { x: startX, y: startY + 50 },
            text: "🥛 Dairy | 🥜 Nuts | 🐚 Shellfish | 🌾 Gluten | 🥚 Eggs",
            color: "#f39c12",
            fontSize: 12
          }
        ];
        const allergens = ["🥛", "🥜", "🐚", "🌾", "🥚"];
        allergens.forEach((allergen, idx) => {
          newObjects.push({
            id: objectId + 2 + idx,
            type: "sticky",
            x: startX + idx * 100,
            y: startY + 100,
            bgColor: "#ff6b4d",
            text: allergen
          });
        });
        break;
      case "cost-sheet":
        newObjects = [
          {
            id: objectId + 0,
            type: "text",
            start: { x: startX, y: startY },
            text: "COST SHEET",
            color: "#4dff9e",
            fontSize: 20
          },
          {
            id: objectId + 1,
            type: "rect",
            start: { x: startX, y: startY + 50 },
            end: { x: startX + 400, y: startY + 300 },
            color: "#4dff9e",
            size: 2
          }
        ];
        const categories = ["Food Cost", "Labor", "Overhead", "Total"];
        categories.forEach((cat, idx) => {
          newObjects.push({
            id: objectId + 2 + idx,
            type: "text",
            start: { x: startX + 20, y: startY + 70 + idx * 60 },
            text: `${cat}: $0.00`,
            color: "#4dff9e",
            fontSize: 12
          });
        });
        break;
      case "recipe-card":
        newObjects = [
          {
            id: objectId + 0,
            type: "rect",
            start: { x: startX, y: startY },
            end: { x: startX + 300, y: startY + 400 },
            color: "#b84dff",
            size: 2
          },
          {
            id: objectId + 1,
            type: "text",
            start: { x: startX + 20, y: startY + 20 },
            text: "RECIPE NAME",
            color: "#b84dff",
            fontSize: 16
          },
          {
            id: objectId + 2,
            type: "text",
            start: { x: startX + 20, y: startY + 60 },
            text: "INGREDIENTS:",
            color: "#b84dff",
            fontSize: 12
          },
          {
            id: objectId + 3,
            type: "text",
            start: { x: startX + 20, y: startY + 150 },
            text: "INSTRUCTIONS:",
            color: "#b84dff",
            fontSize: 12
          },
          {
            id: objectId + 4,
            type: "text",
            start: { x: startX + 20, y: startY + 250 },
            text: "TIME: | SERVINGS: | DIFFICULTY:",
            color: "#b84dff",
            fontSize: 11
          }
        ];
        break;
    }
    setObjects((objs) => [...objs, ...newObjects]);
    setObjectId((id) => id + (newObjects.length + 20));
    setTemplateDialogOpen(false);
    setSelectedTemplate(null);
  }, [objectId]);
  const handleAddText = reactExports.useCallback(() => {
    if (!textInputValue.trim()) {
      setTextInputOpen(false);
      return;
    }
    const newText = {
      id: objectId,
      type: "text",
      start: textInputPos,
      text: textInputValue,
      color,
      fontSize
    };
    setObjects((objs) => [...objs, newText]);
    setObjectId((id) => id + 1);
    setTextInputValue("");
    setTextInputOpen(false);
  }, [textInputValue, textInputPos, color, fontSize, objectId]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full flex flex-col overflow-hidden bg-slate-900",
      style: {
        background: "linear-gradient(135deg, #0a1628 0%, #0f1f34 100%)",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-shrink-0 border-b border-cyan-400/30 px-4 py-2 flex items-center justify-between bg-black/40", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-lg font-bold text-cyan-300", children: "EchoDesk Whiteboard" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1245,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-400/70 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                "Zoom: ",
                (zoom * 100).toFixed(0),
                "%"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1247,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                "Objects: ",
                objects.length
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1248,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                "Participants: ",
                participants.length
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1249,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1246,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
            lineNumber: 1244,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setShowToolbar(!showToolbar),
                className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                title: "Toggle toolbar",
                children: showToolbar ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Minimize2, { size: 16 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1258,
                  columnNumber: 28
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Maximize2, { size: 16 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1258,
                  columnNumber: 54
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1253,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setShowMembers(!showMembers),
                className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                title: "Toggle members",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 16 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1265,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1260,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
            lineNumber: 1252,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
          lineNumber: 1243,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 flex overflow-hidden", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 flex flex-col overflow-hidden relative", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "canvas",
              {
                ref: canvasRef,
                className: "flex-1 cursor-crosshair bg-slate-900",
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                onMouseLeave: handleMouseUp,
                onWheel: handleWheel,
                onClick: handleCanvasClick,
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave,
                onDrop: handleDrop,
                style: {
                  cursor: isDraggingFile ? "copy" : isPanning ? "grabbing" : "crosshair",
                  border: isDraggingFile ? "2px dashed rgba(0, 217, 255, 0.8)" : "none",
                  transition: "border 0.2s"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1274,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
              floatingPanels.map((panel) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    position: "absolute",
                    left: panel.x,
                    top: panel.y,
                    width: panel.width,
                    height: panel.height,
                    zIndex: panel.z,
                    pointerEvents: "auto",
                    border: "1px solid rgba(0, 217, 255, 0.4)",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
                    padding: "12px"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }, children: panel.title }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1314,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontSize: "10px", opacity: 0.6 }, children: [
                      "Panel Type: ",
                      panel.panelType
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1317,
                      columnNumber: 17
                    }, this)
                  ]
                },
                panel.id,
                true,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1296,
                  columnNumber: 15
                },
                this
              )),
              expoRailOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                position: "absolute",
                right: 20,
                top: 20,
                width: 280,
                maxHeight: 400,
                zIndex: 1e3,
                backgroundColor: "#1a1a1a",
                border: "2px solid #ff6b4d",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 0 30px rgba(255, 107, 77, 0.4)",
                overflowY: "auto",
                pointerEvents: "auto"
              }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: { margin: 0, color: "#ff6b4d", fontSize: "14px", fontWeight: "bold" }, children: [
                    "🔥 EXPO RAIL (",
                    liveOrders.length,
                    ")"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1341,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: () => setExpoRailOpen(false),
                      style: {
                        background: "none",
                        border: "none",
                        color: "#ff6b4d",
                        cursor: "pointer",
                        fontSize: "18px"
                      },
                      children: "×"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1344,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1340,
                  columnNumber: 17
                }, this),
                liveOrders.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#999", fontSize: "12px", textAlign: "center", padding: "20px 0" }, children: "No active orders" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1359,
                  columnNumber: 19
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: liveOrders.map((order) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    style: {
                      backgroundColor: order.status === "ready" ? "#4dff9e20" : order.status === "plating" ? "#ff6b4d30" : "#4d7aff20",
                      border: `1px solid ${order.status === "ready" ? "#4dff9e" : order.status === "plating" ? "#ff6b4d" : "#4d7aff"}`,
                      borderRadius: "4px",
                      padding: "8px",
                      fontSize: "11px"
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", color: "#fff", marginBottom: "4px" }, children: [
                        "🍽️ Table ",
                        order.table
                      ] }, void 0, true, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1375,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", marginBottom: "2px" }, children: order.items }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1378,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#999", display: "flex", justifyContent: "space-between" }, children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                          "🔥 ",
                          order.fireSince,
                          " min"
                        ] }, void 0, true, {
                          fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                          lineNumber: 1382,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: {
                          padding: "2px 6px",
                          borderRadius: "2px",
                          backgroundColor: order.status === "ready" ? "#4dff9e40" : order.status === "plating" ? "#ff6b4d40" : "#4d7aff40",
                          color: order.status === "ready" ? "#4dff9e" : order.status === "plating" ? "#ff6b4d" : "#4d7aff",
                          fontSize: "10px",
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }, children: order.status }, void 0, false, {
                          fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                          lineNumber: 1383,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1381,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  order.id,
                  true,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1365,
                    columnNumber: 23
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1363,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1325,
                columnNumber: 15
              }, this),
              participants.map((participant) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    position: "absolute",
                    left: participant.cursorX,
                    top: participant.cursorY,
                    zIndex: 900,
                    pointerEvents: "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "div",
                      {
                        style: {
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: `2px solid ${participant.color}`,
                          backgroundColor: `${participant.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          boxShadow: `0 0 10px ${participant.color}40`
                        },
                        children: "👤"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1414,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: "-20px",
                          left: "0",
                          backgroundColor: participant.color,
                          color: "#fff",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          opacity: 0.9
                        },
                        children: participant.name
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1430,
                        columnNumber: 17
                      },
                      this
                    )
                  ]
                },
                participant.id,
                true,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1404,
                  columnNumber: 15
                },
                this
              )),
              videoOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                position: "absolute",
                right: 20,
                bottom: 20,
                width: 320,
                maxHeight: 300,
                zIndex: 1e3,
                backgroundColor: "#1a1a1a",
                border: "2px solid #4dff9e",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 0 30px rgba(77, 255, 158, 0.3)",
                pointerEvents: "auto"
              }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: { margin: 0, color: "#4dff9e", fontSize: "14px", fontWeight: "bold" }, children: [
                    "📹 Video Conference (",
                    participants.length,
                    ")"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1467,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: () => setVideoOpen(false),
                      style: {
                        background: "none",
                        border: "none",
                        color: "#4dff9e",
                        cursor: "pointer",
                        fontSize: "18px"
                      },
                      children: "×"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1470,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1466,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }, children: participants.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    style: {
                      backgroundColor: `${p.color}15`,
                      border: `1px solid ${p.color}`,
                      borderRadius: "4px",
                      padding: "8px",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: `${p.color}40`,
                        margin: "0 auto 4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px"
                      }, children: "👤" }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1497,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px", fontWeight: "600" }, children: p.name }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1510,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                        color: p.speaking ? "#4dff9e" : "#666",
                        fontSize: "10px",
                        marginTop: "4px"
                      }, children: p.speaking ? "🎤 Speaking" : "🔇 Mute" }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 1513,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  p.id,
                  true,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1487,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1485,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "6px", borderTop: "1px solid #4dff9e30", paddingTop: "12px" }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { style: {
                    flex: 1,
                    padding: "6px",
                    backgroundColor: "#4dff9e20",
                    border: "none",
                    borderRadius: "3px",
                    color: "#4dff9e",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }, children: "🎤 Mute" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1526,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { style: {
                    flex: 1,
                    padding: "6px",
                    backgroundColor: "#4dff9e20",
                    border: "none",
                    borderRadius: "3px",
                    color: "#4dff9e",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }, children: "📷 Camera" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1539,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1525,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1452,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1294,
              columnNumber: 11
            }, this),
            textInputOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-cyan-400/40 shadow-2xl max-w-md w-96", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-cyan-300 mb-4", children: "Add Text" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1561,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "textarea",
                {
                  value: textInputValue,
                  onChange: (e) => setTextInputValue(e.target.value),
                  onKeyPress: (e) => e.key === "Enter" && e.ctrlKey && handleAddText(),
                  placeholder: "Enter text (Ctrl+Enter to add)...",
                  className: "w-full h-24 bg-cyan-400/10 border border-cyan-400/20 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/40 mb-4 text-sm",
                  autoFocus: true
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1562,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-xs text-cyan-400", children: "Font Size:" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1571,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "range",
                    min: "8",
                    max: "48",
                    value: fontSize,
                    onChange: (e) => setFontSize(parseInt(e.target.value)),
                    className: "flex-1"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1572,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-cyan-300 w-8", children: [
                  fontSize,
                  "px"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1580,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1570,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-xs text-cyan-400", children: "Color:" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1583,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: color,
                    onChange: (e) => setColor(e.target.value),
                    className: "w-8 h-8 rounded cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1584,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1582,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleAddText,
                    className: "flex-1 px-4 py-2 bg-cyan-500/30 rounded hover:bg-cyan-500/50 text-cyan-200 text-sm font-semibold",
                    children: "Add Text"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1592,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setTextInputOpen(false);
                      setTextInputValue("");
                      setObjects((objs) => objs.slice(0, -1));
                    },
                    className: "flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold",
                    children: "Cancel"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1598,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1591,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1560,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1559,
              columnNumber: 13
            }, this),
            pdfViewerOpen && selectedMediaObject && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50
            }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #ff6b4d",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column"
            }, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "12px" }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { margin: 0, color: "#ff6b4d", fontSize: "16px" }, children: [
                  "📄 ",
                  selectedMediaObject.fileName
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1625,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setPdfViewerOpen(false), style: {
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px"
                }, children: "×" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1628,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1624,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("iframe", { src: selectedMediaObject.fileUrl, style: {
                width: "600px",
                height: "400px",
                border: "none",
                borderRadius: "6px"
              } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1632,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1619,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1615,
              columnNumber: 13
            }, this),
            videoPlayerOpen && selectedMediaObject && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50
            }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #4d7aff",
              maxWidth: "90vw"
            }, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "12px" }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { margin: 0, color: "#4d7aff", fontSize: "16px" }, children: [
                  "▶️ ",
                  selectedMediaObject.fileName
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1650,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setVideoPlayerOpen(false), style: {
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px"
                }, children: "×" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1653,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1649,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("video", { src: selectedMediaObject.fileUrl, controls: true, style: {
                maxWidth: "600px",
                width: "100%",
                borderRadius: "6px"
              } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1657,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1645,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1641,
              columnNumber: 13
            }, this),
            audioPlayerOpen && selectedMediaObject && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50
            }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #f39c12",
              minWidth: "300px"
            }, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "16px" }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { margin: 0, color: "#f39c12", fontSize: "16px" }, children: [
                  "🔊 ",
                  selectedMediaObject.fileName
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1675,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setAudioPlayerOpen(false), style: {
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "20px"
                }, children: "×" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1678,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1674,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("audio", { src: selectedMediaObject.fileUrl, controls: true, style: { width: "100%" } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1682,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1670,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1666,
              columnNumber: 13
            }, this),
            snapshotDialogOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-green-400/40 shadow-2xl max-w-md w-80", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-green-300 mb-4", children: "💾 Save Snapshot" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1691,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  value: snapshotName,
                  onChange: (e) => setSnapshotName(e.target.value),
                  placeholder: "Enter snapshot name...",
                  className: "w-full bg-green-400/10 border border-green-400/20 rounded px-3 py-2 text-green-100 placeholder-green-400/40 mb-4 text-sm",
                  autoFocus: true,
                  onKeyPress: (e) => e.key === "Enter" && handleSaveSnapshot()
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1692,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleSaveSnapshot,
                    disabled: !snapshotName.trim(),
                    className: `flex-1 px-4 py-2 rounded text-sm font-semibold transition-colors ${snapshotName.trim() ? "bg-green-500/30 hover:bg-green-500/50 text-green-200" : "bg-green-500/10 text-green-400/50 cursor-not-allowed"}`,
                    children: "Save"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1702,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setSnapshotDialogOpen(false);
                      setSnapshotName("");
                    },
                    className: "flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold",
                    children: "Cancel"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1713,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1701,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1690,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1689,
              columnNumber: 13
            }, this),
            aiSummaryOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50 p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-purple-400/40 shadow-2xl max-w-lg w-full max-h-96 overflow-auto", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-purple-300 mb-4", children: "✓ Action Items" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1731,
                columnNumber: 17
              }, this),
              actionItems.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center py-8 text-cyan-400/50 text-sm", children: "No action items found. Add sticky notes with @mentions or TODO: labels" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1733,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: actionItems.map((item, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `p-3 rounded border-l-4 ${item.type === "todo" ? "border-yellow-500 bg-yellow-500/10" : item.type === "done" ? "border-green-500 bg-green-500/10" : "border-purple-500 bg-purple-500/10"}`, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#fff", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }, children: [
                  item.type.toUpperCase(),
                  " - ",
                  item.assignee
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1744,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px" }, children: item.text }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1747,
                  columnNumber: 25
                }, this)
              ] }, idx, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1739,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1737,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setAiSummaryOpen(false),
                  className: "mt-4 w-full px-4 py-2 bg-purple-500/30 rounded hover:bg-purple-500/50 text-purple-200 text-sm font-semibold",
                  children: "Close"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1752,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1730,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1729,
              columnNumber: 13
            }, this),
            promptDialogOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50 p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-purple-400/40 shadow-2xl max-w-md w-full", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-purple-300 mb-4", children: "✨ Generate Diagram" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1766,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { color: "#ccc", fontSize: "12px", marginBottom: "12px" }, children: 'Examples: "flowchart", "org chart", "kanban board"' }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1767,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "textarea",
                {
                  value: diagramPrompt,
                  onChange: (e) => setDiagramPrompt(e.target.value),
                  placeholder: "Describe the diagram you want...",
                  className: "w-full h-20 bg-purple-400/10 border border-purple-400/20 rounded px-3 py-2 text-purple-100 placeholder-purple-400/40 mb-4 text-sm",
                  autoFocus: true
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1770,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: generateDiagramFromPrompt,
                    disabled: !diagramPrompt.trim(),
                    className: `flex-1 px-4 py-2 rounded text-sm font-semibold transition-colors ${diagramPrompt.trim() ? "bg-purple-500/30 hover:bg-purple-500/50 text-purple-200" : "bg-purple-500/10 text-purple-400/50 cursor-not-allowed"}`,
                    children: "Generate"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1778,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setPromptDialogOpen(false);
                      setDiagramPrompt("");
                    },
                    className: "flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold",
                    children: "Cancel"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1789,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1777,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1765,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1764,
              columnNumber: 13
            }, this),
            templateDialogOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50 p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-purple-400/40 shadow-2xl max-w-2xl w-full max-h-96 overflow-auto", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-purple-300 mb-4", children: "📋 Load Template" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1807,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
                { id: "mise-en-place", name: "✓ Mise en Place", icon: "📝" },
                { id: "production-timeline", name: "⏱️ Production Timeline", icon: "📊" },
                { id: "floor-plan", name: "🏪 Floor Plan", icon: "🛋️" },
                { id: "allergen-matrix", name: "⚠️ Allergen Matrix", icon: "🚨" },
                { id: "cost-sheet", name: "💰 Cost Sheet", icon: "📈" },
                { id: "recipe-card", name: "👨‍🍳 Recipe Card", icon: "🍳" }
              ].map((template) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => applyTemplate(template.id),
                  className: `p-4 rounded-lg border-2 transition-all text-left ${selectedTemplate === template.id ? "border-purple-400 bg-purple-500/20" : "border-purple-400/30 bg-purple-400/10 hover:border-purple-400/60"}`,
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "24px", marginBottom: "8px" }, children: template.icon }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1826,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-purple-200", children: template.name }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1827,
                      columnNumber: 23
                    }, this)
                  ]
                },
                template.id,
                true,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1817,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1808,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    setTemplateDialogOpen(false);
                    setSelectedTemplate(null);
                  },
                  className: "flex-1 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 text-red-300 text-sm font-semibold",
                  children: "Close"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1832,
                  columnNumber: 19
                },
                this
              ) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1831,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1806,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1805,
              columnNumber: 13
            }, this),
            helpOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50 p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-800 rounded-lg p-6 border border-cyan-400/40 shadow-2xl max-w-md max-h-96 overflow-auto", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-cyan-300 mb-4", children: "���️ Keyboard Shortcuts" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1850,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontWeight: "600", marginBottom: "4px" }, children: "Drawing" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1853,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px" }, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Pen, Highlighter, Eraser tools in toolbar" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1855,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Shift+Click: Snap to grid" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1856,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Right-click: Pan canvas" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1857,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1854,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1852,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontWeight: "600", marginBottom: "4px" }, children: "Editing" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1861,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px" }, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Ctrl+Z: Undo" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1863,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Ctrl+Y: Redo" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1864,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Ctrl+S: Save Snapshot" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1865,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Ctrl+E: Export PNG" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1866,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Delete: Remove selected" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1867,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1862,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1860,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontWeight: "600", marginBottom: "4px" }, children: "Tools" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1871,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px" }, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Drag media files onto canvas" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1873,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Click PDF/Video/Audio to open" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1874,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Voice button: Record notes" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1875,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1872,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1870,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#00d9ff", fontWeight: "600", marginBottom: "4px" }, children: "View" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1879,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#ccc", fontSize: "11px" }, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Scroll: Pan" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1881,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Wheel: Zoom in/out" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1882,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "• Esc: Close dialogs" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1883,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1880,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1878,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1851,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setHelpOpen(false),
                  className: "mt-4 w-full px-4 py-2 bg-cyan-500/30 rounded hover:bg-cyan-500/50 text-cyan-200 text-sm font-semibold",
                  children: "Close"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1887,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1849,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1848,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute bottom-4 right-4 flex gap-2 bg-black/40 rounded-lg p-2 border border-cyan-400/20", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setZoom((z) => Math.min(5, z + 0.1)),
                  className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                  title: "Zoom in",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ZoomIn, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1904,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1899,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setZoom((z) => Math.max(0.1, z - 0.1)),
                  className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                  title: "Zoom out",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ZoomOut, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1911,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1906,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  },
                  className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                  title: "Reset view",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1918,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1913,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1898,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
            lineNumber: 1273,
            columnNumber: 9
          }, this),
          showMembers && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-80 border-l border-cyan-400/30 flex flex-col bg-black/20", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex border-b border-cyan-400/20", children: [
              { id: "members", icon: Users, label: "Members" },
              { id: "chat", icon: Send, label: "Chat" },
              { id: "history", icon: Clock, label: "History" }
            ].map((tab) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setActiveTab(tab.id),
                className: `flex-1 px-3 py-2 flex items-center justify-center gap-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === tab.id ? "border-cyan-400 text-cyan-200 bg-cyan-400/10" : "border-transparent text-cyan-400/60 hover:text-cyan-300"}`,
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(tab.icon, { size: 14 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1942,
                    columnNumber: 19
                  }, this),
                  label
                ]
              },
              tab.id,
              true,
              {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1933,
                columnNumber: 17
              },
              this
            )) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1927,
              columnNumber: 13
            }, this),
            activeTab === "members" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto p-3 space-y-2", children: participants.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "p-2 rounded border border-cyan-400/20 bg-cyan-400/5 text-xs",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-cyan-200 flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `w-2 h-2 rounded-full ${p.isSpeaking ? "bg-red-500 animate-pulse" : "bg-cyan-500"}` }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1957,
                      columnNumber: 23
                    }, this),
                    p.name
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1956,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-400/60 text-[10px] mb-2", children: [
                    "Role: ",
                    p.role
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1960,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex-1 px-1 py-1 bg-cyan-500/20 rounded text-[9px] hover:bg-cyan-500/30", children: p.isMuted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MicOff, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1963,
                      columnNumber: 38
                    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mic, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1963,
                      columnNumber: 61
                    }, this) }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1962,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex-1 px-1 py-1 bg-cyan-500/20 rounded text-[9px] hover:bg-cyan-500/30", children: p.isCameraOff ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoOff, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1966,
                      columnNumber: 42
                    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1966,
                      columnNumber: 67
                    }, this) }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1965,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1961,
                    columnNumber: 21
                  }, this)
                ]
              },
              p.id,
              true,
              {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1952,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1950,
              columnNumber: 15
            }, this),
            activeTab === "chat" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto p-3 space-y-2 text-xs", children: chatMessages.map((msg) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-100/70", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-cyan-300", children: [
                  msg.author,
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 1980,
                  columnNumber: 23
                }, this),
                " ",
                msg.text
              ] }, msg.id, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1979,
                columnNumber: 21
              }, this)) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1977,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-cyan-400/20 p-2 flex gap-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: chatInput,
                    onChange: (e) => setChatInput(e.target.value),
                    onKeyPress: (e) => e.key === "Enter" && sendMessage(),
                    placeholder: "Type message...",
                    className: "flex-1 bg-cyan-400/10 border border-cyan-400/20 rounded px-2 py-1 text-xs text-cyan-100 placeholder-cyan-400/40"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1985,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: sendMessage,
                    className: "px-2 py-1 bg-cyan-500/20 rounded hover:bg-cyan-500/30 text-cyan-300",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Send, { size: 12 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 1997,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 1993,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 1984,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 1976,
              columnNumber: 15
            }, this),
            activeTab === "history" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto p-3 space-y-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xs font-bold text-cyan-300 mb-2", children: [
                  "Timeline (",
                  history.length,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2008,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: history.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center py-4 text-cyan-400/50 text-xs", children: "No history yet" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2011,
                  columnNumber: 23
                }, this) : history.map((item, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setObjects(JSON.parse(JSON.stringify(item.objects)));
                      setHistoryIndex(idx);
                    },
                    className: `w-full text-left px-2 py-1 rounded text-xs transition-colors ${historyIndex === idx ? "bg-cyan-500/40 text-cyan-100" : "bg-cyan-400/10 text-cyan-100/70 hover:bg-cyan-400/20"}`,
                    children: new Date(item.timestamp).toLocaleTimeString()
                  },
                  idx,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2014,
                    columnNumber: 25
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2009,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2007,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-cyan-400/20 pt-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xs font-bold text-cyan-300 mb-2", children: [
                  "Snapshots (",
                  snapshots.length,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2035,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: snapshots.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center py-4 text-cyan-400/50 text-xs", children: "No snapshots saved" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2038,
                  columnNumber: 23
                }, this) : snapshots.map((snap) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-cyan-400/10 rounded p-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-100 text-xs font-semibold truncate", children: snap.name }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2042,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-400/60 text-xs", children: new Date(snap.timestamp).toLocaleString() }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2043,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 mt-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: () => handleRestoreSnapshot(snap.id),
                        className: "flex-1 px-1 py-0.5 bg-cyan-500/30 rounded text-xs hover:bg-cyan-500/50 text-cyan-200",
                        children: "Load"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 2045,
                        columnNumber: 29
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: () => handleDeleteSnapshot(snap.id),
                        className: "flex-1 px-1 py-0.5 bg-red-500/20 rounded text-xs hover:bg-red-500/30 text-red-300",
                        children: "Delete"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                        lineNumber: 2051,
                        columnNumber: 29
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2044,
                    columnNumber: 27
                  }, this)
                ] }, snap.id, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2041,
                  columnNumber: 25
                }, this)) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2036,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2034,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
              lineNumber: 2005,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
            lineNumber: 1925,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
          lineNumber: 1271,
          columnNumber: 7
        }, this),
        showToolbar && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "flex-shrink-0 border-t border-cyan-400/30 px-4 py-3 flex flex-wrap gap-3 bg-black/40",
            style: { opacity: toolbarOpacity },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                { id: "pen", icon: Pencil, label: "Pen" },
                { id: "highlighter", icon: Highlighter, label: "Highlighter" },
                { id: "eraser", icon: Trash2, label: "Eraser" },
                { id: "pointer", icon: Zap, label: "Pointer (Pan)" }
              ].map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setTool(t.id),
                  className: `p-2 rounded transition-colors ${tool === t.id ? "bg-cyan-400/30 text-cyan-200" : "text-cyan-400/60 hover:text-cyan-300"}`,
                  title: t.label,
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(t.icon, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2093,
                    columnNumber: 17
                  }, this)
                },
                t.id,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2083,
                  columnNumber: 15
                },
                this
              )) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2076,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                { id: "line", icon: Line, label: "Line" },
                { id: "rect", icon: Square, label: "Rectangle" },
                { id: "circle", icon: Circle, label: "Circle" },
                { id: "text", icon: Type, label: "Text" }
              ].map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => setTool(t.id),
                  className: `p-2 rounded transition-colors ${tool === t.id ? "bg-cyan-400/30 text-cyan-200" : "text-cyan-400/60 hover:text-cyan-300"}`,
                  title: t.label,
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(t.icon, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2116,
                    columnNumber: 17
                  }, this)
                },
                t.id,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2106,
                  columnNumber: 15
                },
                this
              )) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2099,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleUndo,
                    disabled: historyIndex <= 0,
                    className: `p-2 rounded transition-colors ${historyIndex <= 0 ? "text-cyan-400/30 cursor-not-allowed" : "text-cyan-400/60 hover:text-cyan-300"}`,
                    title: "Undo (Ctrl+Z)",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Undo, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2133,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2123,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleRedo,
                    disabled: historyIndex >= history.length - 1,
                    className: `p-2 rounded transition-colors ${historyIndex >= history.length - 1 ? "text-cyan-400/30 cursor-not-allowed" : "text-cyan-400/60 hover:text-cyan-300"}`,
                    title: "Redo (Ctrl+Y)",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Redo, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2145,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2135,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2122,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setTemplateDialogOpen(true),
                    className: "px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors",
                    title: "Load template",
                    children: "📋"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2151,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setExpoRailOpen(!expoRailOpen),
                    className: `px-3 py-1 rounded text-xs font-semibold transition-colors ${expoRailOpen ? "bg-red-500/30 text-red-300" : "bg-red-500/10 hover:bg-red-500/20 text-red-400"}`,
                    title: expoRailOpen ? "Hide Expo Rail" : "Show Expo Rail",
                    children: "🔥"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2158,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2150,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleExportPNG,
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors",
                    title: "Export as PNG",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Image, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2178,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2173,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: handleExportJSON,
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors",
                    title: "Export as JSON",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Download, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2185,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2180,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setSnapshotDialogOpen(true),
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors",
                    title: "Save snapshot",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2192,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2187,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2172,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: addStickyNote,
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                    title: "Add sticky note",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StickyNote, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2203,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2198,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: addInjectedPanel,
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                    title: "Inject LUCCCA panel",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2210,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2205,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2197,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-xs text-cyan-400", children: "Color:" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2216,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: color,
                    onChange: (e) => setColor(e.target.value),
                    className: "w-8 h-8 rounded cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2217,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2215,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-xs text-cyan-400", children: "Size:" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                  lineNumber: 2226,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "range",
                    min: "1",
                    max: "20",
                    value: brushSize,
                    onChange: (e) => setBrushSize(parseInt(e.target.value)),
                    className: "w-24"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2227,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2225,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-green-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setVideoOpen(!videoOpen),
                    className: `p-2 rounded transition-colors ${videoOpen ? "bg-green-500/30 text-green-200" : "text-green-400/60 hover:text-green-300"}`,
                    title: videoOpen ? "Close video" : "Open video conference",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2248,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2239,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setFollowPresenterMode(!followPresenterMode),
                    className: `p-2 rounded transition-colors ${followPresenterMode ? "bg-green-500/30 text-green-200" : "text-green-400/60 hover:text-green-300"}`,
                    title: followPresenterMode ? "Stop following" : "Follow presenter",
                    children: "👁️"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2250,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2238,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-purple-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      extractActionItems();
                      setAiSummaryOpen(true);
                    },
                    className: "p-2 rounded hover:bg-purple-400/10 text-purple-400 transition-colors",
                    title: "Extract action items",
                    children: "✓"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2265,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: startVoiceRecording,
                    className: `p-2 rounded transition-colors ${isRecording ? "bg-red-500/30 text-red-300" : "hover:bg-purple-400/10 text-purple-400"}`,
                    title: isRecording ? "Recording..." : "Voice to sticky note",
                    children: "🎤"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2275,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setPromptDialogOpen(true),
                    className: "p-2 rounded hover:bg-purple-400/10 text-purple-400 transition-colors",
                    title: "Generate diagram from prompt",
                    children: "✨"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2286,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2264,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setSnapToGrid(!snapToGrid2),
                    className: `p-2 rounded transition-colors ${snapToGrid2 ? "bg-cyan-400/30 text-cyan-200" : "text-cyan-400/60 hover:text-cyan-300"}`,
                    title: snapToGrid2 ? "Snap-to-grid ON" : "Snap-to-grid OFF",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Ruler, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2306,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2297,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setShowGuides(!showGuides),
                    className: `p-2 rounded transition-colors ${showGuides ? "bg-cyan-400/30 text-cyan-200" : "text-cyan-400/60 hover:text-cyan-300"}`,
                    title: showGuides ? "Alignment guides ON" : "Alignment guides OFF",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TriangleAlert, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2317,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2308,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setHelpOpen(!helpOpen),
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400 transition-colors",
                    title: "Keyboard shortcuts",
                    children: "?"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2319,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2296,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20 ml-auto", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: toggleRecording,
                    className: `p-2 rounded transition-colors ${isRecording ? "bg-red-500/30 text-red-300" : "text-cyan-400/60 hover:text-cyan-300"}`,
                    title: isRecording ? "Recording" : "Start recording",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2339,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2330,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setIsLocked(!isLocked),
                    className: "p-2 rounded hover:bg-cyan-400/10 text-cyan-400",
                    title: isLocked ? "Unlock board" : "Lock board",
                    children: isLocked ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lock, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2346,
                      columnNumber: 27
                    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LockOpen, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2346,
                      columnNumber: 48
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2341,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: clearBoard,
                    className: "p-2 rounded hover:bg-red-500/10 text-red-400",
                    title: "Clear board",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 16 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                      lineNumber: 2353,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                    lineNumber: 2348,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
                lineNumber: 2329,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
            lineNumber: 2071,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedEchoWhiteboard.jsx",
      lineNumber: 1234,
      columnNumber: 5
    },
    this
  );
}
function isNearPoint(obj, x, y, threshold = 10) {
  if (obj.type === "sticky") {
    return x > obj.x - threshold && x < obj.x + 150 + threshold && y > obj.y - threshold && y < obj.y + 150 + threshold;
  }
  return false;
}
function detectGuideLines(point, objects, threshold = 10) {
  const guides = [];
  const verticalLines = /* @__PURE__ */ new Set();
  const horizontalLines = /* @__PURE__ */ new Set();
  verticalLines.add(Math.round(point.x / GRID_SIZE) * GRID_SIZE);
  horizontalLines.add(Math.round(point.y / GRID_SIZE) * GRID_SIZE);
  objects.forEach((obj) => {
    if (obj.type === "sticky") {
      verticalLines.add(obj.x);
      verticalLines.add(obj.x + 150);
      verticalLines.add(obj.x + 75);
      horizontalLines.add(obj.y);
      horizontalLines.add(obj.y + 150);
      horizontalLines.add(obj.y + 75);
    } else if (obj.type === "rect" || obj.type === "line") {
      verticalLines.add(obj.start?.x || obj.x);
      verticalLines.add(obj.end?.x || obj.x + obj.width);
      horizontalLines.add(obj.start?.y || obj.y);
      horizontalLines.add(obj.end?.y || obj.y + obj.height);
    }
  });
  verticalLines.forEach((x) => {
    if (Math.abs(point.x - x) < threshold) {
      guides.push({ type: "vertical", pos: x });
    }
  });
  horizontalLines.forEach((y) => {
    if (Math.abs(point.y - y) < threshold) {
      guides.push({ type: "horizontal", pos: y });
    }
  });
  return guides;
}
export {
  AdvancedEchoWhiteboard as default
};
