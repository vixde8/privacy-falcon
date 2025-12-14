/**
 * Unit tests for Scan Job Validation.
 *
 * Ensures that incoming job payloads adhere to the defined contract,
 * rejecting invalid URLs or configuration parameters.
 */
import { describe, it, expect } from "vitest";
import { parseScanJob } from "../../../src/contract/scanJob";

describe("ScanJob contract validation", () => {
  it("rejects job without scanId", () => {
    const job = {
      url: "https://example.com",
      config: {
        maxDepth: 1,
        maxPages: 5,
        timeoutMs: 10000
      }
    };

    expect(() => parseScanJob(job)).toThrow();
  });

  it("rejects job with invalid url", () => {
  const job = {
    scanId: "scan-1",
    url: "not-a-url",
    config: {
      maxDepth: 1,
      maxPages: 5,
      timeoutMs: 10000
    }
  };

  expect(() => parseScanJob(job)).toThrow();
});

it("rejects job with negative timeout", () => {
  const job = {
    scanId: "scan-2",
    url: "https://example.com",
    config: {
      maxDepth: 1,
      maxPages: 5,
      timeoutMs: -1
    }
  };

  expect(() => parseScanJob(job)).toThrow();
});

it("rejects job with maxPages less than 1", () => {
  const job = {
    scanId: "scan-3",
    url: "https://example.com",
    config: {
      maxDepth: 1,
      maxPages: 0,
      timeoutMs: 10000
    }
  };

  expect(() => parseScanJob(job)).toThrow();
});

it("accepts a valid scan job", () => {
  const job = {
    scanId: "scan-ok",
    url: "https://example.com",
    config: {
      maxDepth: 2,
      maxPages: 10,
      timeoutMs: 30000
    }
  };

  const parsed = parseScanJob(job);
  expect(parsed.scanId).toBe("scan-ok");
});

});
