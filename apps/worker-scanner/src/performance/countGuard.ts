/**
 * Detection Count Guard.
 *
 * Prevents runaway detection explosions.
 */

export function enforceDetectionLimit<T>(
  detections: T[],
  max: number
): T[] {
  if (detections.length <= max) return detections;

  console.warn(
    `[SAFETY WARNING] Detection count ${detections.length} exceeds limit ${max}. Truncating.`
  );

  return detections.slice(0, max);
}
