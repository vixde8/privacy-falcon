/**
 * Scan submitted confirmation.
 *
 * Trust signals:
 * - Explicit scan ID
 * - Clear success message
 * - Link to progress page
 */

import Link from "next/link";

export default function ScanSubmitted({
  scanId,
}: {
  scanId: string;
}) {
  return (
    <div className="rounded border bg-white p-4 space-y-3 max-w-xl">
      <p className="font-semibold text-green-700">
        Scan submitted successfully
      </p>

      <p className="text-sm">
        <strong>Scan ID:</strong> {scanId}
      </p>

      <Link
        href={`/scan/${scanId}`}
        className="inline-block text-blue-600 underline"
      >
        View scan progress →
      </Link>
    </div>
  );
}
