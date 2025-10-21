import React from 'react';

export function StatusIndicator({ status = 'offline' }) {
  const statusColors = {
    online: '#22c55e',
    offline: '#ef4444',
    idle: '#eab308'
  };

  const color = statusColors[status] || statusColors.offline;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 4px ${color}`
        }}
      />
      <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>{status}</span>
    </div>
  );
}

export default StatusIndicator;
