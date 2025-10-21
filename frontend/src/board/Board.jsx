// frontend/src/board/Board.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import * as RND_NS from "react-rnd";
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

// Backboard (kept)
import EchoBackboard from "./EchoBackboard.jsx";

// Icons (one import only)
import {
  RefreshCcw,
  SquareStack,
  LayoutDashboard,
  GripHorizontal,
  Image as ImageIcon,
  Settings as Cog,
  X,
  Minus,
  Maximize2,
  ExternalLink,
  Home,
  CalendarDays,
  Video,
  Ruler,
  LassoSelect,
  Copy,
} from "lucide-react";

// Helper for named/default lazy exports
const lazyPick = (loader, key = "default") =>
  React.lazy(() =>
    loader().then((m) => ({ default: m?.[key] ?? m?.default ?? m }))
  );

/* ───────────────── Panels (lazy) ─��─────────────── */

// Simplified lazy-loaded panels with error handling
const safeImport = (importFn, name = 'Unknown') =>
  React.lazy(() => {
    console.log(`[safeImport] Loading panel: ${name}`);
    return importFn()
      .then(m => {
        console.log(`[safeImport] Successfully loaded: ${name}`, m);
        return m;
      })
      .catch(err => {
        console.error(`[safeImport] Failed to load ${name}:`, err);
        return {
          default: () => (
            <div style={{ padding: '20px', color: '#f87171', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Panel failed to load: {name}</div>
              <div>{String(err?.message || err)}</div>
              {err?.stack && <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>{err.stack}</div>}
            </div>
          )
        };
      });
  });

const GlowDesk           = safeImport(() => import("../components/GlowyDesk.jsx"), "GlowyDesk");
const KitchenLibraryTabs = safeImport(() => import("../components/KitchenLibraryTabs.jsx"), "KitchenLibraryTabs");
const Schedule           = safeImport(() => import("../modules/scheduling/Schedule.jsx"), "Schedule");
const EchoRecipeProPanel = safeImport(() => import("../components/EchoRecipePro/EchoRecipeProPanel.jsx"), "EchoRecipeProPanel");
const PurchasingPanel    = safeImport(() => import("../components/Purchasing/PurchasingPanel.jsx"), "PurchasingPanel");
const EchoEventStudioPanel = safeImport(() => import("../components/EchoEventStudio/EchoEventStudioPanel.jsx"), "EchoEventStudioPanel");

// Optional panels - set to null if not available
const SettingsSuite      = null;
const PastryLibrary      = null;
const Mixology           = null;
const SchedulerPanel     = Schedule;
const WidgetStudio       = null;
const PageViewer         = null;
const CakeBuilder        = null;
const WhiteboardPanel    = null;
const StickyNotePanelLazy = null;

/* ───────────── EchoDesk stub tools/panels (installed by script) ───────────── */
import CalendarOverlay   from "../echodesk/stubs/CalendarOverlay.jsx";
import Teleconference    from "../echodesk/stubs/TeleconferenceOverlay.jsx";
import ExpoRailPanel     from "../echodesk/stubs/ExpoRailPanel.jsx";
import TemplatesLibrary  from "../echodesk/stubs/TemplatesLibrary.jsx";
import RulerSnapOverlay  from "../echodesk/stubs/RulerSnapOverlay.jsx";
import LassoCopyTool     from "../echodesk/stubs/LassoCopyTool.jsx";
// (AI chat removed)

/* ──────────────── Assets ──────────────── */
import kitchenIcon  from "../assets/culinary_library.png";
import pastryIcon   from "../assets/baking-&-Pastry.png";
import mixologyIcon from "../assets/mixology.png";
import scheduleIcon from "../assets/schedule.png";

/* ─────────────── Error boundary ─────────────── */
class PanelErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { error: null }; }
  static getDerivedStateFromError(error){ return { error }; }
  render(){
    if (this.state.error) {
      return (
        <div className="p-3 text-xs text-rose-600 dark:text-rose-300">
          <div className="font-semibold mb-1">Panel failed to load.</div>
          <pre className="whitespace-pre-wrap text-[11px] opacity-80">
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─────────────── Registry ─────────────── */
const PANEL_REGISTRY = {};

// Add only panels with valid components
console.log('[Board] Initializing PANEL_REGISTRY');
console.log('[Board] GlowDesk:', !!GlowDesk);
console.log('[Board] KitchenLibraryTabs:', !!KitchenLibraryTabs);
console.log('[Board] Schedule:', !!Schedule);
console.log('[Board] EchoRecipeProPanel:', !!EchoRecipeProPanel);
console.log('[Board] PurchasingPanel:', !!PurchasingPanel);

if (GlowDesk) PANEL_REGISTRY.dashboard = { title: "Dashboard", Component: GlowDesk, icon: null };
if (GlowDesk) PANEL_REGISTRY.home = { title: "Welcome", Component: GlowDesk, icon: null };
if (KitchenLibraryTabs) PANEL_REGISTRY.culinary = { title: "Kitchen Library", Component: KitchenLibraryTabs, icon: kitchenIcon };
if (Schedule) PANEL_REGISTRY.scheduling = { title: "Schedules", Component: Schedule, icon: scheduleIcon };
if (EchoRecipeProPanel) PANEL_REGISTRY.recipepro = { title: "EchoRecipePro", Component: EchoRecipeProPanel, icon: null };
if (PurchasingPanel) PANEL_REGISTRY.purchasing = { title: "Purchasing", Component: PurchasingPanel, icon: null };

console.log('[Board] Final PANEL_REGISTRY keys:', Object.keys(PANEL_REGISTRY));

// Always add EchoDesk stubs
PANEL_REGISTRY.calendar = { title: "Calendar", Component: CalendarOverlay, icon: null };
PANEL_REGISTRY.teleconference = { title: "Teleconference", Component: Teleconference, icon: null };
PANEL_REGISTRY.exporail = { title: "Expo Rail", Component: ExpoRailPanel, icon: null };
PANEL_REGISTRY.templates = { title: "Templates", Component: TemplatesLibrary, icon: null };
PANEL_REGISTRY.ruler = { title: "Ruler & Snap", Component: RulerSnapOverlay, icon: null };
PANEL_REGISTRY.lasso = { title: "Lasso / Copy", Component: LassoCopyTool, icon: null };

/* ─────────────── Helpers ─────────────── */
let zCounter = 10;
const genToken = () => Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);

const LS = {
  toolbar: "lu:toolbar:pos:v1",
  allowOffscreen: "lu:allowOffscreen",
};

/* ─────��───────── Component ─────────────── */
export default function Board() {
  const layerRef = useRef(null);
  const [windows, setWindows] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [allowOffscreen, setAllowOffscreen] = useState(() =>
    (localStorage.getItem(LS.allowOffscreen) ?? "true").toLowerCase() === "true"
  );
  useEffect(() => localStorage.setItem(LS.allowOffscreen, String(allowOffscreen)), [allowOffscreen]);

  // OPTIONAL: warm up EchoRecipePro in the background after boot
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 800));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => { import("../components/EchoRecipePro/EchoRecipeProPanel.jsx"); });
    return () => cancel(id);
  }, []);

  // Toolbar position (draggable, persistent) — SINGLE declaration ✅
  const [tbPos, setTbPos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS.toolbar) || "") || { x: window.innerWidth/2 - 240, y: 12 };
    } catch {
      return { x: window.innerWidth/2 - 240, y: 12 };
    }
  });
  useEffect(() => { try { localStorage.setItem(LS.toolbar, JSON.stringify(tbPos)); } catch {} }, [tbPos]);

  const bringToFront = useCallback((id) => {
    zCounter += 1;
    setActiveId(id);
    setWindows((w) => w.map((win) => (win.id === id ? { ...win, z: zCounter } : win)));
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((w) => w.filter((p) => p.id !== id));
    setActiveId((aid) => (aid === id ? null : aid));
  }, []);

  const toggleMinimize = useCallback((id) => {
    setWindows((w) => w.map((p) =>
      p.id === id ? { ...p, minimized: !p.minimized, maximized: false } : p
    ));
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((w) =>
      w.map((p) => {
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
            minimized: false,
          };
        }
        const r = p.prevRect ?? { x: 120, y: 80, width: 720, height: 520 };
        return { ...p, ...r, maximized: false, prevRect: undefined };
      })
    );
  }, []);

  const cascadePos = useMemo(() => {
    let n = 0;
    return () => {
      const gap = 32;
      const x = 120 + ((n * gap) % 280);
      const y =  80 + ((n * gap) % 220);
      n += 1;
      return { x, y };
    };
  }, []);

  const openPanelById = useCallback((panelId, opts = {}) => {
    console.log(`[Board] openPanelById called with panelId: "${panelId}"`);
    console.log(`[Board] Available panels in registry:`, Object.keys(PANEL_REGISTRY));
    const reg = PANEL_REGISTRY[panelId];
    if (!reg || !reg.Component) {
      console.warn("[Board] unknown panel:", panelId);
      console.warn("[Board] Registry contents:", PANEL_REGISTRY);
      return;
    }
    console.log(`[Board] Found panel in registry:`, reg);

    const allowDuplicate = !!opts.allowDuplicate;
    let createdId = null;

    setWindows((w) => {
      if (!allowDuplicate && w.some((p) => p.id === panelId)) {
        zCounter += 1;
        return w.map((p) => (p.id === panelId ? { ...p, minimized: false, z: zCounter } : p));
      }

      const { x: cx, y: cy } = cascadePos();
      const x = Number.isFinite(opts.x) ? opts.x : cx;
      const y = Number.isFinite(opts.y) ? opts.y : cy;
      const width  = Number.isFinite(opts.width)  ? opts.width  : 980;
      const height = Number.isFinite(opts.height) ? opts.height : 640;

      zCounter += 1;
      const newId = allowDuplicate
        ? `${panelId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`
        : panelId;

      createdId = newId;
      const winToken = genToken();

      return w.concat([{
        id: newId,
        title: opts.title || reg.title,
        icon: reg.icon ?? null,
        z: zCounter,
        x, y, width, height,
        minimized: false,
        maximized: false,
        props: { ...(opts.props || {}) }, // winToken optional for your flow
      }]);
    });

    setActiveId(createdId || panelId);
  }, [cascadePos]);

  // Global events
  useEffect(() => {
    const onOpen = (e) => { const d = e?.detail || {}; if (!d.id) return; openPanelById(d.id, { ...d }); };
    const onCloseByToken = (e) => {
      const tok = e?.detail?.token; if (!tok) return;
      setWindows((w) => w.filter((p) => p.props?.winToken !== tok));
    };
    const onAddWidget = (e) => {
      const { title = "Widget" } = e.detail || {};
      window.dispatchEvent(new CustomEvent("open-panel", {
        detail: { id: "studio", allowDuplicate: true, title: `Add: ${title}` }
      }));
    };

    window.addEventListener("open-panel", onOpen);
    window.addEventListener("board-close-by-token", onCloseByToken);
    window.addEventListener("hud-add-widget", onAddWidget);
    return () => {
      window.removeEventListener("open-panel", onOpen);
      window.removeEventListener("board-close-by-token", onCloseByToken);
      window.removeEventListener("hud-add-widget", onAddWidget);
    };
  }, [openPanelById]);

  // Startup: open Dashboard centered
  useEffect(() => {
    const rect = layerRef.current?.getBoundingClientRect?.();
    const W = Math.max(rect?.width ?? 0, window.innerWidth);
    const H = Math.max(rect?.height ?? 0, window.innerHeight);
    const width  = Math.min(1100, W - 180);
    const height = Math.min(680,  H - 160);
    const x = Math.max(90, Math.round((W - width)  / 2));
    const y = Math.max(76, Math.round((H - height) / 2));
    openPanelById("dashboard", { allowDuplicate: false, x, y, width, height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toolbar drag (uses the single tbPos)
  const dragRef = useRef(null);
  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;
    let sx=0, sy=0, ox=0, oy=0, dragging=false;
    const md = (e) => { dragging = true; sx = e.clientX; sy = e.clientY; ox = tbPos.x; oy = tbPos.y; e.preventDefault(); };
    const mm = (e) => { if (!dragging) return; const nx = ox + (e.clientX - sx); const ny = oy + (e.clientY - sy); setTbPos({ x: nx, y: ny }); };
    const mu = () => { dragging = false; };
    el.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    return () => {
      el.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
    };
  }, [tbPos]);

  const dockItems = windows.filter(w => w.minimized).map(w => ({ id: w.id, title: w.title, icon: w.icon }));
  const bringToFrontAndRestore = useCallback((id) => {
    setWindows((w) => w.map((p) => (p.id === id ? { ...p, minimized: false } : p)));
    bringToFront(id);
  }, [bringToFront]);

  return (
    <div className={`relative w-full h-full ${allowOffscreen ? "overflow-visible" : "overflow-hidden"} fluid-root`}>
      <EchoBackboard
        onRequestDockAll={() => setWindows(w => w.map(p => ({...p, minimized:true, maximized:false})))}
        onRequestRestoreAll={() => setWindows(w => w.map(p => ({...p, minimized:false})))}
      />

      {/* Toolbar (draggable, persistent) */}
      <div className="tb2 pointer-events-auto fixed z-[1200]" style={{ left: tbPos.x, top: tbPos.y }}>
        <div className="tb2-shell">
          <button ref={dragRef} className="tb2-handle" title="Drag toolbar">
            <GripHorizontal size={16} /><span className="ml-1">Toolbar</span>
          </button>

          <div className="tb2-group">
            <button className="tb2-btn" title="Reset layout" onClick={() => { setWindows([]); setActiveId(null); }}>
              <RefreshCcw size={16} />
            </button>
            <button className="tb2-btn" title="Dock all" onClick={() => setWindows(w => w.map(p => ({...p, minimized:true, maximized:false}))) }>
              <SquareStack size={16} />
            </button>
            <button className="tb2-btn" title="Restore docked" onClick={() => setWindows(w => w.map(p => ({...p, minimized:false}))) }>
              <LayoutDashboard size={16} />
            </button>

            <div className="tb2-sep" />

            {/* Quick openers */}
            <button className="tb2-btn" title="Open Whiteboard" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "whiteboard", allowDuplicate: true } }))}>
              <ImageIcon size={16} />
            </button>
            <button className="tb2-btn" title="Calendar" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "calendar", allowDuplicate: true } }))}>
              <CalendarDays size={16} />
            </button>
            <button className="tb2-btn" title="Teleconference" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "teleconference", allowDuplicate: true } }))}>
              <Video size={16} />
            </button>
            <button className="tb2-btn" title="Ruler & Snap" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "ruler", allowDuplicate: true } }))}>
              <Ruler size={16} />
            </button>
            <button className="tb2-btn" title="Lasso / Copy" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "lasso", allowDuplicate: true } }))}>
              <LassoSelect size={16} />
            </button>
            <button className="tb2-btn" title="Templates" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "templates", allowDuplicate: true } }))}>
              <Copy size={16} />
            </button>

            <div className="tb2-sep" />

            <button className="tb2-btn" title="Settings" onClick={() => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "settings", allowDuplicate: false } }))}>
              <Cog size={16} />
            </button>
          </div>

          {!!dockItems.length && (
            <div className="tb2-group tb2-dock" title="Dock">
              {dockItems.map(({ id, title, icon }) => (
                <button key={id} className="dock-chip" onClick={() => bringToFrontAndRestore(id)} title={`Restore ${title}`}>
                  {icon ? <img src={icon} alt="" /> : <span className="chip-fallback" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Panels */}
      <div ref={layerRef} className="pane-layer absolute inset-0" style={{ overflow: allowOffscreen ? "visible" : "hidden" }}>
        {windows.map((win) => {
          const baseKey = (win.id.includes("-") ? win.id.split("-")[0] : win.id);
          console.log(`[Board] Rendering window: ${win.id}, baseKey: ${baseKey}`);
          const entry = PANEL_REGISTRY[baseKey];
          if (!entry || !entry.Component) {
            console.warn(`[Board] No component found for baseKey "${baseKey}" in registry`);
            return null;
          }
          console.log(`[Board] Rendering component for ${baseKey}`);
          const Component = entry.Component;

          return (
            <Rnd
              key={win.id}
              position={{ x: win.x, y: win.y }}
              size={{ width: win.width, height: win.height }}
              bounds={false}
              minWidth={420}
              minHeight={280}
              dragHandleClassName="panel-header"
              onDragStart={() => bringToFront(win.id)}
              onResizeStart={() => bringToFront(win.id)}
              onDragStop={(_, d) => setWindows(w => w.map(p => p.id===win.id ? {...p, x:d.x, y:d.y} : p))}
              onResizeStop={(_, __, ref, _delta, pos) => setWindows(w => w.map(p => p.id===win.id ? {
                ...p, width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y
              } : p))}
              enableResizing={!win.maximized && !win.minimized}
              disableDragging={win.minimized}
              style={{ zIndex: win.z, display: win.minimized ? "none" : "block" }}
              className={[
                "panel-window resize-panel",
                activeId===win.id ? "is-focused" : "",
                win.minimized ? "is-min" : "",
                win.maximized ? "is-max" : ""
              ].join(" ")}
            >
              <div className="h-full flex flex-col" onMouseDownCapture={() => bringToFront(win.id)}>
                <div className="panel-header flex items-center justify-between select-none" title="Drag to move">
                  <div className="flex items-center gap-2">
                    <button className="dot dot-close"   title="Close" onClick={() => closeWindow(win.id)}><X size={10} /></button>
                    <button className="dot dot-min"     title={win.minimized ? "Restore" : "Minimize to dock"} onClick={() => toggleMinimize(win.id)}><Minus size={10} /></button>
                    <button className="dot dot-restore" title={win.maximized ? "Restore size" : "Maximize"} onClick={() => toggleMaximize(win.id)}><Maximize2 size={10} /></button>
                    <div className="panel-title ml-1">{win.title}</div>
                  </div>

                  {baseKey === "pastry" && (
                    <div className="flex items-center gap-1 pr-1">
                      <button className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5" title="Tear out current tab" onClick={() => window.dispatchEvent(new CustomEvent("pastry-tear-out"))}><ExternalLink size={14} /></button>
                      <button className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5" title="Pastry Home" onClick={() => window.dispatchEvent(new CustomEvent("pastry-home"))}><Home size={14} /></button>
                      <button className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-md border border-white/15 dark:border-cyan-300/30 text-white/80 hover:text-white hover:bg-white/5" title="Settings (⇧ toggles colors)" onClick={(e) => {
                        const detail = { toggleColors: e.shiftKey === true };
                        window.dispatchEvent(new CustomEvent("pastry-open-settings", { detail }));
                      }}><Cog size={14} /></button>
                    </div>
                  )}
                </div>

                <div className="panel-body grow overflow-auto">
                  <PanelErrorBoundary>
                    <Suspense fallback={<div className="p-3 text-xs text-gray-500">Loading…</div>}>
                      {Component ? <Component {...(win.props || {})} /> : null}
                    </Suspense>
                  </PanelErrorBoundary>
                </div>
              </div>
            </Rnd>
          );
        })}
      </div>

      {/* orb/chat removed → no portal, no extra styles */}
      <style>{`
        .tb2-shell{ display:flex; align-items:center; gap:10px; padding:6px 8px; border-radius:14px; border:1px solid rgba(22,224,255,.28); background:rgba(10,16,28,.72); box-shadow:0 16px 60px rgba(0,0,0,.45), 0 0 16px rgba(22,224,255,.14), inset 0 0 0 1px rgba(255,255,255,.05); backdrop-filter: blur(8px); user-select:none; }
        .tb2-handle{ display:inline-flex; align-items:center; gap:6px; height:28px; padding:0 8px; font-size:12px; border-radius:10px; border:1px solid rgba(22,224,255,.28); background:rgba(255,255,255,.06); color:#d7f6ff; cursor:grab; }
        .tb2-group{ display:inline-flex; gap:6px; align-items:center; }
        .tb2-btn{ height:28px; min-width:28px; padding:0 6px; border-radius:8px; border:1px solid rgba(22,224,255,.28); background:rgba(255,255,255,.04); color:#d7f6ff; }
        .tb2-btn:hover{ background:rgba(255,255,255,.08); }
        .tb2-sep{ width:1px; height:20px; background:rgba(255,255,255,.14); margin:0 4px; }
        .tb2-dock .dock-chip{ width:28px; height:28px; display:grid; place-items:center; border-radius:8px; border:1px solid rgba(22,224,255,.28); background:rgba(255,255,255,.04); }
        .tb2-dock img{ width:18px; height:18px; display:block; }
        .chip-fallback{ width:10px; height:10px; background:#9be; border-radius:3px; display:block; }
      `}</style>
    </div>
  );
}
