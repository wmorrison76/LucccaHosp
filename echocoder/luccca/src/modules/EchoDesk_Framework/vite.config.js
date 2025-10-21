import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [react()],
  server: {
    host: '::',
    port: 8080
  }
}))
