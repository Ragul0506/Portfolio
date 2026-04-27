import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'gateway': ['./src/components/Gateway/GatewayVault'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
