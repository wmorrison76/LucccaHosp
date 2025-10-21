import React, { useEffect, useMemo, useState } from "react";
import { Menu, Sun, Moon, Clock3, Settings as Cog, Zap, Radio, Layout, Users, TrendingUp, ChefHat } from "lucide-react";

import dashboardIcon from "../assets/analytics.png";
import kitchenIcon   from "../assets/culinary_library.png";
import pastryIcon    from "../assets/baking-&-Pastry.png";
import mixologyIcon  from "../assets/mixology.png";
import inventoryIcon from "../assets/food_inventory.png";
import LUCCCA_ECHO   from "../assets/LUCCCA_ECHO.png";
import crmIcon       from "../assets/CRM.png";
import scheduleIcon  from "../assets/schedule.png";
import supportIcon   from "../assets/help-desk.png";
import settingsIcon  from "../assets/settings.png";
import chefNetIcon   from "../assets/ChefNet.png";
import maestroBQT    from "../assets/MaestroBQT.png";
import echoAurum     from "../assets/Echo-Ai.png";
import echoLayout    from "../assets/Echo_F.png";
import echoCanvas    from "../assets/Echo_Canvas.png";

// Fallback SVG icon maker - generates a colored square with emoji/icon
const IconFallback = ({ label, color = "#00d9ff" }) => (
  <div
    style={{
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${color}20`,
      borderRadius: "8px",
      border: `1px solid ${color}40`,
      fontSize: "16px",
      fontWeight: "bold",
    }}
    title={label}
  >
    {label.charAt(0).toUpperCase()}
  </div>
);


export default function Sidebar({
  isOpen: pOpen,
  toggleSidebar: pToggle,
  isDarkMode: pDark,
  toggleDarkMode: pToggleDark
}) {
  const [localOpen, setLocalOpen]  = useState(true);
  const [localDark, setLocalDark]  = useState(() => document.documentElement.classList.contains("dark"));

  const isOpen        = pOpen   ?? localOpen;
  const toggleSidebar = pToggle ?? (() => setLocalOpen(v => !v));
  const isDarkMode    = pDark   ?? localDark;
  const toggleDarkMode = pToggleDark ?? (() => {
    const next = !localDark;
    setLocalDark(next);
    document.documentElement.classList.toggle("dark", next);
    // persist via the same bus App listens to
    window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { flags: { dark: next } } }));
  });

  // collapsed/expanded width
  // When expanded: 425px (as per requirement)
  // When collapsed: 45px (icons only, no labels)
  const W_COLLAPSED = 45, W_EXPANDED = 425;
  const widthPx = isOpen ? `${W_EXPANDED}px` : `${W_COLLAPSED}px`;

  useEffect(() => {
    document.body.classList.toggle("sb-collapsed", !isOpen);
  }, [isOpen]);

  // open a Board panel by id
  const openPanel = (id, detail = {}) => {
    if (!id) return;
    try {
      window.dispatchEvent(new CustomEvent("open-panel", { detail: { id, ...detail } }));
      // Auto-close sidebar on mobile/tablet or when expanded on desktop
      if (isOpen && window.innerWidth < 1024) {
        setLocalOpen(false);
      }
    }
    catch (err) { console.error("[Sidebar] open-panel failed:", err); }
  };

  // Image loader with fallback
  const SafeImage = ({ src, alt, className }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
      return <IconFallback label={alt} />;
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  };

  // left column – panel buttons (no route change)
  const panelModules = useMemo(() => [
    { label: "DASHBOARD",          icon: dashboardIcon, panelId: "dashboard", fallback: <Zap size={20} /> },
    { label: "ECHO EVENT STUDIO",  icon: LUCCCA_ECHO,   panelId: "eventstudio", fallback: <Radio size={20} /> },
    { label: "MAESTRO BQT",        icon: maestroBQT,    panelId: "maestrobqt", fallback: <TrendingUp size={20} /> },
    { label: "ECHO AURUM",         icon: echoAurum,     panelId: "echoaurum", fallback: <Radio size={20} /> },
    { label: "ECHO LAYOUT",        icon: echoLayout,    panelId: "echolayout", fallback: <Layout size={20} /> },
    { label: "CULINARY",           icon: kitchenIcon,   panelId: "culinary", fallback: <ChefHat size={20} /> },
    { label: "BAKING & PASTRY",    icon: pastryIcon,    panelId: "pastry", fallback: <ChefHat size={20} /> },
    { label: "MIXOLOGY",           icon: mixologyIcon,  panelId: "mixology", fallback: <Radio size={20} /> },
    { label: "SCHEDULES",          icon: scheduleIcon,  panelId: "scheduling", fallback: <Clock3 size={20} /> },
    { label: "PURCHASING",         icon: inventoryIcon, panelId: "purchasing", fallback: <TrendingUp size={20} /> },
  ], []);

  // examples that DO change the URL
  const routeModules = useMemo(() => [
    { path: "/inventory",   label: "INVENTORY",   icon: inventoryIcon, fallback: <TrendingUp size={20} /> },
    { path: "/purchasing",  label: "PURCHASING",  icon: inventoryIcon, fallback: <TrendingUp size={20} /> },
    { path: "/crm",         label: "CRM",         icon: crmIcon, fallback: <Users size={20} /> },
  ], []);

  const bottomRoutes = useMemo(() => [
    { path: "/chefnet",  label: "CHEFNET",  icon: chefNetIcon, fallback: <Radio size={20} /> },
    { path: "/support",  label: "SUPPORT",  icon: supportIcon, fallback: <Radio size={20} /> },
  ], []);

  const itemClasses = (active = false) => {
    const baseClasses = "sb-menu-item";
    const activeClass = active ? "active" : "";
    return `${baseClasses} ${activeClass}`;
  };

  const Label = ({ children }) => (
    <span className={`sb-menu-label ${!isOpen ? "hidden" : ""}`} style={{ minWidth: 0, flex: 1 }}>{children}</span>
  );

  return (
    <aside
      aria-label="App sidebar"
      data-collapsed={!isOpen}
      className="fixed top-0 left-0 h-screen z-[10000] transition-[width] duration-300 will-change-[width]"
      style={{ width: widthPx, minWidth: widthPx, flexBasis: widthPx, position: "fixed" }}
    >
      <div className={[
        "relative h-full w-full flex flex-col backdrop-blur-xl border-r overflow-hidden",
        isDarkMode ? "sb-shell-dark text-cyan-50 border-cyan-400/30"
                   : "sb-shell-light text-slate-900 border-black/10",
      ].join(" ")}>
        {isDarkMode && (
          <span aria-hidden className="absolute top-0 right-[-1px] bottom-0 w-[2px] pointer-events-none"
                style={{ background: "linear-gradient(180deg, transparent, rgba(22,224,255,0.95), transparent)",
                         filter: "drop-shadow(0 0 8px rgba(22,224,255,.55))" }} />
        )}

        {/* Toggle puck */}
        <div className="relative px-2 pt-2 pb-1">
          <div className="absolute top-2 -right-[12px] z-[10000]">
            <button
              onClick={toggleSidebar}
              className="rounded-full p-[6px] shadow-none border bg-white/90 text-cyan-700 border-cyan-400 dark:bg-slate-900/90 dark:text-cyan-300 hover:scale-110 active:scale-95 transition"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              style={{ boxShadow: "none" }}
            >
              <Menu size={16} />
            </button>
          </div>

          {isOpen && (
            <div className="mt-2 leading-tight tracking-wide select-none text-center">
              <div className="text-[18px] font-extrabold text-cyan-300 uppercase flex items-center justify-center gap-2">
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: "rgba(0, 217, 255, 0.15)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}>L</span>
                UCCCA
              </div>
              <div className="text-xs opacity-60 mt-1">Professional Kitchen</div>
            </div>
          )}
        </div>

        {/* Core panel list */}
        <nav className="px-2 pt-1 space-y-1 no-scrollbar flex-1 overflow-y-auto flex flex-col" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {panelModules.map(({ label, icon, panelId, fallback }) => (
            <button
              key={panelId}
              type="button"
              onClick={() => openPanel(panelId)}
              title={label}
              aria-label={label}
              data-panel-id={panelId}
              className={itemClasses(false)}
            >
              <div className="sb-menu-icon flex-shrink-0">
                {icon ? (
                  <img
                    src={icon}
                    alt={label}
                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div style={{ display: "none", width: "32px", height: "32px", alignItems: "center", justifyContent: "center", color: "#7ff3ff" }}>
                  {fallback}
                </div>
              </div>
              {isOpen && <Label>{label}</Label>}
            </button>
          ))}

          {/* Route-based modules */}
          {routeModules.map(({ path, label, icon, fallback }) => (
            <button
              key={path}
              type="button"
              title={label}
              aria-label={label}
              className={itemClasses(false)}
              onClick={() => {}}
            >
              <div className="sb-menu-icon flex-shrink-0">
                {icon ? (
                  <img
                    src={icon}
                    alt={label}
                    style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div style={{ display: "none", width: "32px", height: "32px", alignItems: "center", justifyContent: "center", color: "#7ff3ff" }}>
                  {fallback}
                </div>
              </div>
              {isOpen && <Label>{label}</Label>}
            </button>
          ))}

          {/* Recent (opens a small panel via Board) */}
          <button
            type="button"
            onClick={() => openPanel("recent", { allowDuplicate: true, title: "Recent" })}
            className={itemClasses(false)}
            title="Recent"
            aria-label="Recent"
          >
            <Clock3 className="sb-menu-icon flex-shrink-0" size={32} style={{ color: "#7ff3ff" }} />
            {isOpen && <Label>RECENT</Label>}
          </button>
        </nav>

        {/* Bottom section */}
        <div className="px-2 pb-3 pt-1 flex-shrink-0">
          <hr className={`border-t ${isDarkMode ? "border-cyan-500/25" : "border-black/10"} mb-2`} />
          <div className="space-y-1">
            {bottomRoutes.map(({ path, label, icon, fallback }) => (
              <button
                key={path}
                type="button"
                title={label}
                aria-label={label}
                className={itemClasses(false)}
                onClick={() => {}}
              >
                <div className="sb-menu-icon flex-shrink-0">
                  {icon ? (
                    <img
                      src={icon}
                      alt={label}
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div style={{ display: "none", width: "32px", height: "32px", alignItems: "center", justifyContent: "center", color: "#7ff3ff" }}>
                    {fallback}
                  </div>
                </div>
                {isOpen && <Label>{label}</Label>}
              </button>
            ))}

            {/* Settings opens the SettingsSuite panel directly */}
            <button
              type="button"
              onClick={() => openPanel("settings")}
              className={itemClasses(false)}
              title="Settings"
              aria-label="Settings"
            >
              <Cog className="sb-menu-icon flex-shrink-0" size={32} style={{ color: "#7ff3ff" }} />
              {isOpen && <Label>SETTINGS</Label>}
            </button>
          </div>

          {/* Theme toggle */}
          <div className={`mt-2 flex ${isOpen ? "justify-end pr-1" : "justify-center"}`}>
            <button
              onClick={toggleDarkMode}
              className={[
                "rounded-full border transition h-10 w-10 grid place-items-center shadow-none",
                isDarkMode
                  ? "bg-slate-900/85 text-cyan-300 border-cyan-400/60"
                  : "bg-white/90 text-cyan-700 border-cyan-500/50 hover:bg-white",
              ].join(" ")}
              style={{ boxShadow: "none" }}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
