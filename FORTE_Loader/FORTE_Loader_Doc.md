# FORTE Loader Documentation

## Overview
The FORTE Loader is a cinematic startup sequence featuring TRON-like neon grids and Star Wars-style credits.

## Files
- FORTE_Loader.tsx: React component for the credits crawl.
- FORTE_GridBackground.tsx: Background grid animation.
- FORTE_Credits.json: Credits data.
- FORTE_Crawl.css: CSS for the crawl animation.
- FORTE_Init.ts: Entry point for integrating the loader.
- EasterEggTrigger.ts: Replay loader on `echo.prime;` event.

## Usage
```tsx
import { startFORTE } from './FORTE_Init';
startFORTE(() => console.log('FORTE Loader complete!'));
```