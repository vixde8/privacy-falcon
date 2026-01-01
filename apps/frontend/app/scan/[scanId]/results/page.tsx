// ResultsDashboard.tsx (or inline inside your results page)
// IMPORTANT:
// - This file ONLY composes existing components
// - No logic changes
// - No API changes
// - No new dependencies

"use client";

import { use } from "react";

import ScanResults from "@/components/ScanResults";
import ScoreCard from "@/components/ScoreCard";
import VerdictCard from "@/components/VerdictCard";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import StatusTimeline from "@/components/StatusTimeline";
import FindingsTable from "@/components/FindingsTable";
import DownloadReportButton from "@/components/DownloadReportButton";

export default function ResultsPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  // ✅ REQUIRED in Next.js 16
  const { scanId } = use(params);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacy & Compliance Report
        </h1>
        <p className="mt-2 text-sm text-gray-400 max-w-2xl">
          Executive summary and technical findings based on observed site behavior.
        </p>
      </header>

      <ScanResults scanId={scanId}>
        {(data) => (
          <>
            {/* Executive Summary */}
            <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScoreCard score={data.score} grade={data.grade} />
                <div className="md:col-span-2">
                  <VerdictCard score={data.score} />
                </div>
              </div>
            </section>

            {/* Confidence */}
            <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">
                  Assessment Confidence
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Confidence reflects signal strength, consistency, and coverage.
                </p>
              </div>
              <ConfidenceBadge confidence={data.confidence} />
            </section>

            {/* Timeline */}
            <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6">
              <h2 className="text-lg font-medium mb-3">
                Observed Compliance Signals
              </h2>
              <StatusTimeline />
            </section>

            {/* Findings */}
            <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6">
              <h2 className="text-lg font-medium mb-2">
                Findings & Evidence
              </h2>
              <FindingsTable findings={data.findings} />
            </section>

            {/* Actions */}
            <section className="rounded-xl bg-[#0F172A] border border-white/10 p-6 flex justify-between items-center">
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
          </>
        )}
      </ScanResults>
    </div>
  );
}
