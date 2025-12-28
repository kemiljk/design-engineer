"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function CssVsJsDemo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
  };

  const cssCode = `/* CSS Animation */
.card {
  opacity: 0;
  transform: translateY(20px);
}

.card.animate {
  animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CSS Hover */
.button {
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* When to use CSS:
   ✓ Simple transitions (hover, focus, active)
   ✓ Keyframe animations that don't need JS control
   ✓ Performance-critical animations
   ✓ Reduced motion media queries
*/`;

  const motionCode = `/* Motion/JavaScript Animation */
import { motion, AnimatePresence } from "motion/react";

// Declarative animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
/>

// Gesture-based animation
<motion.button
  whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
  whileTap={{ scale: 0.98 }}
/>

// Exit animations (not possible in CSS alone)
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // ← This!
    />
  )}
</AnimatePresence>

// When to use Motion/JS:
// ✓ Enter/exit animations
// ✓ Gesture-based animations
// ✓ Physics-based motion (springs)
// ✓ Orchestrated animations
// ✓ Scroll-linked animations
// ✓ Layout animations`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="CSS vs JavaScript Animation"
      description="Both achieve similar results—choose based on your specific needs."
      controls={
        <div className="flex items-center justify-between">
          <button
            onClick={triggerAnimation}
            className="rounded-md bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
          >
            Replay Animation
          </button>
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
        {/* Side-by-side comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* CSS Side */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                CSS Animation
              </span>
            </div>
            <div className="flex h-32 items-center justify-center rounded-lg bg-white dark:bg-neutral-900">
              <div
                className={cn(
                  "flex h-20 w-36 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white shadow-lg",
                  isAnimating ? "animate-[slideInUp_0.5s_ease-out_forwards]" : "opacity-0 translate-y-5"
                )}
              >
                CSS Card
              </div>
            </div>
          </div>

          {/* Motion Side */}
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-900/20">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-violet-500" />
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-400">
                Motion Animation
              </span>
            </div>
            <div className="flex h-32 items-center justify-center rounded-lg bg-white dark:bg-neutral-900">
              <motion.div
                key={isAnimating ? "animate" : "reset"}
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="flex h-20 w-36 items-center justify-center rounded-lg bg-violet-500 font-semibold text-white shadow-lg"
              >
                Motion Card
              </motion.div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                <th className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white">
                  Feature
                </th>
                <th className="px-4 py-2 text-center font-semibold text-blue-600 dark:text-blue-400">
                  CSS
                </th>
                <th className="px-4 py-2 text-center font-semibold text-violet-600 dark:text-violet-400">
                  Motion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { feature: "Hover/Focus states", css: "✓", motion: "✓" },
                { feature: "Keyframe animations", css: "✓", motion: "✓" },
                { feature: "Exit animations", css: "✗", motion: "✓" },
                { feature: "Spring physics", css: "✗", motion: "✓" },
                { feature: "Gesture-based", css: "Limited", motion: "✓" },
                { feature: "Layout animations", css: "✗", motion: "✓" },
                { feature: "Bundle size impact", css: "None", motion: "~15KB" },
                { feature: "Reduced motion", css: "✓", motion: "✓" },
              ].map((row) => (
                <tr key={row.feature} className="bg-white dark:bg-neutral-900">
                  <td className="px-4 py-2 text-neutral-700 dark:text-neutral-300">
                    {row.feature}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={cn(
                        row.css === "✓"
                          ? "text-green-500"
                          : row.css === "✗"
                          ? "text-red-500"
                          : "text-amber-500"
                      )}
                    >
                      {row.css}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={cn(
                        row.motion === "✓"
                          ? "text-green-500"
                          : row.motion === "✗"
                          ? "text-red-500"
                          : "text-amber-500"
                      )}
                    >
                      {row.motion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
            Recommendation
          </p>
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
            Start with CSS for simple transitions. Reach for Motion when you need 
            exit animations, spring physics, gesture handling, or layout animations. 
            The two work great together—use CSS for hover states and Motion for 
            complex orchestrated animations.
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

        {/* Inject CSS keyframe */}
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </ExampleWrapper>
  );
}

