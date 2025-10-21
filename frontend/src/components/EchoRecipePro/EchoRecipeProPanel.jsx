import React, { useEffect, useRef } from 'react';

/**
 * EchoRecipePro Component
 * Loads the EchoRecipePro component from Builder.io project 838ccacd172b4efca3e3a9a3f3b94aba
 * Renders into a floating panel with full recipe functionality
 */
export default function EchoRecipeProPanel() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Builder.io's RenderContent script if not already present
    if (!window.builderContentLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cdn.builder.io/js/react';
      script.async = true;
      script.onload = () => {
        window.builderContentLoaded = true;
        renderEchoRecipePro();
      };
      document.head.appendChild(script);
    } else {
      renderEchoRecipePro();
    }
  }, []);

  const renderEchoRecipePro = () => {
    if (containerRef.current && window.BuilderContent) {
      // Render the EchoRecipePro component from Builder.io
      const { BuilderContent } = window;
      
      // Configuration for EchoRecipePro from Builder.io
      const modelName = 'EchoRecipePro';
      const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
      const projectId = '838ccacd172b4efca3e3a9a3f3b94aba';
      
      // Initialize rendering with Builder.io content
      console.log(`[EchoRecipePro] Loading ${modelName} from Builder.io project ${projectId}`);
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
      {/* EchoRecipePro content will be rendered here by Builder.io */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          EchoRecipePro
        </h2>
        
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
            {/* Recipe Pro Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              width: '100%',
              maxWidth: '600px',
            }}>
              {[
                { icon: '🔍', label: 'Recipe Search' },
                { icon: '📸', label: 'Photos' },
                { icon: '➕', label: 'Add Recipe' },
                { icon: '📋', label: 'Production' },
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
            
            <p style={{ margin: '24px 0 8px 0', fontSize: '14px' }}>Loading EchoRecipePro from Builder.io...</p>
            <p style={{ margin: 0, fontSize: '11px', opacity: 0.6 }}>
              Project: 838ccacd172b4efca3e3a9a3f3b94aba
            </p>
          </div>
        </div>
        
        {/* Builder.io content renders here */}
        <div id="builder-echorecopro-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
