import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu, Sun, Moon } from "lucide-react";

// Direct ES6 imports of asset URLs - Vite will properly resolve these
import dashboardImg from "../assets/analytics.png";
import eventStudioImg from "../assets/LUCCCA_ECHO.png";
import maestroImg from "../assets/MaestroBQT.png";
import echoAurumImg from "../assets/Echo-Ai.png";
import echoLayoutImg from "../assets/Echo_F.png";
import culinaryImg from "../assets/culinary_library.png";
import pastryImg from "../assets/baking-&-Pastry.png";
import mixologyImg from "../assets/mixology.png";
import scheduleImg from "../assets/schedule.png";
import inventoryImg from "../assets/food_inventory.png";
import crmImg from "../assets/CRM.png";
import chefNetImg from "../assets/ChefNet.png";
import supportImg from "../assets/help-desk.png";
import settingsImg from "../assets/settings.png";
import logoImg from "../assets/LUCCCA_Vertical_Inline.png";

const iconUrls = {
  dashboard: dashboardImg,
  eventStudio: eventStudioImg,
  maestro: maestroImg,
  echoAurum: echoAurumImg,
  echoLayout: echoLayoutImg,
  culinary: culinaryImg,
  pastry: pastryImg,
  mixology: mixologyImg,
  schedule: scheduleImg,
  inventory: inventoryImg,
  crm: crmImg,
  chefNet: chefNetImg,
  support: supportImg,
  settings: settingsImg,
  logo: logoImg,
};

