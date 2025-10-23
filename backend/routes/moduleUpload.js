import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for folder uploads (accepts any files)
const uploadMultiple = multer({
  dest: '/tmp/uploads/',
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB max per file
  fileFilter: (req, file, cb) => {
    // Accept all files in folder upload
    cb(null, true);
  }
});

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
router.post('/upload-folder', uploadMultiple.array('files', 1000), async (req, res) => {
  const startTime = Date.now();
  const uploadedFiles = new Map(); // Map to track files by path

  try {
    console.log(`[MODULE_UPLOAD] Upload folder endpoint hit`);

    if (!req.files || req.files.length === 0) {
      console.error('[MODULE_UPLOAD] No files in request');
      return res.status(400).json({ success: false, message: 'No files provided' });
    }

    const folderName = req.body.folderName || 'Module';
    const modulesDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'modules');
    const destPath = path.join(modulesDir, folderName);

    console.log(`[MODULE_UPLOAD] Starting folder upload: ${folderName}`);
    console.log(`[MODULE_UPLOAD] Files count: ${req.files.length}`);
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

    // Get paths array from request body (sent as array or comma-separated)
    const paths = Array.isArray(req.body.paths)
      ? req.body.paths
      : (typeof req.body.paths === 'string' ? [req.body.paths] : []);

    console.log(`[MODULE_UPLOAD] Paths array length: ${paths.length}`);

    // Copy each file to its correct location
    const copyStartTime = Date.now();
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      // Remove folder name from path (first segment)
      let relativePath = paths[i] || file.originalname;
      const pathSegments = relativePath.split('/');
      if (pathSegments[0] === folderName) {
        pathSegments.shift();
      }
      relativePath = pathSegments.join('/');

      const destFilePath = path.join(destPath, relativePath);
      const destDir = path.dirname(destFilePath);

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
      filesCount: req.files.length
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`[MODULE_UPLOAD] Error after ${totalTime}ms: ${error.message}`);
    console.error(`[MODULE_UPLOAD] Error stack:`, error.stack);

    // Cleanup temp files
    try {
      if (req.files) {
        for (const file of req.files) {
          try {
            await fs.unlink(file.path);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    } catch (cleanupError) {
      console.warn(`[MODULE_UPLOAD] Cleanup warning: ${cleanupError.message}`);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

export default router;
