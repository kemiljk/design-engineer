"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

export function MeasureDemo() {
  const [maxWidth, setMaxWidth] = useState(65);

  const sampleText = `Typography is arguably the most impactful design skill you can develop. Small improvements compound across every word on screen. The number of characters per line dramatically affects readability. Too short and eyes tire from constant line breaks. Too long and it's hard to find the next line. The ideal range is 50-75 characters per line, creating a comfortable reading rhythm that works for sustained reading.`;

  // Rough character count based on width
  const charCount = Math.round(maxWidth * 1.1);

  return (
    <ExampleWrapper
      title="Measure (Line Length)"
      description="Adjust the maximum width to see how line length affects readability"
      controls={
        <SliderControl
          label="Max Width"
          value={maxWidth}
          min={30}
          max={100}
          onChange={setMaxWidth}
          unit="ch"
        />
      }
    >
      <div className="flex flex-col items-center gap-6">
        {/* Character counter */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">
            ~{charCount} characters per line
          </span>
          <div className={`rounded px-2 py-1 text-xs font-medium ${
            charCount >= 50 && charCount <= 75
              ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white"
              : charCount < 50
              ? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              : "bg-[#ff4400]/10 text-[#ff4400]"
          }`}>
            {charCount >= 50 && charCount <= 75 && "Optimal"}
            {charCount < 50 && "Too Short"}
            {charCount > 75 && "Too Long"}
          </div>
        </div>

        {/* Text sample */}
        <motion.div
          className="w-full rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
          animate={{ maxWidth: `${maxWidth}ch` }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-neutral-700 dark:text-neutral-300" style={{ lineHeight: 1.6 }}>
            {sampleText}
          </p>
        </motion.div>

        {/* Reference scale */}
        <div className="w-full max-w-2xl">
          <div className="relative h-8 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
            {/* Zones */}
            <div className="absolute left-[30%] h-full w-[20%] rounded-l-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="absolute left-[50%] h-full w-[25%] bg-neutral-300 dark:bg-neutral-600" />
            <div className="absolute left-[75%] h-full w-[25%] rounded-r-full bg-[#ff4400]/20" />
            
            {/* Labels */}
            <span className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
              Short
            </span>
            <span className="absolute left-[62.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
              Optimal
            </span>
            <span className="absolute left-[87.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-[#ff4400]">
              Long
            </span>

            {/* Indicator */}
            <motion.div
              className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-neutral-900 dark:bg-white"
              animate={{ left: `${(maxWidth / 100) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-neutral-400">
            <span>30ch</span>
            <span>50ch</span>
            <span>75ch</span>
            <span>100ch</span>
          </div>
        </div>

        {/* CSS tip */}
        <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
          <code className="text-xs text-neutral-600 dark:text-neutral-400">
            .prose {"{"} max-width: {maxWidth}ch; {"}"}
          </code>
        </div>
      </div>
    </ExampleWrapper>
  );
}
