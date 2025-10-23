import React, { useState, useEffect } from "react";
import {
  Menu, RotateCcw, ChevronLeft, ChevronRight, Grid3x3,
  Image as ImageIcon, Calendar, Video, Link2, Settings, Zap, Square,
  MessageSquare, Phone, PenTool, FileText, Bell
} from "lucide-react";
import useReminderStore from "../stores/reminderStore.js";

export default function Toolbar({
  visible,
  pinned,
  setPinned,
  onHoverShow,
  isDark,
}) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [reminderCount, setReminderCount] = useState(0);

  const getDueReminders = useReminderStore((state) => state.getDueReminders);

  // Update reminder count
  useEffect(() => {
    const updateCount = () => {
      setReminderCount(getDueReminders().length);
    };
    updateCount();
    const interval = setInterval(updateCount, 60000);
    return () => clearInterval(interval);
  }, [getDueReminders]);

  const themes = [
    { id: "dark", label: "Dark TRON", color: "#0a1420" },
    { id: "light", label: "Light", color: "#ffffff" },
    { id: "midnight", label: "Midnight", color: "#0f172a" },
  ];

  return (
    <div
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[1200] transition-opacity duration-200"
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
          gap: "6px",
          padding: "6px 10px",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 217, 255, 0.3)",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 217, 255, 0.1)",
          flexWrap: "wrap",
          maxWidth: "90vw",
          justifyContent: "center",
        }}
      >
        {/* Toolbar Label */}
        <span
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "rgba(127, 243, 255, 0.8)",
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            paddingRight: "6px",
            borderRight: "1px solid rgba(0, 217, 255, 0.2)",
          }}
        >
          Toolbar
        </span>

        {/* Icon Buttons */}
        <ToolbarButton icon={<RotateCcw size={14} />} title="Reset" />
        <ToolbarButton icon={<ChevronLeft size={14} />} title="Prev" />
        <ToolbarButton icon={<ChevronRight size={14} />} title="Next" />
        <ToolbarButton icon={<Grid3x3 size={14} />} title="Grid" />
        <ToolbarButton icon={<ImageIcon size={14} />} title="Image" />
        <ToolbarButton icon={<Calendar size={14} />} title="Calendar" />

        <ToolbarButton
          icon={<Note size={14} />}
          title="Sticky Note"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "stickynote", allowDuplicate: true },
              })
            )
          }
        />

        <ToolbarButton
          icon={<PenTool size={14} />}
          title="Whiteboard"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "whiteboard", allowDuplicate: true },
              })
            )
          }
        />

        <ToolbarButton
          icon={<Phone size={14} />}
          title="Teleconference"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "teleconference", allowDuplicate: true },
              })
            )
          }
        />

        <ToolbarButton
          icon={<Video size={14} />}
          title="Video Conference"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "videoconference", allowDuplicate: true },
              })
            )
          }
        />

        <ToolbarButton
          icon={
            <div style={{ position: "relative" }}>
              <Bell size={14} />
              {reminderCount > 0 && (
                <div style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-6px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontSize: "9px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: "14px",
                  height: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {reminderCount > 9 ? "9+" : reminderCount}
                </div>
              )}
            </div>
          }
          title={`Reminders (${reminderCount})`}
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-panel", {
                detail: { id: "reminders", allowDuplicate: false },
              })
            )
          }
        />

        <ToolbarButton icon={<Link2 size={14} />} title="Link" />

        {/* Settings with theme menu */}
        <div style={{ position: "relative" }}>
          <ToolbarButton
            icon={<Settings size={14} />}
            title="Settings"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
          />
          {showThemeMenu && (
            <div
              style={{
                position: "absolute",
                top: "32px",
                right: 0,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
                borderRadius: "8px",
                padding: "6px",
                minWidth: "140px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                zIndex: 2000,
              }}
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    border: "1px solid transparent",
                    background: "transparent",
                    color: "#7ff3ff",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: "500",
                    textAlign: "left",
                    marginBottom: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 217, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <ToolbarButton icon={<Zap size={14} />} title="Boost" color="#ffa500" />
        <ToolbarButton
          icon={<Square size={14} />}
          title={pinned ? "Pinned" : "Pin"}
          onClick={() => setPinned(!pinned)}
          active={pinned}
        />
      </div>
    </div>
  );
}

function ToolbarButton({ icon, title, onClick, color = "#7ff3ff", active = false }) {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        border: active || hover ? `1px solid ${color}40` : "1px solid rgba(0, 217, 255, 0.15)",
        background: active || hover ? `${color}15` : "rgba(0, 217, 255, 0.05)",
        color: color,
        cursor: "pointer",
        transition: "all 0.15s ease",
        padding: 0,
      }}
    >
      {icon}
    </button>
  );
}
