import { NextResponse } from "next/server";

import type { ClipResult, IngestRequest } from "@/lib/types";

/**
 * Mocked ingest endpoint.
 *
 * A Day-0 stand-in for the real pipeline backend. It validates the request,
 * simulates processing time, and returns a finished short pointing at a sample
 * clip. Swap the body for a real backend call (using NEXT_PUBLIC_API_URL and a
 * worker queue) when the pipeline service is ready.
 */

const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
];

const SAMPLE_TITLES = [
  "The 3-hour founder Q&A nobody finished watching",
  "How we shipped to 1M users on a weekend",
  "Why most retention advice is quietly wrong",
  "A 47-minute deep dive on pricing psychology",
];

const SAMPLE_HOOKS = [
  "Nobody tells you this about your first 1,000 users.",
  "We almost shut it down the week before it blew up.",
  "This one change doubled our watch time.",
  "Stop discounting. Do this instead.",
];

function isValid(body: Partial<IngestRequest>): body is IngestRequest {
  return (
    typeof body.url === "string" &&
    /^https?:\/\/\S+$/.test(body.url.trim()) &&
    typeof body.cropStrategy === "string" &&
    typeof body.voice === "string" &&
    typeof body.language === "string" &&
    typeof body.captionStyle === "string"
  );
}

export async function POST(request: Request) {
  let body: Partial<IngestRequest>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "A valid source URL and channel settings are required." },
      { status: 400 },
    );
  }

  // Simulate the pipeline taking some time.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const i = Math.floor(Math.random() * SAMPLE_VIDEOS.length);

  const clip: ClipResult = {
    id: crypto.randomUUID(),
    sourceTitle: SAMPLE_TITLES[i],
    hook: SAMPLE_HOOKS[i],
    durationSec: 28 + Math.floor(Math.random() * 22),
    score: 78 + Math.floor(Math.random() * 20),
    videoUrl: SAMPLE_VIDEOS[i],
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(clip);
}
