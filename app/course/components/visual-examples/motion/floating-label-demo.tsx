"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function FloatingLabelDemo() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const isFloating = isFocused || value.length > 0;

  const cssCode = `.field {
  position: relative;
}

.input {
  width: 100%;
  padding: 20px 16px 8px;
  font-size: 16px;
  border: 2px solid var(--neutral-200);
  border-radius: 8px;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: #ff4400;
  box-shadow: 0 0 0 3px rgba(255, 68, 0, 0.15);
}

.label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--neutral-500);
  pointer-events: none;
  transition: 
    top 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    font-size 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s;
}

.input:focus + .label,
.input:not(:placeholder-shown) + .label {
  top: 12px;
  transform: translateY(0);
  font-size: 12px;
  color: #ff4400;
}`;

  const motionCode = `import { motion } from "motion/react";
import { useState } from "react";

function FloatingLabelInput({ label }: { label: string }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-lg border-2 px-4 pt-5 pb-2 
          border-neutral-200 focus:border-swiss-red
          focus:ring-3 focus:ring-swiss-red/15 outline-none"
      />
      <motion.label
        initial={false}
        animate={{
          top: isFloating ? 8 : "50%",
          y: isFloating ? 0 : "-50%",
          fontSize: isFloating ? 12 : 16,
          color: isFocused ? "#ff4400" : "#737373",
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="absolute left-4 pointer-events-none origin-left"
      >
        {label}
      </motion.label>
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Floating Label Input"
      description="Material Design-inspired input with animated label that floats on focus."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <span className="text-xs text-neutral-500">
              {isFocused ? "Focused" : value ? "Filled" : "Empty"}
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
        {/* Interactive input */}
        <div className="mx-auto max-w-sm">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full rounded-lg border-2 bg-white px-4 pb-2 pt-5 text-base text-neutral-900 outline-none transition-all duration-200",
                "dark:bg-neutral-900 dark:text-white",
                isFocused
                  ? "border-swiss-red ring-3 ring-swiss-red/15"
                  : "border-neutral-200 dark:border-neutral-700"
              )}
            />
            <motion.label
              initial={false}
              animate={{
                top: isFloating ? 8 : "50%",
                y: isFloating ? 0 : "-50%",
                fontSize: isFloating ? 12 : 16,
                color: isFocused ? "#ff4400" : "#737373",
              }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none absolute left-4 origin-left"
            >
              Email address
            </motion.label>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Click the input to see the label float up
          </p>
        </div>

        {/* Multiple examples */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Filled state */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Filled State</p>
            <div className="relative">
              <input
                type="text"
                defaultValue="john@example.com"
                className="w-full rounded-lg border-2 border-neutral-200 bg-white px-4 pb-2 pt-5 text-base text-neutral-900 outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                readOnly
              />
              <span className="pointer-events-none absolute left-4 top-2 text-xs text-swiss-red">
                Email address
              </span>
            </div>
          </div>

          {/* Error state */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Error State</p>
            <div className="relative">
              <input
                type="text"
                defaultValue="invalid-email"
                className="w-full rounded-lg border-2 border-red-500 bg-white px-4 pb-2 pt-5 text-base text-neutral-900 outline-none dark:bg-neutral-800 dark:text-white"
                readOnly
              />
              <span className="pointer-events-none absolute left-4 top-2 text-xs text-red-500">
                Email address
              </span>
              <p className="mt-1 text-xs text-red-500">
                Please enter a valid email address
              </p>
            </div>
          </div>
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

