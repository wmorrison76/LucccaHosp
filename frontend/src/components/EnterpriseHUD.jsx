import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Plus, X, Settings, RotateCcw, Grid3x3, List, BarChart3,
  TrendingUp, AlertTriangle, Activity, DollarSign, Users, ChefHat,
  Maximize2, Minimize2, Menu, Zap, GripHorizontal, ExternalLink, Pin, PinOff
} from 'lucide-react';
import { useUserRole, ROLES } from '../hooks/useUserRole';

const LS_HUD = 'luccca:enterprise:hud:v2';
const LS_PANELS = 'luccca:enterprise:panels:v1';

// Mock data for 20 outlets
const MOCK_OUTLETS = Array.from({ length: 20 }, (_, i) => ({
  id: `outlet-${i + 1}`,
  name: `Restaurant ${i + 1}`,
  location: `City ${String.fromCharCode(65 + (i % 26))}`,
  covers: Math.floor(800 + Math.random() * 600),
  revenue: Math.floor(35000 + Math.random() * 20000),
  laborPercent: Math.floor(20 + Math.random() * 12),
  foodPercent: Math.floor(24 + Math.random() * 8),
  staffCount: Math.floor(12 + Math.random() * 10),
  efficiency: Math.floor(75 + Math.random() * 20),
  alerts: Math.floor(Math.random() * 4),
  fohStaff: { servers: 6, hosts: 2, bartenders: 3 },
  bohStaff: { lineCooks: 4, prepCooks: 2, expeditor: 1 },
}));

export default function EnterpriseHUD() {
  const containerRef = useRef(null);
  const { user, canViewOutlet, canViewAllOutlets } = useUserRole();

  const [viewMode, setViewMode] = useState('dashboard');
  const [format, setFormat] = useState('grid');
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [detailedModal, setDetailedModal] = useState(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Floating panels state
  const [panels, setPanels] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PANELS) || 'null');
      return saved || getDefaultPanels();
    } catch {
      return getDefaultPanels();
    }
  });
  const [zIndex, setZIndex] = useState(10);

  // Filter outlets based on user role
  const visibleOutlets = useMemo(() => {
    return MOCK_OUTLETS.filter(o => canViewOutlet(o.id));
  }, [user.outletIds]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Emit dashboard ready event
  useEffect(() => {
    window.dispatchEvent(new Event('dashboard-ready'));
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('dashboard-ready'));
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(LS_HUD, JSON.stringify({
      viewMode,
      format,
      selectedOutlets,
    }));
  }, [viewMode, format, selectedOutlets]);

  // Save panel positions to localStorage
  useEffect(() => {
    localStorage.setItem(LS_PANELS, JSON.stringify(panels));
  }, [panels]);

  const updatePanel = useCallback((panelId, updates) => {
    setPanels(prev => prev.map(p => p.id === panelId ? { ...p, ...updates } : p));
  }, []);

  const removePanel = useCallback((panelId) => {
    setPanels(prev => prev.filter(p => p.id !== panelId));
  }, []);

  const bringToFront = useCallback((panelId) => {
    setZIndex(z => z + 1);
    updatePanel(panelId, { z: zIndex + 1 });
  }, [zIndex, updatePanel]);

  const addPanel = useCallback(() => {
    const newPanel = {
      id: 'panel-' + Math.random().toString(36).slice(2, 8),
      title: 'New Panel',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: 400,
      height: 300,
      z: zIndex + 1,
      pinned: false,
      color: '#00d9ff',
    };
    setPanels(prev => [...prev, newPanel]);
    setZIndex(z => z + 1);
  }, [zIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden bg-slate-900"
      style={{
        background: 'radial-gradient(1800px 900px at 50% 0%, rgba(0, 217, 255, 0.12), transparent 60%), ' +
                    'linear-gradient(180deg, #0a1628 0%, #0f1f34 100%)',
      }}
    >
      {/* JARVIS SCANLINES */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.02,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.5) 2px, rgba(0, 217, 255, 0.5) 4px)',
          zIndex: 9999,
        }}
      />

      {/* WELCOME HEADER */}
      <WelcomeHeader
        user={user}
        currentTime={currentTime}
        outletCount={visibleOutlets.length}
        isMaximized={isMaximized}
        onMaximize={() => setIsMaximized(!isMaximized)}
      />

      {/* MAIN HUD HEADER */}
      <HUDHeader
        user={user}
        viewMode={viewMode}
        onViewChange={setViewMode}
        format={format}
        onFormatChange={setFormat}
        outletCount={visibleOutlets.length}
        showRoleMenu={showRoleMenu}
        onToggleRoleMenu={() => setShowRoleMenu(!showRoleMenu)}
      />

      {/* CONTENT AREA WITH FLOATING PANELS */}
      <div className="flex-1 overflow-auto relative" style={{ position: 'relative' }}>
        {/* Background dashboard content */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {viewMode === 'dashboard' && (
            <DashboardView
              outlets={visibleOutlets}
              user={user}
              onOpenDetail={setDetailedModal}
            />
          )}

          {viewMode === 'outlets' && (
            <OutletsView
              outlets={visibleOutlets}
              format={format}
              selectedOutlets={selectedOutlets}
              onSelectOutlet={(id) => setSelectedOutlets(prev =>
                prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
              )}
              onOpenDetail={setDetailedModal}
              canViewAll={canViewAllOutlets()}
            />
          )}
        </div>

        {/* Floating Panels */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {panels.map(panel => (
            <FloatingPanel
              key={panel.id}
              panel={panel}
              onUpdate={(updates) => updatePanel(panel.id, updates)}
              onRemove={() => removePanel(panel.id)}
              onFocus={() => bringToFront(panel.id)}
            />
          ))}
        </div>
      </div>

      {/* Add Panel Button */}
      <button
        onClick={addPanel}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110"
        title="Add floating panel"
        style={{
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
          zIndex: 1000,
        }}
      >
        <Plus size={24} />
      </button>

      {/* DETAIL MODAL */}
      {detailedModal && (
        <DetailModal
          outlet={detailedModal}
          onClose={() => setDetailedModal(null)}
        />
      )}

      <style>{`
        @keyframes jarvisGlow {
          0%, 100% { text-shadow: 0 0 5px rgba(0, 217, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(0, 217, 255, 0.8); }
        }
        @keyframes hologramFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.8; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .jarvis-glow { animation: jarvisGlow 2s ease-in-out infinite; }
        .hologram-effect { animation: hologramFlicker 0.15s infinite; }
        .particle { animation: particleFloat 3s ease-out forwards; }
      `}</style>
    </div>
  );
}

