import React, { useEffect, useMemo, useRef, useState } from "react";
import * as RND_NS from "react-rnd";
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  GripVertical,
  Pin,
  PinOff,
  ExternalLink,
  X,
  RefreshCcw,
  Plus,
} from "lucide-react";

const LSK = "lu:glowdesk:layout:v1";
const GRID = { cols: 12, gap: 12, rowH: 120, pad: 16 };

// Reserve vertical space at the top so the greeting/banner is never covered
const SAFE_TOP = 72; // tweak this to match your greeting height

// All square cards (3x3) for consistency
const DEFAULT = [
  { id: "covers",   title: "Today's Covers",   color: "#46e6ff", w: 3, h: 3, x: 0, y: 0, pinned: true },
  { id: "food",     title: "Food Cost",        color: "#b66bff", w: 3, h: 3, x: 3, y: 0, pinned: true },
  { id: "labor",    title: "Labor %",          color: "#5ff1b3", w: 3, h: 3, x: 6, y: 0, pinned: true },
  { id: "health",   title: "Outlet Health",    color: "#ffd45b", w: 3, h: 3, x: 9, y: 0, pinned: true },
  { id: "schedule", title: "Who's Scheduled",  color: "#7fd0ff", w: 3, h: 3, x: 0, y: 3, pinned: true },
  { id: "revenue",  title: "Revenue Forecast", color: "#ff6b9d", w: 3, h: 3, x: 3, y: 3, pinned: true },
  { id: "alerts",   title: "Active Alerts",    color: "#ffba3d", w: 3, h: 3, x: 6, y: 3, pinned: true },
];

