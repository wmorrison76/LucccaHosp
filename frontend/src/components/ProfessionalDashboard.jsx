import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import {
  Pin,
  PinOff,
  ExternalLink,
  X,
  RefreshCcw,
  Plus,
  Minus,
  Maximize2,
} from 'lucide-react';
import { useThemeAndLanguageContext } from '../hooks/useThemeAndLanguage';

const LSK = 'luccca:professional-dashboard:v1';
const GRID = { cols: 4, gap: 16, rowH: 140, pad: 20 };

function getGreeting(t) {
  const now = new Date();
  const hour = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const date = now.toLocaleDateString();

  let greeting = '';
  let emoji = '';

  if (hour >= 5 && hour < 12) {
    greeting = `${t.goodMorning}`;
    emoji = '🌅';
  } else if (hour >= 12 && hour < 17) {
    greeting = `${t.goodAfternoon}`;
    emoji = '🌤️';
  } else if (hour >= 17 && hour < 21) {
    greeting = `${t.goodEvening}`;
    emoji = '🌙';
  } else {
    greeting = `${t.nightService}`;
    emoji = '🌃';
  }

  return { greeting, emoji, date, hour, mins };
}

const DEFAULT = [
  { id: 'covers', title: 'todayCovers', value: '156', color: 'cyan', w: 1, h: 1, x: 0, y: 0, pinned: true },
  { id: 'food-cost', title: 'foodCost', value: '28%', color: 'rose', w: 1, h: 1, x: 1, y: 0, pinned: true },
  { id: 'labor', title: 'laborCost', value: '32%', color: 'emerald', w: 1, h: 1, x: 2, y: 0, pinned: true },
  { id: 'orders', title: 'activeOrders', value: '24', color: 'rose', w: 1, h: 1, x: 3, y: 0, pinned: true },
  { id: 'kitchen', title: 'kitchenStatus', value: '89%', color: 'violet', w: 1, h: 1, x: 0, y: 1, pinned: true },
  { id: 'staff', title: 'staffOnDuty', value: '18', color: 'blue', w: 1, h: 1, x: 1, y: 1, pinned: true },
  { id: 'alerts', title: 'systemAlerts', value: '3', color: 'rose', w: 1, h: 1, x: 2, y: 1, pinned: true },
  { id: 'revenue', title: 'liveRevenue', value: '$4.2K', color: 'emerald', w: 1, h: 1, x: 3, y: 1, pinned: true },
];

