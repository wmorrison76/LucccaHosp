import React from 'react';

/**
 * EchoAurum Panel Component
 * Loads the EchoAurum module directly from Builder.io
 * Project ID: d6d074d541fb46f8982b43968d076dea
 * Model: EchoAurum
 */
export default function EchoAurumPanel() {
  const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
  const embedUrl = `https://builder.io/embed/index.html?apiKey=${apiKey}&model=EchoAurum&published=true`;

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
        title="EchoAurum"
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
}
