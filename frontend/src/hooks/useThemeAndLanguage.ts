import { useState, useEffect, useCallback } from 'react';
import { createTheme, colorSchemes, themeModes, type ThemeMode, type ColorScheme } from '../theme/themeSystem';
import { getTranslations, type Language, SUPPORTED_LANGUAGES } from '../i18n/translations';

const THEME_STORAGE_KEY = 'luccca:theme';
const LANGUAGE_STORAGE_KEY = 'luccca:language';

export interface UseThemeAndLanguageReturn {
  // Theme
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  theme: ReturnType<typeof createTheme>;
  setThemeMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslations>;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;

  // CSS Variables for easy theming
  getCSSVariables: () => Record<string, string>;
}

export function useThemeAndLanguage(): UseThemeAndLanguageReturn {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('cyan');
  const [language, setLanguageState] = useState<Language>('en');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        const { mode, scheme } = JSON.parse(savedTheme);
        if (themeModes.includes(mode)) setThemeModeState(mode);
        if (colorSchemes.includes(scheme)) setColorSchemeState(scheme);
      }

      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && Object.keys(SUPPORTED_LANGUAGES).includes(savedLanguage)) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Failed to load theme/language from localStorage:', error);
    }
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode, scheme: colorScheme }));
  }, [colorScheme]);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: themeMode, scheme }));
  }, [themeMode]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }, []);

  const theme = createTheme(themeMode, colorScheme);
  const t = getTranslations(language);

  const getCSSVariables = useCallback(() => {
    const c = theme.colors;
    return {
      '--color-primary': c.primary,
      '--color-secondary': c.secondary,
      '--color-accent': c.accent,
      '--bg-primary': c.bg.primary,
      '--bg-secondary': c.bg.secondary,
      '--bg-tertiary': c.bg.tertiary,
      '--bg-panel': c.bg.panel,
      '--text-primary': c.text.primary,
      '--text-secondary': c.text.secondary,
      '--border-primary': c.border.primary,
      '--border-secondary': c.border.secondary,
      '--shadow-sm': c.shadow.sm,
      '--shadow-md': c.shadow.md,
      '--shadow-lg': c.shadow.lg,
      '--shadow-glow': c.shadow.glow,
      '--success': c.success,
      '--warning': c.warning,
      '--error': c.error,
      '--info': c.info,
    };
  }, [theme]);

  return {
    themeMode,
    colorScheme,
    theme,
    setThemeMode,
    setColorScheme,
    language,
    setLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES,
    getCSSVariables,
  };
}

// Context provider for app-wide theme/language access
import React, { createContext, useContext, ReactNode } from 'react';

type ThemeAndLanguageContextType = UseThemeAndLanguageReturn | null;

const ThemeAndLanguageContext = createContext<ThemeAndLanguageContextType>(null);

export function ThemeAndLanguageProvider({ children }: { children: ReactNode }) {
  const themeAndLanguage = useThemeAndLanguage();

  return (
    <ThemeAndLanguageContext.Provider value={themeAndLanguage}>
      {children}
    </ThemeAndLanguageContext.Provider>
  );
}

export function useThemeAndLanguageContext() {
  const context = useContext(ThemeAndLanguageContext);
  if (!context) {
    throw new Error('useThemeAndLanguageContext must be used within ThemeAndLanguageProvider');
  }
  return context;
}