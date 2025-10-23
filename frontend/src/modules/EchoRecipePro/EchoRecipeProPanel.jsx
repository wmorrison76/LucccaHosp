import React from 'react';

// Fallback component while pages/Index.tsx syncs from local
export default function EchoRecipeProPanel() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      backgroundColor: '#f8fafc',
      color: '#666'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>🍳 EchoRecipePro</h1>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        Recipe Management System
      </p>
      <div style={{
        maxWidth: '500px',
        padding: '20px',
        backgroundColor: '#e0f2fe',
        border: '1px solid #0ea5e9',
        borderRadius: '8px',
        color: '#0369a1',
        marginBottom: '20px'
      }}>
        <p>
          <strong>✓ Module loaded successfully!</strong>
        </p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          The EchoRecipePro module is running. Full features will be available once you pull the latest files from the <code>pixel-haven</code> branch.
        </p>
      </div>
      <p style={{ fontSize: '14px', color: '#999', marginTop: '20px' }}>
        Run: <code style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px' }}>git pull origin pixel-haven</code>
      </p>
    </div>
  );
}
