import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu, Sun, Moon, LayoutDashboard, Zap, Gauge, Sparkles, Layout, Utensils, Cake, Wine, Calendar, Package, BarChart3, Users, Headphones, Settings } from "lucide-react";

// Map icon keys to lucide icons for fallback
const lucideIcons = {
  dashboard: LayoutDashboard,
  eventStudio: Zap,
  maestro: Gauge,
  echoAurum: Sparkles,
  echoLayout: Layout,
  culinary: Utensils,
  pastry: Cake,
  mixology: Wine,
  schedule: Calendar,
  inventory: Package,
  crm: BarChart3,
  chefNet: Users,
  support: Headphones,
  settings: Settings,
};

// Icon URLs using Vite asset resolution
const iconUrls = {
  dashboard: new URL("../assets/analytics.png", import.meta.url).href,
  eventStudio: new URL("../assets/LUCCCA_ECHO.png", import.meta.url).href,
  maestro: new URL("../assets/MaestroBQT.png", import.meta.url).href,
  echoAurum: new URL("../assets/Echo-Ai.png", import.meta.url).href,
  echoLayout: new URL("../assets/Echo_F.png", import.meta.url).href,
  culinary: new URL("../assets/culinary_library.png", import.meta.url).href,
  pastry: new URL("../assets/baking-&-Pastry.png", import.meta.url).href,
  mixology: new URL("../assets/mixology.png", import.meta.url).href,
  schedule: new URL("../assets/schedule.png", import.meta.url).href,
  inventory: new URL("../assets/food_inventory.png", import.meta.url).href,
  crm: new URL("../assets/CRM.png", import.meta.url).href,
  chefNet: new URL("../assets/ChefNet.png", import.meta.url).href,
  support: new URL("../assets/help-desk.png", import.meta.url).href,
  settings: new URL("../assets/settings.png", import.meta.url).href,
  logo: new URL("../assets/LUCCCA_Vertical_Inline.png", import.meta.url).href,
};

