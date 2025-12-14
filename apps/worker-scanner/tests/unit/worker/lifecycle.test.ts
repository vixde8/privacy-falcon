import { describe, it, expect } from "vitest";
import { createLifecycle } from "../../../src/worker/lifecycle";

describe("Worker lifecycle state machine", () => {
  it("starts in RECEIVED state", () => {
    const lifecycle = createLifecycle();

    expect(lifecycle.state).toBe("RECEIVED");
  });

  it("transitions from RECEIVED to RUNNING", () => {
  const lifecycle = createLifecycle();

  lifecycle.start();

  expect(lifecycle.state).toBe("RUNNING");
});

it("transitions from RUNNING to COMPLETED", () => {
  const lifecycle = createLifecycle();

  lifecycle.start();
  lifecycle.complete();

  expect(lifecycle.state).toBe("COMPLETED");
});

it("transitions from RUNNING to FAILED", () => {
  const lifecycle = createLifecycle();

  lifecycle.start();
  lifecycle.fail();

  expect(lifecycle.state).toBe("FAILED");
});

it("does not allow transitions after COMPLETED", () => {
  const lifecycle = createLifecycle();

  lifecycle.start();
  lifecycle.complete();

  expect(() => lifecycle.start()).toThrow();
  expect(() => lifecycle.fail()).toThrow();
});

it("does not allow transitions after FAILED", () => {
  const lifecycle = createLifecycle();

  lifecycle.start();
  lifecycle.fail();

  expect(() => lifecycle.complete()).toThrow();
  expect(() => lifecycle.start()).toThrow();
});

});
