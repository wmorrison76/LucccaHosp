import React, { useEffect, useRef, useState } from 'react';

/**
 * EchoAurum Panel Component
 * Loads the EchoAurum component from Builder.io project d6d074d541fb46f8982b43968d076dea
 * Renders into a floating panel with full EchoAurum functionality
 */
export default function EchoAurumPanel() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[EchoAurum] Component mounted');
    setIsLoading(true);
    
    try {
      if (!window.builderContentLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.builder.io/js/react';
        script.async = true;
        script.onload = () => {
          console.log('[EchoAurum] Builder.io script loaded');
          window.builderContentLoaded = true;
          renderEchoAurum();
        };
        script.onerror = (err) => {
          console.error('[EchoAurum] Failed to load Builder.io script:', err);
          setLoadError('Failed to load Builder.io script');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } else {
        console.log('[EchoAurum] Builder.io script already loaded');
        renderEchoAurum();
      }
    } catch (err) {
      console.error('[EchoAurum] Error in useEffect:', err);
      setLoadError(err.message);
      setIsLoading(false);
    }
  }, []);

  const renderEchoAurum = () => {
    try {
      console.log('[EchoAurum] renderEchoAurum called');

      const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
      const projectId = 'd6d074d541fb46f8982b43968d076dea';
      const modelName = 'EchoAurum';

      const container = document.getElementById('builder-echoaurum-container');
      if (!container) {
        console.warn('[EchoAurum] Container element not found');
        setLoadError('Container element not found');
        setIsLoading(false);
        return;
      }

      if (window.BuilderContent) {
        console.log(`[EchoAurum] Rendering with Builder.io - Project: ${projectId}`);
        const { BuilderContent } = window;

        try {
          const element = React.createElement(BuilderContent, {
            model: modelName,
            content: null,
            apiKey: apiKey,
            entry: modelName,
            options: {
              includeRefs: true,
              enableTrackingPixel: false,
            },
            onError: (err) => {
              console.error('[EchoAurum] BuilderContent error:', err);
              setLoadError('Failed to load Builder.io content');
            },
            onLoad: () => {
              console.log('[EchoAurum] BuilderContent loaded successfully');
              setIsLoading(false);
            }
          });

          if (window.ReactDOM) {
            window.ReactDOM.render(element, container);
          } else {
            console.warn('[EchoAurum] ReactDOM not available');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('[EchoAurum] Error rendering BuilderContent:', err);
          setLoadError(err.message);
          setIsLoading(false);
        }
      } else {
        console.log('[EchoAurum] BuilderContent not yet available, will retry');
        setTimeout(() => renderEchoAurum(), 500);
      }
    } catch (err) {
      console.error('[EchoAurum] Error in renderEchoAurum:', err);
      setLoadError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
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
          EchoAurum
        </h2>
        
        {loadError && (
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Error loading EchoAurum</div>
            <div style={{ fontSize: '12px' }}>{loadError}</div>
          </div>
        )}
        
        <div style={{
          flex: 1,
          padding: '24px',
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}>
          <div style={{ textAlign: 'center', opacity: 0.7 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '600px',
            }}>
              {[
                { icon: '🎵', label: 'Audio' },
                { icon: '🔊', label: 'Mixing' },
                { icon: '🎚️', label: 'Equalizer' },
                { icon: '✨', label: 'Effects' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '8px',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.5)';
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{feature.icon}</div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{feature.label}</div>
                </div>
              ))}
            </div>
            
            <p style={{ margin: '24px 0 8px 0', fontSize: '14px' }}>
              {isLoading ? 'Loading EchoAurum from Builder.io...' : 'EchoAurum ready'}
            </p>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>
              Project: d6d074d541fb46f8982b43968d076dea
            </p>
          </div>
        </div>
        
        <div id="builder-echoaurum-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
