# Real-time Collaboration MVP - Complete Implementation Plan

## Overview
Complete WebSocket-based multiplayer whiteboard system for real-time team collaboration with cursor tracking, drawing synchronization, and conflict-free state management.

## Phase 1: Architecture & Setup

### Backend Stack
- **Framework**: Express.js with Socket.IO
- **Data Sync**: Operational Transformation (OT) for conflict-free drawing
- **Storage**: In-memory board state with optional Redis for scaling
- **Protocol**: WebSocket via Socket.IO

### Frontend Stack
- **Real-time**: Socket.IO client
- **State**: Zustand for collaborative state
- **Sync**: Custom useCollaboration hook
- **Optimization**: useCallback, useMemo for performance

## Phase 2: Core Implementation

### 1. Backend Socket.IO Server

**File**: `backend/server.js` (update)
- Socket.IO integration
- Room management (board sessions)
- State synchronization
- User authentication
- Event handlers for drawing, cursors, presence

**File**: `backend/services/collaborationService.js` (new)
- Board state management
- Operational Transform implementation
- Conflict resolution
- History tracking

### 2. Frontend Real-time Integration

**File**: `frontend/src/hooks/useCollaboration.ts` (new)
- Socket.IO connection
- Event listeners
- State synchronization
- Cursor broadcasting
- Presence management

**File**: `frontend/src/stores/collaborationStore.ts` (new)
- Zustand store for collaborative state
- Undo/redo with multi-user support
- Board state mutations
- Participant tracking

**File**: `frontend/src/components/AdvancedEchoWhiteboard.jsx` (update)
- Integrate useCollaboration hook
- Add real-time event publishing
- Add presence indicators
- Add conflict resolution UI

### 3. Network Events

#### Drawing Events
```
draw:stroke       - Pen/highlighter stroke
draw:shape        - Rectangle/circle/line
draw:text         - Text object
draw:sticky       - Sticky note
draw:media        - Image/PDF/video/audio
draw:delete       - Object deletion
draw:undo         - Undo action
draw:redo         - Redo action
```

#### Presence Events
```
cursor:move       - User cursor position
cursor:update     - Cursor + viewport
user:join         - User joined board
user:leave        - User left board
user:speaking     - User voice active
```

#### State Events
```
board:sync        - Full board state sync
board:acknowledge - ACK for received changes
board:conflict    - Conflict detected + resolved
```

### 4. Data Structures

#### Board State
```javascript
{
  boardId: string,
  objects: [{
    id: string,
    type: 'stroke'|'shape'|'text'|'sticky'|'image'|'pdf'|'video'|'audio',
    userId: string,
    timestamp: number,
    data: {...},
    version: number
  }],
  version: number,
  participants: [{
    id: string,
    name: string,
    color: string,
    cursorX: number,
    cursorY: number,
    viewportX: number,
    viewportY: number,
    viewportZoom: number,
    speaking: boolean,
    lastUpdate: number
  }],
  history: [{
    action: string,
    userId: string,
    timestamp: number,
    objectId: string,
    changes: {...}
  }]
}
```

#### Operational Transform
```javascript
{
  id: string,
  version: number,
  timestamp: number,
  userId: string,
  operation: {
    type: 'insert'|'update'|'delete',
    objectId: string,
    changes: {...}
  }
}
```

## Phase 3: Implementation Details

### Conflict Resolution Strategy
1. **Timestamp-based**: Last-write-wins for concurrent edits
2. **Operational Transform**: Apply transforms to resolve conflicts
3. **User ID priority**: In tie situations, lower user ID wins
4. **Version vectors**: Track causal history

### Cursor Tracking
- Broadcast every 100ms (throttled)
- Include viewport (pan/zoom) for follow-presenter
- Color-coded per user
- Include participant name on hover

### Presence Management
- User joins: broadcast to all in room
- User leaves: cleanup + broadcast
- Idle detection (5min timeout)
- Speaking indicators for voice integration

### Bandwidth Optimization
- Throttle cursor updates (100ms)
- Debounce drawing strokes (50ms)
- Compress large payloads
- Only sync viewport changes if significant

## Phase 4: Testing & Validation

### Unit Tests
- Operational Transform correctness
- Conflict resolution logic
- State mutation safety
- Event ordering

### Integration Tests
- 2-user collaboration
- 5-user stress test
- Network latency simulation
- Concurrent drawing operations

### Scenarios
1. Simple drawing sync
2. Simultaneous edits on same object
3. Undo/redo with multiple users
4. Large file uploads (video)
5. Network disconnection/reconnection
6. Presenter mode (viewport sync)
7. Cursor following during live drawing

## Phase 5: Deployment & Scaling

### Single Server (MVP)
- In-memory state
- Single Node process
- Perfect for teams <50 users
- Redis for optional persistence

### Scaled Setup (Future)
- Socket.IO with Redis adapter
- Horizontal scaling
- Load balancing
- Database persistence

## Estimated Timeline
- Phase 1-2: 4-6 hours (core implementation)
- Phase 3: 2-3 hours (optimization)
- Phase 4: 2-3 hours (testing)
- **Total: 8-12 hours**

## Success Metrics
- ✅ 2+ users drawing simultaneously
- ✅ <100ms latency for cursor updates
- ✅ Zero drawing conflicts
- ✅ Smooth presenter mode (synchronized viewport)
- ✅ Graceful reconnection handling
- ✅ <1MB/min network usage per user

## API Reference

### Socket.IO Events

#### Client → Server
```
emit('draw:stroke', {objectId, points, color, size})
emit('draw:shape', {type, x, y, width, height, color, fill})
emit('draw:delete', {objectId})
emit('cursor:move', {x, y})
emit('cursor:update', {x, y, pan, zoom})
emit('board:request-sync')
```

#### Server → Client
```
on('draw:stroke', handler)
on('draw:shape', handler)
on('draw:delete', handler)
on('cursor:move', handler)
on('cursor:update', handler)
on('board:sync', handler)
on('user:join', handler)
on('user:leave', handler)
on('board:conflict', handler)
```

## Next Steps
1. Install socket.io in backend
2. Create Socket.IO server integration
3. Build collaboration service
4. Implement useCollaboration hook
5. Update whiteboard component
6. Add presence indicators
7. Test with 2+ users
