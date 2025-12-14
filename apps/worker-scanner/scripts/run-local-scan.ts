/**
 * Local Scan Runner.
 *
 * Executes a full scan locally and persists
 * the normalized result to MongoDB.
 */

import { chromium } from "playwright";
import { MongoClient } from "mongodb";

import { observeScripts } from "../src/browser/scriptObserver";
import { observeNetwork } from "../src/browser/networkObserver";
import { collectCookies } from "../src/browser/cookieCollector";
import { detectTrackers } from "../src/detection/trackerDetector";
import { normalizeScanResult } from "../src/output/normalizeScanResult";
import { createScanRepository } from "../src/persistence/scanRepository";

async function run() {
  const url = "https://example.com";
  const startedAt = Date.now();

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const controller = new AbortController();

  const collectScripts = await observeScripts(page, controller.signal);
  const collectNetwork = await observeNetwork(page, controller.signal);

  await page.goto(url);

  const scripts = await collectScripts();
  const network = await collectNetwork();
  const cookies = await collectCookies({ context, pageUrl: url });

  const signals = detectTrackers({
    pageUrl: url,
    scripts,
    network
  });

  const finishedAt = Date.now();

  const result = normalizeScanResult({
    url,
    startedAt,
    finishedAt,
    scripts,
    network,
    cookies,
    signals
  });

  const mongo = new MongoClient("mongodb://localhost:27017");
  await mongo.connect();

  const repo = createScanRepository(mongo.db("privacy_falcon"));
  const id = await repo.save(result);

  console.log("Scan saved with id:", id);

  await mongo.close();
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
