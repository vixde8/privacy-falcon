/**
 * Unit tests for the Internal Crawl Controller.
 *
 * Verifies internal-only crawling, depth limits,
 * and page count enforcement.
 */

import { describe, it, expect } from "vitest";
import { createCrawlController } from "../../../src/crawl/crawlController";

describe("Crawl Controller", () => {
  it("crawls only internal links and respects limits", () => {
    const controller = createCrawlController({
      rootUrl: "https://example.com",
      maxDepth: 1,
      maxPages: 2
    });

    const first = controller.next();
    expect(first).toBe("https://example.com");

    controller.enqueue("https://example.com", [
      "https://example.com/about",
      "https://external.com"
    ]);

    const second = controller.next();
    expect(second).toBe("https://example.com/about");

    const third = controller.next();
    expect(third).toBeNull();
  });
});
