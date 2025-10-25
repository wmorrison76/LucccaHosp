import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for folder uploads - explicitly define fields
const uploadMultiple = multer({
  dest: '/tmp/uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB max per file
    files: 50000, // max number of files
    fieldNameSize: 1000,
    fieldSize: 500 * 1024 * 1024 // 500MB for field data
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
}).fields([
  { name: 'files', maxCount: 50000 }, // Allow up to 50k files per batch
  { name: 'folderName', maxCount: 1 },
  { name: 'isFirstBatch', maxCount: 1 },
  { name: 'isLastBatch', maxCount: 1 },
  { name: 'batchNumber', maxCount: 1 },
  { name: 'totalBatches', maxCount: 1 }
]);

// Error handler for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('[MODULE_UPLOAD] Multer error - Code:', err.code);
    console.error('[MODULE_UPLOAD] Multer error - Message:', err.message);
    console.error('[MODULE_UPLOAD] Multer error - Field:', err.field);
    console.error('[MODULE_UPLOAD] Multer error - Limit:', err.limit);

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, message: 'File too large - single file exceeds 5GB limit' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(413).json({ success: false, message: `Too many files - reached 50000 file limit` });
    }
    if (err.code === 'LIMIT_FIELD_SIZE') {
      return res.status(413).json({ success: false, message: `Single field exceeds 500MB limit` });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    console.error('[MODULE_UPLOAD] Upload middleware error:', err.message);
    console.error('[MODULE_UPLOAD] Error code:', err.code);
    console.error('[MODULE_UPLOAD] Error stack:', err.stack);
    return res.status(400).json({ success: false, message: err.message, code: err.code });
  }
  next();
};

// Async recursive copy function
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * POST /api/modules/upload-folder
 * Upload a module folder with all its files
 * Body: form-data with multiple 'files' and 'paths' fields
 * Returns: { success: bool, message: string, moduleName: string }
 */
// In-memory tracking of active uploads
const activeUploads = new Map();

router.post('/upload-folder', uploadMultiple, handleMulterError, async (req, res) => {
  const startTime = Date.now();

  try {
    const folderName = req.body?.folderName;
    const finalize = req.body?.finalize === 'true';
    const isFirstBatch = req.body?.isFirstBatch === 'true';
    const isLastBatch = req.body?.isLastBatch === 'true';
    const batchNumber = parseInt(req.body?.batchNumber) || 0;
    const totalBatches = parseInt(req.body?.totalBatches) || 0;

    if (!folderName) {
      return res.status(400).json({ success: false, message: 'folderName required' });
    }

    console.log(`[MODULE_UPLOAD] Request: folder=${folderName}, finalize=${finalize}, batch=${batchNumber}/${totalBatches}`);

    const modulesDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'modules');
    const destPath = path.join(modulesDir, folderName);

    // Handle finalization request
    if (finalize) {
      console.log(`[MODULE_UPLOAD] Finalizing: ${folderName}`);
      activeUploads.delete(folderName);

      if (fsSync.existsSync(destPath)) {
        console.log(`[MODULE_UPLOAD] Module installed: ${folderName}`);
        return res.json({
          success: true,
          message: `Module '${folderName}' uploaded successfully`,
          moduleName: folderName,
          path: destPath
        });
      } else {
        return res.status(400).json({ success: false, message: 'Module folder not found after upload' });
      }
    }

    // Handle batch upload
    let files = [];

    // Multer can return files in different formats depending on .fields() configuration
    if (req.files && typeof req.files === 'object') {
      if (Array.isArray(req.files)) {
        files = req.files.filter(f => f && f.path);
      } else if (req.files.files && Array.isArray(req.files.files)) {
        // When using .fields(), files come in req.files.files
        files = req.files.files.filter(f => f && f.path);
      }
    }

    console.log(`[MODULE_UPLOAD] Files received:`, {
      hasReqFiles: !!req.files,
      reqFilesType: typeof req.files,
      filesCount: files.length,
      reqFilesKeys: req.files ? Object.keys(req.files) : 'none'
    });

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files in batch',
        debug: { receivedReqFiles: !!req.files, receivedBody: Object.keys(req.body || {}) }
      });
    }

    // On first batch, create/backup module folder
    if (isFirstBatch) {
      console.log(`[MODULE_UPLOAD] First batch: creating folder ${folderName}`);
      await fs.mkdir(modulesDir, { recursive: true });

      if (fsSync.existsSync(destPath)) {
        const backupPath = destPath + '_backup_' + Date.now();
        console.log(`[MODULE_UPLOAD] Backing up existing folder to ${backupPath}`);
        await fs.rename(destPath, backupPath);
      }

      await fs.mkdir(destPath, { recursive: true });
      activeUploads.set(folderName, { startTime, batchCount: 0, fileCount: 0 });
    }

    // Copy batch files
    console.log(`[MODULE_UPLOAD] Batch ${batchNumber}/${totalBatches}: copying ${files.length} files`);

    let uploadInfo = activeUploads.get(folderName) || { startTime, batchCount: 0, fileCount: 0 };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let relativePath = file.originalname;

      const pathSegments = relativePath.split('/');
      if (pathSegments.length > 1 && pathSegments[0] === folderName) {
        pathSegments.shift();
      }
      relativePath = pathSegments.join('/');

      const destFilePath = path.join(destPath, relativePath);
      const destDir = path.dirname(destFilePath);

      await fs.mkdir(destDir, { recursive: true });
      await fs.copyFile(file.path, destFilePath);

      try {
        await fs.unlink(file.path);
      } catch (e) {
        // Ignore cleanup errors
      }

      uploadInfo.fileCount++;
    }

    uploadInfo.batchCount++;
    activeUploads.set(folderName, uploadInfo);

    console.log(`[MODULE_UPLOAD] Batch ${batchNumber}/${totalBatches} complete. Total files: ${uploadInfo.fileCount}`);

    res.json({
      success: true,
      message: `Batch ${batchNumber}/${totalBatches} received`,
      batch: batchNumber,
      filesInBatch: files.length,
      totalFilesReceived: uploadInfo.fileCount
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`[MODULE_UPLOAD] Error after ${totalTime}ms:`, error.message);
    console.error(`[MODULE_UPLOAD] Stack:`, error.stack);

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        if (file && file.path) {
          try {
            await fs.unlink(file.path);
          } catch (e) {
            // Ignore
          }
        }
      }
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || 'Upload failed'
      });
    }
  }
});

export default router;
