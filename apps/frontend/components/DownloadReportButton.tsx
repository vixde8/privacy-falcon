"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

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
      className="rounded-md bg-[#22D3EE] px-4 py-2 text-sm font-medium text-black hover:bg-[#06B6D4]"
    >
      Download Report (PDF)
    </button>
  );
}
