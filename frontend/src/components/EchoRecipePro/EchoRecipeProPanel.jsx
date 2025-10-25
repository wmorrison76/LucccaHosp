import React, { Suspense } from 'react';
import { Loader, AlertCircle } from 'lucide-react';

/**
 * EchoRecipePro Panel
 * 
 * Loads the EchoRecipePro React app from:
 * frontend/src/modules/EchoRecipe_Pro/App.tsx
 * 
 * This is a full-featured recipe management application with:
 * - Recipe search and management
 * - Photo uploads
 * - Production tracking
 * - Collaboration features
 * - Auth and protected routes
 */

// Dynamically import the real app to avoid bundle conflicts
const EchoRecipeProApp = React.lazy(() =>
  import('../../modules/EchoRecipe_Pro/App.tsx').catch(err => {
    console.error('[EchoRecipeProPanel] Failed to import App:', err);
    return {
      default: () => (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          color: '#dc2626',
        }}>
          <AlertCircle size={32} style={{ margin: '0 auto 12px' }} />
          <div>Failed to load EchoRecipePro app</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
            {err.message}
          </div>
        </div>
      ),
    };
  })
);

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: '#f5f5f5',
      gap: '12px',
    }}>
      <Loader
        size={28}
        style={{
          animation: 'spin 1s linear infinite',
          color: '#c41e3a',
        }}
      />
      <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
        Loading EchoRecipePro...
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function EchoRecipeProPanel() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <EchoRecipeProApp />
      </Suspense>
    </div>
  );
}
