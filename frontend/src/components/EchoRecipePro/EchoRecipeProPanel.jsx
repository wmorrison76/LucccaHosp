import React from 'react';

/**
 * EchoRecipePro Component
 * Loads the EchoRecipePro module directly from Builder.io
 * Project ID: 838ccacd172b4efca3e3a9a3f3b94aba
 * Model: EchoRecipePro
 */
export default function EchoRecipeProPanel() {
  const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
  const embedUrl = `https://builder.io/embed/index.html?apiKey=${apiKey}&model=EchoRecipePro&published=true`;

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
        title="EchoRecipePro"
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
}
