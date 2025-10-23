import React, { useEffect, useState } from "react";
import { Bell, X, Clock, AlertCircle, CheckCircle } from "lucide-react";
import useReminderStore from "../stores/reminderStore.js";

export default function ReminderWidget() {
  const [reminders, setReminders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  
  const getDueReminders = useReminderStore((state) => state.getDueReminders);
  const dismissReminder = useReminderStore((state) => state.dismissReminder);
  const snoozeReminder = useReminderStore((state) => state.snoozeReminder);
  const completeReminder = useReminderStore((state) => state.completeReminder);
  const deleteReminder = useReminderStore((state) => state.deleteReminder);

  // Update reminders every minute
  useEffect(() => {
    const updateReminders = () => {
      setReminders(getDueReminders());
    };
    
    updateReminders();
    const interval = setInterval(updateReminders, 60000);
    return () => clearInterval(interval);
  }, [getDueReminders]);

  if (reminders.length === 0) {
    return (
      <div style={{
        padding: "24px",
        textAlign: "center",
        color: "#999",
      }}>
        <Bell size={32} style={{ opacity: 0.5, marginBottom: "12px" }} />
        <div style={{ fontSize: "14px" }}>No active reminders</div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "12px",
      maxHeight: "500px",
      overflowY: "auto",
    }}>
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: getPriorityColor(reminder.priority, 0.1),
            border: `1px solid ${getPriorityColor(reminder.priority, 0.4)}`,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = getPriorityColor(reminder.priority, 0.15);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = getPriorityColor(reminder.priority, 0.1);
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: expandedId === reminder.id ? "8px" : "0",
            }}
            onClick={() => setExpandedId(expandedId === reminder.id ? null : reminder.id)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
              <AlertCircle size={16} color={getPriorityColor(reminder.priority)} />
              <div style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#333",
              }}>
                {reminder.category.charAt(0).toUpperCase() + reminder.category.slice(1)}
              </div>
              <div style={{
                fontSize: "11px",
                color: "#666",
                backgroundColor: "rgba(0,0,0,0.05)",
                padding: "2px 6px",
                borderRadius: "3px",
              }}>
                {reminder.priority.toUpperCase()}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  snoozeReminder(reminder.id, 15);
                }}
                title="Snooze 15 min"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#3b82f6",
                  fontSize: "12px",
                }}
              >
                ⏱️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  completeReminder(reminder.id);
                }}
                title="Mark complete"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#10b981",
                  fontSize: "12px",
                }}
              >
                ✓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissReminder(reminder.id);
                }}
                title="Dismiss"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#ef4444",
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedId === reminder.id && (
            <div style={{
              borderTop: "1px solid " + getPriorityColor(reminder.priority, 0.2),
              paddingTop: "8px",
              fontSize: "12px",
            }}>
              <div style={{
                marginBottom: "8px",
                color: "#1a1a1a",
                lineHeight: "1.4",
                wordBreak: "break-word",
              }}>
                {reminder.content}
              </div>

              <div style={{
                display: "flex",
                gap: "12px",
                fontSize: "11px",
                color: "#666",
                marginBottom: "8px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} />
                  {new Date(reminder.dueDate).toLocaleDateString()} {reminder.dueTime}
                </div>
                <div>
                  {reminder.permissionStatus === 'auto-approved' && "✓ Auto"}
                  {reminder.permissionStatus === 'pending' && "⏳ Pending"}
                  {reminder.permissionStatus === 'rejected' && "✗ Rejected"}
                </div>
              </div>

              {/* Framework: Permission info */}
              {reminder.recipientGroup && (
                <div style={{
                  fontSize: "11px",
                  padding: "6px",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "3px",
                  color: "#3b82f6",
                }}>
                  📤 Sent to: [Framework - {reminder.recipientGroup}]
                </div>
              )}

              {/* More Actions */}
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteReminder(reminder.id);
                  }}
                  style={{
                    flex: 1,
                    padding: "4px 8px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "4px",
                    fontSize: "11px",
                    cursor: "pointer",
                    color: "#ef4444",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#10b981';
    default:
      return '#6b7280';
  }
}
