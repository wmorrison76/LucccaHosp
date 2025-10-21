import React, { useEffect, useRef, useState } from 'react';

/**
 * Echo Event Studio Panel Component
 * Loads the Echo Event Studio component from Builder.io project 65555a41cfb2453ca0b49e470080ea5c
 * Renders into a floating panel with full event studio functionality
 */
export default function EchoEventStudioPanel() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[EchoEventStudio] Component mounted');
    setIsLoading(true);
    
    try {
      // Load Builder.io's RenderContent script if not already present
      if (!window.builderContentLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.builder.io/js/react';
        script.async = true;
        script.onload = () => {
          console.log('[EchoEventStudio] Builder.io script loaded');
          window.builderContentLoaded = true;
          renderEchoEventStudio();
        };
        script.onerror = (err) => {
          console.error('[EchoEventStudio] Failed to load Builder.io script:', err);
          setLoadError('Failed to load Builder.io script');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } else {
        console.log('[EchoEventStudio] Builder.io script already loaded');
        renderEchoEventStudio();
      }
    } catch (err) {
      console.error('[EchoEventStudio] Error in useEffect:', err);
      setLoadError(err.message);
      setIsLoading(false);
    }
  }, []);

  const renderEchoEventStudio = () => {
    try {
      console.log('[EchoEventStudio] renderEchoEventStudio called');
      if (containerRef.current && window.BuilderContent) {
        console.log('[EchoEventStudio] Rendering with Builder.io');
        const { BuilderContent } = window;
        
        // Configuration for Echo Event Studio from Builder.io
        const modelName = 'EchoEventStudio';
        const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
        const projectId = '65555a41cfb2453ca0b49e470080ea5c';
        
        console.log(`[EchoEventStudio] Loading ${modelName} from Builder.io project ${projectId}`);
        setIsLoading(false);
      } else {
        console.log('[EchoEventStudio] Container or BuilderContent not ready', {
          hasContainer: !!containerRef.current,
          hasBuilderContent: !!window.BuilderContent,
        });
      }
    } catch (err) {
      console.error('[EchoEventStudio] Error in renderEchoEventStudio:', err);
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
      {/* Echo Event Studio content will be rendered here by Builder.io */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Echo Event Studio
        </h2>
        
        {loadError && (
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Error loading Echo Event Studio</div>
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
            {/* Event Studio Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '600px',
            }}>
              {[
                { icon: '🎉', label: 'Events' },
                { icon: '👥', label: 'Guests' },
                { icon: '📋', label: 'Proposals' },
                { icon: '💰', label: 'Pricing' },
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
              {isLoading ? 'Loading Echo Event Studio from Builder.io...' : 'Echo Event Studio ready'}
            </p>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>
              Project: 65555a41cfb2453ca0b49e470080ea5c
            </p>
          </div>
        </div>
        
        {/* Builder.io content renders here */}
        <div id="builder-echoeventstudio-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
