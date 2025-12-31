/**
 * Score & Grade Card.
 *
 * Primary trust signal for the user.
 */

export default function ScoreCard({
  score,
  grade,
}: {
  score: number;
  grade: string;
}) {
  return (
    <div className="rounded border bg-white p-6">
      <p className="text-sm text-gray-500">
        Overall Compliance Score
      </p>

      <div className="flex items-end gap-4">
        <p className="text-5xl font-bold">
          {score}
        </p>
        <span className="text-2xl font-semibold">
          Grade {grade}
        </span>
      </div>
    </div>
  );
}
