import React, { useState } from 'react';

const THEMES = [
  'Nightfall',
  'Glasslight',
  'Neonwave',
  'High contrast',
  'Colorblind safe',
  'Aurora',
  'Obsidian',
  'Horizon',
  'Glacier',
  'Midnight Gold',
];

const SETTINGS_SECTIONS = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'accounts', label: 'Accounts', icon: '👤' },
  { id: 'advanced', label: 'Advanced', icon: '⚡' },
  { id: 'admin', label: 'Super Admin (ZARO)', icon: '🔐' },
];

export default function SettingsSuite() {
  const [activeSection, setActiveSection] = useState('appearance');
  const [selectedTheme, setSelectedTheme] = useState('Aurora');

  const renderAppearanceSection = () => (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedTheme === theme
                  ? 'border-2 border-cyan-400 bg-cyan-400/10 text-cyan-300'
                  : 'border border-gray-600 bg-gray-900/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Themes are starting points; tweak details on the right.
        </p>
      </div>

      {/* Panel Chrome Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Panel chrome</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Border width</label>
            <input type="number" defaultValue="8" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Border color</label>
            <input type="text" defaultValue="000000" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm font-mono" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Glow (shadow px)</label>
            <input type="number" defaultValue="24" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Header (title) size</label>
            <input type="number" defaultValue="25" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Typography</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Base size</label>
            <input type="text" defaultValue="14px" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Title size</label>
            <input type="number" defaultValue="25" className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-sm" />
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors">
        Reset theme tweaks
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'appearance':
        return renderAppearanceSection();
      case 'general':
        return <div className="text-gray-400">General settings coming soon</div>;
      case 'notifications':
        return <div className="text-gray-400">Notification settings coming soon</div>;
      case 'accounts':
        return <div className="text-gray-400">Account settings coming soon</div>;
      case 'advanced':
        return <div className="text-gray-400">Advanced settings coming soon</div>;
      case 'admin':
        return <div className="text-gray-400">Super Admin settings coming soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-white">
      {/* Left sidebar */}
      <div className="w-48 border-r border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        <nav className="space-y-2">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {renderSection()}
      </div>
    </div>
  );
}
