import { defineConfig } from 'vite';
import react from '@vitejs.plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures proper relative asset paths for GitHub Pages and custom domain deployments
  base: './',
  build: {
    // Generates source maps for easier production debugging if needed
    sourcemap: false,
    // Optimizes bundle size by splitting heavy vendor dependencies into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
