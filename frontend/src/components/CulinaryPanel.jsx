import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Culinary Panel Component
 * Loads the Culinary content from Builder.io project 838ccacd172b4efca3e3a9a3f3b94aba
 * Repository: wmorrison76/Echo-20Recipe-20Pro
 * Renders into a floating panel with full culinary functionality
 */
export default function CulinaryPanel() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[Culinary] Component mounted');
    setIsLoading(true);

    try {
      if (!window.builderContentLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.builder.io/js/react';
        script.async = true;

        const timeout = setTimeout(() => {
          if (!window.builderContentLoaded) {
            console.warn('[Culinary] Script load timeout');
            setLoadError('Builder.io script load timeout - CDN may be unavailable');
            setIsLoading(false);
          }
        }, 10000);

        script.onload = () => {
          clearTimeout(timeout);
          console.log('[Culinary] Builder.io script loaded');
          window.builderContentLoaded = true;
          renderCulinary();
        };

        script.onerror = (event) => {
          clearTimeout(timeout);
          const errorMessage = event instanceof Event
            ? `Failed to load script from ${script.src}`
            : String(event);
          console.error('[Culinary] Failed to load Builder.io script:', errorMessage);
          setLoadError(errorMessage);
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } else {
        console.log('[Culinary] Builder.io script already loaded');
        renderCulinary();
      }
    } catch (err) {
      console.error('[Culinary] Error in useEffect:', err);
      setLoadError(err.message);
      setIsLoading(false);
    }
  }, []);

  const renderCulinary = () => {
    try {
      console.log('[Culinary] renderCulinary called');

      const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
      const projectId = '838ccacd172b4efca3e3a9a3f3b94aba';
      const modelName = 'Culinary';

      const container = document.getElementById('builder-culinary-container');
      if (!container) {
        console.warn('[Culinary] Container element not found');
        setLoadError('Container element not found');
        setIsLoading(false);
        return;
      }

      if (window.BuilderContent) {
        console.log(`[Culinary] Rendering with Builder.io - Project: ${projectId}`);
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
              console.error('[Culinary] BuilderContent error:', err);
              setLoadError('Failed to load Builder.io content');
            },
            onLoad: () => {
              console.log('[Culinary] BuilderContent loaded successfully');
              setIsLoading(false);
            }
          });

          if (window.ReactDOM) {
            window.ReactDOM.render(element, container);
          } else {
            console.warn('[Culinary] ReactDOM not available');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('[Culinary] Error rendering BuilderContent:', err);
          setLoadError(err.message);
          setIsLoading(false);
        }
      } else {
        console.log('[Culinary] BuilderContent not yet available, will retry');
        setTimeout(() => renderCulinary(), 500);
      }
    } catch (err) {
      console.error('[Culinary] Error in renderCulinary:', err);
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
                { icon: '🍽️', label: 'Recipes' },
                { icon: '👨‍🍳', label: 'Techniques' },
                { icon: '🌶️', label: 'Ingredients' },
                { icon: '📋', label: 'Menu Planning' },
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
              {isLoading ? 'Loading Culinary from Builder.io...' : 'Culinary ready'}
            </p>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>
              Project: 838ccacd172b4efca3e3a9a3f3b94aba
            </p>
          </div>
        </div>
        
        <div id="builder-culinary-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
