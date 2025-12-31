import ScanResults from "@/components/ScanResults";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  const { scanId } = await params;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">
        Scan Results
      </h1>

      <ScanResults scanId={scanId} />
    </section>
  );
}
