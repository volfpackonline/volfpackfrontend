import type { ClipResult, IngestRequest } from "@/lib/types";

/**
 * Ingests a source URL and returns the produced short. Talks to the local
 * mocked route by default; point NEXT_PUBLIC_API_URL at a real backend to swap
 * in the live pipeline.
 */
export async function ingestVideo(
  input: IngestRequest,
  signal?: AbortSignal,
): Promise<ClipResult> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(`${base}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal,
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(data?.error ?? "Processing failed. Please try again.");
  }

  return (await res.json()) as ClipResult;
}
