/**
 * Performance Guards.
 *
 * Provides cooperative cancellation and timeout enforcement
 * for scan execution.
 */

export function createAbortGuard() {
  const controller = new AbortController();

  return {
    signal: controller.signal,
    abort: () => controller.abort()
  };
}

export async function withTimeout(
  scanFn: () => Promise<void>,
  timeoutMs: number
) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Scan timed out"));
    }, timeoutMs);

    scanFn()
      .then(() => {
        clearTimeout(timer);
        resolve();
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
