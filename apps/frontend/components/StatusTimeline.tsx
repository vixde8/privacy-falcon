/**
 * Status timeline component.
 *
 * Displays scan lifecycle phases.
 * No logic, no inference — pure rendering.
 */

const PHASES = [
  "queued",
  "running",
  "crawling",
  "scoring",
  "completed",
];

export default function StatusTimeline({
  currentPhase,
  failed,
}: {
  currentPhase: string;
  failed: boolean;
}) {
  return (
    <ol className="space-y-2">
      {PHASES.map((phase) => {
        const isActive = phase === currentPhase;
        const isDone =
          PHASES.indexOf(phase) <
          PHASES.indexOf(currentPhase);

        return (
          <li
            key={phase}
            className={`flex items-center gap-2 ${
              isActive
                ? "font-semibold"
                : isDone
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            <span>
              {isDone ? "✓" : isActive ? "→" : "•"}
            </span>
            <span className="capitalize">{phase}</span>
          </li>
        );
      })}

      {failed && (
        <li className="text-red-600 font-semibold">
          ✕ Failed
        </li>
      )}
    </ol>
  );
}
