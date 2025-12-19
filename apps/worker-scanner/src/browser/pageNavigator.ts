/**
 * Page Navigator.
 *
 * Handles controlled navigation to a target URL
 * with performance and abort safety guarantees.
 */

import type { Page } from "playwright";

export async function navigatePage(
  page: Page,
  url: string,
  signal: AbortSignal,
  timeoutMs = 30_000
): Promise<void> {
  if (signal.aborted) {
    throw new Error("Navigation aborted before start");
  }

  const abortPromise = new Promise<never>((_, reject) => {
    signal.addEventListener(
      "abort",
      () => reject(new Error("Navigation aborted")),
      { once: true }
    );
  });

  await Promise.race([
    page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeoutMs
    }),
    abortPromise
  ]);
}
