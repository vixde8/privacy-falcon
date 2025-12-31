/**
 * Frontend API client.
 * Frontend NEVER infers logic — only mirrors backend responses.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export async function submitScan(url: string) {
  const res = await fetch(`${API_BASE}/scans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    let message = "Failed to submit scan";
    try {
      const error = await res.json();
      message = error.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json(); // { scan_id, status, created_at }
}
