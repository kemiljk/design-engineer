"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

export function LineHeightDemo() {
  const [lineHeight, setLineHeight] = useState(1.5);

  const sampleText = `Good typography improves readability and comprehension. It establishes hierarchy and guides attention. The space between lines (leading) dramatically affects how comfortable text is to read.`;

  return (
    <ExampleWrapper
      title="Line Height (Leading)"
      description="Adjust line height to see its impact on readability"
      controls={
        <SliderControl
          label="Line Height"
          value={lineHeight}
          min={1.0}
          max={2.2}
          step={0.1}
          onChange={setLineHeight}
          unit="×"
        />
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Text sample */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <motion.p
            className="text-neutral-700 dark:text-neutral-300"
            style={{ lineHeight, fontSize: "16px" }}
            layout
            transition={{ duration: 0.2 }}
          >
            {sampleText}
          </motion.p>
        </div>

        {/* Visual indicator */}
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            {/* Line height visualization */}
            <div className="relative h-32 w-full">
              {[0, 1, 2, 3].map((i) => {
                const baselineY = 20 + (i * 16 * lineHeight);
                return (
                  <motion.div
                    key={i}
                    className="absolute left-0 right-0"
                    animate={{ top: baselineY }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-600" />
                      <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-700" />
                      <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-600" />
                    </div>
                    {i < 3 && (
                      <motion.div
                        className="absolute left-0 ml-2 mt-1 text-[10px] font-mono text-neutral-400"
                        animate={{ height: 16 * lineHeight - 16 }}
                      >
                        ↕ {(lineHeight * 16 - 16).toFixed(0)}px
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Recommendations */}
            <div className="space-y-2 text-sm">
              <div className={`rounded p-2 ${
                lineHeight >= 1.4 && lineHeight <= 1.6 
                  ? "bg-green-50 dark:bg-green-900/20" 
                  : "bg-neutral-100 dark:bg-neutral-800"
              }`}>
                <span className={`font-medium ${
                  lineHeight >= 1.4 && lineHeight <= 1.6 
                    ? "text-green-700 dark:text-green-300" 
                    : "text-neutral-500"
                }`}>
                  Body Text: 1.4–1.6 {lineHeight >= 1.4 && lineHeight <= 1.6 && "✓"}
                </span>
              </div>
              <div className={`rounded p-2 ${
                lineHeight >= 1.1 && lineHeight <= 1.3 
                  ? "bg-green-50 dark:bg-green-900/20" 
                  : "bg-neutral-100 dark:bg-neutral-800"
              }`}>
                <span className={`font-medium ${
                  lineHeight >= 1.1 && lineHeight <= 1.3 
                    ? "text-green-700 dark:text-green-300" 
                    : "text-neutral-500"
                }`}>
                  Headings: 1.1–1.3 {lineHeight >= 1.1 && lineHeight <= 1.3 && "✓"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">
          {lineHeight < 1.2 && "⚠️ Very tight—lines may feel cramped and hard to track"}
          {lineHeight >= 1.2 && lineHeight < 1.4 && "Tight—suitable for headings and short text"}
          {lineHeight >= 1.4 && lineHeight <= 1.6 && "✓ Optimal for body text—comfortable reading"}
          {lineHeight > 1.6 && lineHeight <= 1.8 && "Spacious—airy feel, good for light content"}
          {lineHeight > 1.8 && "⚠️ Very loose—lines may feel disconnected"}
        </p>
      </div>
    </ExampleWrapper>
  );
}
