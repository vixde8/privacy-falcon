"use client";

/**
 * Scan progress container.
 *
 * Responsibilities:
 * - Poll backend for status
 * - Stop polling on terminal state
 * - Render timeline + failure reason
 */

import { useEffect, useState } from "react";
import { getScanStatus } from "@/lib/api";
import StatusTimeline from "./StatusTimeline";

const POLL_INTERVAL = 4000; // ms

export default function ScanProgress({
  scanId,
}: {
  scanId: string;
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;

    async function poll() {
      try {
        const res = await getScanStatus(scanId);
        setData(res);

        if (
          res.status === "completed" ||
          res.status === "failed"
        ) {
          return;
        }

        timer = setTimeout(poll, POLL_INTERVAL);
      } catch (err: any) {
        setError(err.message || "Unable to fetch scan status");
      }
    }

    poll();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [scanId]);

  if (error) {
    return (
      <p className="text-red-600">
        Error: {error}
      </p>
    );
  }

  if (!data) {
    return <p>Loading scan status…</p>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded border bg-white p-4">
        <p className="text-sm text-gray-500">
          Scan ID
        </p>
        <p className="font-mono text-sm">
          {scanId}
        </p>
      </div>

      <div className="rounded border bg-white p-4">
        <p className="font-semibold mb-2">
          Scan Progress
        </p>

        <StatusTimeline
          currentPhase={data.phase}
          failed={data.status === "failed"}
        />
      </div>

      {data.status === "failed" && (
        <div className="rounded border border-red-300 bg-red-50 p-4">
          <p className="font-semibold text-red-700">
            Scan failed
          </p>
          <p className="text-sm text-red-600">
            {data.error ||
              "Scan could not be completed."}
          </p>
        </div>
      )}

      {data.status === "completed" && (
        <p className="text-green-700 font-semibold">
          Scan completed. Results will be available shortly.
        </p>
      )}
    </div>
  );
}
