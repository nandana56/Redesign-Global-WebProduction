import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the warning threshold so the console isn't noisy about Three.js chunks
    chunkSizeWarningLimit: 2000,

    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js core — large but rarely changes, gets its own cached chunk
          'three-core': ['three'],

          // React-Three-Fiber + Drei helpers
          'r3f': ['@react-three/fiber', '@react-three/drei'],

          // React + router — changes rarely, cache separately
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Animation libraries
          'motion': ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
