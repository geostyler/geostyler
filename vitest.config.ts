import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: true
      }
    },
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json', 'lcov']
    },
    globals: true,
    environment: 'jsdom'
  },
});
