/**
 * Professional SaaS Theme System
 * Light and Dark modes with 5 color schemes
 * Design: Apple-style glass panels with outlines and shadows
 */

export type ThemeMode = 'light' | 'dark';
export type ColorScheme = 'cyan' | 'blue' | 'emerald' | 'violet' | 'rose';

interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;

  // Backgrounds
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    panel: string;
    panelHover: string;
  };

  // Text
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    invert: string;
  };

  // Borders
  border: {
    primary: string;
    secondary: string;
    focus: string;
  };

  // Shadows
  shadow: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Data visualization
  chart: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
  };
}

interface Theme {
  mode: ThemeMode;
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Light Mode Color Schemes
const lightCyan: ThemeColors = {
  primary: '#00a8cc',
  secondary: '#00d9ff',
  accent: '#00d9ff',

  bg: {
    primary: '#ffffff',
    secondary: '#f8fafb',
    tertiary: '#f0f4f8',
    panel: 'rgba(255, 255, 255, 0.8)',
    panelHover: 'rgba(255, 255, 255, 0.95)',
  },

  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    invert: '#ffffff',
  },

  border: {
    primary: 'rgba(0, 168, 204, 0.2)',
    secondary: 'rgba(0, 168, 204, 0.1)',
    focus: 'rgba(0, 217, 255, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(0, 168, 204, 0.15)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#00a8cc',
    color2: '#00d9ff',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const lightBlue: ThemeColors = {
  primary: '#0066cc',
  secondary: '#2563eb',
  accent: '#3b82f6',

  bg: {
    primary: '#ffffff',
    secondary: '#f8fafb',
    tertiary: '#f0f4f8',
    panel: 'rgba(255, 255, 255, 0.8)',
    panelHover: 'rgba(255, 255, 255, 0.95)',
  },

  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    invert: '#ffffff',
  },

  border: {
    primary: 'rgba(37, 99, 235, 0.2)',
    secondary: 'rgba(37, 99, 235, 0.1)',
    focus: 'rgba(59, 130, 246, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(37, 99, 235, 0.15)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#0066cc',
    color2: '#3b82f6',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const lightEmerald: ThemeColors = {
  primary: '#059669',
  secondary: '#10b981',
  accent: '#34d399',

  bg: {
    primary: '#ffffff',
    secondary: '#f8fafb',
    tertiary: '#f0f4f8',
    panel: 'rgba(255, 255, 255, 0.8)',
    panelHover: 'rgba(255, 255, 255, 0.95)',
  },

  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    invert: '#ffffff',
  },

  border: {
    primary: 'rgba(16, 185, 129, 0.2)',
    secondary: 'rgba(16, 185, 129, 0.1)',
    focus: 'rgba(52, 211, 153, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(16, 185, 129, 0.15)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#059669',
    color2: '#10b981',
    color3: '#34d399',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const lightViolet: ThemeColors = {
  primary: '#7c3aed',
  secondary: '#a78bfa',
  accent: '#c4b5fd',

  bg: {
    primary: '#ffffff',
    secondary: '#f8fafb',
    tertiary: '#f0f4f8',
    panel: 'rgba(255, 255, 255, 0.8)',
    panelHover: 'rgba(255, 255, 255, 0.95)',
  },

  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    invert: '#ffffff',
  },

  border: {
    primary: 'rgba(124, 58, 237, 0.2)',
    secondary: 'rgba(124, 58, 237, 0.1)',
    focus: 'rgba(167, 139, 250, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(124, 58, 237, 0.15)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#7c3aed',
    color2: '#a78bfa',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const lightRose: ThemeColors = {
  primary: '#e11d48',
  secondary: '#f43f5e',
  accent: '#fb7185',

  bg: {
    primary: '#ffffff',
    secondary: '#f8fafb',
    tertiary: '#f0f4f8',
    panel: 'rgba(255, 255, 255, 0.8)',
    panelHover: 'rgba(255, 255, 255, 0.95)',
  },

  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    invert: '#ffffff',
  },

  border: {
    primary: 'rgba(225, 29, 72, 0.2)',
    secondary: 'rgba(225, 29, 72, 0.1)',
    focus: 'rgba(244, 63, 94, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(225, 29, 72, 0.15)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#e11d48',
    color2: '#f43f5e',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

// Dark Mode Color Schemes
const darkCyan: ThemeColors = {
  primary: '#00d9ff',
  secondary: '#00a8cc',
  accent: '#00d9ff',

  bg: {
    primary: '#0a1628',
    secondary: '#0f2337',
    tertiary: '#1a3a52',
    panel: 'rgba(10, 22, 40, 0.7)',
    panelHover: 'rgba(15, 35, 55, 0.8)',
  },

  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#808080',
    invert: '#0a1628',
  },

  border: {
    primary: 'rgba(0, 217, 255, 0.2)',
    secondary: 'rgba(0, 217, 255, 0.1)',
    focus: 'rgba(0, 217, 255, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(0, 217, 255, 0.2)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#00d9ff',
    color2: '#00a8cc',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const darkBlue: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#1e40af',
  accent: '#60a5fa',

  bg: {
    primary: '#0a0e27',
    secondary: '#0f1535',
    tertiary: '#1a2747',
    panel: 'rgba(10, 14, 39, 0.7)',
    panelHover: 'rgba(15, 21, 53, 0.8)',
  },

  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#808080',
    invert: '#0a0e27',
  },

  border: {
    primary: 'rgba(59, 130, 246, 0.2)',
    secondary: 'rgba(59, 130, 246, 0.1)',
    focus: 'rgba(96, 165, 250, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(59, 130, 246, 0.2)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#3b82f6',
    color2: '#60a5fa',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const darkEmerald: ThemeColors = {
  primary: '#10b981',
  secondary: '#059669',
  accent: '#34d399',

  bg: {
    primary: '#051f15',
    secondary: '#0a2818',
    tertiary: '#164532',
    panel: 'rgba(5, 31, 21, 0.7)',
    panelHover: 'rgba(10, 40, 24, 0.8)',
  },

  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#808080',
    invert: '#051f15',
  },

  border: {
    primary: 'rgba(16, 185, 129, 0.2)',
    secondary: 'rgba(16, 185, 129, 0.1)',
    focus: 'rgba(52, 211, 153, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(16, 185, 129, 0.2)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#10b981',
    color2: '#34d399',
    color3: '#059669',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const darkViolet: ThemeColors = {
  primary: '#a78bfa',
  secondary: '#7c3aed',
  accent: '#c4b5fd',

  bg: {
    primary: '#1e1b4b',
    secondary: '#2d1b69',
    tertiary: '#42297a',
    panel: 'rgba(30, 27, 75, 0.7)',
    panelHover: 'rgba(45, 27, 105, 0.8)',
  },

  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#808080',
    invert: '#1e1b4b',
  },

  border: {
    primary: 'rgba(167, 139, 250, 0.2)',
    secondary: 'rgba(167, 139, 250, 0.1)',
    focus: 'rgba(196, 181, 253, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(167, 139, 250, 0.2)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#a78bfa',
    color2: '#c4b5fd',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

const darkRose: ThemeColors = {
  primary: '#fb7185',
  secondary: '#f43f5e',
  accent: '#ff6b9d',

  bg: {
    primary: '#1f0f15',
    secondary: '#3d1a26',
    tertiary: '#5a2a38',
    panel: 'rgba(31, 15, 21, 0.7)',
    panelHover: 'rgba(61, 26, 38, 0.8)',
  },

  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    tertiary: '#808080',
    invert: '#1f0f15',
  },

  border: {
    primary: 'rgba(251, 113, 133, 0.2)',
    secondary: 'rgba(251, 113, 133, 0.1)',
    focus: 'rgba(244, 63, 94, 0.5)',
  },

  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 30px rgba(251, 113, 133, 0.2)',
  },

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  chart: {
    color1: '#fb7185',
    color2: '#ff6b9d',
    color3: '#10b981',
    color4: '#f59e0b',
    color5: '#ef4444',
  },
};

// Get colors for specific mode and scheme
export function getThemeColors(mode: ThemeMode, scheme: ColorScheme): ThemeColors {
  if (mode === 'light') {
    switch (scheme) {
      case 'blue':
        return lightBlue;
      case 'emerald':
        return lightEmerald;
      case 'violet':
        return lightViolet;
      case 'rose':
        return lightRose;
      default:
        return lightCyan;
    }
  } else {
    switch (scheme) {
      case 'blue':
        return darkBlue;
      case 'emerald':
        return darkEmerald;
      case 'violet':
        return darkViolet;
      case 'rose':
        return darkRose;
      default:
        return darkCyan;
    }
  }
}

// Create full theme
export function createTheme(mode: ThemeMode, scheme: ColorScheme): Theme {
  return {
    mode,
    scheme,
    colors: getThemeColors(mode, scheme),
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
  };
}

// Export all color schemes for reference
export const colorSchemes: ColorScheme[] = ['cyan', 'blue', 'emerald', 'violet', 'rose'];
export const themeModes: ThemeMode[] = ['light', 'dark'];
