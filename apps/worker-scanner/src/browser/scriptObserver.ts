/**
 * Script Observer.
 *
 * Observes and records JavaScript execution on a page,
 * including inline, external, and dynamically injected scripts.
 */

import { Page } from "playwright";

export type ScriptRecord = {
  src: string | null;
  inline: boolean;
  async: boolean;
  defer: boolean;
  detectedAt: number;
};

export async function observeScripts(
  page: Page,
  signal: AbortSignal
): Promise<() => Promise<ScriptRecord[]>> {
  if (signal.aborted) {
    throw new Error("Script observation aborted before start");
  }

  await page.addInitScript(() => {
    const records: any[] = [];
    (window as any).__pf_scripts = records;

    const recordScript = (script: HTMLScriptElement) => {
      records.push({
        src: script.src || null,
        inline: !script.src,
        async: script.async,
        defer: script.defer,
        detectedAt: Date.now()
      });
    };

    const attachObserver = () => {
      // capture initial scripts
      document.querySelectorAll("script").forEach((s) =>
        recordScript(s as HTMLScriptElement)
      );

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLScriptElement) {
              recordScript(node);
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", attachObserver);
    } else {
      attachObserver();
    }
  });

  const collect = async (): Promise<ScriptRecord[]> => {
    if (signal.aborted) return [];

    return page.evaluate(() => {
      const records = (window as any).__pf_scripts || [];
      (window as any).__pf_scripts = [];
      return records;
    });
  };

  return collect;
}
