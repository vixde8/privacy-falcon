/**
 * Unit tests for the Page Navigator.
 *
 * Verifies that page navigation completes successfully
 * under normal conditions.
 */

import { describe, it, expect } from "vitest";
import { chromium } from "playwright";
import { navigatePage } from "../../../src/browser/pageNavigator";

describe("Page Navigator", () => {
  it("navigates to a page successfully", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const controller = new AbortController();

    await navigatePage(
      page,
      "https://example.com",
      controller.signal,
      10_000
    );

    expect(page.url()).toContain("example.com");

    await browser.close();
  });
});
