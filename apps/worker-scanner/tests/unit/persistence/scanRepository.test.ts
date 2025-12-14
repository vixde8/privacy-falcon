/**
 * Unit tests for the Scan Repository.
 *
 * Verifies scan persistence and retrieval.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoClient } from "mongodb";
import { createScanRepository } from "../../../src/persistence/scanRepository";

let client: MongoClient;

describe("Scan Repository", () => {
  beforeAll(async () => {
    client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
  });

  afterAll(async () => {
    await client.db("pf_test").dropDatabase();
    await client.close();
  });

  it("saves and retrieves scans", async () => {
    const db = client.db("pf_test");
    const repo = createScanRepository(db);

    const id = await repo.save({
      meta: {
        url: "https://example.com",
        startedAt: 1,
        finishedAt: 2
      },
      scripts: [],
      network: [],
      cookies: [],
      signals: []
    });

    const results = await repo.findByUrl("https://example.com");

    expect(results.length).toBe(1);
    expect(results[0].meta.url).toBe("https://example.com");
    expect(id).toBeDefined();
  });
});
