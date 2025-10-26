import { u as useThemeAndLanguageContext, r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { b as RefreshCcw, R as Rnd, M as Maximize2 } from "./Board-6RvNRUqx.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { C as ChevronDown } from "./chevron-down-BMbSUoYr.js";
import { C as ChevronUp } from "./chevron-up-DnfMpAiE.js";
import { T as Trash2 } from "./trash-2-Bv0uM_qc.js";
import { S as Share2 } from "./share-2-CwZPCKwF.js";
import "./settings-CL5KYzJi.js";
const LSK = "luccca:professional-dashboard:v1";
const GRID = { cols: 4, gap: 16, rowH: 140, pad: 20 };
function getGreeting(t) {
  const now = /* @__PURE__ */ new Date();
  const hour = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, "0");
  const date = now.toLocaleDateString();
  let greeting = "";
  let emoji = "";
  if (hour >= 5 && hour < 12) {
    greeting = `${t.goodMorning}`;
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = `${t.goodAfternoon}`;
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = `${t.goodEvening}`;
    emoji = "🌙";
  } else {
    greeting = `${t.nightService}`;
    emoji = "🌃";
  }
  return { greeting, emoji, date, hour, mins };
}
const DEFAULT = [
  { id: "covers", title: "todayCovers", value: "156", color: "cyan", w: 1, h: 1, x: 0, y: 0, pinned: true },
  { id: "food-cost", title: "foodCost", value: "28%", color: "rose", w: 1, h: 1, x: 1, y: 0, pinned: true },
  { id: "labor", title: "laborCost", value: "32%", color: "emerald", w: 1, h: 1, x: 2, y: 0, pinned: true },
  { id: "orders", title: "activeOrders", value: "24", color: "rose", w: 1, h: 1, x: 3, y: 0, pinned: true },
  { id: "kitchen", title: "kitchenStatus", value: "89%", color: "violet", w: 1, h: 1, x: 0, y: 1, pinned: true },
  { id: "staff", title: "staffOnDuty", value: "18", color: "blue", w: 1, h: 1, x: 1, y: 1, pinned: true },
  { id: "alerts", title: "systemAlerts", value: "3", color: "rose", w: 1, h: 1, x: 2, y: 1, pinned: true },
  { id: "revenue", title: "liveRevenue", value: "$4.2K", color: "emerald", w: 1, h: 1, x: 3, y: 1, pinned: true }
];
const colorMap = {
  cyan: { primary: "#00a8cc", secondary: "#00d9ff", chart: "#00d9ff", glow: "rgba(0, 217, 255, 0.2)" },
  blue: { primary: "#0066cc", secondary: "#3b82f6", chart: "#3b82f6", glow: "rgba(59, 130, 246, 0.2)" },
  emerald: { primary: "#059669", secondary: "#10b981", chart: "#10b981", glow: "rgba(16, 185, 129, 0.2)" },
  rose: { primary: "#e11d48", secondary: "#f43f5e", chart: "#f43f5e", glow: "rgba(244, 63, 94, 0.2)" },
  violet: { primary: "#7c3aed", secondary: "#a78bfa", chart: "#a78bfa", glow: "rgba(167, 139, 250, 0.2)" }
};
function ProfessionalDashboard() {
  const { theme, themeMode, t, getCSSVariables } = useThemeAndLanguageContext();
  const containerRef = reactExports.useRef(null);
  const [cards, setCards] = reactExports.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LSK) || "null");
      return saved ?? DEFAULT;
    } catch {
      return DEFAULT;
    }
  });
  const [z, setZ] = reactExports.useState(10);
  const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */ new Date());
  const colors = theme.colors;
  reactExports.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem(LSK, JSON.stringify(cards));
  }, [cards]);
  const bringToFront = (id) => {
    setCards((cs) => cs.map((c) => c.id === id ? { ...c, z: z + 1 } : c));
    setZ((n) => n + 1);
  };
  const update = (id, patch) => setCards((cs) => cs.map((c) => c.id === id ? { ...c, ...patch } : c));
  const remove = (id) => setCards((cs) => cs.filter((c) => c.id !== id));
  const reset = () => setCards(DEFAULT);
  const addCard = () => {
    const id = "w-" + Math.random().toString(36).slice(2, 8);
    const lastY = Math.max(...cards.map((c) => c.y + c.h), 0);
    setCards(
      (cs) => cs.concat([
        {
          id,
          title: "New Widget",
          value: "0",
          color: "cyan",
          w: 1,
          h: 1,
          x: 0,
          y: lastY + 1,
          pinned: true
        }
      ])
    );
  };
  const gridToPx = (card, containerWidth) => {
    const { cols, gap, pad, rowH } = GRID;
    const colW = (containerWidth - pad * 2 - gap * (cols - 1)) / cols;
    const x = pad + card.x * (colW + gap);
    const y = pad + card.y * (rowH + gap);
    const w = card.w * colW + Math.max(0, card.w - 1) * gap;
    const h = card.h * rowH + Math.max(0, card.h - 1) * gap;
    return { x, y, w, h };
  };
  const pxToGrid = (px, containerWidth) => {
    const { cols, gap, pad, rowH } = GRID;
    const colW = (containerWidth - pad * 2 - gap * (cols - 1)) / cols;
    const x = Math.max(0, Math.min(cols - 1, Math.round((px.x - pad) / (colW + gap))));
    const y = Math.max(0, Math.round((px.y - pad) / (rowH + gap)));
    const w = Math.max(1, Math.min(cols - x, Math.round((px.w + gap / 2) / (colW + gap))));
    const h = Math.max(1, Math.round((px.h + gap / 2) / (rowH + gap)));
    return { x, y, w, h };
  };
  const { greeting, emoji, date, hour, mins } = getGreeting(t);
  const cssVars = getCSSVariables();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full flex flex-col overflow-hidden",
      style: {
        ...cssVars,
        backgroundColor: colors.bg.primary,
        backgroundImage: theme.mode === "light" ? `radial-gradient(1400px 700px at 40% -15%, ${colors.border.primary}, transparent 65%), 
               radial-gradient(1000px 600px at 85% 5%, ${colors.border.secondary}, transparent 70%)` : `radial-gradient(1400px 700px at 40% -15%, ${colors.border.primary}, transparent 65%), 
               radial-gradient(1000px 600px at 85% 5%, ${colors.border.secondary}, transparent 70%)`
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "flex-shrink-0 px-6 py-6 border-b",
            style: {
              borderColor: colors.border.secondary,
              backgroundColor: colors.bg.secondary,
              backdropFilter: "blur(10px)"
            },
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-4xl", children: emoji }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                    lineNumber: 169,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "h1",
                    {
                      className: "text-3xl font-bold tracking-tight",
                      style: { color: colors.text.primary },
                      children: [
                        greeting,
                        ", ",
                        t.chef
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                      lineNumber: 170,
                      columnNumber: 15
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                  lineNumber: 168,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { color: colors.text.secondary, fontSize: "14px" }, children: [
                  date,
                  " • ",
                  hour,
                  ":",
                  mins
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                  lineNumber: 177,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { color: colors.text.tertiary, fontSize: "13px", marginTop: "4px" }, children: [
                  t.dragPanels,
                  " • ",
                  t.pinToGrid,
                  " �� ",
                  t.popOut
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                  lineNumber: 180,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                lineNumber: 167,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: addCard,
                    className: "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    style: {
                      color: colors.text.invert,
                      backgroundColor: colors.primary,
                      boxShadow: `0 0 20px ${colors.primary}33`
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.backgroundColor = colors.secondary;
                      e.currentTarget.style.boxShadow = `0 0 30px ${colors.secondary}44`;
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.boxShadow = `0 0 20px ${colors.primary}33`;
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 16 }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                        lineNumber: 203,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", children: t.add }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                        lineNumber: 204,
                        columnNumber: 15
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                    lineNumber: 186,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: reset,
                    className: "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    style: {
                      color: colors.text.secondary,
                      backgroundColor: colors.border.secondary,
                      border: `1px solid ${colors.border.primary}`
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RefreshCcw, { size: 16 }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                        lineNumber: 216,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", children: t.reset }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                        lineNumber: 217,
                        columnNumber: 15
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                    lineNumber: 207,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                lineNumber: 185,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
              lineNumber: 166,
              columnNumber: 9
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
            lineNumber: 158,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto relative", style: { backgroundColor: colors.bg.primary }, children: cards.map((card) => {
          const cardColor = colorMap[card.color] || colorMap.cyan;
          const pos = gridToPx(card, containerRef.current?.offsetWidth || 1e3);
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Rnd,
            {
              position: { x: pos.x, y: pos.y },
              size: { width: pos.w, height: pos.h },
              onDragStop: (e, d) => {
                const newGrid = pxToGrid(
                  { x: d.x, y: d.y, w: pos.w, h: pos.h },
                  containerRef.current?.offsetWidth || 1e3
                );
                update(card.id, { x: newGrid.x, y: newGrid.y });
              },
              onResizeStop: (e, direction, ref, delta, position) => {
                const newGrid = pxToGrid(
                  { x: position.x, y: position.y, w: ref.offsetWidth, h: ref.offsetHeight },
                  containerRef.current?.offsetWidth || 1e3
                );
                update(card.id, { ...newGrid });
              },
              onMouseDown: () => bringToFront(card.id),
              style: {
                zIndex: card.z || z
              },
              bounds: false,
              enableResizing: true,
              disableDragging: !card.pinned,
              className: "group",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  className: "w-full h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300",
                  style: {
                    backgroundColor: colors.bg.panel,
                    border: themeMode === "dark" ? `2px solid ${cardColor.primary}` : `2px solid #000000`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: themeMode === "dark" ? `
                      0 0 12px ${cardColor.primary},
                      0 0 24px ${cardColor.primary},
                      0 0 36px ${cardColor.primary},
                      0 4px 12px rgba(0,0,0,0.4)
                    ` : `0 8px 24px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.08)`
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.boxShadow = themeMode === "dark" ? `0 0 30px ${cardColor.primary}99, 0 0 60px ${cardColor.primary}77, 0 8px 24px rgba(0,0,0,0.4), inset 0 0 20px ${cardColor.primary}44` : `0 8px 24px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.08)`;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.boxShadow = themeMode === "dark" ? `0 0 20px ${cardColor.primary}99, 0 0 40px ${cardColor.primary}66, 0 4px 12px rgba(0,0,0,0.3), inset 0 0 20px ${cardColor.primary}33` : `0 6px 20px rgba(0,0,0,0.25), inset 0 0 20px rgba(0,0,0,0.05)`;
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "div",
                      {
                        className: "flex items-center px-3 py-2 border-b gap-1",
                        style: {
                          borderColor: colors.border.secondary,
                          height: "32px",
                          display: "flex",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          overflow: "hidden"
                        },
                        "data-rnd-handle": true,
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-0.5 flex-shrink-0", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "button",
                              {
                                onClick: () => update(card.id, { h: card.h === 0 ? 1 : 0 }),
                                className: "p-0.5 hover:opacity-75 transition-opacity",
                                style: { color: colors.text.secondary },
                                title: t.minimize,
                                children: card.h === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 16 }, void 0, false, {
                                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                  lineNumber: 308,
                                  columnNumber: 39
                                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { size: 16 }, void 0, false, {
                                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                  lineNumber: 308,
                                  columnNumber: 67
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                lineNumber: 302,
                                columnNumber: 21
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "button",
                              {
                                onClick: () => remove(card.id),
                                className: "p-0.5 hover:opacity-75 transition-opacity",
                                style: { color: colors.text.secondary },
                                title: t.close,
                                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { size: 14 }, void 0, false, {
                                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                  lineNumber: 318,
                                  columnNumber: 23
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                lineNumber: 312,
                                columnNumber: 21
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                            lineNumber: 300,
                            columnNumber: 19
                          }, this),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "span",
                            {
                              className: "font-semibold text-xs truncate mx-2",
                              style: {
                                color: colors.text.primary,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                minWidth: 0,
                                flex: "1 1 auto"
                              },
                              children: t[card.title] || card.title
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                              lineNumber: 323,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-0.5 flex-shrink-0", children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "button",
                              {
                                onClick: () => update(card.id, { pinned: !card.pinned }),
                                className: "p-0.5 hover:opacity-75 transition-opacity",
                                style: { color: colors.text.secondary },
                                title: card.pinned ? t.pinToGrid : t.dragPanels,
                                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Maximize2, { size: 14 }, void 0, false, {
                                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                  lineNumber: 346,
                                  columnNumber: 23
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                lineNumber: 340,
                                columnNumber: 21
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                              "button",
                              {
                                className: "p-0.5 hover:opacity-75 transition-opacity",
                                style: { color: colors.text.secondary },
                                title: t.popOut,
                                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Share2, { size: 14 }, void 0, false, {
                                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                  lineNumber: 355,
                                  columnNumber: 23
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                                lineNumber: 350,
                                columnNumber: 21
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                            lineNumber: 338,
                            columnNumber: 19
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                        lineNumber: 287,
                        columnNumber: 17
                      },
                      this
                    ),
                    card.h > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 flex flex-col items-center justify-center p-4 overflow-hidden", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "div",
                        {
                          className: "text-4xl font-bold",
                          style: { color: cardColor.primary },
                          children: card.value
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                          lineNumber: 363,
                          columnNumber: 21
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "div",
                        {
                          className: "text-xs mt-2 text-center opacity-60",
                          style: { color: colors.text.secondary },
                          children: card.id
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                          lineNumber: 369,
                          columnNumber: 21
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                      lineNumber: 362,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
                  lineNumber: 257,
                  columnNumber: 15
                },
                this
              )
            },
            card.id,
            false,
            {
              fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
              lineNumber: 230,
              columnNumber: 13
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
          lineNumber: 224,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/ProfessionalDashboard.jsx",
      lineNumber: 143,
      columnNumber: 5
    },
    this
  );
}
export {
  ProfessionalDashboard as default
};
