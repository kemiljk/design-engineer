"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Settings, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ReducedMotionDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [showCode, setShowCode] = useState(false);
  
  // In a real app, this hook detects OS settings
  const systemReducedMotion = useReducedMotion();
  const shouldReduceMotion = simulateReduced || systemReducedMotion;

  const cssCode = `@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: fade-in 0.2s ease-out;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .modal {
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
}`;

  const motionCode = `import { motion, useReducedMotion } from "motion/react";

function Modal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 100 
      }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.5 
      }}
    />
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Respecting User Preferences"
      description="Users with vestibular disorders may need to disable large movements. Replace motion with opacity fades."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Simulation">
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <input 
                type="checkbox" 
                checked={simulateReduced}
                onChange={(e) => setSimulateReduced(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              prefers-reduced-motion
            </label>
          </ControlGroup>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="relative flex h-80 items-center justify-center rounded-[24px] border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-[12px] bg-white px-6 py-3 font-semibold text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 hover:shadow-md dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <Settings className="size-5" />
            Open Settings
          </button>

          {isOpen && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ 
                  opacity: 0, 
                  scale: shouldReduceMotion ? 1 : 0.9,
                  y: shouldReduceMotion ? 0 : 40 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0 
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative w-full max-w-sm overflow-hidden rounded-[20px] bg-white p-6 shadow-2xl dark:bg-neutral-900"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Settings</h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-neutral-100 p-1 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                        <div className="space-y-1">
                          <div className="h-4 w-24 rounded bg-neutral-100 dark:bg-neutral-800" />
                          <div className="h-3 w-16 rounded bg-neutral-50 dark:bg-neutral-800/50" />
                        </div>
                      </div>
                      <div className="h-6 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-[8px] px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-[8px] bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Motion Sensitivity
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Large movements (scaling, sliding) can trigger dizziness or nausea. Fading opacity is a safe alternative that still communicates state change.
            </p>
          </div>
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              `useReducedMotion`
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Motion's hook automatically detects the OS setting. Use it to conditionally change your animation props.
            </p>
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
