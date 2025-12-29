"use client";

import { useEffect, useState } from "react";
import {
  BorderBeamDemo,
  EasingPlaygroundDemo,
  TimingComparisonDemo,
  SpringPhysicsDemo,
} from "@/app/course/components/visual-examples/motion";

// Map of example IDs to their components
export const EXAMPLE_MAP: Record<string, React.ComponentType> = {
  "border-beam": BorderBeamDemo,
  "easing-playground": EasingPlaygroundDemo,
  "timing-comparison": TimingComparisonDemo,
  "spring-physics": SpringPhysicsDemo,
};

// Hide Next.js devtools and ensure full viewport capture
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
    [data-nextjs-dialog-overlay],
    [data-nextjs-dialog],
    nextjs-portal,
    #__next-build-indicator,
    [data-nextjs-toast] { display: none !important; }
  `;
  document.head.appendChild(style);
}

export function CaptureClient({ exampleId }: { exampleId: string }) {
  const [isReady, setIsReady] = useState(false);

  const ExampleComponent = EXAMPLE_MAP[exampleId];

  // Mark as ready after initial render (allows animations to initialize)
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-trigger animations after page is ready
  useEffect(() => {
    if (!isReady) return;

    const autoTrigger = () => {
      // Find and click any button with data-demo-trigger attribute
      const triggerButton = document.querySelector(
        "[data-demo-trigger]",
      ) as HTMLButtonElement;

      if (triggerButton && !triggerButton.disabled) {
        console.log("[Capture] Auto-triggering demo via data-demo-trigger");
        triggerButton.click();
      }
    };

    // Trigger after a short delay to ensure components are mounted
    const timer = setTimeout(autoTrigger, 800);
    return () => clearTimeout(timer);
  }, [isReady, exampleId]);

  if (!ExampleComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Example Not Found</h1>
          <p className="mt-2 text-neutral-400">
            No example with ID:{" "}
            <code className="rounded bg-neutral-800 px-2 py-1">
              {exampleId}
            </code>
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Available examples: {Object.keys(EXAMPLE_MAP).join(", ")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-50 p-6 dark:bg-neutral-950">
      {/* Capture metadata (hidden, for debugging) */}
      <div
        className="sr-only"
        data-capture-ready={isReady}
        data-example-id={exampleId}
      />

      {/* Example component - fills viewport */}
      <div className="w-full">
        <ExampleComponent />
      </div>
    </div>
  );
}
