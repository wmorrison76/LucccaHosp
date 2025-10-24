import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for folder uploads - accept all fields
const uploadMultiple = multer({
  dest: '/tmp/uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB max per file
    files: 50000, // max number of files (was 5000, increased to 50k)
    fieldNameSize: 1000,
    fieldSize: 500 * 1024 * 1024 // 500MB for field data
  },
  fileFilter: (req, file, cb) => {
    // Accept all files in folder upload
    cb(null, true);
  }
}).any();

// Error handler for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('[MODULE_UPLOAD] Multer error:', err.code, err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, message: 'File too large' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(413).json({ success: false, message: 'Too many files' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err) {
    console.error('[MODULE_UPLOAD] Upload middleware error:', err.message);
    return res.status(400).json({ success: false, message: err.message });
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
router.post('/upload-folder', uploadMultiple, handleMulterError, async (req, res) => {
  const startTime = Date.now();

  try {
    console.log(`[MODULE_UPLOAD] Upload folder endpoint hit`);
    console.log(`[MODULE_UPLOAD] req.files type:`, Array.isArray(req.files) ? 'array' : typeof req.files);
    console.log(`[MODULE_UPLOAD] req.files count:`, Array.isArray(req.files) ? req.files.length : 'not array');

    if (Array.isArray(req.files)) {
      console.log(`[MODULE_UPLOAD] First few files:`, req.files.slice(0, 3).map(f => ({
        filename: f.filename,
        originalname: f.originalname,
        size: f.size,
        path: f.path ? 'exists' : 'no path'
      })));
    }

    // Filter actual files (multer.any() stores files with filename property)
    const files = Array.isArray(req.files)
      ? req.files.filter(f => f.filename && f.path)
      : [];

    console.log(`[MODULE_UPLOAD] Filtered files count: ${files.length}`);

    if (!files || files.length === 0) {
      console.error('[MODULE_UPLOAD] No files in request');
      if (!Array.isArray(req.files)) {
        console.error('[MODULE_UPLOAD] req.files is not an array:', typeof req.files);
      }
      return res.status(400).json({ success: false, message: 'No files provided' });
    }

    // Extract folder name from request body or from first file's path
    let folderName = req.body?.folderName;
    console.log(`[MODULE_UPLOAD] folderName from body: ${folderName}`);

    if (!folderName) {
      const firstFilePath = files[0].originalname || files[0].filename;
      const folderNameFromPath = firstFilePath.split('/')[0] || 'Module';
      folderName = folderNameFromPath;
      console.log(`[MODULE_UPLOAD] folderName from file path: ${folderName}`);
    }

    const modulesDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'modules');
    const destPath = path.join(modulesDir, folderName);

    console.log(`[MODULE_UPLOAD] Starting folder upload: ${folderName}`);
    console.log(`[MODULE_UPLOAD] Files count: ${files.length}`);
    console.log(`[MODULE_UPLOAD] Destination: ${destPath}`);

    // Ensure modules directory exists
    await fs.mkdir(modulesDir, { recursive: true });

    // Backup existing folder
    if (fsSync.existsSync(destPath)) {
      const backupPath = destPath + '_backup_' + Date.now();
      console.log(`[MODULE_UPLOAD] Folder exists, backing up to ${backupPath}`);
      await fs.rename(destPath, backupPath);
    }

    // Create destination folder
    await fs.mkdir(destPath, { recursive: true });

    // Copy each file to its correct location
    const copyStartTime = Date.now();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Get the relative path from the file's original name (which includes the folder structure)
      let relativePath = file.originalname;

      // Remove folder name from path (first segment)
      const pathSegments = relativePath.split('/');
      if (pathSegments.length > 1 && pathSegments[0] === folderName) {
        pathSegments.shift();
      }
      relativePath = pathSegments.join('/');

      const destFilePath = path.join(destPath, relativePath);
      const destDir = path.dirname(destFilePath);

      console.log(`[MODULE_UPLOAD] Processing file ${i + 1}/${files.length}: ${file.originalname} -> ${relativePath}`);

      // Create subdirectories if needed
      await fs.mkdir(destDir, { recursive: true });

      // Copy file
      await fs.copyFile(file.path, destFilePath);
      console.log(`[MODULE_UPLOAD] Copied: ${relativePath}`);

      // Clean up temp file
      try {
        await fs.unlink(file.path);
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    console.log(`[MODULE_UPLOAD] Copy completed in ${Date.now() - copyStartTime}ms`);

    const totalTime = Date.now() - startTime;
    console.log(`[MODULE_UPLOAD] Total time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);

    res.json({
      success: true,
      message: `Module '${folderName}' uploaded successfully`,
      moduleName: folderName,
      path: destPath,
      filesCount: files.length
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`[MODULE_UPLOAD] Error after ${totalTime}ms:`, error.message);
    console.error(`[MODULE_UPLOAD] Error code:`, error.code);
    console.error(`[MODULE_UPLOAD] Error stack:`, error.stack);

    // Cleanup temp files
    try {
      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
          if (file && file.path) {
            try {
              await fs.unlink(file.path);
              console.log(`[MODULE_UPLOAD] Cleaned up: ${file.path}`);
            } catch (e) {
              // Ignore cleanup errors
            }
          }
        }
      }
    } catch (cleanupError) {
      console.warn(`[MODULE_UPLOAD] Cleanup warning: ${cleanupError.message}`);
    }

    // Only send response if headers not sent
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || 'Upload failed',
        code: error.code
      });
    }
  }
});

export default router;
