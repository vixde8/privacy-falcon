/**
 * Unit tests for the Network Observer.
 *
 * Verifies that network requests are detected and recorded.
 */

import { describe, it, expect } from "vitest";
import { chromium } from "playwright";
import { observeNetwork } from "../../../src/browser/networkObserver";

describe("Network Observer", () => {
  it(
    "records network requests made by the page",
    async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      const controller = new AbortController();
      const collect = await observeNetwork(page, controller.signal);

      await page.goto("https://example.com");

      const requests = await collect();

      expect(requests.length).toBeGreaterThan(0);
      expect(
        requests.some((r) => r.url.includes("example.com"))
      ).toBe(true);

      await browser.close();
    },
    10_000
  );
});
