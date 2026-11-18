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
      // Also externalize subpath imports (e.g. `antd/lib/locale/de_DE`, `ol/Map`),
      // otherwise they would be bundled as a second copy next to the global.
      external: (id: string) => {
        // Stylesheets (e.g. `ol/ol.css`) must be bundled into geostyler.css.
        if (id.endsWith('.css')) {
          return false;
        }
        // Small constants module that is not part of the ol UMD build
        // (`ol.ImageState` is undefined), so it has to be bundled.
        if (/^ol\/ImageState(\.js)?$/.test(id)) {
          return false;
        }
        return /^(react|react-dom|antd|ol|@ant-design\/icons)(\/.*)?$/.test(id);
      },
      output: {
        globals: (id: string) => {
          const localeMatch = id.match(/^antd\/(?:lib|es)\/locale\/(\w+)$/);
          if (localeMatch) {
            // provided by antd-with-locales.min.js
            return `antd.locales.${localeMatch[1]}`;
          }
          if (id.startsWith('ol/')) {
            // e.g. `ol/layer/Vector` -> `ol.layer.Vector`
            return id.replace(/\.js$/, '').replace(/\//g, '.');
          }
          const globals: Record<string, string> = {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'antd': 'antd',
            'ol': 'ol',
            '@ant-design/icons': 'icons'
          };
          return globals[id];
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
