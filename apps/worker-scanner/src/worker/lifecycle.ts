export type ScanState = "RECEIVED" | "RUNNING" | "COMPLETED" | "FAILED";

export function createLifecycle() {
  let state: ScanState = "RECEIVED";

  return {
    get state() {
      return state;
    },

    start() {
      if (state !== "RECEIVED") {
        throw new Error("Invalid state transition");
      }
      state = "RUNNING";
    },

    complete() {
      if (state !== "RUNNING") {
        throw new Error("Invalid state transition");
      }
      state = "COMPLETED";
    },

    fail() {
      if (state !== "RUNNING") {
        throw new Error("Invalid state transition");
      }
      state = "FAILED";
    }
  };
}
