/**
 * Internal Crawl Controller.
 *
 * Controls which internal URLs should be visited during a scan,
 * enforcing depth, scope, and page count limits.
 */

export type CrawlController = {
  next(): string | null;
  enqueue(fromUrl: string, links: string[]): void;
  visited(): Set<string>;
};

export function createCrawlController(params: {
  rootUrl: string;
  maxDepth: number;
  maxPages: number;
}): CrawlController {
  const { rootUrl, maxDepth, maxPages } = params;

  const root = new URL(rootUrl);
  const queue: Array<{ url: string; depth: number }> = [
    { url: rootUrl, depth: 0 }
  ];
  const seen = new Set<string>();

  function isInternal(url: string): boolean {
    try {
      return new URL(url).origin === root.origin;
    } catch {
      return false;
    }
  }

  return {
    next() {
      while (queue.length > 0) {
        const item = queue.shift()!;
        if (seen.has(item.url)) continue;
        if (item.depth > maxDepth) continue;

        seen.add(item.url);
        return item.url;
      }
      return null;
    },

    enqueue(fromUrl: string, links: string[]) {
      const parentDepth =
        [...seen].includes(fromUrl)
          ? [...queue, ...[]].length >= 0
            ? undefined
            : undefined
          : undefined;

      for (const link of links) {
        if (!isInternal(link)) continue;
        if (seen.has(link)) continue;
        if (queue.length + seen.size >= maxPages) continue;

        queue.push({
          url: link,
          depth:
            [...queue].find((q) => q.url === fromUrl)?.depth ??
            1
        });
      }
    },

    visited() {
      return seen;
    }
  };
}