export default function GlowyDesk() {
  const shellRef = useRef(null);
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LSK) || "null") ?? DEFAULT; }
    catch { return DEFAULT; }
  });
  const [z, setZ] = useState(10);

  useEffect(() => { localStorage.setItem(LSK, JSON.stringify(cards)); }, [cards]);

  const grid = useMemo(() => {
    const W = shellRef.current?.clientWidth ?? 1200;
    const { cols, gap, pad } = GRID;
    const colW = Math.floor((W - pad * 2 - gap * (cols - 1)) / cols);
    return { ...GRID, colW, W };
  }, [shellRef.current?.clientWidth]);

  const bringToFront = (id) =>
    setCards(cs => cs.map(c => c.id === id ? { ...c, z: z + 1 } : c)) || setZ(n => n + 1);
  const update = (id, patch) => setCards(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  const remove = (id) => setCards(cs => cs.filter(c => c.id !== id));
  const reset  = () => setCards(DEFAULT);

  const tearOut = (card) => {
    // Create a floating panel in the main Board
    window.dispatchEvent(new CustomEvent("open-panel", {
      detail: {
        id: card.id,
        title: card.title,
        isGlowyDeskCard: true
      }
    }));
    // Optionally remove from dashboard or keep it
    // remove(card.id);
  };

  const addCard = () => {
    const id = "w-" + Math.random().toString(36).slice(2,8);
    setCards(cs => cs.concat([{ id, title: "New Widget", color: "#9bf", w: 4, h: 3, x: 0, y: 6, pinned: true }]));
  };

  // ----- grid math with SAFE_TOP guard
  const toPx = (c) => {
    const { pad, gap, colW, rowH } = grid;
    const x = pad + c.x * (colW + gap);
    const y = pad + SAFE_TOP + c.y * (rowH + gap);
    const w = c.w * colW + (c.w - 1) * gap;
    const h = c.h * rowH + (c.h - 1) * gap;
    return { x, y, w, h };
  };
  const fromPx = (px) => {
    const { colW, rowH, gap } = grid;
    const q = (v, unit) => Math.max(0, Math.round(v / (unit + gap)));
    return {
      x: q(px.x - GRID.pad, colW),
      y: q(px.y - GRID.pad - SAFE_TOP, rowH),
      w: Math.max(1, q(px.w + gap, colW)),
      h: Math.max(1, q(px.h + gap, rowH)),
    };
  };

  return (
    <div
      ref={shellRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        padding: GRID.pad,
        paddingTop: GRID.pad + SAFE_TOP, // breathing room above the grid
        background:
          "radial-gradient(1200px 600px at 40% -10%, rgba(127, 227, 255, .06), transparent 60%), " +
          "radial-gradient(900px 480px at 85% 0%, rgba(255, 170, 255, .05), transparent 65%)",
      }}
    >
      <div className="mb-3 -mt-[56px]">
        <div className="text-3xl md:text-4xl font-black tracking-tight">Late Night Mode, Chef.</div>
        <div className="text-sm opacity-70">Drag panels. Pin to grid. Pop out when you need space.</div>
      </div>

      <div className="absolute right-4 top-4 z-[2] flex items-center gap-2">
        <button className="gd-btn" onClick={addCard}><Plus size={16}/> Add Widget</button>
        <button className="gd-btn" onClick={reset}><RefreshCcw size={16}/> Reset</button>
      </div>

      {cards.map(card => {
        const px = card.pinned
          ? toPx(card)
          : {
              x: card.fx ?? 48,
              y: Math.max(card.fy ?? (SAFE_TOP + 96), SAFE_TOP + GRID.pad), // clamp free float below greeting
              w: card.fw ?? 520,
              h: card.fh ?? 320
            };

        return (
          <Rnd
            key={card.id}
            bounds={false}
            position={{ x: px.x, y: px.y }}
            size={{ width: px.w, height: px.h }}
            minWidth={280}
            minHeight={180}
            enableResizing
            dragHandleClassName="gd-handle"
            onDragStart={() => bringToFront(card.id)}
            onResizeStart={() => bringToFront(card.id)}
            onDragStop={(_, d) => {
              if (card.pinned) {
                const snapped = fromPx({ x: d.x, y: d.y, w: px.w, h: px.h });
                update(card.id, snapped);
              } else {
                update(card.id, { fx: d.x, fy: Math.max(d.y, SAFE_TOP + GRID.pad) });
              }
            }}
            onResizeStop={(_, __, ref, ___, pos) => {
              if (card.pinned) {
                const snapped = fromPx({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight });
                update(card.id, snapped);
              } else {
                update(card.id, {
                  fw: ref.offsetWidth,
                  fh: ref.offsetHeight,
                  fx: pos.x,
                  fy: Math.max(pos.y, SAFE_TOP + GRID.pad),
                });
              }
            }}
            style={{ zIndex: card.z ?? 10 }}
            className="pointer-events-auto"
          >
            <GlowCard
              title={card.title}
              color={card.color}
              pinned={card.pinned}
              onPin={() => update(card.id, { pinned: !card.pinned })}
              onPop={() => tearOut(card)}
              onClose={() => remove(card.id)}
            >
              <DemoBody id={card.id} />
            </GlowCard>
          </Rnd>
        );
      })}

      <style>{`
        .gd-btn{
          display:inline-flex; align-items:center; gap:6px; padding:.45rem .65rem;
          border-radius:10px; font-weight:600;
          border:1px solid rgba(255,255,255,.14); background:rgba(255,255,255,.06); color:#d7f6ff;
        }
        .gd-btn:hover{ background:rgba(255,255,255,.09); }
      `}</style>
    </div>
  );
}

