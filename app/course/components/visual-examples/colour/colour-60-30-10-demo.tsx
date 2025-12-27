"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper } from "../base/example-wrapper";

export function Colour603010Demo() {
  const [dominant, setDominant] = useState(60);
  const [secondary, setSecondary] = useState(30);
  const [accent, setAccent] = useState(10);

  // Normalize to always total 100
  const total = dominant + secondary + accent;
  const normDominant = (dominant / total) * 100;
  const normSecondary = (secondary / total) * 100;
  const normAccent = (accent / total) * 100;

  const isBalanced = 
    normDominant >= 55 && normDominant <= 65 &&
    normSecondary >= 25 && normSecondary <= 35 &&
    normAccent >= 5 && normAccent <= 15;

  // Calculate dynamic heights based on distribution
  const headerHeight = Math.max(40, Math.min(120, normSecondary * 3));
  const accentCount = Math.max(1, Math.min(4, Math.round(normAccent / 7)));

  return (
    <ExampleWrapper
      title="The 60-30-10 Rule"
      description="A guideline for balanced colour distribution"
      controls={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Dominant
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {normDominant.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={80}
              value={dominant}
              onChange={(e) => setDominant(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Secondary
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {normSecondary.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              value={secondary}
              onChange={(e) => setSecondary(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Accent
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {normAccent.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              value={accent}
              onChange={(e) => setAccent(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
            />
          </div>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Colour bar visualization */}
        <div className="space-y-4">
          <div className="flex h-16 overflow-hidden rounded-lg">
            <motion.div
              className="bg-neutral-100 dark:bg-neutral-800"
              animate={{ width: `${normDominant}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="bg-neutral-400 dark:bg-neutral-500"
              animate={{ width: `${normSecondary}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="bg-neutral-900 dark:bg-white"
              animate={{ width: `${normAccent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-neutral-100 dark:bg-neutral-800" />
              <span className="text-neutral-500">
                Dominant: {normDominant.toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-neutral-400 dark:bg-neutral-500" />
              <span className="text-neutral-500">
                Secondary: {normSecondary.toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-neutral-900 dark:bg-white" />
              <span className="text-neutral-500">
                Accent: {normAccent.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Balance indicator */}
          <div className={`rounded p-2 text-center text-sm transition-all ${
            isBalanced 
              ? "ring-1 ring-neutral-300 bg-neutral-100 text-neutral-700 dark:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-300" 
              : "ring-1 ring-[#ff4400]/30 bg-[#ff4400]/10 text-[#ff4400]"
          }`}>
            {isBalanced 
              ? "✓ Well-balanced distribution" 
              : "Try adjusting closer to 60-30-10 for better balance"}
          </div>
        </div>

        {/* UI Example - responsive to distribution */}
        <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
          {/* Header - height responds to secondary % */}
          <motion.div
            className="flex items-center justify-between px-4 bg-neutral-400 dark:bg-neutral-500"
            animate={{ height: headerHeight }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-5 w-20 rounded bg-neutral-200/50" />
            <div className="flex gap-2">
              <div className="h-5 w-12 rounded bg-neutral-200/50" />
              <div className="h-5 w-12 rounded bg-neutral-200/50" />
            </div>
          </motion.div>

          {/* Body - Dominant background */}
          <div className="bg-neutral-100 p-4 dark:bg-neutral-800">
            <div className="mb-3 h-4 w-3/4 rounded bg-neutral-300 dark:bg-neutral-600" />
            <div className="mb-2 h-3 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mb-2 h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="mb-4 h-3 w-4/6 rounded bg-neutral-200 dark:bg-neutral-700" />
            
            {/* Card with accent elements - count responds to accent % */}
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-neutral-900">
              <div className="mb-2 h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="mb-3 h-2 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
              {/* Accent buttons - number responds to accent % */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: accentCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {i === 0 ? "CTA Button" : `Action ${i + 1}`}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight - fixed height to prevent shift */}
      <div className="mt-4 min-h-[2.5rem]">
        <p className="text-center text-xs text-neutral-500">
          {normAccent > 20 && "Too much accent colour can overwhelm and reduce its impact"}
          {normDominant < 50 && normAccent <= 20 && "The dominant colour should cover most of the background"}
          {normSecondary > 40 && normDominant >= 50 && normAccent <= 20 && "Too much secondary colour can compete with primary content"}
          {isBalanced && "The 60-30-10 ratio creates visual balance without overwhelming the user"}
        </p>
      </div>
    </ExampleWrapper>
  );
}
