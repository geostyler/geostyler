import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  })],
  build: {
    outDir: 'browser',
    manifest: true,
    lib: {
      entry: './src/index.ts',
      name: 'GeoStyler',
      formats: ['iife'],
      fileName: 'geostyler',
    },
    // Sourcemaps are not needed for the browser build
    sourcemap: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
        'ol',
        '@ant-design/icons'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'antd': 'antd',
          'ol': 'ol',
          '@ant-design/icons': 'icons',
        }
      }
    }
  },
  define: {
    appName: 'GeoStyler',
    "process.env.NODE_ENV": '"production"'
  },
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    mainFields: ['module', 'main', 'jsnext:main', 'jsnext']
  }
});
