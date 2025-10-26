import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const STORAGE_KEY = "tabs:pastry@v1";
const UNIVERSE = [
  { id: "cake-builder", label: "Cake Builder", color: "#E2A23B" },
  { id: "cake-orders", label: "Cake Orders", color: "#D97A6D" },
  { id: "echocanvas", label: "EchoCanvas", color: "#5AAAE0" },
  // renamed from "EchoCanva"
  { id: "chocolates", label: "Chocolates & Candies", color: "#8B5CF6" },
  { id: "breads", label: "Breads & Doughs", color: "#B7791F" },
  { id: "inventory", label: "Inventory", color: "#06B6D4" },
  { id: "recipes", label: "Recipes", color: "#0EA5E9" },
  { id: "new-recipe", label: "New Recipe", color: "#22C55E" },
  { id: "gallery", label: "Photo Gallery", color: "#F97316" },
  { id: "production", label: "Production", color: "#64748B" }
];
const byId = Object.fromEntries(UNIVERSE.map((t) => [t.id, t]));
const DEFAULT_CONFIG = {
  back: [
    "cake-builder",
    "cake-orders",
    "echocanvas",
    "chocolates",
    "breads"
  ],
  front: [
    "inventory",
    "recipes",
    "new-recipe",
    "gallery",
    "production"
  ],
  maxBack: 99,
  // per-row soft limits
  maxFront: 99
};
function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      back: Array.isArray(parsed?.back) ? parsed.back : DEFAULT_CONFIG.back,
      front: Array.isArray(parsed?.front) ? parsed.front : DEFAULT_CONFIG.front
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}
function saveConfig(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent("pastry-tabs-changed"));
}
function listMinus(all, ids) {
  const set = new Set(ids);
  return all.filter((t) => !set.has(t.id));
}
function PastrySettings() {
  const [cfg, setCfg] = reactExports.useState(loadConfig);
  reactExports.useMemo(() => cfg.back.map((id) => byId[id]).filter(Boolean), [cfg.back]);
  reactExports.useMemo(() => cfg.front.map((id) => byId[id]).filter(Boolean), [cfg.front]);
  const activeIDs = reactExports.useMemo(() => /* @__PURE__ */ new Set([...cfg.back, ...cfg.front]), [cfg.back, cfg.front]);
  const available = reactExports.useMemo(() => UNIVERSE.filter((t) => !activeIDs.has(t.id)), [activeIDs]);
  const [selAvail, setSelAvail] = reactExports.useState([]);
  const [selActive, setSelActive] = reactExports.useState([]);
  const addToRow = (row) => {
    if (!selAvail.length) return;
    const ids = selAvail;
    setCfg((c) => {
      const next = { ...c, back: [...c.back], front: [...c.front] };
      ids.forEach((id) => {
        next.back = next.back.filter((x) => x !== id);
        next.front = next.front.filter((x) => x !== id);
        if (row === "back") next.back.push(id);
        else next.front.push(id);
      });
      return next;
    });
    setSelAvail([]);
  };
  const removeSelectedActive = () => {
    if (!selActive.length) return;
    const pairs = selActive.map((tok) => tok.split(":"));
    setCfg((c) => {
      const next = { ...c, back: [...c.back], front: [...c.front] };
      pairs.forEach(([row, id]) => {
        if (row === "back") next.back = next.back.filter((x) => x !== id);
        if (row === "front") next.front = next.front.filter((x) => x !== id);
      });
      return next;
    });
    setSelActive([]);
  };
  const moveRowOfSelected = (targetRow) => {
    if (!selActive.length) return;
    const pairs = selActive.map((tok) => tok.split(":"));
    setCfg((c) => {
      const next = { ...c, back: [...c.back], front: [...c.front] };
      pairs.forEach(([row, id]) => {
        if (row === "back") next.back = next.back.filter((x) => x !== id);
        if (row === "front") next.front = next.front.filter((x) => x !== id);
        if (targetRow === "back") next.back.push(id);
        else next.front.push(id);
      });
      return next;
    });
    setSelActive((prev) => prev.map((tok) => {
      const [, id] = tok.split(":");
      return `${targetRow}:${id}`;
    }));
  };
  const reorder = (row, dir) => {
    if (!selActive.length) return;
    const selIdsInRow = selActive.filter((tok) => tok.startsWith(row + ":")).map((tok) => tok.split(":")[1]);
    if (!selIdsInRow.length) return;
    setCfg((c) => {
      const arr = [...row === "back" ? c.back : c.front];
      const indexes = selIdsInRow.map((id) => arr.indexOf(id)).filter((i) => i >= 0).sort((a, b) => a - b);
      const canMove = dir === "up" ? indexes[0] > 0 : indexes[indexes.length - 1] < arr.length - 1;
      if (!canMove) return c;
      const swap = (i, j) => {
        const t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      };
      if (dir === "up") {
        indexes.forEach((i) => swap(i, i - 1));
      } else {
        indexes.slice().reverse().forEach((i) => swap(i, i + 1));
      }
      return row === "back" ? { ...c, back: arr } : { ...c, front: arr };
    });
  };
  const onSave = () => saveConfig(cfg);
  const onReset = () => {
    setCfg(DEFAULT_CONFIG);
  };
  const renderOption = (t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: t.id, children: t.label }, t.id, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
    lineNumber: 182,
    columnNumber: 5
  }, this);
  const renderActiveOption = (row, id) => {
    const t = byId[id];
    if (!t) return null;
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: row + ":" + id, children: [
      "[",
      row === "front" ? "bottom" : "top",
      "] ",
      t.label
    ] }, row + ":" + id, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
      lineNumber: 191,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 sm:p-6 text-sm", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-semibold mb-4", children: "Baking & Pastry — Tabs Settings" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
      lineNumber: 199,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 flex flex-wrap items-end gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs mb-1", children: "Max tabs (Top row)" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 204,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "number",
            min: 1,
            className: "border rounded px-2 py-1 w-28 bg-white dark:bg-slate-900",
            value: cfg.maxBack,
            onChange: (e) => setCfg({ ...cfg, maxBack: Math.max(1, Number(e.target.value || 1)) })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 205,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 203,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block text-xs mb-1", children: "Max tabs (Bottom row)" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "number",
            min: 1,
            className: "border rounded px-2 py-1 w-28 bg-white dark:bg-slate-900",
            value: cfg.maxFront,
            onChange: (e) => setCfg({ ...cfg, maxFront: Math.max(1, Number(e.target.value || 1)) })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 215,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-auto flex gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onReset, className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5", children: "Reset to defaults" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 225,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onSave, className: "px-3 py-1.5 rounded bg-cyan-500 text-white hover:brightness-110", children: "Save" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 228,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 224,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
      lineNumber: 202,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium mb-1", children: [
          "Available (",
          available.length,
          ")"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 238,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            multiple: true,
            size: 12,
            className: "w-full border rounded p-2 bg-white dark:bg-slate-900",
            value: selAvail,
            onChange: (e) => {
              const vals = Array.from(e.target.selectedOptions).map((o) => o.value);
              setSelAvail(vals);
            },
            children: listMinus(UNIVERSE, [...cfg.back, ...cfg.front]).map(renderOption)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 239,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 237,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
            onClick: () => addToRow("back"),
            title: "Add to TOP row",
            children: "↑ add top"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 255,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg.white/5 dark:hover:bg-white/5",
            onClick: () => addToRow("front"),
            title: "Add to BOTTOM row",
            children: "add bottom ↓"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 262,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "mt-2 px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
            onClick: removeSelectedActive,
            title: "Remove from active",
            children: "remove ◀"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 269,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 254,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-rows-[auto_auto_1fr] gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: [
          "Active (",
          cfg.back.length + cfg.front.length,
          ")"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 280,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
              onClick: () => moveRowOfSelected("back"),
              title: "Move selection to TOP row",
              children: "to top row"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 284,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
              onClick: () => moveRowOfSelected("front"),
              title: "Move selection to BOTTOM row",
              children: "to bottom row"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 291,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 300,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
              onClick: () => reorder("back", "up"),
              title: "Top row: move up",
              children: "⬆ top"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 301,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg.white/5 dark:hover:bg-white/5",
              onClick: () => reorder("back", "down"),
              title: "Top row: move down",
              children: "⬇ top"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 308,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
              onClick: () => reorder("front", "up"),
              title: "Bottom row: move up",
              children: "⬆ bottom"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 315,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5",
              onClick: () => reorder("front", "down"),
              title: "Bottom row: move down",
              children: "⬇ bottom"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
              lineNumber: 322,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
          lineNumber: 283,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "select",
          {
            multiple: true,
            size: 12,
            className: "w-full border rounded p-2 bg-white dark:bg-slate-900",
            value: selActive,
            onChange: (e) => {
              const vals = Array.from(e.target.selectedOptions).map((o) => o.value);
              setSelActive(vals);
            },
            children: [
              cfg.back.map((id) => renderActiveOption("back", id)),
              cfg.front.map((id) => renderActiveOption("front", id))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
            lineNumber: 331,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
        lineNumber: 279,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
      lineNumber: 235,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastrySettings.jsx",
    lineNumber: 198,
    columnNumber: 5
  }, this);
}
export {
  PastrySettings as default
};
