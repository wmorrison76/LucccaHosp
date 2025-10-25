import React, { useState, useRef, useEffect } from 'react';
import { Settings, Sun, Moon, ChevronDown, X } from 'lucide-react';
import { useThemeAndLanguageContext } from '../hooks/useThemeAndLanguage';
import { colorSchemes, themeModes } from '../theme/themeSystem';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';

export default function ProfessionalToolbar() {
  const { theme, themeMode, colorScheme, language, setThemeMode, setColorScheme, setLanguage, t } =
    useThemeAndLanguageContext();
  const colors = theme.colors;

  const [showSettings, setShowSettings] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const settingsRef = useRef(null);
  const languageRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('lu:toolbar:pos:v1') || '');
      return saved || { x: 60, y: 12 };
    } catch {
      return { x: 60, y: 12 };
    }
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setShowLanguage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Draggable toolbar
  const handleMouseDown = (e) => {
    // Only drag if clicking on the toolbar background, not on buttons or interactive elements
    if (e.target.closest('button') || e.target.closest('[role="button"]')) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Persist position to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lu:toolbar:pos:v1', JSON.stringify(position));
    } catch (e) {
      console.warn('Failed to save toolbar position:', e);
    }
  }, [position]);

  return (
    <div
      ref={toolbarRef}
      className="flex items-center justify-between h-14 px-6 border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.secondary,
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        right: 'auto',
        width: 'auto',
        zIndex: 1100,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        minWidth: '400px',
      }}
      onMouseDown={handleMouseDown}
    >

      {/* Right Side - Controls */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setShowLanguage(!showLanguage)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium"
            style={{
              color: colors.text.secondary,
              backgroundColor: colors.border.secondary,
              border: `1px solid ${colors.border.primary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.border.primary;
              e.currentTarget.style.color = colors.text.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.border.secondary;
              e.currentTarget.style.color = colors.text.secondary;
            }}
          >
            <span className="text-lg">{SUPPORTED_LANGUAGES[language].flag}</span>
            <ChevronDown size={14} className={`transition-transform ${showLanguage ? 'rotate-180' : ''}`} />
          </button>

          {showLanguage && (
            <div
              className="absolute top-full right-0 mt-2 rounded-lg shadow-lg overflow-hidden z-50"
              style={{
                backgroundColor: colors.bg.panel,
                border: `1px solid ${colors.border.primary}`,
                backdropFilter: 'blur(12px)',
                minWidth: '200px',
              }}
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setShowLanguage(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-sm font-medium text-left hover:brightness-110"
                  style={{
                    color: language === code ? colors.primary : colors.text.primary,
                    backgroundColor:
                      language === code ? `${colors.primary}15` : 'transparent',
                    borderBottom: `1px solid ${colors.border.secondary}`,
                  }}
                >
                  <span className="text-xl">{config.flag}</span>
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold">{config.nativeName}</span>
                    <span style={{ color: colors.text.secondary, fontSize: '12px' }}>
                      {config.name}
                    </span>
                  </div>
                  {language === code && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Settings Button - Opens Apple Settings-style Panel */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg transition-all"
            title={t.appearance}
            style={{
              color: colors.text.secondary,
              backgroundColor: colors.border.secondary,
              border: `1px solid ${colors.border.primary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.border.primary;
              e.currentTarget.style.color = colors.text.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.border.secondary;
              e.currentTarget.style.color = colors.text.secondary;
            }}
          >
            <Settings size={18} />
          </button>

          {showSettings && (
            <div
              className="absolute top-full right-0 mt-3 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: colors.bg.primary,
                border: `1px solid ${colors.border.primary}`,
                backdropFilter: 'blur(20px)',
                width: '400px',
              }}
            >
              {/* Settings Header */}
              <div
                className="px-6 py-4 flex items-center justify-between border-b"
                style={{
                  borderColor: colors.border.secondary,
                  background: `linear-gradient(135deg, ${colors.primary}15, ${colors.primary}05)`,
                }}
              >
                <h2 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                  ⚙️ {t.appearance || 'Settings'}
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded-lg transition-all hover:brightness-90"
                  style={{ color: colors.text.secondary }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Theme Mode Section */}
              <div className="px-6 py-4 border-b" style={{ borderColor: colors.border.secondary }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: colors.text.secondary }}>
                  {t.theme || 'Appearance'}
                </h3>
                <div className="flex gap-3">
                  {themeModes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setThemeMode(mode);
                        setShowSettings(false);
                      }}
                      className={`flex-1 px-4 py-3 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 ${
                        themeMode === mode ? 'ring-2 ring-offset-2' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: themeMode === mode ? colors.primary : colors.bg.secondary,
                        color: themeMode === mode ? '#fff' : colors.text.secondary,
                        ringColor: colors.primary,
                      }}
                    >
                      {mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                      <span>{mode === 'light' ? t.lightMode || 'Light' : t.darkMode || 'Dark'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme Section */}
              <div className="px-6 py-4 border-b" style={{ borderColor: colors.border.secondary }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: colors.text.secondary }}>
                  {t.colorScheme || 'Color Scheme'}
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {colorSchemes.map((scheme) => {
                    const schemeColors = {
                      cyan: '#00d9ff',
                      blue: '#3b82f6',
                      emerald: '#10b981',
                      violet: '#a78bfa',
                      rose: '#f43f5e',
                    };
                    return (
                      <button
                        key={scheme}
                        onClick={() => {
                          setColorScheme(scheme);
                          setShowSettings(false);
                        }}
                        className={`w-full h-12 rounded-lg transition-all transform ${
                          colorScheme === scheme ? 'scale-110 ring-2 ring-offset-2' : 'hover:scale-105'
                        }`}
                        style={{
                          backgroundColor: schemeColors[scheme],
                          boxShadow:
                            colorScheme === scheme
                              ? `0 0 16px ${schemeColors[scheme]}80, 0 4px 12px rgba(0,0,0,0.2)`
                              : '0 2px 8px rgba(0,0,0,0.1)',
                          ringColor: schemeColors[scheme],
                        }}
                        title={scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* About Settings */}
              <div className="px-6 py-4 text-xs" style={{ color: colors.text.secondary }}>
                <p>✨ {t.preferenceSaved || 'Preferences are saved automatically'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
