/**
 * Execution Time Guard.
 *
 * Prevents detection pipelines from running indefinitely.
 */

export function withTimeGuard<T>(
  fn: () => T,
  maxMs: number,
  label: string
): T {
  const start = Date.now();
  const result = fn();
  const duration = Date.now() - start;

  if (duration > maxMs) {
    console.warn(
      `[PERF WARNING] ${label} exceeded ${maxMs}ms (${duration}ms)`
    );
  }

  return result;
}
