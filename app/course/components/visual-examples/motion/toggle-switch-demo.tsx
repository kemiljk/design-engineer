"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ToggleSwitchDemo() {
  const [isOn, setIsOn] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `.toggle {
  width: 56px;
  height: 32px;
  background: var(--neutral-300);
  border-radius: 16px;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle[data-state="checked"] {
  background: #ff4400;
}

.toggle-thumb {
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle[data-state="checked"] .toggle-thumb {
  transform: translateX(24px);
}`;

  const motionCode = `import { motion } from "motion/react";
import { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={cn(
        "relative h-8 w-14 rounded-full p-0.5 transition-colors",
        isOn ? "bg-swiss-red" : "bg-neutral-300"
      )}
      role="switch"
      aria-checked={isOn}
    >
      <motion.div
        className="h-7 w-7 rounded-full bg-white shadow-md"
        initial={false}
        animate={{ x: isOn ? 24 : 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Toggle Switch"
      description="iOS-inspired toggle with spring physics for a satisfying bounce."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <span className="text-xs text-neutral-500">
              State: {isOn ? "On" : "Off"}
            </span>
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
      <div className="space-y-8">
        {/* Interactive toggle */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-24 items-center justify-center gap-8 rounded-lg bg-neutral-100 px-12 dark:bg-neutral-800">
            <button
              onClick={() => setIsOn(!isOn)}
              className={cn(
                "relative h-8 w-14 rounded-full p-0.5 transition-colors duration-200",
                isOn ? "bg-swiss-red" : "bg-neutral-300 dark:bg-neutral-600"
              )}
              role="switch"
              aria-checked={isOn}
            >
              <motion.div
                className="h-7 w-7 rounded-full bg-white shadow-md"
                initial={false}
                animate={{ x: isOn ? 24 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </button>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {isOn ? "Enabled" : "Disabled"}
            </span>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Click the toggle to see the spring physics in action
          </p>
        </div>

        {/* Variants */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Small */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Small</p>
            <button
              className={cn(
                "relative h-5 w-9 rounded-full p-0.5 transition-colors duration-200",
                "bg-swiss-red"
              )}
              role="switch"
              aria-checked={true}
            >
              <div className="h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* With icon */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">With Icons</p>
            <button
              className={cn(
                "relative flex h-8 w-14 items-center rounded-full px-1 transition-colors duration-200",
                "bg-swiss-red"
              )}
              role="switch"
              aria-checked={true}
            >
              <span className="text-[10px] text-white/80">☀</span>
              <div className="ml-auto h-6 w-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Label inside */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">With Label</p>
            <button
              className={cn(
                "relative h-8 w-20 rounded-full transition-colors duration-200",
                "bg-neutral-300 dark:bg-neutral-600"
              )}
              role="switch"
              aria-checked={false}
            >
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-neutral-500 uppercase">
                Off
              </span>
              <div className="absolute left-0.5 top-0.5 h-7 w-7 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Spring physics explanation */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            Why Spring Physics?
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Springs create natural-feeling motion. High stiffness (500) makes it snappy, 
            while moderate damping (30) allows a subtle bounce that makes the toggle feel 
            responsive without being bouncy. Compare this to a linear transition—the spring 
            feels more physical and satisfying.
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

