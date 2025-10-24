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
} from "lucide-react";

const LSK = "lu:glowdesk:layout:v1";
const GRID = { cols: 4, gap: 16, rowH: 140, pad: 20 };

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const date = now.toLocaleDateString();

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

  return { greeting, emoji, date, hour, mins };
}

const DEFAULT = [
  { id: "covers",     title: "Today's Covers",      color: "#00d9ff", w: 1, h: 1, x: 0, y: 0, pinned: true },
  { id: "food-cost",  title: "Food Cost %",         color: "#ff4d7d", w: 1, h: 1, x: 1, y: 0, pinned: true },
  { id: "labor",      title: "Labor Cost %",        color: "#00ff88", w: 1, h: 1, x: 2, y: 0, pinned: true },
  { id: "orders",     title: "Active Orders",       color: "#ffc844", w: 1, h: 1, x: 3, y: 0, pinned: true },
  { id: "kitchen",    title: "Kitchen Status",      color: "#b84dff", w: 1, h: 1, x: 0, y: 1, pinned: true },
  { id: "staff",      title: "Staff on Duty",       color: "#4dbaff", w: 1, h: 1, x: 1, y: 1, pinned: true },
  { id: "alerts",     title: "System Alerts",       color: "#ff6b4d", w: 1, h: 1, x: 2, y: 1, pinned: true },
  { id: "revenue",    title: "Live Revenue",        color: "#4dff9e", w: 1, h: 1, x: 3, y: 1, pinned: true },
];

