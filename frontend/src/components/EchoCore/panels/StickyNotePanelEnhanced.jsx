import React, { useEffect, useMemo, useState } from "react";
import { Bell, Trash2, Send, X, Pin } from "lucide-react";
import useReminderStore from "../../../stores/reminderStore.js";

export default function StickyNotePanelEnhanced({ panelId = "note" }) {
  const [isPinned, setIsPinned] = useState(false);
  const storageKey = useMemo(() => `sticky.${panelId}.v1`, [panelId]);
  const [text, setText] = useState("");
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderForm, setReminderForm] = useState({
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: "09:00",
    priority: "medium",
    category: "general",
  });
  
  const addReminder = useReminderStore((state) => state.addReminder);
  const getActiveReminders = useReminderStore((state) => state.getActiveReminders);

  // Load sticky note text
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw != null) setText(raw);
    } catch {}
  }, [storageKey]);

  // Persist sticky note
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, text);
    } catch {}
  }, [storageKey, text]);

  const handleCreateReminder = () => {
    if (!text.trim()) {
      alert('Please add some text to the sticky note first');
      return;
    }
    
    addReminder({
      content: text,
      dueDate: reminderForm.dueDate,
      dueTime: reminderForm.dueTime,
      priority: reminderForm.priority,
      category: reminderForm.category,
      recipientGroup: null, // Framework: connect to permissions later
      recipientUserId: null, // Framework: connect to user selection
    });
    
    setShowReminderForm(false);
    setText(''); // Clear note after reminder
    localStorage.setItem(storageKey, '');
  };

  return (
    <div
      className="sticky-note-enhanced"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#fffcc0",
        color: "#1a1a1a",
        padding: 0,
        fontFamily: "Comic Sans MS, cursive",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "6px 8px",
        backgroundColor: "rgba(255, 255, 192, 0.9)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ fontSize: "11px", fontWeight: "600" }}>📝 Sticky Note</div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <button
            onClick={() => {
              setIsPinned(!isPinned);
              window.dispatchEvent(new CustomEvent("sticky-pin", { detail: { panelId, isPinned: !isPinned } }));
            }}
            title={isPinned ? "Unpin (allow to move)" : "Pin (keep on top)"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 4px",
              borderRadius: "3px",
              color: isPinned ? "#ef4444" : "#9ca3af",
              backgroundColor: isPinned ? "rgba(239, 68, 68, 0.1)" : "transparent",
              transition: "all 0.2s",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isPinned ? "rgba(239, 68, 68, 0.1)" : "transparent";
              e.currentTarget.style.color = isPinned ? "#ef4444" : "#9ca3af";
            }}
          >
            <Pin size={12} />
          </button>
          <button
            onClick={() => setShowReminderForm(!showReminderForm)}
            title="Create Reminder"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 4px",
              borderRadius: "3px",
              backgroundColor: showReminderForm ? "rgba(59, 130, 246, 0.2)" : "transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = showReminderForm ? "rgba(59, 130, 246, 0.2)" : "transparent";
            }}
          >
            <Bell size={12} />
          </button>
        </div>
      </div>

      {/* Reminder Form */}
      {showReminderForm && (
        <div style={{
          padding: "6px 8px",
          backgroundColor: "rgba(229, 231, 235, 0.8)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          <div style={{ fontSize: "9px", fontWeight: "600" }}>
            ⏰ Set Reminder
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            <input
              type="date"
              value={reminderForm.dueDate}
              onChange={(e) => setReminderForm({ ...reminderForm, dueDate: e.target.value })}
              style={{
                flex: 1,
                padding: "3px 4px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                fontSize: "9px",
                fontFamily: "system-ui",
              }}
            />
            <input
              type="time"
              value={reminderForm.dueTime}
              onChange={(e) => setReminderForm({ ...reminderForm, dueTime: e.target.value })}
              style={{
                flex: 0.8,
                padding: "3px 4px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                fontSize: "9px",
                fontFamily: "system-ui",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            <select
              value={reminderForm.priority}
              onChange={(e) => setReminderForm({ ...reminderForm, priority: e.target.value })}
              style={{
                flex: 1,
                padding: "3px 4px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                fontSize: "9px",
                fontFamily: "system-ui",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={reminderForm.category}
              onChange={(e) => setReminderForm({ ...reminderForm, category: e.target.value })}
              style={{
                flex: 1,
                padding: "3px 4px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                fontSize: "9px",
                fontFamily: "system-ui",
              }}
            >
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={handleCreateReminder}
              style={{
                flex: 1,
                padding: "3px 4px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "3px",
                fontSize: "9px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
              }}
            >
              <Send size={9} /> Add
            </button>
            <button
              onClick={() => setShowReminderForm(false)}
              style={{
                padding: "3px 6px",
                backgroundColor: "transparent",
                border: "1px solid #ccc",
                borderRadius: "3px",
                fontSize: "9px",
                cursor: "pointer",
              }}
            >
              <X size={9} />
            </button>
          </div>
        </div>
      )}

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
        style={{
          flex: 1,
          padding: "16px",
          border: "none",
          backgroundColor: "#fffcc0",
          color: "#1a1a1a",
          fontFamily: "Comic Sans MS, cursive",
          fontSize: "14px",
          resize: "none",
          outline: "none",
        }}
      />

      {/* Footer - Show reminder count */}
      <div style={{
        padding: "8px 16px",
        backgroundColor: "rgba(255, 255, 192, 0.9)",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        fontSize: "11px",
        color: "#666",
      }}>
        💾 {text.length} chars | 🔔 {getActiveReminders().length} active reminders
      </div>
    </div>
  );
}
