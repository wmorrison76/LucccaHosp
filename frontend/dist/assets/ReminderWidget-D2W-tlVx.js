import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { u as useReminderStore } from "./reminderStore-7HgKgDcB.js";
import { B as Bell } from "./bell-DGiS29DN.js";
import { C as CircleAlert } from "./circle-alert-7ARiDXYh.js";
import { X } from "./Board-6RvNRUqx.js";
import { C as Clock } from "./clock-BJR8nEFt.js";
import "./vanilla-Cp7rd2DV.js";
import "./settings-CL5KYzJi.js";
function ReminderWidget() {
  const [reminders, setReminders] = reactExports.useState([]);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const getDueReminders = useReminderStore((state) => state.getDueReminders);
  const dismissReminder = useReminderStore((state) => state.dismissReminder);
  const snoozeReminder = useReminderStore((state) => state.snoozeReminder);
  const completeReminder = useReminderStore((state) => state.completeReminder);
  const deleteReminder = useReminderStore((state) => state.deleteReminder);
  reactExports.useEffect(() => {
    const updateReminders = () => {
      setReminders(getDueReminders());
    };
    updateReminders();
    const interval = setInterval(updateReminders, 6e4);
    return () => clearInterval(interval);
  }, [getDueReminders]);
  if (reminders.length === 0) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "24px",
      textAlign: "center",
      color: "#999"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bell, { size: 32, style: { opacity: 0.5, marginBottom: "12px" } }, void 0, false, {
        fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "14px" }, children: "No active reminders" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "12px",
    maxHeight: "500px",
    overflowY: "auto"
  }, children: reminders.map((reminder) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      style: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: getPriorityColor(reminder.priority),
        border: `1px solid ${getPriorityColor(reminder.priority)}`,
        cursor: "pointer",
        transition: "all 0.2s"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.backgroundColor = getPriorityColor(reminder.priority);
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.backgroundColor = getPriorityColor(reminder.priority);
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: expandedId === reminder.id ? "8px" : "0"
            },
            onClick: () => setExpandedId(expandedId === reminder.id ? null : reminder.id),
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "8px", flex: 1 }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleAlert, { size: 16, color: getPriorityColor(reminder.priority) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                  lineNumber: 77,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#333"
                }, children: reminder.category.charAt(0).toUpperCase() + reminder.category.slice(1) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                  lineNumber: 78,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
                  fontSize: "11px",
                  color: "#666",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "2px 6px",
                  borderRadius: "3px"
                }, children: reminder.priority.toUpperCase() }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                  lineNumber: 85,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                lineNumber: 76,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "4px" }, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      snoozeReminder(reminder.id, 15);
                    },
                    title: "Snooze 15 min",
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#3b82f6",
                      fontSize: "12px"
                    },
                    children: "⏱️"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                    lineNumber: 98,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      completeReminder(reminder.id);
                    },
                    title: "Mark complete",
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#10b981",
                      fontSize: "12px"
                    },
                    children: "✓"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                    lineNumber: 115,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      dismissReminder(reminder.id);
                    },
                    title: "Dismiss",
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: "#ef4444"
                    },
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 14 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                      lineNumber: 146,
                      columnNumber: 17
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                    lineNumber: 132,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                lineNumber: 97,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
            lineNumber: 67,
            columnNumber: 11
          },
          this
        ),
        expandedId === reminder.id && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          borderTop: "1px solid " + getPriorityColor(reminder.priority),
          paddingTop: "8px",
          fontSize: "12px"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
            marginBottom: "8px",
            color: "#1a1a1a",
            lineHeight: "1.4",
            wordBreak: "break-word"
          }, children: reminder.content }, void 0, false, {
            fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
            display: "flex",
            gap: "12px",
            fontSize: "11px",
            color: "#666",
            marginBottom: "8px"
          }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 12 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
                lineNumber: 175,
                columnNumber: 19
              }, this),
              new Date(reminder.dueDate).toLocaleDateString(),
              " ",
              reminder.dueTime
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
              lineNumber: 174,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              reminder.permissionStatus === "auto-approved" && "✓ Auto",
              reminder.permissionStatus === "pending" && "⏳ Pending",
              reminder.permissionStatus === "rejected" && "✗ Rejected"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
              lineNumber: 178,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
            lineNumber: 167,
            columnNumber: 15
          }, this),
          reminder.recipientGroup && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
            fontSize: "11px",
            padding: "6px",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderRadius: "3px",
            color: "#3b82f6"
          }, children: [
            "📤 Sent to: [Framework - ",
            reminder.recipientGroup,
            "]"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
            lineNumber: 187,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "6px", marginTop: "8px" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                deleteReminder(reminder.id);
              },
              style: {
                flex: 1,
                padding: "4px 8px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "4px",
                fontSize: "11px",
                cursor: "pointer",
                color: "#ef4444"
              },
              children: "Delete"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
              lineNumber: 200,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
            lineNumber: 199,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
          lineNumber: 153,
          columnNumber: 13
        }, this)
      ]
    },
    reminder.id,
    true,
    {
      fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
      lineNumber: 49,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/ReminderWidget.jsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
}
export {
  ReminderWidget as default
};
