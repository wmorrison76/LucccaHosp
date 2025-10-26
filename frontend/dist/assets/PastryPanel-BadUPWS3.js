import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { C as ChefHat } from "./chef-hat-BgZX9Th7.js";
import { I as Image, X } from "./Board-6RvNRUqx.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
import { P as Paintbrush } from "./paintbrush-B7lPf6YF.js";
import { B as BookOpen } from "./book-open-rCUCTzrv.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { T as Trash2 } from "./trash-2-Bv0uM_qc.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode);
const GalleryTab = () => {
  const [images, setImages] = reactExports.useState([
    { id: 1, src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop", alt: "Chocolate Cake" },
    { id: 2, src: "https://images.unsplash.com/photo-1578519603510-7cb86628853d?w=300&h=300&fit=crop", alt: "Vanilla Cake" },
    { id: 3, src: "https://images.unsplash.com/photo-1578527314433-a4995f42ec8f?w=300&h=300&fit=crop", alt: "Berry Pastry" },
    { id: 4, src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop", alt: "Wedding Cake" },
    { id: 5, src: "https://images.unsplash.com/photo-1578519603510-7cb86628853d?w=300&h=300&fit=crop", alt: "Layered Cake" },
    { id: 6, src: "https://images.unsplash.com/photo-1578527314433-a4995f42ec8f?w=300&h=300&fit=crop", alt: "Artisan Pastry" }
  ]);
  const [selectedImage, setSelectedImage] = reactExports.useState(images[0]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.3)",
      borderRadius: "12px",
      border: "1px solid rgba(0, 217, 255, 0.2)",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      minHeight: "300px"
    }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "img",
      {
        src: selectedImage.src,
        alt: selectedImage.alt,
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(0, 217, 255, 0.2)"
        },
        onError: (e) => {
          e.currentTarget.src = "https://via.placeholder.com/300?text=Cake+Image";
        }
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 32,
        columnNumber: 9
      },
      void 0
    ) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      gap: "8px",
      padding: "12px 0",
      borderTop: "1px solid rgba(0, 217, 255, 0.15)",
      maxHeight: "120px",
      overflowY: "auto"
    }, children: images.map((img) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setSelectedImage(img),
        style: {
          padding: "4px",
          border: selectedImage.id === img.id ? "2px solid #00d9ff" : "1px solid rgba(0, 217, 255, 0.3)",
          borderRadius: "8px",
          backgroundColor: "rgba(15, 23, 42, 0.4)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          overflow: "hidden"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.backgroundColor = "rgba(30, 58, 138, 0.5)";
          e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.6)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.4)";
          e.currentTarget.style.borderColor = selectedImage.id === img.id ? "2px solid #00d9ff" : "1px solid rgba(0, 217, 255, 0.3)";
        },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "img",
          {
            src: img.src,
            alt: img.alt,
            style: { width: "100%", height: "100%", objectFit: "cover" },
            onError: (e) => {
              e.currentTarget.src = "https://via.placeholder.com/80?text=IMG";
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 80,
            columnNumber: 13
          },
          void 0
        )
      },
      img.id,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 59,
        columnNumber: 11
      },
      void 0
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 49,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "12px",
      backgroundColor: "rgba(30, 41, 59, 0.4)",
      borderRadius: "8px",
      fontSize: "12px",
      color: "#cbd5e1",
      textAlign: "center"
    }, children: selectedImage.alt }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 93,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
    lineNumber: 18,
    columnNumber: 5
  }, void 0);
};
const Cake3DTab = () => {
  const containerRef = reactExports.useRef(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [cakeRotation, setCakeRotation] = reactExports.useState(0);
  const [cakeScale, setCakeScale] = reactExports.useState(1);
  reactExports.useEffect(() => {
    setIsLoading(false);
  }, []);
  const rotateCake = () => {
    setCakeRotation((prev) => (prev + 45) % 360);
  };
  const scaleCake = (direction) => {
    setCakeScale((prev) => {
      const newScale = direction === "up" ? prev + 0.2 : prev - 0.2;
      return Math.max(0.5, Math.min(2, newScale));
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "12px", height: "100%" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref: containerRef,
        style: {
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(0, 217, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          minHeight: "300px"
        },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              width: "120px",
              height: "160px",
              backgroundColor: "#d4661e",
              borderRadius: "50% 50% 40% 40%",
              position: "relative",
              boxShadow: `0 20px 40px rgba(212, 102, 30, 0.5)`,
              transform: `rotateY(${cakeRotation}deg) scale(${cakeScale})`,
              transition: "transform 0.6s ease"
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                position: "absolute",
                top: "20px",
                left: "10px",
                right: "10px",
                height: "30px",
                backgroundColor: "#f59e0b",
                borderRadius: "50%",
                opacity: 0.8
              } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                lineNumber: 162,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                position: "absolute",
                top: "50px",
                left: "5px",
                right: "5px",
                height: "35px",
                backgroundColor: "#d97706",
                borderRadius: "50%",
                opacity: 0.7
              } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                lineNumber: 172,
                columnNumber: 11
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                position: "absolute",
                top: "85px",
                left: "0",
                right: "0",
                height: "40px",
                backgroundColor: "#b45309",
                borderRadius: "40% 40% 50% 50%",
                opacity: 0.6
              } }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                lineNumber: 182,
                columnNumber: 11
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 149,
            columnNumber: 9
          },
          void 0
        )
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 133,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      padding: "12px",
      backgroundColor: "rgba(30, 41, 59, 0.4)",
      borderRadius: "8px"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: rotateCake,
          style: {
            padding: "10px 12px",
            backgroundColor: "rgba(0, 217, 255, 0.15)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "8px",
            color: "#7ff3ff",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.25)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 217, 255, 0.2)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.boxShadow = "none";
          },
          children: "🔄 Rotate"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 204,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "4px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => scaleCake("down"),
            style: {
              flex: 1,
              padding: "10px 8px",
              backgroundColor: "rgba(0, 217, 255, 0.15)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "8px",
              color: "#7ff3ff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.25)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
            },
            children: "-"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 230,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => scaleCake("up"),
            style: {
              flex: 1,
              padding: "10px 8px",
              backgroundColor: "rgba(0, 217, 255, 0.15)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              borderRadius: "8px",
              color: "#7ff3ff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.25)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
            },
            children: "+"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 252,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 229,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 196,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "8px 12px",
      backgroundColor: "rgba(15, 23, 42, 0.3)",
      borderRadius: "8px",
      fontSize: "12px",
      color: "#cbd5e1",
      textAlign: "center"
    }, children: [
      "Scale: ",
      cakeScale.toFixed(1),
      "x"
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 278,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
    lineNumber: 131,
    columnNumber: 5
  }, void 0);
};
const CanvasStudioTab = () => {
  const canvasRef = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [color, setColor] = reactExports.useState("#00d9ff");
  const [brushSize, setBrushSize] = reactExports.useState(5);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "12px", height: "100%" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: 400,
        height: 300,
        onMouseDown: startDrawing,
        onMouseMove: draw,
        onMouseUp: stopDrawing,
        onMouseLeave: stopDrawing,
        style: {
          flex: 1,
          backgroundColor: "#0f172a",
          borderRadius: "12px",
          border: "1px solid rgba(0, 217, 255, 0.2)",
          cursor: "crosshair",
          maxHeight: "350px"
        }
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 347,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "8px",
      padding: "12px",
      backgroundColor: "rgba(30, 41, 59, 0.4)",
      borderRadius: "8px"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px" }, children: "Color" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 375,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "color",
            value: color,
            onChange: (e) => setColor(e.target.value),
            style: {
              width: "100%",
              height: "32px",
              borderRadius: "6px",
              border: "1px solid rgba(0, 217, 255, 0.3)",
              cursor: "pointer"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 378,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 374,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px" }, children: [
          "Brush: ",
          brushSize,
          "px"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 393,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "range",
            min: "1",
            max: "20",
            value: brushSize,
            onChange: (e) => setBrushSize(Number(e.target.value)),
            style: {
              width: "100%",
              cursor: "pointer"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 396,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 392,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: clearCanvas,
          style: {
            padding: "10px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "6px",
            color: "#fca5a5",
            fontSize: "11px",
            fontWeight: "600",
            cursor: "pointer",
            alignSelf: "flex-end",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.25)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
          },
          children: "Clear"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 409,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 366,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
    lineNumber: 345,
    columnNumber: 5
  }, void 0);
};
const RecipesTab = () => {
  const [recipes, setRecipes] = reactExports.useState([
    { id: 1, name: "Classic Chocolate Cake", servings: 8, time: "45 min", difficulty: "Easy" },
    { id: 2, name: "Vanilla Sponge", servings: 10, time: "50 min", difficulty: "Medium" },
    { id: 3, name: "Berry Tart", servings: 6, time: "30 min", difficulty: "Medium" }
  ]);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [selectedRecipe, setSelectedRecipe] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    servings: "",
    time: "",
    difficulty: "Easy"
  });
  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (formData.name && formData.servings && formData.time) {
      setRecipes([
        ...recipes,
        {
          id: Date.now(),
          ...formData,
          servings: Number(formData.servings)
        }
      ]);
      setFormData({ name: "", servings: "", time: "", difficulty: "Easy" });
      setShowForm(false);
    }
  };
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setSelectedRecipe(null);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", height: "100%" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      overflowY: "auto",
      paddingRight: "8px"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setShowForm(!showForm),
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "12px",
            backgroundColor: "rgba(0, 217, 255, 0.15)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "8px",
            color: "#7ff3ff",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textTransform: "uppercase"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.25)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 217, 255, 0.2)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.boxShadow = "none";
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 512,
              columnNumber: 11
            }, void 0),
            "New Recipe"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 485,
          columnNumber: 9
        },
        void 0
      ),
      recipes.map((recipe) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setSelectedRecipe(recipe),
          style: {
            padding: "12px",
            backgroundColor: selectedRecipe?.id === recipe.id ? "rgba(0, 217, 255, 0.2)" : "rgba(15, 23, 42, 0.4)",
            border: selectedRecipe?.id === recipe.id ? "1px solid rgba(0, 217, 255, 0.5)" : "1px solid rgba(0, 217, 255, 0.15)",
            borderRadius: "8px",
            color: "#b0e0ff",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            if (selectedRecipe?.id !== recipe.id) {
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.4)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.3)";
            }
          },
          onMouseLeave: (e) => {
            if (selectedRecipe?.id !== recipe.id) {
              e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.4)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.15)";
            }
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "12px", fontWeight: "600", marginBottom: "4px" }, children: recipe.name }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 543,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "11px", opacity: 0.7 }, children: [
              recipe.servings,
              " servings • ",
              recipe.time,
              " • ",
              recipe.difficulty
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 544,
              columnNumber: 13
            }, void 0)
          ]
        },
        recipe.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 517,
          columnNumber: 11
        },
        void 0
      ))
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 478,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "16px",
      backgroundColor: "rgba(30, 41, 59, 0.3)",
      borderRadius: "12px",
      border: "1px solid rgba(0, 217, 255, 0.15)",
      overflowY: "auto"
    }, children: showForm ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#00ffff" }, children: "New Recipe" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 565,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowForm(false),
            style: {
              background: "none",
              border: "none",
              color: "#7ff3ff",
              cursor: "pointer",
              fontSize: "14px"
            },
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 576,
              columnNumber: 17
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 566,
            columnNumber: 15
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 564,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleAddRecipe, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px", textTransform: "uppercase" }, children: "Recipe Name" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 583,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "text",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "e.g., Chocolate Cake",
              style: {
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "6px",
                color: "#e2e8f0",
                fontSize: "12px",
                boxSizing: "border-box"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 586,
              columnNumber: 19
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 582,
          columnNumber: 17
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px", textTransform: "uppercase" }, children: "Servings" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 606,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "number",
                value: formData.servings,
                onChange: (e) => setFormData({ ...formData, servings: e.target.value }),
                placeholder: "8",
                style: {
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  borderRadius: "6px",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  boxSizing: "border-box"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                lineNumber: 609,
                columnNumber: 21
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 605,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px", textTransform: "uppercase" }, children: "Time" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 628,
              columnNumber: 21
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                value: formData.time,
                onChange: (e) => setFormData({ ...formData, time: e.target.value }),
                placeholder: "45 min",
                style: {
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "rgba(15, 23, 42, 0.5)",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  borderRadius: "6px",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  boxSizing: "border-box"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                lineNumber: 631,
                columnNumber: 21
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 627,
            columnNumber: 19
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 604,
          columnNumber: 17
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { fontSize: "11px", color: "#7ff3ff", display: "block", marginBottom: "4px", textTransform: "uppercase" }, children: "Difficulty" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 651,
            columnNumber: 19
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              value: formData.difficulty,
              onChange: (e) => setFormData({ ...formData, difficulty: e.target.value }),
              style: {
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "6px",
                color: "#e2e8f0",
                fontSize: "12px",
                boxSizing: "border-box"
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Easy" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                  lineNumber: 668,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Medium" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                  lineNumber: 669,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Hard" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                  lineNumber: 670,
                  columnNumber: 21
                }, void 0)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 654,
              columnNumber: 19
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 650,
          columnNumber: 17
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "submit",
            style: {
              padding: "10px",
              backgroundColor: "rgba(0, 217, 255, 0.2)",
              border: "1px solid rgba(0, 217, 255, 0.4)",
              borderRadius: "6px",
              color: "#00ffff",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.2s ease"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 217, 255, 0.2)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.2)";
              e.currentTarget.style.boxShadow = "none";
            },
            children: "Add Recipe"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 674,
            columnNumber: 17
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 581,
        columnNumber: 15
      }, void 0) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 580,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 563,
      columnNumber: 11
    }, void 0) : selectedRecipe ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: { margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600", color: "#00ffff" }, children: selectedRecipe.name }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 706,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "11px", opacity: 0.7 }, children: [
            selectedRecipe.servings,
            " servings • ",
            selectedRecipe.time
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 709,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 705,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => handleDeleteRecipe(selectedRecipe.id),
            style: {
              background: "none",
              border: "none",
              color: "#f87171",
              cursor: "pointer",
              padding: "4px"
            },
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 723,
              columnNumber: 17
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 713,
            columnNumber: 15
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 704,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        padding: "12px",
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        borderRadius: "8px",
        border: "1px solid rgba(0, 217, 255, 0.1)",
        fontSize: "12px"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { marginBottom: "8px" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { color: "#7ff3ff", fontWeight: "600" }, children: "Difficulty:" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 735,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { marginLeft: "8px" }, children: selectedRecipe.difficulty }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 736,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 734,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { color: "#7ff3ff", fontWeight: "600" }, children: "Prep Time:" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 739,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { marginLeft: "8px" }, children: selectedRecipe.time }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 740,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 738,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 727,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        flex: 1,
        padding: "12px",
        backgroundColor: "rgba(15, 23, 42, 0.3)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#cbd5e1",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }, children: "Detailed recipe content coming soon..." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
        lineNumber: 744,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 703,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: "#7ff3ff",
      fontSize: "12px",
      textAlign: "center"
    }, children: "Select a recipe or create a new one" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 760,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 552,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
    lineNumber: 476,
    columnNumber: 5
  }, void 0);
};
function PastryPanel() {
  const [activeTab, setActiveTab] = reactExports.useState("gallery");
  const tabs = [
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "cake3d", label: "3D Cake", icon: Box },
    { id: "canvas", label: "Canvas Studio", icon: Paintbrush },
    { id: "recipes", label: "Recipes", icon: BookOpen }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "system-ui, sans-serif"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          padding: "20px 24px",
          borderBottom: "1px solid rgba(0, 217, 255, 0.15)",
          backgroundColor: "rgba(10, 20, 35, 0.6)"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { fontSize: "24px", fontWeight: "bold", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, { size: 28, style: { color: "#00d9ff" } }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 807,
              columnNumber: 11
            }, this),
            "Baking & Pastry"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 806,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: 0, fontSize: "12px", color: "#cbd5e1", opacity: 0.7 }, children: "Explore recipes, 3D designs, and create custom decorations" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 810,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 801,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          display: "flex",
          gap: "4px",
          padding: "12px 16px",
          backgroundColor: "rgba(10, 20, 35, 0.4)",
          borderBottom: "1px solid rgba(0, 217, 255, 0.1)",
          overflowX: "auto"
        }, children: tabs.map((tab) => {
          const TabIcon = tab.icon;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => setActiveTab(tab.id),
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: activeTab === tab.id ? "1px solid rgba(0, 217, 255, 0.5)" : "1px solid rgba(0, 217, 255, 0.15)",
                backgroundColor: activeTab === tab.id ? "rgba(0, 217, 255, 0.15)" : "transparent",
                color: activeTab === tab.id ? "#00ffff" : "#b0e0ff",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                textTransform: "uppercase"
              },
              onMouseEnter: (e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.3)";
                }
              },
              onMouseLeave: (e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.15)";
                }
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabIcon, { size: 16 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
                  lineNumber: 859,
                  columnNumber: 15
                }, this),
                tab.label
              ]
            },
            tab.id,
            true,
            {
              fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
              lineNumber: 827,
              columnNumber: 13
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 816,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          flex: 1,
          padding: "20px 24px",
          overflowY: "auto",
          overflowX: "hidden"
        }, children: [
          activeTab === "gallery" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GalleryTab, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 873,
            columnNumber: 37
          }, this),
          activeTab === "cake3d" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Cake3DTab, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 874,
            columnNumber: 36
          }, this),
          activeTab === "canvas" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CanvasStudioTab, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 875,
            columnNumber: 36
          }, this),
          activeTab === "recipes" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RecipesTab, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
            lineNumber: 876,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
          lineNumber: 867,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/PastryPanel.jsx",
      lineNumber: 789,
      columnNumber: 5
    },
    this
  );
}
export {
  PastryPanel as default
};
