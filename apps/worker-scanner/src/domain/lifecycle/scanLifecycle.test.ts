/**
 * Scan Lifecycle State Machine Tests.
 *
 * Verifies all legal and illegal scan state transitions.
 */

import { describe, it, expect } from "vitest";

import {
  isValidTransition,
  assertValidTransition,
  transitionScanState,
  isTerminalState,
  ScanStatus,
} from "./scanLifecycle";

const STATES: ScanStatus[] = [
  "queued",
  "running",
  "scanning",
  "scoring",
  "completed",
  "failed",
];

describe("Scan Lifecycle Transitions", () => {
  it("allows all valid transitions", () => {
    expect(isValidTransition("queued", "running")).toBe(true);
    expect(isValidTransition("running", "scanning")).toBe(true);
    expect(isValidTransition("scanning", "scoring")).toBe(true);
    expect(isValidTransition("scoring", "completed")).toBe(true);
    expect(isValidTransition("scoring", "failed")).toBe(true);
  });

  it("rejects invalid transitions", () => {
    for (const from of STATES) {
      for (const to of STATES) {
        if (!isValidTransition(from, to)) {
          expect(() =>
            assertValidTransition(from, to)
          ).toThrow();
        }
      }
    }
  });

  it("identifies terminal states correctly", () => {
    expect(isTerminalState("completed")).toBe(true);
    expect(isTerminalState("failed")).toBe(true);
    expect(isTerminalState("queued")).toBe(false);
    expect(isTerminalState("running")).toBe(false);
  });

  it("returns next state on valid transition", () => {
    const next = transitionScanState("queued", "running");
    expect(next).toBe("running");
  });
});
