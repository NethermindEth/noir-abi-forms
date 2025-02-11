import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.stories.{ts,tsx}', '**/stories/**', '**/*.test.{ts,tsx}'],
    }),
    nodePolyfills({
      include: ['path', 'util', 'process'],
      globals: {
        process: true,
      },
    }),
  ],
  build: mode === 'lib' ? {
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
  } : {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'barretenberg.js') {
            return 'assets/[name][extname]';
          }
          return 'assets/[name].[hash].[ext]';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      path: 'path-browserify',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: ['path-browserify'],
  },
  publicDir: path.resolve(__dirname, 'node_modules/@aztec/aztec.js/barretenberg/'),
}))
