import React, { useState, useCallback } from "react";
import { Menu, X, ChefHat, BookOpen, Wine, Calendar, Zap } from "lucide-react";

// Main navigation panels
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Zap },
  { id: "culinary", label: "Culinary", icon: ChefHat },
  { id: "pastry", label: "Baking & Pastry", icon: ChefHat },
  { id: "mixology", label: "Mixology", icon: Wine },
  { id: "scheduling", label: "Schedules", icon: Calendar },
  { id: "recipepro", label: "Recipes", icon: BookOpen },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = useCallback((panelId) => {
    window.dispatchEvent(new CustomEvent("open-panel", {
      detail: { id: panelId, allowDuplicate: true }
    }));
    setIsOpen(false);
  }, []);

  const toggleNav = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Mobile/Tablet Sidebar Toggle Button */}
      <button
        onClick={toggleNav}
        className="fixed top-4 left-4 z-[9999] p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 transition-all md:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[8998] md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        className={`
          fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-950 to-slate-900
          border-r border-cyan-500/20 z-[9998]
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/15">
          <h1 className="text-xl font-bold text-cyan-400">LUCCCA</h1>
          <p className="text-xs text-cyan-300/60 mt-1">Restaurant Management</p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => openPanel(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  text-left text-sm font-medium
                  transition-all duration-200
                  hover:bg-cyan-500/20 hover:text-cyan-300
                  active:bg-cyan-500/30 active:text-cyan-200
                  text-cyan-300/80 hover:border hover:border-cyan-500/30
                  border border-transparent
                `}
                title={item.label}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-500/15 p-4">
          <button
            onClick={() => openPanel("settings")}
            className="w-full px-4 py-2 rounded-lg text-sm font-medium text-cyan-300/60 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
            title="Settings"
          >
            ⚙️ Settings
          </button>
        </div>
      </nav>

      {/* Main content margin on desktop */}
      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: 256px;
          }
        }
      `}</style>
    </>
  );
}
