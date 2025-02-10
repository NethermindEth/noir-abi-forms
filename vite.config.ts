import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    nodePolyfills({
      include: ['util', 'process'],
      globals: {
        process: true,
      },
    }),
  ],
  base: '/noir-abi-forms/',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NoirAbiForms',
      formats: ['es', 'umd'],
      fileName: (format) => `noir-abi-forms.${format}.js`,
    },
    target: 'esnext',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
