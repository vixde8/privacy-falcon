"use client";

/**
 * Scan Progress Poller.
 *
 * Polls backend status and redirects on completion.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getScanStatus } from "@/lib/api";
import StatusTimeline from "./StatusTimeline";

const POLL_INTERVAL = 4000;

export default function ScanProgress({
  scanId,
}: {
  scanId: string;
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let timer: any;

    async function poll() {
      try {
        const res = await getScanStatus(scanId);
        setData(res);

        if (res.status === "completed") {
          router.push(`/scan/${scanId}/results`);
          return;
        }

        if (res.status === "failed") {
          return;
        }

        timer = setTimeout(poll, POLL_INTERVAL);
      } catch (err: any) {
        setError(err.message);
      }
    }

    poll();
    return () => timer && clearTimeout(timer);
  }, [scanId, router]);

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
      <StatusTimeline
        currentPhase={data.phase}
        failed={data.status === "failed"}
      />
    </div>
  );
}
