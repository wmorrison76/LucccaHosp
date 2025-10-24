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
  TrendingUp,
  Activity,
  Users,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react";

const LSK = "lu:glowdesk:layout:v1";
const GRID = { cols: 12, gap: 16, rowH: 140, pad: 20 };
const SAFE_TOP = 140;

// Time-based greeting with detailed timestamp
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

// Enhanced default cards with restaurant data
const DEFAULT = [
  { id: "covers",     title: "Today's Covers",      color: "#00d9ff", w: 3, h: 3, x: 0, y: 0, pinned: true, icon: "Users" },
  { id: "food-cost",  title: "Food Cost %",         color: "#ff4d7d", w: 3, h: 3, x: 3, y: 0, pinned: true, icon: "TrendingUp" },
  { id: "labor",      title: "Labor Cost %",        color: "#00ff88", w: 3, h: 3, x: 6, y: 0, pinned: true, icon: "Activity" },
  { id: "orders",     title: "Active Orders",       color: "#ffc844", w: 3, h: 3, x: 9, y: 0, pinned: true, icon: "Clock" },
  { id: "kitchen",    title: "Kitchen Status",      color: "#b84dff", w: 3, h: 3, x: 0, y: 3, pinned: true, icon: "Zap" },
  { id: "staff",      title: "Staff on Duty",       color: "#4dbaff", w: 3, h: 3, x: 3, y: 3, pinned: true, icon: "Users" },
  { id: "alerts",     title: "System Alerts",       color: "#ff6b4d", w: 3, h: 3, x: 6, y: 3, pinned: true, icon: "AlertTriangle" },
  { id: "revenue",    title: "Live Revenue",        color: "#4dff9e", w: 3, h: 3, x: 9, y: 3, pinned: true, icon: "TrendingUp" },
];

export default function GlowyDesk() {
  const shellRef = useRef(null);
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LSK) || "null") ?? DEFAULT; }
    catch { return DEFAULT; }
  });
  const [z, setZ] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for clock display
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
  const reset = () => setCards(DEFAULT);

  const tearOut = (card) => {
    window.dispatchEvent(new CustomEvent("open-panel", {
      detail: {
        id: card.id,
        title: card.title,
        isGlowyDeskCard: true
      }
    }));
  };

  const addCard = () => {
    const id = "w-" + Math.random().toString(36).slice(2, 8);
    setCards(cs => cs.concat([{ id, title: "New Widget", color: "#00d9ff", w: 3, h: 3, x: 0, y: 6, pinned: true, icon: "Activity" }]));
  };

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

  const { greeting, emoji, timeStr } = getGreeting();

  return (
    <div
      ref={shellRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        padding: GRID.pad,
        paddingTop: GRID.pad + SAFE_TOP,
        background:
          "radial-gradient(1400px 700px at 40% -15%, rgba(0, 217, 255, 0.08), transparent 65%), " +
          "radial-gradient(1000px 600px at 85% 5%, rgba(255, 77, 125, 0.06), transparent 70%), " +
          "linear-gradient(180deg, rgba(15, 28, 42, 0.4) 0%, rgba(10, 20, 35, 0.6) 100%)",
      }}
    >
      {/* Welcome Header with Timestamp */}
      <div className="mb-8 -mt-[120px] flex items-start justify-between z-20 relative">
        <div>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl">{emoji}</span>
            <div className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              {greeting}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-cyan-400/70 bg-cyan-400/5 px-3 py-1.5 rounded-lg border border-cyan-400/20">
              {currentTime.toLocaleDateString()} • {timeStr}
            </div>
            <div className="text-sm text-white/60">
              Real-time kitchen operations • Drag panels • Pin to grid • Pop out anytime
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button className="hud-btn" onClick={addCard} title="Add new widget">
            <Plus size={16} /> Add Widget
          </button>
          <button className="hud-btn" onClick={reset} title="Reset to default layout">
            <RefreshCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      {cards.map(card => {
        const px = card.pinned
          ? toPx(card)
          : {
              x: card.fx ?? 48,
              y: Math.max(card.fy ?? (SAFE_TOP + 96), SAFE_TOP + GRID.pad),
              w: card.fw ?? 520,
              h: card.fh ?? 360
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
            <HUDCard
              id={card.id}
              title={card.title}
              color={card.color}
              icon={card.icon}
              pinned={card.pinned}
              onPin={() => update(card.id, { pinned: !card.pinned })}
              onPop={() => tearOut(card)}
              onClose={() => remove(card.id)}
              currentTime={currentTime}
            />
          </Rnd>
        );
      })}

      {/* Global HUD Styles */}
      <style>{`
        .hud-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
          border: 1px solid rgba(0, 217, 255, 0.4);
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.08));
          color: #00d9ff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(10px);
        }
        
        .hud-btn:hover {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.25), rgba(0, 217, 255, 0.15));
          border-color: rgba(0, 217, 255, 0.7);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 12px rgba(0, 217, 255, 0.1);
          transform: translateY(-2px);
        }

        .hud-btn:active {
          transform: translateY(0);
        }

        html.light .hud-btn {
          border-color: rgba(0, 102, 204, 0.3);
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(0, 102, 204, 0.05));
          color: #0066cc;
        }

        html.light .hud-btn:hover {
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.2), rgba(0, 102, 204, 0.1));
          border-color: rgba(0, 102, 204, 0.6);
          box-shadow: 0 0 16px rgba(0, 102, 204, 0.2);
        }
      `}</style>
    </div>
  );
}

