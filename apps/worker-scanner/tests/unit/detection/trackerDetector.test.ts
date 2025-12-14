/**
 * Unit tests for the Tracker Detector.
 *
 * Verifies third-party and tracker-like classification
 * using deterministic heuristics.
 */

import { describe, it, expect } from "vitest";
import { detectTrackers } from "../../../src/detection/trackerDetector";

describe("Tracker Detector", () => {
  it("detects third-party tracker scripts and requests", () => {
    const result = detectTrackers({
      pageUrl: "https://example.com",
      scripts: [
        { src: "https://www.googletagmanager.com/gtm.js" }
      ],
      network: [
        { url: "https://analytics.google.com/collect" }
      ]
    });

    expect(result.length).toBe(2);

    expect(result[0].thirdParty).toBe(true);
    expect(result[0].trackerLike).toBe(true);

    expect(result[1].thirdParty).toBe(true);
    expect(result[1].trackerLike).toBe(true);
  });

  it("does not flag first-party resources as third-party", () => {
    const result = detectTrackers({
      pageUrl: "https://example.com",
      scripts: [
        { src: "https://example.com/app.js" }
      ],
      network: []
    });

    expect(result[0].thirdParty).toBe(false);
    expect(result[0].trackerLike).toBe(false);
  });
});
