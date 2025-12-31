"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ExampleWrapper,
  ControlButton,
  ControlGroup,
} from "../base/example-wrapper";

type ContinuityType = "continuous" | "broken";

export function GestaltContinuityDemo() {
  const [type, setType] = useState<ContinuityType>("continuous");

  return (
    <ExampleWrapper
      title="Gestalt: Continuity"
      description="The eye follows smooth paths, perceiving them as unified wholes"
      controls={
        <ControlGroup label="Connection">
          <ControlButton
            active={type === "continuous"}
            onClick={() => setType("continuous")}
          >
            Connected
          </ControlButton>
          <ControlButton
            active={type === "broken"}
            onClick={() => setType("broken")}
          >
            Disconnected
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 400 160" className="h-40 w-full max-w-md">
          {/* Background grid */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-neutral-200 dark:text-neutral-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Path - same smooth curve, but with gaps when broken */}
          {type === "continuous" ? (
            <motion.path
              d="M 20,80 Q 80,20 140,80 Q 200,140 260,80 Q 320,20 380,80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-neutral-800 dark:text-neutral-200"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          ) : (
            <>
              {/* Same curve shape but with gaps - demonstrates loss of continuity */}
              <motion.path
                d="M 20,80 Q 50,50 80,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M 100,50 Q 120,65 140,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              <motion.path
                d="M 160,100 Q 200,140 220,120"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />
              <motion.path
                d="M 240,95 Q 250,85 260,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              />
              <motion.path
                d="M 280,65 Q 320,20 350,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              />
              <motion.path
                d="M 365,65 L 380,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
            </>
          )}

          {/* Intersection points */}
          <circle cx="140" cy="80" r="6" className="fill-swiss-red" />
          <circle cx="260" cy="80" r="6" className="fill-swiss-red" />
        </svg>

        {/* Explanation - fixed height to prevent layout shift */}
        <div className="min-h-14 text-center">
          <div className="space-y-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {type === "continuous" ? (
                <>
                  Even at intersection points (orange dots), you perceive{" "}
                  <strong>one flowing line</strong>
                </>
              ) : (
                <>
                  Gaps break the illusion—now you see{" "}
                  <strong>separate fragments</strong>
                </>
              )}
            </p>
            <p className="text-xs text-neutral-500">
              {type === "continuous"
                ? "The brain prefers continuous paths over abrupt changes"
                : "Without continuity, each segment competes for attention"}
            </p>
          </div>
        </div>

        {/* UI Example */}
        <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Progress Example
          </p>

          {/* Progress Steps Container */}
          <div className="relative">
            {/* Background track line - only show when continuous */}
            {type === "continuous" && (
              <>
                {/* Track spans from center of first circle to center of last circle */}
                <div className="absolute top-4 right-4 left-4 h-0.5 bg-neutral-200 dark:bg-neutral-700" />
                {/* Active portion - 33.33% is one segment (between steps) */}
                <motion.div
                  className="absolute top-4 left-4 h-0.5 bg-neutral-900 dark:bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "calc(33.33% - 0.5rem)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </>
            )}

            {/* Step circles and labels */}
            <div className="relative flex justify-between">
              {["Cart", "Shipping", "Payment", "Confirm"].map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                      i <= 1
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xxs text-neutral-500">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-500">
            {type === "continuous"
              ? "The line guides your eye through the sequence"
              : "Without connection, step relationships are unclear"}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
