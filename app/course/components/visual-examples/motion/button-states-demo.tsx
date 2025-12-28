"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Send, Sparkles, MousePointer2, Hand, RefreshCw } from "lucide-react";
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
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
  padding: 14px 28px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.35);
}

.button:active {
  transform: translateY(0) scale(0.98);
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function SubmitButton() {
  const [state, setState] = useState("idle");

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="..."
    >
      <AnimatePresence mode="wait">
        {state === "loading" ? (
          <motion.span 
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Loader2 className="animate-spin" />
          </motion.span>
        ) : (
          <motion.span>Send</motion.span>
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
            <ControlButton active={activeState === "idle"} onClick={resetState}>
              Idle
            </ControlButton>
            <ControlButton
              active={activeState === "loading" || activeState === "success"}
              onClick={triggerLoading}
            >
              Submit Flow
            </ControlButton>
          </ControlGroup>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Interactive button showcase */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative flex h-56 w-full items-center justify-center overflow-hidden"
            style={{
              borderRadius: 24,
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
            }}
          >
            {/* Animated gradient orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl"
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-500/40 blur-3xl"
                animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* The button */}
            <motion.button
              onClick={triggerLoading}
              disabled={isLoading}
              className={cn(
                "relative z-10 flex h-14 min-w-[200px] items-center justify-center gap-3 px-8 text-[15px] font-semibold text-white transition-colors duration-300",
                isLoading && "cursor-wait"
              )}
              style={{
                borderRadius: 14,
                background: isSuccess
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: isSuccess
                  ? "0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset"
                  : "0 4px 20px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}
              whileHover={
                !isLoading && !isSuccess
                  ? {
                      y: -3,
                      scale: 1.03,
                      boxShadow:
                        "0 8px 30px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset",
                    }
                  : undefined
              }
              whileTap={!isLoading && !isSuccess ? { scale: 0.97, y: 0 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <AnimatePresence mode="wait">
                {activeState === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <Send className="size-[18px]" />
                    Send Message
                  </motion.span>
                )}
                {activeState === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2.5"
                  >
                    <Loader2 className="size-[18px] animate-spin" />
                    Sending...
                  </motion.span>
                )}
                {activeState === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="size-[18px]" strokeWidth={3} />
                    Sent!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Simplified State Breakdown */}
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { icon: <Sparkles className="size-4" />, label: "Hover", sub: "Lift & Glow" },
            { icon: <Hand className="size-4" />, label: "Press", sub: "Scale Down" },
            { icon: <Loader2 className="size-4" />, label: "Loading", sub: "Spinner" },
            { icon: <Check className="size-4" />, label: "Success", sub: "Morph" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-100 bg-white p-4 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">{item.label}</p>
                <p className="text-[10px] text-neutral-500">{item.sub}</p>
              </div>
            </div>
          ))}
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
