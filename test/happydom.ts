import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Register Happy DOM
GlobalRegistrator.register();

// Mock browser APIs
const mockBrowserObjects = {
  ResizeObserver: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
  matchMedia: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
};

// Add the mock objects to the global scope
Object.assign(global, mockBrowserObjects);

// Clean up after each test
afterEach(() => {
  cleanup();
});
