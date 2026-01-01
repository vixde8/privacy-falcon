"use client";

import { useEffect, useState } from "react";
import { getScanResults } from "@/lib/api";

import ScoreCard from "./ScoreCard";
import VerdictCard from "./VerdictCard";
import ConfidenceBadge from "./ConfidenceBadge";
import FindingsTable from "./FindingsTable";
import DownloadReportButton from "./DownloadReportButton";

/**
 * ScanResults
 *
 * Fetches and renders the final scan report.
 * Purely presentation + data fetch.
 * NO routing, NO polling, NO flow control.
 */
export default function ScanResults({
  scanId,
}: {
  scanId: string;
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getScanResults(scanId);
        setData(res);
      } catch (err: any) {
        setError(err.message || "Failed to load scan results");
      }
    }

    load();
  }, [scanId]);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!data) {
    return <p className="text-gray-400">Loading results…</p>;
  }

  // ✅ FINAL, CORRECT CONFIDENCE RESOLUTION
  const confidence =
    data.confidence ??
    data.meta?.confidence ??
    data.explainability?.confidence ??
    0;

  const score =
    data.score ??
    data.explainability?.score ??
    0;

  const grade =
    data.grade ??
    data.explainability?.grade ??
    "-";

  return (
    <div className="space-y-10">
      {/* Executive Summary */}
      <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard score={score} grade={grade} />
          <div className="md:col-span-2">
            <VerdictCard score={score} />
          </div>
        </div>
      </section>

      {/* Confidence */}
      <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-lg font-medium">
            Assessment Confidence
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Confidence reflects signal strength, consistency, and coverage.
          </p>
        </div>

        {/* ✅ CORRECT PROP NAME */}
        <ConfidenceBadge confidence={confidence} />
      </section>

      {/* Findings */}
      <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6">
        <h2 className="text-lg font-medium mb-2">
          Findings & Evidence
        </h2>

        <FindingsTable findings={data.findings || []} />
      </section>

      {/* Actions */}
      <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-lg font-medium">
            Report Actions
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Download a shareable audit-ready PDF.
          </p>
        </div>

        <DownloadReportButton scanId={scanId} />
      </section>
    </div>
  );
}
