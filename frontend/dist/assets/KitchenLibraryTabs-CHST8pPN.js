import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { D as DoubleTabs } from "./DoubleTabs-D5pTPMaE.js";
import { E as ExternalLink, H as House } from "./Board-6RvNRUqx.js";
import { S as Settings } from "./settings-CL5KYzJi.js";
const BACK_ROW = [
  { id: "cake-builder", label: "Cake Builder", color: "#E2A23B" },
  { id: "cake-orders", label: "Cake Orders", color: "#36A55E" },
  { id: "echocanvas", label: "EchoCanvas", color: "#19A1B7" },
  { id: "chocolate", label: "Chocolates & Candies", color: "#C84D75" },
  { id: "breads", label: "Breads & Doughs", color: "#7C65E6" }
];
const FRONT_ROW = [
  { id: "inventory", label: "Inventory", color: "#DB981E" },
  { id: "recipes", label: "Recipes", color: "#20A560" },
  { id: "new", label: "New Recipe", color: "#2787E6" },
  { id: "photos", label: "Photo Gallery", color: "#5A66D5" },
  { id: "production", label: "Production", color: "#E04D73" }
];
const PLACEHOLDERS = {
  "cake-builder": "Design builder for custom cakes.",
  "cake-orders": "Order intake, status and calendar.",
  echocanvas: "Canvas/workboard for compositions.",
  chocolate: "Molds, tempering, decorations, confections.",
  breads: "Preferments, doughs, shaping, baking plans.",
  inventory: "Stock, par levels, transfers.",
  recipes: "Collections, techniques and sub-recipes.",
  new: "Create a new recipe from a template.",
  photos: "Visual library of results and references.",
  production: "Batching, staging and timeline."
};
function PastryLibrary() {
  const [active, setActive] = reactExports.useState("recipes");
  const actions = reactExports.useMemo(
    () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dt-ico", title: "Tear out", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExternalLink, { size: 16 }, void 0, false, {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dt-ico", title: "Home", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(House, { size: 16 }, void 0, false, {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          className: "dt-ico",
          title: "Settings",
          onClick: () => window.dispatchEvent(new CustomEvent("pastry-open-settings")),
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
            lineNumber: 56,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
          lineNumber: 49,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    []
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      DoubleTabs,
      {
        backRow: BACK_ROW,
        frontRow: FRONT_ROW,
        activeId: active,
        onChange: setActive,
        actions,
        size: "compact"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 65,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "mt-3 rounded-xl",
        style: {
          border: "1px solid rgba(66,226,225,0.45)",
          boxShadow: "0 0 0 1px rgba(0,0,0,.35) inset, 0 18px 70px rgba(0,255,240,.10)",
          background: "rgba(5,12,24,.78)"
        },
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "px-4 py-3",
              style: {
                borderBottom: "1px solid rgba(66,226,225,.35)",
                fontWeight: 800,
                fontSize: 18
              },
              children: BACK_ROW.concat(FRONT_ROW).find((t) => t.id === active)?.label ?? "Section"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
              lineNumber: 84,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 py-4 text-slate-200", children: [
            "Content placeholder for",
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: BACK_ROW.concat(FRONT_ROW).find((t) => t.id === active)?.label }, void 0, false, {
              fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
              lineNumber: 97,
              columnNumber: 11
            }, this),
            ". ",
            PLACEHOLDERS[active] || "Drop in technique notes, forms, tables, embeds, or tools here."
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
            lineNumber: 95,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
        lineNumber: 75,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
        .dt-ico{
          display:inline-flex;align-items:center;justify-content:center;
          width:28px;height:28px;border-radius:9999px;
          border:1px solid rgba(66,226,225,.35);
          background:rgba(5,12,24,.6);color:#E6F9FB;
          box-shadow:0 0 0 1px rgba(0,0,0,.35) inset, 0 0 18px rgba(0,255,240,.18);
        }
        .dt-ico:hover{filter:brightness(1.08)}
      ` }, void 0, false, {
      fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
      lineNumber: 105,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/KitchenLibraryTabs.jsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
export {
  PastryLibrary as default
};
