"use client";

/**
 * Scan Results Container.
 *
 * Responsibilities:
 * - Fetch final scan results
 * - Render score, confidence, findings
 * - No inference, no business logic
 */

import { useEffect, useState } from "react";
import { getScanResults } from "@/lib/api";
import ScoreCard from "./ScoreCard";
import ConfidenceBadge from "./ConfidenceBadge";
import FindingsTable from "./FindingsTable";

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
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  if (!data) {
    return <p>Loading results…</p>;
  }

  return (
    <div className="space-y-6">
      <ScoreCard
        score={data.score}
        grade={data.grade}
      />

      <ConfidenceBadge
        value={data.confidence}
      />

      <FindingsTable
        findings={data.findings || []}
      />
    </div>
  );
}