function GlowCard({ title, color, pinned, onPin, onPop, onClose, children }) {
  const isDark = !document.documentElement.classList.contains("light");

  return (
    <div
      className="h-full w-full rounded-xl relative overflow-hidden group"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(10,20,35,.92), rgba(8,15,28,.92))"
          : "rgba(255,255,255,.85)",
        border: isDark
          ? `1px solid rgba(0, 217, 255, 0.35)`
          : `1px solid rgba(0, 0, 0, 0.12)`,
        boxShadow: isDark
          ? `0 12px 40px rgba(0,0,0,.5),
             0 0 24px ${hexToRGBA(color, .25)},
             inset 0 1px 0 rgba(0, 217, 255, 0.15)`
          : `0 8px 32px rgba(0,0,0,.15),
             inset 0 1px 0 rgba(255,255,255,.6)`,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-16 rounded-[28px] pointer-events-none"
        style={{ background: `radial-gradient(360px 180px at 20% 0%, ${hexToRGBA(color, .25)}, transparent 60%)`, filter: "blur(24px)", opacity: .9 }}
      />
      <div className="gd-toolbar gd-handle">
        <div className="flex items-center gap-1">
          <button className="gd-ctl" title="Hide" onClick={onClose}><X size={15}/></button>
          <button className="gd-ctl" title="Pop out" onClick={onPop}><ExternalLink size={15}/></button>
          <button className={`gd-ctl ${pinned ? "gd-on":""}`} title={pinned ? "Unpin (free float)" : "Pin to grid"} onClick={onPin}>
            {pinned ? <Pin size={15}/> : <PinOff size={15}/>}
          </button>
          <span className="ml-2 text-xs font-semibold opacity-80 tracking-wide">{title}</span>
        </div>
      </div>
      <div className="absolute inset-[14px] rounded-xl p-3 md:p-4">{children}</div>
      <style>{`
        .gd-toolbar{
          position:absolute; left:12px; right:12px; top:10px;
          display:flex; align-items:center; gap:8px;
          padding:8px 12px; border-radius:10px;
          background:linear-gradient(90deg, rgba(0,217,255,.08), rgba(0,217,255,.04));
          border:1px solid rgba(0,217,255,.15);
          box-shadow: 0 4px 12px rgba(0,0,0,.2), inset 0 0 0 1px rgba(0,217,255,.1);
          color:#7ff3ff; pointer-events:auto; z-index:10;
        }
        html.light .gd-toolbar{
          background:linear-gradient(90deg, rgba(0,0,0,.04), rgba(0,0,0,.02));
          border:1px solid rgba(0,0,0,.08);
          box-shadow: 0 2px 8px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.4);
          color:#1f2937;
        }
        .gd-toolbar.gd-handle{ cursor:grab; }
        .gd-ctl{ display:grid; place-items:center; width:24px; height:24px; border-radius:6px; border:1px solid rgba(0,217,255,.2); background:rgba(0,217,255,.08); color:#7ff3ff; transition:all .15s ease; flex-shrink:0; }
        .gd-ctl:hover{ background:rgba(0,217,255,.15); border-color:rgba(0,217,255,.35); box-shadow:0 0 8px rgba(0,217,255,.15); }
        .gd-ctl.gd-on{ border-color:rgba(0,217,255,.5); background:rgba(0,217,255,.15); box-shadow:0 0 12px rgba(0,217,255,.25); }
        html.light .gd-ctl{ border-color:rgba(0,0,0,.1); background:rgba(0,0,0,.05); color:#374151; }
        html.light .gd-ctl:hover{ background:rgba(0,0,0,.1); border-color:rgba(0,0,0,.15); box-shadow:0 2px 6px rgba(0,0,0,.1); }
        html.light .gd-ctl.gd-on{ border-color:rgba(0,0,0,.15); background:rgba(0,0,0,.08); }
      `}</style>
    </div>
  );
}

function DemoBody({ id }) {
  const big = id === "covers" ? "1,398" : id === "food" ? "27.9%" : id === "labor" ? "27.1%" : id === "health" ? "6 / 4" : "Ava • Ben • Cam • Diego • Eve";
  return (
    <div className="h-full w-full grid content-between">
      <div>
        <div className="text-4xl md:text-5xl font-black tracking-tight">{big}</div>
        <div className="opacity-70 text-xs mt-1">Simulated data — wire to WidgetStudio next.</div>
      </div>
      <div className="opacity-40 text-[11px]">Drag the handle · Pin/unpin · Pop out</div>
    </div>
  );
}

function tearOut(card) {
  window.dispatchEvent(new CustomEvent("open-panel", {
    detail: { id: "viewer", title: card.title || "Widget", allowDuplicate: true, width: 640, height: 420 }
  }));
}

function hexToRGBA(hex, a) {
  const s = hex.replace("#", "");
  const n = parseInt(s.length === 3 ? s.split("").map(ch => ch+ch).join("") : s, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
