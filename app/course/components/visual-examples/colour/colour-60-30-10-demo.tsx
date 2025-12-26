"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

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

  return (
    <ExampleWrapper
      title="The 60-30-10 Rule"
      description="A guideline for balanced colour distribution"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <SliderControl
            label="Dominant"
            value={dominant}
            min={30}
            max={80}
            onChange={setDominant}
            unit="%"
          />
          <SliderControl
            label="Secondary"
            value={secondary}
            min={10}
            max={50}
            onChange={setSecondary}
            unit="%"
          />
          <SliderControl
            label="Accent"
            value={accent}
            min={5}
            max={30}
            onChange={setAccent}
            unit="%"
          />
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

          <div className="flex justify-between text-xs">
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
          <div className={`rounded p-2 text-center text-sm ${
            isBalanced 
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" 
              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
          }`}>
            {isBalanced 
              ? "✓ Well-balanced distribution" 
              : "Try adjusting closer to 60-30-10 for better balance"}
          </div>
        </div>

        {/* UI Example */}
        <div 
          className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700"
          style={{ backgroundColor: "rgb(250 250 250)" }}
        >
          {/* Header - Secondary */}
          <motion.div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: "rgb(163 163 163)" }}
          >
            <div className="h-5 w-20 rounded bg-neutral-200" />
            <div className="flex gap-2">
              <div className="h-5 w-12 rounded bg-neutral-200" />
              <div className="h-5 w-12 rounded bg-neutral-200" />
            </div>
          </motion.div>

          {/* Body - Dominant */}
          <div className="p-4" style={{ backgroundColor: "rgb(250 250 250)" }}>
            <div className="mb-3 h-4 w-3/4 rounded bg-neutral-200" />
            <div className="mb-2 h-3 w-full rounded bg-neutral-100" />
            <div className="mb-2 h-3 w-5/6 rounded bg-neutral-100" />
            <div className="mb-4 h-3 w-4/6 rounded bg-neutral-100" />
            
            {/* Card with accent */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-2 h-3 w-1/2 rounded bg-neutral-200" />
              <div className="mb-3 h-2 w-3/4 rounded bg-neutral-100" />
              {/* Accent button */}
              <motion.div
                className="inline-block rounded px-3 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: "rgb(23 23 23)" }}
                animate={{ 
                  width: normAccent > 15 ? "60%" : normAccent < 5 ? "15%" : "30%"
                }}
              >
                CTA Button
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4">
        <p className="text-center text-xs text-neutral-500">
          {normAccent > 20 && "Too much accent colour can overwhelm and reduce its impact"}
          {normDominant < 50 && "The dominant colour should cover most of the background"}
          {normSecondary > 40 && "Too much secondary colour can compete with primary content"}
          {isBalanced && "The 60-30-10 ratio creates visual balance without overwhelming the user"}
        </p>
      </div>
    </ExampleWrapper>
  );
}
