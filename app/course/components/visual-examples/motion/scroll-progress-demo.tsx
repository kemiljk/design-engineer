"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
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
}`;

  const motionCode = `import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

function ReadingProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
      />
      <div ref={containerRef} className="overflow-y-auto">
        {/* Content... */}
      </div>
    </>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Scroll Progress Indicator"
      description="Visual feedback showing how far the user has scrolled through content."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Style">
            {(["bar", "circle", "segments"] as const).map((s) => (
              <ControlButton key={s} active={style === s} onClick={() => setStyle(s)}>
                {s}
              </ControlButton>
            ))}
          </ControlGroup>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Reader Device Mockup */}
        <div className="relative mx-auto max-w-sm">
          {/* Device Frame */}
          <div
            className="relative overflow-hidden bg-white shadow-2xl dark:bg-neutral-900"
            style={{
              borderRadius: 32,
              border: "8px solid #1a1a1a",
              height: 480,
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-3 z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

            {/* Progress indicators */}
            {style === "bar" && (
              <div className="absolute left-0 right-0 top-0 z-20 h-16 bg-white/90 backdrop-blur-md dark:bg-neutral-900/90">
                <motion.div
                  style={{ scaleX }}
                  className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-indigo-600 dark:bg-indigo-500"
                />
                <div className="flex h-full items-end justify-center pb-3">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">The Art of Motion</span>
                </div>
              </div>
            )}

            {style === "circle" && (
              <div className="absolute bottom-6 right-6 z-20">
                <svg width="48" height="48" className="rotate-[-90deg]">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    strokeWidth="4"
                    className="fill-white stroke-neutral-100 shadow-sm dark:fill-neutral-800 dark:stroke-neutral-700"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="stroke-indigo-600 dark:stroke-indigo-500"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-neutral-900 dark:text-white">
                  <motion.span>
                    {useSpring(scrollYProgress, { stiffness: 100, damping: 30 }).get().toFixed(0)}%
                  </motion.span>
                </div>
              </div>
            )}

            {style === "segments" && (
              <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 bg-white/90 p-2 pt-12 backdrop-blur-md dark:bg-neutral-900/90">
                {[0, 0.25, 0.5, 0.75].map((threshold, i) => (
                  <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <motion.div
                      className="h-full w-full bg-indigo-600 origin-left dark:bg-indigo-500"
                      style={{
                        scaleX: useTransform(
                          scrollYProgress,
                          [threshold, threshold + 0.25],
                          [0, 1]
                        ),
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Scrollable Content */}
            <div
              ref={containerRef}
              className="h-full overflow-y-auto bg-white dark:bg-neutral-900"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className={cn("px-6 pb-12", style === "bar" ? "pt-20" : "pt-12")}>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">The Power of Motion</h2>
                <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                  <p>
                    Motion design is not just about making things move. It&apos;s about creating a
                    narrative, guiding the user&apos;s attention, and providing meaningful feedback.
                  </p>
                  <p>
                    When we scroll, we expect a relationship between our gesture and the content. A
                    progress indicator bridges this gap, offering a spatial map of our journey.
                  </p>
                  <div className="my-6 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                      alt="Abstract fluid art"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">Why It Matters</h3>
                  <p>
                    Users often scan content before reading. Knowing how long an article is helps
                    them commit to the experience. It reduces anxiety and sets expectations.
                  </p>
                  <p>
                    Consider the context. For infinite feeds, a progress bar is misleading. For
                    finite stories, it&apos;s essential navigation.
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">Implementation</h3>
                  <p>
                    With modern CSS scroll-driven animations, we can achieve this effect performantly
                    on the compositor thread, meaning no jank even if the main thread is busy.
                  </p>
                  <p>
                    The examples above demonstrate different ways to visualize this data. A simple
                    bar is standard, but circular indicators can be less intrusive on mobile.
                  </p>
                  <div className="mt-8 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200">
                    <strong>Pro Tip:</strong> Use spring physics for the progress value to smooth out
                    sudden jumps in scroll position.
                  </div>
                  <div className="h-24" /> {/* Spacer */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
