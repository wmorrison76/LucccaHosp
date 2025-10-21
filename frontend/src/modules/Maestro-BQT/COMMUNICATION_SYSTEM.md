# Maestro Banquets Communication System

## Overview

The Maestro Banquets Communication System provides direct messaging and video conferencing capabilities between chefs and BEO agents, enabling seamless collaboration on Banquet Event Orders (BEOs). This system integrates with the existing Echo CRM Events integration to provide a complete communication workflow.

## Features

### 🗨️ **Direct Messaging**
- **Real-time messaging** between chefs and BEO agents
- **BEO-specific conversations** linked to specific events
- **Message templates** for common BEO discussions
- **Urgency levels** (normal, high, urgent) with visual indicators
- **Read receipts** and message status tracking
- **Message reactions** with emoji support
- **Reply functionality** for threaded conversations

### 📹 **Video Conferencing** 
- **HD video calls** for detailed BEO discussions
- **Audio-only calls** for quick clarifications
- **Screen sharing** for BEO document collaboration
- **Call recording** for important discussions (optional)
- **Integration with BEO context** - calls automatically reference the relevant BEO

### 🔔 **Smart Notifications**
- **Desktop notifications** for urgent messages
- **Visual indicators** for unread messages
- **Priority-based alerts** for time-sensitive BEO changes
- **Integration with sidebar** showing notification badges

### 🎯 **BEO Integration**
- **Contextual messaging** directly within BEO Editor
- **Automatic conversation creation** when BEO is created
- **Echo CRM synchronization** - messages visible to sales team
- **Agent identification** - automatic routing to BEO creator

## User Interface

### Main Chat Interface (`/chat`)

The main chat page provides a comprehensive communication hub:

```typescript
// Accessible via sidebar navigation
// URL: /chat
```

**Features:**
- **Contact list** with online status indicators
- **Conversation history** with search functionality
- **Quick stats** showing online users, unread messages, active calls
- **Settings panel** for notification preferences
- **BEO conversation filtering** for work-specific discussions

### BEO Editor Integration

Direct messaging is integrated into every BEO:

```typescript
// Automatically available in BEO Editor
// Toggle via "Show Communication" button
```

**Features:**
- **Contextual messaging** for specific BEO discussions
- **Quick message templates** for common scenarios:
  - Need Clarification
  - Menu Change Request
  - Dietary Restrictions
  - Guest Count Update
  - Chef Approval Required
  - Urgent Issue
- **Urgency level selection** (normal, high, urgent)
- **Minimizable interface** that doesn't interfere with BEO editing

## Technical Architecture

### Frontend Components

#### Core Components
- **`ChatPanel`** - Main messaging interface
- **`BEOMessaging`** - BEO-specific messaging component
- **`VideoCallModal`** - Video conferencing interface

#### State Management
- **`useCommunicationStore`** - Zustand store for all communication state
- **Real-time WebSocket integration** for live messaging
- **Presence management** for user status tracking

#### Type Definitions
- **`Message`** - Individual message structure
- **`Conversation`** - Chat conversation data
- **`VideoCall`** - Video call session data
- **`User`** - Communication user profile
- **`Notification`** - System notification structure

### Backend Integration

#### WebSocket Connection
```typescript
// Real-time messaging via WebSocket
connectWebSocket() // Establishes persistent connection
```

#### API Endpoints (Planned)
```
POST /api/communication/messages - Send message
GET  /api/communication/conversations - Get conversations
POST /api/communication/calls/start - Start video call
PUT  /api/communication/calls/:id/end - End video call
```

### Integration Points

#### Echo CRM Events Integration
- **Automatic conversation creation** when BEO is created from Echo CRM event
- **Participant identification** - sales agent automatically added to conversation
- **Synchronization** - messages sync back to Echo CRM system
- **Context preservation** - Echo CRM event ID maintained in conversations

#### BEO Workflow Integration
- **Contextual messaging** - each BEO can have dedicated conversation
- **Status updates** - BEO changes trigger communication notifications
- **Approval workflow** - chef approvals communicated to sales agents
- **Timeline coordination** - messaging integrated with BEO timeline phases

