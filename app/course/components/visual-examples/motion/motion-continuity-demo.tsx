"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Grid3X3, List, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Layout = "grid" | "list";

const items = [
  { id: 1, title: "Design", color: "bg-blue-500" },
  { id: 2, title: "Code", color: "bg-violet-500" },
  { id: 3, title: "Motion", color: "bg-emerald-500" },
  { id: 4, title: "Ship", color: "bg-amber-500" },
];

export function MotionContinuityDemo() {
  const [layout, setLayout] = useState<Layout>("grid");
  const [useTransitions, setUseTransitions] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `/* With transitions */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Layout-specific styles */
.card--grid {
  width: calc(50% - 8px);
  height: 120px;
}

.card--list {
  width: 100%;
  height: 64px;
}

/* Without transitions - jarring! */
.card--no-transition {
  transition: none;
}`;

  const motionCode = `import { motion } from "motion/react";

function LayoutSwitcher() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className={cn(
      layout === "grid" 
        ? "grid grid-cols-2 gap-4" 
        : "flex flex-col gap-2"
    )}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout // This enables layout animations!
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            "rounded-lg",
            layout === "grid" ? "h-32" : "h-16"
          )}
        >
          {item.title}
        </motion.div>
      ))}
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Motion Creates Continuity"
      description="Toggle between layouts with and without transitions to feel the difference."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <ControlGroup label="Layout">
              <ControlButton
                active={layout === "grid"}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="mr-1.5 size-3.5" />
                Grid
              </ControlButton>
              <ControlButton
                active={layout === "list"}
                onClick={() => setLayout("list")}
              >
                <List className="mr-1.5 size-3.5" />
                List
              </ControlButton>
            </ControlGroup>
            <ControlGroup label="Transitions">
              <ControlButton
                active={useTransitions}
                onClick={() => setUseTransitions(true)}
              >
                On
              </ControlButton>
              <ControlButton
                active={!useTransitions}
                onClick={() => setUseTransitions(false)}
              >
                Off
              </ControlButton>
            </ControlGroup>
          </div>
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
      <div className="space-y-8">
        {/* Side by side comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* With transitions */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                ✓ With Transitions
              </span>
            </div>
            <div
              className={cn(
                layout === "grid"
                  ? "grid grid-cols-2 gap-3"
                  : "flex flex-col gap-2"
              )}
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className={cn(
                    "flex items-center rounded-lg px-4 font-medium text-white",
                    item.color,
                    layout === "grid" ? "h-24 justify-center" : "h-12"
                  )}
                >
                  {item.title}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Without transitions */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                ✗ Without Transitions
              </span>
            </div>
            <div
              className={cn(
                layout === "grid"
                  ? "grid grid-cols-2 gap-3"
                  : "flex flex-col gap-2"
              )}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center rounded-lg px-4 font-medium text-white",
                    item.color,
                    layout === "grid" ? "h-24 justify-center" : "h-12"
                  )}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive demo */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Interactive Preview
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                useTransitions ? "text-green-500" : "text-red-500"
              )}
            >
              Transitions: {useTransitions ? "ON" : "OFF"}
            </span>
          </div>
          <div
            className={cn(
              layout === "grid"
                ? "grid grid-cols-2 gap-4 sm:grid-cols-4"
                : "flex flex-col gap-3"
            )}
          >
            {items.map((item) =>
              useTransitions ? (
                <motion.div
                  key={item.id}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className={cn(
                    "flex items-center rounded-lg px-4 font-semibold text-white shadow-sm",
                    item.color,
                    layout === "grid" ? "h-28 justify-center" : "h-14"
                  )}
                >
                  {item.title}
                </motion.div>
              ) : (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center rounded-lg px-4 font-semibold text-white shadow-sm",
                    item.color,
                    layout === "grid" ? "h-28 justify-center" : "h-14"
                  )}
                >
                  {item.title}
                </div>
              )
            )}
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>The difference:</strong> Without transitions, layout changes are jarring 
            and confusing—the brain struggles to track what moved where. With smooth 
            transitions, each element's journey is visible, maintaining spatial awareness 
            and reducing cognitive load.
          </p>
        </div>

        {/* Technical note */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            Motion's <code className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800">layout</code> prop
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Adding <code className="font-mono text-xs">layout</code> to a motion component 
            automatically animates any layout changes (size, position) using FLIP 
            (First-Last-Invert-Play) technique. No manual position tracking needed.
          </p>
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