// Module Upload Component
function ModuleUploadZone({ isDarkMode }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Handle folder drop
    const items = e.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].webkitGetAsEntry().isDirectory) {
          const entry = items[i].webkitGetAsEntry();
          uploadFolder(entry);
          return;
        }
      }
    }

    setMessage('⚠️ Please drop a folder');
  };

  const handleFolderSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Extract folder name from first file path
      const firstFilePath = files[0].webkitRelativePath || files[0].name;
      const folderName = firstFilePath.split('/')[0];
      uploadFolder(null, folderName, files);
    }
  };

  const uploadFolder = async (folderEntry = null, folderName = null, files = null) => {
    const displayName = folderName || folderEntry?.name || 'Module';
    setIsUploading(true);

    // Calculate total size
    const totalSize = files?.reduce((sum, f) => sum + f.size, 0) || 0;
    const totalMB = (totalSize / 1024 / 1024).toFixed(1);
    const totalFiles = files?.length || 0;

    console.log(`[UPLOAD] Folder: ${displayName}, Files: ${totalFiles}, Size: ${totalMB}MB`);
    setMessage(`⏳ Uploading ${displayName} (${totalFiles} files, ${totalMB}MB)...`);

    // Broadcast upload start to all components
    window.dispatchEvent(new CustomEvent('module-upload-start', {
      detail: { fileName: displayName, fileSize: totalSize, fileCount: totalFiles }
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60 * 60 * 1000); // 60 minute timeout

    try {
      const formData = new FormData();

      // Add folder name as a simple text field
      formData.append('folderName', displayName);

      // Handle files from folder input
      if (files && files.length > 0) {
        console.log(`[UPLOAD] Processing ${files.length} files (total ${totalMB}MB)`);
        files.forEach((file, index) => {
          const relativePath = file.webkitRelativePath || file.name;
          if (index < 10 || index % 1000 === 0) {
            console.log(`[UPLOAD] Adding file ${index + 1}/${files.length}: ${relativePath}`);
          }
          formData.append(`files`, file);
        });
      } else if (folderEntry) {
        console.log(`[UPLOAD] Processing drag-drop folder`);
        await readFolderRecursive(folderEntry, formData, '');
      }

      const totalSize = Array.from(formData.getAll('files')).reduce((sum, f) => sum + f.size, 0);
      console.log(`[UPLOAD] Starting folder upload: ${displayName} (${totalSize} bytes)`);

      console.log(`[UPLOAD] Sending FormData to /api/modules/upload-folder`);

      const response = await fetch('/api/modules/upload-folder', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log(`[UPLOAD] Response received: status ${response.status}`);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseErr) {
          errorData = { message: response.statusText };
          console.error(`[UPLOAD] Could not parse error response:`, parseErr.message);
        }
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.moduleName} loaded!`);
        console.log(`[UPLOAD] Success: ${data.moduleName}`);

        // Broadcast upload completion to all components
        window.dispatchEvent(new CustomEvent('module-upload-complete', {
          detail: { moduleName: data.moduleName, success: true }
        }));

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.message}`);
        console.error(`[UPLOAD] Error: ${data.message}`);

        // Broadcast upload error to all components
        window.dispatchEvent(new CustomEvent('module-upload-complete', {
          detail: { moduleName: displayName, success: false, error: data.message }
        }));
      }
    } catch (error) {
      clearTimeout(timeoutId);
      const errorMsg = error.name === 'AbortError'
        ? 'Upload timeout (60 minutes). Connection lost - check network and try again.'
        : error.message;
      setMessage(`❌ ${errorMsg}`);
      console.error(`[UPLOAD] Failed:`, errorMsg);

      // Broadcast upload error to all components
      window.dispatchEvent(new CustomEvent('module-upload-complete', {
        detail: { moduleName: displayName, success: false, error: errorMsg }
      }));
    } finally {
      setIsUploading(false);

      // Auto-clear message after 5 seconds if not successful reload
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  // Helper to recursively read folder entries (for drag-and-drop support)
  const readFolderRecursive = async (entry, formData, path) => {
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => {
        entry.file(resolve, reject);
      });
      formData.append('files', file);
      console.log(`[UPLOAD] Added file via drag-drop: ${path}${file.name}`);
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries = await new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });

      for (const childEntry of entries) {
        await readFolderRecursive(childEntry, formData, path + entry.name + '/');
      }
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: isDragging
            ? isDarkMode ? '2px dashed rgba(0, 217, 255, 0.6)' : '2px dashed rgba(0, 0, 0, 0.3)'
            : isDarkMode ? '1px dashed rgba(0, 217, 255, 0.3)' : '1px dashed rgba(0, 0, 0, 0.2)',
          borderRadius: '6px',
          padding: '12px',
          textAlign: 'center',
          cursor: isUploading ? 'wait' : 'pointer',
          backgroundColor: isDragging
            ? isDarkMode ? 'rgba(0, 217, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
            : 'transparent',
          transition: 'all 0.2s',
          opacity: isUploading ? 0.6 : 1
        }}
      >
        <input
          ref={inputRef}
          type="file"
          webkitdirectory="true"
          mozdirectory="true"
          directory="true"
          onChange={handleFolderSelect}
          style={{ display: 'none' }}
          disabled={isUploading}
        />
        <p style={{
          margin: 0,
          fontSize: '11px',
          fontWeight: '600',
          color: isDarkMode ? '#7ff3ff' : '#1e293b',
          textTransform: 'uppercase',
          letterSpacing: '0.3px'
        }}>
          {isUploading ? '⏳ Uploading...' : '📁 Drop Folder'}
        </p>
      </div>
      {message && (
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '11px',
          color: message.includes('✅') ? '#10b981' : message.includes('⚠️') ? '#f59e0b' : '#ef4444',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

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
  const W_EXPANDED = 200;
  const widthPx = isOpen ? `${W_EXPANDED}px` : `${W_COLLAPSED}px`;

  useEffect(() => {
    document.body.classList.toggle("sb-collapsed", !isOpen);
  }, [isOpen]);

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

  // Icon renderer - uses lucide-react icons
  const IconRenderer = ({ iconKey, size = 28 }) => {
    const IconComponent = lucideIcons[iconKey];

    if (IconComponent) {
      return (
        <IconComponent
          size={size}
          strokeWidth={1.5}
          style={{ color: isDarkMode ? "#00d9ff" : "#1f2937", flexShrink: 0 }}
        />
      );
    }

    // Fallback letter
    return (
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 217, 255, 0.15)",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "bold",
        color: "#00d9ff",
        flexShrink: 0
      }}>
        ?
      </div>
    );
  };

  // Safe image component - used for logo only
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
          color: "#7ff3ff",
          flexShrink: 0
        }}>
          {alt.charAt(0)}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain", flexShrink: 0 }}
        onError={() => {
          console.warn(`[Sidebar] Could not load logo: ${alt}`);
          setHasError(true);
        }}
      />
    );
  };

  // Sidebar menu items with icon keys and panel IDs
  const menuItems = [
    { label: "DASHBOARD", iconKey: "dashboard", panelId: "dashboard" },
    { label: "ECHO EVENT STUDIO", iconKey: "eventStudio", panelId: "eventstudio" },
    { label: "MAESTRO BQT", iconKey: "maestro", panelId: "maestrobqt" },
    { label: "ECHO AURUM", iconKey: "echoAurum", panelId: "echoaurum" },
    { label: "ECHO LAYOUT", iconKey: "echoLayout", panelId: "echolayout" },
    { label: "CULINARY", iconKey: "culinary", panelId: "culinary" },
    { label: "BAKING & PASTRY", iconKey: "pastry", panelId: "pastry" },
    { label: "MIXOLOGY", iconKey: "mixology", panelId: "mixology" },
    { label: "SCHEDULES", iconKey: "schedule", panelId: "scheduling" },
    { label: "INVENTORY", iconKey: "inventory", panelId: "purchasing" },
    { label: "CRM", iconKey: "crm", panelId: "crm" },
  ];

  const bottomItems = [
    { label: "CHEFNET", iconKey: "chefNet", panelId: "chefnet" },
    { label: "SUPPORT", iconKey: "support", panelId: "support" },
    { label: "SETTINGS", iconKey: "settings", panelId: "settings" },
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
          : "0 12px 36px rgba(0,0,0,0.18), inset -1px 0 0 rgba(0,0,0,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      <div
        className={[
          "relative h-full w-full flex flex-col border-r overflow-y-auto overflow-x-hidden",
          isDarkMode
            ? "sb-shell-dark text-cyan-50 border-cyan-400/30 bg-gradient-to-b from-slate-900/80 to-slate-900/75"
            : "sb-shell-light text-slate-900 border-black/10 bg-gradient-to-b from-white/75 to-white/70",
        ].join(" ")}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(10, 20, 35, 0.75))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.75))"
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
        <nav className="flex-1 flex flex-col px-2 py-3 space-y-1 overflow-y-auto" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {menuItems.map(({ label, iconKey, panelId }) => (
            <button
              key={panelId}
              onClick={() => openPanel(panelId)}
              className="sb-menu-item w-full flex items-center gap-2 px-2 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
              title={label}
              style={{
                background: isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.06)",
                color: isDarkMode ? "#b0e0ff" : "#475569",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
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
              {/* Icon - on the left */}
              <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconRenderer iconKey={iconKey} size={28} />
              </div>

              {/* Label (visible when expanded, centered) */}
              {isOpen && (
                <span style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  flex: 1,
                  textAlign: "center",
                  lineHeight: "1.3",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
        <div className="px-2 py-3 space-y-1 flex-shrink-0" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {bottomItems.map(({ label, iconKey, panelId }) => (
            <button
              key={panelId}
              onClick={() => openPanel(panelId)}
              className="sb-menu-item w-full flex items-center gap-2 px-2 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
              title={label}
              style={{
                background: isDarkMode ? "rgba(0, 217, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                border: isDarkMode ? "1px solid rgba(0, 217, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.06)",
                color: isDarkMode ? "#b0e0ff" : "#475569",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: isOpen ? "flex-start" : "center",
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
              {/* Icon - on the left */}
              <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconRenderer iconKey={iconKey} size={28} />
              </div>

              {/* Label (visible when expanded, centered) */}
              {isOpen && (
                <span style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  flex: 1,
                  textAlign: "center",
                  lineHeight: "1.3",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Module Upload Dropzone */}
        {isOpen && (
          <div
            className="px-3 py-3 flex-shrink-0 border-t"
            style={{
              borderTopColor: isDarkMode ? "rgba(0, 217, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }}
          >
            <ModuleUploadZone isDarkMode={isDarkMode} />
          </div>
        )}

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
