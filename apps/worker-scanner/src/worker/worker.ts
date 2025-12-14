/**
 * Worker Orchestration.
 *
 * Coordinates scan execution with lifecycle management
 * and enforces performance guards.
 */

import { createLifecycle } from "./lifecycle";
import { createAbortGuard, withTimeout } from "./guard";

export async function runWorker(
  scanFn: (ctx: { signal: AbortSignal }) => Promise<void>,
  options?: { timeoutMs?: number }
) {
  const lifecycle = createLifecycle();
  const abortGuard = createAbortGuard();

  lifecycle.start();

  try {
    if (options?.timeoutMs) {
      await withTimeout(
        () => scanFn({ signal: abortGuard.signal }),
        options.timeoutMs
      );
    } else {
      await scanFn({ signal: abortGuard.signal });
    }

    lifecycle.complete();
  } catch {
    abortGuard.abort();
    lifecycle.fail();
  }

  return {
    state: lifecycle.state
  };
}
