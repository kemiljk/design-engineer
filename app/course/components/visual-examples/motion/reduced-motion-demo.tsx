"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Heart, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ReducedMotionDemo() {
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const systemReducedMotion = useReducedMotion();
  const shouldReduceMotion = simulateReduced || systemReducedMotion;

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const cssCode = `/* Respect user preference with media query */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Or be more selective */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce,
  .animate-pulse,
  .animate-spin {
    animation: none;
  }
  
  .transition-transform {
    transition: none;
  }
}

/* Safe to keep: */
/* - Opacity changes (fade in/out) */
/* - Colour changes */
/* - Very subtle, short transitions */`;

  const motionCode = `import { motion, useReducedMotion } from "motion/react";

function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }  // Instant
          : { duration: 0.5, type: "spring" }
      }
    >
      Content
    </motion.div>
  );
}

// Alternative: animate opacity only for reduced motion
function FadeOnlyAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Skip transform animations
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
    >
      Content
    </motion.div>
  );
}

// Best practices:
// ✓ Always use useReducedMotion() hook
// ✓ Keep opacity transitions (gentle fade is usually OK)
// ✓ Remove or minimise: bouncing, spinning, sliding
// ✓ Reduce duration significantly
// ✓ Test with your OS reduced motion setting`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Reduced Motion"
      description="Compare full motion vs accessible alternatives. Toggle to simulate prefers-reduced-motion."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Simulate">
            <ControlButton
              active={!simulateReduced}
              onClick={() => setSimulateReduced(false)}
            >
              Full Motion
            </ControlButton>
            <ControlButton
              active={simulateReduced}
              onClick={() => setSimulateReduced(true)}
            >
              Reduced Motion
            </ControlButton>
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
        {/* System preference indicator */}
        {systemReducedMotion && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-900/20">
            <p className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
              <Settings className="size-4" />
              Your system has prefers-reduced-motion enabled
            </p>
          </div>
        )}

        {/* Side by side comparison */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Full motion */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  !shouldReduceMotion ? "bg-green-500" : "bg-neutral-300"
                )}
              />
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                Full Motion
              </span>
            </div>

            <div className="space-y-4">
              {/* Button */}
              <motion.button
                whileHover={!shouldReduceMotion ? { y: -2, scale: 1.02 } : undefined}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
                className="w-full rounded-lg bg-swiss-red py-2.5 font-semibold text-white"
              >
                Hover Me
              </motion.button>

              {/* Like button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 dark:border-neutral-700"
              >
                <motion.div
                  animate={
                    isLiked && !shouldReduceMotion
                      ? { scale: [1, 1.3, 0.95, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35 }}
                >
                  <Heart
                    className={cn(
                      "size-5 transition-colors",
                      isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-400"
                    )}
                  />
                </motion.div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {isLiked ? "Liked" : "Like"}
                </span>
              </button>

              {/* Notification */}
              <button
                onClick={triggerNotification}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 dark:border-neutral-700"
              >
                <div className="relative">
                  <Bell className="size-5 text-neutral-600 dark:text-neutral-400" />
                  {showNotification && (
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-swiss-red"
                    />
                  )}
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Notify
                </span>
              </button>
            </div>
          </div>

          {/* Reduced motion */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  shouldReduceMotion ? "bg-green-500" : "bg-neutral-300"
                )}
              />
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                Reduced Motion
              </span>
            </div>

            <div className="space-y-4">
              {/* Button - no hover animation */}
              <button className="w-full rounded-lg bg-swiss-red py-2.5 font-semibold text-white transition-colors hover:bg-swiss-red/90">
                Hover Me
              </button>

              {/* Like button - instant color change only */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 dark:border-neutral-700"
              >
                <Heart
                  className={cn(
                    "size-5 transition-colors",
                    isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-400"
                  )}
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {isLiked ? "Liked" : "Like"}
                </span>
              </button>

              {/* Notification - instant appear */}
              <button
                onClick={triggerNotification}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 dark:border-neutral-700"
              >
                <div className="relative">
                  <Bell className="size-5 text-neutral-600 dark:text-neutral-400" />
                  {showNotification && (
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-swiss-red" />
                  )}
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Notify
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">
              ✓ Safe with Reduced Motion
            </p>
            <ul className="mt-2 space-y-1 text-xs text-green-600 dark:text-green-400/80">
              <li>• Opacity/fade transitions</li>
              <li>• Colour changes</li>
              <li>• Very short transitions (&lt;100ms)</li>
              <li>• User-initiated actions</li>
            </ul>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400">
              ✗ Remove or Minimise
            </p>
            <ul className="mt-2 space-y-1 text-xs text-red-600 dark:text-red-400/80">
              <li>• Large-scale movement (slides, bounces)</li>
              <li>• Spinning/rotating animations</li>
              <li>• Parallax scrolling</li>
              <li>• Auto-playing animations</li>
            </ul>
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Why it matters:</strong> Motion can cause nausea, dizziness, or discomfort 
            for users with vestibular disorders. Respecting <code className="rounded bg-amber-200/50 px-1 font-mono text-xs dark:bg-amber-900/50">prefers-reduced-motion</code> isn't 
            just a nice-to-have—it's essential for accessibility. About 35% of adults over 40 
            have experienced vestibular dysfunction.
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

