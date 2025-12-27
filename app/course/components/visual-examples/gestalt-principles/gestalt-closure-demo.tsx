"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

export function GestaltClosureDemo() {
  const [completeness, setCompleteness] = useState(70);

  // Calculate how much of each shape to show
  const dashArray = (circumference: number) => {
    const visible = (completeness / 100) * circumference;
    return `${visible} ${circumference - visible}`;
  };

  return (
    <ExampleWrapper
      title="Gestalt: Closure"
      description="The brain completes incomplete shapes"
      controls={
        <SliderControl
          label="Completeness"
          value={completeness}
          min={20}
          max={100}
          onChange={setCompleteness}
          unit="%"
        />
      }
    >
      <div className="flex flex-col items-center gap-8">
        {/* Shapes demonstration */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {/* Circle */}
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24">
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                strokeDasharray={dashArray(251.3)}
                animate={{ strokeDasharray: dashArray(251.3) }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <span className="text-xs text-neutral-500">Circle</span>
          </div>

          {/* Square */}
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24">
              <motion.rect
                x="15"
                y="15"
                width="70"
                height="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                strokeDasharray={dashArray(280)}
                animate={{ strokeDasharray: dashArray(280) }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <span className="text-xs text-neutral-500">Square</span>
          </div>

          {/* Triangle */}
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24">
              <motion.polygon
                points="50,10 90,85 10,85"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-800 dark:text-neutral-200"
                strokeDasharray={dashArray(220)}
                animate={{ strokeDasharray: dashArray(220) }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <span className="text-xs text-neutral-500">Triangle</span>
          </div>
        </div>

        {/* Insight */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            {completeness >= 60
              ? "Even with gaps, you recognise these as complete shapes"
              : completeness >= 40
              ? "The shapes are still recognisable, though less clearly"
              : "With too little information, the brain struggles to complete the shapes"}
          </p>
        </div>

        {/* UI Application */}
        <div className="w-full space-y-3">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
            UI Application: Carousel Peek
          </p>
          <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex gap-4">
              <div className="h-24 w-36 shrink-0 rounded bg-neutral-300 dark:bg-neutral-600" />
              <div className="h-24 w-36 shrink-0 rounded bg-neutral-300 dark:bg-neutral-600" />
              <motion.div 
                className="h-24 w-36 shrink-0 rounded bg-neutral-300 dark:bg-neutral-600"
                animate={{ 
                  clipPath: `inset(0 ${100 - completeness}% 0 0)` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-3 text-center text-xs text-neutral-500">
              {completeness >= 50 
                ? "The partially visible card implies there's more content to scroll"
                : "Too little shown—users might not realise more content exists"}
            </p>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
