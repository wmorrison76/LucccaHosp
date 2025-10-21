export const UserPreferencesStore = {
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load: (key) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },
  syncToDB: async (userId, data) => {
    console.log('Syncing preferences for', userId, data);
  },
};