## User Workflows

### Chef → Agent Communication

1. **Scenario**: Chef needs clarification on dietary restrictions
   
   ```
   1. Chef opens BEO in editor
   2. Clicks "Show Communication" button
   3. Selects "Dietary Restrictions" template
   4. Sets urgency to "High"
   5. Sends message to sales agent
   6. Agent receives instant notification
   7. Response appears in both BEO context and main chat
   ```

2. **Scenario**: Urgent guest count change needed
   
   ```
   1. Chef receives message about guest count increase
   2. Message marked as "Urgent" with visual indicators
   3. Chef can immediately start video call for discussion
   4. Screen sharing used to review BEO document together
   5. Changes made in real-time with both parties viewing
   ```

### Agent → Chef Communication

1. **Scenario**: Menu modification request from client
   
   ```
   1. Agent creates message in Echo CRM or Maestro chat
   2. Message automatically routes to assigned chef
   3. BEO context included in message
   4. Chef receives notification with urgency level
   5. Conversation continues within BEO Editor context
   ```

### Video Call Workflow

1. **Starting a Call**
   ```typescript
   // From BEO Editor
   handleStartCall('video') // Initiates call with BEO context
   
   // From main chat
   startCall({
     recipientIds: [agentId],
     callType: 'video',
     beoId: 'beo-123',
     callReason: 'Menu discussion'
   })
   ```

2. **Call Features**
   - **HD video quality** for detailed menu reviews
   - **Screen sharing** for BEO document collaboration
   - **Recording capability** for important decisions
   - **BEO context display** during call

## Message Templates

### Pre-defined Templates for Quick Communication

```typescript
const MESSAGE_TEMPLATES = [
  {
    title: 'Need Clarification',
    content: 'I need clarification on some details in this BEO...',
    urgency: 'normal'
  },
  {
    title: 'Menu Change Request', 
    content: 'There\'s been a change request for the menu...',
    urgency: 'high'
  },
  {
    title: 'Dietary Restrictions',
    content: 'I have concerns about the dietary restrictions...',
    urgency: 'high'
  },
  {
    title: 'Guest Count Update',
    content: 'The guest count has changed...',
    urgency: 'urgent'
  },
  {
    title: 'Chef Approval Required',
    content: 'This BEO is ready for final review...',
    urgency: 'normal'
  },
  {
    title: 'Urgent Issue',
    content: 'We have an urgent issue that needs attention...',
    urgency: 'urgent'
  }
];
```

## Notification System

### Urgency Levels

1. **Normal** - Standard communication
   - No special visual indicators
   - Regular notification timing
   - Standard priority in queue

2. **High** - Important but not time-critical
   - Orange visual indicators
   - Faster notification delivery
   - Higher priority in queue

3. **Urgent** - Immediate attention required
   - Red visual indicators with animation
   - Instant notifications (desktop + mobile)
   - Top priority in all queues
   - Triggers immediate alerts

### Notification Channels

1. **In-App Notifications**
   - Visual badges on sidebar
   - Toast notifications for new messages
   - Sound alerts (configurable)

2. **Desktop Notifications**
   - Browser notifications for urgent messages
   - Persistent until acknowledged
   - Click to jump to conversation

3. **Email Integration** (Future)
   - Email notifications for missed urgent messages
   - Daily digest of conversations
   - Out-of-office auto-responses

## Settings and Preferences

### User Settings
```typescript
interface CommunicationSettings {
  soundEnabled: boolean;
  desktopNotifications: boolean;
  emailNotifications: boolean;
  autoReadReceipts: boolean;
  showOnlineStatus: boolean;
  callQuality: 'auto' | 'audio' | 'sd' | 'hd';
}
```

### Notification Preferences
- **Sound notifications** - Enable/disable message sounds
- **Desktop alerts** - Browser notification permissions
- **Email notifications** - Email digest preferences
- **Auto-read receipts** - Automatic message read confirmation
- **Online status** - Visibility of presence status

