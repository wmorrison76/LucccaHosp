import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * ECHOLayout Panel Component
 * Loads the ECHOLayout component from Builder.io project 2828c8b180b040c39012b30aca488fe6
 * Renders into a floating panel with full ECHOLayout functionality
 */
export default function ECHOLayoutPanel() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[ECHOLayout] Component mounted');
    setIsLoading(true);
    
    try {
      if (!window.builderContentLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.builder.io/js/react';
        script.async = true;
        script.onload = () => {
          console.log('[ECHOLayout] Builder.io script loaded');
          window.builderContentLoaded = true;
          renderECHOLayout();
        };
        script.onerror = (err) => {
          console.error('[ECHOLayout] Failed to load Builder.io script:', err);
          setLoadError('Failed to load Builder.io script');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } else {
        console.log('[ECHOLayout] Builder.io script already loaded');
        renderECHOLayout();
      }
    } catch (err) {
      console.error('[ECHOLayout] Error in useEffect:', err);
      setLoadError(err.message);
      setIsLoading(false);
    }
  }, []);

  const renderECHOLayout = () => {
    try {
      console.log('[ECHOLayout] renderECHOLayout called');

      const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
      const projectId = '2828c8b180b040c39012b30aca488fe6';
      const modelName = 'ECHOLayout';

      const container = document.getElementById('builder-echolayout-container');
      if (!container) {
        console.warn('[ECHOLayout] Container element not found');
        setLoadError('Container element not found');
        setIsLoading(false);
        return;
      }

      if (window.BuilderContent) {
        console.log(`[ECHOLayout] Rendering with Builder.io - Project: ${projectId}`);
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
              console.error('[ECHOLayout] BuilderContent error:', err);
              setLoadError('Failed to load Builder.io content');
            },
            onLoad: () => {
              console.log('[ECHOLayout] BuilderContent loaded successfully');
              setIsLoading(false);
            }
          });

          if (window.ReactDOM) {
            window.ReactDOM.render(element, container);
          } else {
            console.warn('[ECHOLayout] ReactDOM not available');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('[ECHOLayout] Error rendering BuilderContent:', err);
          setLoadError(err.message);
          setIsLoading(false);
        }
      } else {
        console.log('[ECHOLayout] BuilderContent not yet available, will retry');
        setTimeout(() => renderECHOLayout(), 500);
      }
    } catch (err) {
      console.error('[ECHOLayout] Error in renderECHOLayout:', err);
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
          ECHOLayout
        </h2>
        
        {loadError && (
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Error loading ECHOLayout</div>
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
                { icon: '🎨', label: 'Design' },
                { icon: '📐', label: 'Layout' },
                { icon: '🎯', label: 'Alignment' },
                { icon: '🔀', label: 'Components' },
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
              {isLoading ? 'Loading ECHOLayout from Builder.io...' : 'ECHOLayout ready'}
            </p>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>
              Project: 2828c8b180b040c39012b30aca488fe6
            </p>
          </div>
        </div>
        
        <div id="builder-echolayout-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
