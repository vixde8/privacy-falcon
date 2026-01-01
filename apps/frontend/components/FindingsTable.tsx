/**
 * Findings Table.
 *
 * Lists detected trackers / signals.
 * Neutral, non-accusatory language.
 */

export default function FindingsTable({
  findings = [],
}: {
  findings?: any[];
}) {
  if (!findings.length) {
    return (
      <p className="text-sm text-gray-400">
        No detectable tracking signals were observed during the scan.
        This typically indicates minimal third-party tracking behavior.
      </p>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b border-white/10">
          <th className="py-2">Identifier</th>
          <th className="py-2">Category</th>
          <th className="py-2">Severity</th>
          <th className="py-2">Confidence</th>
        </tr>
      </thead>

      <tbody>
        {findings.map((f: any) => (
          <tr key={f.id} className="border-b border-white/5">
            <td className="py-2">{f.id}</td>
            <td className="py-2">{f.category}</td>
            <td className="py-2">{f.severity}</td>
            <td className="py-2">{f.confidence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
