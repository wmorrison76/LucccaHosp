const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/KitchenLibraryTabs-CHST8pPN.js","assets/index-DfBvRGLH.js","assets/DoubleTabs-D5pTPMaE.js","assets/DoubleTabs-CAztkCRW.css","assets/Board-6RvNRUqx.js","assets/settings-CL5KYzJi.js","assets/PastryLibrary-D6iaoqTl.js","assets/MixologyTabs-BJ671MGr.js","assets/WhiteboardPanel-Bae32T6d.js","assets/pencil-BDNSeP0d.js","assets/eraser-DWEha_hD.js","assets/Dashboard-DnBtDXWG.js"])))=>i.map(i=>d[i]);
import { r as reactExports, R as React, j as jsxDevRuntimeExports, _ as __vitePreload } from "./index-DfBvRGLH.js";
import { m as mixologyIcon, p as pastryIcon, k as kitchenIcon, b as RefreshCcw, S as SquareStack, I as Image, R as Rnd$1, a as RND_NS, X, c as Minus, M as Maximize2, E as ExternalLink, H as House } from "./Board-6RvNRUqx.js";
import { c as createLucideIcon, L as LayoutDashboard, S as Settings } from "./settings-CL5KYzJi.js";
import { C as ChevronUp } from "./chevron-up-DnfMpAiE.js";
import { C as ChevronDown } from "./chevron-down-BMbSUoYr.js";
import { S as StickyNote } from "./sticky-note-BIaj4bqy.js";
import { P as Pin } from "./pin-6qKrgLG3.js";
import { P as PinOff } from "./pin-off-CloOA-8w.js";
import { M as Moon, S as Sun } from "./sun-Dkh7Vwto.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 15 4 4", key: "lnac28" }],
  [
    "path",
    {
      d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
      key: "nlhkjb"
    }
  ],
  ["path", { d: "m5 8 4 4", key: "j6kj7e" }]
];
const Magnet = createLucideIcon("magnet", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 19H5v-6", key: "8awifj" }],
  ["path", { d: "M13 5h6v6", key: "7voy1q" }],
  ["path", { d: "M19 5 5 19", key: "wwaj1z" }]
];
const MoveDiagonal = createLucideIcon("move-diagonal", __iconNode);
const Rnd = Rnd$1 ?? void 0 ?? RND_NS;
const KitchenLibraryTabs = React.lazy(() => __vitePreload(() => import("./KitchenLibraryTabs-CHST8pPN.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0));
const PastryLibrary = React.lazy(() => __vitePreload(() => import("./PastryLibrary-D6iaoqTl.js"), true ? __vite__mapDeps([6,1,2,3]) : void 0));
const Mixology = React.lazy(() => __vitePreload(() => import("./MixologyTabs-BJ671MGr.js"), true ? __vite__mapDeps([7,1]) : void 0));
const WhiteboardPanel = React.lazy(() => __vitePreload(() => import("./WhiteboardPanel-Bae32T6d.js"), true ? __vite__mapDeps([8,1,9,5,10]) : void 0));
const DashboardPanel = React.lazy(async () => {
  try {
    const mod = await __vitePreload(() => import("./Dashboard-DnBtDXWG.js"), true ? __vite__mapDeps([11,1]) : void 0);
    return mod;
  } catch {
    const fallback = await __vitePreload(() => import("./WhiteboardPanel-Bae32T6d.js"), true ? __vite__mapDeps([8,1,9,5,10]) : void 0);
    return fallback;
  }
});
const PANEL_REGISTRY = {
  dashboard: { title: "Dashboard", Component: DashboardPanel, icon: null },
  culinary: { title: "Kitchen Library", Component: KitchenLibraryTabs, icon: kitchenIcon },
  pastry: { title: "Baking & Pastry", Component: PastryLibrary, icon: pastryIcon },
  mixology: { title: "Mixology", Component: Mixology, icon: mixologyIcon },
  whiteboard: { title: "Whiteboard", Component: WhiteboardPanel, icon: null }
};
let zCounter = 10;
const genToken = () => Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
function PanelDockBar({ items, onRestore, position = "left" }) {
  if (!items.length) return null;
  const base = "panel-dock fixed z-[1100] rounded-xl backdrop-blur-md border shadow-xl pointer-events-auto";
  const axisClass = position === "left" || position === "right" ? "flex-col" : "flex-row";
  const posStyle = position === "bottom" ? { left: "50%", transform: "translateX(-50%)", bottom: "16px" } : position === "top" ? { left: "50%", transform: "translateX(-50%)", top: "16px" } : position === "left" ? { left: "53px", top: "50%", transform: "translateY(-50%)" } : { right: "16px", top: "50%", transform: "translateY(-50%)" };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `${base} panel-dock--skin flex ${axisClass} items-center gap-2 px-2 py-1`, style: posStyle, children: items.map(({ id, title, icon }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "panel-dock__item", title: `Restore ${title}`, onClick: () => onRestore(id), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: icon || "/favicon.ico", alt: "" }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
    lineNumber: 79,
    columnNumber: 11
  }, this) }, id, false, {
    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
    lineNumber: 78,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
}
const LS_KEYS = {
  autoDock: "lu:autoDock",
  dockPos: "lu:dockPos",
  allowOffscreen: "lu:allowOffscreen",
  toolbarPinned: "lu:toolbarPinned"
};
function Board() {
  const layerRef = reactExports.useRef(null);
  const [windows, setWindows] = reactExports.useState([]);
  const [activeId, setActiveId] = reactExports.useState(null);
  const [autoDock, setAutoDock] = reactExports.useState(
    () => localStorage.getItem(LS_KEYS.autoDock)?.toLowerCase() === "true"
  );
  const [dockPos, setDockPos] = reactExports.useState(
    () => localStorage.getItem(LS_KEYS.dockPos) || "left"
  );
  const [allowOffscreen, setAllowOffscreen] = reactExports.useState(
    () => (localStorage.getItem(LS_KEYS.allowOffscreen) ?? "true").toLowerCase() !== "false"
  );
  const [toolbarPinned, setToolbarPinned] = reactExports.useState(
    () => localStorage.getItem(LS_KEYS.toolbarPinned)?.toLowerCase() === "true"
  );
  const [toolbarVisible, setToolbarVisible] = reactExports.useState(true);
  reactExports.useEffect(() => localStorage.setItem(LS_KEYS.autoDock, String(autoDock)), [autoDock]);
  reactExports.useEffect(() => localStorage.setItem(LS_KEYS.dockPos, dockPos), [dockPos]);
  reactExports.useEffect(() => localStorage.setItem(LS_KEYS.allowOffscreen, String(allowOffscreen)), [allowOffscreen]);
  reactExports.useEffect(() => localStorage.setItem(LS_KEYS.toolbarPinned, String(toolbarPinned)), [toolbarPinned]);
  const [isDark, setIsDark] = reactExports.useState(document.documentElement.classList.contains("dark"));
  reactExports.useEffect(() => {
    const m = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    m.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => m.disconnect();
  }, []);
  const bringToFront = reactExports.useCallback((id) => {
    zCounter += 1;
    setActiveId(id);
    setWindows((w) => w.map((win) => win.id === id ? { ...win, z: zCounter } : win));
  }, []);
  const closeWindow = reactExports.useCallback((id) => {
    setWindows((w) => w.filter((p) => p.id !== id));
    setActiveId((aid) => aid === id ? null : aid);
  }, []);
  const toggleMinimize = reactExports.useCallback((id) => {
    setWindows((w) => w.map((p) => p.id === id ? { ...p, minimized: !p.minimized, maximized: false } : p));
  }, []);
  const toggleMaximize = reactExports.useCallback((id) => {
    setWindows(
      (w) => w.map((p) => {
        if (p.id !== id) return p;
        if (!p.maximized) {
          const rect = layerRef.current?.getBoundingClientRect?.();
          const W = Math.max(rect?.width ?? 0, window.innerWidth);
          const H = Math.max(rect?.height ?? 0, window.innerHeight);
          const marginX = 90, marginY = 76;
          return {
            ...p,
            prevRect: { x: p.x, y: p.y, width: p.width, height: p.height },
            x: Math.max(8, marginX),
            y: Math.max(8, marginY),
            width: Math.max(640, W - marginX * 2),
            height: Math.max(400, H - marginY * 2),
            maximized: true,
            minimized: false
          };
        }
        const r = p.prevRect ?? { x: 120, y: 80, width: 720, height: 520 };
        return { ...p, ...r, maximized: false, prevRect: void 0 };
      })
    );
  }, []);
  const cascadePos = reactExports.useMemo(() => {
    let n = 0;
    return () => {
      const gap = 32;
      const x = 120 + n * gap % 280;
      const y = 80 + n * gap % 220;
      n += 1;
      return { x, y };
    };
  }, []);
  const genWinId = (panelId, allowDuplicate) => allowDuplicate ? `${panelId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` : panelId;
  const openPanelById = reactExports.useCallback(
    (panelId, opts = {}) => {
      const reg = PANEL_REGISTRY[panelId];
      if (!reg) return;
      const allowDuplicate = !!opts.allowDuplicate;
      const newIdCandidate = genWinId(panelId, allowDuplicate);
      setWindows((w) => {
        const found = w.find((p) => p.id === panelId);
        if (found && !allowDuplicate) {
          zCounter += 1;
          return w.map(
            (p) => p.id === panelId ? { ...p, minimized: false, z: zCounter } : p
          );
        }
        const { x, y } = cascadePos();
        zCounter += 1;
        const winToken = genToken();
        return w.concat([{
          id: newIdCandidate,
          title: opts.title || reg.title,
          icon: reg.icon ?? null,
          z: zCounter,
          x,
          y,
          width: 840,
          height: 560,
          minimized: false,
          // <- do NOT auto-dock new panels
          maximized: false,
          props: { ...opts.props || {}, winToken }
        }]);
      });
      setActiveId(newIdCandidate);
    },
    [cascadePos]
  );
  reactExports.useEffect(() => {
    const handler = (e) => {
      const d = e.detail || {};
      if (!d.id) return;
      openPanelById(d.id, { title: d.title, props: d.props, allowDuplicate: d.allowDuplicate });
    };
    window.addEventListener("open-panel", handler);
    return () => window.removeEventListener("open-panel", handler);
  }, [openPanelById]);
  reactExports.useEffect(() => {
    const closeByToken = (e) => {
      const tok = e.detail?.token;
      if (!tok) return;
      setWindows((w) => w.filter((p) => p.props?.winToken !== tok));
    };
    window.addEventListener("board-close-by-token", closeByToken);
    return () => window.removeEventListener("board-close-by-token", closeByToken);
  }, []);
  const dockAll = reactExports.useCallback(() => {
    setWindows((w) => w.map((p) => ({ ...p, minimized: true, maximized: false })));
  }, []);
  const restoreAll = reactExports.useCallback(() => {
    setWindows((w) => w.map((p) => ({ ...p, minimized: false })));
  }, []);
  const resetLayout = reactExports.useCallback(() => {
    setWindows([]);
    setActiveId(null);
  }, []);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      const k = e.key.toLowerCase();
      if (cmd && e.shiftKey && k === "h") {
        e.preventDefault();
        dockAll();
      }
      if (cmd && e.shiftKey && k === "r") {
        e.preventDefault();
        restoreAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dockAll, restoreAll]);
  const dockItems = windows.filter((w) => w.minimized).map((w) => ({ id: w.id, title: w.title, icon: w.icon }));
  const bringToFrontAndRestore = reactExports.useCallback((id) => {
    setWindows((w) => w.map((p) => p.id === id ? { ...p, minimized: false } : p));
    bringToFront(id);
  }, [bringToFront]);
  reactExports.useEffect(() => {
    if (toolbarPinned) {
      setToolbarVisible(true);
      return;
    }
    let timer;
    const hide = () => {
      if (!toolbarPinned) setToolbarVisible(false);
    };
    const show = () => {
      setToolbarVisible(true);
      clearTimeout(timer);
      timer = setTimeout(hide, 1800);
    };
    const onMove = (e) => {
      const y = e.clientY, x = e.clientX, vw = window.innerWidth;
      if (y <= 60 && Math.abs(x - vw / 2) <= 260) show();
    };
    window.addEventListener("mousemove", onMove);
    timer = setTimeout(hide, 1200);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timer);
    };
  }, [toolbarPinned]);
  reactExports.useEffect(() => {
    openPanelById("dashboard", { allowDuplicate: false });
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `relative w-full h-full ${allowOffscreen ? "overflow-visible" : "overflow-hidden"} fluid-root`, children: [
    !toolbarPinned && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: [
          "fixed top-1 left-1/2 -translate-x-1/2 z-[200000]",
          "w-[22px] h-[22px] rounded-full grid place-items-center border transition",
          toolbarVisible ? "opacity-0 pointer-events-none" : "opacity-90 pointer-events-auto",
          isDark ? "bg-[rgba(10,16,28,.85)] text-cyan-200 border-cyan-300/30 shadow-[0_6px_18px_rgba(0,0,0,.45),0_0_12px_rgba(22,224,255,.25)]" : "bg-[rgba(255,255,255,.85)] text-slate-800 border-black/10 shadow-[0_4px_12px_rgba(0,0,0,.18)]"
        ].join(" "),
        "aria-label": "Show toolbar",
        title: "Show toolbar",
        onMouseEnter: () => setToolbarVisible(true),
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { viewBox: "0 0 24 24", width: "14", height: "14", "aria-hidden": "true", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fill: "currentColor", d: "M3 7h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
          lineNumber: 328,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
          lineNumber: 327,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
        lineNumber: 314,
        columnNumber: 9
      },
      this
    ),
    !toolbarPinned && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "fixed top-0 left-1/2 -translate-x-1/2 h-[12px] w-[300px] z-[999]",
        onMouseEnter: () => setToolbarVisible(true)
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
        lineNumber: 335,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: [
          "board-toolbar board-toolbar--icons pointer-events-auto fixed top-4 left-1/2 -translate-x-1/2 z-[1200] transition-all duration-200",
          toolbarVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        ].join(" "),
        onMouseEnter: () => setToolbarVisible(true),
        onMouseLeave: () => {
          if (!toolbarPinned) setToolbarVisible(false);
        },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-toolbar relative flex items-center gap-2 px-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "etb-btn", title: "Reset layout", onClick: resetLayout, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RefreshCcw, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 352,
            columnNumber: 82
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 352,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "etb-btn", title: "Dock all (⌘/Ctrl+⇧+H)", onClick: dockAll, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SquareStack, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 353,
            columnNumber: 87
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 353,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "etb-btn", title: "Restore docked (⌘/Ctrl+⇧+R)", onClick: restoreAll, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LayoutDashboard, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 354,
            columnNumber: 96
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 354,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: `etb-btn ${autoDock ? "etb-active" : ""}`, title: `Auto-dock: ${autoDock ? "On" : "Off"}`, onClick: () => setAutoDock((v) => !v), "aria-pressed": autoDock, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Magnet, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 357,
            columnNumber: 182
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 357,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: `etb-btn ${allowOffscreen ? "etb-active" : ""}`, title: `Off-screen drag: ${allowOffscreen ? "On" : "Off"}`, onClick: () => setAllowOffscreen((v) => !v), "aria-pressed": allowOffscreen, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MoveDiagonal, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 358,
            columnNumber: 212
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 358,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "etb-btn etb-seg", title: "Dock position", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: dockPos === "top" ? "seg-on" : "", onClick: () => setDockPos("top"), "aria-label": "Dock top", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { size: 14 }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 362,
              columnNumber: 126
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 362,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: dockPos === "right" ? "seg-on" : "", onClick: () => setDockPos("right"), "aria-label": "Dock right", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 14 }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 363,
              columnNumber: 128
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 363,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: dockPos === "bottom" ? "seg-on" : "", onClick: () => setDockPos("bottom"), "aria-label": "Dock bottom", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 14 }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 364,
              columnNumber: 129
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 364,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: dockPos === "left" ? "seg-on" : "", onClick: () => setDockPos("left"), "aria-label": "Dock left", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronLeft, { size: 14 }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 365,
              columnNumber: 127
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 365,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 361,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "etb-btn",
              title: "Add sticky note to open Whiteboard(s)",
              onClick: () => window.dispatchEvent(new CustomEvent("whiteboard-add-sticky")),
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StickyNote, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 374,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 369,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "etb-btn",
              title: "Open Whiteboard",
              onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "whiteboard", allowDuplicate: true } })),
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Image, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 381,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 376,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: `etb-btn ${toolbarPinned ? "etb-active" : ""}`,
              title: toolbarPinned ? "Unpin toolbar (auto-hide)" : "Pin toolbar (always show)",
              onClick: () => setToolbarPinned((v) => !v),
              "aria-pressed": toolbarPinned,
              children: toolbarPinned ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pin, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 391,
                columnNumber: 30
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PinOff, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 391,
                columnNumber: 49
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 385,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "etb-badge", title: isDark ? "Dark" : "Light", children: isDark ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Moon, { size: 14 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 395,
            columnNumber: 82
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sun, { size: 14 }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 395,
            columnNumber: 102
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
            lineNumber: 395,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "tb-grip",
              title: toolbarPinned ? "Toolbar pinned" : "Show toolbar",
              onClick: () => setToolbarVisible(true),
              "aria-label": "Show toolbar",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { viewBox: "0 0 24 24", width: "14", height: "14", "aria-hidden": "true", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { fill: "currentColor", d: "M3 7h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 405,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 404,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 398,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
          lineNumber: 350,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
        lineNumber: 342,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref: layerRef,
        className: "pane-layer absolute inset-0",
        style: { overflow: allowOffscreen ? "visible" : "hidden" },
        children: windows.map((win) => {
          const baseKey = win.id.includes("-") ? win.id.split("-")[0] : win.id;
          const entry = PANEL_REGISTRY[baseKey];
          if (!entry) return null;
          const Component = entry.Component;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Rnd,
            {
              position: { x: win.x, y: win.y },
              size: { width: win.width, height: win.height },
              bounds: allowOffscreen ? void 0 : ".pane-layer",
              minWidth: 420,
              minHeight: 280,
              dragHandleClassName: "panel-header",
              onDragStart: () => bringToFront(win.id),
              onResizeStart: () => bringToFront(win.id),
              onDragStop: (_, d) => {
                setWindows((w) => w.map((p) => p.id === win.id ? { ...p, x: d.x, y: d.y } : p));
              },
              onResizeStop: (_, __, ref, _delta, pos) => {
                setWindows(
                  (w) => w.map(
                    (p) => p.id === win.id ? { ...p, width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y } : p
                  )
                );
              },
              enableResizing: !win.maximized && !win.minimized,
              disableDragging: win.minimized,
              style: { zIndex: win.z, display: win.minimized ? "none" : "block" },
              className: [
                "panel-window resize-panel",
                activeId === win.id ? "is-focused" : "",
                win.minimized ? "is-min" : "",
                win.maximized ? "is-max" : ""
              ].join(" "),
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full flex flex-col", onMouseDownCapture: () => bringToFront(win.id), children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "panel-header flex items-center justify-between select-none", title: "Drag to move", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dot dot-close", title: "Close", onClick: () => closeWindow(win.id), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 460,
                      columnNumber: 107
                    }, this) }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 460,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dot dot-min", title: win.minimized ? "Restore" : "Minimize to dock", onClick: () => toggleMinimize(win.id), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Minus, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 461,
                      columnNumber: 151
                    }, this) }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 461,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dot dot-restore", title: win.maximized ? "Restore size" : "Maximize", onClick: () => toggleMaximize(win.id), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Maximize2, { size: 10 }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 462,
                      columnNumber: 152
                    }, this) }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 462,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "panel-title ml-1", children: win.title }, void 0, false, {
                      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                      lineNumber: 463,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                    lineNumber: 459,
                    columnNumber: 19
                  }, this),
                  baseKey === "pastry" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 pr-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        className: "inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5",
                        title: "Tear out current tab",
                        onClick: () => window.dispatchEvent(new CustomEvent("pastry-tear-out")),
                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExternalLink, { size: 14 }, void 0, false, {
                          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                          lineNumber: 474,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                        lineNumber: 469,
                        columnNumber: 23
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        className: "inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5",
                        title: "Pastry Home",
                        onClick: () => window.dispatchEvent(new CustomEvent("pastry-home")),
                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(House, { size: 14 }, void 0, false, {
                          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                          lineNumber: 481,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                        lineNumber: 476,
                        columnNumber: 23
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        className: "inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5",
                        title: "Settings (⇧ toggles colors)",
                        onClick: (e) => {
                          const detail = { toggleColors: e.shiftKey === true };
                          window.dispatchEvent(new CustomEvent("pastry-open-settings", { detail }));
                        },
                        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 14 }, void 0, false, {
                          fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                          lineNumber: 491,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                        lineNumber: 483,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                    lineNumber: 468,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                  lineNumber: 458,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "panel-body grow overflow-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 text-xs text-gray-500", children: "Loading…" }, void 0, false, {
                  fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                  lineNumber: 499,
                  columnNumber: 39
                }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Component, { ...win.props || {} }, void 0, false, {
                  fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                  lineNumber: 500,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                  lineNumber: 499,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                  lineNumber: 498,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
                lineNumber: 456,
                columnNumber: 15
              }, this)
            },
            win.id,
            false,
            {
              fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
              lineNumber: 424,
              columnNumber: 13
            },
            this
          );
        })
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
        lineNumber: 412,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PanelDockBar, { items: dockItems, onRestore: bringToFrontAndRestore, position: dockPos }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
      lineNumber: 510,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/Dashboard.jsx",
    lineNumber: 311,
    columnNumber: 5
  }, this);
}
export {
  Board as default
};
