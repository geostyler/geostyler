declare global {
  const test: typeof import('bun:test').test;
  const expect: typeof import('bun:test').expect;
  const describe: typeof import('bun:test').describe;
  const beforeEach: typeof import('bun:test').beforeEach;
  const afterEach: typeof import('bun:test').afterEach;
  const beforeAll: typeof import('bun:test').beforeAll;
  const afterAll: typeof import('bun:test').afterAll;
  const mock: typeof import('bun:test').mock;
  const it: typeof import('bun:test').test;
}

export {};
