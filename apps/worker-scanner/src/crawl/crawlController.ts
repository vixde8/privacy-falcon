/**
 * Crawl Controller.
 *
 * Orchestrates browser-based crawling:
 * - page navigation
 * - script observation
 * - network observation
 * - cookie collection
 */

import { createBrowser } from "../browser/browserManager";
import { navigatePage } from "../browser/pageNavigator";
import { observeScripts } from "../browser/scriptObserver";
import { observeNetwork } from "../browser/networkObserver";
import { collectCookies } from "../browser/cookieCollector";

export async function runCrawl(url: string) {
  const startedAt = Date.now();
  const controller = new AbortController();

  const browser = await createBrowser(controller.signal);

  try {
    const { page } = browser;

    const scriptObserver = await observeScripts(page, controller.signal);
    const networkObserver = await observeNetwork(page, controller.signal);

    await navigatePage(page, url, controller.signal);

    const scripts = await scriptObserver.getRecords();
    const network = networkObserver.getRecords();
    const cookies = await collectCookies(page, controller.signal);

    return {
      startedAt,
      finishedAt: Date.now(),
      scripts,
      network,
      cookies
    };
  } finally {
    await browser.close();
  }
}
