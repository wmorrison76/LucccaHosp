import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const KEY = "lu:connections:v1";
const PROVIDERS = [
  { id: "toast", name: "Toast POS" },
  { id: "square", name: "Square for Restaurants" },
  { id: "lightspeed", name: "Lightspeed Restaurant" },
  { id: "touchbistro", name: "TouchBistro" },
  { id: "clover", name: "Clover" },
  { id: "revel", name: "Revel Systems" },
  { id: "eposnow", name: "Epos Now" },
  { id: "lavu", name: "Lavu" },
  { id: "spoton", name: "SpotOn" },
  { id: "shopify", name: "Shopify POS" }
];
function AdminConnections({ onClose }) {
  const [list, setList] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = reactExports.useState({ provider: "toast", label: "Main Outlet", apiKey: "", locationId: "" });
  reactExports.useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(list));
  }, [list]);
  const add = () => {
    if (!draft.apiKey.trim()) return alert("API Key required");
    const id = `${draft.provider}:${(draft.label || "").trim() || "Default"}`;
    const item = { id, ...draft };
    setList((arr) => {
      const exists = arr.some((x) => x.id === id);
      return exists ? arr.map((x) => x.id === id ? item : x) : arr.concat(item);
    });
    alert("Saved. Widgets can now use this connection.");
  };
  const test = async () => {
    await new Promise((r) => setTimeout(r, 400));
    alert("Connection looks good (simulated).");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    zIndex: 1500,
    background: "rgba(0,0,0,.45)",
    backdropFilter: "blur(3px)"
  }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    width: 600,
    borderRadius: 16,
    padding: 16,
    background: "linear-gradient(180deg, rgba(10,16,28,.96), rgba(10,16,28,.9))",
    border: "1px solid rgba(22,224,255,.28)",
    boxShadow: "0 30px 100px rgba(0,0,0,.5), 0 0 22px rgba(22,224,255,.16), inset 0 0 0 1px rgba(255,255,255,.05)"
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: 900, fontSize: 18 }, children: "Admin · Connections" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onClose, className: "dw-btn px-2 py-1 rounded", children: "Close" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 55,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
      lineNumber: 53,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid", style: { gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Provider" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 60,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { className: "dw-input", value: draft.provider, onChange: (e) => setDraft({ ...draft, provider: e.target.value }), children: PROVIDERS.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: p.id, children: p.name }, p.id, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 62,
          columnNumber: 34
        }, this)) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 61,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 59,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Label" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 66,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: draft.label, onChange: (e) => setDraft({ ...draft, label: e.target.value }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 67,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", style: { gridColumn: "1/-1" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "API Key / Token" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 70,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: draft.apiKey, onChange: (e) => setDraft({ ...draft, apiKey: e.target.value }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 71,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Location / Store ID" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: draft.locationId, onChange: (e) => setDraft({ ...draft, locationId: e.target.value }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: test, children: "Test" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn dw-btn--primary px-3 py-1 rounded", onClick: add, children: "Save" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 79,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
      lineNumber: 58,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "opacity-80 text-sm mb-1", children: "Saved connections" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
        list.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "opacity-60 text-sm", children: "None yet." }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
          lineNumber: 86,
          columnNumber: 35
        }, this),
        list.map((x) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "flex items-center justify-between",
            style: { padding: "8px 10px", border: "1px solid rgba(22,224,255,.2)", borderRadius: 10 },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: x.label }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
                  lineNumber: 91,
                  columnNumber: 19
                }, this),
                " · ",
                x.provider,
                " · ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "opacity-80", children: x.locationId || "—" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
                  lineNumber: 91,
                  columnNumber: 53
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
                lineNumber: 90,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  className: "dw-btn px-2 py-1 rounded",
                  onClick: () => setList((arr) => arr.filter((i) => i.id !== x.id)),
                  children: "Remove"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
                  lineNumber: 93,
                  columnNumber: 17
                },
                this
              )
            ]
          },
          x.id,
          true,
          {
            fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
            lineNumber: 88,
            columnNumber: 15
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
        lineNumber: 85,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
      lineNumber: 83,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
    lineNumber: 47,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdminConnections.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}
export {
  AdminConnections as default
};
