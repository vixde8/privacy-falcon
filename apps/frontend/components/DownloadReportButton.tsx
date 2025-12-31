/**
 * Download Report Button
 *
 * Triggers backend PDF generation.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function DownloadReportButton({
  scanId,
}: {
  scanId: string;
}) {
  const download = () => {
    window.open(
      `${API_BASE}/scans/${scanId}/report`,
      "_blank"
    );
  };

  return (
    <button
      onClick={download}
      className="rounded-md border border-[#1f2933] bg-[#0b0f14] px-4 py-2 text-sm text-gray-300 hover:border-amber-400"
    >
      Download PDF Report
    </button>
  );
}
