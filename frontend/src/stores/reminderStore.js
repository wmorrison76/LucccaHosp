import { create } from 'zustand';

const useReminderStore = create((set, get) => ({
  // Active reminders
  reminders: [],
  
  // Add a new reminder
  addReminder: (reminder) => {
    const id = Math.random().toString(36).slice(2) + Date.now();
    const newReminder = {
      id,
      content: reminder.content || '',
      dueDate: reminder.dueDate || null,
      dueTime: reminder.dueTime || null,
      priority: reminder.priority || 'medium', // low, medium, high
      category: reminder.category || 'general',
      recipientGroup: reminder.recipientGroup || null, // framework for future permissions
      recipientUserId: reminder.recipientUserId || null,
      senderUserId: reminder.senderUserId || 'current-user',
      permissionStatus: reminder.permissionStatus || 'auto-approved', // auto-approved, pending, rejected
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDismissed: false,
      isSnoozed: false,
      snoozeUntil: null,
      isCompleted: false,
    };
    
    set((state) => ({
      reminders: [...state.reminders, newReminder],
    }));
    
    // Persist to localStorage
    const state = get();
    localStorage.setItem('luccca_reminders', JSON.stringify(state.reminders));
    
    return newReminder;
  },
  
  // Update reminder
  updateReminder: (id, updates) => {
    set((state) => ({
      reminders: state.reminders.map((r) =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
      ),
    }));
    
    const state = get();
    localStorage.setItem('luccca_reminders', JSON.stringify(state.reminders));
  },
  
  // Delete reminder
  deleteReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.filter((r) => r.id !== id),
    }));
    
    const state = get();
    localStorage.setItem('luccca_reminders', JSON.stringify(state.reminders));
  },
  
  // Dismiss reminder (hide it)
  dismissReminder: (id) => {
    get().updateReminder(id, { isDismissed: true });
  },
  
  // Snooze reminder until time
  snoozeReminder: (id, minutes = 15) => {
    const snoozeUntil = new Date(Date.now() + minutes * 60000).toISOString();
    get().updateReminder(id, { isSnoozed: true, snoozeUntil });
  },
  
  // Complete reminder
  completeReminder: (id) => {
    get().updateReminder(id, { isCompleted: true, isDismissed: true });
  },
  
  // Get active reminders (not dismissed, not completed, not snoozed or snooze time passed)
  getActiveReminders: () => {
    const state = get();
    const now = new Date();
    return state.reminders.filter((r) => {
      if (r.isDismissed || r.isCompleted) return false;
      if (r.isSnoozed && new Date(r.snoozeUntil) > now) return false;
      return true;
    });
  },
  
  // Get due reminders (due date/time has passed)
  getDueReminders: () => {
    const activeReminders = get().getActiveReminders();
    const now = new Date();
    return activeReminders.filter((r) => {
      if (!r.dueDate) return false;
      const dueDateTime = new Date(`${r.dueDate}T${r.dueTime || '00:00'}`);
      return dueDateTime <= now;
    });
  },
  
  // Get upcoming reminders
  getUpcomingReminders: () => {
    const activeReminders = get().getActiveReminders();
    const now = new Date();
    return activeReminders
      .filter((r) => {
        if (!r.dueDate) return false;
        const dueDateTime = new Date(`${r.dueDate}T${r.dueTime || '00:00'}`);
        return dueDateTime > now;
      })
      .sort((a, b) => {
        const timeA = new Date(`${a.dueDate}T${a.dueTime || '00:00'}`);
        const timeB = new Date(`${b.dueDate}T${b.dueTime || '00:00'}`);
        return timeA - timeB;
      });
  },
  
  // Load from localStorage
  loadFromStorage: () => {
    try {
      const stored = localStorage.getItem('luccca_reminders');
      if (stored) {
        const parsed = JSON.parse(stored);
        set({ reminders: parsed });
      }
    } catch (err) {
      console.warn('[ReminderStore] Failed to load from storage:', err);
    }
  },
  
  // Clear all
  clearAll: () => {
    set({ reminders: [] });
    localStorage.removeItem('luccca_reminders');
  },
}));

// Load on init
useReminderStore.getState().loadFromStorage();

export default useReminderStore;
