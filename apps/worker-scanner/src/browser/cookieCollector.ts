/**
 * Cookie Collector.
 *
 * Collects cookies from the browser context and classifies them
 * as first-party or third-party relative to the scanned page.
 */

import { BrowserContext } from "playwright";

export type CookieRecord = {
  name: string;
  domain: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
  firstParty: boolean;
};

function normalizeDomain(domain: string) {
  return domain.startsWith(".") ? domain.slice(1) : domain;
}

export async function collectCookies(params: {
  context: BrowserContext;
  pageUrl: string;
}): Promise<CookieRecord[]> {
  const { context, pageUrl } = params;

  const pageHost = new URL(pageUrl).hostname;
  const cookies = await context.cookies();

  return cookies.map((c) => {
    const cookieDomain = normalizeDomain(c.domain);

    return {
      name: c.name,
      domain: cookieDomain,
      path: c.path,
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
      firstParty: cookieDomain === pageHost
    };
  });
}
