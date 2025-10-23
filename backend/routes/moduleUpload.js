import express from 'express';
import multer from 'multer';
import extract from 'extract-zip';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: '/tmp/uploads/',
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/zip') {
      cb(null, true);
    } else {
      cb(new Error('Only zip files allowed'));
    }
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

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    zipPath = req.file.path;
    const modulesDir = path.join(process.cwd(), 'frontend', 'src', 'modules');
    extractDir = path.join('/tmp', 'extract_' + Date.now());

    console.log(`[MODULE_UPLOAD] Starting upload: ${req.file.originalname} (${req.file.size} bytes)`);

    // Create extract directory
    await fs.mkdir(extractDir, { recursive: true });

    // Extract zip with timeout
    console.log(`[MODULE_UPLOAD] Extracting zip to ${extractDir}...`);
    await Promise.race([
      extract(zipPath, { dir: extractDir }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Extraction timeout (30s)')), 30000)
      )
    ]);

    // Find the module folder (first folder in extracted zip)
    const extractedItems = await fs.readdir(extractDir);
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
      await fs.rm(extractDir, { recursive: true, force: true });
      await fs.unlink(zipPath);
      return res.status(400).json({ success: false, message: 'No folder found in zip' });
    }

    const sourcePath = path.join(extractDir, moduleFolder);
    const destPath = path.join(modulesDir, moduleFolder);

    console.log(`[MODULE_UPLOAD] Found module folder: ${moduleFolder}`);
    console.log(`[MODULE_UPLOAD] Copying to ${destPath}...`);

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
    await Promise.race([
      copyDir(sourcePath, destPath),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Copy timeout (60s)')), 60000)
      )
    ]);

    console.log(`[MODULE_UPLOAD] Copy completed successfully`);

    // Cleanup
    try {
      await fs.rm(extractDir, { recursive: true, force: true });
      await fs.unlink(zipPath);
      console.log(`[MODULE_UPLOAD] Cleanup completed`);
    } catch (cleanupError) {
      console.warn(`[MODULE_UPLOAD] Cleanup warning: ${cleanupError.message}`);
    }

    res.json({
      success: true,
      message: `Module '${moduleFolder}' extracted successfully`,
      moduleName: moduleFolder,
      path: destPath
    });
  } catch (error) {
    console.error('[MODULE_UPLOAD] Error:', error.message);

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
