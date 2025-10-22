import React from 'react';

/**
 * Maestro BQT Panel Component
 * Loads the Maestro BQT module directly from Builder.io
 * Project ID: b527866aab4c4c6fb8911b687982646a
 * Model: MaestroBQT
 */
export default function MaestroBQTPanel() {
  const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
  const embedUrl = `https://builder.io/embed/index.html?apiKey=${apiKey}&model=MaestroBQT&published=true`;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f172a',
        overflow: 'hidden',
      }}
    >
      <iframe
        src={embedUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
        }}
        title="MaestroBQT"
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
}
