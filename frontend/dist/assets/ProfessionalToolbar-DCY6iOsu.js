import { u as useThemeAndLanguageContext, r as reactExports, j as jsxDevRuntimeExports, S as SUPPORTED_LANGUAGES, t as themeModes, c as colorSchemes } from "./index-DfBvRGLH.js";
import { C as ChevronDown } from "./chevron-down-BMbSUoYr.js";
import { S as Settings } from "./settings-CL5KYzJi.js";
import { X } from "./Board-6RvNRUqx.js";
import { S as Sun, M as Moon } from "./sun-Dkh7Vwto.js";
function ProfessionalToolbar() {
  const { theme, themeMode, colorScheme, language, setThemeMode, setColorScheme, setLanguage, t } = useThemeAndLanguageContext();
  const colors = theme.colors;
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showLanguage, setShowLanguage] = reactExports.useState(false);
  const settingsRef = reactExports.useRef(null);
  const languageRef = reactExports.useRef(null);
  const toolbarRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [dragOffset, setDragOffset] = reactExports.useState({ x: 0, y: 0 });
  const [position, setPosition] = reactExports.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lu:toolbar:pos:v1") || "");
      return saved || { x: 60, y: 12 };
    } catch {
      return { x: 60, y: 12 };
    }
  });
  reactExports.useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setShowLanguage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleMouseDown = (e) => {
    if (e.target.closest("button") || e.target.closest('[role="button"]')) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  reactExports.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("lu:toolbar:pos:v1", JSON.stringify(position));
    } catch (e) {
      console.warn("Failed to save toolbar position:", e);
    }
  }, [position]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: toolbarRef,
      className: "flex items-center justify-between h-14 px-6 border-b backdrop-blur-md transition-colors",
      style: {
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.secondary,
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        right: "auto",
        width: "auto",
        zIndex: 1100,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        minWidth: "400px"
      },
      onMouseDown: handleMouseDown,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", ref: languageRef, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => setShowLanguage(!showLanguage),
              className: "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium",
              style: {
                color: colors.text.secondary,
                backgroundColor: colors.border.secondary,
                border: `1px solid ${colors.border.primary}`
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = colors.border.primary;
                e.currentTarget.style.color = colors.text.primary;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = colors.border.secondary;
                e.currentTarget.style.color = colors.text.secondary;
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-lg", children: SUPPORTED_LANGUAGES[language].flag }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 129,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 14, className: `transition-transform ${showLanguage ? "rotate-180" : ""}` }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 130,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
              lineNumber: 112,
              columnNumber: 11
            },
            this
          ),
          showLanguage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "absolute top-full right-0 mt-2 rounded-lg shadow-lg overflow-hidden z-50",
              style: {
                backgroundColor: colors.bg.panel,
                border: `1px solid ${colors.border.primary}`,
                backdropFilter: "blur(12px)",
                minWidth: "200px"
              },
              children: Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    setLanguage(code);
                    setShowLanguage(false);
                  },
                  className: "w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-sm font-medium text-left hover:brightness-110",
                  style: {
                    color: language === code ? colors.primary : colors.text.primary,
                    backgroundColor: language === code ? `${colors.primary}15` : "transparent",
                    borderBottom: `1px solid ${colors.border.secondary}`
                  },
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xl", children: config.flag }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                      lineNumber: 158,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 flex flex-col", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: config.nativeName }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                        lineNumber: 160,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { color: colors.text.secondary, fontSize: "12px" }, children: config.name }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                        lineNumber: 161,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                      lineNumber: 159,
                      columnNumber: 19
                    }, this),
                    language === code && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: colors.primary } }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                      lineNumber: 165,
                      columnNumber: 41
                    }, this)
                  ]
                },
                code,
                true,
                {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 144,
                  columnNumber: 17
                },
                this
              ))
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
              lineNumber: 134,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
          lineNumber: 111,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", ref: settingsRef, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => setShowSettings(!showSettings),
              className: "p-2 rounded-lg transition-all",
              title: t.appearance,
              style: {
                color: colors.text.secondary,
                backgroundColor: colors.border.secondary,
                border: `1px solid ${colors.border.primary}`
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = colors.border.primary;
                e.currentTarget.style.color = colors.text.primary;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = colors.border.secondary;
                e.currentTarget.style.color = colors.text.secondary;
              },
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 18 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                lineNumber: 192,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
              lineNumber: 174,
              columnNumber: 11
            },
            this
          ),
          showSettings && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "absolute top-full right-0 mt-3 rounded-2xl shadow-2xl z-50 overflow-hidden",
              style: {
                backgroundColor: colors.bg.primary,
                border: `1px solid ${colors.border.primary}`,
                backdropFilter: "blur(20px)",
                width: "400px"
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "px-6 py-4 flex items-center justify-between border-b",
                    style: {
                      borderColor: colors.border.secondary,
                      background: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}05)`
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-semibold", style: { color: colors.text.primary }, children: [
                        "⚙️ ",
                        t.appearance || "Settings"
                      ] }, void 0, true, {
                        fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                        lineNumber: 213,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        "button",
                        {
                          onClick: () => setShowSettings(false),
                          className: "p-1 rounded-lg transition-all hover:brightness-90",
                          style: { color: colors.text.secondary },
                          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 20 }, void 0, false, {
                            fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                            lineNumber: 221,
                            columnNumber: 19
                          }, this)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                          lineNumber: 216,
                          columnNumber: 17
                        },
                        this
                      )
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                    lineNumber: 206,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b", style: { borderColor: colors.border.secondary }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold mb-3", style: { color: colors.text.secondary }, children: t.theme || "Appearance" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                    lineNumber: 227,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-3", children: themeModes.map((mode) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: () => {
                        setThemeMode(mode);
                        setShowSettings(false);
                      },
                      className: `flex-1 px-4 py-3 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 ${themeMode === mode ? "ring-2 ring-offset-2" : "opacity-70 hover:opacity-100"}`,
                      style: {
                        backgroundColor: themeMode === mode ? colors.primary : colors.bg.secondary,
                        color: themeMode === mode ? "#fff" : colors.text.secondary,
                        ringColor: colors.primary
                      },
                      children: [
                        mode === "light" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sun, { size: 16 }, void 0, false, {
                          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                          lineNumber: 247,
                          columnNumber: 43
                        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Moon, { size: 16 }, void 0, false, {
                          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                          lineNumber: 247,
                          columnNumber: 63
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: mode === "light" ? t.lightMode || "Light" : t.darkMode || "Dark" }, void 0, false, {
                          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                          lineNumber: 248,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    mode,
                    true,
                    {
                      fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                      lineNumber: 232,
                      columnNumber: 21
                    },
                    this
                  )) }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                    lineNumber: 230,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 226,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b", style: { borderColor: colors.border.secondary }, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold mb-4", style: { color: colors.text.secondary }, children: t.colorScheme || "Color Scheme" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                    lineNumber: 256,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-5 gap-3", children: colorSchemes.map((scheme) => {
                    const schemeColors = {
                      cyan: "#00d9ff",
                      blue: "#3b82f6",
                      emerald: "#10b981",
                      violet: "#a78bfa",
                      rose: "#f43f5e"
                    };
                    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: () => {
                          setColorScheme(scheme);
                          setShowSettings(false);
                        },
                        className: `w-full h-12 rounded-lg transition-all transform ${colorScheme === scheme ? "scale-110 ring-2 ring-offset-2" : "hover:scale-105"}`,
                        style: {
                          backgroundColor: schemeColors[scheme],
                          boxShadow: colorScheme === scheme ? `0 0 16px ${schemeColors[scheme]}80, 0 4px 12px rgba(0,0,0,0.2)` : "0 2px 8px rgba(0,0,0,0.1)",
                          ringColor: schemeColors[scheme]
                        },
                        title: scheme.charAt(0).toUpperCase() + scheme.slice(1)
                      },
                      scheme,
                      false,
                      {
                        fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                        lineNumber: 269,
                        columnNumber: 23
                      },
                      this
                    );
                  }) }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                    lineNumber: 259,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 255,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 text-xs", style: { color: colors.text.secondary }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
                  "✨ ",
                  t.preferenceSaved || "Preferences are saved automatically"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 295,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
                  lineNumber: 294,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
              lineNumber: 196,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
          lineNumber: 173,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
        lineNumber: 109,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/ProfessionalToolbar.jsx",
      lineNumber: 89,
      columnNumber: 5
    },
    this
  );
}
export {
  ProfessionalToolbar as default
};