function HUDCard({ id, title, color, icon, pinned, onPin, onPop, onClose, currentTime }) {
  const isDark = !document.documentElement.classList.contains("light");

  return (
    <div
      className="h-full w-full rounded-lg relative overflow-hidden group"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(8, 18, 32, 0.92))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88))",
        border: isDark
          ? `1.5px solid ${hexToRGBA(color, 0.4)}`
          : `1.5px solid ${hexToRGBA(color, 0.2)}`,
        boxShadow: isDark
          ? `
            0 20px 60px rgba(0, 0, 0, 0.7),
            0 0 40px ${hexToRGBA(color, 0.3)},
            0 0 80px ${hexToRGBA(color, 0.15)},
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3)
          `
          : `
            0 15px 45px rgba(0, 0, 0, 0.15),
            0 0 30px ${hexToRGBA(color, 0.15)},
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.08)
          `,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Glow background effect */}
      <div
        aria-hidden
        className="absolute -inset-24 rounded-[40px] pointer-events-none"
        style={{
          background: `radial-gradient(400px 250px at 30% 0%, ${hexToRGBA(color, 0.3)}, transparent 65%)`,
          filter: "blur(32px)",
          opacity: isDark ? 0.8 : 0.4,
        }}
      />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, ${color}20 1px, transparent 1px),
            linear-gradient(90deg, ${color}20 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header Toolbar */}
      <div className="hud-toolbar">
        <div className="hud-handle flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 12px ${hexToRGBA(color, 0.6)}, inset 0 0 4px rgba(255,255,255,0.3)`,
            }}
          />
          <span className="text-xs font-bold tracking-widest opacity-90 uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="hud-ctl" title="Pop out to floating panel" onClick={onPop}>
            <ExternalLink size={15} />
          </button>
          <button className={`hud-ctl ${pinned ? "hud-active" : ""}`} title={pinned ? "Unpin (free float)" : "Pin to grid"} onClick={onPin}>
            {pinned ? <Pin size={15} /> : <PinOff size={15} />}
          </button>
          <button className="hud-ctl hud-close" title="Close widget" onClick={onClose}>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="absolute inset-[16px] rounded-lg p-5 overflow-hidden flex flex-col">
        <HUDContent id={id} color={color} currentTime={currentTime} />
      </div>

      <style>{`
        .hud-toolbar {
          position: absolute;
          left: 16px;
          right: 16px;
          top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          background: linear-gradient(90deg, rgba(0, 217, 255, 0.1), rgba(0, 217, 255, 0.05));
          border: 1px solid rgba(0, 217, 255, 0.25);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: #7ff3ff;
          pointer-events: auto;
          z-index: 11;
          backdrop-filter: blur(10px);
        }

        html.light .hud-toolbar {
          background: linear-gradient(90deg, rgba(0, 102, 204, 0.08), rgba(0, 102, 204, 0.03));
          border: 1px solid rgba(0, 102, 204, 0.2);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          color: #1e40af;
        }

        .hud-handle {
          cursor: grab;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          user-select: none;
        }

        .hud-handle:active {
          cursor: grabbing;
        }

        .hud-ctl {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid rgba(0, 217, 255, 0.25);
          background: rgba(0, 217, 255, 0.08);
          color: #7ff3ff;
          transition: all 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
        }

        .hud-ctl:hover {
          background: rgba(0, 217, 255, 0.2);
          border-color: rgba(0, 217, 255, 0.5);
          box-shadow: 0 0 12px rgba(0, 217, 255, 0.25);
          transform: translateY(-1px);
        }

        .hud-ctl.hud-active {
          border-color: rgba(0, 217, 255, 0.6);
          background: rgba(0, 217, 255, 0.2);
          box-shadow: 0 0 16px rgba(0, 217, 255, 0.35);
        }

        .hud-ctl.hud-close:hover {
          background: rgba(255, 77, 125, 0.2);
          border-color: rgba(255, 77, 125, 0.5);
          box-shadow: 0 0 12px rgba(255, 77, 125, 0.25);
          color: #ff4d7d;
        }

        html.light .hud-ctl {
          border-color: rgba(0, 102, 204, 0.2);
          background: rgba(0, 102, 204, 0.08);
          color: #1e40af;
        }

        html.light .hud-ctl:hover {
          background: rgba(0, 102, 204, 0.15);
          border-color: rgba(0, 102, 204, 0.4);
          box-shadow: 0 0 10px rgba(0, 102, 204, 0.15);
        }

        html.light .hud-ctl.hud-active {
          border-color: rgba(0, 102, 204, 0.5);
          background: rgba(0, 102, 204, 0.15);
        }

        html.light .hud-ctl.hud-close:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.4);
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}

function HUDContent({ id, color, currentTime }) {
  const [data, setData] = useState({});

  // Simulate live data updates
  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      const baseVal = Math.sin(now.getTime() / 10000) * 10;

      const dataMap = {
        "covers": {
          label: "Covers",
          value: Math.floor(1200 + baseVal * 50),
          unit: "today",
          detail: "↑ 12% vs yesterday",
          color: "#00d9ff",
        },
        "food-cost": {
          label: "Food Cost",
          value: (28.3 + baseVal * 0.5).toFixed(1),
          unit: "%",
          detail: "Target: 28%",
          color: "#ff4d7d",
        },
        "labor": {
          label: "Labor Cost",
          value: (25.8 + baseVal * 0.3).toFixed(1),
          unit: "%",
          detail: "Target: 26%",
          color: "#00ff88",
        },
        "orders": {
          label: "Active Orders",
          value: Math.floor(24 + baseVal * 5),
          unit: "live",
          detail: "Avg wait: 12 min",
          color: "#ffc844",
        },
        "kitchen": {
          label: "Kitchen Status",
          value: Math.floor(87 + baseVal * 5),
          unit: "%",
          detail: "Efficiency: Optimal",
          color: "#b84dff",
        },
        "staff": {
          label: "Staff on Duty",
          value: Math.floor(18 + baseVal * 2),
          unit: "people",
          detail: "2 breaks scheduled",
          color: "#4dbaff",
        },
        "alerts": {
          label: "System Alerts",
          value: Math.floor(2 + Math.abs(baseVal)),
          unit: "active",
          detail: "1 warning, 1 info",
          color: "#ff6b4d",
        },
        "revenue": {
          label: "Live Revenue",
          value: Math.floor(3450 + baseVal * 200),
          unit: "$",
          detail: "↑ 8.5% vs avg",
          color: "#4dff9e",
        },
      };

      setData(dataMap[id] || dataMap.covers);
    };

    updateData();
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div>
        <div className="flex items-baseline gap-2 mb-4">
          <div
            className="text-5xl md:text-6xl font-black tracking-tight"
            style={{ color: data.color || color }}
          >
            {data.value}
          </div>
          <div className="text-sm font-semibold opacity-70">{data.unit}</div>
        </div>
        <div className="text-xs opacity-60">{data.detail}</div>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-mono opacity-40">Live data • Updated 2s ago</span>
        <span
          className="inline-block w-2 h-2 rounded-full animate-pulse"
          style={{ background: color, boxShadow: `0 0 8px ${hexToRGBA(color, 0.6)}` }}
        />
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
