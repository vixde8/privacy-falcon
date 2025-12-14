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
  signal: AbortSignal
): Promise<() => Promise<NetworkRequestRecord[]>> {
  if (signal.aborted) {
    throw new Error("Network observation aborted before start");
  }

  const records: NetworkRequestRecord[] = [];

  const onRequest = (request: any) => {
    records.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: Date.now()
    });
  };

  page.on("request", onRequest);

  signal.addEventListener(
    "abort",
    () => {
      page.off("request", onRequest);
    },
    { once: true }
  );

  const collect = async (): Promise<NetworkRequestRecord[]> => {
    const snapshot = [...records];
    records.length = 0;
    return snapshot;
  };

  return collect;
}
