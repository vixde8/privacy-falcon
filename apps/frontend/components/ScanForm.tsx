"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitScan } from "@/lib/api";

/**
 * ScanForm
 *
 * Visual-first scan entry.
 * Logic intentionally unchanged.
 */
export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await submitScan(url);
      router.push(`/scan/${res.scan_id}`);
    } catch (err: any) {
      setError(err.message || "Failed to start scan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-[#0F172A] border border-white/10 p-8 space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Scan a Website
          </h1>
          <p className="text-sm text-gray-400">
            Analyze privacy and compliance signals based on observable behavior.
          </p>
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <label
            htmlFor="url"
            className="text-sm font-medium text-gray-300"
          >
            Website URL
          </label>

          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full rounded-md bg-[#020617] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium py-3 transition"
        >
          {loading ? "Starting Scan…" : "Start Privacy Scan"}
        </button>

        {/* What we analyze */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-2">
            What we analyze
          </p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Third-party trackers and network requests</li>
            <li>• Consent banners and enforcement behavior</li>
            <li>• Script execution relative to consent</li>
            <li>• Signal confidence and rule-based scoring</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
