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
 * POST /api/modules/upload
 * Upload and extract a module zip file
 * Body: form-data with 'zip' file
 * Returns: { success: bool, message: string, moduleName: string }
 */
router.post('/upload', upload.single('zip'), async (req, res) => {
  let zipPath = null;
  let extractDir = null;
  const startTime = Date.now();

  try {
    console.log(`[MODULE_UPLOAD] Upload endpoint hit - method: ${req.method}`);

    if (!req.file) {
      console.error('[MODULE_UPLOAD] No file in request');
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    zipPath = req.file.path;
    const modulesDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'modules');
    extractDir = path.join('/tmp', 'extract_' + Date.now());

    console.log(`[MODULE_UPLOAD] Starting upload: ${req.file.originalname} (${req.file.size} bytes) to ${modulesDir}`);

    // Create extract directory
    await fs.mkdir(extractDir, { recursive: true });
    console.log(`[MODULE_UPLOAD] Extract directory created: ${extractDir}`);

    // Extract zip with timeout
    console.log(`[MODULE_UPLOAD] Extracting zip to ${extractDir}...`);
    const extractStartTime = Date.now();
    await Promise.race([
      extract(zipPath, { dir: extractDir }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Extraction timeout (120s)')), 120000)
      )
    ]);
    console.log(`[MODULE_UPLOAD] Extraction completed in ${Date.now() - extractStartTime}ms`);

    // Find the module folder (first folder in extracted zip)
    console.log(`[MODULE_UPLOAD] Reading extracted directory...`);
    const extractedItems = await fs.readdir(extractDir);
    console.log(`[MODULE_UPLOAD] Extracted items: ${extractedItems.join(', ')}`);

    let moduleFolder = null;

    for (const item of extractedItems) {
      const itemPath = path.join(extractDir, item);
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        moduleFolder = item;
        break;
      }
    }

    if (!moduleFolder) {
      console.error(`[MODULE_UPLOAD] No folder found in extracted zip`);
      await fs.rm(extractDir, { recursive: true, force: true });
      await fs.unlink(zipPath);
      return res.status(400).json({ success: false, message: 'No folder found in zip' });
    }

    const sourcePath = path.join(extractDir, moduleFolder);
    const destPath = path.join(modulesDir, moduleFolder);

    console.log(`[MODULE_UPLOAD] Found module folder: ${moduleFolder}`);
    console.log(`[MODULE_UPLOAD] Source: ${sourcePath}`);
    console.log(`[MODULE_UPLOAD] Destination: ${destPath}`);

    // Ensure modules directory exists
    await fs.mkdir(modulesDir, { recursive: true });

    // Copy to modules directory
    if (fsSync.existsSync(destPath)) {
      // Backup existing
      const backupPath = destPath + '_backup_' + Date.now();
      console.log(`[MODULE_UPLOAD] Module exists, backing up to ${backupPath}`);
      await fs.rename(destPath, backupPath);
    }

    // Use async copy with timeout
    console.log(`[MODULE_UPLOAD] Starting copy operation...`);
    const copyStartTime = Date.now();
    await Promise.race([
      copyDir(sourcePath, destPath),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Copy timeout (300s)')), 300000)
      )
    ]);
    console.log(`[MODULE_UPLOAD] Copy completed in ${Date.now() - copyStartTime}ms`);

    // Cleanup
    console.log(`[MODULE_UPLOAD] Starting cleanup...`);
    try {
      if (extractDir) {
        await fs.rm(extractDir, { recursive: true, force: true });
      }
      if (zipPath) {
        await fs.unlink(zipPath);
      }
      console.log(`[MODULE_UPLOAD] Cleanup completed`);
    } catch (cleanupError) {
      console.warn(`[MODULE_UPLOAD] Cleanup warning: ${cleanupError.message}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`[MODULE_UPLOAD] Total time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);

    res.json({
      success: true,
      message: `Module '${moduleFolder}' extracted successfully`,
      moduleName: moduleFolder,
      path: destPath
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error(`[MODULE_UPLOAD] Error after ${totalTime}ms: ${error.message}`);
    console.error(`[MODULE_UPLOAD] Error stack:`, error.stack);

    // Cleanup on error
    try {
      if (extractDir) {
        await fs.rm(extractDir, { recursive: true, force: true });
      }
      if (zipPath) {
        await fs.unlink(zipPath);
      }
    } catch (cleanupError) {
      console.warn(`[MODULE_UPLOAD] Error cleanup warning: ${cleanupError.message}`);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

export default router;
