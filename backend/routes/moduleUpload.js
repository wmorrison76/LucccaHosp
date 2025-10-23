import express from 'express';
import multer from 'multer';
import extract from 'extract-zip';
import path from 'path';
import fs from 'fs';
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

/**
 * POST /api/modules/upload
 * Upload and extract a module zip file
 * Body: form-data with 'zip' file
 * Returns: { success: bool, message: string, moduleName: string }
 */
router.post('/upload', upload.single('zip'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const zipPath = req.file.path;
    const modulesDir = path.join(process.cwd(), 'frontend', 'src', 'modules');
    const extractDir = path.join('/tmp', 'extract_' + Date.now());

    // Create extract directory
    fs.mkdirSync(extractDir, { recursive: true });

    // Extract zip
    await extract(zipPath, { dir: extractDir });

    // Find the module folder (first folder in extracted zip)
    const extractedItems = fs.readdirSync(extractDir);
    const moduleFolder = extractedItems.find(item => 
      fs.statSync(path.join(extractDir, item)).isDirectory()
    );

    if (!moduleFolder) {
      fs.rmSync(extractDir, { recursive: true });
      fs.unlinkSync(zipPath);
      return res.status(400).json({ success: false, message: 'No folder found in zip' });
    }

    const sourcePath = path.join(extractDir, moduleFolder);
    const destPath = path.join(modulesDir, moduleFolder);

    // Copy to modules directory
    if (fs.existsSync(destPath)) {
      // Backup existing
      const backupPath = destPath + '_backup_' + Date.now();
      fs.renameSync(destPath, backupPath);
    }

    fs.cpSync(sourcePath, destPath, { recursive: true });

    // Cleanup
    fs.rmSync(extractDir, { recursive: true });
    fs.unlinkSync(zipPath);

    res.json({
      success: true,
      message: `Module '${moduleFolder}' extracted successfully`,
      moduleName: moduleFolder,
      path: destPath
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;
