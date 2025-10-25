import { useEffect, useCallback, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface UseCollaborationOptions {
  boardId: string;
  userId: string;
  userName: string;
  userColor: string;
  serverUrl?: string;
  onDrawStroke?: (data: any) => void;
  onDrawShape?: (data: any) => void;
  onDrawText?: (data: any) => void;
  onDrawSticky?: (data: any) => void;
  onDrawMedia?: (data: any) => void;
  onDrawDelete?: (data: any) => void;
  onUndo?: (data: any) => void;
  onRedo?: (data: any) => void;
  onCursorMove?: (data: any) => void;
  onCursorUpdate?: (data: any) => void;
  onUserJoin?: (data: any) => void;
  onUserLeave?: (data: any) => void;
  onUserSpeaking?: (data: any) => void;
  onBoardSync?: (data: any) => void;
}

export function useCollaboration(options: UseCollaborationOptions) {
  const {
    boardId,
    userId,
    userName,
    userColor,
    serverUrl = 'http://localhost:3000',
    onDrawStroke,
    onDrawShape,
    onDrawText,
    onDrawSticky,
    onDrawMedia,
    onDrawDelete,
    onUndo,
    onRedo,
    onCursorMove,
    onCursorUpdate,
    onUserJoin,
    onUserLeave,
    onUserSpeaking,
    onBoardSync,
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<any[]>([]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!boardId || !userId) return;

    const socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      console.log('[Collaboration] Connected');
      setIsConnected(true);
      socket.emit('board:join', { boardId, userId, userName, userColor });
    });

    socket.on('disconnect', () => {
      console.log('[Collaboration] Disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('[Collaboration] Connection error:', error);
    });

    // Drawing events
    socket.on('draw:stroke', (data) => {
      console.log('[Draw] Stroke received');
      onDrawStroke?.(data);
    });

    socket.on('draw:shape', (data) => {
      console.log('[Draw] Shape received');
      onDrawShape?.(data);
    });

    socket.on('draw:text', (data) => {
      console.log('[Draw] Text received');
      onDrawText?.(data);
    });

    socket.on('draw:sticky', (data) => {
      console.log('[Draw] Sticky received');
      onDrawSticky?.(data);
    });

    socket.on('draw:media', (data) => {
      console.log('[Draw] Media received');
      onDrawMedia?.(data);
    });

    socket.on('draw:delete', (data) => {
      console.log('[Draw] Delete received');
      onDrawDelete?.(data);
    });

    socket.on('draw:undo', (data) => {
      console.log('[Draw] Undo received');
      onUndo?.(data);
    });

    socket.on('draw:redo', (data) => {
      console.log('[Draw] Redo received');
      onRedo?.(data);
    });

    // Cursor events
    socket.on('cursor:move', (data) => {
      onCursorMove?.(data);
    });

    socket.on('cursor:update', (data) => {
      onCursorUpdate?.(data);
    });

    // Presence events
    socket.on('user:join', (data) => {
      console.log('[Presence] User joined:', data.name);
      onUserJoin?.(data);
      setParticipants(prev => [...prev, { id: data.userId, ...data }]);
    });

    socket.on('user:leave', (data) => {
      console.log('[Presence] User left:', data.name);
      onUserLeave?.(data);
      setParticipants(prev => prev.filter(p => p.id !== data.userId));
    });

    socket.on('user:speaking', (data) => {
      onUserSpeaking?.(data);
    });

    // Board sync
    socket.on('board:sync', (data) => {
      console.log('[Collaboration] Board sync received');
      onBoardSync?.(data);
      if (data.participants) {
        setParticipants(data.participants);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [boardId, userId, serverUrl]);

  // Public API for drawing events
  const publishDrawStroke = useCallback(
    (objectId: string, points: any[], color: string, size: number) => {
      socketRef.current?.emit('draw:stroke', {
        boardId,
        objectId,
        points,
        color,
        size,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishDrawShape = useCallback(
    (type: string, x: number, y: number, width: number, height: number, color: string, fill: boolean) => {
      socketRef.current?.emit('draw:shape', {
        boardId,
        type,
        x,
        y,
        width,
        height,
        color,
        fill,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishDrawText = useCallback(
    (text: string, x: number, y: number, fontSize: number, color: string) => {
      socketRef.current?.emit('draw:text', {
        boardId,
        text,
        x,
        y,
        fontSize,
        color,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishDrawSticky = useCallback(
    (text: string, x: number, y: number, bgColor: string) => {
      socketRef.current?.emit('draw:sticky', {
        boardId,
        text,
        x,
        y,
        bgColor,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishDrawMedia = useCallback(
    (mediaObject: any) => {
      socketRef.current?.emit('draw:media', {
        boardId,
        mediaObject,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishDrawDelete = useCallback(
    (objectId: string) => {
      socketRef.current?.emit('draw:delete', {
        boardId,
        objectId,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishUndo = useCallback(() => {
    socketRef.current?.emit('draw:undo', {
      boardId,
      userId,
    });
  }, [boardId, userId]);

  const publishRedo = useCallback(() => {
    socketRef.current?.emit('draw:redo', {
      boardId,
      userId,
    });
  }, [boardId, userId]);

  const publishCursorMove = useCallback(
    (x: number, y: number) => {
      socketRef.current?.emit('cursor:move', {
        boardId,
        x,
        y,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishCursorUpdate = useCallback(
    (x: number, y: number, pan: { x: number; y: number }, zoom: number) => {
      socketRef.current?.emit('cursor:update', {
        boardId,
        x,
        y,
        pan,
        zoom,
        userId,
      });
    },
    [boardId, userId]
  );

  const publishUserSpeaking = useCallback(
    (speaking: boolean) => {
      socketRef.current?.emit('user:speaking', {
        boardId,
        speaking,
        userId,
      });
    },
    [boardId, userId]
  );

  const requestBoardSync = useCallback(() => {
    socketRef.current?.emit('board:request-sync', {
      boardId,
      userId,
    });
  }, [boardId, userId]);

  return {
    // Connection state
    isConnected,
    participants,

    // Drawing API
    publishDrawStroke,
    publishDrawShape,
    publishDrawText,
    publishDrawSticky,
    publishDrawMedia,
    publishDrawDelete,
    publishUndo,
    publishRedo,

    // Cursor API
    publishCursorMove,
    publishCursorUpdate,

    // Presence API
    publishUserSpeaking,

    // Sync API
    requestBoardSync,

    // Direct socket access (if needed)
    socket: socketRef.current,
  };
}
