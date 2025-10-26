import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { W as Wine } from "./wine-DIkWFJpj.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { T as Trash2 } from "./trash-2-Bv0uM_qc.js";
import "./settings-CL5KYzJi.js";
function MixologyFallback() {
  const [cocktails, setCocktails] = reactExports.useState([
    { id: 1, name: "Mojito", category: "Classic", abv: "12%" },
    { id: 2, name: "Margarita", category: "Classic", abv: "18%" },
    { id: 3, name: "Cosmopolitan", category: "Contemporary", abv: "20%" }
  ]);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({ name: "", category: "", abv: "" });
  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.abv) {
      setCocktails([...cocktails, { id: Date.now(), ...formData }]);
      setFormData({ name: "", category: "", abv: "" });
      setShowForm(false);
    }
  };
  const handleDelete = (id) => {
    setCocktails(cocktails.filter((c) => c.id !== id));
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "20px 24px",
      borderBottom: "1px solid rgba(0, 217, 255, 0.15)",
      backgroundColor: "rgba(10, 20, 35, 0.6)"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { fontSize: "24px", fontWeight: "bold", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Wine, { size: 28, style: { color: "#00d9ff" } }, void 0, false, {
          fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        "Mixology"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: 0, fontSize: "12px", color: "#cbd5e1", opacity: 0.7 }, children: "Cocktail recipes and bar management" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
        lineNumber: 47,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { flex: 1, overflow: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }, children: [
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
            textTransform: "uppercase",
            transition: "all 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.25)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.15)";
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
              lineNumber: 79,
              columnNumber: 11
            }, this),
            "New Cocktail"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
          lineNumber: 54,
          columnNumber: 9
        },
        this
      ),
      showForm && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleAdd, style: { display: "flex", flexDirection: "column", gap: "10px", padding: "16px", backgroundColor: "rgba(30, 41, 59, 0.3)", borderRadius: "8px", border: "1px solid rgba(0, 217, 255, 0.15)" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "Cocktail name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            style: {
              padding: "8px 12px",
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: "6px",
              color: "#e2e8f0",
              fontSize: "12px"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
            lineNumber: 85,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "Category",
            value: formData.category,
            onChange: (e) => setFormData({ ...formData, category: e.target.value }),
            style: {
              padding: "8px 12px",
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: "6px",
              color: "#e2e8f0",
              fontSize: "12px"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
            lineNumber: 99,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "ABV %",
            value: formData.abv,
            onChange: (e) => setFormData({ ...formData, abv: e.target.value }),
            style: {
              padding: "8px 12px",
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: "6px",
              color: "#e2e8f0",
              fontSize: "12px"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
            lineNumber: 113,
            columnNumber: 13
          },
          this
        ),
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
              textTransform: "uppercase"
            },
            children: "Add Cocktail"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
            lineNumber: 127,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "grid", gap: "8px" }, children: cocktails.map((cocktail) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          style: {
            padding: "12px",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(0, 217, 255, 0.15)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "12px", fontWeight: "600", color: "#00ffff" }, children: cocktail.name }, void 0, false, {
                fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
                lineNumber: 162,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "11px", opacity: 0.7 }, children: [
                cocktail.category,
                " • ",
                cocktail.abv,
                " ABV"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
                lineNumber: 163,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
              lineNumber: 161,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => handleDelete(cocktail.id),
                style: {
                  background: "none",
                  border: "none",
                  color: "#f87171",
                  cursor: "pointer",
                  padding: "4px"
                },
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 16 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
                  lineNumber: 175,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
                lineNumber: 165,
                columnNumber: 15
              },
              this
            )
          ]
        },
        cocktail.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
          lineNumber: 149,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
        lineNumber: 147,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/MixologyFallback.jsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
export {
  MixologyFallback as default
};
