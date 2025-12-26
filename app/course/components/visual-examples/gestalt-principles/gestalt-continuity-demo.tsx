"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type ContinuityType = "continuous" | "broken";

export function GestaltContinuityDemo() {
  const [type, setType] = useState<ContinuityType>("continuous");

  const generateSmoothPath = () => {
    return "M 20,80 Q 80,20 140,80 Q 200,140 260,80 Q 320,20 380,80";
  };

  const generateBrokenPath = () => {
    return [
      "M 20,80 L 60,50",
      "M 80,30 L 140,80",
      "M 160,100 L 200,140",
      "M 220,120 L 260,80",
      "M 280,60 L 320,20",
      "M 340,40 L 380,80",
    ];
  };

  return (
    <ExampleWrapper
      title="Gestalt: Continuity"
      description="The eye follows smooth paths, even when interrupted"
      controls={
        <ControlGroup label="Path">
          <ControlButton
            active={type === "continuous"}
            onClick={() => setType("continuous")}
          >
            Continuous
          </ControlButton>
          <ControlButton
            active={type === "broken"}
            onClick={() => setType("broken")}
          >
            Broken
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <svg
          viewBox="0 0 400 160"
          className="h-40 w-full max-w-md"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
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

          {/* Path */}
          {type === "continuous" ? (
            <motion.path
              d={generateSmoothPath()}
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
            generateBrokenPath().map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-neutral-800 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))
          )}

          {/* Intersection points */}
          <circle cx="140" cy="80" r="6" className="fill-red-400" />
          <circle cx="260" cy="80" r="6" className="fill-red-400" />
        </svg>

        {/* Explanation */}
        <div className="text-center">
          {type === "continuous" && (
            <div className="space-y-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Even at intersection points (red dots), you perceive <strong>one flowing line</strong>
              </p>
              <p className="text-xs text-neutral-500">
                The brain prefers continuous paths over abrupt changes
              </p>
            </div>
          )}
          {type === "broken" && (
            <div className="space-y-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Broken segments disrupt the flow—harder to follow as a single path
              </p>
              <p className="text-xs text-neutral-500">
                Each segment competes for attention rather than guiding the eye
              </p>
            </div>
          )}
        </div>

        {/* UI Example */}
        <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Progress Example
          </p>
          <div className="relative flex items-center justify-between">
            {["Cart", "Shipping", "Payment", "Confirm"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="z-10 flex flex-col items-center gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    i <= 1 
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" 
                      : "bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-[10px] text-neutral-500">{step}</span>
                </div>
                {i < 3 && (
                  <div className={`absolute h-0.5 ${
                    type === "continuous" ? "w-[calc(100%-2rem)]" : "w-[15%]"
                  } ${
                    i <= 0 
                      ? "bg-neutral-900 dark:bg-white" 
                      : "bg-neutral-200 dark:bg-neutral-700"
                  }`}
                  style={{ 
                    left: `calc(${(i * 33.33) + 8}%)`,
                    ...(type === "broken" && { 
                      width: "15%",
                      marginLeft: i % 2 === 0 ? "4%" : "-4%"
                    })
                  }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-neutral-500">
            {type === "continuous" 
              ? "Continuous line guides users through the flow" 
              : "Disconnected elements make the flow unclear"}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
