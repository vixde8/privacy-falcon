/**
 * Cookie Collector.
 *
 * Collects cookies from the browser context and classifies them
 * as first-party or third-party relative to the scanned page.
 */

import { Page } from "playwright";

export type CookieRecord = {
  name: string;
  domain: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
};

export async function collectCookies(
  page: Page,
  signal?: AbortSignal
): Promise<CookieRecord[]> {
  if (signal?.aborted) {
    return [];
  }

  const cookies = await page.context().cookies();

  return cookies.map(c => ({
    name: c.name,
    domain: c.domain,
    path: c.path,
    httpOnly: c.httpOnly,
    secure: c.secure
  }));
}
