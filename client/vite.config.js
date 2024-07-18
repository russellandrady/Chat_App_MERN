import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {//each time we go /api we gonna use localhost 3000 instead of 5173
        target: 'http://localhost:3000',
        secure: false,
      }

    },
  },
})