## Security and Privacy

### Message Encryption
- **In-transit encryption** - All messages encrypted via HTTPS/WSS
- **At-rest encryption** - Database encryption for stored messages
- **End-to-end encryption** (Future) - Client-side message encryption

### Access Controls
- **Role-based access** - Chefs can only message relevant agents
- **BEO-specific permissions** - Access limited to assigned personnel
- **Audit logging** - Complete communication audit trail

### Data Retention
- **Message retention** - 90-day default retention policy
- **Call recordings** - 30-day retention for compliance
- **Archive functionality** - Long-term storage for important conversations

## Performance and Scalability

### Real-time Features
- **WebSocket connections** - Persistent connections for instant messaging
- **Connection pooling** - Efficient connection management
- **Automatic reconnection** - Handles network interruptions gracefully

### Optimization
- **Message pagination** - Efficient loading of conversation history
- **Presence optimization** - Efficient user status tracking
- **Caching strategies** - Redis caching for frequently accessed data

## Analytics and Reporting

### Communication Metrics
- **Response times** - Average time between message and response
- **Resolution rates** - Percentage of issues resolved via chat
- **Usage patterns** - Peak communication times and frequency
- **User engagement** - Active users and conversation participation

### BEO Communication Analytics
- **BEO discussion frequency** - How often BEOs require discussion
- **Issue categories** - Most common types of BEO clarifications
- **Resolution efficiency** - Time from question to resolution
- **Agent performance** - Response times by sales agent

## Future Enhancements

### Planned Features
1. **Mobile App** - Native mobile communication app
2. **Voice Messages** - Audio message recording and playback
3. **File Sharing** - Document and image sharing in conversations
4. **Group Conversations** - Multi-party discussions for complex events
5. **AI Assistance** - Automated responses for common questions
6. **Integration Expansion** - Connect with more external systems
7. **Advanced Video Features** - Whiteboarding, presentation mode
8. **Smart Scheduling** - Calendar integration for call scheduling

### Integration Roadmap
1. **Calendar Integration** - Schedule calls directly from calendar
2. **CRM Enhancement** - Deeper Echo CRM integration
3. **Workflow Automation** - Automated messages based on BEO status
4. **Reporting Dashboard** - Communication analytics dashboard
5. **Mobile Notifications** - Push notifications for mobile devices

## Implementation Status

### ✅ Completed Features
- [x] Core messaging infrastructure
- [x] BEO-specific conversations
- [x] Video call initiation
- [x] Message templates
- [x] Urgency levels
- [x] Real-time WebSocket setup
- [x] Integration with BEO Editor
- [x] Echo CRM integration hooks
- [x] Notification system
- [x] User presence tracking

### 🚧 In Progress
- [ ] WebSocket server implementation
- [ ] Video call backend (WebRTC)
- [ ] File sharing capabilities
- [ ] Mobile optimization

### 📋 Planned
- [ ] Call recording functionality
- [ ] Advanced search and filtering
- [ ] Email notification integration
- [ ] Mobile app development
- [ ] Analytics dashboard

## Getting Started

### For Chefs
1. **Access via BEO Editor**: Open any BEO and click "Show Communication"
2. **Use message templates** for quick, standardized communication
3. **Set urgency levels** appropriately based on time sensitivity
4. **Start video calls** for complex discussions requiring visual collaboration

### For Sales Agents
1. **Access via main chat** at `/chat` in the navigation
2. **Monitor BEO conversations** for client change requests
3. **Respond promptly** to chef clarifications and questions
4. **Use Echo CRM integration** to maintain conversation history

### For Administrators
1. **Monitor communication metrics** for team performance
2. **Configure notification settings** for optimal workflow
3. **Review conversation analytics** for process improvements
4. **Manage user permissions** and access controls

This communication system bridges the gap between sales and operations teams, ensuring that every BEO is executed with perfect coordination and clear communication between all stakeholders.
