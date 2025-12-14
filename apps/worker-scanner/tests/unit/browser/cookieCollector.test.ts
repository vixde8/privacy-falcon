/**
 * Unit tests for the Cookie Collector.
 *
 * Verifies that cookies are collected and classified
 * as first-party or third-party correctly.
 */

import { describe, it, expect } from "vitest";
import { chromium } from "playwright";
import { collectCookies } from "../../../src/browser/cookieCollector";

describe("Cookie Collector", () => {
  it(
    "collects and classifies cookies correctly",
    async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto("data:text/html,<html></html>");

      // Set first-party cookie
      await context.addCookies([
        {
          name: "fp_cookie",
          value: "1",
          domain: "example.com",
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "Lax"
        }
      ]);

      const cookies = await collectCookies({
        context,
        pageUrl: "https://example.com"
      });

      expect(cookies.length).toBe(1);
      expect(cookies[0].firstParty).toBe(true);
      expect(cookies[0].name).toBe("fp_cookie");

      await browser.close();
    },
    10_000
  );
});
