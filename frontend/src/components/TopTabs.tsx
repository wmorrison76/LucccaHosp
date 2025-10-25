import React from 'react';

interface TopTabsProps {
  tabs: Array<{ id: string; label: string }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function TopTabs({ tabs, activeTab = tabs[0]?.id, onTabChange }: TopTabsProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '20px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === tab.id ? '600' : '500',
            color: activeTab === tab.id ? '#3b82f6' : '#666',
            fontSize: '14px'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