const colorMap = {
  cyan: { primary: '#00a8cc', secondary: '#00d9ff', chart: '#00d9ff', glow: 'rgba(0, 217, 255, 0.2)' },
  blue: { primary: '#0066cc', secondary: '#3b82f6', chart: '#3b82f6', glow: 'rgba(59, 130, 246, 0.2)' },
  emerald: { primary: '#059669', secondary: '#10b981', chart: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
  rose: { primary: '#e11d48', secondary: '#f43f5e', chart: '#f43f5e', glow: 'rgba(244, 63, 94, 0.2)' },
  violet: { primary: '#7c3aed', secondary: '#a78bfa', chart: '#a78bfa', glow: 'rgba(167, 139, 250, 0.2)' },
};

export default function ProfessionalDashboard() {
  const { theme, t, getCSSVariables } = useThemeAndLanguageContext();
  const containerRef = useRef(null);
  const [cards, setCards] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LSK) || 'null');
      return saved ?? DEFAULT;
    } catch {
      return DEFAULT;
    }
  });
  const [z, setZ] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const colors = theme.colors;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(LSK, JSON.stringify(cards));
  }, [cards]);

  const bringToFront = (id) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, z: z + 1 } : c)));
    setZ((n) => n + 1);
  };

  const update = (id, patch) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const remove = (id) => setCards((cs) => cs.filter((c) => c.id !== id));
  const reset = () => setCards(DEFAULT);

  const addCard = () => {
    const id = 'w-' + Math.random().toString(36).slice(2, 8);
    const lastY = Math.max(...cards.map((c) => c.y + c.h), 0);
    setCards((cs) =>
      cs.concat([
        {
          id,
          title: 'New Widget',
          value: '0',
          color: 'cyan',
          w: 1,
          h: 1,
          x: 0,
          y: lastY + 1,
          pinned: true,
        },
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        ...cssVars,
        backgroundColor: colors.bg.primary,
        backgroundImage:
          theme.mode === 'light'
            ? `radial-gradient(1400px 700px at 40% -15%, ${colors.border.primary}, transparent 65%), 
               radial-gradient(1000px 600px at 85% 5%, ${colors.border.secondary}, transparent 70%)`
            : `radial-gradient(1400px 700px at 40% -15%, ${colors.border.primary}, transparent 65%), 
               radial-gradient(1000px 600px at 85% 5%, ${colors.border.secondary}, transparent 70%)`,
      }}
    >
      {/* Welcome Header */}
      <div
        className="flex-shrink-0 px-6 py-6 border-b"
        style={{
          borderColor: colors.border.secondary,
          backgroundColor: colors.bg.secondary,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl">{emoji}</span>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: colors.text.primary }}
              >
                {greeting}, {t.chef}
              </h1>
            </div>
            <p style={{ color: colors.text.secondary, fontSize: '14px' }}>
              {date} • {hour}:{mins}
            </p>
            <p style={{ color: colors.text.tertiary, fontSize: '13px', marginTop: '4px' }}>
              {t.dragPanels} • {t.pinToGrid} �� {t.popOut}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={addCard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                color: colors.text.invert,
                backgroundColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}33`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.secondary;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.secondary}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.boxShadow = `0 0 20px ${colors.primary}33`;
              }}
            >
              <Plus size={16} />
              <span className="text-sm font-medium">{t.add}</span>
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                color: colors.text.secondary,
                backgroundColor: colors.border.secondary,
                border: `1px solid ${colors.border.primary}`,
              }}
            >
              <RefreshCcw size={16} />
              <span className="text-sm font-medium">{t.reset}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-auto relative" style={{ backgroundColor: colors.bg.primary }}>
        {cards.map((card) => {
          const cardColor = colorMap[card.color] || colorMap.cyan;
          const pos = gridToPx(card, containerRef.current?.offsetWidth || 1000);

          return (
            <Rnd
              key={card.id}
              position={{ x: pos.x, y: pos.y }}
              size={{ width: pos.w, height: pos.h }}
              onDragStop={(e, d) => {
                const newGrid = pxToGrid(
                  { x: d.x, y: d.y, w: pos.w, h: pos.h },
                  containerRef.current?.offsetWidth || 1000
                );
                update(card.id, { x: newGrid.x, y: newGrid.y });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                const newGrid = pxToGrid(
                  { x: position.x, y: position.y, w: ref.offsetWidth, h: ref.offsetHeight },
                  containerRef.current?.offsetWidth || 1000
                );
                update(card.id, { ...newGrid });
              }}
              onMouseDown={() => bringToFront(card.id)}
              style={{
                zIndex: card.z || z,
              }}
              bounds="parent"
              enableResizing={true}
              disableDragging={!card.pinned}
              className="group"
            >
              <div
                className="w-full h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: colors.bg.panel,
                  border: `1px solid ${colors.border.primary}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 4px 6px ${colors.shadow.md},
                    0 0 20px ${cardColor.glow}
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.panelHover;
                  e.currentTarget.style.boxShadow = `
                    0 10px 25px ${colors.shadow.lg},
                    0 0 30px ${cardColor.glow}
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bg.panel;
                  e.currentTarget.style.boxShadow = `
                    0 4px 6px ${colors.shadow.md},
                    0 0 20px ${cardColor.glow}
                  `;
                }}
              >
                {/* Panel Header */}
                <div
                  className="flex items-center px-4 py-3 border-b flex-shrink-0 gap-2 flex-nowrap whitespace-nowrap"
                  style={{
                    borderColor: colors.border.secondary,
                    minHeight: '40px',
                  }}
                  data-rnd-handle
                >
                  {/* Minimize Button (Left) */}
                  <button
                    onClick={() => update(card.id, { h: card.h === 0 ? 1 : 0 })}
                    className="p-1 hover:opacity-75 transition-opacity flex-shrink-0"
                    style={{ color: colors.text.secondary }}
                    title={t.minimize}
                  >
                    <Minus size={16} />
                  </button>

                  {/* Close Button (Left) */}
                  <button
                    onClick={() => remove(card.id)}
                    className="p-1 hover:opacity-75 transition-opacity flex-shrink-0"
                    style={{ color: colors.text.secondary }}
                    title={t.close}
                  >
                    <X size={16} />
                  </button>

                  {/* Title (Center) */}
                  <h3
                    className="font-semibold text-sm flex-1 truncate"
                    style={{ color: colors.text.primary }}
                  >
                    {t[card.title] || card.title}
                  </h3>

                  {/* Pin & Pop Out Buttons (Right) */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Pin Button */}
                    <button
                      onClick={() => update(card.id, { pinned: !card.pinned })}
                      className="p-1 hover:opacity-75 transition-opacity"
                      style={{ color: colors.text.secondary }}
                      title={card.pinned ? t.pinToGrid : t.dragPanels}
                    >
                      {card.pinned ? <Pin size={16} /> : <PinOff size={16} />}
                    </button>

                    {/* Pop Out Button */}
                    <button
                      className="p-1 hover:opacity-75 transition-opacity"
                      style={{ color: colors.text.secondary }}
                      title={t.popOut}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                {/* Panel Content */}
                {card.h > 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
                    <div
                      className="text-4xl font-bold"
                      style={{ color: cardColor.primary }}
                    >
                      {card.value}
                    </div>
                    <div
                      className="text-xs mt-2 text-center opacity-60"
                      style={{ color: colors.text.secondary }}
                    >
                      {card.id}
                    </div>
                  </div>
                )}
              </div>
            </Rnd>
          );
        })}
      </div>
    </div>
  );
}
