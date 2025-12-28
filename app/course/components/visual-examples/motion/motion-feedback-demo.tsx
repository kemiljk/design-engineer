"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ButtonState = "idle" | "pressed" | "success" | "error";

export function MotionFeedbackDemo() {
  const [showCode, setShowCode] = useState(false);
  const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>({
    submit: "idle",
    delete: "idle",
    save: "idle",
  });

  const timerRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const triggerButton = (id: string, targetState: "success" | "error") => {
    // Clear any existing timer
    if (timerRefs.current[id]) clearTimeout(timerRefs.current[id]);
    
    // Set pressed first
    setButtonStates((prev) => ({ ...prev, [id]: "pressed" }));
    
    // Then show result
    timerRefs.current[id] = setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [id]: targetState }));
      
      // Reset after showing result
      timerRefs.current[id] = setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [id]: "idle" }));
      }, 1500);
    }, 300);
  };

  const cssCode = `/* Press feedback with scale */
.button {
  transform: scale(1);
  transition: transform 0.1s ease-out;
}

.button:active {
  transform: scale(0.96);
}

/* Success state */
.button--success {
  background-color: #22c55e;
}

/* Error state with shake */
.button--error {
  background-color: #ef4444;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";

function FeedbackButton({ label, onSuccess, onError }) {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  return (
    <motion.button
      onClick={() => {
        // Trigger the appropriate state
        setState(Math.random() > 0.5 ? "success" : "error");
        setTimeout(() => setState("idle"), 1500);
      }}
      whileTap={{ scale: 0.96 }}
      animate={
        state === "error" 
          ? { x: [-6, 6, -3, 3, 0] } 
          : { x: 0 }
      }
      transition={{ duration: state === "error" ? 0.4 : 0.1 }}
      className={cn(
        "rounded-lg px-6 py-3 font-semibold text-white",
        state === "idle" && "bg-swiss-red",
        state === "success" && "bg-green-500",
        state === "error" && "bg-red-500"
      )}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {label}
          </motion.span>
        )}
        {state === "success" && (
          <motion.span 
            key="success" 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <Check className="size-5" />
          </motion.span>
        )}
        {state === "error" && (
          <motion.span 
            key="error" 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <X className="size-5" />
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

  const renderButton = (
    id: string,
    label: string,
    targetState: "success" | "error"
  ) => {
    const state = buttonStates[id];
    const isError = state === "error";
    const isSuccess = state === "success";

    return (
      <motion.button
        onClick={() => triggerButton(id, targetState)}
        whileTap={{ scale: 0.96 }}
        animate={isError ? { x: [-6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: isError ? 0.4 : 0.1 }}
        className={cn(
          "relative flex h-12 min-w-[120px] items-center justify-center rounded-lg px-6 font-semibold text-white transition-colors",
          state === "idle" && "bg-swiss-red hover:bg-swiss-red/90",
          isSuccess && "bg-green-500",
          isError && "bg-red-500"
        )}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {label}
            </motion.span>
          )}
          {state === "pressed" && (
            <motion.span
              key="pressed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="size-5 animate-spin" />
            </motion.span>
          )}
          {isSuccess && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="size-5" />
            </motion.span>
          )}
          {isError && (
            <motion.span
              key="error"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <X className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  };

  return (
    <ExampleWrapper
      title="Motion as Feedback"
      description="Click the buttons to see how motion provides immediate feedback for user actions."
      controls={
        <div className="flex items-center justify-end">
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
        {/* Interactive buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-neutral-100 p-8 dark:bg-neutral-800">
          {renderButton("submit", "Submit", "success")}
          {renderButton("delete", "Delete", "error")}
          {renderButton("save", "Save", "success")}
        </div>

        {/* Explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700">
              <span className="text-sm">👆</span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Press
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Scale to 96% on press confirms the tap was registered
            </p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 dark:bg-green-900/50">
              <Check className="size-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              Success
            </p>
            <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
              Colour change + icon morph shows completion
            </p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-200 dark:bg-red-900/50">
              <X className="size-4 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Error
            </p>
            <p className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">
              Shake animation mimics physical "no" gesture
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Why it matters:</strong> Users need to know their actions were received. 
            Without feedback, they might click multiple times or feel uncertain. Motion 
            provides instant confirmation that the system understood their intent.
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

