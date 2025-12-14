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

});
