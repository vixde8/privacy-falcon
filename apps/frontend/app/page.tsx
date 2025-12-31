/**
 * Landing page.
 *
 * Purpose:
 * - Explain product briefly
 * - Allow scan submission
 */

import ScanForm from "@/components/ScanForm";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Privacy & Compliance Scan
      </h1>

      <p className="text-gray-600 max-w-2xl">
        Submit a website URL to analyze privacy signals, trackers,
        and compliance indicators.
      </p>

      <ScanForm />
    </section>
  );
}
