import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, ChefHat } from 'lucide-react';

/**
 * EchoRecipePro Panel
 * 
 * Loads the compiled EchoRecipePro React application from:
 * frontend/src/modules/EchoRecipe_Pro/index.html
 * 
 * This is served as an iframe to isolate the app's routing and state management.
 */
export default function EchoRecipeProPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate brief loading indicator
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    console.log('[EchoRecipeProPanel] Iframe loaded successfully');
    setIsLoading(false);
  };

  const handleIframeError = (e) => {
    console.error('[EchoRecipeProPanel] Iframe error:', e);
    setError('Could not load EchoRecipePro application');
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          flexShrink: 0,
        }}
      >
        <ChefHat
          size={20}
          style={{
            color: '#c41e3a',
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>
            EchoRecipePro
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
            Professional Recipe Management
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#fff',
        }}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(4px)',
              zIndex: 10,
              flexDirection: 'column',
              gap: '12px',
            }}
          >
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
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px',
              color: '#dc2626',
              backgroundColor: '#fef2f2',
            }}
          >
            <AlertCircle size={32} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                Application Error
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                {error}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  marginTop: '12px',
                  color: '#6b7280',
                  padding: '8px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                }}
              >
                Path: /modules/EchoRecipe_Pro/
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src="/modules/EchoRecipe_Pro/"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: error ? 'none' : 'block',
          }}
          title="EchoRecipePro Application"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-downloads"
          allow="camera; microphone; fullscreen"
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
