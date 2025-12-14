/**
 * Unit tests for Worker Orchestration.
 *
 * Tests the integration of the lifecycle manager and execution guards
 * within the main worker runner function.
 */
import { describe, it, expect, vi } from "vitest";
import { runWorker } from "../../../src/worker/worker";

describe("Worker orchestration", () => {
  it("marks scan as COMPLETED when scan logic succeeds", async () => {
    const scanFn = vi.fn().mockResolvedValue(undefined);

    const result = await runWorker(scanFn);

    expect(result.state).toBe("COMPLETED");
  });
  
  it("marks scan as FAILED when scan logic throws", async () => {
  const scanFn = vi.fn().mockRejectedValue(new Error("boom"));

  const result = await runWorker(scanFn);

  expect(result.state).toBe("FAILED");
});

it("marks scan as FAILED when aborted", async () => {
  const scanFn = ({ signal }: { signal: AbortSignal }) =>
    new Promise<void>((_, reject) => {
      signal.addEventListener("abort", () => {
        reject(new Error("aborted"));
      });
    });

  const result = await runWorker(scanFn, {
    timeoutMs: 20
  });

  expect(result.state).toBe("FAILED");
});

});
