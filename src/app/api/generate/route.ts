import { NextResponse } from "next/server";

import type { GenerateRequest, VideoJob } from "@/lib/types";

/**
 * Mocked text-to-video generation endpoint.
 *
 * This is a Day-0 stand-in for the real inference backend. It validates the
 * request, simulates a render delay, and returns a finished job pointing at a
 * sample clip. Swap the body for a real backend call (using NEXT_PUBLIC_API_URL
 * and VOLFPACK_API_KEY) when the model service is ready.
 */

// A small set of royalty-free sample clips to make the demo feel alive.
const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
];

function isValid(body: Partial<GenerateRequest>): body is GenerateRequest {
  return (
    typeof body.prompt === "string" &&
    body.prompt.trim().length > 0 &&
    typeof body.aspectRatio === "string" &&
    typeof body.style === "string" &&
    typeof body.duration === "number"
  );
}

export async function POST(request: Request) {
  let body: Partial<GenerateRequest>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "A non-empty prompt, aspectRatio, style and duration are required." },
      { status: 400 },
    );
  }

  // Simulate the render taking some time.
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const videoUrl =
    SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];

  const job: VideoJob = {
    id: crypto.randomUUID(),
    prompt: body.prompt.trim(),
    status: "succeeded",
    progress: 100,
    videoUrl,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(job);
}
