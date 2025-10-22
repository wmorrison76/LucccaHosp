import React from 'react';

/**
 * EchoRecipePro Component
 * Placeholder UI for EchoRecipePro module
 * Project ID: 838ccacd172b4efca3e3a9a3f3b94aba
 */
export default function EchoRecipeProPanel() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        flexShrink: 0,
      }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
          EchoRecipePro
        </h2>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {[
          { icon: '🔍', title: 'Recipe Search', desc: 'Search and filter recipes' },
          { icon: '📸', title: 'Photos', desc: 'Recipe photos and images' },
          { icon: '➕', title: 'Add Recipe', desc: 'Create new recipes' },
          { icon: '🏭', title: 'Production', desc: 'Production management' },
          { icon: '👨‍🍳', title: 'Techniques', desc: 'Cooking techniques' },
          { icon: '🌶️', title: 'Ingredients', desc: 'Ingredient library' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '8px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#00d9ff' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(148, 163, 184, 0.2)',
        fontSize: '11px',
        opacity: 0.6,
        flexShrink: 0,
      }}>
        EchoRecipePro Module • Connected to Builder.io
      </div>
    </div>
  );
}
