import React from 'react';

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
          The EchoRecipePro module is running. To see the full interface:
        </p>
        <ol style={{ fontSize: '14px', marginTop: '10px', textAlign: 'left' }}>
          <li>On your Mac, run: <code style={{ backgroundColor: '#fff', padding: '2px 4px' }}>cd /Users/cami/Desktop/LUCCCA && git add frontend/src/modules/EchoRecipePro/ && git commit -m "Push EchoRecipePro files" && git push origin pixel-haven</code></li>
          <li>Then refresh this page</li>
        </ol>
      </div>
    </div>
  );
}
