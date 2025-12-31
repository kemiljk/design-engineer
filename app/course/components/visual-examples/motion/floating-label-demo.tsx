"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeClosed as EyeOff } from "iconoir-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function FloatingLabelDemo() {
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const cssCode = `.label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  transform-origin: left top;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  transform: translateY(-0.75rem) scale(0.75);
  color: #6366f1; /* indigo-500 */
}`;

  const motionCode = `import { motion } from "motion/react";

function Input({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="pt-6 pb-2"
      />
      <motion.label
        initial={false}
        animate={{
          y: isActive ? -12 : 0,
          scale: isActive ? 0.75 : 1,
          color: focused ? "#6366f1" : "#9ca3af"
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4"
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
      title="Floating Labels"
      description="The label acts as a placeholder, then moves out of the way to become a persistent legend."
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
        <div className="mx-auto max-w-sm rounded-4xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Lock className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Welcome Back</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Please sign in to continue</p>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <motion.div
                layout
                className={cn(
                  "absolute inset-0 rounded-xl border transition-colors",
                  focusedField === "email" 
                    ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-900/10" 
                    : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"
                )}
              />
              <div className="relative z-10 flex items-center px-4">
                <Mail className={cn(
                  "mr-3 size-5 transition-colors",
                  focusedField === "email" ? "text-indigo-500" : "text-neutral-400"
                )} />
                <div className="relative flex-1 py-4">
                  <motion.label
                    initial={false}
                    animate={{
                      y: focusedField === "email" || email ? -12 : 0,
                      scale: focusedField === "email" || email ? 0.75 : 1,
                    }}
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 origin-left text-base font-medium transition-colors pointer-events-none",
                      focusedField === "email" ? "text-indigo-500" : "text-neutral-500"
                    )}
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="relative z-10 w-full bg-transparent pt-3 text-base font-medium text-neutral-900 focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                layout
                className={cn(
                  "absolute inset-0 rounded-xl border transition-colors",
                  focusedField === "password" 
                    ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-900/10" 
                    : "border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"
                )}
              />
              <div className="relative z-10 flex items-center px-4">
                <Lock className={cn(
                  "mr-3 size-5 transition-colors",
                  focusedField === "password" ? "text-indigo-500" : "text-neutral-400"
                )} />
                <div className="relative flex-1 py-4">
                  <motion.label
                    initial={false}
                    animate={{
                      y: focusedField === "password" || password ? -12 : 0,
                      scale: focusedField === "password" || password ? 0.75 : 1,
                    }}
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 origin-left text-base font-medium transition-colors pointer-events-none",
                      focusedField === "password" ? "text-indigo-500" : "text-neutral-500"
                    )}
                  >
                    Password
                  </motion.label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="relative z-10 w-full bg-transparent pt-3 text-base font-medium text-neutral-900 focus:outline-none dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-neutral-400 hover:text-neutral-600 focus:outline-none dark:hover:text-neutral-200"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-[0.98]">
              Sign In
            </button>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Space Efficiency
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Combines the label and input into a single visual unit, saving vertical space while maintaining clarity.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Context Preservation
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Unlike standard placeholders that disappear when typing, the floating label remains visible, reminding the user what field they're editing.
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
