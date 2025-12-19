/**
 * Network Observer.
 *
 * Observes and records network requests made by a page
 * without modifying request or response behavior.
 */

import { Page } from "playwright";

export type NetworkRequestRecord = {
  url: string;
  method: string;
  resourceType: string;
  timestamp: number;
};

export async function observeNetwork(
  page: Page,
  signal?: AbortSignal
): Promise<{ getRecords: () => NetworkRequestRecord[] }> {
  if (signal?.aborted) {
    throw new Error("Network observation aborted before start");
  }

  const records: NetworkRequestRecord[] = [];

  const handler = (request: any) => {
    records.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: Date.now()
    });
  };

  page.on("request", handler);

  if (signal) {
    signal.addEventListener(
      "abort",
      () => page.off("request", handler),
      { once: true }
    );
  }

  return {
    getRecords() {
      return records;
    }
  };
}
