/**
 * Vitest Configuration.
 *
 * Configures the test runner environment, including global settings,
 * file inclusion patterns, and mock clearing behavior.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts"],
    clearMocks: true
  }
});
