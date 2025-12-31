"use client";

import { useEffect, useState } from "react";
import { getScanResults } from "@/lib/api";
import ScoreCard from "./ScoreCard";
import ConfidenceBadge from "./ConfidenceBadge";
import FindingsTable from "./FindingsTable";
import VerdictCard from "./VerdictCard";
import DownloadReportButton from "./DownloadReportButton";

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
        setError(err.message);
      }
    }

    load();
  }, [scanId]);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!data) {
    return <p>Loading results…</p>;
  }

  return (
    <div className="space-y-6">
      <ScoreCard score={data.score} grade={data.grade} />

      <VerdictCard score={data.score} />

      <ConfidenceBadge value={data.confidence} />

      <FindingsTable findings={data.findings || []} />

      <DownloadReportButton scanId={scanId} />
    </div>
  );
}
