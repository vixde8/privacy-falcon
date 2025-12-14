/**
 * Unit tests for the timeout guard.
 *
 * This script verifies that the execution guard correctly aborts operations
 * that exceed their allocated time limit.
 */
import { describe, it, expect, vi } from "vitest";
import { withTimeout } from "../../../src/worker/guard";

describe("Performance guard - timeout", () => {
  it("aborts execution when timeout is exceeded", async () => {
    const scanFn = vi.fn(() => new Promise(() => {})); // never resolves

    const start = Date.now();

    await expect(
      withTimeout(scanFn, 50)
    ).rejects.toThrow("Scan timed out");

    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
  });
});
