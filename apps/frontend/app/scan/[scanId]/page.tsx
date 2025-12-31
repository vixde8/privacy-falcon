/**
 * Scan status page.
 *
 * URL-driven, refresh-safe.
 */

import ScanProgress from "@/components/ScanProgress";

export default function ScanPage({
  params,
}: {
  params: { scanId: string };
}) {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">
        Scan Status
      </h1>

      <ScanProgress scanId={params.scanId} />
    </section>
  );
}
