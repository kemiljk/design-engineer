"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Xmark, RefreshDouble, AtSign } from "iconoir-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Status = "idle" | "checking" | "available" | "unavailable";

export function FormValidationDemo() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (!username) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    const timeout = setTimeout(() => {
      if (["admin", "root", "mod", "karl"].includes(username.toLowerCase())) {
        setStatus("unavailable");
      } else {
        setStatus("available");
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [username]);

  const cssCode = `.error-message {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function ValidationMessage({ status }) {
  return (
    <AnimatePresence mode="wait">
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-500"
        >
          Username unavailable
        </motion.div>
      )}
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-500"
        >
          Username available!
        </motion.div>
      )}
    </AnimatePresence>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Micro-Validation"
      description="Real-time feedback helps users correct errors before they submit, reducing friction."
      controls={
        <div className="flex justify-end">
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="mx-auto max-w-sm rounded-[24px] border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <label className="mb-2 block text-sm font-semibold text-neutral-900 dark:text-white">
            Choose a username
          </label>
          
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <AtSign className="size-5" />
            </div>
            
            <motion.input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
              placeholder="username"
              className={cn(
                "w-full rounded-[12px] border bg-neutral-50 py-3 pl-12 pr-12 text-neutral-900 outline-none transition-all focus:ring-4 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500",
                status === "idle" && "border-neutral-200 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500/20 dark:border-neutral-700 dark:focus:border-indigo-400 dark:focus:bg-neutral-800 dark:focus:ring-indigo-500/30",
                status === "checking" && "border-neutral-300 focus:border-neutral-400 focus:bg-white focus:ring-neutral-500/20 dark:border-neutral-600 dark:focus:bg-neutral-800 dark:focus:ring-neutral-500/30",
                status === "available" && "border-emerald-500 ring-4 ring-emerald-500/20 dark:border-emerald-400 dark:ring-emerald-500/30",
                status === "unavailable" && "border-rose-500 ring-4 ring-rose-500/20 dark:border-rose-400 dark:ring-rose-500/30"
              )}
              animate={status === "unavailable" ? { x: [-2, 2, -2, 2, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {status === "checking" && (
                  <motion.div
                    key="checking"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <RefreshDouble className="size-5 animate-spin text-neutral-400" />
                  </motion.div>
                )}
                {status === "available" && (
                  <motion.div
                    key="available"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Check className="size-5 text-emerald-500" />
                  </motion.div>
                )}
                {status === "unavailable" && (
                  <motion.div
                    key="unavailable"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Xmark className="size-5 text-rose-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-3 min-h-[20px]">
            <AnimatePresence mode="wait">
              {status === "available" && (
                <motion.p
                  key="available"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <Check className="size-3" />
                  Nice! This username is yours.
                </motion.p>
              )}
              {status === "unavailable" && (
                <motion.p
                  key="unavailable"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                >
                  <Xmark className="size-3" />
                  Sorry, that name is taken.
                </motion.p>
              )}
              {status === "idle" && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-neutral-500 dark:text-neutral-400"
                >
                  Use letters, numbers, and underscores.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Color Morphing
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The border color transitions smoothly, avoiding harsh jumps. The focus ring expands to reinforce the status.
            </p>
          </div>
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Icon Swap
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              <code className="rounded-[4px] bg-neutral-200 px-1 py-0.5 font-mono dark:bg-neutral-800">AnimatePresence mode="wait"</code> ensures the old icon leaves before the new one enters, preventing layout shifts.
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
