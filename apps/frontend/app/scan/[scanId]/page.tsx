/**
 * Scan status page.
 *
 * URL-driven, refresh-safe.
 */

import ScanProgress from "@/components/ScanProgress";

export default async function ScanPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  const { scanId } = await params;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Scan Status</h1>
      <ScanProgress scanId={scanId} />
    </section>
  );
}
