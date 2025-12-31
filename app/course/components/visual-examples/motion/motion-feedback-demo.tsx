"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Xmark,
  RefreshDouble,
  Refresh,
  Trash,
  FloppyDisk,
  ArrowRight,
} from "iconoir-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ButtonState = "idle" | "loading" | "success" | "error";

export function MotionFeedbackDemo() {
  const [showCode, setShowCode] = useState(false);
  const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>(
    {
      primary: "idle",
      destructive: "idle",
      secondary: "idle",
    },
  );

  const timerRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const triggerButton = (id: string, outcome: "success" | "error") => {
    if (timerRefs.current[id]) clearTimeout(timerRefs.current[id]);

    setButtonStates((prev) => ({ ...prev, [id]: "loading" }));

    timerRefs.current[id] = setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [id]: outcome }));

      timerRefs.current[id] = setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [id]: "idle" }));
      }, 2000);
    }, 800); // Realistic loading time
  };

  const cssCode = `.button {
  transform: scale(1);
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:active {
  transform: scale(0.98);
}

.shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function FeedbackButton() {
  const [status, setStatus] = useState("idle");

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      animate={status === "error" ? { x: [-2, 2, -4, 4, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl bg-black px-4 py-2 text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            FloppyDisk Changes
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <RefreshDouble className="animate-spin" />
          </motion.span>
        )}
        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check className="size-4" />
            <span>Saved</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Motion as Feedback"
      description="Interactive states communicate system status clearly without requiring text alerts."
      controls={
        <div className="flex justify-end">
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Main Interface */}
        <div className="flex flex-col items-center justify-center gap-12 bg-white py-12 dark:bg-neutral-900">
          {/* Primary Action (Success Path) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
              Success State
            </span>
            <motion.button
              onClick={() => triggerButton("primary", "success")}
              disabled={buttonStates.primary !== "idle"}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex h-10 w-32 items-center justify-center rounded-[12px] text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none",
                buttonStates.primary === "success"
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {buttonStates.primary === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <span>Publish</span>
                    <ArrowRight className="size-3.5 opacity-70" />
                  </motion.div>
                )}
                {buttonStates.primary === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <RefreshDouble className="size-4 animate-spin" />
                  </motion.div>
                )}
                {buttonStates.primary === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="size-4" strokeWidth={3} />
                    <span>Published</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Destructive Action (Error Path) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
              Error State
            </span>
            <motion.button
              onClick={() => triggerButton("destructive", "error")}
              disabled={buttonStates.destructive !== "idle"}
              whileTap={{ scale: 0.98 }}
              animate={
                buttonStates.destructive === "error"
                  ? { x: [-2, 2, -4, 4, -2, 2, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
              className={cn(
                "relative flex h-10 w-32 items-center justify-center rounded-[12px] border text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:outline-none",
                buttonStates.destructive === "error"
                  ? "border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-900/20"
                  : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:text-red-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {buttonStates.destructive === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2"
                  >
                    <Trash className="size-3.5" />
                    <span>Delete</span>
                  </motion.div>
                )}
                {buttonStates.destructive === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <RefreshDouble className="size-4 animate-spin text-neutral-400" />
                  </motion.div>
                )}
                {buttonStates.destructive === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5 font-semibold"
                  >
                    <Xmark className="size-4" strokeWidth={3} />
                    <span>Failed</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Principles ViewGrid */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[10px] dark:bg-neutral-800">
                1
              </span>
              Confirmation
            </h4>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The morph from button text to a checkmark provides immediate,
              unambiguous confirmation of success without needing a separate
              toast notification.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[10px] dark:bg-neutral-800">
                2
              </span>
              Status Persistence
            </h4>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              We maintain the loading state for a minimum duration (800ms) to
              prevent the UI from flickering too quickly, which can feel
              glitchy.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[10px] dark:bg-neutral-800">
                3
              </span>
              Error Shake
            </h4>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The horizontal shake mimics a human head shaking "no". It's a
              universally understood motion for rejection or error.
            </p>
          </div>
        </div>

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
