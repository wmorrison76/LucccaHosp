import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function InventoryCostCheck() {
  const [item, setItem] = reactExports.useState("");
  const [cost, setCost] = reactExports.useState(null);
  const handleCheck = () => {
    const mockInventory = {
      "Vanilla": 0.25,
      "Butter": 1.2,
      "Eggs": 0.2
    };
    setCost(mockInventory[item] || "Not Found");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Ingredient Cost Lookup" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/InventoryCostCheck.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type: "text",
        value: item,
        onChange: (e) => setItem(e.target.value),
        className: "p-2 border rounded mr-2",
        placeholder: "Enter Ingredient"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/InventoryCostCheck.jsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: handleCheck, className: "p-2 bg-green-600 text-white rounded", children: "Check Cost" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/InventoryCostCheck.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    cost !== null && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-4", children: [
      "Cost: ",
      typeof cost === "string" ? cost : `$${cost.toFixed(2)} per unit`
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/pages/InventoryCostCheck.jsx",
      lineNumber: 31,
      columnNumber: 25
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/InventoryCostCheck.jsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
export {
  InventoryCostCheck as default
};
