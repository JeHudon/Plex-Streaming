import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/movie': {
        target: 'https://111movies.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/movie/, '/movie'),
      },
    },
  },
})