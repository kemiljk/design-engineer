"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";

type SizingMode = "fixed" | "hug" | "fill";

export function SizingBehaviorsDemo() {
  const [containerWidth, setContainerWidth] = useState(100);
  const [labelSizing, setLabelSizing] = useState<SizingMode>("fixed");
  const [inputSizing, setInputSizing] = useState<SizingMode>("fill");
  const [buttonSizing, setButtonSizing] = useState<SizingMode>("hug");

  return (
    <ExampleWrapper
      title="Sizing Behaviours"
      description="Experiment with how children behave when the container resizes"
      controls={
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-neutral-500">Container Width</span>
          <input
            type="range"
            min={50}
            max={100}
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
          />
          <span className="font-mono text-xs text-neutral-500">{containerWidth}%</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Live Preview */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <motion.div
            className="mx-auto flex items-center gap-3 overflow-hidden rounded border border-dashed border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-600 dark:bg-neutral-800"
            animate={{ width: `${containerWidth}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Label */}
            <motion.div
              className={cn(
                "flex h-9 shrink-0 items-center justify-center rounded px-3 text-xs font-medium",
                "bg-swiss-red/10 text-swiss-red"
              )}
              animate={{
                width: labelSizing === "fixed" ? 80 : "auto",
                flexGrow: labelSizing === "fill" ? 1 : 0,
                flexShrink: labelSizing === "hug" ? 0 : (labelSizing === "fill" ? 1 : 0),
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Label
            </motion.div>

            {/* Input */}
            <motion.div
              className={cn(
                "flex h-9 items-center rounded border border-neutral-300 bg-white px-3 text-xs text-neutral-400 dark:border-neutral-600 dark:bg-neutral-900"
              )}
              animate={{
                width: inputSizing === "fixed" ? 120 : "auto",
                flexGrow: inputSizing === "fill" ? 1 : 0,
                flexShrink: inputSizing === "hug" ? 0 : (inputSizing === "fill" ? 1 : 0),
                minWidth: inputSizing === "hug" ? 80 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {inputSizing === "fill" ? "Fills remaining space..." : "Input"}
            </motion.div>

            {/* Button */}
            <motion.div
              className={cn(
                "flex h-9 shrink-0 items-center justify-center rounded px-4 text-xs font-medium",
                "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              )}
              animate={{
                width: buttonSizing === "fixed" ? 100 : "auto",
                flexGrow: buttonSizing === "fill" ? 1 : 0,
                flexShrink: buttonSizing === "hug" ? 0 : (buttonSizing === "fill" ? 1 : 0),
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Submit
            </motion.div>
          </motion.div>
        </div>

        {/* Figma-style Panel */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
              <rect x="2" y="5" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M6 5v6M10 5v6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Child Sizing
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4">
            {/* Label sizing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm bg-swiss-red" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Label</span>
              </div>
              <div className="flex flex-col gap-1">
                <SizingButton mode="fixed" active={labelSizing === "fixed"} onClick={() => setLabelSizing("fixed")} />
                <SizingButton mode="hug" active={labelSizing === "hug"} onClick={() => setLabelSizing("hug")} />
                <SizingButton mode="fill" active={labelSizing === "fill"} onClick={() => setLabelSizing("fill")} />
              </div>
            </div>

            {/* Input sizing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm border border-neutral-400" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Input</span>
              </div>
              <div className="flex flex-col gap-1">
                <SizingButton mode="fixed" active={inputSizing === "fixed"} onClick={() => setInputSizing("fixed")} />
                <SizingButton mode="hug" active={inputSizing === "hug"} onClick={() => setInputSizing("hug")} />
                <SizingButton mode="fill" active={inputSizing === "fill"} onClick={() => setInputSizing("fill")} />
              </div>
            </div>

            {/* Button sizing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm bg-neutral-900 dark:bg-white" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Button</span>
              </div>
              <div className="flex flex-col gap-1">
                <SizingButton mode="fixed" active={buttonSizing === "fixed"} onClick={() => setButtonSizing("fixed")} />
                <SizingButton mode="hug" active={buttonSizing === "hug"} onClick={() => setButtonSizing("hug")} />
                <SizingButton mode="fill" active={buttonSizing === "fill"} onClick={() => setButtonSizing("fill")} />
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="rounded bg-neutral-100 p-3 text-center text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          {labelSizing === "fixed" && inputSizing === "fill" && buttonSizing === "hug" ? (
            <span className="text-green-600 dark:text-green-400">
              ✓ Recommended pattern: Label fixed, Input fills, Button hugs its content
            </span>
          ) : (
            <span>
              Try: Label = Fixed, Input = Fill, Button = Hug for the standard form row pattern
            </span>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}

function SizingButton({ mode, active, onClick }: { mode: SizingMode; active: boolean; onClick: () => void }) {
  const labels: Record<SizingMode, { label: string; icon: React.ReactNode }> = {
    fixed: {
      label: "Fixed",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="3" y="5" width="8" height="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    hug: {
      label: "Hug",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 7h6M4 5v4M10 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    fill: {
      label: "Fill",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M2 5l2 2-2 2M12 5l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };

  const { label, icon } = labels[mode];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded px-2 py-1.5 text-[11px] font-medium transition-colors",
        active
          ? "bg-swiss-red text-white"
          : "bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

