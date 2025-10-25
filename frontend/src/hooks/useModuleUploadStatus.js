import { useState, useEffect } from 'react';

/**
 * Hook to track module upload status across components
 * Automatically clears status after upload completes
 */
export function useModuleUploadStatus() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  useEffect(() => {
    // Listen for upload start
    const handleUploadStart = (event) => {
      const { fileName } = event.detail;
      setIsUploading(true);
      setUploadFileName(fileName);
      setUploadMessage(`⏳ Uploading ${fileName}...`);
      console.log('[UPLOAD_HOOK] Upload started:', fileName);
    };

    // Listen for upload completion
    const handleUploadComplete = (event) => {
      const { success, moduleName, error } = event.detail;
      
      if (success) {
        setUploadMessage(`✅ ${moduleName} loaded!`);
        console.log('[UPLOAD_HOOK] Upload completed:', moduleName);
      } else {
        setUploadMessage(`❌ Upload failed: ${error}`);
        console.error('[UPLOAD_HOOK] Upload error:', error);
      }

      setIsUploading(false);

      // Auto-clear message after 5 seconds
      const timeoutId = setTimeout(() => {
        setUploadMessage('');
        setUploadFileName('');
      }, 5000);

      return () => clearTimeout(timeoutId);
    };

    window.addEventListener('module-upload-start', handleUploadStart);
    window.addEventListener('module-upload-complete', handleUploadComplete);

    return () => {
      window.removeEventListener('module-upload-start', handleUploadStart);
      window.removeEventListener('module-upload-complete', handleUploadComplete);
    };
  }, []);

  // Force clear after 30 minutes in case of hung state
  useEffect(() => {
    if (!isUploading) return;

    const hangTimeoutId = setTimeout(() => {
      console.warn('[UPLOAD_HOOK] Upload appears hung (30min timeout), clearing state');
      setIsUploading(false);
      setUploadMessage('⚠️ Upload appears stuck, cleared state');
      
      setTimeout(() => {
        setUploadMessage('');
        setUploadFileName('');
      }, 3000);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(hangTimeoutId);
  }, [isUploading]);

  return {
    isUploading,
    uploadMessage,
    uploadFileName
  };
}
