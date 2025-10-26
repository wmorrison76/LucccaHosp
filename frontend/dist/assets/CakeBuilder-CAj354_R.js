import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import CakeHero3D from "./CakeHero3D-CCrS5RtG.js";
import "./react-three-fiber.esm-CIonkBiw.js";
import "./vanilla-Cp7rd2DV.js";
import "./Board-6RvNRUqx.js";
import "./settings-CL5KYzJi.js";
function Button({ children, onClick, variant = "default", style }) {
  const base = {
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
    border: "1px solid #374151",
    background: variant === "ghost" ? "transparent" : "#111827",
    color: "#e5e7eb"
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick, style: { ...base, ...style }, children }, void 0, false, {
    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
function Tabs({ tabs, value, onChange }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: 8, borderBottom: "1px solid #374151", marginBottom: 12 }, children: tabs.map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: () => onChange(t),
      style: {
        padding: "8px 12px",
        border: "1px solid #374151",
        borderBottom: value === t ? "2px solid #60a5fa" : "1px solid #374151",
        borderRadius: "10px 10px 0 0",
        background: value === t ? "#1f2937" : "transparent",
        color: "#e5e7eb"
      },
      children: t
    },
    t,
    false,
    {
      fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
      lineNumber: 28,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
function Panel({ title, children }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      style: {
        padding: 14,
        border: "1px solid #374151",
        background: "#0b1220",
        borderRadius: 12
      },
      children: [
        title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#d1d5db", fontWeight: 600, marginBottom: 10 }, children: title }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 58,
          columnNumber: 17
        }, this),
        children
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
      lineNumber: 50,
      columnNumber: 5
    },
    this
  );
}
function CakeBuilder() {
  const [layers, setLayers] = reactExports.useState([
    { id: 1, type: "cake", flavor: "vanilla", icing: "Buttercream", color: "#F2D7E2" },
    { id: 2, type: "filling", flavor: "strawberry", color: "#b33a3a" },
    { id: 3, type: "cake", flavor: "vanilla", icing: "Buttercream", color: "#F2D7E2" }
  ]);
  const [activeTab, setActiveTab] = reactExports.useState("Preview");
  const add = (type) => {
    const id = Date.now();
    if (type === "cake") {
      setLayers((prev) => [
        ...prev,
        { id, type: "cake", flavor: "vanilla", icing: "Buttercream", color: "#F2D7E2" }
      ]);
    } else if (type === "filling") {
      setLayers((prev) => [...prev, { id, type: "filling", flavor: "buttercream", color: "#F1C9A8" }]);
    } else {
      setLayers((prev) => [...prev, { id, type: "support", notes: "dowels" }]);
    }
  };
  const remove = (id) => setLayers((prev) => prev.filter((l) => l.id !== id));
  const update = (id, patch) => setLayers((prev) => prev.map((l) => l.id === id ? { ...l, ...patch } : l));
  const demo = () => setLayers([
    { id: 1, type: "cake", flavor: "vanilla", icing: "Buttercream", color: "#F2D7E2" },
    { id: 2, type: "filling", flavor: "raspberry", color: "#b33a3a" },
    { id: 3, type: "cake", flavor: "red velvet", icing: "Buttercream", color: "#f0c2b5" },
    { id: 4, type: "filling", flavor: "lemon curd", color: "#f7d25a" },
    { id: 5, type: "cake", flavor: "chocolate", icing: "Buttercream", color: "#d8b78a" },
    { id: 6, type: "support", notes: "3 dowels" }
  ]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: 16, display: "grid", gap: 16, gridTemplateColumns: "minmax(380px, 560px) 1fr" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: 8, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => add("cake"), children: "+ Cake Layer" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => add("filling"), children: "+ Filling" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 107,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => add("support"), children: "+ Support" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 108,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: demo, style: { marginLeft: "auto" }, children: "Demo cake" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Panel, { title: "Layers", children: layers.map((l) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: 8,
            alignItems: "center",
            marginBottom: 8
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "select",
              {
                value: l.type,
                onChange: (e) => update(l.id, { type: e.target.value }),
                style: {
                  padding: 8,
                  borderRadius: 10,
                  background: "#111827",
                  color: "#e5e7eb",
                  border: "1px solid #374151"
                },
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "cake", children: "Cake" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                    lineNumber: 137,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "filling", children: "Filling" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                    lineNumber: 138,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "support", children: "Support" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                    lineNumber: 139,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                lineNumber: 126,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                placeholder: l.type === "support" ? "notes (e.g. 3 dowels)" : "flavor / icing / notes",
                defaultValue: l.flavor,
                onChange: (e) => update(l.id, { flavor: e.target.value }),
                style: {
                  padding: 8,
                  borderRadius: 10,
                  background: "#111827",
                  color: "#e5e7eb",
                  border: "1px solid #374151"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                lineNumber: 142,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: () => remove(l.id), style: { borderColor: "#ef4444", color: "#ef4444" }, children: "✕" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
              lineNumber: 155,
              columnNumber: 15
            }, this),
            l.type !== "support" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "color",
                value: l.color || "#F2D7E2",
                onChange: (e) => update(l.id, { color: e.target.value }),
                style: { gridColumn: "1 / span 3", width: 120, height: 28, background: "transparent", border: "none" }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
                lineNumber: 161,
                columnNumber: 17
              },
              this
            )
          ]
        },
        l.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 116,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 114,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Panel, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#d1d5db", fontWeight: 600 }, children: "Preview" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 177,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => alert("Slice coming soon 🍰"), children: "Take a Slice" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 179,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 178,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 176,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { height: 420 }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CakeHero3D, { layers }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 184,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 183,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tabs, { tabs: ["Preview", "Layers", "Summary"], value: activeTab, onChange: setActiveTab }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      activeTab === "Preview" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#94a3b8" }, children: "Use the buttons to add layers; the preview updates instantly." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 190,
        columnNumber: 13
      }, this),
      activeTab === "Layers" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { color: "#94a3b8" }, children: [
        "Each ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: "cake" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 195,
          columnNumber: 20
        }, this),
        " layer appears as a tier. A ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: "filling" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 195,
          columnNumber: 59
        }, this),
        " after a cake shows as a band between tiers."
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 194,
        columnNumber: 13
      }, this),
      activeTab === "Summary" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: 12, border: "1px solid #374151", borderRadius: 10, color: "#e5e7eb" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: 600, marginBottom: 8 }, children: "Build Summary" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 201,
          columnNumber: 15
        }, this),
        layers.map((l, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { opacity: 0.9, borderBottom: "1px dashed #374151", padding: "4px 0" }, children: [
          "Layer ",
          i + 1,
          ": ",
          l.type.toUpperCase(),
          " ",
          l.flavor ? `— ${l.flavor}` : "",
          " ",
          l.icing ? `(${l.icing})` : ""
        ] }, l.id, true, {
          fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
          lineNumber: 203,
          columnNumber: 17
        }, this))
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
        lineNumber: 200,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeBuilder.jsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
}
export {
  CakeBuilder as default
};
