import { Server } from 'socket.io';
import { collaborationService } from './collaborationService.js';

let io = null;
const boardRooms = new Map(); // Track active boards

/**
 * Initialize Socket.IO server
 */
export function initializeSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
    pingInterval: 30000, // 30 seconds
    pingTimeout: 60000, // 60 seconds
  });

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // Handle user joining a board
    socket.on('board:join', ({ boardId, userId, userName, userColor }) => {
      handleBoardJoin(socket, boardId, userId, userName, userColor);
    });

    // Handle drawing events
    socket.on('draw:stroke', ({ boardId, objectId, points, color, size, userId }) => {
      handleDrawStroke(socket, boardId, objectId, points, color, size, userId);
    });

    socket.on('draw:shape', ({ boardId, type, x, y, width, height, color, fill, userId }) => {
      handleDrawShape(socket, boardId, type, x, y, width, height, color, fill, userId);
    });

    socket.on('draw:text', ({ boardId, text, x, y, fontSize, color, userId }) => {
      handleDrawText(socket, boardId, text, x, y, fontSize, color, userId);
    });

    socket.on('draw:sticky', ({ boardId, text, x, y, bgColor, userId }) => {
      handleDrawSticky(socket, boardId, text, x, y, bgColor, userId);
    });

    socket.on('draw:media', ({ boardId, mediaObject, userId }) => {
      handleDrawMedia(socket, boardId, mediaObject, userId);
    });

    socket.on('draw:delete', ({ boardId, objectId, userId }) => {
      handleDrawDelete(socket, boardId, objectId, userId);
    });

    socket.on('draw:undo', ({ boardId, userId }) => {
      handleUndo(socket, boardId, userId);
    });

    socket.on('draw:redo', ({ boardId, userId }) => {
      handleRedo(socket, boardId, userId);
    });

    // Handle cursor events
    socket.on('cursor:move', ({ boardId, x, y, userId }) => {
      handleCursorMove(socket, boardId, x, y, userId);
    });

    socket.on('cursor:update', ({ boardId, x, y, pan, zoom, userId }) => {
      handleCursorUpdate(socket, boardId, x, y, pan, zoom, userId);
    });

    // Handle presence
    socket.on('user:speaking', ({ boardId, speaking, userId }) => {
      handleUserSpeaking(socket, boardId, speaking, userId);
    });

    // Handle board sync request
    socket.on('board:request-sync', ({ boardId, userId }) => {
      handleBoardSyncRequest(socket, boardId, userId);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      handleUserDisconnect(socket);
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error(`[Socket Error] ${socket.id}:`, error);
    });
  });

  console.log('[Socket.IO] Server initialized');
  return io;
}

/**
 * Handle user joining board
 */
function handleBoardJoin(socket, boardId, userId, userName, userColor) {
  socket.join(boardId);

  if (!boardRooms.has(boardId)) {
    boardRooms.set(boardId, {
      id: boardId,
      participants: new Map(),
      state: collaborationService.createBoardState(boardId),
    });
  }

  const room = boardRooms.get(boardId);
  const participant = {
    id: userId,
    socketId: socket.id,
    name: userName,
    color: userColor,
    cursorX: 0,
    cursorY: 0,
    viewportX: 0,
    viewportY: 0,
    viewportZoom: 1,
    speaking: false,
    joinedAt: Date.now(),
  };

  room.participants.set(userId, participant);
  socket.data = { boardId, userId, userName };

  // Send full board state to joining user
  const boardState = collaborationService.getBoardState(boardId);
  socket.emit('board:sync', {
    boardId,
    state: boardState,
    participants: Array.from(room.participants.values()),
  });

  // Notify others of new participant
  io.to(boardId).emit('user:join', {
    userId,
    name: userName,
    color: userColor,
    timestamp: Date.now(),
  });

  console.log(`[Board ${boardId}] User ${userName} (${userId}) joined`);
}

/**
 * Handle drawing stroke
 */
