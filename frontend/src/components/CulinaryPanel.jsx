import React, { useEffect, useRef, useState } from 'react';

/**
 * Culinary Panel Component
 * Loads the Culinary content from Builder.io project 838ccacd172b4efca3e3a9a3f3b94aba
 * Repository: wmorrison76/Echo-20Recipe-20Pro
 * Uses BuilderContent component to load and render content
 */
const BuilderContent = React.lazy(async () => {
  return new Promise((resolve) => {
    // Load Builder.io script and get BuilderContent component
    const script = document.createElement('script');
    script.src = 'https://cdn.builder.io/js/react';
    script.async = true;

    const checkBuilderLoaded = () => {
      if (window.BuilderContent) {
        resolve({ default: window.BuilderContent });
      } else {
        setTimeout(checkBuilderLoaded, 100);
      }
    };

    script.onload = () => {
      console.log('[Culinary] Builder.io script loaded, waiting for BuilderContent...');
      checkBuilderLoaded();
    };

    script.onerror = () => {
      console.error('[Culinary] Failed to load Builder.io script');
      resolve({
        default: () => <div style={{ padding: '20px', color: '#f87171' }}>Failed to load Builder.io</div>
      });
    };

    if (!document.querySelector('script[src*="cdn.builder.io/js/react"]')) {
      document.head.appendChild(script);
    } else {
      checkBuilderLoaded();
    }
  });
});

export default function CulinaryPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[Culinary] Component mounted');
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';

  return (
    <div
      className="w-full h-full overflow-auto bg-gradient-to-br from-gray-900 to-gray-950"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Culinary Library
        </h2>

        {loadError && (
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Error loading Culinary</div>
            <div style={{ fontSize: '12px' }}>{loadError}</div>
          </div>
        )}

        {/* Builder.io Content Container */}
        <div style={{
          flex: 1,
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          overflow: 'auto',
        }}>
          <React.Suspense fallback={
            <div style={{
              padding: '24px',
              textAlign: 'center',
              opacity: 0.7,
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div>
                <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>Loading Culinary Library from Builder.io...</p>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(0, 217, 255, 0.2)',
                  borderTop: '3px solid rgba(0, 217, 255, 0.8)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto',
                }}>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          }>
            <BuilderContent
              model="Culinary"
              apiKey={apiKey}
              options={{
                includeRefs: true,
                enableTrackingPixel: false,
              }}
            />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
