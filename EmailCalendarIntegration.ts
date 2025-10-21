export const EmailCalendarIntegration = {
  fetchMeetings: async (provider, token) => {
    if (provider === 'google') {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    }
    return [];
  },
  sendReminder: async (email, subject, body) => {
    console.log(`Sending reminder to ${email}: ${subject}`);
  },
};