import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Activate this snippet when using npm link with deps that also use ol
// import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    manifest: true
  },
  // Activate this snippet when using npm link with deps that also use ol.
  // It is recommended to run vite with --force when using npm link in order
  // to refresh the vite cache. E.g. npm run start-dev -- --force
  //
  // resolve: {
  //   alias: [
  //     {find: 'ol', replacement: path.resolve(__dirname, 'node_modules/ol')},
  //   ]
  // },
  server: {
    host: '0.0.0.0'
  }
});
