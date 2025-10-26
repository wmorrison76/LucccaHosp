import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { FormFieldGroup } from "./FormFieldGroup-DTBCw_Qw.js";
import { FormButton } from "./FormButton-Bc4k9yy7.js";
function PastryRecipeForm() {
  const [recipeName, setRecipeName] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Base Recipe");
  const [instructions, setInstructions] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Recipe Saved: ${recipeName}`);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pastry-recipe-form-page", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Add Pastry Recipe" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "w-full max-w-lg", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormFieldGroup, { label: "Recipe Name", children: [
        "// Inside form fields:",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "text",
            value: recipeName,
            onChange: (e) => setRecipeName(e.target.value),
            className: "w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
            lineNumber: 21,
            columnNumber: 1
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormFieldGroup, { label: "Category", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "select",
        {
          value: category,
          onChange: (e) => setCategory(e.target.value),
          className: "w-full p-2 border rounded",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Base Recipe" }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
              lineNumber: 36,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Flavor Variation" }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
              lineNumber: 37,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: "Decoration" }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
              lineNumber: 38,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
          lineNumber: 31,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormFieldGroup, { label: "Instructions", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "textarea",
        {
          value: instructions,
          onChange: (e) => setInstructions(e.target.value),
          className: "w-full p-2 border rounded",
          rows: "6"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
          lineNumber: 43,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormButton, { label: "Save Recipe", onClick: handleSubmit }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/PastryRecipeForm.jsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
export {
  PastryRecipeForm as default
};
