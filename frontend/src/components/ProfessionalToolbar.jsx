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

        {/* Appearance Selector */}
        <div className="relative" ref={appearanceRef}>
          <button
            onClick={() => setShowAppearance(!showAppearance)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
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
            title={t.appearance}
          >
            <Settings size={16} />
            <ChevronDown size={14} className={`transition-transform ${showAppearance ? 'rotate-180' : ''}`} />
          </button>

          {showAppearance && (
            <div
              className="absolute top-full right-0 mt-2 rounded-lg shadow-lg overflow-hidden z-50"
              style={{
                backgroundColor: colors.bg.panel,
                border: `1px solid ${colors.border.primary}`,
                backdropFilter: 'blur(12px)',
                minWidth: '280px',
              }}
            >
              {/* Theme Mode Section */}
              <div className="px-4 py-3 border-b" style={{ borderColor: colors.border.secondary }}>
                <p className="text-xs font-semibold uppercase" style={{ color: colors.text.secondary }}>
                  {t.theme}
                </p>
                <div className="flex gap-2 mt-2">
                  {themeModes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setThemeMode(mode);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-sm font-medium"
                      style={{
                        color: themeMode === mode ? colors.text.invert : colors.text.secondary,
                        backgroundColor:
                          themeMode === mode ? colors.primary : colors.border.secondary,
                        border:
                          themeMode === mode ? `1px solid ${colors.primary}` : `1px solid ${colors.border.primary}`,
                      }}
                    >
                      {mode === 'light' ? <Sun size={14} /> : <Moon size={14} />}
                      <span>
                        {mode === 'light' ? t.lightMode : t.darkMode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme Section */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold uppercase" style={{ color: colors.text.secondary }}>
                  {t.appearance}
                </p>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {colorSchemes.map((scheme) => {
                    const schemeColor =
                      scheme === 'cyan'
                        ? '#00a8cc'
                        : scheme === 'blue'
                          ? '#3b82f6'
                          : scheme === 'emerald'
                            ? '#10b981'
                            : scheme === 'violet'
                              ? '#a78bfa'
                              : '#f43f5e';

                    return (
                      <button
                        key={scheme}
                        onClick={() => setColorScheme(scheme)}
                        className="w-full aspect-square rounded-lg transition-all"
                        style={{
                          backgroundColor: schemeColor,
                          boxShadow:
                            colorScheme === scheme
                              ? `0 0 0 2px ${colors.bg.panel}, 0 0 0 4px ${schemeColor}`
                              : `0 0 0 1px ${colors.border.primary}`,
                        }}
                        title={scheme}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
