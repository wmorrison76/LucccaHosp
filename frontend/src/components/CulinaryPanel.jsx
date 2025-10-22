import React, { useEffect, useRef, useState } from 'react';

export default function CulinaryPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [builderReady, setBuilderReady] = useState(false);
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    console.log('[Culinary] Component mounted');
    
    if (scriptLoadedRef.current) {
      console.log('[Culinary] Builder.io script already loading');
      return;
    }

    scriptLoadedRef.current = true;

    // Check if Builder.io script is already loaded
    const existingScript = document.querySelector('script[src*="cdn.builder.io/js/react"]');
    if (existingScript && window.BuilderContent) {
      console.log('[Culinary] Builder.io already loaded');
      setBuilderReady(true);
      setIsLoading(false);
      return;
    }

    // Load Builder.io script
    const script = document.createElement('script');
    script.src = 'https://cdn.builder.io/js/react';
    script.async = true;
    script.crossOrigin = 'anonymous';

    const loadTimeout = setTimeout(() => {
      console.warn('[Culinary] Script load timeout after 5 seconds');
      setLoadError('Builder.io script load timeout. The CDN may be unavailable.');
      setIsLoading(false);
    }, 5000);

    script.onload = () => {
      clearTimeout(loadTimeout);
      console.log('[Culinary] Builder.io script loaded successfully');
      
      // Wait for BuilderContent to be available
      let checkAttempts = 0;
      const checkInterval = setInterval(() => {
        checkAttempts++;
        if (window.BuilderContent) {
          clearInterval(checkInterval);
          console.log('[Culinary] BuilderContent is available');
          setBuilderReady(true);
          setIsLoading(false);
        } else if (checkAttempts > 50) {
          clearInterval(checkInterval);
          console.warn('[Culinary] BuilderContent not available after waiting');
          setLoadError('Builder.io components did not load properly. Try refreshing the page.');
          setIsLoading(false);
        }
      }, 100);
    };

    script.onerror = (error) => {
      clearTimeout(loadTimeout);
      console.error('[Culinary] Failed to load Builder.io script:', error);
      setLoadError('Failed to load Builder.io script. Check your internet connection and CORS settings.');
      setIsLoading(false);
    };

    // Only append if not already present
    if (!existingScript) {
      document.head.appendChild(script);
      console.log('[Culinary] Builder.io script added to head');
    } else {
      console.log('[Culinary] Builder.io script already in head');
    }

    return () => {
      clearTimeout(loadTimeout);
    };
  }, []);

  // Render BuilderContent once it's available
  const renderContent = () => {
    if (loadError) {
      return (
        <div style={{
          padding: '24px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          color: '#fca5a5',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Error loading Culinary</div>
          <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{loadError}</div>
        </div>
      );
    }

    if (!builderReady || !window.BuilderContent) {
      return (
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
            <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>Loading Culinary Library...</p>
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
      );
    }

    // Render Builder.io content
    const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
    const BuilderContent = window.BuilderContent;

    return (
      <BuilderContent
        model="Culinary"
        apiKey={apiKey}
        entry="Culinary"
        options={{
          includeRefs: true,
          enableTrackingPixel: false,
        }}
      />
    );
  };

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

        {/* Builder.io Content Container */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
