/**
 * Detection Sorting Utilities.
 *
 * Ensures deterministic ordering of detections and signals.
 */

export function sortSignals(signals: string[]): string[] {
  return [...signals].sort();
}

export function sortDetectionsByTrackerId<T extends { tracker_id: string }>(
  detections: T[]
): T[] {
  return [...detections].sort((a, b) =>
    a.tracker_id.localeCompare(b.tracker_id)
  );
}
