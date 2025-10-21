// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src'),
      maestro: path.resolve(__dirname, 'src/modules/Maestro-BQT/client'),
      // FullCalendar CSS shortcut -> your copied files
      '@fc': path.resolve(__dirname, 'src/vendor/fullcalendar'),
    },
  },
  server: { host: true, port: 5173 },
});
