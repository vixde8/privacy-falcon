/**
 * Score Card.
 *
 * Displays overall compliance score and grade.
 */

export default function ScoreCard({
  score,
  grade,
}: {
  score: number;
  grade: string;
}) {
  return (
    <div className="h-full rounded-xl bg-[#0F172A] border border-white/10 p-6 flex flex-col justify-center">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Overall Compliance Score
      </p>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-5xl font-bold text-white">
          {score}
        </span>
        <span className="text-lg font-semibold text-cyan-400">
          Grade {grade}
        </span>
      </div>
    </div>
  );
}
