import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { u as useReminderStore } from "./reminderStore-7HgKgDcB.js";
import { P as Pin } from "./pin-6qKrgLG3.js";
import { B as Bell } from "./bell-DGiS29DN.js";
import { S as Send } from "./send-CDUeeG5G.js";
import { X } from "./Board-6RvNRUqx.js";
import "./vanilla-Cp7rd2DV.js";
import "./settings-CL5KYzJi.js";
function StickyNotePanelEnhanced({ panelId = "note" }) {
  const [isPinned, setIsPinned] = reactExports.useState(false);
  const storageKey = reactExports.useMemo(() => `sticky.${panelId}.v1`, [panelId]);
  const [text, setText] = reactExports.useState("");
  const [showReminderForm, setShowReminderForm] = reactExports.useState(false);
  const [reminderForm, setReminderForm] = reactExports.useState({
    dueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    dueTime: "09:00",
    priority: "medium",
    category: "general"
  });
  const addReminder = useReminderStore((state) => state.addReminder);
  const getActiveReminders = useReminderStore((state) => state.getActiveReminders);
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw != null) setText(raw);
    } catch {
    }
  }, [storageKey]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(storageKey, text);
    } catch {
    }
  }, [storageKey, text]);
  const handleCreateReminder = () => {
    if (!text.trim()) {
      alert("Please add some text to the sticky note first");
      return;
    }
    addReminder({
      content: text,
      dueDate: reminderForm.dueDate,
      dueTime: reminderForm.dueTime,
      priority: reminderForm.priority,
      category: reminderForm.category,
      recipientGroup: null,
      // Framework: connect to permissions later
      recipientUserId: null
      // Framework: connect to user selection
    });
    setShowReminderForm(false);
    setText("");
    localStorage.setItem(storageKey, "");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "sticky-note-enhanced",
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#fffcc0",
        color: "#1a1a1a",
        padding: 0,
        fontFamily: "Comic Sans MS, cursive",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          padding: "4px 6px",
          backgroundColor: "rgba(255, 255, 192, 0.9)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "22px"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "9px", fontWeight: "600" }, children: "📝 Sticky Note" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 81,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "3px", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  setIsPinned(!isPinned);
                  window.dispatchEvent(new CustomEvent("sticky-pin", { detail: { panelId, isPinned: !isPinned } }));
                },
                title: isPinned ? "Unpin (allow to move)" : "Pin (keep on top)",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 3px",
                  borderRadius: "2px",
                  color: isPinned ? "#ef4444" : "#9ca3af",
                  backgroundColor: isPinned ? "rgba(239, 68, 68, 0.1)" : "transparent",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                  e.currentTarget.style.color = "#ef4444";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = isPinned ? "rgba(239, 68, 68, 0.1)" : "transparent";
                  e.currentTarget.style.color = isPinned ? "#ef4444" : "#9ca3af";
                },
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Pin, { size: 11 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                  lineNumber: 111,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 83,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setShowReminderForm(!showReminderForm),
                title: "Create Reminder",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px 3px",
                  borderRadius: "2px",
                  backgroundColor: showReminderForm ? "rgba(59, 130, 246, 0.2)" : "transparent",
                  transition: "all 0.2s"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.backgroundColor = showReminderForm ? "rgba(59, 130, 246, 0.2)" : "transparent";
                },
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bell, { size: 11 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                  lineNumber: 132,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 113,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 82,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
          lineNumber: 72,
          columnNumber: 7
        }, this),
        showReminderForm && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          padding: "3px 4px",
          backgroundColor: "#fffcc0",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "3px"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "8px", fontWeight: "600" }, children: "⏰ Reminder" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 147,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "2px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "date",
                value: reminderForm.dueDate,
                onChange: (e) => setReminderForm({ ...reminderForm, dueDate: e.target.value }),
                style: {
                  flex: 1,
                  padding: "2px 3px",
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  fontSize: "8px",
                  fontFamily: "system-ui"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 152,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "time",
                value: reminderForm.dueTime,
                onChange: (e) => setReminderForm({ ...reminderForm, dueTime: e.target.value }),
                style: {
                  flex: 0.8,
                  padding: "2px 3px",
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  fontSize: "8px",
                  fontFamily: "system-ui"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 165,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 151,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "2px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "select",
              {
                value: reminderForm.priority,
                onChange: (e) => setReminderForm({ ...reminderForm, priority: e.target.value }),
                style: {
                  flex: 1,
                  padding: "2px 3px",
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  fontSize: "8px",
                  fontFamily: "system-ui"
                },
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "low", children: "Low" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 193,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "medium", children: "Med" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 194,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "high", children: "High" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 195,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 181,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "select",
              {
                value: reminderForm.category,
                onChange: (e) => setReminderForm({ ...reminderForm, category: e.target.value }),
                style: {
                  flex: 1,
                  padding: "2px 3px",
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  fontSize: "8px",
                  fontFamily: "system-ui"
                },
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "general", children: "Gen" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 210,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "work", children: "Work" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 211,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "personal", children: "Pers" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 212,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "urgent", children: "Urg" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 213,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 198,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 180,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "2px" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: handleCreateReminder,
                style: {
                  flex: 1,
                  padding: "2px 3px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "2px",
                  fontSize: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1px"
                },
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Send, { size: 7 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                    lineNumber: 236,
                    columnNumber: 15
                  }, this),
                  "Add"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 218,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setShowReminderForm(false),
                style: {
                  padding: "2px 3px",
                  backgroundColor: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  fontSize: "8px",
                  cursor: "pointer"
                },
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 7 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                  lineNumber: 249,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
                lineNumber: 238,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 217,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
          lineNumber: 139,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "textarea",
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: "Write your note here...",
            style: {
              flex: 1,
              padding: "6px 8px",
              border: "none",
              backgroundColor: "#fffcc0",
              color: "#1a1a1a",
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "12px",
              resize: "none",
              outline: "none",
              lineHeight: "1.3"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
            lineNumber: 256,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          padding: "3px 6px",
          backgroundColor: "#fffcc0",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          fontSize: "9px",
          color: "#666"
        }, children: [
          "💾 ",
          text.length,
          " | 🔔 ",
          getActiveReminders().length
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
          lineNumber: 275,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx",
      lineNumber: 57,
      columnNumber: 5
    },
    this
  );
}
export {
  StickyNotePanelEnhanced as default
};
