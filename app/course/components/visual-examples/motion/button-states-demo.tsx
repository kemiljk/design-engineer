"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ButtonState = "idle" | "hover" | "pressed" | "loading" | "success";

export function ButtonStatesDemo() {
  const [activeState, setActiveState] = useState<ButtonState>("idle");
  const [showCode, setShowCode] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const triggerLoading = () => {
    setActiveState("loading");
    timerRef.current = setTimeout(() => {
      setActiveState("success");
      timerRef.current = setTimeout(() => {
        setActiveState("idle");
      }, 1500);
    }, 2000);
  };

  const resetState = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveState("idle");
  };

  const cssCode = `.button {
  position: relative;
  padding: 12px 24px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #ff4400 0%, #cc3700 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(255, 68, 0, 0.25);
  transition: 
    transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 68, 0, 0.35);
}

.button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px rgba(255, 68, 0, 0.2);
}

.button--loading {
  pointer-events: none;
}

.button--success {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";

function SubmitButton() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  return (
    <motion.button
      onClick={() => {
        setState("loading");
        // Simulate async action
        setTimeout(() => setState("success"), 2000);
      }}
      disabled={state === "loading"}
      className={cn(
        "relative px-6 py-3 font-semibold text-white rounded-lg",
        state === "success" 
          ? "bg-gradient-to-br from-green-500 to-green-600"
          : "bg-gradient-to-br from-swiss-red to-red-600"
      )}
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(255,68,0,0.35)" }}
      whileTap={{ scale: 0.98, y: 0 }}
      initial={{ boxShadow: "0 4px 12px rgba(255,68,0,0.25)" }}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Send className="size-4" />
            Submit
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Loader2 className="size-5 animate-spin" />
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check className="size-5" />
            Done!
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

  const isLoading = activeState === "loading";
  const isSuccess = activeState === "success";

  return (
    <ExampleWrapper
      title="Button States"
      description="A premium button with hover lift, press feedback, loading spinner, and success state."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Trigger State">
            <ControlButton
              active={activeState === "idle"}
              onClick={resetState}
            >
              Idle
            </ControlButton>
            <ControlButton
              active={activeState === "loading" || activeState === "success"}
              onClick={triggerLoading}
            >
              Submit Flow
            </ControlButton>
          </ControlGroup>
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
      <div className="space-y-8">
        {/* Interactive button */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
            <motion.button
              onClick={triggerLoading}
              disabled={isLoading}
              className={cn(
                "relative flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-lg px-6 font-semibold text-white",
                "transition-colors duration-200",
                isSuccess
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-swiss-red to-red-600",
                isLoading && "cursor-wait"
              )}
              whileHover={
                !isLoading && !isSuccess
                  ? {
                      y: -2,
                      boxShadow: isSuccess
                        ? "0 8px 20px rgba(34, 197, 94, 0.35)"
                        : "0 8px 20px rgba(255, 68, 0, 0.35)",
                    }
                  : undefined
              }
              whileTap={!isLoading && !isSuccess ? { scale: 0.98, y: 0 } : undefined}
              initial={{
                boxShadow: "0 4px 12px rgba(255, 68, 0, 0.25)",
              }}
              animate={{
                boxShadow: isSuccess
                  ? "0 4px 12px rgba(34, 197, 94, 0.25)"
                  : "0 4px 12px rgba(255, 68, 0, 0.25)",
              }}
            >
              <AnimatePresence mode="wait">
                {activeState === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="size-4" />
                    Submit
                  </motion.span>
                )}
                {activeState === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Loader2 className="size-5 animate-spin" />
                  </motion.span>
                )}
                {activeState === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-5" />
                    Done!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <p className="text-center text-sm text-neutral-500">
            {activeState === "idle" && "Hover over the button, then click to see the full flow"}
            {activeState === "loading" && "Loading..."}
            {activeState === "success" && "Success! Resetting shortly..."}
          </p>
        </div>

        {/* State breakdown */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { state: "Default", desc: "Gradient background with soft shadow" },
            { state: "Hover", desc: "Lifts up 2px, shadow expands" },
            { state: "Pressed", desc: "Scales to 98%, settles down" },
            { state: "Loading", desc: "Content morphs to spinner" },
          ].map((item, i) => (
            <div
              key={item.state}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                {item.state}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
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

