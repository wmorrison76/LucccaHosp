/**
 * Collaboration Service
 * Manages board state, operational transforms, and conflict resolution
 */

const boards = new Map(); // In-memory board states

/**
 * Create initial board state
 */
export function createBoardState(boardId) {
  const state = {
    id: boardId,
    version: 0,
    objects: [],
    objectVersions: new Map(),
    history: [],
    historyIndex: 0,
    lastModified: Date.now(),
  };

  boards.set(boardId, state);
  return state;
}

/**
 * Get board state
 */
export function getBoardState(boardId) {
  if (!boards.has(boardId)) {
    createBoardState(boardId);
  }

  const state = boards.get(boardId);
  return {
    id: state.id,
    version: state.version,
    objects: state.objects,
    lastModified: state.lastModified,
  };
}

/**
 * Apply operation to board state
 */
export function applyOperation(boardId, operation) {
  const state = getBoardState(boardId);

  switch (operation.type) {
    case 'insert':
      return applyInsert(boardId, operation);
    case 'update':
      return applyUpdate(boardId, operation);
    case 'delete':
      return applyDelete(boardId, operation);
    default:
      console.warn(`Unknown operation type: ${operation.type}`);
      return null;
  }
}

/**
 * Apply insert operation
 */
function applyInsert(boardId, operation) {
  const state = boards.get(boardId);
  const { objectId, data } = operation;

  // Check if object already exists
  const existingIndex = state.objects.findIndex(obj => obj.id === objectId);

  if (existingIndex === -1) {
    // New object
    const object = {
      id: objectId,
      version: 1,
      ...data,
    };

    state.objects.push(object);
    state.objectVersions.set(objectId, 1);
    state.version++;
    state.lastModified = Date.now();

    // Add to history
    addToHistory(boardId, {
      action: 'insert',
      objectId,
      timestamp: Date.now(),
      data,
    });

    return object;
  } else {
    // Object exists, treat as update
    return applyUpdate(boardId, { ...operation, type: 'update' });
  }
}

/**
 * Apply update operation
 */
function applyUpdate(boardId, operation) {
  const state = boards.get(boardId);
  const { objectId, data } = operation;

  const objectIndex = state.objects.findIndex(obj => obj.id === objectId);

  if (objectIndex === -1) {
    console.warn(`Object not found: ${objectId}`);
    return null;
  }

  const object = state.objects[objectIndex];
  const oldVersion = object.version || 1;
  const newVersion = oldVersion + 1;

  // Apply changes
  Object.assign(object, data, {
    version: newVersion,
  });

  state.objectVersions.set(objectId, newVersion);
  state.version++;
  state.lastModified = Date.now();

  // Add to history
  addToHistory(boardId, {
    action: 'update',
    objectId,
    timestamp: Date.now(),
    changes: data,
  });

  return object;
}

/**
 * Apply delete operation
 */
function applyDelete(boardId, operation) {
  const state = boards.get(boardId);
  const { objectId } = operation;

  const objectIndex = state.objects.findIndex(obj => obj.id === objectId);

  if (objectIndex === -1) {
    console.warn(`Object not found for deletion: ${objectId}`);
    return null;
  }

  const deleted = state.objects.splice(objectIndex, 1)[0];
  state.objectVersions.delete(objectId);
  state.version++;
  state.lastModified = Date.now();

  // Add to history
  addToHistory(boardId, {
    action: 'delete',
    objectId,
    timestamp: Date.now(),
  });

  return deleted;
}

/**
 * Add action to history
 */
function addToHistory(boardId, action) {
  const state = boards.get(boardId);

  // Remove any redo history if we're not at the end
  if (state.historyIndex < state.history.length - 1) {
    state.history = state.history.slice(0, state.historyIndex + 1);
  }

  state.history.push(action);
  state.historyIndex = state.history.length - 1;

  // Keep history limited to last 1000 actions
  if (state.history.length > 1000) {
    state.history = state.history.slice(-1000);
    state.historyIndex = state.history.length - 1;
  }
}

/**
 * Undo last action
 */
export function undo(boardId, userId) {
  const state = boards.get(boardId);

  if (!state || state.historyIndex < 0) {
    return null;
  }

  // Move history pointer back
  if (state.historyIndex > 0) {
    state.historyIndex--;
  } else {
    return null;
  }

  // Rebuild state from history up to historyIndex
  const newState = rebuildStateFromHistory(boardId, state.historyIndex);
  
  // Update board state
  state.objects = newState.objects;
  state.lastModified = Date.now();

  return {
    objects: state.objects,
    historyIndex: state.historyIndex,
  };
}

/**
 * Redo last undone action
 */
