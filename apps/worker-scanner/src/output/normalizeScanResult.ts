/**
 * Scan Result Normalizer.
 *
 * Combines raw scan outputs into a single
 * normalized and schema-enforced scan result.
 *
 * IMPORTANT:
 * - scanId is an orchestration identifier
 * - it MUST survive normalization
 * - this layer MUST NOT invent or mutate scanId
 */

import type { ScriptRecord } from "../browser/scriptObserver";
import type { NetworkRequestRecord } from "../browser/networkObserver";
import type { CookieRecord } from "../browser/cookieCollector";
import type { TrackerSignal } from "../detection/trackerDetector";

export type NormalizedScanResult = {
  scanId: string;

  meta: {
    url: string;
    startedAt: number;
    finishedAt: number;
  };

  scripts: ScriptRecord[];
  network: NetworkRequestRecord[];
  cookies: CookieRecord[];
  signals: TrackerSignal[];
};

export function normalizeScanResult(params: {
  scanId: string;
  url: string;
  startedAt: number;
  finishedAt: number;
  scripts: ScriptRecord[];
  network: NetworkRequestRecord[];
  cookies: CookieRecord[];
  signals: TrackerSignal[];
}): NormalizedScanResult {
  return {
    scanId: params.scanId,

    meta: {
      url: params.url,
      startedAt: params.startedAt,
      finishedAt: params.finishedAt,
    },

    scripts: params.scripts,
    network: params.network,
    cookies: params.cookies,
    signals: params.signals,
  };
}
