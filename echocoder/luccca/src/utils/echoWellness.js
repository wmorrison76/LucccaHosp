// Echo monitors chef interaction frequency and long edit sessions.
// After a set time threshold, Echo will suggest a break with a subtle message.
export function checkForChefBreak(lastActiveTimestamp) {
  const now = new Date().getTime();
  const diffMinutes = Math.floor((now - lastActiveTimestamp) / 60000);
  if (diffMinutes > 90) {
    return "Chef, you've been pushing hard. Want me to auto-save and remind you to finish after a quick break?";
  }
  return null;
}
