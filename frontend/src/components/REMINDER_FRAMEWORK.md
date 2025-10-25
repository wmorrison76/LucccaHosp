# Advanced Sticky Note Reminder System - Framework Guide

## Overview
A robust reminder framework with permission-based sending, snoozing, and dashboard integration. Built to be easy to connect user/group permissions later.

## Architecture

### 1. **reminderStore.js** (`frontend/src/stores/reminderStore.js`)
Zustand store managing all reminder state and logic.

#### Reminder Object Structure:
```javascript
{
  id: string,                    // Unique reminder ID
  content: string,               // Reminder text
  dueDate: string,              // Date (YYYY-MM-DD)
  dueTime: string,              // Time (HH:MM)
  priority: enum,               // "low" | "medium" | "high"
  category: enum,               // "general" | "work" | "personal" | "urgent"
  recipientGroup: string|null,  // [FRAMEWORK] User group for permissions
  recipientUserId: string|null, // [FRAMEWORK] Target user ID
  senderUserId: string,         // Current user ID
  permissionStatus: enum,       // "auto-approved" | "pending" | "rejected"
  createdAt: ISO string,
  updatedAt: ISO string,
  isDismissed: boolean,
  isSnoozed: boolean,
  snoozeUntil: ISO string|null,
  isCompleted: boolean,
}
```

#### Key Methods:
- `addReminder(data)` - Create new reminder
- `updateReminder(id, updates)` - Modify reminder
- `deleteReminder(id)` - Remove reminder
- `dismissReminder(id)` - Hide from active view
- `snoozeReminder(id, minutes)` - Snooze until time
- `completeReminder(id)` - Mark as done
- `getActiveReminders()` - Filter active (not dismissed/completed/snoozed)
- `getDueReminders()` - Get reminders past due date
- `getUpcomingReminders()` - Get future reminders

#### Persistence:
- Automatically saves to localStorage: `luccca_reminders`
- Loads on store initialization
- All state changes persist automatically

---

### 2. **StickyNotePanelEnhanced.jsx** (`frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx`)
Enhanced sticky note UI with reminder creation form.

#### Features:
- ✅ Text editing with auto-save to localStorage
- ✅ Reminder creation UI (date, time, priority, category)
- ✅ [FRAMEWORK] Placeholder for user/group selection
- ✅ Reminder count display
- ✅ Integration with reminderStore

#### Framework Connection Points:
1. **User/Group Selection** (Line ~190):
   ```javascript
   {/* Framework: Permission placeholder */}
   <div>📌 User/Group: [Framework - Connect permissions later]</div>
   ```
   **TODO:** Replace with:
   - Dropdown/autocomplete for users
   - Group selector
   - Permission checker (auto-approved vs pending)

2. **Reminder Creation** (Line ~220):
   ```javascript
   addReminder({
     recipientGroup: null,    // Set this from dropdown
     recipientUserId: null,   // Set this from selection
     // ... other fields
   });
   ```

---

### 3. **ReminderWidget.jsx** (`frontend/src/components/ReminderWidget.jsx`)
Dashboard panel showing due/active reminders.

#### Features:
- ✅ Display all due reminders
- ✅ Collapse/expand for details
- ✅ Quick actions: Snooze, Complete, Dismiss
- ✅ Priority color coding
- ✅ [FRAMEWORK] Permission status display
- ✅ Auto-updates every minute

#### Framework Connection Points:
1. **Permission Status Display** (Line ~145):
   ```javascript
   {reminder.permissionStatus === 'auto-approved' && "✓ Auto"}
   {reminder.permissionStatus === 'pending' && "⏳ Pending"}
   {reminder.permissionStatus === 'rejected' && "✗ Rejected"}
   ```
   **TODO:** Implement acceptance/rejection UI for pending reminders

2. **Recipient Display** (Line ~153):
   ```javascript
   {reminder.recipientGroup && (
     <div>📤 Sent to: [Framework - {reminder.recipientGroup}]</div>
   )}
   ```
   **TODO:** Show actual recipient name/group

---

### 4. **Toolbar Integration** (`frontend/src/board/Toolbar.jsx`)
Toolbar button with reminder badge count.

#### Features:
- ✅ Bell icon button in toolbar
- ✅ Red badge showing due reminder count
- ✅ Opens ReminderWidget panel on click
- ✅ Auto-updates reminder count every minute

---

### 5. **Board Registration** (`frontend/src/board/Board.jsx`)
Panel registry entries:

```javascript
if (StickyNotePanel) PANEL_REGISTRY.stickynote = { 
  title: "Sticky Note", 
  Component: StickyNotePanel, 
  icon: null 
};

if (ReminderWidget) PANEL_REGISTRY.reminders = { 
  title: "Reminders", 
  Component: ReminderWidget, 
  icon: null 
};
```

---

## Integration Roadmap: Connecting Permissions Later

### Phase 1: User Authentication Integration
**File:** `frontend/src/stores/reminderStore.js`

```javascript
// BEFORE:
senderUserId: reminder.senderUserId || 'current-user',

// AFTER (when auth connected):
senderUserId: reminder.senderUserId || getCurrentUserId(), // From auth store
```

