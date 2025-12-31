/**
 * Confidence Indicator.
 *
 * Explains reliability of detected signals.
 */

export default function ConfidenceBadge({
  value,
}: {
  value: number;
}) {
  const pct = Math.round(value * 100);

  return (
    <div className="rounded border bg-white p-4">
      <p className="text-sm text-gray-500">
        Confidence
      </p>

      <p className="text-lg font-semibold">
        {pct}%
      </p>

      <p className="text-xs text-gray-400">
        Based on signal coverage and consistency
      </p>
    </div>
  );
}
