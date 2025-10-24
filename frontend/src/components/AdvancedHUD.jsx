import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Plus, X, Settings, RotateCcw, Eye, EyeOff, Grid3x3, List,
  TrendingUp, AlertTriangle, Activity, DollarSign, Users, ChefHat,
  Video, Zap, BarChart3, Clock, MapPin, Wind, Maximize2, Pin, Unlock
} from 'lucide-react';

const LS_ADVANCED_HUD = 'luccca:advanced:hud:v2';
const LS_OUTLETS = 'luccca:outlets:config:v1';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOCK DATA - 20 OUTLETS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const OUTLETS = Array.from({ length: 20 }, (_, i) => ({
  id: `outlet-${i + 1}`,
  name: `Outlet ${i + 1}`,
  location: `Location ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
  covers: Math.floor(800 + Math.random() * 600),
  revenue: Math.floor(35000 + Math.random() * 20000),
  laborPercent: Math.floor(20 + Math.random() * 12),
  foodPercent: Math.floor(24 + Math.random() * 8),
  staffCount: Math.floor(12 + Math.random() * 10),
  efficiency: Math.floor(75 + Math.random() * 20),
  alerts: Math.floor(Math.random() * 4),
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function AdvancedHUD() {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('dashboard'); // dashboard | outlets | comparison
  const [displayFormat, setDisplayFormat] = useState('grid'); // grid | list | 3d
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [floatingWidgets, setFloatingWidgets] = useState([]);
  const [widgetPositions, setWidgetPositions] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [detailedModal, setDetailedModal] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_ADVANCED_HUD));
      if (saved) {
        setFloatingWidgets(saved.widgets || []);
        setWidgetPositions(saved.positions || {});
        setDisplayFormat(saved.format || 'grid');
      }
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(LS_ADVANCED_HUD, JSON.stringify({
      widgets: floatingWidgets,
      positions: widgetPositions,
      format: displayFormat,
    }));
  }, [floatingWidgets, widgetPositions, displayFormat]);

  const addFloatingWidget = (widgetId) => {
    if (!floatingWidgets.includes(widgetId)) {
      const newWidget = {
        id: `${widgetId}-${Date.now()}`,
        type: widgetId,
        x: Math.random() * 300,
        y: Math.random() * 200,
        w: 500,
        h: 400,
      };
      setFloatingWidgets(w => [...w, newWidget]);
    }
  };

  const removeFloatingWidget = (id) => {
    setFloatingWidgets(w => w.filter(widget => widget.id !== id));
  };

  const openDetailedModal = (type, outlet) => {
    setDetailedModal({ type, outlet });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(1800px 900px at 50% 0%, rgba(0, 217, 255, 0.15), transparent 60%), ' +
                    'radial-gradient(1000px 800px at 80% 100%, rgba(255, 77, 125, 0.1), transparent 70%), ' +
                    'linear-gradient(180deg, #0a1628 0%, #0f1f34 50%, #0a1628 100%)',
      }}
    >
      {/* JARVIS SCANLINES EFFECT */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.5) 2px, rgba(0, 217, 255, 0.5) 4px)',
          zIndex: 9999,
        }}
      />

      {/* HEADER */}
      <HUDHeader
        viewMode={viewMode}
        onViewChange={setViewMode}
        displayFormat={displayFormat}
        onFormatChange={setDisplayFormat}
        onSettings={() => setShowSettings(!showSettings)}
        floatingWidgetCount={floatingWidgets.length}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 relative overflow-auto">
        {viewMode === 'dashboard' && (
          <DashboardView
            outlets={OUTLETS}
            onOpenDetail={openDetailedModal}
            onAddWidget={addFloatingWidget}
          />
        )}

        {viewMode === 'outlets' && (
          <OutletsGridView
            outlets={OUTLETS}
            format={displayFormat}
            selectedOutlets={selectedOutlets}
            onSelectOutlet={(id) => setSelectedOutlets(prev =>
              prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
            )}
            onOpenDetail={openDetailedModal}
          />
        )}

        {viewMode === 'comparison' && selectedOutlets.length > 0 && (
          <ComparisonView
            outlets={OUTLETS.filter(o => selectedOutlets.includes(o.id))}
            onOpenDetail={openDetailedModal}
          />
        )}
      </div>

      {/* FLOATING WIDGETS */}
      {floatingWidgets.map(widget => (
        <FloatingWidget
          key={widget.id}
          widget={widget}
          pos={widgetPositions[widget.id] || { x: widget.x, y: widget.y, w: widget.w, h: widget.h }}
          onPositionChange={(newPos) => {
            setWidgetPositions(p => ({ ...p, [widget.id]: newPos }));
          }}
          onRemove={() => removeFloatingWidget(widget.id)}
          onOpenDetail={openDetailedModal}
        />
      ))}

      {/* DETAILED MODAL */}
      {detailedModal && (
        <DetailedModalView
          type={detailedModal.type}
          outlet={detailedModal.outlet}
          onClose={() => setDetailedModal(null)}
        />
      )}

      <style>{`
        /* JARVIS GLOW EFFECT */
        @keyframes jarvisGlow {
          0%, 100% { text-shadow: 0 0 5px rgba(0, 217, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(0, 217, 255, 0.8); }
        }
        .jarvis-glow { animation: jarvisGlow 2s ease-in-out infinite; }

        /* GLITCH EFFECT */
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .glitch-effect { animation: glitch 0.3s ease-in-out; }

        /* PARTICLE EFFECT */
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }

        /* 3D DEPTH */
        .depth-1 { transform: perspective(1000px) rotateX(0.5deg) rotateY(-0.5deg); }
        .depth-2 { transform: perspective(1000px) rotateX(1deg) rotateY(-1deg); }
        .depth-3 { transform: perspective(1000px) rotateX(1.5deg) rotateY(-1.5deg); }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEADER COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HUDHeader({ viewMode, onViewChange, displayFormat, onFormatChange, onSettings, floatingWidgetCount }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();

  return (
    <div
      className="flex-shrink-0 border-b border-cyan-400/30 px-6 py-4 flex items-center justify-between"
      style={{
        background: 'linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(0, 217, 255, 0.1), inset 0 1px 0 rgba(0, 217, 255, 0.3)',
      }}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">🎯</span>
          <h1 className="text-2xl font-black jarvis-glow bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            OPERATIONS NEXUS
          </h1>
        </div>

        <div className="text-xs font-mono text-cyan-400/60 border border-cyan-400/30 px-3 py-1.5 rounded flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {timeStr}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* View Mode Selector */}
        <div className="flex gap-1 bg-black/30 rounded-lg p-1 border border-cyan-400/20">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Zap },
            { id: 'outlets', label: '20 Outlets', icon: Grid3x3 },
            { id: 'comparison', label: 'Compare', icon: BarChart3 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
                viewMode === id
                  ? 'bg-cyan-400/30 text-cyan-100 border border-cyan-400/60'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Display Format */}
        {viewMode === 'outlets' && (
          <div className="flex gap-1 bg-black/30 rounded-lg p-1 border border-cyan-400/20">
            {[
              { id: 'grid', icon: Grid3x3 },
              { id: 'list', icon: List },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onFormatChange(id)}
                className={`p-1.5 rounded transition-all ${
                  displayFormat === id
                    ? 'bg-cyan-400/30 text-cyan-100'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Widget Count */}
        {floatingWidgetCount > 0 && (
          <div className="text-xs font-mono text-purple-400 bg-purple-400/10 border border-purple-400/30 px-2 py-1.5 rounded">
            {floatingWidgetCount} floating
          </div>
        )}

        {/* Settings */}
        <button
          onClick={onSettings}
          className="p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100"
        >
          <Settings size={16} />
        </button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━
// DASHBOARD VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DashboardView({ outlets, onOpenDetail, onAddWidget }) {
  const totalCovers = outlets.reduce((sum, o) => sum + o.covers, 0);
  const totalRevenue = outlets.reduce((sum, o) => sum + o.revenue, 0);
  const avgLabor = Math.round(outlets.reduce((sum, o) => sum + o.laborPercent, 0) / outlets.length);
  const avgFood = Math.round(outlets.reduce((sum, o) => sum + o.foodPercent, 0) / outlets.length);

  return (
    <div className="p-6 space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          title="Total Covers"
          value={totalCovers.toLocaleString()}
          detail="Across 20 outlets"
          color="#00d9ff"
          onClick={() => onOpenDetail('covers')}
        />
        <KPICard
          title="Total Revenue"
          value={'$' + (totalRevenue / 1000).toFixed(1) + 'K'}
          detail="Daily average"
          color="#4dff9e"
          onClick={() => onOpenDetail('revenue')}
        />
        <KPICard
          title="Avg Labor Cost"
          value={avgLabor + '%'}
          detail="All outlets"
          color="#ff6b4d"
          onClick={() => onOpenDetail('labor')}
        />
        <KPICard
          title="Avg Food Cost"
          value={avgFood + '%'}
          detail="All outlets"
          color="#ffc844"
          onClick={() => onOpenDetail('food')}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3">
        {['labor', 'revenue', 'coverage', 'alerts'].map(widget => (
          <button
            key={widget}
            onClick={() => onAddWidget(widget)}
            className="px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300 text-sm font-semibold hover:bg-cyan-400/20 transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            {widget.charAt(0).toUpperCase() + widget.slice(1)}
          </button>
        ))}
      </div>

      {/* ALERTS */}
      <AlertSection outlets={outlets} onOpenDetail={onOpenDetail} />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OUTLETS GRID VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OutletsGridView({ outlets, format, selectedOutlets, onSelectOutlet, onOpenDetail }) {
  if (format === 'list') {
    return (
      <div className="p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-400/20">
              <th className="text-left py-3 text-cyan-300 font-semibold">Outlet</th>
              <th className="text-right py-3 text-cyan-300 font-semibold">Covers</th>
              <th className="text-right py-3 text-cyan-300 font-semibold">Revenue</th>
              <th className="text-right py-3 text-cyan-300 font-semibold">Labor %</th>
              <th className="text-right py-3 text-cyan-300 font-semibold">Food %</th>
              <th className="text-center py-3 text-cyan-300 font-semibold">Staff</th>
              <th className="text-center py-3 text-cyan-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet, idx) => (
              <tr
                key={outlet.id}
                className={`border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-all cursor-pointer ${
                  selectedOutlets.includes(outlet.id) ? 'bg-cyan-400/10' : ''
                }`}
                onClick={() => onSelectOutlet(outlet.id)}
              >
                <td className="py-3 font-semibold text-cyan-300">{outlet.name}</td>
                <td className="text-right py-3 text-white/70">{outlet.covers}</td>
                <td className="text-right py-3 text-green-400">${outlet.revenue.toLocaleString()}</td>
                <td className={`text-right py-3 ${outlet.laborPercent > 26 ? 'text-red-400 font-bold' : 'text-white/70'}`}>
                  {outlet.laborPercent}%
                </td>
                <td className={`text-right py-3 ${outlet.foodPercent > 28 ? 'text-red-400 font-bold' : 'text-white/70'}`}>
                  {outlet.foodPercent}%
                </td>
                <td className="text-center py-3 text-cyan-300">{outlet.staffCount}</td>
                <td className="text-center py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenDetail('outlet', outlet); }}
                    className="px-2 py-1 bg-cyan-400/20 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-5 gap-4">
      {outlets.map(outlet => (
        <OutletCard
          key={outlet.id}
          outlet={outlet}
          selected={selectedOutlets.includes(outlet.id)}
          onSelect={() => onSelectOutlet(outlet.id)}
          onOpenDetail={() => onOpenDetail('outlet', outlet)}
        />
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OUTLET CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OutletCard({ outlet, selected, onSelect, onOpenDetail }) {
  const laborStatus = outlet.laborPercent > 26 ? 'high' : 'normal';
  const foodStatus = outlet.foodPercent > 28 ? 'high' : 'normal';

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        selected
          ? 'border-cyan-400/60 bg-cyan-400/15 shadow-lg shadow-cyan-400/20'
          : 'border-cyan-400/20 bg-black/20 hover:border-cyan-400/40 hover:bg-cyan-400/5'
      }`}
      style={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-cyan-300 text-sm">{outlet.name}</h3>
          <p className="text-xs text-white/40">{outlet.location}</p>
        </div>
        {outlet.alerts > 0 && (
          <div className="text-xs font-bold text-red-400 bg-red-400/20 px-2 py-1 rounded">
            {outlet.alerts} ⚠️
          </div>
        )}
      </div>

      <div className="space-y-2 mb-3 text-xs">
        <div className="flex justify-between">
          <span className="text-white/60">Covers</span>
          <span className="text-cyan-300 font-semibold">{outlet.covers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Revenue</span>
          <span className="text-green-400 font-semibold">${outlet.revenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Labor</span>
          <span className={laborStatus === 'high' ? 'text-red-400 font-bold' : 'text-white/70'}>
            {outlet.laborPercent}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Food</span>
          <span className={foodStatus === 'high' ? 'text-red-400 font-bold' : 'text-white/70'}>
            {outlet.foodPercent}%
          </span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
        className="w-full py-1.5 bg-cyan-400/20 border border-cyan-400/30 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs font-semibold transition-all"
      >
        View Details
      </button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPARISON VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ComparisonView({ outlets, onOpenDetail }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-cyan-300 mb-6">Outlet Comparison</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Labor Analysis */}
        <div
          className="p-6 rounded-lg border border-cyan-400/30 bg-black/30"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <h3 className="text-lg font-bold text-cyan-300 mb-4">Labor Cost Comparison</h3>
          <div className="space-y-3">
            {outlets
              .sort((a, b) => b.laborPercent - a.laborPercent)
              .map(outlet => (
                <div key={outlet.id} className="flex items-center justify-between">
                  <span className="text-white/70">{outlet.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-black/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${outlet.laborPercent > 26 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${(outlet.laborPercent / 40) * 100}%` }}
                      />
                    </div>
                    <span className={`font-semibold w-10 text-right ${outlet.laborPercent > 26 ? 'text-red-400' : 'text-green-400'}`}>
                      {outlet.laborPercent}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div
          className="p-6 rounded-lg border border-purple-400/30 bg-black/30"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <h3 className="text-lg font-bold text-purple-300 mb-4">🤖 AI Staff Optimization</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded">
              <p className="text-yellow-300 font-semibold mb-1">⚠️ High Labor Outlets</p>
              <p className="text-white/70">{outlets.filter(o => o.laborPercent > 26).length} outlets over 26% labor cost</p>
            </div>
            <div className="p-3 bg-green-400/10 border border-green-400/30 rounded">
              <p className="text-green-300 font-semibold mb-1">✓ Optimization Suggestion</p>
              <p className="text-white/70">Move 2 servers from Outlet 3 (30% labor) to Outlet 17 (22% labor)</p>
            </div>
            <div className="p-3 bg-blue-400/10 border border-blue-400/30 rounded">
              <p className="text-blue-300 font-semibold mb-1">💰 Potential Savings</p>
              <p className="text-white/70">$2,400/month by rebalancing staff across outlets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KPI CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function KPICard({ title, value, detail, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-lg border border-cyan-400/30 bg-black/40 hover:bg-cyan-400/5 cursor-pointer transition-all group"
      style={{
        backdropFilter: 'blur(8px)',
        boxShadow: `0 0 20px ${hexToRGBA(color, 0.1)}`,
      }}
    >
      <p className="text-xs text-white/60 mb-1">{title}</p>
      <p className="text-2xl font-black mb-1" style={{ color }}>{value}</p>
      <p className="text-xs text-white/40 group-hover:text-white/60 transition-all">{detail}</p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ALERT SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AlertSection({ outlets, onOpenDetail }) {
  const highLaborOutlets = outlets.filter(o => o.laborPercent > 26);
  const highFoodOutlets = outlets.filter(o => o.foodPercent > 28);

  return (
    <div
      className="p-6 rounded-lg border border-red-400/30 bg-red-400/5"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <h3 className="text-lg font-bold text-red-400 mb-4">🚨 Alerts & Recommendations</h3>
      <div className="grid grid-cols-3 gap-4 text-sm">
        {highLaborOutlets.length > 0 && (
          <div className="p-4 bg-red-400/10 rounded border border-red-400/20">
            <p className="text-red-400 font-semibold mb-1">{highLaborOutlets.length} High Labor Outlets</p>
            <p className="text-white/70 text-xs mb-2">{highLaborOutlets.map(o => o.name).join(', ')}</p>
            <button
              onClick={() => onOpenDetail('labor')}
              className="text-red-400 hover:text-red-300 text-xs font-semibold"
            >
              View Details →
            </button>
          </div>
        )}
        {highFoodOutlets.length > 0 && (
          <div className="p-4 bg-orange-400/10 rounded border border-orange-400/20">
            <p className="text-orange-400 font-semibold mb-1">{highFoodOutlets.length} High Food Cost</p>
            <p className="text-white/70 text-xs mb-2">{highFoodOutlets.map(o => o.name).join(', ')}</p>
            <button
              onClick={() => onOpenDetail('food')}
              className="text-orange-400 hover:text-orange-300 text-xs font-semibold"
            >
              View Details →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FLOATING WIDGET
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FloatingWidget({ widget, pos, onPositionChange, onRemove, onOpenDetail }) {
  return (
    <Rnd
      position={{ x: pos.x, y: pos.y }}
      size={{ width: pos.w, height: pos.h }}
      minWidth={300}
      minHeight={250}
      bounds={false}
      onDragStop={(_, d) => onPositionChange({ ...pos, x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, p) => {
        onPositionChange({
          ...pos,
          x: p.x,
          y: p.y,
          w: ref.offsetWidth,
          h: ref.offsetHeight,
        });
      }}
      style={{ zIndex: 1000 }}
      dragHandleClassName="widget-drag-handle"
    >
      <div
        className="w-full h-full rounded-lg flex flex-col"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 217, 255, 0.05))',
          border: '2px solid rgba(0, 217, 255, 0.4)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 217, 255, 0.25)',
        }}
      >
        <div className="widget-drag-handle flex items-center justify-between p-4 border-b border-cyan-400/20 bg-cyan-400/5 cursor-move">
          <span className="font-bold text-cyan-300 text-sm uppercase">{widget.type}</span>
          <button
            onClick={onRemove}
            className="text-white/50 hover:text-red-400 transition-all"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <p className="text-white/60 text-sm">Widget content for: {widget.type}</p>
        </div>
      </div>
    </Rnd>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DETAILED MODAL VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DetailedModalView({ type, outlet, onClose }) {
  const [format, setFormat] = useState('overview'); // overview | detail | ai

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[2000] p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-cyan-400/40 shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(0, 217, 255, 0.3), inset 0 1px 0 rgba(0, 217, 255, 0.2)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-cyan-400/20 bg-gradient-to-r from-slate-900 to-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300">{outlet ? outlet.name : 'Details'}</h2>
            <p className="text-sm text-white/60">{outlet ? outlet.location : type}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Format Selector */}
            <div className="flex gap-1 bg-black/50 rounded p-1 border border-cyan-400/20">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'detail', label: 'Detailed' },
                { id: 'ai', label: 'AI Analysis' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setFormat(id)}
                  className={`px-3 py-1 text-xs rounded font-semibold transition-all ${
                    format === id
                      ? 'bg-cyan-400/30 text-cyan-100'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {format === 'overview' && (
            <OverviewFormat outlet={outlet} />
          )}
          {format === 'detail' && (
            <DetailFormat outlet={outlet} />
          )}
          {format === 'ai' && (
            <AIAnalysisFormat outlet={outlet} />
          )}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODAL FORMAT COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OverviewFormat({ outlet }) {
  if (!outlet) return <p className="text-white/60">No outlet selected</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Covers', value: outlet.covers, color: '#00d9ff' },
          { label: 'Revenue', value: '$' + outlet.revenue.toLocaleString(), color: '#4dff9e' },
          { label: 'Labor %', value: outlet.laborPercent + '%', color: outlet.laborPercent > 26 ? '#ff6b4d' : '#00ff88' },
          { label: 'Food %', value: outlet.foodPercent + '%', color: outlet.foodPercent > 28 ? '#ff6b4d' : '#ffc844' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-lg border border-cyan-400/20 bg-black/30">
            <p className="text-white/60 text-xs mb-2">{item.label}</p>
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailFormat({ outlet }) {
  if (!outlet) return <p className="text-white/60">No outlet selected</p>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-cyan-300 mb-4">Labor Breakdown (FOH/BOH)</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* FOH */}
          <div className="p-4 rounded-lg border border-cyan-400/20 bg-black/30">
            <h4 className="font-semibold text-cyan-300 mb-3">Front of House</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Servers</span><span className="text-cyan-300 font-semibold">6</span></div>
              <div className="flex justify-between"><span className="text-white/60">Hosts</span><span className="text-cyan-300 font-semibold">2</span></div>
              <div className="flex justify-between"><span className="text-white/60">Bartenders</span><span className="text-cyan-300 font-semibold">3</span></div>
              <div className="flex justify-between border-t border-cyan-400/10 pt-2"><span className="text-white/80 font-semibold">Total FOH</span><span className="text-cyan-300 font-bold">11</span></div>
            </div>
          </div>

          {/* BOH */}
          <div className="p-4 rounded-lg border border-purple-400/20 bg-black/30">
            <h4 className="font-semibold text-purple-300 mb-3">Back of House</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Line Cooks</span><span className="text-purple-300 font-semibold">4</span></div>
              <div className="flex justify-between"><span className="text-white/60">Prep Cooks</span><span className="text-purple-300 font-semibold">2</span></div>
              <div className="flex justify-between"><span className="text-white/60">Expeditor</span><span className="text-purple-300 font-semibold">1</span></div>
              <div className="flex justify-between border-t border-purple-400/10 pt-2"><span className="text-white/80 font-semibold">Total BOH</span><span className="text-purple-300 font-bold">7</span></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-cyan-300 mb-4">Shift Schedule</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {['Breakfast', 'Lunch', 'Dinner'].map(shift => (
            <div key={shift} className="p-3 rounded border border-cyan-400/20 bg-black/30">
              <p className="text-cyan-300 font-semibold mb-2">{shift}</p>
              <div className="space-y-1 text-white/70">
                <p>Staff: 8-12</p>
                <p>Hours: {shift === 'Breakfast' ? '6-11' : shift === 'Lunch' ? '11-2' : '5-11'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIAnalysisFormat({ outlet }) {
  if (!outlet) return <p className="text-white/60">No outlet selected</p>;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-yellow-400/30 bg-yellow-400/5">
        <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Issue Identified</h4>
        <p className="text-white/80 text-sm mb-3">Labor cost at {outlet.laborPercent}% - {outlet.laborPercent > 26 ? 'ABOVE' : 'BELOW'} 26% target</p>
        <p className="text-white/60 text-sm">Current labor spend suggests {outlet.laborPercent > 26 ? 'over-staffing' : 'optimal staffing'} for revenue level.</p>
      </div>

      <div className="p-4 rounded-lg border border-green-400/30 bg-green-400/5">
        <h4 className="font-semibold text-green-300 mb-2">✓ AI Recommendations</h4>
        <ul className="space-y-2 text-sm text-white/70">
          <li>• Reduce server count during off-peak hours (11 AM - 4 PM)</li>
          <li>• Cross-train staff to handle multiple roles (increase efficiency)</li>
          <li>• Implement tighter scheduling based on historical cover patterns</li>
          <li>• Consider combining FOH/BOH prep during slower periods</li>
          {outlet.laborPercent > 26 && (
            <>
              <li>• Move 1-2 servers to outlet with lower labor %</li>
              <li>• Potential monthly savings: $1,200 - $1,800</li>
            </>
          )}
        </ul>
      </div>

      <div className="p-4 rounded-lg border border-blue-400/30 bg-blue-400/5">
        <h4 className="font-semibold text-blue-300 mb-2">📊 Historical Comparison</h4>
        <p className="text-white/70 text-sm">30-day average: {Math.round(outlet.laborPercent - 1)}% | 7-day trend: ↑ {Math.round(Math.random() * 2)}%</p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function hexToRGBA(hex, a) {
  const s = hex.replace('#', '');
  const n = parseInt(s.length === 3 ? s.split('').map(ch => ch + ch).join('') : s, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