### Phase 2: User/Group Selector Component
**File:** `frontend/src/components/EchoCore/panels/StickyNotePanelEnhanced.jsx`

Replace the placeholder UI (line ~190) with:

```javascript
{/* Real user/group selector */}
<UserGroupSelector 
  selectedUser={reminderForm.recipientUserId}
  selectedGroup={reminderForm.recipientGroup}
  onUserSelect={(userId) => setReminderForm({...reminderForm, recipientUserId: userId})}
  onGroupSelect={(groupId) => setReminderForm({...reminderForm, recipientGroup: groupId})}
/>
```

### Phase 3: Permission Checker
**File:** `frontend/src/stores/reminderStore.js`

Update `addReminder()`:

```javascript
const checkPermission = (senderRole, recipientRole) => {
  // Exec → Sous Chef = auto-approved
  // Sous Chef → Exec = pending
  // Custom rules...
  return 'auto-approved' | 'pending';
};

// In addReminder:
const newReminder = {
  permissionStatus: checkPermission(senderRole, recipientRole),
};
```

### Phase 4: Reminder Acceptance UI
**File:** `frontend/src/components/ReminderWidget.jsx`

Add to expanded reminder view (around line ~145):

```javascript
{reminder.permissionStatus === 'pending' && (
  <div style={{display: 'flex', gap: '6px', marginTop: '8px'}}>
    <button onClick={() => acceptReminder(reminder.id)}>✓ Accept</button>
    <button onClick={() => rejectReminder(reminder.id)}>✗ Reject</button>
  </div>
)}
```

### Phase 5: Recipient Display
Update both components to show actual names instead of IDs:

```javascript
// Use auth/user store to get:
const recipientName = getUserNameById(reminder.recipientUserId);
const groupName = getGroupNameById(reminder.recipientGroup);
```

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│   Toolbar Bell Button           │
│   Shows reminder count          │
└──────────────┬──────────────────┘
               │ Click → open-panel event
               ▼
┌─────────────────────────────────┐
│   ReminderWidget Panel          │
│   (Board.jsx registers)         │
│   - Shows due reminders         │
│   - Actions: snooze, complete   │
└──────────────┬──────────��───────┘
               ▲
               │ Subscribes to reminder updates
               │
┌──────────────┴──────────────────┐
│   reminderStore (Zustand)       │
│   - State: reminders[]          │
│   - Methods: add, update, etc   │
│   - Persistence: localStorage   │
└──────────────┬──────────────────┘
               ▲
               │ Creates reminders
               │
┌──────────────┴──────────────────┐
│   StickyNotePanelEnhanced       │
│   - Create sticky notes         │
│   - Set reminders               │
│   - [FRAMEWORK] User selector   │
└─────────────────────────────────┘
```

---

## Current Features (Working)

✅ Create sticky notes with text
✅ Set reminders with date, time, priority, category
✅ View all due reminders in dashboard
✅ Snooze reminders
✅ Mark reminders complete
✅ Dismiss reminders
✅ Delete reminders
✅ Persistent storage (localStorage)
✅ Permission status field (not yet wired)
✅ Recipient selection field (not yet wired)
✅ Toolbar badge count

## TODO for Permission System

- [ ] Integrate with user authentication store
- [ ] Create UserGroupSelector component
- [ ] Implement permission checker function
- [ ] Add acceptance/rejection UI
- [ ] Update recipient display logic
- [ ] Connect to backend API for cross-user reminders
- [ ] Add notification system for incoming reminders

---

## Quick Start: Testing Framework

1. **Open Sticky Note:**
   - Click sidebar menu → find "Sticky Note" or use toolbar
   - Type some text

2. **Create Reminder:**
   - Click bell icon in sticky note header
   - Set date, time, priority, category
   - Click "Create Reminder"

3. **View Reminders:**
   - Click bell icon in toolbar
   - See all due reminders
   - Try snooze, complete, dismiss actions

4. **Test in Code:**
   ```javascript
   // In browser console:
   import useReminderStore from './stores/reminderStore';
   const store = useReminderStore.getState();
   store.addReminder({content: 'Test', dueDate: '2025-10-23'});
   console.log(store.getDueReminders());
   ```

---

## File Structure
```
frontend/src/
├── stores/
│   └── reminderStore.js              [STATE MANAGEMENT]
├── components/
│   ├── EchoCore/panels/
│   │   └── StickyNotePanelEnhanced.jsx  [NOTE + REMINDER UI]
│   ├── ReminderWidget.jsx            [DASHBOARD PANEL]
│   └── REMINDER_FRAMEWORK.md         [THIS FILE]
└── board/
    ├── Board.jsx                     [PANEL REGISTRY]
    └── Toolbar.jsx                   [BELL BUTTON]
```

---

## Notes for Future Enhancement

- Consider adding recurring reminders
- Add email/SMS notification integration
- Implement reminder templates
- Add collaborative reminders (@ mentions)
- Create reminder history/archive
- Add reminder search and filtering
- Implement smart snooze suggestions
- Add calendar view of reminders
