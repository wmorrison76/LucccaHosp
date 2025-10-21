import React, { useState } from "react";
import {
  Menu, RotateCcw, ChevronLeft, ChevronRight, Grid3x3, 
  Image as ImageIcon, Calendar, Video, Link2, Settings, Zap, Square
} from "lucide-react";

export default function Toolbar({
  visible,
  pinned,
  setPinned,
  onHoverShow,
  isDark,
  toggleTheme,
}) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [theme, setTheme] = useState("dark");

  const themes = [
    { id: "dark", label: "Dark (TRON)", color: "#0a1420", text: "#00d9ff" },
    { id: "light", label: "Light", color: "#ffffff", text: "#1f2937" },
    { id: "midnight", label: "Midnight Blue", color: "#0f172a", text: "#38bdf8" },
    { id: "slate", label: "Slate", color: "#1e293b", text: "#94a3b8" },
    { id: "violet", label: "Violet", color: "#1e1b4b", text: "#a78bfa" },
  ];

  const applyTheme = (themeId) => {
    setTheme(themeId);
    const selectedTheme = themes.find((t) => t.id === themeId);
    if (selectedTheme) {
      document.documentElement.style.setProperty(
        "--bg",
        selectedTheme.color
      );
      document.documentElement.style.setProperty(
        "--text",
        selectedTheme.text
      );
      localStorage.setItem("selectedTheme", themeId);
    }
    setShowThemeMenu(false);
  };

  return (
    <div
      className="board-toolbar fixed top-4 left-1/2 -translate-x-1/2 z-[1200] transition-all duration-200 pointer-events-auto"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={onHoverShow}
      onMouseLeave={() => {
        if (!pinned) onHoverShow(false);
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          backgroundColor: "rgba(12, 20, 32, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 217, 255, 0.25)",
          borderRadius: "14px",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 217, 255, 0.12), inset 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Toolbar Label */}
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "rgba(127, 243, 255, 0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            paddingRight: "8px",
            borderRight: "1px solid rgba(0, 217, 255, 0.2)",
          }}
        >
          Toolbar
        </div>

        {/* Main Buttons */}
        <button
          title="Reset layout"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <RotateCcw size={16} />
        </button>

        <button
          title="Previous"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <button
          title="Next"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <ChevronRight size={16} />
        </button>

        {/* Grid */}
        <button
          title="Grid"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <Grid3x3 size={16} />
        </button>

        {/* Image/Photo */}
        <button
          title="Image"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <ImageIcon size={16} />
        </button>

        {/* Calendar */}
        <button
          title="Calendar"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <Calendar size={16} />
        </button>

        {/* Video */}
        <button
          title="Video Conferencing"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "videoconference", allowDuplicate: true },
              })
            )
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <Video size={16} />
        </button>

        {/* Link */}
        <button
          title="Link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <Link2 size={16} />
        </button>

        {/* Settings/Theme */}
        <div style={{ position: "relative" }}>
          <button
            title="Settings & Themes"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              background: "rgba(0, 217, 255, 0.08)",
              color: "#7ff3ff",
              cursor: "pointer",
              transition: "all 0.2s ease",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              if (!showThemeMenu) {
                e.currentTarget.style.background = "rgba(0, 217, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
              }
            }}
          >
            <Settings size={16} />
          </button>

          {/* Theme Menu */}
          {showThemeMenu && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                backgroundColor: "rgba(12, 20, 32, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "12px",
                padding: "8px",
                minWidth: "180px",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 217, 255, 0.12)",
                zIndex: 2000,
              }}
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => applyTheme(t.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border:
                      theme === t.id
                        ? "1px solid rgba(0, 217, 255, 0.5)"
                        : "1px solid transparent",
                    background:
                      theme === t.id
                        ? "rgba(0, 217, 255, 0.15)"
                        : "transparent",
                    color: "#e0f2fe",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    marginBottom: "4px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 217, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      theme === t.id ? "rgba(0, 217, 255, 0.15)" : "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      backgroundColor: t.color,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zap/Power */}
        <button
          title="Boost/Power"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 165, 0, 0.3)",
            background: "rgba(255, 165, 0, 0.1)",
            color: "#ffa500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 165, 0, 0.2)";
            e.currentTarget.style.borderColor = "rgba(255, 165, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 165, 0, 0.1)";
            e.currentTarget.style.borderColor = "rgba(255, 165, 0, 0.3)";
          }}
        >
          <Zap size={16} />
        </button>

        {/* Pin/Record */}
        <button
          title={pinned ? "Unpin toolbar" : "Pin toolbar"}
          onClick={() => setPinned(!pinned)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            background: pinned ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 217, 255, 0.08)",
            color: "#7ff3ff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 217, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = pinned
              ? "rgba(0, 217, 255, 0.2)"
              : "rgba(0, 217, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
          }}
        >
          <Square size={16} />
        </button>
      </div>
    </div>
  );
}