export function redo(boardId, userId) {
  const state = boards.get(boardId);

  if (!state || state.historyIndex >= state.history.length - 1) {
    return null;
  }

  // Move history pointer forward
  state.historyIndex++;

  // Rebuild state from history up to historyIndex
  const newState = rebuildStateFromHistory(boardId, state.historyIndex);
  
  // Update board state
  state.objects = newState.objects;
  state.lastModified = Date.now();

  return {
    objects: state.objects,
    historyIndex: state.historyIndex,
  };
}

/**
 * Rebuild state from history up to index
 */
function rebuildStateFromHistory(boardId, upToIndex) {
  const state = boards.get(boardId);
  const newObjects = [];
  const objectVersions = new Map();

  // Replay history up to index
  for (let i = 0; i <= upToIndex; i++) {
    const action = state.history[i];

    switch (action.action) {
      case 'insert': {
        const object = {
          id: action.objectId,
          version: 1,
          ...action.data,
        };
        newObjects.push(object);
        objectVersions.set(action.objectId, 1);
        break;
      }

      case 'update': {
        const objIndex = newObjects.findIndex(obj => obj.id === action.objectId);
        if (objIndex !== -1) {
          const oldVersion = newObjects[objIndex].version || 1;
          Object.assign(newObjects[objIndex], action.changes, {
            version: oldVersion + 1,
          });
          objectVersions.set(action.objectId, oldVersion + 1);
        }
        break;
      }

      case 'delete': {
        const objIndex = newObjects.findIndex(obj => obj.id === action.objectId);
        if (objIndex !== -1) {
          newObjects.splice(objIndex, 1);
          objectVersions.delete(action.objectId);
        }
        break;
      }
    }
  }

  return {
    objects: newObjects,
    objectVersions,
  };
}

/**
 * Resolve conflicts between concurrent operations
 * Using Last-Write-Wins with timestamp + user ID fallback
 */
export function resolveConflict(operation1, operation2) {
  if (!operation1 || !operation2) {
    return operation1 || operation2;
  }

  // Different objects - no conflict
  if (operation1.objectId !== operation2.objectId) {
    return [operation1, operation2];
  }

  // Same object - compare timestamps
  const ts1 = operation1.data?.timestamp || 0;
  const ts2 = operation2.data?.timestamp || 0;

  if (ts1 !== ts2) {
    // Earlier timestamp wins
    return ts1 < ts2 ? operation1 : operation2;
  }

  // Same timestamp - use user ID as tiebreaker
  const uid1 = operation1.data?.userId || '';
  const uid2 = operation2.data?.userId || '';

  return uid1 < uid2 ? operation1 : operation2;
}

/**
 * Get conflict-free merge of two states
 */
export function mergeStates(state1, state2) {
  const merged = {
    objects: [],
    version: Math.max(state1.version, state2.version),
  };

  const objectMap = new Map();

  // Add all objects from state1
  state1.objects.forEach(obj => {
    objectMap.set(obj.id, { ...obj });
  });

  // Merge objects from state2
  state2.objects.forEach(obj => {
    if (objectMap.has(obj.id)) {
      // Conflict - resolve
      const obj1 = objectMap.get(obj.id);
      const obj2 = obj;

      // Keep version with higher timestamp
      if ((obj2.timestamp || 0) > (obj1.timestamp || 0)) {
        objectMap.set(obj.id, { ...obj2 });
      }
    } else {
      // New object
      objectMap.set(obj.id, { ...obj });
    }
  });

  merged.objects = Array.from(objectMap.values());
  return merged;
}

/**
 * Get full history for board
 */
export function getBoardHistory(boardId, limit = 100) {
  const state = boards.get(boardId);
  if (!state) return [];

  const start = Math.max(0, state.history.length - limit);
  return state.history.slice(start);
}

/**
 * Clear board (reset to empty state)
 */
export function clearBoard(boardId) {
  const state = boards.get(boardId);
  if (state) {
    state.objects = [];
    state.history = [];
    state.historyIndex = -1;
    state.version++;
    state.lastModified = Date.now();
  }
}

/**
 * Delete board from memory
 */
export function deleteBoard(boardId) {
  boards.delete(boardId);
}

/**
 * Get all active boards
 */
export function getActiveBoardCount() {
  return boards.size;
}

/**
 * Get board statistics
 */
export function getBoardStats(boardId) {
  const state = boards.get(boardId);
  if (!state) return null;

  return {
    boardId,
    objectCount: state.objects.length,
    version: state.version,
    historyLength: state.history.length,
    historyIndex: state.historyIndex,
    lastModified: state.lastModified,
    createdAt: state.createdAt || state.lastModified,
  };
}

// Export service as object
export const collaborationService = {
  createBoardState,
  getBoardState,
  applyOperation,
  undo,
  redo,
  resolveConflict,
  mergeStates,
  getBoardHistory,
  clearBoard,
  deleteBoard,
  getActiveBoardCount,
  getBoardStats,
};

export default collaborationService;
