"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ValidationState = "idle" | "error" | "success";

export function FormValidationDemo() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ValidationState>("idle");
  const [showCode, setShowCode] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return "idle";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "success" : "error";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = validateEmail(email);
    setState(validationResult);

    if (validationResult === "error") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (state !== "idle") {
      setState(validateEmail(value));
    }
  };

  const cssCode = `.input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid var(--neutral-200);
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: #ff4400;
  box-shadow: 0 0 0 3px rgba(255, 68, 0, 0.15);
}

.input--error {
  border-color: #ef4444;
  animation: shake 0.4s ease-in-out;
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.input--success {
  border-color: #22c55e;
}

.input--success:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { Check, AlertCircle } from "lucide-react";

function ValidatedInput() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "success">("idle");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    setState(isValid ? "success" : "error");
    
    if (!isValid) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          animate={isShaking ? { x: [-8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "w-full rounded-lg border-2 px-4 py-3 pr-10",
            state === "error" && "border-red-500",
            state === "success" && "border-green-500"
          )}
        />
        
        <AnimatePresence>
          {state !== "idle" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {state === "success" ? (
                <Check className="size-5 text-green-500" />
              ) : (
                <AlertCircle className="size-5 text-red-500" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-2 text-sm text-red-500"
          >
            Please enter a valid email address
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Form Validation"
      description="Input with shake error animation and animated success/error indicators."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <span className="text-xs text-neutral-500">
              State:{" "}
              <span
                className={cn(
                  "font-medium",
                  state === "success" && "text-green-500",
                  state === "error" && "text-red-500"
                )}
              >
                {state}
              </span>
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
        {/* Interactive form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
          <div className="relative">
            <motion.input
              type="text"
              value={email}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter your email"
              animate={isShaking ? { x: [-8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={cn(
                "w-full rounded-lg border-2 bg-white px-4 py-3 pr-10 text-neutral-900 outline-none transition-colors",
                "dark:bg-neutral-900 dark:text-white",
                "placeholder:text-neutral-400",
                state === "idle" &&
                  "border-neutral-200 focus:border-swiss-red focus:ring-3 focus:ring-swiss-red/15 dark:border-neutral-700",
                state === "error" &&
                  "border-red-500 focus:ring-3 focus:ring-red-500/15",
                state === "success" &&
                  "border-green-500 focus:ring-3 focus:ring-green-500/15"
              )}
            />

            {/* Status icon */}
            <AnimatePresence>
              {state !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {state === "success" ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <Check className="size-3 text-white" />
                    </div>
                  ) : (
                    <AlertCircle className="size-5 text-red-500" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {state === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 text-sm text-red-500"
              >
                <X className="size-3.5" />
                Please enter a valid email address
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full rounded-lg bg-swiss-red py-3 text-sm font-semibold text-white transition-colors hover:bg-swiss-red/90"
          >
            Submit
          </button>
        </form>

        {/* Test cases */}
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => {
              setEmail("invalid-email");
              setState("error");
              setIsShaking(true);
              setTimeout(() => setIsShaking(false), 500);
            }}
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-left transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:hover:bg-red-900/30"
          >
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Trigger Error State
            </p>
            <p className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">
              Click to see shake animation
            </p>
          </button>
          <button
            onClick={() => {
              setEmail("valid@example.com");
              setState("success");
            }}
            className="rounded-lg border border-green-200 bg-green-50 p-4 text-left transition-colors hover:bg-green-100 dark:border-green-900/50 dark:bg-green-900/20 dark:hover:bg-green-900/30"
          >
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Trigger Success State
            </p>
            <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
              Click to see checkmark animation
            </p>
          </button>
        </div>

        {/* Animation breakdown */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            Animation Breakdown
          </p>
          <ul className="mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>• <strong>Shake:</strong> translateX oscillates [-8, 8, -4, 4, 0]px over 0.4s</li>
            <li>• <strong>Icon:</strong> Spring scale from 0.5 to 1 with high stiffness</li>
            <li>• <strong>Message:</strong> Fade + slide in from y: -10 with height animation</li>
            <li>• <strong>Border:</strong> CSS transition for colour change</li>
          </ul>
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

