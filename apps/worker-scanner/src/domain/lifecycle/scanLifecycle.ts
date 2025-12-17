/**
 * Scan Job Lifecycle State Machine.
 *
 * Defines all legal scan job states and transitions.
 * This is the single authority for scan lifecycle correctness.
 */

export type ScanStatus =
  | "queued"
  | "running"
  | "scanning"
  | "scoring"
  | "completed"
  | "failed";

/**
 * Explicit transition map.
 * Key = current state
 * Value = allowed next states
 */
const ALLOWED_TRANSITIONS: Record<ScanStatus, ScanStatus[]> = {
  queued: ["running"],
  running: ["scanning"],
  scanning: ["scoring"],
  scoring: ["completed", "failed"],
  completed: [],
  failed: [],
};

/**
 * Validates whether a state transition is allowed.
 */
export function isValidTransition(
  from: ScanStatus,
  to: ScanStatus
): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

/**
 * Asserts a valid transition.
 * Throws a descriptive error if invalid.
 */
export function assertValidTransition(
  from: ScanStatus,
  to: ScanStatus
): void {
  if (!isValidTransition(from, to)) {
    throw new Error(
      `Invalid scan state transition: ${from} → ${to}`
    );
  }
}

/**
 * Computes the next state and validates transition.
 * This helper is useful for orchestrators.
 */
export function transitionScanState(
  current: ScanStatus,
  next: ScanStatus
): ScanStatus {
  assertValidTransition(current, next);
  return next;
}

/**
 * Indicates whether a state is terminal.
 */
export function isTerminalState(state: ScanStatus): boolean {
  return state === "completed" || state === "failed";
}
