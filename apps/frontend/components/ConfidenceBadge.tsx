/**
 * Confidence Badge.
 *
 * Displays confidence percentage for the assessment.
 */

export default function ConfidenceBadge({
  confidence = 0,
}: {
  confidence?: number;
}) {
  const pct = Math.round(confidence * 100);

  return (
    <div className="rounded-xl bg-[#0F172A] border border-white/10 px-5 py-4 text-center min-w-[160px]">
      <p className="text-xs text-gray-400 uppercase tracking-wide">
        Confidence
      </p>

      <p className="mt-1 text-3xl font-semibold text-white">
        {pct}%
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Based on signal coverage and consistency
      </p>
    </div>
  );
}
