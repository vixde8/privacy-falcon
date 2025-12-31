/**
 * Frontend API client.
 *
 * Frontend NEVER infers logic.
 * It only mirrors backend responses.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

/**
 * Submit a new scan.
 */
export async function submitScan(url: string) {
  const res = await fetch(`${API_BASE}/scans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_url: url,
      ruleset_version: "latest",
    }),
  });

  if (!res.ok) {
    let message = "Failed to submit scan";
    try {
      const error = await res.json();
      message = error.detail || message;
    } catch {}
    throw new Error(message);
  }

  return res.json(); // { scan_id, status }
}

/**
 * Fetch scan status.
 */
export async function getScanStatus(scanId: string) {
  const res = await fetch(
    `${API_BASE}/scans/${scanId}/status`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    let message = "Failed to fetch scan status";
    try {
      const error = await res.json();
      message = error.detail || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

/**
 * Fetch scan results.
 */
export async function getScanResults(scanId: string) {
  const res = await fetch(
    `${API_BASE}/scans/${scanId}/results`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    let message = "Results not available yet";
    try {
      const error = await res.json();
      message = error.detail || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}
