import { R as React } from "./index-DfBvRGLH.js";
import { c as createStore } from "./vanilla-Cp7rd2DV.js";
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const useReminderStore = create((set, get) => ({
  // Active reminders
  reminders: [],
  // Add a new reminder
  addReminder: (reminder) => {
    const id = Math.random().toString(36).slice(2) + Date.now();
    const newReminder = {
      id,
      content: reminder.content || "",
      dueDate: reminder.dueDate || null,
      dueTime: reminder.dueTime || null,
      priority: reminder.priority || "medium",
      // low, medium, high
      category: reminder.category || "general",
      recipientGroup: reminder.recipientGroup || null,
      // framework for future permissions
      recipientUserId: reminder.recipientUserId || null,
      senderUserId: reminder.senderUserId || "current-user",
      permissionStatus: reminder.permissionStatus || "auto-approved",
      // auto-approved, pending, rejected
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      isDismissed: false,
      isSnoozed: false,
      snoozeUntil: null,
      isCompleted: false
    };
    set((state2) => ({
      reminders: [...state2.reminders, newReminder]
    }));
    const state = get();
    localStorage.setItem("luccca_reminders", JSON.stringify(state.reminders));
    return newReminder;
  },
  // Update reminder
  updateReminder: (id, updates) => {
    set((state2) => ({
      reminders: state2.reminders.map(
        (r) => r.id === id ? { ...r, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : r
      )
    }));
    const state = get();
    localStorage.setItem("luccca_reminders", JSON.stringify(state.reminders));
  },
  // Delete reminder
  deleteReminder: (id) => {
    set((state2) => ({
      reminders: state2.reminders.filter((r) => r.id !== id)
    }));
    const state = get();
    localStorage.setItem("luccca_reminders", JSON.stringify(state.reminders));
  },
  // Dismiss reminder (hide it)
  dismissReminder: (id) => {
    get().updateReminder(id, { isDismissed: true });
  },
  // Snooze reminder until time
  snoozeReminder: (id, minutes = 15) => {
    const snoozeUntil = new Date(Date.now() + minutes * 6e4).toISOString();
    get().updateReminder(id, { isSnoozed: true, snoozeUntil });
  },
  // Complete reminder
  completeReminder: (id) => {
    get().updateReminder(id, { isCompleted: true, isDismissed: true });
  },
  // Get active reminders (not dismissed, not completed, not snoozed or snooze time passed)
  getActiveReminders: () => {
    const state = get();
    const now = /* @__PURE__ */ new Date();
    return state.reminders.filter((r) => {
      if (r.isDismissed || r.isCompleted) return false;
      if (r.isSnoozed && new Date(r.snoozeUntil) > now) return false;
      return true;
    });
  },
  // Get due reminders (due date/time has passed)
  getDueReminders: () => {
    const activeReminders = get().getActiveReminders();
    const now = /* @__PURE__ */ new Date();
    return activeReminders.filter((r) => {
      if (!r.dueDate) return false;
      const dueDateTime = /* @__PURE__ */ new Date(`${r.dueDate}T${r.dueTime || "00:00"}`);
      return dueDateTime <= now;
    });
  },
  // Get upcoming reminders
  getUpcomingReminders: () => {
    const activeReminders = get().getActiveReminders();
    const now = /* @__PURE__ */ new Date();
    return activeReminders.filter((r) => {
      if (!r.dueDate) return false;
      const dueDateTime = /* @__PURE__ */ new Date(`${r.dueDate}T${r.dueTime || "00:00"}`);
      return dueDateTime > now;
    }).sort((a, b) => {
      const timeA = /* @__PURE__ */ new Date(`${a.dueDate}T${a.dueTime || "00:00"}`);
      const timeB = /* @__PURE__ */ new Date(`${b.dueDate}T${b.dueTime || "00:00"}`);
      return timeA - timeB;
    });
  },
  // Load from localStorage
  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem("luccca_reminders");
      if (stored) {
        const parsed = JSON.parse(stored);
        set({ reminders: parsed });
      }
    } catch (err) {
      console.warn("[ReminderStore] Failed to load from storage:", err);
    }
  },
  // Clear all
  clearAll: () => {
    set({ reminders: [] });
    localStorage.removeItem("luccca_reminders");
  }
}));
useReminderStore.getState().loadFromStorage();
export {
  useReminderStore as u
};
