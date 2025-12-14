/**
 * Browser Manager.
 *
 * Manages the lifecycle of a browser instance for a single scan.
 * Ensures proper creation and cleanup of browser resources.
 */

import { chromium, Browser, Page } from "playwright";

export type BrowserHandle = {
  page: Page;
  close: () => Promise<void>;
};

export async function createBrowser(
  signal: AbortSignal
): Promise<BrowserHandle> {
  let browser: Browser | null = null;

  if (signal.aborted) {
    throw new Error("Scan aborted before browser launch");
  }

  browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const abortListener = async () => {
    try {
      await browser?.close();
    } catch {
      // ignore cleanup errors
    }
  };

  signal.addEventListener("abort", abortListener, { once: true });

  return {
    page,
    close: async () => {
      signal.removeEventListener("abort", abortListener);
      await browser?.close();
    }
  };
}
