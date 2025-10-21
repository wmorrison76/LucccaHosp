# SaaS UI/UX Styling Guide

## Overview

The application now features a professional, modern SaaS design with two distinct themes:
- **Light Mode**: Polished Apple-style glass morphism with clean drop shadows
- **Dark Mode**: TRON neon futuristic aesthetic with glowing neon effects

## Theme Architecture

### File Structure
```
frontend/src/
├── styles/
│   ├── modern-theme.css      (New: Core theme variables & utilities)
│   └── theme-base.css         (Existing: Base theme tokens)
├── global.css                 (Updated: Component styling with theme support)
├── index.css                  (Updated: Imports modern-theme.css)
└── components/
    └── Sidebar.jsx            (Updated: Collapse behavior & responsive sizing)
```

## Sidebar Behavior

### Dimensions
- **Expanded Width**: 425px
- **Collapsed Width**: 45px (icons only)
- **Icon Size**: 45px × 45px (always visible)
- **Transition**: 300ms smooth animation

### Functionality
- Icons remain visible and centered when sidebar is collapsed
- Labels fade in/out during expand/collapse transitions
- Auto-collapse mechanism with smooth animations
- Touch-friendly tap targets on mobile

### Key CSS Classes
```css
.sb-menu-item     /* Sidebar menu item */
.sb-menu-icon     /* Icon - always visible, 45px */
.sb-menu-label    /* Text label - hidden when collapsed */
.sb-shell-dark    /* Dark mode sidebar container */
.sb-shell-light   /* Light mode sidebar container */
```

## Light Mode (Apple Glass)

### Characteristics
- **Backdrop Blur**: 20px
- **Glass Opacity**: 70%
- **Primary Color**: #ffffff
- **Text Color**: #1f2937 (dark gray)
- **Accent**: Apple's signature polished aluminum look

### Component Styling
```css
/* Panels and Cards */
- Subtle glass effect: rgba(255, 255, 255, 0.7)
- Thin borders: rgba(0, 0, 0, 0.06) - 0.08
- Drop shadows: 0 2px 8px to 0 12px 40px
- Inset highlight: rgba(255, 255, 255, 0.6-0.8)

/* Buttons and Interactive Elements */
- Hover: Slight elevation with enhanced drop shadow
- Active: Reduced elevation, increased shadow definition
- Transition: Smooth 150-200ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Color Palette (Light)
```
Background:     #ffffff
Secondary:      rgba(255, 255, 255, 0.7)
Text Primary:   #1f2937
Text Secondary: #374151
Border Light:   rgba(0, 0, 0, 0.06)
Border Medium:  rgba(0, 0, 0, 0.12)
```

## Dark Mode (TRON Neon)

### Characteristics
- **Backdrop Blur**: 12px
- **Glass Opacity**: 85%
- **Primary Color**: #0a1420 (deep blue-black)
- **Accent Color**: #00d9ff (cyan neon)
- **Glow Effects**: Neon cyan glows on hover/focus

### Component Styling
```css
/* Panels and Cards */
- Glass effect: rgba(10, 20, 35, 0.85)
- Neon borders: rgba(0, 217, 255, 0.15) - 0.5
- Glow shadows: 0 0 20px rgba(0, 217, 255, 0.15-0.35)
- Depth shadows: 0 8px 32px rgba(0, 0, 0, 0.4-0.6)

/* Buttons and Interactive Elements */
- Hover: Enhanced cyan glow effect
- Active: Intensified glow with maximum visibility
- Transition: Smooth 150-200ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Color Palette (Dark)
```
Background:     #0a1420
Secondary:      rgba(10, 20, 35, 0.85)
Text Primary:   #e0f2fe
Text Secondary: #b0e0ff
Accent:         #00d9ff (TRON cyan)
Border Light:   rgba(0, 217, 255, 0.15)
Border Medium:  rgba(0, 217, 255, 0.3)
Glow:           rgba(0, 217, 255, 0.15-0.35)
```

## Theme Toggle

### Implementation
The theme toggle is controlled by:
1. **DOM Class**: `html.dark` toggles dark mode
2. **CSS Variables**: `:root.dark` selector applies dark theme
3. **Sidebar Control**: Built-in sun/moon icon toggle button

### Usage
```javascript
// Toggle dark mode
document.documentElement.classList.toggle("dark");

// Check current mode
const isDarkMode = document.documentElement.classList.contains("dark");
```

### CSS Variable Access
```css
/* All components automatically use correct theme */
background: var(--bg-secondary);
color: var(--text-primary);
border-color: var(--border-medium);
box-shadow: var(--shadow-md);
```

## Component Styling Details

