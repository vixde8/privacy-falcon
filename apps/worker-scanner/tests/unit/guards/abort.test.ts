/**
 * Unit tests for the Abort Guard.
 *
 * Verifies that the abort signal is triggered correctly.
 */

import { describe, it, expect } from "vitest";
import { createAbortGuard } from "../../../src/worker/guard";

describe("Abort guard", () => {
  it("aborts the signal when abort is triggered", () => {
    const { signal, abort } = createAbortGuard();

    expect(signal.aborted).toBe(false);

    abort();

    expect(signal.aborted).toBe(true);
  });
});
