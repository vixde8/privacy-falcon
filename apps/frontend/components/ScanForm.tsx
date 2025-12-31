"use client";

/**
 * Scan submission form.
 *
 * Responsibilities:
 * - Validate URL
 * - Submit scan request
 * - Handle loading + error
 * - Render success confirmation
 */

import { useState } from "react";
import { submitScan } from "@/lib/api";
import ScanSubmitted from "./ScanSubmitted";

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!url || !url.startsWith("http")) {
      setError("Please enter a valid URL including http or https.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitScan(url);
      setScanId(result.scan_id);
    } catch (err: any) {
      setError(err.message || "Scan submission failed.");
    } finally {
      setLoading(false);
    }
  }

  if (scanId) {
    return <ScanSubmitted scanId={scanId} />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <input
        type="url"
        placeholder="https://example.com"
        className="w-full rounded border px-4 py-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Start Scan"}
      </button>
    </form>
  );
}
