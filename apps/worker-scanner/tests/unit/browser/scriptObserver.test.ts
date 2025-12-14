/**
 * Unit tests for the Script Observer.
 *
 * Verifies that dynamically injected scripts are detected.
 */

import { describe, it, expect } from "vitest";
import { chromium } from "playwright";
import { observeScripts } from "../../../src/browser/scriptObserver";

describe("Script Observer", () => {
  it(
    "detects dynamically injected scripts",
    async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      const controller = new AbortController();
      const collect = await observeScripts(page, controller.signal);

      // Real navigation so addInitScript applies correctly
      await page.goto("data:text/html,<html><body></body></html>");

      // Inject inline script dynamically
      await page.evaluate(() => {
        const script = document.createElement("script");
        script.textContent = "window.__pf_test = true;";
        document.body.appendChild(script);
      });

      // Wait until observer records something
      await page.waitForFunction(() => {
        return Array.isArray((window as any).__pf_scripts) &&
               (window as any).__pf_scripts.length > 0;
      });

      const scripts = await collect();

      expect(scripts.some((s) => s.inline === true)).toBe(true);

      await browser.close();
    },
    10_000
  );
});
