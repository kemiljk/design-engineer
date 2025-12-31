"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type AlignmentType = "aligned" | "misaligned" | "centered";

export function AlignmentDemo() {
  const [alignment, setAlignment] = useState<AlignmentType>("aligned");
  const [showGuide, setShowGuide] = useState(true);

  const getOffsets = () => {
    switch (alignment) {
      case "aligned":
        return { title: 0, subtitle: 0, body: 0, button: 0 };
      case "misaligned":
        return { title: 12, subtitle: -8, body: 20, button: -4 };
      case "centered":
        return { title: "center", subtitle: "center", body: "center", button: "center" };
    }
  };

  const offsets = getOffsets();

  return (
    <ExampleWrapper
      title="Alignment Creates Order"
      description="See how alignment affects visual organisation"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Alignment">
            <ControlButton
              active={alignment === "aligned"}
              onClick={() => setAlignment("aligned")}
            >
              Left Aligned
            </ControlButton>
            <ControlButton
              active={alignment === "centered"}
              onClick={() => setAlignment("centered")}
            >
              Centered
            </ControlButton>
            <ControlButton
              active={alignment === "misaligned"}
              onClick={() => setAlignment("misaligned")}
            >
              Misaligned
            </ControlButton>
          </ControlGroup>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGuide}
              onChange={(e) => setShowGuide(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              Show alignment guide
            </span>
          </label>
        </div>
      }
    >
      <div className="relative mx-auto max-w-md">
        {/* Alignment guide line */}
        {showGuide && alignment !== "centered" && (
          <div
            className="absolute left-0 top-0 h-full w-0.5 bg-swiss-red/50"
          />
        )}
        {showGuide && alignment === "centered" && (
          <div
            className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-swiss-red/50"
          />
        )}

        {/* Content */}
        <div className="space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800">
          <h3
            className="text-xl font-bold text-neutral-900 dark:text-white"
            style={{
              marginLeft: typeof offsets.title === "number" ? offsets.title : 0,
              textAlign: typeof offsets.title === "string" ? offsets.title as "center" : "left",
            }}
          >
            Design Article Title
          </h3>
          
          <p
            className="text-sm text-neutral-500 dark:text-neutral-400"
            style={{
              marginLeft: typeof offsets.subtitle === "number" ? offsets.subtitle : 0,
              textAlign: typeof offsets.subtitle === "string" ? offsets.subtitle as "center" : "left",
            }}
          >
            By John Doe • 5 minute read
          </p>
          
          <p
            className="text-neutral-600 dark:text-neutral-300"
            style={{
              marginLeft: typeof offsets.body === "number" ? offsets.body : 0,
              textAlign: typeof offsets.body === "string" ? offsets.body as "center" : "left",
            }}
          >
            This is the body text of the article. Notice how alignment affects 
            the readability and visual flow of the content.
          </p>
          
          <div
            style={{
              marginLeft: typeof offsets.button === "number" ? offsets.button : 0,
            }}
            className={alignment === "centered" ? "flex justify-center" : ""}
          >
            <div className="inline-block rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">
              Read More
            </div>
          </div>
        </div>

        {/* Insight - fixed height to prevent layout shift */}
        <div className="mt-4 min-h-[2rem] text-center">
          <p className={`text-xs ${alignment === "misaligned" ? "text-swiss-red" : "text-neutral-600 dark:text-neutral-400"}`}>
            {alignment === "aligned" && "✓ Left alignment creates an invisible line that guides the eye smoothly"}
            {alignment === "centered" && "✓ Centre alignment works for short, impactful content (but harder to scan)"}
            {alignment === "misaligned" && "✗ Random offsets create visual chaos—the eye has no clear path to follow"}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
