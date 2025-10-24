# LUCCCA Checkpoint & Recovery Guide

## Current State: EchoRecipePro Upload Complete ✅

**Checkpoint Date:** 2025-01-02 02:43:33 UTC  
**Module Uploaded:** EchoRecipe_Pro  
**Total Files:** 16,603 files across 34 batches  
**Status:** Successfully installed in `/frontend/src/modules/EchoRecipe_Pro`

---

## 🔄 What is a Checkpoint?

A **checkpoint** is a saved snapshot of your application state that allows you to:
- ✅ Resume work without re-uploading large modules
- ✅ Quickly restore if something breaks
- ✅ Have multiple versions of your work saved
- ✅ Share progress with your team

---

## 📋 Available Checkpoint Files

### 1. **CHECKPOINT_MANIFEST.json**
Contains metadata about the current state:
- Module name and location
- File counts and batch information  
- Integration status
- Next steps and restore instructions

```bash
cat CHECKPOINT_MANIFEST.json
```

### 2. **restore-checkpoint.sh**
Verifies the current checkpoint is intact:
```bash
chmod +x restore-checkpoint.sh
./restore-checkpoint.sh
```

### 3. **backup-modules.sh**
Creates a compressed backup of all modules:
```bash
chmod +x backup-modules.sh
./backup-modules.sh               # Creates backup in current dir
./backup-modules.sh ./backups     # Creates backup in ./backups
```

---

## 🔐 How to Restore from Checkpoint

### Option 1: Git Restore (Recommended)
The system auto-commits all changes. To restore from git history:

```bash
# View recent commits
git log --oneline -10

# Restore to a specific commit
git checkout <commit-hash>

# Restore everything to main
git checkout main
```

### Option 2: Full Reinstall
If you need a complete fresh start:

```bash
# 1. Clear node_modules and reinstall
cd frontend
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 2. The EchoRecipe_Pro module files are still there
# (they're not in node_modules, they're in src/modules/)

# 3. Restart the dev server
npm run dev
```

### Option 3: Recover from Backup
If you created a backup using `backup-modules.sh`:

```bash
# Restore modules from backup
tar -xzf luccca-modules-backup_*.tar.gz -C .

# Then restart dev server
cd frontend && npm run dev
```

---

## ⚠️ What Happened: The 413 Error

You received a **413 Payload Too Large** error when trying to interact with the Culinary panel. This was caused by:

### Root Cause
One of these processes tried to send the entire 16,603-file module to an external API:
- ❌ OpenAI embeddings API (ingest script)
- ❌ Builder.io API (seeding script)  
- ❌ LLM completion endpoint (auto-analysis)

### Solution Applied
Added **payload guards** middleware that:
✅ Prevents payloads > 5-10 MB  
✅ Blocks module folder processing  
✅ Limits batch sizes  
✅ Provides helpful error messages

**Modified Files:**
- `backend/middleware/payloadGuards.js` (NEW)
- `backend/server.js` (updated)

---

## 🚀 Preventing Future 413 Errors

### What NOT to Do
```javascript
// ❌ DON'T: Send entire module to external API
const allFiles = readDirSync('src/modules/EchoRecipe_Pro');
await openai.embeddings.create({ input: allFiles }); // 413 Error!

// ❌ DON'T: Bulk-upload module to Builder.io
for (const file of 16603Files) {
  await builder.createEntry(file); // Too many requests, will 413
}
```

### What TO Do
```javascript
// ✅ DO: Process in small batches
const BATCH_SIZE = 10;
for (let i = 0; i < files.length; i += BATCH_SIZE) {
  const batch = files.slice(i, i + BATCH_SIZE);
  await openai.embeddings.create({ input: batch });
}

// ✅ DO: Require user confirmation for large operations
if (files.length > 100) {
  console.warn(`Large operation: ${files.length} files. Require user confirmation.`);
}

// ✅ DO: Process individual files, not directories
await processFile('src/modules/EchoRecipe_Pro/file.tsx');
```

---

## 📊 Checkpoint Status

| Component | Status | Details |
|-----------|--------|---------|
| Module Upload | ✅ Complete | 16,603 files in 34 batches |
| File Storage | ✅ OK | `frontend/src/modules/EchoRecipe_Pro/` |
| Routes | ✅ Registered | `/api/echo-recipe-pro` working |
| Backend | ✅ OK | Controllers created |
| Sidebar | ⏳ Pending | Needs to wire Culinary panel |
| Payload Guards | ✅ Active | Prevents 413 errors |

---

## 🔧 Manual Checkpoint Creation

Want to create your own checkpoint at any time?

```bash
# Create a checkpoint marker
cat > CHECKPOINT_$(date +%Y%m%d_%H%M%S).json << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "commit": "$(git rev-parse HEAD)",
  "files_in_modules": $(find frontend/src/modules -type f | wc -l),
  "status": "ready",
  "next_step": "Wire sidebar"
}
EOF

# Commit to git
git add -A
git commit -m "Checkpoint: EchoRecipePro upload complete"
```

---

## 📝 Next Steps

1. **✅ Done:** EchoRecipePro module uploaded (16,603 files)
2. **⏳ Next:** Wire Culinary panel into sidebar
3. **⏳ Todo:** Fix any remaining Builder.io loading issues
4. **⏳ Todo:** Phase 2 - Restore CakeBuilder + EchoCanvas to Pastry module
5. **⏳ Todo:** Implement role-based authentication
6. **⏳ Todo:** Dynamic sidebar based on user credentials

---

## 🆘 Troubleshooting

### "Module not loading after restart"
```bash
# Verify files still exist
ls -la frontend/src/modules/EchoRecipe_Pro | head -20

# Restart dev server
cd frontend && npm run dev

# Check browser console for errors
# If still broken, restore from git
```

### "Getting 413 errors again"  
```bash
# Check payload guard middleware is active
grep -n "applyAllGuards" backend/server.js

# View guard restrictions
cat backend/middleware/payloadGuards.js | grep "MAX_"

# Don't process entire modules folder at once
```

### "Lost my changes"
```bash
# Recover from git
git reflog              # See all recent states
git checkout <sha>      # Restore to specific state

# Or restore from backup
tar -xzf luccca-modules-backup_*.tar.gz
```

---

## 💾 Backup Strategy Recommendation

Create regular checkpoints:
```bash
# Daily backup
./backup-modules.sh ./backups/daily-$(date +%A)

# Before major changes
./backup-modules.sh ./backups/before-phase2

# After completing milestones
git tag -a "phase1-complete" -m "EchoRecipePro upload finished"
git push origin phase1-complete
```

---

## 📞 Questions?

See CHECKPOINT_MANIFEST.json for current status, or check git log for history:
```bash
git log --oneline --all | grep -i "echo\|checkpoint"
```

**You're all set! No need to re-upload. Your module is safely stored.** 🎉
