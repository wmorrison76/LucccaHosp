import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { C as Canvas, u as useThree, a as useFrame, b as Color, D as DoubleSide } from "./react-three-fiber.esm-CIonkBiw.js";
import { c as calculateCakeSpecs } from "./CakeSizeCalculator-D9SPtCeL.js";
import "./vanilla-Cp7rd2DV.js";
import "./Board-6RvNRUqx.js";
import "./settings-CL5KYzJi.js";
class AutoRotateController {
  constructor(target, speed) {
    this.target = target;
    this.speed = speed;
  }
  tick() {
  }
  setTarget(target) {
    this.target = target;
  }
  toggle(enabled) {
  }
}
const CakeMesh = ({ autoRotate, cakeData, calculations, onExport }) => {
  const meshRef = reactExports.useRef(null);
  const controllerRef = reactExports.useRef(new AutoRotateController(null, 0.01));
  useFrame(() => {
    controllerRef.current.tick();
  });
  reactExports.useEffect(() => {
    if (meshRef.current) {
      controllerRef.current.setTarget(meshRef.current);
      controllerRef.current.toggle(autoRotate);
    }
  }, [autoRotate]);
  const cakeDiameter = calculations.cakeDiameter;
  const layerHeight = 2;
  const layerCount = calculations.cakeLayers;
  const totalHeight = layerHeight * layerCount;
  const icingColor = new Color(cakeData.icingColor);
  cakeData.icingColor;
  const layers = Array.from({ length: layerCount }, (_, i) => {
    const yPosition = (i - (layerCount - 1) / 2) * layerHeight;
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("group", { position: [0, yPosition, 0], children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { castShadow: true, receiveShadow: true, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [cakeDiameter / 2, cakeDiameter / 2, layerHeight * 0.9, 64] }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "meshStandardMaterial",
          {
            color: icingColor,
            roughness: 0.4,
            metallic: 0,
            side: DoubleSide
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 77,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, void 0),
      i < layerCount - 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, layerHeight * 0.45, 0], children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [cakeDiameter / 2, cakeDiameter / 2, 0.1, 64] }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "meshStandardMaterial",
          {
            color: new Color(cakeData.mainFlavor === "chocolate" ? "#8B4513" : "#D4A574"),
            roughness: 0.8,
            metallic: 0
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 89,
            columnNumber: 13
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, void 0)
    ] }, `layer-${i}`, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, void 0);
  });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("group", { ref: meshRef, children: [
    layers,
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, -(totalHeight / 2 + 0.2), 0], receiveShadow: true, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [cakeDiameter / 2 + 0.5, cakeDiameter / 2 + 0.5, 0.2, 64] }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meshStandardMaterial", { color: "#D3D3D3", roughness: 0.5 }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 108,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, void 0),
    cakeData.icingType === "frosting" && Array.from({ length: layerCount }).map((_, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("group", { position: [0, (i - (layerCount - 1) / 2) * layerHeight + layerHeight * 0.45, 0], children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("torusGeometry", { args: [cakeDiameter / 2 + 0.1, 0.15, 16, 64] }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 117,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meshStandardMaterial", { color: icingColor, roughness: 0.3 }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 118,
        columnNumber: 15
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 116,
      columnNumber: 13
    }, void 0) }, `piping-${i}`, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 114,
      columnNumber: 11
    }, void 0)),
    cakeData.icingType === "fondant" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, 0, 0], children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [cakeDiameter / 2 + 0.1, cakeDiameter / 2 + 0.1, totalHeight + 0.1, 64] }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "meshStandardMaterial",
        {
          color: icingColor,
          roughness: 0.1,
          metallic: 0.1,
          side: DoubleSide
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 127,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, void 0);
};
const RigInit = () => {
  const { camera } = useThree();
  reactExports.useEffect(() => {
    const rig = new CameraRig(camera);
    rig.goTo("iso", 10);
  }, [camera]);
  return null;
};
const CakeBuilder = ({ cakeData, onExport, onClose }) => {
  const [autoRotate, setAutoRotate] = reactExports.useState(true);
  const [showOverhead, setShowOverhead] = reactExports.useState(false);
  const [cameraView, setCameraView] = reactExports.useState("iso");
  const canvasRef = reactExports.useRef(null);
  const calculations = calculateCakeSpecs(cakeData.guestCount, cakeData.cakeShape, cakeData.decorationNotes.length > 20);
  const handleExport = async () => {
    if (!canvasRef.current) return;
    const canvasElement = canvasRef.current.querySelector("canvas");
    if (canvasElement) {
      const imageData = canvasElement.toDataURL("image/png");
      const design = {
        id: `cake-${Date.now()}`,
        name: `${cakeData.mainFlavor} Cake - ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        intakeData: cakeData,
        calculations,
        textureConfig: {
          frosting: cakeData.icingType,
          fillings: cakeData.fillingFlavors,
          decorations: cakeData.decorationNotes.split(",").map((d) => d.trim())
        },
        exportFormat: "image",
        designImage: imageData
      };
      onExport?.(design);
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `cake-design-${Date.now()}.png`;
      link.click();
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: styles.title, children: "🎂 CakeBuilder - 3D Visualization" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.subtitle, children: [
        cakeData.guestCount,
        " guests | ",
        cakeData.cakeShape,
        " | ",
        cakeData.mainFlavor,
        " cake"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 201,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 199,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.canvasWrapper, ref: canvasRef, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Canvas,
        {
          camera: { position: [5, 5, 5], fov: 50 },
          style: styles.canvas,
          dpr: [1, 2],
          shadows: true,
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ambientLight", { intensity: 0.6 }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 215,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("directionalLight", { position: [10, 10, 5], intensity: 1, castShadow: true, shadowMapSize: 1024 }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 216,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("directionalLight", { position: [-10, -5, 5], intensity: 0.4 }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 217,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RigInit, {}, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 220,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OrbitControls, {}, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 221,
              columnNumber: 11
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              CakeMesh,
              {
                autoRotate,
                cakeData,
                calculations,
                onExport: handleExport
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
                lineNumber: 224,
                columnNumber: 11
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("gridHelper", { args: [20, 20], position: [0, -5, 0] }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 232,
              columnNumber: 11
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 208,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.canvasControls, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setAutoRotate(!autoRotate),
            style: {
              ...styles.controlButton,
              backgroundColor: autoRotate ? "#0066cc" : "#999"
            },
            children: autoRotate ? "⏹ Stop Rotate" : "▶ Auto Rotate"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 237,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => {
              setCameraView("iso");
            },
            style: styles.controlButton,
            children: "📐 Isometric"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 246,
            columnNumber: 11
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => {
              setCameraView("overhead");
              setShowOverhead(!showOverhead);
            },
            style: styles.controlButton,
            children: "⬆️ Overhead"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 254,
            columnNumber: 11
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 236,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 207,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailsSection, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailsGrid, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailBox, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.detailTitle, children: "Cake Specifications" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 271,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Diameter:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 274,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.cakeDiameter,
            '"'
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 273,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Layers:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 277,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.cakeLayers
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Servings:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 280,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.estimatedServings
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 279,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Weight:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 283,
              columnNumber: 17
            }, void 0),
            " ~",
            Math.round(calculations.estimatedWeight),
            " oz"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, void 0),
          calculations.supportColumnsNeeded && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { style: styles.warning, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "⚠️ Structural Supports Required" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 287,
            columnNumber: 19
          }, void 0) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 286,
            columnNumber: 17
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 272,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 270,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailBox, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.detailTitle, children: "Production Timeline" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 295,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Baking:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 298,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.bakingTimeMinutes,
            " min/layer"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 297,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Cooling:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 301,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.coolingTimeMinutes,
            " min"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 300,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Assembly:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, void 0),
            " ",
            calculations.preparationTimeMinutes,
            " min"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Total:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, void 0),
            " ",
            Math.floor(calculations.totalProductionTimeMinutes / 60),
            "h",
            " ",
            calculations.totalProductionTimeMinutes % 60,
            "m"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 296,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 294,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailBox, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.detailTitle, children: "Design Details" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 315,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Flavor:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 318,
              columnNumber: 17
            }, void 0),
            " ",
            cakeData.mainFlavor.replace(/_/g, " ")
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 317,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Icing:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 321,
              columnNumber: 17
            }, void 0),
            " ",
            cakeData.icingType
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 320,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Color:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 324,
              columnNumber: 17
            }, void 0),
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  backgroundColor: cakeData.icingColor,
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
                lineNumber: 325,
                columnNumber: 17
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 323,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Theme:" }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
              lineNumber: 339,
              columnNumber: 17
            }, void 0),
            " ",
            cakeData.theme.replace(/_/g, " ")
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
            lineNumber: 338,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 316,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 314,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 268,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 267,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.actionButtons, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: handleExport, style: styles.buttonPrimary, children: "💾 Export Design" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
        lineNumber: 348,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onClose,
          style: {
            ...styles.buttonSecondary,
            display: onClose ? "block" : "none"
          },
          children: "← Back to Form"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
          lineNumber: 351,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
      lineNumber: 347,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilder.tsx",
    lineNumber: 197,
    columnNumber: 5
  }, void 0);
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  header: {
    padding: "1.5rem 2rem",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd"
  },
  title: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.8rem",
    color: "#000"
  },
  subtitle: {
    margin: "0",
    fontSize: "0.95rem",
    color: "#666"
  },
  canvasWrapper: {
    flex: 1,
    position: "relative",
    backgroundColor: "#e8e8e8",
    borderRadius: "4px",
    margin: "1rem",
    overflow: "hidden"
  },
  canvas: {
    width: "100%",
    height: "100%"
  },
  canvasControls: {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    display: "flex",
    gap: "0.5rem",
    zIndex: 10
  },
  controlButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0066cc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  detailsSection: {
    padding: "1.5rem 2rem",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem"
  },
  detailBox: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    border: "1px solid #eee"
  },
  detailTitle: {
    margin: "0 0 0.75rem 0",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#000"
  },
  detailList: {
    margin: "0",
    padding: "0 0 0 1.5rem",
    fontSize: "0.9rem"
  },
  warning: {
    color: "#ff6600",
    fontWeight: "bold"
  },
  actionButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    padding: "1.5rem 2rem",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd"
  },
  buttonPrimary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0066cc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  buttonSecondary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#0066cc",
    backgroundColor: "#fff",
    border: "2px solid #0066cc",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
export {
  CakeBuilder
};
