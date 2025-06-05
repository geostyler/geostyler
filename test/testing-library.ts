import { afterEach, expect, describe, it } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Re-export test functions from bun:test to make them globally available
export { describe, it, expect };
