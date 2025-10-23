import React from 'react';

export default function EchoRecipeProPanel() {
  return (
    <div style={{
      padding: '24px',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'var(--bg-secondary, #f5f5f5)',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '12px',
          color: 'var(--text-primary, #333)',
        }}>
          🍳 Recipe Pro
        </div>
        <div style={{
          fontSize: '14px',
          color: 'var(--text-secondary, #666)',
          marginBottom: '24px',
        }}>
          The EchoRecipePro module is currently being loaded. Please check back in a moment.
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px',
          marginTop: '32px',
        }}>
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>Recipe Search</div>
          </div>
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📸</div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>Photos</div>
          </div>
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>➕</div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>Add Recipe</div>
          </div>
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            cursor: 'pointer',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚙️</div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>Production</div>
          </div>
        </div>
      </div>
    </div>
  );
}
