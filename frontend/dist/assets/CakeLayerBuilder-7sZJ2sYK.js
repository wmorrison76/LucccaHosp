import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const flavors = ["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Almond", "Coffee", "Carrot"];
const fillings = ["Strawberry", "Raspberry", "Ganache", "Buttercream", "Custard", "Fruit Jam"];
const frostings = ["Buttercream", "Fondant", "Cream Cheese", "Ganache"];
function CakeLayerBuilder({ layers, setLayers }) {
  const updateLayer = (index, field, value) => {
    const updated = [...layers];
    updated[index][field] = value;
    setLayers(updated);
  };
  const addLayer = () => {
    if (layers.length < 10) {
      setLayers([...layers, { flavor: "", filling: "", frosting: "" }]);
    }
  };
  const removeLayer = (index) => {
    const updated = layers.filter((_, i) => i !== index);
    setLayers(updated);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-3xl mt-8", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-semibold text-zinc-700 mb-4", children: "🎂 Build Your Layers" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    layers.map((layer, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 p-4 border rounded bg-white shadow-sm", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2 font-medium text-sm text-zinc-600", children: [
        "Layer ",
        i + 1
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            value: layer.flavor,
            onChange: (e) => updateLayer(i, "flavor", e.target.value),
            className: "p-2 border rounded w-40",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Flavor" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 39,
                columnNumber: 15
              }, this),
              flavors.map((f) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: f }, f, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 40,
                columnNumber: 35
              }, this))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
            lineNumber: 34,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            value: layer.filling,
            onChange: (e) => updateLayer(i, "filling", e.target.value),
            className: "p-2 border rounded w-40",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Filling" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 48,
                columnNumber: 15
              }, this),
              fillings.map((f) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: f }, f, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 49,
                columnNumber: 36
              }, this))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
            lineNumber: 43,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            value: layer.frosting,
            onChange: (e) => updateLayer(i, "frosting", e.target.value),
            className: "p-2 border rounded w-40",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Frosting" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 57,
                columnNumber: 15
              }, this),
              frostings.map((f) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: f }, f, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
                lineNumber: 58,
                columnNumber: 37
              }, this))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
            lineNumber: 52,
            columnNumber: 13
          },
          this
        ),
        layers.length > 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => removeLayer(i),
            className: "text-red-500 hover:underline text-sm",
            children: "Remove"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
            lineNumber: 62,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
        lineNumber: 33,
        columnNumber: 11
      }, this)
    ] }, i, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
      lineNumber: 30,
      columnNumber: 9
    }, this)),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: addLayer,
        className: "mt-2 px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-800",
        children: "➕ Add Layer"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
        lineNumber: 72,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeLayerBuilder.jsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
export {
  CakeLayerBuilder as default
};
