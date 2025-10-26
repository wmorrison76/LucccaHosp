import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const LSK = "lu:home:widgets";
function useJitter(base, spread = 0.02, interval = 1500) {
  const [v, setV] = reactExports.useState(base);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      const n = base * (1 + (Math.random() * 2 - 1) * spread);
      setV(Math.max(0, n));
    }, interval);
    return () => clearInterval(t);
  }, [base, spread, interval]);
  return v;
}
function MiniSpark({ points = 20 }) {
  const values = reactExports.useMemo(() => Array.from({ length: points }, () => 0), []);
  const [arr, setArr] = reactExports.useState(values);
  reactExports.useEffect(() => {
    const t = setInterval(() => setArr((a) => a.slice(1).concat([Math.random()])), 500);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { viewBox: "0 0 100 28", className: "w-full h-14 opacity-80", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "polyline",
      {
        fill: "url(#g)",
        stroke: "rgba(22,224,255,.8)",
        strokeWidth: "1.5",
        points: arr.map((v, i) => `${i / (arr.length - 1) * 100},${28 - v * 24}`).join(" ")
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 29,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("defs", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("linearGradient", { id: "g", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "0", stopColor: "rgba(22,224,255,.18)" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "1", stopColor: "rgba(22,224,255,0)" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 36,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 34,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 33,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
function CoversWidget() {
  const v = useJitter(1377, 0.015, 1200);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-white", children: Math.round(v).toLocaleString() }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MiniSpark, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}
function FoodWidget() {
  const v = useJitter(0.275, 0.04, 1600);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-white", children: [
      (v * 100).toFixed(1),
      "%"
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-2 bg-white/10 rounded", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-2 rounded bg-cyan-400/80", style: { width: `${Math.min(100, v * 100)}%` } }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 59,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-200/70 mt-1", children: "Target: 28–30%" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 61,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
function LaborWidget() {
  const v = useJitter(0.277, 0.035, 1700);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-black text-white", children: [
      (v * 100).toFixed(1),
      "%"
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-2 bg-white/10 rounded", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-2 rounded bg-cyan-400/80", style: { width: `${Math.min(100, v * 100)}%` } }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 72,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-200/70 mt-1", children: "Auto-updates from Scheduler" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 74,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
function OutletsWidget() {
  const ok = 6, attn = 4;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-block w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,.9)]" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-3xl font-black text-white", children: ok }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-200/60 text-xl", children: "/" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 87,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-block w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,.9)]" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-3xl font-black text-white", children: attn }, void 0, false, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 88,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
function PeopleWidget() {
  const today = ["Ava", "Ben", "Cam", "Diego", "Eve"];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
    today.map((n) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "px-2 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-100/90", children: n }, n, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 101,
      columnNumber: 9
    }, this)),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "ml-auto px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/50 text-cyan-100",
        onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "scheduling" } })),
        children: "Open Scheduler"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 103,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 99,
    columnNumber: 5
  }, this);
}
const WIDGETS = {
  covers: { title: "Today's Covers", Component: CoversWidget, minW: 3 },
  food: { title: "Food Cost", Component: FoodWidget, minW: 3 },
  labor: { title: "Labor %", Component: LaborWidget, minW: 3 },
  outlets: { title: "Outlet Health", Component: OutletsWidget, minW: 3 },
  people: { title: "Who's Scheduled", Component: PeopleWidget, minW: 6 }
};
function greet() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 4) return "Still up, Chef?";
  if (h < 12) return "Good Morning, Chef.";
  if (h < 17) return "Good Afternoon, Chef.";
  if (h < 22) return "Good Evening, Chef.";
  return "Late Night Mode, Chef.";
}
function DashboardWelcome() {
  const [enabled, setEnabled] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LSK) || "null") || Object.keys(WIDGETS);
    } catch {
      return Object.keys(WIDGETS);
    }
  });
  reactExports.useEffect(() => localStorage.setItem(LSK, JSON.stringify(enabled)), [enabled]);
  const toggle = (id) => setEnabled((arr) => arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  const title = reactExports.useMemo(greet, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "dw-title text-4xl sm:text-5xl font-extrabold tracking-tight mb-2", children: title }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "opacity-80 mb-4", children: "Live pulse • covers, costs, labor and staff status." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 flex flex-wrap gap-2", children: Object.entries(WIDGETS).map(([id, meta]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: `px-3 py-1 rounded-md border ${enabled.includes(id) ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-100" : "bg-white/5 border-white/10 text-white/70"}`,
        onClick: () => toggle(id),
        children: [
          enabled.includes(id) ? "✓ " : "",
          meta.title
        ]
      },
      id,
      true,
      {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 155,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 153,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-4 md:grid-cols-3", children: enabled.map((id) => {
      const { Component, title: title2 } = WIDGETS[id];
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative glass-card p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "glass-sheen" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
          lineNumber: 173,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-cyan-100/90 mb-2", children: title2 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
          lineNumber: 174,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Component, {}, void 0, false, {
          fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
          lineNumber: 175,
          columnNumber: 15
        }, this)
      ] }, id, true, {
        fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
        lineNumber: 172,
        columnNumber: 13
      }, this);
    }) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
      lineNumber: 168,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/DashboardWelcome.jsx",
    lineNumber: 146,
    columnNumber: 5
  }, this);
}
export {
  DashboardWelcome as default
};
