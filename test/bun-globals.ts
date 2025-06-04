import { test, expect, describe, beforeEach, afterEach, beforeAll, afterAll, mock } from 'bun:test';
import '@testing-library/jest-dom/matchers';

// Add test functions to global scope
Object.assign(global, {
  test,
  expect,
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  mock,
  // Alias `it` to `test` for compatibility with Jest-style tests
  it: test
});