function handleDrawStroke(socket, boardId, objectId, points, color, size, userId) {
  const operation = {
    type: 'insert',
    objectId: objectId || generateId(),
    data: {
      type: 'stroke',
      points,
      color,
      size,
      userId,
      timestamp: Date.now(),
    },
  };

  collaborationService.applyOperation(boardId, operation);
  
  io.to(boardId).emit('draw:stroke', {
    objectId: operation.objectId,
    points,
    color,
    size,
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle drawing shape
 */
function handleDrawShape(socket, boardId, type, x, y, width, height, color, fill, userId) {
  const objectId = generateId();
  const operation = {
    type: 'insert',
    objectId,
    data: {
      type: 'shape',
      shapeType: type,
      x,
      y,
      width,
      height,
      color,
      fill,
      userId,
      timestamp: Date.now(),
    },
  };

  collaborationService.applyOperation(boardId, operation);

  io.to(boardId).emit('draw:shape', {
    objectId,
    type,
    x,
    y,
    width,
    height,
    color,
    fill,
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle drawing text
 */
function handleDrawText(socket, boardId, text, x, y, fontSize, color, userId) {
  const objectId = generateId();
  const operation = {
    type: 'insert',
    objectId,
    data: {
      type: 'text',
      text,
      x,
      y,
      fontSize,
      color,
      userId,
      timestamp: Date.now(),
    },
  };

  collaborationService.applyOperation(boardId, operation);

  io.to(boardId).emit('draw:text', {
    objectId,
    text,
    x,
    y,
    fontSize,
    color,
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle drawing sticky note
 */
function handleDrawSticky(socket, boardId, text, x, y, bgColor, userId) {
  const objectId = generateId();
  const operation = {
    type: 'insert',
    objectId,
    data: {
      type: 'sticky',
      text,
      x,
      y,
      bgColor,
      userId,
      timestamp: Date.now(),
    },
  };

  collaborationService.applyOperation(boardId, operation);

  io.to(boardId).emit('draw:sticky', {
    objectId,
    text,
    x,
    y,
    bgColor,
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle drawing media
 */
function handleDrawMedia(socket, boardId, mediaObject, userId) {
  const objectId = mediaObject.id || generateId();
  const operation = {
    type: 'insert',
    objectId,
    data: {
      ...mediaObject,
      type: mediaObject.type,
      userId,
      timestamp: Date.now(),
    },
  };

  collaborationService.applyOperation(boardId, operation);

  io.to(boardId).emit('draw:media', {
    objectId,
    mediaObject: { ...mediaObject, id: objectId },
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle object deletion
 */
function handleDrawDelete(socket, boardId, objectId, userId) {
  const operation = {
    type: 'delete',
    objectId,
  };

  collaborationService.applyOperation(boardId, operation);

  io.to(boardId).emit('draw:delete', {
    objectId,
    userId,
    timestamp: Date.now(),
  });
}

/**
 * Handle undo
 */
function handleUndo(socket, boardId, userId) {
  const undoState = collaborationService.undo(boardId, userId);
  
  if (undoState) {
    io.to(boardId).emit('draw:undo', {
      userId,
      state: undoState,
      timestamp: Date.now(),
    });
  }
}

/**
 * Handle redo
 */
function handleRedo(socket, boardId, userId) {
  const redoState = collaborationService.redo(boardId, userId);
  
  if (redoState) {
    io.to(boardId).emit('draw:redo', {
      userId,
      state: redoState,
      timestamp: Date.now(),
    });
  }
}

/**
 * Handle cursor move (throttled)
 */
function handleCursorMove(socket, boardId, x, y, userId) {
  const room = boardRooms.get(boardId);
  if (room && room.participants.has(userId)) {
    const participant = room.participants.get(userId);
    participant.cursorX = x;
    participant.cursorY = y;
  }

  io.to(boardId).emit('cursor:move', {
    userId,
    x,
    y,
    timestamp: Date.now(),
  });
}

/**
 * Handle cursor update with viewport
 */
function handleCursorUpdate(socket, boardId, x, y, pan, zoom, userId) {
  const room = boardRooms.get(boardId);
  if (room && room.participants.has(userId)) {
    const participant = room.participants.get(userId);
    participant.cursorX = x;
    participant.cursorY = y;
    participant.viewportX = pan.x;
    participant.viewportY = pan.y;
    participant.viewportZoom = zoom;
  }

  io.to(boardId).emit('cursor:update', {
    userId,
    x,
    y,
    pan,
    zoom,
    timestamp: Date.now(),
  });
}

/**
 * Handle user speaking status
 */
function handleUserSpeaking(socket, boardId, speaking, userId) {
  const room = boardRooms.get(boardId);
  if (room && room.participants.has(userId)) {
    room.participants.get(userId).speaking = speaking;
  }

  io.to(boardId).emit('user:speaking', {
    userId,
    speaking,
    timestamp: Date.now(),
  });
}

/**
 * Handle board sync request
 */
function handleBoardSyncRequest(socket, boardId, userId) {
  const boardState = collaborationService.getBoardState(boardId);
  const room = boardRooms.get(boardId);
  const participants = room ? Array.from(room.participants.values()) : [];

  socket.emit('board:sync', {
    boardId,
    state: boardState,
    participants,
    timestamp: Date.now(),
  });
}

/**
 * Handle user disconnect
 */
function handleUserDisconnect(socket) {
  const { boardId, userId, userName } = socket.data || {};
  
  if (boardId) {
    const room = boardRooms.get(boardId);
    if (room) {
      room.participants.delete(userId);
      
      // Remove room if empty
      if (room.participants.size === 0) {
        boardRooms.delete(boardId);
        console.log(`[Board ${boardId}] Removed (empty)`);
      } else {
        io.to(boardId).emit('user:leave', {
          userId,
          name: userName,
          timestamp: Date.now(),
        });
      }
    }
  }

  console.log(`[Socket] User disconnected: ${socket.id}`);
}

/**
 * Get Socket.IO instance
 */
export function getIO() {
  return io;
}

/**
 * Generate unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get board participants
 */
export function getBoardParticipants(boardId) {
  const room = boardRooms.get(boardId);
  return room ? Array.from(room.participants.values()) : [];
}

/**
 * Get all active boards
 */
export function getActiveBoardCount() {
  return boardRooms.size;
}
