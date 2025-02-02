import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/entities': path.resolve(__dirname, './src/entities'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    deps: {
      inline: [
        '@radix-ui/react-slot',
        '@radix-ui/react-tabs',
        '@radix-ui/react-select',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-popover',
        '@radix-ui/react-dialog',
        '@radix-ui/react-accordion',
        '@radix-ui/react-toggle-group',
        '@radix-ui/react-toggle-button',
        '@radix-ui/react-toggle-group',
        '@radix-ui/react-toggle-button',
        // Add other Radix UI components as needed
      ],
    },
  },
})
