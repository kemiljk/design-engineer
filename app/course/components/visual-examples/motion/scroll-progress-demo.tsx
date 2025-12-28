"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ProgressStyle = "bar" | "circle" | "segments";

export function ScrollProgressDemo() {
  const [style, setStyle] = useState<ProgressStyle>("bar");
  const [showCode, setShowCode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const cssCode = `/* CSS Scroll-Driven Progress Bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #ff4400;
  transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll();
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* For browsers without scroll-timeline support */
.progress-bar-js {
  transform: scaleX(var(--scroll-progress, 0));
  transition: transform 0.1s ease-out;
}`;

  const motionCode = `import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

function ReadingProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef, // Track specific container
    // OR for full page:
    // target: document.body,
  });

  // Optional: smooth out the progress with spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 
          bg-swiss-red origin-left z-50"
      />

      {/* Scrollable content */}
      <div ref={containerRef} className="overflow-y-auto">
        {/* Content... */}
      </div>
    </>
  );
}

// Circular progress variant
function CircularProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <svg className="w-12 h-12 fixed bottom-4 right-4">
      <circle cx="24" cy="24" r="20" className="stroke-neutral-200" />
      <motion.circle
        cx="24" cy="24" r="20"
        className="stroke-swiss-red"
        strokeDasharray="126"
        style={{ 
          pathLength: scrollYProgress,
          rotate: -90,
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  // Circle progress
  const circumference = 2 * Math.PI * 20;

  return (
    <ExampleWrapper
      title="Scroll Progress Indicator"
      description="Visual feedback showing how far the user has scrolled through content."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Style">
            {(["bar", "circle", "segments"] as const).map((s) => (
              <ControlButton
                key={s}
                active={style === s}
                onClick={() => setStyle(s)}
              >
                {s}
              </ControlButton>
            ))}
          </ControlGroup>
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              showCode
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            )}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Progress demo */}
        <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          {/* Progress indicators */}
          {style === "bar" && (
            <motion.div
              style={{ scaleX }}
              className="absolute left-0 right-0 top-0 z-10 h-1 origin-left bg-swiss-red"
            />
          )}

          {style === "circle" && (
            <div className="absolute right-3 top-3 z-10">
              <svg width="40" height="40" className="rotate-[-90deg]">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  strokeWidth="3"
                  className="stroke-neutral-200 dark:stroke-neutral-700"
                />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-swiss-red"
                  style={{
                    pathLength: scrollYProgress,
                  }}
                />
              </svg>
            </div>
          )}

          {style === "segments" && (
            <div className="absolute left-0 right-0 top-0 z-10 flex gap-1 bg-neutral-100 p-1 dark:bg-neutral-900">
              {[0, 0.25, 0.5, 0.75].map((threshold, i) => (
                <motion.div
                  key={i}
                  className="h-1 flex-1 rounded-full"
                  style={{
                    backgroundColor: scrollYProgress.get() > threshold ? "#ff4400" : "#e5e5e5",
                  }}
                />
              ))}
            </div>
          )}

          {/* Scrollable content */}
          <div
            ref={containerRef}
            className="h-64 overflow-y-auto bg-white px-6 py-4 dark:bg-neutral-900"
          >
            <article className="prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-lg font-bold">The Art of Scroll Progress</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Scroll progress indicators give users a sense of orientation within 
                long-form content. They answer the question: "How much more is there?"
              </p>
              <h3 className="mt-4 text-base font-bold">When to Use</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Progress indicators work best for:
              </p>
              <ul className="text-neutral-600 dark:text-neutral-400">
                <li>Long articles and blog posts</li>
                <li>Documentation pages</li>
                <li>Terms of service/legal documents</li>
                <li>Multi-step forms</li>
              </ul>
              <h3 className="mt-4 text-base font-bold">Design Considerations</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Keep it subtle—the progress indicator shouldn't compete with content. 
                A thin bar at the top or a small circular indicator in the corner 
                works well.
              </p>
              <h3 className="mt-4 text-base font-bold">Performance</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Use CSS scroll-driven animations where supported for best performance. 
                Fall back to JavaScript scroll listeners with requestAnimationFrame 
                or a library like Motion for smooth updates.
              </p>
              <h3 className="mt-4 text-base font-bold">Accessibility</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Consider adding aria-label or visually hidden text for screen readers. 
                The progress bar is decorative, but can be helpful context for some users.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                That's it! You've reached the end of this content. Notice how the 
                progress indicator shows 100% completion.
              </p>
            </article>
          </div>
        </div>

        {/* Style comparison */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { style: "bar", desc: "Classic top bar, minimal footprint" },
            { style: "circle", desc: "Compact, shows percentage visually" },
            { style: "segments", desc: "Shows major sections/chapters" },
          ].map((item) => (
            <div
              key={item.style}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                style === item.style
                  ? "border-swiss-red bg-swiss-red/5"
                  : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              <p className="text-xs font-semibold capitalize text-neutral-900 dark:text-white">
                {item.style}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}

