/**
 * Unit tests for Scan Result Normalization.
 *
 * Verifies that scan outputs are combined
 * into a stable normalized structure.
 */

import { describe, it, expect } from "vitest";
import { normalizeScanResult } from "../../../src/output/normalizeScanResult";

describe("normalizeScanResult", () => {
  it("produces a normalized scan result", () => {
    const result = normalizeScanResult({
      url: "https://example.com",
      startedAt: 1,
      finishedAt: 2,
      scripts: [],
      network: [],
      cookies: [],
      signals: []
    });

    expect(result.meta.url).toBe("https://example.com");
    expect(result.meta.startedAt).toBe(1);
    expect(result.meta.finishedAt).toBe(2);
    expect(result.scripts).toEqual([]);
    expect(result.network).toEqual([]);
    expect(result.cookies).toEqual([]);
    expect(result.signals).toEqual([]);
  });
});
