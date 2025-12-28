"use client";

import React, { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import { easings } from "./motion-utils";

const durations = [100, 200, 300, 500, 800];

export function TimingComparisonDemo() {
  const [baseDuration, setBaseDuration] = useState(300);
  const [showCode, setShowCode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();

  const d1 = Math.round(baseDuration * 0.5);
  const d2 = baseDuration;
  const d3 = Math.round(baseDuration * 1.5);

  const playAll = async () => {
    setIsPlaying(true);
    
    await Promise.all([
      controls1.start({
        x: 200,
        transition: { duration: d1 / 1000, ease: easings.smooth as unknown as number[] },
      }),
      controls2.start({
        x: 200,
        transition: { duration: d2 / 1000, ease: easings.smooth as unknown as number[] },
      }),
      controls3.start({
        x: 200,
        transition: { duration: d3 / 1000, ease: easings.smooth as unknown as number[] },
      }),
    ]);

    setIsPlaying(false);
  };

  const resetAll = async () => {
    setIsPlaying(false);
    await Promise.all([
      controls1.set({ x: 0 }),
      controls2.set({ x: 0 }),
      controls3.set({ x: 0 }),
    ]);
  };

  const cssCode = `.element-fast {
  transition: transform ${d1}ms cubic-bezier(0.4, 0, 0.2, 1);
}

.element-normal {
  transition: transform ${d2}ms cubic-bezier(0.4, 0, 0.2, 1);
}

.element-slow {
  transition: transform ${d3}ms cubic-bezier(0.4, 0, 0.2, 1);
}`;

  const motionCode = `// Fast - small UI changes, hover states
<motion.div
  animate={{ x: 200 }}
  transition={{ duration: ${(d1 / 1000).toFixed(2)} }}
/>

// Normal - most interactions
<motion.div
  animate={{ x: 200 }}
  transition={{ duration: ${(d2 / 1000).toFixed(2)} }}
/>

// Slow - large reveals, page transitions
<motion.div
  animate={{ x: 200 }}
  transition={{ duration: ${(d3 / 1000).toFixed(2)} }}
/>`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Timing Comparison"
      description="See how different durations affect the feel of an animation. Adjust the base duration to experiment."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SliderControl
            label="Base Duration"
            value={baseDuration}
            min={100}
            max={800}
            step={50}
            onChange={setBaseDuration}
            unit="ms"
          />
          <ControlGroup label="">
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
          </ControlGroup>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetAll}
            className="flex h-8 w-8 items-center justify-center rounded bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
            aria-label="Reset"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            onClick={playAll}
            disabled={isPlaying}
            className={cn(
              "flex h-8 items-center gap-2 rounded px-4 text-sm font-medium transition-colors",
              isPlaying
                ? "bg-neutral-300 text-neutral-500 dark:bg-neutral-600"
                : "bg-swiss-red text-white hover:bg-swiss-red/90"
            )}
          >
            <Play className="size-4" />
            Play All
          </button>
        </div>

        {/* Animation tracks */}
        <div className="space-y-4">
          {/* Fast */}
          <div className="flex items-center gap-4">
            <div className="w-20 text-right">
              <span className="font-mono text-sm font-medium text-blue-500">
                {d1}ms
              </span>
              <p className="text-xs text-neutral-500">Fast</p>
            </div>
            <div className="relative h-12 flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={controls1}
                initial={{ x: 0 }}
                className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded bg-blue-500 shadow-md"
              />
            </div>
          </div>

          {/* Normal */}
          <div className="flex items-center gap-4">
            <div className="w-20 text-right">
              <span className="font-mono text-sm font-medium text-swiss-red">
                {d2}ms
              </span>
              <p className="text-xs text-neutral-500">Normal</p>
            </div>
            <div className="relative h-12 flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={controls2}
                initial={{ x: 0 }}
                className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded bg-swiss-red shadow-md"
              />
            </div>
          </div>

          {/* Slow */}
          <div className="flex items-center gap-4">
            <div className="w-20 text-right">
              <span className="font-mono text-sm font-medium text-violet-500">
                {d3}ms
              </span>
              <p className="text-xs text-neutral-500">Slow</p>
            </div>
            <div className="relative h-12 flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                animate={controls3}
                initial={{ x: 0 }}
                className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded bg-violet-500 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="grid grid-cols-3 gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div>
            <p className="text-xs font-semibold text-blue-500">100-200ms</p>
            <p className="mt-1 text-xs text-neutral-500">
              Hover states, toggles, micro-feedback
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-swiss-red">200-400ms</p>
            <p className="mt-1 text-xs text-neutral-500">
              Modals, dropdowns, standard interactions
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-violet-500">400-700ms</p>
            <p className="mt-1 text-xs text-neutral-500">
              Page transitions, large reveals
            </p>
          </div>
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

