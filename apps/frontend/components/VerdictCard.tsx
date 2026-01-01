/**
 * Verdict Card.
 *
 * Human-readable risk classification derived from score.
 */

export default function VerdictCard({
  score,
}: {
  score: number;
}) {
  const verdict =
    score >= 90 ? "Low Risk" :
    score >= 70 ? "Moderate Risk" :
    "High Risk";

  const color =
    score >= 90 ? "text-green-400" :
    score >= 70 ? "text-amber-400" :
    "text-red-400";

  return (
    <div className="rounded-xl bg-[#0F172A] border border-white/10 p-6 h-full">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Verdict
      </p>

      <h3 className={`mt-2 text-2xl font-semibold ${color}`}>
        {verdict}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        No significant privacy or compliance risks were detected
        based on observed signals.
      </p>

      <p className="mt-3 text-xs text-gray-500">
        Overall assessment derived from tracker behavior, consent enforcement,
        and rule-based confidence scoring.
      </p>
    </div>
  );
}
