import React, { useEffect, useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';

/**
 * EchoRecipePro Panel - Wrapper for Bundled App
 * Loads the compiled EchoRecipePro application that was built on Builder.io
 * 
 * Location of bundled app: frontend/src/modules/EchoRecipe_Pro/
 * Entry point: index.html with Vite assets (main.js, styles)
 */
export default function EchoRecipeProPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading time for bundled app initialization
    // The iframe loads asynchronously
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '20px' }}>🍳</span>
        <span style={{ fontWeight: 600, fontSize: '16px', color: '#333' }}>
          EchoRecipePro - Culinary Management
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: '#666',
          }}
        >
          <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading EchoRecipePro...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px',
            color: '#d32f2f',
          }}
        >
          <AlertCircle size={32} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 600 }}>Failed to load EchoRecipePro</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{error}</div>
          </div>
        </div>
      )}

      {/* Embedded App via Iframe */}
      {!isLoading && !error && (
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <iframe
            src="/src/modules/EchoRecipe_Pro/index.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '0 0 8px 8px',
            }}
            title="EchoRecipePro Application"
            onError={() => {
              setError('Could not load the EchoRecipePro application. Check that the app is properly built.');
              setIsLoading(false);
            }}
            onLoad={() => {
              console.log('[EchoRecipeProPanel] App loaded successfully');
            }}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-downloads"
          />
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