export default function GlowyDesk() {
  const containerRef = useRef(null);
  const [cards, setCards] = useState(() => {
    try { 
      const saved = JSON.parse(localStorage.getItem(LSK) || "null");
      return saved ?? DEFAULT; 
    } catch { 
      return DEFAULT; 
    }
  });
  const [z, setZ] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { 
    localStorage.setItem(LSK, JSON.stringify(cards)); 
  }, [cards]);

  const bringToFront = (id) => {
    setCards(cs => cs.map(c => c.id === id ? { ...c, z: z + 1 } : c));
    setZ(n => n + 1);
  };

  const update = (id, patch) => setCards(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  const remove = (id) => setCards(cs => cs.filter(c => c.id !== id));
  const reset = () => setCards(DEFAULT);

  const addCard = () => {
    const id = "w-" + Math.random().toString(36).slice(2, 8);
    const lastY = Math.max(...cards.map(c => c.y + c.h), 0);
    setCards(cs => cs.concat([{ 
      id, 
      title: "New Widget", 
      color: "#00d9ff", 
      w: 1, 
      h: 1, 
      x: 0, 
      y: lastY + 1, 
      pinned: true 
    }]));
  };

  const tearOut = (card) => {
    window.dispatchEvent(new CustomEvent("open-panel", {
      detail: { id: card.id, title: card.title, isGlowyDeskCard: true }
    }));
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

  const { greeting, emoji, date, hour, mins } = getGreeting();
  
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
      {/* Welcome Header - Always Visible & Not Scrollable */}
      <div className="flex-shrink-0 border-b border-cyan-400/20 px-6 py-5 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl flex-shrink-0">{emoji}</span>
              <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                {greeting}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-sm">
              <div className="text-xs font-mono text-cyan-400/70 bg-cyan-400/5 px-2.5 py-1 rounded border border-cyan-400/20">
                {date} • {String(hour).padStart(2, '0')}:{mins}
              </div>
              <div className="text-xs text-white/50">
                Drag panels • Pin to grid • Pop out anytime
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-semibold hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all"
              onClick={addCard} 
              title="Add new widget"
            >
              <Plus size={14} /> Add
            </button>
            <button 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-semibold hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all"
              onClick={reset} 
              title="Reset layout"
            >
              <RefreshCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="flex-1 overflow-auto relative w-full" style={{ minHeight: 0 }}>
        <div className="w-full h-full relative" style={{ padding: `${GRID.pad}px` }}>
          {/* Grid container with proper sizing */}
          <div className="relative w-full" style={{ pointerEvents: 'none' }}>
            {cards.map(card => {
              if (!containerRef.current) return null;
              
              const containerWidth = containerRef.current.clientWidth - GRID.pad * 2;
              const px = card.pinned ? gridToPx(card, containerWidth) : {
                x: card.fx ?? 50,
                y: card.fy ?? 50,
                w: card.fw ?? 300,
                h: card.fh ?? 180,
              };

              return (
                <Rnd
                  key={card.id}
                  bounds={false}
                  position={{ x: px.x, y: px.y }}
                  size={{ width: px.w, height: px.h }}
                  minWidth={240}
                  minHeight={160}
                  enableResizing={!card.pinned}
                  dragHandleClassName="hud-handle"
                  onDragStart={() => bringToFront(card.id)}
                  onResizeStart={() => bringToFront(card.id)}
                  onDragStop={(_, d) => {
                    if (card.pinned) {
                      const containerWidth = containerRef.current?.clientWidth - GRID.pad * 2 || 800;
                      const snapped = pxToGrid({ x: d.x, y: d.y, w: px.w, h: px.h }, containerWidth);
                      update(card.id, snapped);
                    } else {
                      update(card.id, { fx: d.x, fy: d.y });
                    }
                  }}
                  onResizeStop={(_, __, ref, ___, pos) => {
                    if (card.pinned) {
                      const containerWidth = containerRef.current?.clientWidth - GRID.pad * 2 || 800;
                      const snapped = pxToGrid(
                        { x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight }, 
                        containerWidth
                      );
                      update(card.id, snapped);
                    } else {
                      update(card.id, { 
                        fw: ref.offsetWidth, 
                        fh: ref.offsetHeight, 
                        fx: pos.x, 
                        fy: pos.y 
                      });
                    }
                  }}
                  style={{ 
                    zIndex: card.z ?? 10,
                    pointerEvents: 'auto',
                  }}
                >
                  <HUDCard
                    id={card.id}
                    title={card.title}
                    color={card.color}
                    pinned={card.pinned}
                    onPin={() => update(card.id, { pinned: !card.pinned })}
                    onPop={() => tearOut(card)}
                    onClose={() => remove(card.id)}
                  />
                </Rnd>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function HUDCard({ id, title, color, pinned, onPin, onPop, onClose }) {
  const isDark = true;
  const [data, setData] = useState({});

  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      const baseVal = Math.sin(now.getTime() / 8000) * 10;

      const dataMap = {
        "covers": { value: Math.floor(1200 + baseVal * 50), unit: "today", detail: "↑ 12% vs yesterday" },
        "food-cost": { value: (28.3 + baseVal * 0.5).toFixed(1), unit: "%", detail: "Target: 28%" },
        "labor": { value: (25.8 + baseVal * 0.3).toFixed(1), unit: "%", detail: "Target: 26%" },
        "orders": { value: Math.floor(24 + baseVal * 5), unit: "live", detail: "Avg wait: 12 min" },
        "kitchen": { value: Math.floor(87 + baseVal * 5), unit: "%", detail: "Efficiency: Optimal" },
        "staff": { value: Math.floor(18 + baseVal * 2), unit: "people", detail: "2 breaks scheduled" },
        "alerts": { value: Math.floor(2 + Math.abs(baseVal)), unit: "active", detail: "1 warning, 1 info" },
        "revenue": { value: Math.floor(3450 + baseVal * 200), unit: "$", detail: "↑ 8.5% vs avg" },
      };

      setData(dataMap[id] || dataMap.covers);
    };

    updateData();
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div
      className="w-full h-full rounded-lg relative overflow-hidden group"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(8, 18, 32, 0.92))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88))",
        border: `1.5px solid ${hexToRGBA(color, 0.35)}`,
        boxShadow: isDark
          ? `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${hexToRGBA(color, 0.25)}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`
          : `0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
        backdropFilter: "blur(12px)",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-20 rounded-[32px] pointer-events-none"
        style={{
          background: `radial-gradient(350px 200px at 30% 0%, ${hexToRGBA(color, 0.25)}, transparent 65%)`,
          filter: "blur(28px)",
          opacity: 0.7,
        }}
      />

      {/* Toolbar */}
      <div
        className="flex-shrink-0 flex items-center justify-between gap-2 p-3 border-b"
        style={{
          borderBottomColor: hexToRGBA(color, 0.2),
          background: `linear-gradient(90deg, ${hexToRGBA(color, 0.08)}, ${hexToRGBA(color, 0.04)})`,
        }}
      >
        <div className="hud-handle flex items-center gap-2 cursor-grab active:cursor-grabbing min-w-0">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: color,
              boxShadow: `0 0 10px ${hexToRGBA(color, 0.5)}`,
            }}
          />
          <span className="text-xs font-bold tracking-wide opacity-85 uppercase truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            className="w-6 h-6 flex items-center justify-center rounded text-xs hover:bg-cyan-400/20 transition-all flex-shrink-0" 
            title="Pop out" 
            onClick={onPop}
            style={{ color }}
          >
            <ExternalLink size={12} />
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded text-xs hover:bg-cyan-400/20 transition-all flex-shrink-0" 
            title={pinned ? "Unpin" : "Pin"} 
            onClick={onPin}
            style={{ color: pinned ? color : 'rgba(255,255,255,0.4)' }}
          >
            {pinned ? <Pin size={12} /> : <PinOff size={12} />}
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded text-xs hover:bg-red-400/20 transition-all flex-shrink-0" 
            title="Close" 
            onClick={onClose}
            style={{ color: '#ff6b6b' }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden relative z-0">
        <div>
          <div className="flex items-baseline gap-1 mb-3">
            <div className="text-3xl md:text-4xl font-black tracking-tight" style={{ color }}>
              {data.value}
            </div>
            <div className="text-xs font-semibold opacity-60">{data.unit}</div>
          </div>
          <div className="text-xs opacity-60">{data.detail}</div>
        </div>
        <div className="flex items-center justify-between text-[10px] opacity-50">
          <span className="font-mono">Live</span>
          <span 
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" 
            style={{ background: color }}
          />
        </div>
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
