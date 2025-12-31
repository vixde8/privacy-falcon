/**
 * Findings Table.
 *
 * Lists detected trackers / signals.
 * Neutral, non-accusatory language.
 */

export default function FindingsTable({
  findings,
}: {
  findings: any[];
}) {
  if (!findings.length) {
    return (
      <p className="text-gray-500">
        No detectable tracking signals found.
      </p>
    );
  }

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="font-semibold mb-3">
        Detected Signals
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Identifier</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Confidence</th>
          </tr>
        </thead>

        <tbody>
          {findings.map((f) => (
            <tr key={f.id} className="border-t">
              <td>{f.id}</td>
              <td>{f.category}</td>
              <td>{f.severity}</td>
              <td>{f.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
