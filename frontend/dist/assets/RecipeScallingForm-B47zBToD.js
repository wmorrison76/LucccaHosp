import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function RecipeScalingForm({ baseRecipe }) {
  const [scaleFactor, setScaleFactor] = reactExports.useState(1);
  const scaledIngredients = baseRecipe.ingredients.map((item) => ({
    name: item.name,
    amount: (item.amount * scaleFactor).toFixed(2),
    unit: item.unit
  }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-white dark:bg-zinc-800 rounded-lg shadow", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold mb-2", children: "Scale Recipe" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block mb-2", children: [
      "Scale Factor:",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "input",
        {
          type: "number",
          step: "0.1",
          min: "0.1",
          value: scaleFactor,
          onChange: (e) => setScaleFactor(parseFloat(e.target.value)),
          className: "w-full p-2 border rounded"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
          lineNumber: 17,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "mt-4 space-y-1", children: scaledIngredients.map((item, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
      item.amount,
      " ",
      item.unit,
      " ",
      item.name
    ] }, index, true, {
      fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
      lineNumber: 28,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/RecipeScallingForm.jsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
export {
  RecipeScalingForm
};
