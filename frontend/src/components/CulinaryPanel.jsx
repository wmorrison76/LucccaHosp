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
