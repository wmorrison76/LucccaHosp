import { j as jsxDevRuntimeExports, R as React, r as reactExports } from "./index-DfBvRGLH.js";
import "./Board-6RvNRUqx.js";
import "./settings-CL5KYzJi.js";
const LS_WHITEBOARD = "luccca:whiteboard:state";
function AdvancedWhiteboardCore() {
  const canvasRef = React.useRef(null);
  const contextRef = React.useRef(null);
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
  const [textInput, setTextInput] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [draggingImage, setDraggingImage] = React.useState(null);
  const [mediaEmbeds, setMediaEmbeds] = React.useState([]);
  const [mediaInput, setMediaInput] = React.useState("");
  const [showMediaInput, setShowMediaInput] = React.useState(false);
  const [objects, setObjects] = React.useState([]);
  const [objectId, setObjectId] = React.useState(0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showMembers, setShowMembers] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("canvas");
  const [floatingPanels, setFloatingPanels] = React.useState([]);
  const [zIndex, setZIndex] = React.useState(10);
  const [isLocked, setIsLocked] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [laserMode, setLaserMode] = React.useState(false);
  const [laserPos, setLaserPos] = React.useState(null);
  const [snapshots, setSnapshots] = React.useState([]);
  const [snapshotName, setSnapshotName] = React.useState("");
  const [showSnapshotInput, setShowSnapshotInput] = React.useState(false);
  const [touchDistance, setTouchDistance] = React.useState(0);
  const [participantCursors, setParticipantCursors] = React.useState({});
  const [snapToGrid, setSnapToGrid] = React.useState(false);
  const [gridSize, setGridSize] = React.useState(20);
  const [floorPlanMode, setFloorPlanMode] = React.useState(false);
  const [participants, setParticipants] = React.useState([
    { id: "self", name: "You", role: "chef", isSpeaking: false, isMuted: false }
  ]);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [chatInput, setChatInput] = React.useState("");
  const [videoCallActive, setVideoCallActive] = React.useState(false);
  const [screenShare, setScreenShare] = React.useState(false);
  reactExports.useEffect(() => {
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
    try {
      const saved = localStorage.getItem(LS_WHITEBOARD);
      if (saved) {
        const state = JSON.parse(saved);
        setObjects(state.objects || []);
        setZoom(state.zoom || 1);
        setPan(state.pan || { x: 0, y: 0 });
      }
    } catch (e) {
      console.warn("Could not load whiteboard state:", e);
    }
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_WHITEBOARD, JSON.stringify({
      objects,
      zoom,
      pan,
      participants,
      chatMessages,
      images: images.map((img) => ({ ...img, src: img.src.substring(0, 100) + "..." }))
      // Don't save full base64
    }));
  }, [objects, zoom, pan, participants, chatMessages, images]);
  reactExports.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault();
          undo();
        } else if (e.key === "s") {
          e.preventDefault();
          downloadCanvas();
        }
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (tool === "eraser" && isDrawing) {
          clearCanvas();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [tool, isDrawing]);
  reactExports.useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    images.forEach((img) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        ctx.drawImage(imgElement, img.x, img.y, img.width, img.height);
        ctx.strokeStyle = "rgba(0, 217, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x, img.y, img.width, img.height);
      };
      imgElement.src = img.src;
    });
  }, [images]);
  const startDrawing = (e) => {
    if (isLocked) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tool === "text") {
      setTextInputPos({ x, y });
      setTextInput("");
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
  const snapCoordinate = (coord) => {
    if (!snapToGrid) return coord;
    return Math.round(coord / gridSize) * gridSize;
  };
  const draw = (e) => {
    if (!isDrawing || isLocked) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = snapCoordinate(x);
    y = snapCoordinate(y);
    if (tool === "eraser") {
      ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      return;
    }
    if (tool === "pencil" || tool === "highlighter") {
      if (tool === "highlighter") {
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
    if (["line", "rect", "circle"].includes(tool) && startPoint) {
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
    if (window.confirm("Clear entire whiteboard? This cannot be undone.")) {
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
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
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
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(boardData, null, 2));
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
            setTool(data.tool || "pencil");
            setColor(data.color || "#ffffff");
            setBrushSize(data.brushSize || 3);
          } catch (err) {
            alert("Failed to import whiteboard: " + err.message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  const createSnapshot = () => {
    if (!snapshotName.trim()) {
      alert("Please enter a snapshot name");
      return;
    }
    const snapshot = {
      id: Math.random().toString(36).slice(2),
      name: snapshotName,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      canvas: canvasRef.current.toDataURL("image/png"),
      state: {
        objects,
        zoom,
        pan,
        chatMessages,
        participants,
        images,
        mediaEmbeds,
        floatingPanels
      }
    };
    setSnapshots([...snapshots, snapshot]);
    setSnapshotName("");
    setShowSnapshotInput(false);
  };
  const restoreSnapshot = (snapshotId) => {
    const snapshot = snapshots.find((s) => s.id === snapshotId);
    if (!snapshot) return;
    setObjects(snapshot.state.objects || []);
    setZoom(snapshot.state.zoom || 1);
    setPan(snapshot.state.pan || { x: 0, y: 0 });
    setParticipants(snapshot.state.participants || []);
    setChatMessages(snapshot.state.chatMessages || []);
    setImages(snapshot.state.images || []);
    setMediaEmbeds(snapshot.state.mediaEmbeds || []);
    setFloatingPanels(snapshot.state.floatingPanels || []);
  };
  const deleteSnapshot = (snapshotId) => {
    setSnapshots(snapshots.filter((s) => s.id !== snapshotId));
  };
  const addKitchenTicket = () => {
    const tableNum = prompt("Enter table number:");
    if (tableNum) {
      const newSticky = {
        id: objectId,
        type: "sticky",
        x: 100 + Math.random() * 400,
        y: 100 + Math.random() * 300,
        text: `🍽️ Table ${tableNum}
Ready time:
Fire time:`,
        bgColor: "#ffb3ba"
      };
      setObjects((objs) => [...objs, newSticky]);
      setObjectId((id) => id + 1);
    }
  };
  const addWasteTracking = () => {
    const wasteItem = prompt("Waste item name:");
    if (wasteItem) {
      const cost = prompt("Estimated cost ($):");
      const newSticky = {
        id: objectId,
        type: "sticky",
        x: 100 + Math.random() * 400,
        y: 100 + Math.random() * 300,
        text: `🗑️ ${wasteItem}
Cost: $${cost || "0"}
Time: ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`,
        bgColor: "#ffccba"
      };
      setObjects((objs) => [...objs, newSticky]);
      setObjectId((id) => id + 1);
    }
  };
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setTouchDistance(distance);
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchDistance > 0) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      const pinchDelta = (newDistance - touchDistance) / 100;
      const newZoom = Math.max(0.1, Math.min(5, zoom + pinchDelta * 0.5));
      setZoom(newZoom);
      setTouchDistance(newDistance);
    }
  };
  const handleTouchEnd = () => {
    setTouchDistance(0);
  };
  const broadcastCursorPosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticipantCursors({
      ...participantCursors,
      "self": { x, y, name: "You", color: "#00d9ff" }
    });
  };
  const addFloorPlanTable = (numSeats) => {
    const tableNum = prompt(`Add table (T1, T2, etc):`) || `T${Math.floor(Math.random() * 100)}`;
    const newSticky = {
      id: objectId,
      type: "sticky",
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 300,
      text: `${tableNum}
Seats: ${numSeats}
Status: Open`,
      bgColor: "#bae1ff"
    };
    setObjects((objs) => [...objs, newSticky]);
    setObjectId((id) => id + 1);
  };
  const toggleVideoCall = () => {
    setVideoCallActive(!videoCallActive);
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      author: "System",
      text: videoCallActive ? "📴 Video call ended" : "📹 Video call started",
      timestamp: /* @__PURE__ */ new Date()
    }]);
  };
  const toggleScreenShare = () => {
    setScreenShare(!screenShare);
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      author: "System",
      text: screenShare ? "🖥️ Screen sharing stopped" : "🖥️ Screen sharing started",
      timestamp: /* @__PURE__ */ new Date()
    }]);
  };
  const addMeasurement = () => {
    const startX = 50;
    const startY = 50;
    const endX = 250;
    const endY = 50;
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const newSticky = {
      id: objectId,
      type: "sticky",
      x: startX,
      y: startY - 30,
      text: `📏 Ruler
Length: ${Math.round(distance)}px
Start: (${startX}, ${startY})
End: (${endX}, ${endY})`,
      bgColor: "#daffc9"
    };
    setObjects((objs) => [...objs, newSticky]);
    setObjectId((id) => id + 1);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);
  };
  const addStickyNote = () => {
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
  };
  const addInjectedPanel = () => {
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
    };
    setFloatingPanels((panels) => [...panels, newPanel]);
    setZIndex((z) => z + 1);
    setObjectId((id) => id + 1);
  };
  const loadTemplate = (templateName) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#00d9ff";
    ctx.fillText(templateName, 20, 40);
    if (templateName === "BOH Mise en Place") {
      const items = [
        "Station 1: Prep Vegetables",
        "Station 2: Proteins",
        "Station 3: Sauces",
        "Station 4: Garnish"
      ];
      items.forEach((item, idx) => {
        ctx.font = "14px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("□ " + item, 40, 80 + idx * 30);
      });
    } else if (templateName === "FOH Floor Plan") {
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
    } else if (templateName === "Corporate Cost Sheet") {
      const headers = ["Property", "Labor Cost", "Food Cost", "Total"];
      const y = 80;
      let x = 40;
      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "#00d9ff";
      headers.forEach((h) => {
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
      author: "You",
      text: chatInput,
      timestamp: /* @__PURE__ */ new Date()
    };
    setChatMessages((msgs) => [...msgs, newMsg]);
    setChatInput("");
  };
  const commitTextBox = () => {
    if (!textInputPos || !textInput.trim()) {
      setTextInputPos(null);
      setTextInput("");
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
    setTextInput("");
  };
  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let file of files) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            setImages([...images, {
              src: event.target.result,
              x: x - 75,
              y: y - 75,
              width: 150,
              height: 150,
              id: Math.random().toString(36).slice(2)
            }]);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = (event) => {
          setMediaEmbeds([...mediaEmbeds, {
            id: Math.random().toString(36).slice(2),
            type: "pdf",
            url: event.target.result,
            fileName: file.name,
            x: x - 150,
            y: y - 100,
            width: 300,
            height: 400
          }]);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const addMediaEmbed = (type) => {
    if (type === "video") {
      const url = prompt("Enter YouTube or MP4 URL:");
      if (url) {
        setMediaEmbeds([...mediaEmbeds, {
          id: Math.random().toString(36).slice(2),
          type: "video",
          url,
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 200,
          width: 300,
          height: 200
        }]);
      }
    } else if (type === "audio") {
      const url = prompt("Enter audio URL (MP3, WAV):");
      if (url) {
        setMediaEmbeds([...mediaEmbeds, {
          id: Math.random().toString(36).slice(2),
          type: "audio",
          url,
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 200,
          width: 300,
          height: 60
        }]);
      }
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#0f1c2e",
    color: "#e2e8f0",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "8px 16px",
      backgroundColor: "rgba(10, 20, 35, 0.9)",
      borderBottom: "1px solid rgba(0, 217, 255, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "14px"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { fontWeight: "bold", color: "#00d9ff" }, children: "WHITEBOARD" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 763,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { fontSize: "12px", opacity: 0.6 }, children: [
          "Zoom: ",
          (zoom * 100).toFixed(0),
          "% | Objects: ",
          objects.length
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 764,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 762,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowAdvanced(!showAdvanced),
            title: "Advanced tools",
            style: {
              padding: "4px 8px",
              backgroundColor: showAdvanced ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 217, 255, 0.05)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "⚙️"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 767,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowMembers(!showMembers),
            title: "Members & chat",
            style: {
              padding: "4px 8px",
              backgroundColor: showMembers ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 217, 255, 0.05)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "👥"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 782,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: toggleVideoCall,
            title: videoCallActive ? "End video call" : "Start video call",
            style: {
              padding: "4px 8px",
              backgroundColor: videoCallActive ? "rgba(255, 100, 100, 0.2)" : "rgba(0, 217, 255, 0.05)",
              border: videoCallActive ? "1px solid rgba(255, 100, 100, 0.3)" : "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: videoCallActive ? "#ff6464" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: videoCallActive ? "📹" : "📷"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 797,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: toggleScreenShare,
            title: screenShare ? "Stop screen sharing" : "Start screen sharing",
            style: {
              padding: "4px 8px",
              backgroundColor: screenShare ? "rgba(100, 200, 100, 0.2)" : "rgba(0, 217, 255, 0.05)",
              border: screenShare ? "1px solid rgba(100, 200, 100, 0.3)" : "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: screenShare ? "#64c864" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: screenShare ? "🖥️" : "⚡"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 812,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 766,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
      lineNumber: 753,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flex: 1, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "canvas",
          {
            ref: canvasRef,
            onMouseDown: startDrawing,
            onMouseMove: (e) => {
              draw(e);
              broadcastCursorPosition(e);
              if (laserMode) {
                const rect = canvasRef.current.getBoundingClientRect();
                setLaserPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            },
            onMouseUp: stopDrawing,
            onMouseLeave: (e) => {
              stopDrawing();
              laserMode && setLaserPos(null);
              setParticipantCursors({});
            },
            onWheel: (e) => {
              e.preventDefault();
              setZoom((z) => Math.max(0.1, Math.min(5, z + (e.deltaY > 0 ? -0.1 : 0.1))));
            },
            onDragOver: (e) => {
              e.preventDefault();
              e.stopPropagation();
            },
            onDrop: handleImageDrop,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            style: {
              flex: 1,
              cursor: laserMode ? "pointer" : tool === "pencil" ? "crosshair" : tool === "eraser" ? "grab" : tool === "text" ? "text" : "default",
              display: "block",
              backgroundColor: "#1a202c",
              touchAction: "none"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 834,
            columnNumber: 11
          },
          this
        ),
        laserMode && laserPos && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              left: laserPos.x - 6,
              top: laserPos.y - 6,
              width: "12px",
              height: "12px",
              backgroundColor: "#ff0000",
              borderRadius: "50%",
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)",
              pointerEvents: "none",
              zIndex: 999
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 874,
            columnNumber: 13
          },
          this
        ),
        Object.entries(participantCursors).map(([key, cursor]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              position: "absolute",
              left: cursor.x,
              top: cursor.y - 20,
              pointerEvents: "none",
              zIndex: 100
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    width: "12px",
                    height: "12px",
                    backgroundColor: cursor.color,
                    borderRadius: "50%",
                    boxShadow: `0 0 8px ${cursor.color}`,
                    marginBottom: "4px"
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 902,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  style: {
                    fontSize: "9px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: cursor.color,
                    padding: "2px 4px",
                    borderRadius: "2px",
                    whiteSpace: "nowrap",
                    fontWeight: "bold"
                  },
                  children: cursor.name
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 912,
                  columnNumber: 15
                },
                this
              )
            ]
          },
          key,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 892,
            columnNumber: 13
          },
          this
        )),
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
                borderRadius: "6px",
                background: "linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
                backdropFilter: "blur(10px)",
                padding: "10px",
                color: "#00d9ff",
                fontSize: "11px"
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", marginBottom: "4px" }, children: panel.title }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 950,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { opacity: 0.6, fontSize: "10px" }, children: [
                  "Type: ",
                  panel.panelType
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 951,
                  columnNumber: 17
                }, this)
              ]
            },
            panel.id,
            true,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 931,
              columnNumber: 15
            },
            this
          )),
          mediaEmbeds.map((media) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              style: {
                position: "absolute",
                left: media.x,
                top: media.y,
                width: media.width,
                height: media.height,
                zIndex: 50,
                pointerEvents: "auto",
                border: "1px solid rgba(100, 200, 255, 0.4)",
                borderRadius: "6px",
                background: "rgba(10, 20, 35, 0.9)",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              },
              children: media.type === "pdf" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "9px", color: "#00d9ff", marginBottom: "4px", fontWeight: "bold" }, children: [
                  "📄 ",
                  media.fileName
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 978,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "iframe",
                  {
                    src: media.url + "#toolbar=0",
                    width: "100%",
                    height: media.height - 40,
                    frameBorder: "0",
                    style: { borderRadius: "4px" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                    lineNumber: 981,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 977,
                columnNumber: 19
              }, this) : media.type === "video" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "iframe",
                  {
                    src: media.url.includes("youtube.com") || media.url.includes("youtu.be") ? `https://www.youtube.com/embed/${media.url.split("v=")[1] || media.url.split("/").pop()}` : media.url,
                    width: "100%",
                    height: media.height - 30,
                    frameBorder: "0",
                    allowFullScreen: true,
                    style: { borderRadius: "4px" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                    lineNumber: 991,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "9px", color: "#00d9ff", marginTop: "4px", opacity: 0.6 }, children: "🎥 Video" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1001,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 990,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "audio",
                  {
                    controls: true,
                    style: { width: "100%", marginTop: "8px" },
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("source", { src: media.url }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                      lineNumber: 1011,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                    lineNumber: 1007,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "9px", color: "#00d9ff", marginTop: "4px", opacity: 0.6 }, children: "🎵 Audio" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1013,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1006,
                columnNumber: 19
              }, this)
            },
            media.id,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 957,
              columnNumber: 15
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 929,
          columnNumber: 11
        }, this),
        textInputPos && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          position: "absolute",
          left: textInputPos.x + "px",
          top: textInputPos.y - 40 + "px",
          zIndex: 1e3,
          backgroundColor: "rgba(15, 28, 46, 0.95)",
          border: "2px solid rgba(0, 217, 255, 0.5)",
          borderRadius: "4px",
          padding: "8px",
          display: "flex",
          gap: "4px"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              autoFocus: true,
              type: "text",
              value: textInput,
              onChange: (e) => setTextInput(e.target.value),
              onKeyPress: (e) => e.key === "Enter" && commitTextBox(),
              placeholder: "Enter text...",
              style: {
                padding: "4px 6px",
                backgroundColor: "rgba(0, 217, 255, 0.1)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "3px",
                color,
                fontSize: "13px",
                minWidth: "150px",
                outline: "none"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1036,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: commitTextBox,
              style: {
                padding: "4px 8px",
                backgroundColor: "rgba(0, 217, 255, 0.2)",
                border: "1px solid rgba(0, 217, 255, 0.4)",
                borderRadius: "3px",
                color: "#00d9ff",
                cursor: "pointer",
                fontSize: "11px"
              },
              children: "OK"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1054,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1024,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          position: "absolute",
          bottom: "12px",
          right: "12px",
          display: "flex",
          gap: "4px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(0, 217, 255, 0.3)",
          borderRadius: "4px",
          padding: "4px"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setZoom((z) => Math.min(5, z + 0.1)), style: { padding: "4px 6px", color: "#7ff3ff", backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "11px" }, children: "+" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1083,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setZoom((z) => Math.max(0.1, z - 0.1)), style: { padding: "4px 6px", color: "#7ff3ff", backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "11px" }, children: "−" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1084,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }, style: { padding: "4px 6px", color: "#7ff3ff", backgroundColor: "transparent", border: "none", cursor: "pointer", fontSize: "11px" }, children: "Reset" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1085,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1072,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 833,
        columnNumber: 9
      }, this),
      showMembers && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        width: "300px",
        borderLeft: "1px solid rgba(0, 217, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(10, 20, 35, 0.6)",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", borderBottom: "1px solid rgba(0, 217, 255, 0.2)" }, children: [
          { id: "members", label: "👥 Members" },
          { id: "chat", label: "💬 Chat" },
          { id: "history", label: "⏱️ History" },
          { id: "snapshots", label: "📸 Snapshots" }
        ].map((tab) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            style: {
              flex: 1,
              padding: "8px",
              backgroundColor: activeTab === tab.id ? "rgba(0, 217, 255, 0.2)" : "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid rgba(0, 217, 255, 0.6)" : "none",
              color: activeTab === tab.id ? "#00d9ff" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: activeTab === tab.id ? "bold" : "normal"
            },
            children: tab.label
          },
          tab.id,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1107,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1100,
          columnNumber: 13
        }, this),
        activeTab === "members" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, overflow: "auto", padding: "8px" }, children: participants.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              padding: "8px",
              marginBottom: "6px",
              backgroundColor: "rgba(0, 217, 255, 0.05)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: "4px",
              fontSize: "11px"
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", color: "#00d9ff", marginBottom: "4px" }, children: p.name }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1142,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { opacity: 0.6, fontSize: "10px" }, children: [
                "Role: ",
                p.role
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1143,
                columnNumber: 21
              }, this)
            ]
          },
          p.id,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1131,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1129,
          columnNumber: 15
        }, this),
        activeTab === "chat" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, overflow: "auto", padding: "8px", borderBottom: "1px solid rgba(0, 217, 255, 0.2)" }, children: chatMessages.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "11px", opacity: 0.5, textAlign: "center", paddingTop: "20px" }, children: "No messages yet" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1154,
            columnNumber: 21
          }, this) : chatMessages.map((msg) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { marginBottom: "8px", fontSize: "11px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { color: "#00d9ff", fontWeight: "bold" }, children: [
              msg.author,
              ":"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1158,
              columnNumber: 25
            }, this),
            " ",
            msg.text
          ] }, msg.id, true, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1157,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1152,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "8px", display: "flex", gap: "4px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                value: chatInput,
                onChange: (e) => setChatInput(e.target.value),
                onKeyPress: (e) => e.key === "Enter" && sendMessage(),
                placeholder: "Type message...",
                style: {
                  flex: 1,
                  padding: "4px 6px",
                  backgroundColor: "rgba(0, 217, 255, 0.1)",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  borderRadius: "3px",
                  color: "#e2e8f0",
                  fontSize: "11px",
                  outline: "none"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1164,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: sendMessage,
                style: {
                  padding: "4px 8px",
                  backgroundColor: "rgba(0, 217, 255, 0.2)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  borderRadius: "3px",
                  color: "#00d9ff",
                  cursor: "pointer",
                  fontSize: "11px"
                },
                children: "Send"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1181,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1163,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1151,
          columnNumber: 15
        }, this),
        activeTab === "history" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, padding: "8px", fontSize: "11px", opacity: 0.5 }, children: "History timeline coming soon..." }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1201,
          columnNumber: 15
        }, this),
        activeTab === "snapshots" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "8px", display: "flex", gap: "4px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                value: snapshotName,
                onChange: (e) => setSnapshotName(e.target.value),
                placeholder: "Snapshot name...",
                style: {
                  flex: 1,
                  padding: "4px 6px",
                  backgroundColor: "rgba(0, 217, 255, 0.1)",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  borderRadius: "3px",
                  color: "#e2e8f0",
                  fontSize: "11px",
                  outline: "none"
                },
                onKeyPress: (e) => e.key === "Enter" && createSnapshot()
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1210,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: createSnapshot,
                style: {
                  padding: "4px 8px",
                  backgroundColor: "rgba(0, 217, 255, 0.2)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  borderRadius: "3px",
                  color: "#00d9ff",
                  cursor: "pointer",
                  fontSize: "11px"
                },
                children: "Save"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                lineNumber: 1227,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1209,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, overflow: "auto", padding: "8px" }, children: snapshots.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "11px", opacity: 0.5, textAlign: "center", paddingTop: "20px" }, children: "No snapshots yet" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1244,
            columnNumber: 21
          }, this) : snapshots.map((snap) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              style: {
                padding: "8px",
                marginBottom: "6px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                fontSize: "11px"
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", color: "#00d9ff", marginBottom: "2px" }, children: snap.name }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1258,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { opacity: 0.6, fontSize: "10px", marginBottom: "4px" }, children: new Date(snap.timestamp).toLocaleString() }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1259,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "4px" }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: () => restoreSnapshot(snap.id),
                      style: {
                        flex: 1,
                        padding: "4px 6px",
                        backgroundColor: "rgba(0, 217, 255, 0.1)",
                        border: "1px solid rgba(0, 217, 255, 0.2)",
                        borderRadius: "3px",
                        color: "#7ff3ff",
                        cursor: "pointer",
                        fontSize: "10px"
                      },
                      children: "Restore"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                      lineNumber: 1263,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: () => deleteSnapshot(snap.id),
                      style: {
                        padding: "4px 6px",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "3px",
                        color: "#fca5a5",
                        cursor: "pointer",
                        fontSize: "10px"
                      },
                      children: "✕"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                      lineNumber: 1278,
                      columnNumber: 27
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1262,
                  columnNumber: 25
                }, this)
              ]
            },
            snap.id,
            true,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1247,
              columnNumber: 23
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1242,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1208,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 1091,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
      lineNumber: 831,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      backgroundColor: "rgba(10, 20, 35, 0.8)",
      borderTop: "1px solid rgba(0, 217, 255, 0.2)",
      flexWrap: "wrap",
      fontSize: "12px"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "select",
        {
          value: tool,
          onChange: (e) => setTool(e.target.value),
          style: {
            padding: "4px 8px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
            color: "#7ff3ff",
            fontSize: "11px",
            cursor: "pointer"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "pencil", children: "Pencil" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1327,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "highlighter", children: "Highlighter" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1328,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "eraser", children: "Eraser" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1329,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "line", children: "Line" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1330,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "rect", children: "Rectangle" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1331,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "circle", children: "Circle" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1332,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "text", children: "Text" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1333,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1314,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "input",
        {
          type: "color",
          value: color,
          onChange: (e) => setColor(e.target.value),
          style: {
            width: "32px",
            height: "32px",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
            cursor: "pointer"
          },
          title: "Color"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1336,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "input",
        {
          type: "range",
          min: "1",
          max: "50",
          value: brushSize,
          onChange: (e) => setBrushSize(parseInt(e.target.value)),
          style: {
            width: "80px",
            cursor: "pointer"
          },
          title: `Brush size: ${brushSize}px`
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1350,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setSnapToGrid(!snapToGrid),
          title: "Toggle snap-to-grid",
          style: {
            padding: "4px 8px",
            backgroundColor: snapToGrid ? "rgba(100, 200, 100, 0.2)" : "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "3px",
            color: snapToGrid ? "#64c864" : "#7ff3ff",
            cursor: "pointer",
            fontSize: "11px"
          },
          children: snapToGrid ? "✓ Grid" : "⊞ Grid"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1363,
          columnNumber: 9
        },
        this
      ),
      snapToGrid && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff" }, children: [
        "Grid:",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "range",
            min: "5",
            max: "50",
            value: gridSize,
            onChange: (e) => setGridSize(parseInt(e.target.value)),
            style: {
              width: "50px",
              marginLeft: "4px",
              cursor: "pointer",
              verticalAlign: "middle"
            },
            title: `Grid size: ${gridSize}px`
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1383,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { marginLeft: "4px" }, children: [
          gridSize,
          "px"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1397,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 1381,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 1380,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: undo,
          title: "Undo (Ctrl+Z)",
          style: {
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
          },
          children: "↶ Undo"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1402,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: clearCanvas,
          title: "Clear canvas",
          style: {
            padding: "4px 8px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "3px",
            color: "#fca5a5",
            cursor: "pointer",
            fontSize: "11px"
          },
          children: "🗑️ Clear"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1421,
          columnNumber: 9
        },
        this
      ),
      showAdvanced && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addStickyNote,
            title: "Add sticky note",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(255, 200, 0, 0.1)",
              border: "1px solid rgba(255, 200, 0, 0.3)",
              borderRadius: "3px",
              color: "#ffd966",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "📌 Note"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1440,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "label",
          {
            title: "Upload image (or drag-drop onto canvas)",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(100, 150, 255, 0.1)",
              border: "1px solid rgba(100, 150, 255, 0.3)",
              borderRadius: "3px",
              color: "#6496ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: [
              "🖼️ Image",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => {
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
                  },
                  style: { display: "none" }
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1469,
                  columnNumber: 15
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1456,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => addMediaEmbed("video"),
            title: "Embed video (YouTube or MP4 URL)",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(255, 100, 100, 0.1)",
              border: "1px solid rgba(255, 100, 100, 0.3)",
              borderRadius: "3px",
              color: "#ff6464",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "🎥 Video"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1497,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => addMediaEmbed("audio"),
            title: "Embed audio (MP3 or WAV URL)",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(150, 100, 255, 0.1)",
              border: "1px solid rgba(150, 100, 255, 0.3)",
              borderRadius: "3px",
              color: "#9664ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "🎵 Audio"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1513,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "label",
          {
            title: "Upload PDF (drag-drop supported)",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(200, 100, 100, 0.1)",
              border: "1px solid rgba(200, 100, 100, 0.3)",
              borderRadius: "3px",
              color: "#c86464",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: [
              "📄 PDF",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "file",
                  accept: ".pdf",
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setMediaEmbeds([...mediaEmbeds, {
                          id: Math.random().toString(36).slice(2),
                          type: "pdf",
                          url: event.target.result,
                          fileName: file.name,
                          x: 50,
                          y: 50,
                          width: 300,
                          height: 400
                        }]);
                      };
                      reader.readAsDataURL(file);
                    }
                  },
                  style: { display: "none" }
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
                  lineNumber: 1542,
                  columnNumber: 15
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1529,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addInjectedPanel,
            title: "Inject LUCCCA panel",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(0, 217, 255, 0.1)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: "#00d9ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "➕ Panel"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1568,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setIsRecording(!isRecording),
            title: isRecording ? "Recording..." : "Start recording",
            style: {
              padding: "4px 8px",
              backgroundColor: isRecording ? "rgba(239, 68, 68, 0.2)" : "rgba(0, 217, 255, 0.1)",
              border: isRecording ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: isRecording ? "#fca5a5" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: isRecording ? "🔴 Recording" : "⭕ Record"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1584,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setLaserMode(!laserMode),
            title: "Laser pointer (training mode)",
            style: {
              padding: "4px 8px",
              backgroundColor: laserMode ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 217, 255, 0.1)",
              border: laserMode ? "1px solid rgba(255, 0, 0, 0.5)" : "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: laserMode ? "#ff6b6b" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: laserMode ? "🔴 Laser" : "🔦 Laser"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1600,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setIsLocked(!isLocked),
            title: isLocked ? "Unlock board" : "Lock board",
            style: {
              padding: "4px 8px",
              backgroundColor: isLocked ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 217, 255, 0.1)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "3px",
              color: isLocked ? "#fca5a5" : "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: isLocked ? "🔒 Locked" : "🔓 Lock"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1616,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowTemplate(!showTemplate),
            title: "Load hospitality templates",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(200, 100, 255, 0.1)",
              border: "1px solid rgba(200, 100, 255, 0.3)",
              borderRadius: "3px",
              color: "#c864ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "📋 Template"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1632,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addKitchenTicket,
            title: "Add kitchen ticket/order",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(255, 150, 100, 0.1)",
              border: "1px solid rgba(255, 150, 100, 0.3)",
              borderRadius: "3px",
              color: "#ff9664",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "🎫 Ticket"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1648,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addWasteTracking,
            title: "Track waste and cost",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(100, 200, 100, 0.1)",
              border: "1px solid rgba(100, 200, 100, 0.3)",
              borderRadius: "3px",
              color: "#64c864",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "🗑️ Waste"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1664,
            columnNumber: 13
          },
          this
        ),
        floorPlanMode && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => addFloorPlanTable(2),
              title: "Add 2-top table",
              style: {
                padding: "4px 6px",
                backgroundColor: "rgba(100, 150, 255, 0.1)",
                border: "1px solid rgba(100, 150, 255, 0.3)",
                borderRadius: "3px",
                color: "#6496ff",
                cursor: "pointer",
                fontSize: "10px"
              },
              children: "🪑2"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1683,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => addFloorPlanTable(4),
              title: "Add 4-top table",
              style: {
                padding: "4px 6px",
                backgroundColor: "rgba(100, 150, 255, 0.1)",
                border: "1px solid rgba(100, 150, 255, 0.3)",
                borderRadius: "3px",
                color: "#6496ff",
                cursor: "pointer",
                fontSize: "10px"
              },
              children: "🪑4"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1698,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => addFloorPlanTable(6),
              title: "Add 6-top table",
              style: {
                padding: "4px 6px",
                backgroundColor: "rgba(100, 150, 255, 0.1)",
                border: "1px solid rgba(100, 150, 255, 0.3)",
                borderRadius: "3px",
                color: "#6496ff",
                cursor: "pointer",
                fontSize: "10px"
              },
              children: "🪑6"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
              lineNumber: 1713,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1682,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setFloorPlanMode(!floorPlanMode),
            title: "Toggle floor plan mode",
            style: {
              padding: "4px 8px",
              backgroundColor: floorPlanMode ? "rgba(100, 150, 255, 0.2)" : "rgba(100, 150, 255, 0.1)",
              border: "1px solid rgba(100, 150, 255, 0.3)",
              borderRadius: "3px",
              color: "#6496ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: floorPlanMode ? "✓ Floor Plan" : "🪑 Floor Plan"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1731,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addMeasurement,
            title: "Add measurement ruler",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(150, 200, 100, 0.1)",
              border: "1px solid rgba(150, 200, 100, 0.3)",
              borderRadius: "3px",
              color: "#96c864",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "📏 Ruler"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1747,
            columnNumber: 13
          },
          this
        ),
        showTemplate && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          position: "absolute",
          bottom: "60px",
          left: "12px",
          backgroundColor: "rgba(10, 20, 35, 0.95)",
          border: "1px solid rgba(0, 217, 255, 0.3)",
          borderRadius: "4px",
          padding: "6px",
          zIndex: 100
        }, children: [
          { name: "BOH Mise en Place", emoji: "🍳" },
          { name: "FOH Floor Plan", emoji: "🪑" },
          { name: "Corporate Cost Sheet", emoji: "💰" }
        ].map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => {
              loadTemplate(t.name);
              setShowTemplate(false);
            },
            style: {
              display: "block",
              width: "100%",
              padding: "6px 8px",
              margin: "2px 0",
              backgroundColor: "rgba(0, 217, 255, 0.1)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: "3px",
              color: "#7ff3ff",
              cursor: "pointer",
              fontSize: "11px",
              textAlign: "left"
            },
            children: [
              t.emoji,
              " ",
              t.name
            ]
          },
          t.name,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1779,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1764,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: exportAsJSON,
            title: "Export board as JSON",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(100, 200, 255, 0.1)",
              border: "1px solid rgba(100, 200, 255, 0.3)",
              borderRadius: "3px",
              color: "#64c8ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "📤 Export"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1805,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: importFromJSON,
            title: "Import board from JSON",
            style: {
              padding: "4px 8px",
              backgroundColor: "rgba(100, 200, 255, 0.1)",
              border: "1px solid rgba(100, 200, 255, 0.3)",
              borderRadius: "3px",
              color: "#64c8ff",
              cursor: "pointer",
              fontSize: "11px"
            },
            children: "📥 Import"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
            lineNumber: 1821,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
        lineNumber: 1439,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: downloadCanvas,
          title: "Download as PNG",
          style: {
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
          },
          children: "💾 Save"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
          lineNumber: 1839,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
      lineNumber: 1304,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
    lineNumber: 743,
    columnNumber: 5
  }, this);
}
function AdvancedWhiteboard() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AdvancedWhiteboardCore, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedWhiteboard.jsx",
    lineNumber: 1865,
    columnNumber: 10
  }, this);
}
export {
  AdvancedWhiteboard as default
};
