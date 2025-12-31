/**
 * Verdict Card
 *
 * Converts score into human-readable risk language.
 * No legal claims. Neutral tone.
 */

export default function VerdictCard({
  score,
}: {
  score: number;
}) {
  let verdict = "Low Risk";
  let description =
    "No significant privacy or compliance risks were detected based on observed signals.";
  let color = "text-green-400";

  if (score < 85) {
    verdict = "Medium Risk";
    description =
      "Some signals may require attention depending on jurisdiction and usage context.";
    color = "text-amber-400";
  }

  if (score < 60) {
    verdict = "High Risk";
    description =
      "Multiple signals indicate potential compliance concerns that may require remediation.";
    color = "text-red-400";
  }

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1f2933] p-6">
      <p className="text-sm text-gray-400">
        Verdict
      </p>

      <p className={`text-2xl font-semibold mt-1 ${color}`}>
        {verdict}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}
