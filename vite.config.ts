import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    lib: {
      entry: './src/index.ts',
      name: 'GeoStyler',
      formats: ['iife'],
      fileName: 'geostyler.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', /ol\/.*/],
      plugins: [nodePolyfills() as any],
      output: {
        dir: 'browser',
        generatedCode: 'es5',
        format: 'iife',
        sourcemap: true,
        globals: function(name) {
          switch (name) {
            case 'react':
              return 'React';
            case 'react-dom':
              return 'ReactDOM';
            case 'antd':
              return 'antd';
            default:
              return (name as any)
                .replaceAll(/[/]/g, '.')
                .replaceAll(/.*(ol\..*)/g, '$1')
                .replaceAll(/[?].*/g, '')
                .replaceAll(/.js$/g, '');
          }
        }
      },
    }
  },
  define: {
    appName: 'GeoStyler'
  },
  server: {
    host: '0.0.0.0'
  }
});
