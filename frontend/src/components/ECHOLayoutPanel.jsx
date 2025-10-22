import React from 'react';

/**
 * ECHOLayout Panel Component
 * Loads the ECHOLayout module directly from Builder.io
 * Project ID: 2828c8b180b040c39012b30aca488fe6
 * Model: ECHOLayout
 */
export default function ECHOLayoutPanel() {
  const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
  const embedUrl = `https://builder.io/embed/index.html?apiKey=${apiKey}&model=ECHOLayout&published=true`;

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
        title="ECHOLayout"
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
}
