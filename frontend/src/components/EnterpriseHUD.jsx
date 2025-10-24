import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Plus, X, Settings, RotateCcw, Grid3x3, List, BarChart3,
  TrendingUp, AlertTriangle, Activity, DollarSign, Users, ChefHat,
  Maximize2, Minimize2, Menu, Zap
} from 'lucide-react';
import { useUserRole, ROLES } from '../hooks/useUserRole';

const LS_HUD = 'luccca:enterprise:hud:v1';

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

  const [viewMode, setViewMode] = useState('dashboard'); // dashboard | outlets
  const [format, setFormat] = useState('grid'); // grid | list
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [detailedModal, setDetailedModal] = useState(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);

  // Filter outlets based on user role
  const visibleOutlets = useMemo(() => {
    return MOCK_OUTLETS.filter(o => canViewOutlet(o.id));
  }, [user.outletIds]);

  // Emit dashboard ready event immediately on mount
  useEffect(() => {
    // Dispatch immediately
    window.dispatchEvent(new Event('dashboard-ready'));
    // Also dispatch after a tiny delay to ensure sidebar catches it
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

      {/* HEADER */}
      <HUDHeader
        user={user}
        viewMode={viewMode}
        onViewChange={setViewMode}
        format={format}
        onFormatChange={setFormat}
        onMaximize={() => setIsMaximized(!isMaximized)}
        isMaximized={isMaximized}
        outletCount={visibleOutlets.length}
        showRoleMenu={showRoleMenu}
        onToggleRoleMenu={() => setShowRoleMenu(!showRoleMenu)}
      />

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-auto relative">
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
        .jarvis-glow { animation: jarvisGlow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HUDHeader({ user, viewMode, onViewChange, format, onFormatChange, onMaximize, isMaximized, outletCount, showRoleMenu, onToggleRoleMenu }) {
  const now = new Date().toLocaleTimeString();

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
        <h1 className="text-xl font-bold jarvis-glow text-cyan-300">NEXUS</h1>
        <div className="text-xs font-mono text-cyan-400/60 border border-cyan-400/20 px-2 py-1 rounded">
          <span className="inline-block w-1 h-1 bg-cyan-400 rounded-full animate-pulse mr-1" />
          {now}
        </div>
        <div className="text-xs text-cyan-300/70">
          {user.name} • {outletCount} outlet{outletCount !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* View Mode */}
        <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Zap },
            { id: 'outlets', label: 'Outlets', icon: Grid3x3 },
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
            </button>
          ))}
        </div>

        {/* Display Format (outlets only) */}
        {viewMode === 'outlets' && (
          <div className="flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20">
            {[
              { id: 'grid', icon: Grid3x3 },
              { id: 'list', icon: List },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onFormatChange(id)}
                className={`p-1.5 rounded transition-all ${
                  format === id
                    ? 'bg-cyan-400/30 text-cyan-100'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
                title={id === 'grid' ? 'Grid View' : 'List View'}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Role Menu */}
        <div className="relative">
          <button
            onClick={() => onToggleRoleMenu(!showRoleMenu)}
            className="p-1.5 hover:bg-white/10 rounded text-cyan-300 hover:text-cyan-100 transition-all"
            title="Change Role (Test)"
          >
            <Menu size={16} />
          </button>
          {showRoleMenu && <RoleMenu />}
        </div>

        {/* Maximize */}
        <button
          onClick={onMaximize}
          className="p-1.5 hover:bg-white/10 rounded text-cyan-300 hover:text-cyan-100 transition-all"
          title={isMaximized ? 'Minimize' : 'Maximize'}
        >
          {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RoleMenu() {
  const { switchRole } = useUserRole();

  const roles = [
    { id: ROLES.CHEF, name: 'Chef (1 Outlet)', outlets: ['outlet-1'] },
    { id: ROLES.MANAGER, name: 'Manager (5 Outlets)', outlets: ['outlet-1', 'outlet-2', 'outlet-3', 'outlet-4', 'outlet-5'] },
    { id: ROLES.DIRECTOR, name: 'Director (10 Outlets)', outlets: Array.from({ length: 10 }, (_, i) => `outlet-${i + 1}`) },
    { id: ROLES.OWNER, name: 'Owner (All 20)', outlets: Array.from({ length: 20 }, (_, i) => `outlet-${i + 1}`) },
  ];

  return (
    <div
      className="absolute top-full right-0 mt-2 bg-slate-800 rounded-lg border border-cyan-400/30 shadow-xl z-50"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {roles.map(role => (
        <button
          key={role.id}
          onClick={() => switchRole(role.id, role.outlets)}
          className="block w-full text-left px-4 py-2 text-xs text-cyan-300 hover:bg-cyan-400/20 border-b border-cyan-400/10 last:border-b-0"
        >
          {role.name}
        </button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DashboardView({ outlets, user, onOpenDetail }) {
  const totalCovers = outlets.reduce((sum, o) => sum + o.covers, 0);
  const totalRevenue = outlets.reduce((sum, o) => sum + o.revenue, 0);
  const avgLabor = Math.round(outlets.reduce((sum, o) => sum + o.laborPercent, 0) / Math.max(outlets.length, 1));
  const avgFood = Math.round(outlets.reduce((sum, o) => sum + o.foodPercent, 0) / Math.max(outlets.length, 1));

  const highLaborOutlets = outlets.filter(o => o.laborPercent > 26);
  const highFoodOutlets = outlets.filter(o => o.foodPercent > 28);

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          title="Total Covers"
          value={totalCovers.toLocaleString()}
          detail={`${outlets.length} outlet${outlets.length !== 1 ? 's' : ''}`}
          color="#00d9ff"
        />
        <KPICard
          title="Revenue"
          value={'$' + (totalRevenue / 1000).toFixed(1) + 'K'}
          detail="Daily total"
          color="#4dff9e"
        />
        <KPICard
          title="Labor Cost"
          value={avgLabor + '%'}
          detail="Target: 26%"
          color={avgLabor > 26 ? '#ff6b4d' : '#00ff88'}
        />
        <KPICard
          title="Food Cost"
          value={avgFood + '%'}
          detail="Target: 28%"
          color={avgFood > 28 ? '#ff6b4d' : '#ffc844'}
        />
      </div>

      {/* ALERTS */}
      {(highLaborOutlets.length > 0 || highFoodOutlets.length > 0) && (
        <div
          className="p-6 rounded-lg border border-red-400/30 bg-red-400/5"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <h3 className="text-lg font-bold text-red-400 mb-4">⚠️ Alerts</h3>
          <div className="grid grid-cols-2 gap-4">
            {highLaborOutlets.length > 0 && (
              <div className="p-4 bg-red-400/10 rounded border border-red-400/20">
                <p className="text-red-400 font-semibold mb-2">{highLaborOutlets.length} High Labor Outlets</p>
                <p className="text-white/70 text-xs">{highLaborOutlets.map(o => o.name).join(', ')}</p>
              </div>
            )}
            {highFoodOutlets.length > 0 && (
              <div className="p-4 bg-orange-400/10 rounded border border-orange-400/20">
                <p className="text-orange-400 font-semibold mb-2">{highFoodOutlets.length} High Food Cost</p>
                <p className="text-white/70 text-xs">{highFoodOutlets.map(o => o.name).join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* OUTLET OVERVIEW */}
      <div>
        <h2 className="text-lg font-bold text-cyan-300 mb-4">Outlet Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          {outlets.slice(0, 6).map(outlet => (
            <OutletCard
              key={outlet.id}
              outlet={outlet}
              onClick={() => onOpenDetail(outlet)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OutletsView({ outlets, format, selectedOutlets, onSelectOutlet, onOpenDetail, canViewAll }) {
  if (format === 'list') {
    return (
      <div className="p-6 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-400/20 sticky top-0 bg-slate-900/80 backdrop-blur">
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Outlet</th>
              <th className="text-right py-3 px-4 text-cyan-300 font-semibold">Covers</th>
              <th className="text-right py-3 px-4 text-cyan-300 font-semibold">Revenue</th>
              <th className="text-right py-3 px-4 text-cyan-300 font-semibold">Labor</th>
              <th className="text-right py-3 px-4 text-cyan-300 font-semibold">Food</th>
              <th className="text-center py-3 px-4 text-cyan-300 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map(outlet => (
              <tr
                key={outlet.id}
                className={`border-b border-cyan-400/10 hover:bg-cyan-400/5 cursor-pointer transition-all ${
                  selectedOutlets.includes(outlet.id) ? 'bg-cyan-400/10' : ''
                }`}
              >
                <td className="py-3 px-4 font-semibold text-cyan-300">{outlet.name}</td>
                <td className="text-right py-3 px-4">{outlet.covers}</td>
                <td className="text-right py-3 px-4 text-green-400">${outlet.revenue.toLocaleString()}</td>
                <td className={`text-right py-3 px-4 ${outlet.laborPercent > 26 ? 'text-red-400 font-bold' : ''}`}>
                  {outlet.laborPercent}%
                </td>
                <td className={`text-right py-3 px-4 ${outlet.foodPercent > 28 ? 'text-red-400 font-bold' : ''}`}>
                  {outlet.foodPercent}%
                </td>
                <td className="text-center py-3 px-4">
                  <button
                    onClick={() => onOpenDetail(outlet)}
                    className="px-2 py-1 bg-cyan-400/20 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs font-semibold"
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
    <div className="p-6 grid grid-cols-5 gap-4 overflow-auto">
      {outlets.map(outlet => (
        <OutletCard
          key={outlet.id}
          outlet={outlet}
          selected={selectedOutlets.includes(outlet.id)}
          onClick={() => onSelectOutlet(outlet.id)}
          onDetail={() => onOpenDetail(outlet)}
        />
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function OutletCard({ outlet, selected, onClick, onDetail }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        selected
          ? 'border-cyan-400/60 bg-cyan-400/15'
          : 'border-cyan-400/20 bg-black/40 hover:border-cyan-400/40'
      }`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <h3 className="font-bold text-cyan-300 text-sm mb-3">{outlet.name}</h3>
      <div className="space-y-2 text-xs mb-4">
        <div className="flex justify-between"><span className="text-white/60">Covers</span><span className="text-cyan-300">{outlet.covers}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Revenue</span><span className="text-green-400">${outlet.revenue.toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Labor</span><span className={outlet.laborPercent > 26 ? 'text-red-400' : ''}>{outlet.laborPercent}%</span></div>
        <div className="flex justify-between"><span className="text-white/60">Food</span><span className={outlet.foodPercent > 28 ? 'text-red-400' : ''}>{outlet.foodPercent}%</span></div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDetail(); }}
        className="w-full py-1.5 bg-cyan-400/20 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs font-semibold"
      >
        View Details
      </button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function KPICard({ title, value, detail, color }) {
  return (
    <div
      className="p-4 rounded-lg border bg-black/40 hover:bg-black/60 transition-all"
      style={{
        borderColor: `${color}4d`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <p className="text-xs text-white/60 mb-1">{title}</p>
      <p className="text-2xl font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-xs text-white/40">{detail}</p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DetailModal({ outlet, onClose }) {
  const [format, setFormat] = useState('overview'); // overview | detail | ai

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[2000] p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="bg-slate-900 rounded-lg max-w-3xl w-full max-h-[85vh] overflow-auto border border-cyan-400/40"
        style={{
          boxShadow: '0 0 60px rgba(0, 217, 255, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-cyan-400/20 bg-gradient-to-r from-slate-900 to-slate-800">
          <h2 className="text-2xl font-bold text-cyan-300">{outlet.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Format Tabs */}
        <div className="flex gap-1 p-4 border-b border-cyan-400/20 bg-black/50">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'detail', label: 'Detailed' },
            { id: 'ai', label: 'AI Analysis' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFormat(tab.id)}
              className={`px-4 py-2 text-sm rounded font-semibold transition-all ${
                format === tab.id
                  ? 'bg-cyan-400/30 text-cyan-100'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {format === 'overview' && (
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Covers', value: outlet.covers, color: '#00d9ff' },
                { label: 'Revenue', value: '$' + outlet.revenue.toLocaleString(), color: '#4dff9e' },
                { label: 'Labor %', value: outlet.laborPercent + '%', color: outlet.laborPercent > 26 ? '#ff6b4d' : '#00ff88' },
                { label: 'Food %', value: outlet.foodPercent + '%', color: outlet.foodPercent > 28 ? '#ff6b4d' : '#ffc844' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded border border-cyan-400/20 bg-black/50">
                  <p className="text-white/60 text-xs mb-2">{item.label}</p>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {format === 'detail' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded border border-cyan-400/20 bg-black/50">
                  <h4 className="font-semibold text-cyan-300 mb-3">Front of House</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/60">Servers</span><span className="text-cyan-300 font-semibold">{outlet.fohStaff.servers}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Hosts</span><span className="text-cyan-300 font-semibold">{outlet.fohStaff.hosts}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Bartenders</span><span className="text-cyan-300 font-semibold">{outlet.fohStaff.bartenders}</span></div>
                    <div className="flex justify-between border-t border-cyan-400/10 pt-2"><span className="text-white/80 font-semibold">Total</span><span className="text-cyan-300 font-bold">{outlet.fohStaff.servers + outlet.fohStaff.hosts + outlet.fohStaff.bartenders}</span></div>
                  </div>
                </div>

                <div className="p-4 rounded border border-purple-400/20 bg-black/50">
                  <h4 className="font-semibold text-purple-300 mb-3">Back of House</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/60">Line Cooks</span><span className="text-purple-300 font-semibold">{outlet.bohStaff.lineCooks}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Prep Cooks</span><span className="text-purple-300 font-semibold">{outlet.bohStaff.prepCooks}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Expeditor</span><span className="text-purple-300 font-semibold">{outlet.bohStaff.expeditor}</span></div>
                    <div className="flex justify-between border-t border-purple-400/10 pt-2"><span className="text-white/80 font-semibold">Total</span><span className="text-purple-300 font-bold">{outlet.bohStaff.lineCooks + outlet.bohStaff.prepCooks + outlet.bohStaff.expeditor}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {format === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded border border-yellow-400/20 bg-yellow-400/5">
                <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Issues Detected</h4>
                <p className="text-white/70 text-sm">{outlet.laborPercent > 26 ? 'Labor cost above target. Consider reducing staff during off-peak hours.' : 'All metrics within target range.'}</p>
              </div>
              <div className="p-4 rounded border border-green-400/20 bg-green-400/5">
                <h4 className="font-semibold text-green-300 mb-2">✓ Recommendations</h4>
                <ul className="space-y-1 text-sm text-white/70">
                  <li>• Cross-train staff for multiple roles</li>
                  <li>• Optimize shift schedules based on peak hours</li>
                  <li>• Review labor efficiency metrics</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
