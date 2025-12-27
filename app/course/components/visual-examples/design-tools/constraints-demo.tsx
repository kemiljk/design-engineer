"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";

type ConstraintExample = "header" | "fab" | "centered" | "sidebar";

export function ConstraintsDemo() {
  const [example, setExample] = useState<ConstraintExample>("header");
  const [containerWidth, setContainerWidth] = useState(100);

  const examples: Record<ConstraintExample, {
    name: string;
    horizontal: string;
    vertical: string;
    description: string;
  }> = {
    header: {
      name: "Header",
      horizontal: "Left & Right",
      vertical: "Top",
      description: "Stretches full width, stays pinned to top",
    },
    fab: {
      name: "FAB",
      horizontal: "Right",
      vertical: "Bottom",
      description: "Stays in bottom-right corner at fixed distance",
    },
    centered: {
      name: "Modal",
      horizontal: "Centre",
      vertical: "Centre",
      description: "Stays centred regardless of container size",
    },
    sidebar: {
      name: "Sidebar",
      horizontal: "Left",
      vertical: "Top & Bottom",
      description: "Fixed width, stretches full height",
    },
  };

  return (
    <ExampleWrapper
      title="Constraints"
      description="How elements stay positioned when their parent resizes"
      controls={
        <div className="flex flex-wrap items-center gap-4">
          <ControlGroup label="Example">
            <ControlButton active={example === "header"} onClick={() => setExample("header")}>
              Header
            </ControlButton>
            <ControlButton active={example === "fab"} onClick={() => setExample("fab")}>
              FAB
            </ControlButton>
            <ControlButton active={example === "centered"} onClick={() => setExample("centered")}>
              Modal
            </ControlButton>
            <ControlButton active={example === "sidebar"} onClick={() => setExample("sidebar")}>
              Sidebar
            </ControlButton>
          </ControlGroup>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Resize:</span>
            <input
              type="range"
              min={60}
              max={100}
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
              className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
            />
          </div>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Live Preview */}
        <div className="relative">
          <motion.div
            className="relative mx-auto overflow-hidden rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900"
            animate={{ width: `${containerWidth}%` }}
            style={{ height: 200 }}
            transition={{ duration: 0.3 }}
          >
            {/* Corner markers */}
            <div className="absolute left-1 top-1 h-2 w-2 border-l-2 border-t-2 border-neutral-300 dark:border-neutral-600" />
            <div className="absolute right-1 top-1 h-2 w-2 border-r-2 border-t-2 border-neutral-300 dark:border-neutral-600" />
            <div className="absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-600" />
            <div className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-600" />

            {example === "header" && (
              <motion.div
                className="absolute left-2 right-2 top-2 flex h-10 items-center justify-between rounded bg-neutral-800 px-3 dark:bg-neutral-200"
                layout
              >
                <div className="h-4 w-12 rounded bg-neutral-600 dark:bg-neutral-400" />
                <div className="flex gap-2">
                  <div className="h-4 w-8 rounded bg-neutral-600 dark:bg-neutral-400" />
                  <div className="h-4 w-8 rounded bg-neutral-600 dark:bg-neutral-400" />
                </div>
              </motion.div>
            )}

            {example === "fab" && (
              <motion.div
                className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-swiss-red text-white shadow-lg"
                layout
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}

            {example === "centered" && (
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-24 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg bg-white shadow-xl dark:bg-neutral-800"
                layout
              >
                <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-600" />
                <div className="h-2 w-20 rounded bg-neutral-100 dark:bg-neutral-700" />
                <div className="h-6 w-14 rounded bg-swiss-red" />
              </motion.div>
            )}

            {example === "sidebar" && (
              <motion.div
                className="absolute bottom-2 left-2 top-2 flex w-16 flex-col gap-2 rounded bg-neutral-800 p-2 dark:bg-neutral-200"
                layout
              >
                <div className="h-6 w-6 rounded bg-neutral-600 dark:bg-neutral-400" />
                <div className="mt-2 h-4 w-full rounded bg-neutral-700 dark:bg-neutral-300" />
                <div className="h-4 w-full rounded bg-neutral-700 dark:bg-neutral-300" />
                <div className="h-4 w-full rounded bg-neutral-700 dark:bg-neutral-300" />
              </motion.div>
            )}
          </motion.div>
          <p className="mt-3 text-center text-xs text-neutral-500">
            ↔ Drag the slider to resize the container
          </p>
        </div>

        {/* Figma-style Constraints Panel */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="8" cy="8" r="2" fill="currentColor" />
            </svg>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Constraints
            </span>
          </div>

          <div className="p-4 space-y-4">
            {/* Visual constraint indicator */}
            <div className="flex justify-center">
              <div className="relative h-20 w-20 rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900">
                {/* Horizontal constraints */}
                <div className={cn(
                  "absolute left-1 top-1/2 h-0.5 w-3 -translate-y-1/2 transition-colors",
                  examples[example].horizontal.includes("Left") ? "bg-swiss-red" : "bg-neutral-200 dark:bg-neutral-700"
                )} />
                <div className={cn(
                  "absolute right-1 top-1/2 h-0.5 w-3 -translate-y-1/2 transition-colors",
                  examples[example].horizontal.includes("Right") ? "bg-swiss-red" : "bg-neutral-200 dark:bg-neutral-700"
                )} />

                {/* Vertical constraints */}
                <div className={cn(
                  "absolute left-1/2 top-1 h-3 w-0.5 -translate-x-1/2 transition-colors",
                  examples[example].vertical.includes("Top") ? "bg-swiss-red" : "bg-neutral-200 dark:bg-neutral-700"
                )} />
                <div className={cn(
                  "absolute bottom-1 left-1/2 h-3 w-0.5 -translate-x-1/2 transition-colors",
                  examples[example].vertical.includes("Bottom") ? "bg-swiss-red" : "bg-neutral-200 dark:bg-neutral-700"
                )} />

                {/* Centre dot */}
                <div className={cn(
                  "absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors",
                  examples[example].horizontal === "Centre" || examples[example].vertical === "Centre"
                    ? "bg-swiss-red"
                    : "bg-neutral-300 dark:bg-neutral-600"
                )} />
              </div>
            </div>

            {/* Constraint labels */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                  Horizontal
                </span>
                <span className="rounded bg-white px-2 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {examples[example].horizontal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                  Vertical
                </span>
                <span className="rounded bg-white px-2 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                  {examples[example].vertical}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded bg-white p-2 text-center text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              {examples[example].description}
            </div>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

