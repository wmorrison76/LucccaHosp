/**
 * Payload Guards Middleware
 * Prevents accidental large payload submissions to external APIs
 * Protects against 413 errors and excessive API costs
 */

const MAX_EMBEDDINGS_PAYLOAD = 10 * 1024 * 1024; // 10MB for embeddings
const MAX_CHAT_PAYLOAD = 5 * 1024 * 1024; // 5MB for chat completions
const MAX_FILES_PER_INGEST = 100; // Max files per ingest batch
const MAX_BUILDER_ENTRIES = 50; // Max Builder.io entries per request

/**
 * Guard against oversized embeddings requests
 */
const guardEmbeddingsPayload = (req, res, next) => {
  if (req.method === 'POST' && req.path && req.path.includes('embeddings')) {
    let payloadSize = 0;
    
    // Estimate payload size
    if (req.body && req.body.input) {
      const inputs = Array.isArray(req.body.input) ? req.body.input : [req.body.input];
      payloadSize = JSON.stringify(inputs).length;
      
      if (payloadSize > MAX_EMBEDDINGS_PAYLOAD) {
        console.warn(`[PAYLOAD_GUARD] Embeddings payload too large: ${(payloadSize / 1024 / 1024).toFixed(2)}MB`);
        return res.status(413).json({
          error: 'Payload Too Large',
          message: `Embeddings payload exceeds ${MAX_EMBEDDINGS_PAYLOAD / 1024 / 1024}MB limit`,
          size: `${(payloadSize / 1024 / 1024).toFixed(2)}MB`,
          suggestion: 'Split the request into smaller batches'
        });
      }
    }
  }
  next();
};

/**
 * Guard against oversized chat completions requests
 */
const guardChatPayload = (req, res, next) => {
  if (req.method === 'POST' && req.path && (req.path.includes('chat') || req.path.includes('completions'))) {
    let payloadSize = 0;
    
    if (req.body && req.body.messages) {
      payloadSize = JSON.stringify(req.body.messages).length;
      
      if (payloadSize > MAX_CHAT_PAYLOAD) {
        console.warn(`[PAYLOAD_GUARD] Chat payload too large: ${(payloadSize / 1024 / 1024).toFixed(2)}MB`);
        return res.status(413).json({
          error: 'Payload Too Large',
          message: `Chat payload exceeds ${MAX_CHAT_PAYLOAD / 1024 / 1024}MB limit`,
          size: `${(payloadSize / 1024 / 1024).toFixed(2)}MB`,
          suggestion: 'Reduce message history or summarize content'
        });
      }
    }
  }
  next();
};

/**
 * Guard against bulk ingestion requests
 */
const guardIngestPayload = (req, res, next) => {
  if (req.method === 'POST' && req.path && req.path.includes('ingest')) {
    if (req.body && req.body.files && Array.isArray(req.body.files)) {
      if (req.body.files.length > MAX_FILES_PER_INGEST) {
        console.warn(`[PAYLOAD_GUARD] Ingest request has too many files: ${req.body.files.length}`);
        return res.status(413).json({
          error: 'Too Many Files',
          message: `Ingest requests limited to ${MAX_FILES_PER_INGEST} files per batch`,
          fileCount: req.body.files.length,
          suggestion: `Split into ${Math.ceil(req.body.files.length / MAX_FILES_PER_INGEST)} separate requests`
        });
      }
    }
  }
  next();
};

/**
 * Guard against bulk Builder.io operations
 */
const guardBuilderPayload = (req, res, next) => {
  if (req.method === 'POST' && req.path && req.path.includes('builder')) {
    if (req.body && req.body.entries && Array.isArray(req.body.entries)) {
      if (req.body.entries.length > MAX_BUILDER_ENTRIES) {
        console.warn(`[PAYLOAD_GUARD] Builder request has too many entries: ${req.body.entries.length}`);
        return res.status(413).json({
          error: 'Too Many Entries',
          message: `Builder requests limited to ${MAX_BUILDER_ENTRIES} entries per batch`,
          entryCount: req.body.entries.length,
          suggestion: `Split into ${Math.ceil(req.body.entries.length / MAX_BUILDER_ENTRIES)} separate requests`
        });
      }
    }
  }
  next();
};

/**
 * Safety check: Prevent module folder processing
 */
const guardModuleFolderProcessing = (req, res, next) => {
  if (req.method === 'POST' && req.path && (req.path.includes('ingest') || req.path.includes('analyze'))) {
    if (req.body && req.body.path && req.body.path.includes('modules')) {
      console.warn(`[PAYLOAD_GUARD] Attempted to process modules folder: ${req.body.path}`);
      return res.status(400).json({
        error: 'Invalid Input',
        message: 'Direct module folder processing is disabled. Use individual file uploads instead.',
        path: req.body.path,
        suggestion: 'Provide a specific file path instead of a directory'
      });
    }
  }
  next();
};

export const applyAllGuards = (app) => {
  app.use(guardEmbeddingsPayload);
  app.use(guardChatPayload);
  app.use(guardIngestPayload);
  app.use(guardBuilderPayload);
  app.use(guardModuleFolderProcessing);
};

export {
  guardEmbeddingsPayload,
  guardChatPayload,
  guardIngestPayload,
  guardBuilderPayload,
  guardModuleFolderProcessing
};