### Sidebar
- **Light Mode**: White glass with subtle shadows
- **Dark Mode**: Deep blue glass with cyan glow effects
- **Icons**: Consistent 45px sizing, no shift on collapse
- **Hover State**: Smooth color transition + shadow enhancement

### Panels & Cards
- **Rounded Corners**: 14px (panels), 12px (cards)
- **Borders**: Always 1px with theme-specific color
- **Shadows**: Appropriate to theme (drop vs. glow)
- **Hover**: Elevated effect with enhanced visibility

### Buttons
- **Border Radius**: 8px
- **Padding**: 8px 14px
- **Transitions**: All 150-200ms
- **States**: Normal, Hover (+transform), Active (pressed)

### Inputs & Forms
- **Border Radius**: 8px
- **Focus State**: Theme-specific outline + inner glow
- **Placeholder**: Reduced opacity theme text
- **Transitions**: Smooth color + shadow changes

### Toolbar (TB2)
- **Shell**: Glass with theme borders
- **Buttons**: Mini glass buttons (28px)
- **Icons**: 18px with brightness filter on hover
- **Separators**: Theme-appropriate divider color

## Responsive Behavior

### Mobile (< 768px)
- Sidebar defaults to collapsed (45px)
- Touch targets: minimum 44-48px (meets accessibility standards)
- Icons: 45px for optimal tap area

### Tablet (768px - 1024px)
- Sidebar can be toggled manually
- Full spacing maintained
- No UI degradation

### Desktop (> 1024px)
- Sidebar expansion: 425px
- Full labels visible with icons
- Optimal information density

## Accessibility Features

### Keyboard Navigation
- All interactive elements: `:focus-visible` outline
- Focus color: Theme-specific (dark: cyan, light: dark gray)
- Focus offset: 2px for visibility

### Color Contrast
- **Light Mode**: WCAG AA compliant (text on glass)
- **Dark Mode**: High contrast cyan against deep blue
- **Text**: Always readable with sufficient contrast ratio

### Motion & Animation
- Respects `prefers-reduced-motion` media query
- Animations disabled for users with motion sensitivity
- Fallback to instant transitions available

### Screen Readers
- Semantic HTML elements preserved
- ARIA labels on all buttons
- Proper heading hierarchy maintained
- Alt text on all images

## Browser Support

### Supported Features
- **Backdrop Filter**: Chrome, Edge, Safari, Firefox
- **CSS Variables**: All modern browsers
- **Gradients**: Full support
- **Transitions**: Full support
- **Flexbox**: Full support

### Fallbacks
- Backdrop filter: Opaque background color fallback
- Gradients: Solid color fallback
- Animations: Instant transitions if disabled

## Performance Considerations

### Optimizations
- GPU-accelerated transitions (`will-change` on transitions)
- Backdrop blur efficiently rendered on modern browsers
- CSS variables reduce file size vs. inline values
- Modern CSS Grid/Flex layout for minimal repaints

### File Sizes
- `modern-theme.css`: ~8 KB (unminified)
- `global.css`: Updated with theme support
- Total CSS impact: Minimal, uses CSS variables for theming

## Customization Guide

### To Change Accent Colors
Edit `:root` or `:root.dark` in `frontend/src/styles/modern-theme.css`:
```css
--accent-primary: #your-color;
--accent-secondary: #your-color-variant;
```

### To Adjust Blur Effects
Modify glass blur in theme variables:
```css
--glass-blur: 20px;  /* Light mode */
--glass-blur: 12px;  /* Dark mode */
```

### To Change Shadows
Update shadow variables:
```css
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
```

## Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works smoothly
- [ ] Sidebar collapse/expand animations smooth
- [ ] Icons stay visible and don't shift
- [ ] All buttons have proper hover states
- [ ] Focus states visible for keyboard users
- [ ] Mobile responsiveness works
- [ ] No performance issues on animations
- [ ] Accessibility standards met (WCAG AA)

## Browser DevTools Tips

### Check Active Theme
```javascript
// In console
document.documentElement.classList.contains('dark') ? 'Dark' : 'Light'
```

### Inspect Theme Variables
```css
/* Use computed styles to verify active variables */
body { background-color: var(--bg-primary); }
```

### Performance Profiling
Use DevTools Performance tab to verify:
- Smooth 60fps animations
- No excessive repaints during transitions
- GPU acceleration active for transforms

## Future Enhancements

- Custom theme builder UI
- Theme persistence in local storage
- System theme preference detection
- Additional theme presets (high contrast, monochrome, etc.)
- Storybook integration for component previews
- Comprehensive Figma component library

---

**Last Updated**: 2024
**Maintainer**: Development Team
