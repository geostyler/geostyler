import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

const externalDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist'
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GeoStyler',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        return externalDeps.some(
          dep => id === dep || id.startsWith(`${dep}/`)
        );
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    cssCodeSplit: false,
  },
});
