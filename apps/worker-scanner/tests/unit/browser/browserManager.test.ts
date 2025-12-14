/**
 * Unit tests for the Browser Manager.
 *
 * Verifies that browser resources are created and cleaned up correctly.
 */

import { describe, it, expect } from "vitest";
import { createBrowser } from "../../../src/browser/browserManager";

describe("Browser Manager", () => {
  it("creates a browser handle with page and close()", async () => {
    const controller = new AbortController();

    const handle = await createBrowser(controller.signal);

    expect(handle.page).toBeDefined();
    expect(typeof handle.close).toBe("function");

    await handle.close();
  });
});
