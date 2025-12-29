/**
 * Dedicated Capture Routes for Animation Examples
 *
 * Shows a single example in isolation, optimized for GIF capture.
 * Minimal chrome, auto-play animations, perfect framing.
 *
 * Routes:
 *   /capture/border-beam
 *   /capture/easing-playground
 *   /capture/timing-comparison
 *   /capture/spring-physics
 */

import { CaptureClient, EXAMPLE_MAP } from "./capture-client";

interface PageProps {
  params: Promise<{ "example-id": string }>;
}

export default async function CapturePage({ params }: PageProps) {
  const { "example-id": exampleId } = await params;
  return <CaptureClient exampleId={exampleId} />;
}

// Generate static params for all examples (optional - for build optimization)
export function generateStaticParams() {
  return Object.keys(EXAMPLE_MAP).map((id) => ({
    "example-id": id,
  }));
}