function getDefaultPanels() {
  return [
    {
      id: 'kpi-covers',
      title: "Today's Covers",
      x: 100,
      y: 100,
      width: 300,
      height: 250,
      z: 10,
      pinned: true,
      color: '#00d9ff',
    },
    {
      id: 'kpi-revenue',
      title: 'Revenue',
      x: 420,
      y: 100,
      width: 300,
      height: 250,
      z: 11,
      pinned: true,
      color: '#00ff88',
    },
    {
      id: 'kpi-labor',
      title: 'Labor Cost %',
      x: 740,
      y: 100,
      width: 300,
      height: 250,
      z: 12,
      pinned: true,
      color: '#ffc844',
    },
    {
      id: 'kpi-food',
      title: 'Food Cost %',
      x: 250,
      y: 370,
      width: 300,
      height: 250,
      z: 13,
      pinned: true,
      color: '#ff4d7d',
    },
  ];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WelcomeHeader({ user, currentTime, outletCount, isMaximized, onMaximize }) {
  const hour = currentTime.getHours();
  let greeting = '';
  let emoji = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning, Chef';
    emoji = '🌅';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon, Chef';
    emoji = '🌤️';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good Evening, Chef';
    emoji = '🌙';
  } else {
    greeting = 'Night Service, Chef';
    emoji = '🌃';
  }

  const timeStr = currentTime.toLocaleTimeString();
  const dateStr = currentTime.toLocaleDateString();

  return (
    <div
      className="flex-shrink-0 border-b border-cyan-400/20 px-8 py-6"
      style={{
        background: 'linear-gradient(90deg, rgba(0, 217, 255, 0.08), rgba(0, 217, 255, 0.03))',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl flex-shrink-0">{emoji}</span>
            <div className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent jarvis-glow">
              {greeting}
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="font-mono text-cyan-400/70 border border-cyan-400/30 px-3 py-1 rounded">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mr-2" />
              {timeStr} • {dateStr}
            </div>
            <div className="text-cyan-300/70">
              {user.name} • {outletCount} outlet{outletCount !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="text-xs text-cyan-400/50 mt-2 flex items-center gap-2">
            <GripHorizontal size={12} />
            <span>Drag panels • Pin to grid • Pop out anytime</span>
          </div>
        </div>
        <button
          onClick={onMaximize}
          className="flex-shrink-0 p-2 rounded hover:bg-cyan-400/10 transition-colors"
          title={isMaximized ? 'Minimize' : 'Maximize'}
        >
          {isMaximized ? <Minimize2 size={20} className="text-cyan-300" /> : <Maximize2 size={20} className="text-cyan-300" />}
        </button>
      </div>
    </div>
  );
}

function HUDHeader({ user, viewMode, onViewChange, format, onFormatChange, outletCount, showRoleMenu, onToggleRoleMenu }) {
  return (
    <div
      className="flex-shrink-0 border-b border-cyan-400/30 px-6 py-3 flex items-center justify-between"
      style={{
        background: 'linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold jarvis-glow text-cyan-300">NEXUS</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* View Mode */}
        <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Zap },
            { id: 'outlets', label: '20 Outlets', icon: Grid3x3 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
                viewMode === id
                  ? 'bg-cyan-400/30 text-cyan-100 border border-cyan-400/40'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
              title={label}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Display Format */}
        {viewMode === 'outlets' && (
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            {[
              { id: 'grid', icon: Grid3x3 },
              { id: 'list', icon: List },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onFormatChange(id)}
                className={`px-2.5 py-1.5 rounded transition-all ${
                  format === id
                    ? 'bg-cyan-400/30 text-cyan-100'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
                title={id}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Role Menu */}
        <button
          onClick={onToggleRoleMenu}
          className="p-2 rounded hover:bg-cyan-400/10 transition-colors"
          title="Role & Settings"
        >
          <Menu size={16} className="text-cyan-400" />
        </button>
      </div>
    </div>
  );
}

function FloatingPanel({ panel, onUpdate, onRemove, onFocus }) {
  return (
    <Rnd
      default={{
        x: panel.x,
        y: panel.y,
        width: panel.width,
        height: panel.height,
      }}
      onDragStop={(e, d) => onUpdate({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
      }}
      bounds="parent"
      onMouseDown={onFocus}
      style={{
        zIndex: panel.z,
      }}
      dragHandleClassName="hud-drag-handle"
      enableResizing={{
        bottom: true,
        right: true,
        bottomRight: true,
      }}
    >
      <div
        className="relative w-full h-full rounded-lg border border-cyan-400/40 overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 30px ${panel.color}40, 0 0 60px ${panel.color}20, inset 0 0 20px ${panel.color}10`,
        }}
      >
        {/* Panel Header */}
        <div
          className="hud-drag-handle border-b border-cyan-400/20 px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
          style={{
            background: `linear-gradient(90deg, ${panel.color}15, ${panel.color}05)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <GripHorizontal size={14} className="text-cyan-400/60 flex-shrink-0" />
            <h3 className="text-sm font-semibold text-cyan-200 truncate">{panel.title}</h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={onRemove}
              className="p-1 rounded hover:bg-red-500/20 transition-colors"
              title="Close"
            >
              <X size={14} className="text-red-400" />
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-auto p-4 text-cyan-100/70 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Panel ID:</span>
              <span className="font-mono text-xs text-cyan-400">{panel.id}</span>
            </div>
            <div className="text-center mt-4 text-cyan-400/50">
              💡 Drag by header to move
            </div>
            <div className="text-center text-cyan-400/50 text-xs">
              Resize from bottom-right corner
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );
}

function DashboardView({ outlets, user, onOpenDetail }) {
  const totalCovers = outlets.reduce((sum, o) => sum + o.covers, 0);
  const totalRevenue = outlets.reduce((sum, o) => sum + o.revenue, 0);
  const avgLabor = Math.round(outlets.reduce((sum, o) => sum + o.laborPercent, 0) / outlets.length);
  const avgFood = Math.round(outlets.reduce((sum, o) => sum + o.foodPercent, 0) / outlets.length);

  const highLaborOutlets = outlets.filter(o => o.laborPercent > 26);
  const highFoodOutlets = outlets.filter(o => o.foodPercent > 28);

  return (
    <div className="w-full h-full p-8 overflow-auto" style={{ pointerEvents: 'auto' }}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Activity} label="Total Covers" value={totalCovers.toLocaleString()} color="#00d9ff" target="" />
        <KPICard icon={DollarSign} label="Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}K`} color="#00ff88" target="" />
        <KPICard icon={ChefHat} label="Labor Cost" value={`${avgLabor}%`} color={avgLabor > 26 ? '#ff6b4d' : '#00ff88'} target="Target: 26%" />
        <KPICard icon={TrendingUp} label="Food Cost" value={`${avgFood}%`} color={avgFood > 28 ? '#ff6b4d' : '#00ff88'} target="Target: 28%" />
      </div>

      {/* Alert Section */}
      {(highLaborOutlets.length > 0 || highFoodOutlets.length > 0) && (
        <div className="mb-6 border border-yellow-500/40 rounded-lg p-4 bg-yellow-500/5">
          <div className="flex items-center gap-2 mb-3 text-yellow-300">
            <AlertTriangle size={18} />
            <h3 className="font-semibold">Alerts</h3>
          </div>
          {highLaborOutlets.length > 0 && (
            <div className="text-sm text-yellow-200/70 mb-2">
              🔴 {highLaborOutlets.length} outlet{highLaborOutlets.length > 1 ? 's' : ''} with high labor: {highLaborOutlets.map(o => o.name).join(', ')}
            </div>
          )}
          {highFoodOutlets.length > 0 && (
            <div className="text-sm text-yellow-200/70">
              🔴 {highFoodOutlets.length} outlet{highFoodOutlets.length > 1 ? 's' : ''} with high food cost: {highFoodOutlets.map(o => o.name).join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Outlet Overview Grid */}
      <div className="text-cyan-300 font-semibold mb-3">Outlet Overview (First 6)</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {outlets.slice(0, 6).map(outlet => (
          <div
            key={outlet.id}
            className="border border-cyan-400/30 rounded-lg p-3 cursor-pointer hover:border-cyan-300 hover:bg-cyan-400/5 transition-all"
            onClick={() => onOpenDetail(outlet)}
          >
            <div className="text-sm font-semibold text-cyan-200 mb-2">{outlet.name}</div>
            <div className="text-xs space-y-1 text-cyan-300/70">
              <div className="flex justify-between">
                <span>Covers:</span>
                <span className="font-semibold text-cyan-300">{outlet.covers}</span>
              </div>
              <div className="flex justify-between">
                <span>Labor:</span>
                <span className={outlet.laborPercent > 26 ? 'text-red-400' : 'text-green-400'}>{outlet.laborPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Food:</span>
                <span className={outlet.foodPercent > 28 ? 'text-red-400' : 'text-green-400'}>{outlet.foodPercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutletsView({ outlets, format, selectedOutlets, onSelectOutlet, onOpenDetail, canViewAll }) {
  if (format === 'grid') {
    return (
      <div className="w-full h-full p-8 overflow-auto" style={{ pointerEvents: 'auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {outlets.map(outlet => (
            <div
              key={outlet.id}
              className="border border-cyan-400/30 rounded-lg p-4 cursor-pointer hover:border-cyan-300 hover:bg-cyan-400/5 transition-all"
              onClick={() => onOpenDetail(outlet)}
            >
              <div className="text-sm font-semibold text-cyan-200 mb-2">{outlet.name}</div>
              <div className="text-xs space-y-2 text-cyan-300/70 mb-3">
                <div className="flex justify-between">
                  <span>Covers:</span>
                  <span className="font-semibold">{outlet.covers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-semibold">${(outlet.revenue / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Labor:</span>
                  <span className={outlet.laborPercent > 26 ? 'text-red-400' : 'text-green-400'}>{outlet.laborPercent}%</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(outlet);
                }}
                className="w-full text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 py-1.5 rounded transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 overflow-auto" style={{ pointerEvents: 'auto' }}>
      <table className="w-full text-sm text-cyan-100/70">
        <thead>
          <tr className="border-b border-cyan-400/20 text-cyan-300 font-semibold text-left">
            <th className="pb-2 px-3">Outlet</th>
            <th className="pb-2 px-3 text-right">Covers</th>
            <th className="pb-2 px-3 text-right">Revenue</th>
            <th className="pb-2 px-3 text-right">Labor %</th>
            <th className="pb-2 px-3 text-right">Food %</th>
            <th className="pb-2 px-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {outlets.map(outlet => (
            <tr key={outlet.id} className="border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-colors">
              <td className="py-3 px-3 text-cyan-200">{outlet.name}</td>
              <td className="py-3 px-3 text-right">{outlet.covers}</td>
              <td className="py-3 px-3 text-right">${(outlet.revenue / 1000).toFixed(1)}K</td>
              <td className={`py-3 px-3 text-right ${outlet.laborPercent > 26 ? 'text-red-400' : 'text-green-400'}`}>{outlet.laborPercent}%</td>
              <td className={`py-3 px-3 text-right ${outlet.foodPercent > 28 ? 'text-red-400' : 'text-green-400'}`}>{outlet.foodPercent}%</td>
              <td className="py-3 px-3 text-right">
                <button
                  onClick={() => onOpenDetail(outlet)}
                  className="text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-2 py-1 rounded transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, color, target }) {
  return (
    <div
      className="rounded-lg p-4 border border-cyan-400/30 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        boxShadow: `0 0 20px ${color}30, inset 0 0 10px ${color}10`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-cyan-300">{label}</span>
        <Icon size={14} style={{ color }} />
      </div>
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      {target && (
        <div className="text-xs text-cyan-300/50 mt-1">{target}</div>
      )}
    </div>
  );
}

function DetailModal({ outlet, onClose }) {
  const [format, setFormat] = useState('overview');

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-lg border border-cyan-400/40 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 40px rgba(0, 217, 255, 0.3)',
        }}
      >
        {/* Modal Header */}
        <div className="border-b border-cyan-400/20 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <h2 className="text-lg font-bold text-cyan-200">{outlet.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded transition-colors"
          >
            <X size={20} className="text-red-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-cyan-400/20 px-6 pt-4 bg-black/30">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'detail', label: 'Detail' },
            { id: 'ai', label: 'AI Analysis' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFormat(tab.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-t transition-colors ${
                format === tab.id
                  ? 'bg-cyan-500/20 text-cyan-200 border-b-2 border-cyan-400'
                  : 'text-cyan-400/60 hover:text-cyan-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 text-cyan-100/70 text-sm space-y-4">
          {format === 'overview' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cyan-500/10 rounded p-3 border border-cyan-400/20">
                <div className="text-xs text-cyan-400 mb-1">Covers</div>
                <div className="text-2xl font-bold text-cyan-300">{outlet.covers}</div>
              </div>
              <div className="bg-green-500/10 rounded p-3 border border-green-400/20">
                <div className="text-xs text-green-400 mb-1">Revenue</div>
                <div className="text-2xl font-bold text-green-300">${(outlet.revenue / 1000).toFixed(1)}K</div>
              </div>
              <div className={`${outlet.laborPercent > 26 ? 'bg-red-500/10 border-red-400/20' : 'bg-green-500/10 border-green-400/20'} rounded p-3 border`}>
                <div className={`text-xs mb-1 ${outlet.laborPercent > 26 ? 'text-red-400' : 'text-green-400'}`}>Labor %</div>
                <div className={`text-2xl font-bold ${outlet.laborPercent > 26 ? 'text-red-300' : 'text-green-300'}`}>{outlet.laborPercent}%</div>
              </div>
              <div className={`${outlet.foodPercent > 28 ? 'bg-red-500/10 border-red-400/20' : 'bg-green-500/10 border-green-400/20'} rounded p-3 border`}>
                <div className={`text-xs mb-1 ${outlet.foodPercent > 28 ? 'text-red-400' : 'text-green-400'}`}>Food %</div>
                <div className={`text-2xl font-bold ${outlet.foodPercent > 28 ? 'text-red-300' : 'text-green-300'}`}>{outlet.foodPercent}%</div>
              </div>
            </div>
          )}

          {format === 'detail' && (
            <div className="space-y-3">
              <div className="border border-cyan-400/20 rounded p-3 bg-cyan-400/5">
                <div className="font-semibold text-cyan-200 mb-2">FOH Staff</div>
                <div className="text-xs space-y-1">
                  <div>Servers: {outlet.fohStaff.servers}</div>
                  <div>Hosts: {outlet.fohStaff.hosts}</div>
                  <div>Bartenders: {outlet.fohStaff.bartenders}</div>
                </div>
              </div>
              <div className="border border-cyan-400/20 rounded p-3 bg-cyan-400/5">
                <div className="font-semibold text-cyan-200 mb-2">BOH Staff</div>
                <div className="text-xs space-y-1">
                  <div>Line Cooks: {outlet.bohStaff.lineCooks}</div>
                  <div>Prep Cooks: {outlet.bohStaff.prepCooks}</div>
                  <div>Expeditor: {outlet.bohStaff.expeditor}</div>
                </div>
              </div>
            </div>
          )}

          {format === 'ai' && (
            <div className="space-y-3">
              <div className="border border-cyan-400/20 rounded p-3 bg-cyan-400/5">
                <div className="font-semibold text-cyan-200 mb-1">Issues</div>
                <div className="text-xs text-cyan-300/70">
                  {outlet.laborPercent > 26 && '• High labor cost detected\n'}
                  {outlet.foodPercent > 28 && '• High food cost detected\n'}
                  {outlet.efficiency < 80 && '• Efficiency below target'}
                </div>
              </div>
              <div className="border border-cyan-400/20 rounded p-3 bg-cyan-400/5">
                <div className="font-semibold text-cyan-200 mb-1">Recommendations</div>
                <div className="text-xs text-cyan-300/70">
                  • Review staff scheduling\n
                  • Analyze portion control\n
                  • Conduct waste audit
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-400/20 px-6 py-3 bg-black/30 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