export default function Sidebar({
  isOpen: pOpen,
  toggleSidebar: pToggle,
  isDarkMode: pDark,
  toggleDarkMode: pToggleDark
}) {
  const sidebarRef = useRef(null);
  const [localOpen, setLocalOpen] = useState(true);
  const [localDark, setLocalDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const isOpen = pOpen ?? localOpen;
  const toggleSidebar = pToggle ?? (() => setLocalOpen(v => !v));
  const isDarkMode = pDark ?? localDark;
  const toggleDarkMode = pToggleDark ?? (() => {
    const next = !localDark;
    setLocalDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { flags: { dark: next } } }));
  });

  // Collapsed/expanded width
  const W_COLLAPSED = 60;
  const W_EXPANDED = 280;
  const widthPx = isOpen ? `${W_EXPANDED}px` : `${W_COLLAPSED}px`;

  useEffect(() => {
    document.body.classList.toggle("sb-collapsed", !isOpen);
  }, [isOpen]);

  // Auto-close sidebar when clicking outside (on desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target) && window.innerWidth >= 1024) {
        setLocalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open a Board panel by id
  const openPanel = (id, detail = {}) => {
    if (!id) return;
    try {
      window.dispatchEvent(new CustomEvent("open-panel", { detail: { id, ...detail } }));
      if (isOpen && window.innerWidth < 1024) {
        setLocalOpen(false);
      }
    }
    catch (err) { console.error("[Sidebar] open-panel failed:", err); }
  };

  // Safe image component with fallback
  const SafeImage = ({ src, alt, size = 32 }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
      return (
        <div style={{
          width: `${size}px`,
          height: `${size}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 217, 255, 0.15)",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#7ff3ff"
        }}>
          {alt.charAt(0)}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain" }}
        onError={() => setHasError(true)}
      />
    );
  };

  // Sidebar menu items with icons and panel IDs
  const menuItems = [
    { label: "DASHBOARD", icon: iconUrls.dashboard, panelId: "dashboard" },
    { label: "ECHO EVENT STUDIO", icon: iconUrls.eventStudio, panelId: "eventstudio" },
    { label: "MAESTRO BQT", icon: iconUrls.maestro, panelId: "maestrobqt" },
    { label: "ECHO AURUM", icon: iconUrls.echoAurum, panelId: "echoaurum" },
    { label: "ECHO LAYOUT", icon: iconUrls.echoLayout, panelId: "echolayout" },
    { label: "CULINARY", icon: iconUrls.culinary, panelId: "culinary" },
    { label: "BAKING & PASTRY", icon: iconUrls.pastry, panelId: "pastry" },
    { label: "MIXOLOGY", icon: iconUrls.mixology, panelId: "mixology" },
    { label: "SCHEDULES", icon: iconUrls.schedule, panelId: "scheduling" },
    { label: "INVENTORY", icon: iconUrls.inventory, panelId: "purchasing" },
    { label: "CRM", icon: iconUrls.crm, panelId: "crm" },
  ];

  const bottomItems = [
    { label: "CHEFNET", icon: iconUrls.chefNet, panelId: "chefnet" },
    { label: "SUPPORT", icon: iconUrls.support, panelId: "support" },
    { label: "SETTINGS", icon: iconUrls.settings, panelId: "settings" },
  ];

  return (
    <aside
      ref={sidebarRef}
      aria-label="App sidebar"
      data-collapsed={!isOpen}
      className="fixed top-0 left-0 h-screen z-[9999] transition-[width] duration-300"
      style={{
        width: widthPx,
        minWidth: widthPx,
        boxShadow: isDarkMode
          ? "0 12px 48px rgba(0,0,0,0.6), 0 0 32px rgba(0,217,255,0.3), inset -1px 0 0 rgba(0,217,255,0.25)"
          : "0 12px 36px rgba(0,0,0,0.18), inset -1px 0 0 rgba(0,0,0,0.12)"
      }}
    >
      <div
        className={[
          "relative h-full w-full flex flex-col border-r overflow-y-auto overflow-x-hidden",
          isDarkMode
            ? "sb-shell-dark text-cyan-50 border-cyan-400/30 bg-gradient-to-b from-slate-900/95 to-slate-900/90"
            : "sb-shell-light text-slate-900 border-black/10 bg-gradient-to-b from-white/95 to-white/90",
        ].join(" ")}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)"
        }}>
        {/* Glow effect on right edge (dark mode) */}
        {isDarkMode && (
          <span aria-hidden className="absolute top-0 right-[-1px] bottom-0 w-[2px] pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent, rgba(22,224,255,0.95), transparent)",
                         filter: "drop-shadow(0 0 8px rgba(22,224,255,.55))" }} />
        )}

        {/* Header: Logo & Collapse Button */}
        <div className="relative flex items-center justify-between px-3 py-4 flex-shrink-0">
          {/* Collapse/Expand Toggle */}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 transition-all duration-200 flex-shrink-0"
            style={{
              background: isDarkMode ? "rgba(0, 217, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "#7ff3ff" : "#1e293b",
            }}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu size={18} />
          </button>

          {/* Logo (visible when expanded) */}
          {isOpen && (
            <img
              src={iconUrls.logo}
              alt="LUCCCA Logo"
              style={{
                height: "50px",
                objectFit: "contain",
                flex: 1,
                marginLeft: "8px"
              }}
            />
          )}
        </div>

        {/* Divider */}
        <div className={`h-[1px] mx-2 ${isDarkMode ? "bg-cyan-400/20" : "bg-black/10"}`} />

        {/* Main Menu Items */}
        <nav className="flex-1 flex flex-col px-2 py-3 space-y-1 overflow-y-auto">
          {menuItems.map(({ label, icon, panelId }) => (
            <button
              key={panelId}
              onClick={() => openPanel(panelId)}
              className="sb-menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer text-left"
              title={label}
              style={{
                background: isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.06)",
                color: isDarkMode ? "#b0e0ff" : "#475569",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDarkMode ? "rgba(0, 217, 255, 0.15)" : "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(0, 217, 255, 0.25)" : "rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(0, 217, 255, 0.15)" : "rgba(0, 0, 0, 0.06)";
              }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <SafeImage src={icon} alt={label} size={28} />
              </div>

              {/* Label (visible when expanded) */}
              {isOpen && (
                <span style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}>
                  {label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Divider before bottom section */}
        <div className={`h-[1px] mx-2 ${isDarkMode ? "bg-cyan-400/20" : "bg-black/10"}`} />

        {/* Bottom Menu Items */}
        <div className="px-2 py-3 space-y-1 flex-shrink-0">
          {bottomItems.map(({ label, icon, panelId }) => (
            <button
              key={panelId}
              onClick={() => openPanel(panelId)}
              className="sb-menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer text-left"
              title={label}
              style={{
                background: isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.06)",
                color: isDarkMode ? "#b0e0ff" : "#475569",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDarkMode ? "rgba(0, 217, 255, 0.15)" : "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(0, 217, 255, 0.25)" : "rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.borderColor = isDarkMode ? "rgba(0, 217, 255, 0.15)" : "rgba(0, 0, 0, 0.06)";
              }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <SafeImage src={icon} alt={label} size={28} />
              </div>

              {/* Label (visible when expanded) */}
              {isOpen && (
                <span style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}>
                  {label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className={`px-3 py-3 flex-shrink-0 ${isOpen ? "flex justify-end" : "flex justify-center"}`}>
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 transition-all duration-200"
            style={{
              background: isDarkMode ? "rgba(0, 217, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "#7ff3ff" : "#1e293b",
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
