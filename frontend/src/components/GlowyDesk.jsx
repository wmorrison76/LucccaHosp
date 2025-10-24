import React, { useEffect, useMemo, useRef, useState } from "react";
import * as RND_NS from "react-rnd";
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Pin,
  PinOff,
  ExternalLink,
  X,
  RefreshCcw,
  Plus,
  TrendingUp,
  Activity,
  Users,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react";

const LSK = "lu:glowdesk:layout:v1";
const GRID = { cols: 12, gap: 16, rowH: 150, pad: 24 };

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${String(hour).padStart(2, '0')}:${mins}`;

  let greeting = "";
  let emoji = "";
  
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning, Chef";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon, Chef";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening, Chef";
    emoji = "🌙";
  } else {
    greeting = "Night Service, Chef";
    emoji = "🌃";
  }

  return { greeting, emoji, timeStr };
}

const DEFAULT = [
  { id: "covers",     title: "Today's Covers",      color: "#00d9ff", w: 3, h: 2, x: 0, y: 0, pinned: true },
  { id: "food-cost",  title: "Food Cost %",         color: "#ff4d7d", w: 3, h: 2, x: 3, y: 0, pinned: true },
  { id: "labor",      title: "Labor Cost %",        color: "#00ff88", w: 3, h: 2, x: 6, y: 0, pinned: true },
  { id: "orders",     title: "Active Orders",       color: "#ffc844", w: 3, h: 2, x: 9, y: 0, pinned: true },
  { id: "kitchen",    title: "Kitchen Status",      color: "#b84dff", w: 3, h: 2, x: 0, y: 2, pinned: true },
  { id: "staff",      title: "Staff on Duty",       color: "#4dbaff", w: 3, h: 2, x: 3, y: 2, pinned: true },
  { id: "alerts",     title: "System Alerts",       color: "#ff6b4d", w: 3, h: 2, x: 6, y: 2, pinned: true },
  { id: "revenue",    title: "Live Revenue",        color: "#4dff9e", w: 3, h: 2, x: 9, y: 2, pinned: true },
];

export default function GlowyDesk() {
  const containerRef = useRef(null);
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LSK) || "null") ?? DEFAULT; }
    catch { return DEFAULT; }
  });
  const [z, setZ] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { localStorage.setItem(LSK, JSON.stringify(cards)); }, [cards]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const grid = useMemo(() => {
    const W = containerSize.w;
    const { cols, gap, pad, rowH } = GRID;
    const colW = Math.floor((W - pad * 2 - gap * (cols - 1)) / cols);
    return { ...GRID, colW, W, rowH };
  }, [containerSize.w]);

  const bringToFront = (id) => {
    setCards(cs => cs.map(c => c.id === id ? { ...c, z: z + 1 } : c));
    setZ(n => n + 1);
  };

  const update = (id, patch) => setCards(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  const remove = (id) => setCards(cs => cs.filter(c => c.id !== id));
  const reset = () => setCards(DEFAULT);

  const tearOut = (card) => {
    window.dispatchEvent(new CustomEvent("open-panel", {
      detail: { id: card.id, title: card.title, isGlowyDeskCard: true }
    }));
  };

  const addCard = () => {
    const id = "w-" + Math.random().toString(36).slice(2, 8);
    setCards(cs => cs.concat([{ id, title: "New Widget", color: "#00d9ff", w: 3, h: 2, x: 0, y: 4, pinned: true }]));
  };

  const toPx = (c) => {
    const { pad, gap, colW, rowH } = grid;
    const headerH = 140;
    const x = pad + c.x * (colW + gap);
    const y = headerH + pad + c.y * (rowH + gap);
    const w = c.w * colW + (c.w - 1) * gap;
    const h = c.h * rowH + (c.h - 1) * gap;
    return { x, y, w, h };
  };

  const fromPx = (px) => {
    const { colW, rowH, gap } = grid;
    const q = (v, unit) => Math.max(0, Math.round(v / (unit + gap)));
    return {
      x: q(px.x - GRID.pad, colW),
      y: q(px.y - 140 - GRID.pad, rowH),
      w: Math.max(1, q(px.w + gap, colW)),
      h: Math.max(1, q(px.h + gap, rowH)),
    };
  };

  const { greeting, emoji, timeStr } = getGreeting();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{
        background:
          "radial-gradient(1400px 700px at 40% -15%, rgba(0, 217, 255, 0.08), transparent 65%), " +
          "radial-gradient(1000px 600px at 85% 5%, rgba(255, 77, 125, 0.06), transparent 70%), " +
          "linear-gradient(180deg, rgba(15, 28, 42, 0.4) 0%, rgba(10, 20, 35, 0.6) 100%)",
      }}
    >
      {/* Welcome Header - Always Visible */}
      <div className="flex-shrink-0 border-b border-cyan-400/20 px-6 py-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-8 max-w-7xl mx-auto">
          <div className="flex-1">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl">{emoji}</span>
              <div className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                {greeting}
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-xs font-mono text-cyan-400/70 bg-cyan-400/5 px-3 py-1.5 rounded-lg border border-cyan-400/20">
                {currentTime.toLocaleDateString()} • {timeStr}
              </div>
              <div className="text-sm text-white/60">
                Drag panels • Pin to grid • Pop out anytime
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="hud-btn" onClick={addCard} title="Add new widget">
              <Plus size={16} /> Add
            </button>
            <button className="hud-btn" onClick={reset} title="Reset layout">
              <RefreshCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Cards Area */}
      <div
        className="flex-1 overflow-auto relative"
        style={{ padding: GRID.pad }}
      >
        {/* Positioned cards container */}
        <div
          className="relative pointer-events-none"
          style={{
            width: '100%',
            minHeight: cards.length > 0 ? Math.max(800, (Math.max(...cards.map(c => c.y + c.h)) + 1) * (GRID.rowH + GRID.gap)) : 400,
          }}
        >
          {cards.map(card => {
            const px = card.pinned ? toPx(card) : {
              x: card.fx ?? 48,
              y: card.fy ?? 160,
              w: card.fw ?? 380,
              h: card.fh ?? 240,
            };

            return (
              <Rnd
                key={card.id}
                bounds={false}
                position={{ x: px.x, y: px.y }}
                size={{ width: px.w, height: px.h }}
                minWidth={280}
                minHeight={200}
                enableResizing
                dragHandleClassName="hud-handle"
                onDragStart={() => bringToFront(card.id)}
                onResizeStart={() => bringToFront(card.id)}
                onDragStop={(_, d) => {
                  if (card.pinned) {
                    const snapped = fromPx({ x: d.x, y: d.y, w: px.w, h: px.h });
                    update(card.id, snapped);
                  } else {
                    update(card.id, { fx: d.x, fy: d.y });
                  }
                }}
                onResizeStop={(_, __, ref, ___, pos) => {
                  if (card.pinned) {
                    const snapped = fromPx({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight });
                    update(card.id, snapped);
                  } else {
                    update(card.id, { fw: ref.offsetWidth, fh: ref.offsetHeight, fx: pos.x, fy: pos.y });
                  }
                }}
                style={{ zIndex: card.z ?? 10 }}
                className="pointer-events-auto"
              >
                <HUDCard
                  id={card.id}
                  title={card.title}
                  color={card.color}
                  pinned={card.pinned}
                  onPin={() => update(card.id, { pinned: !card.pinned })}
                  onPop={() => tearOut(card)}
                  onClose={() => remove(card.id)}
                  currentTime={currentTime}
                />
              </Rnd>
            );
          })}
        </div>
      </div>

      <style>{`
        .hud-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.5rem 0.875rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1px solid rgba(0, 217, 255, 0.3);
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.12), rgba(0, 217, 255, 0.06));
          color: #00d9ff;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .hud-btn:hover {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.12));
          border-color: rgba(0, 217, 255, 0.6);
          box-shadow: 0 0 16px rgba(0, 217, 255, 0.25);
        }
      `}</style>
    </div>
  );
}

function HUDCard({ id, title, color, pinned, onPin, onPop, onClose, currentTime }) {
  const isDark = !document.documentElement.classList.contains("light");

  return (
    <div
      className="h-full w-full rounded-lg relative overflow-hidden group"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(8, 18, 32, 0.92))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88))",
        border: isDark
          ? `1.5px solid ${hexToRGBA(color, 0.35)}`
          : `1.5px solid ${hexToRGBA(color, 0.2)}`,
        boxShadow: isDark
          ? `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${hexToRGBA(color, 0.25)}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`
          : `0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-20 rounded-[32px] pointer-events-none"
        style={{
          background: `radial-gradient(350px 200px at 30% 0%, ${hexToRGBA(color, 0.25)}, transparent 65%)`,
          filter: "blur(28px)",
          opacity: isDark ? 0.7 : 0.3,
        }}
      />

      <div className="hud-toolbar">
        <div className="hud-handle flex items-center gap-2 cursor-grab">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: color,
              boxShadow: `0 0 10px ${hexToRGBA(color, 0.5)}`,
            }}
          />
          <span className="text-xs font-bold tracking-wide opacity-85 uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="hud-ctl" title="Pop out" onClick={onPop}>
            <ExternalLink size={14} />
          </button>
          <button className={`hud-ctl ${pinned ? "hud-active" : ""}`} title={pinned ? "Unpin" : "Pin"} onClick={onPin}>
            {pinned ? <Pin size={14} /> : <PinOff size={14} />}
          </button>
          <button className="hud-ctl" title="Close" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="absolute inset-[14px] rounded-lg p-4 flex flex-col justify-between overflow-hidden">
        <HUDContent id={id} color={color} />
      </div>

      <style>{`
        .hud-toolbar {
          position: absolute;
          left: 12px;
          right: 12px;
          top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          background: linear-gradient(90deg, rgba(0, 217, 255, 0.09), rgba(0, 217, 255, 0.04));
          border: 1px solid rgba(0, 217, 255, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          color: #7ff3ff;
          pointer-events: auto;
          z-index: 10;
          backdrop-filter: blur(8px);
        }
        .hud-handle { user-select: none; }
        .hud-handle:active { cursor: grabbing; }
        .hud-ctl {
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          border-radius: 5px;
          border: 1px solid rgba(0, 217, 255, 0.2);
          background: rgba(0, 217, 255, 0.08);
          color: #7ff3ff;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .hud-ctl:hover {
          background: rgba(0, 217, 255, 0.15);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 0 0 8px rgba(0, 217, 255, 0.2);
        }
        .hud-ctl.hud-active {
          border-color: rgba(0, 217, 255, 0.5);
          background: rgba(0, 217, 255, 0.15);
          box-shadow: 0 0 12px rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

function HUDContent({ id, color }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      const baseVal = Math.sin(now.getTime() / 8000) * 10;

      const dataMap = {
        "covers": { value: Math.floor(1200 + baseVal * 50), unit: "today", detail: "↑ 12% vs yesterday", color: "#00d9ff" },
        "food-cost": { value: (28.3 + baseVal * 0.5).toFixed(1), unit: "%", detail: "Target: 28%", color: "#ff4d7d" },
        "labor": { value: (25.8 + baseVal * 0.3).toFixed(1), unit: "%", detail: "Target: 26%", color: "#00ff88" },
        "orders": { value: Math.floor(24 + baseVal * 5), unit: "live", detail: "Avg wait: 12 min", color: "#ffc844" },
        "kitchen": { value: Math.floor(87 + baseVal * 5), unit: "%", detail: "Efficiency: Optimal", color: "#b84dff" },
        "staff": { value: Math.floor(18 + baseVal * 2), unit: "people", detail: "2 breaks scheduled", color: "#4dbaff" },
        "alerts": { value: Math.floor(2 + Math.abs(baseVal)), unit: "active", detail: "1 warning, 1 info", color: "#ff6b4d" },
        "revenue": { value: Math.floor(3450 + baseVal * 200), unit: "$", detail: "↑ 8.5% vs avg", color: "#4dff9e" },
      };

      setData(dataMap[id] || dataMap.covers);
    };

    updateData();
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-4">
        <div className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: data.color || color }}>
          {data.value}
        </div>
        <div className="text-xs font-semibold opacity-60">{data.unit}</div>
      </div>
      <div className="text-xs opacity-60 mb-auto">{data.detail}</div>
      <div className="flex items-center justify-between text-[10px] mt-4 opacity-50">
        <span className="font-mono">Live</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      </div>
    </div>
  );
}

function hexToRGBA(hex, a) {
  const s = hex.replace("#", "");
  const n = parseInt(s.length === 3 ? s.split("").map(ch => ch + ch).join("") : s, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
