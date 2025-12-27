"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup, SliderControl } from "../base/example-wrapper";

type ScaleRatio = "1.125" | "1.2" | "1.25" | "1.333";

const ratioNames: Record<ScaleRatio, string> = {
  "1.125": "Major Second",
  "1.2": "Minor Third",
  "1.25": "Major Third",
  "1.333": "Perfect Fourth",
};

export function TypeScaleDemo() {
  const [ratio, setRatio] = useState<ScaleRatio>("1.25");
  const [baseSize, setBaseSize] = useState(16);

  const ratioNum = parseFloat(ratio);
  
  const scale = [
    { name: "Caption", step: -2 },
    { name: "Small", step: -1 },
    { name: "Body", step: 0 },
    { name: "H4", step: 1 },
    { name: "H3", step: 2 },
    { name: "H2", step: 3 },
    { name: "H1", step: 4 },
  ];

  return (
    <ExampleWrapper
      title="Typographic Scale"
      description="See how different scale ratios create varying levels of contrast"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Ratio">
            {(Object.keys(ratioNames) as ScaleRatio[]).map((r) => (
              <ControlButton
                key={r}
                active={ratio === r}
                onClick={() => setRatio(r)}
              >
                {r}
              </ControlButton>
            ))}
          </ControlGroup>
          <SliderControl
            label="Base"
            value={baseSize}
            min={12}
            max={20}
            onChange={setBaseSize}
            unit="px"
          />
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scale visualization */}
        <div className="space-y-1">
          {scale.slice().reverse().map(({ name, step }) => {
            const size = baseSize * Math.pow(ratioNum, step);
            return (
              <motion.div
                key={name}
                className="flex items-baseline gap-3"
                layout
                transition={{ duration: 0.2 }}
              >
                <span className="w-12 shrink-0 text-right font-mono text-xs text-neutral-400">
                  {size.toFixed(0)}px
                </span>
                <motion.span
                  className="font-semibold text-neutral-900 dark:text-white"
                  style={{ fontSize: `${size}px`, lineHeight: 1.2 }}
                  layout
                >
                  {name}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* In context */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            In Context
          </p>
          <article>
            <motion.h2
              className="mb-2 font-sans font-bold tracking-tight text-neutral-900 dark:text-white"
              style={{ fontSize: `${baseSize * Math.pow(ratioNum, 3)}px`, lineHeight: 1.2 }}
              layout
            >
              Article Title
            </motion.h2>
            <motion.p
              className="mb-3 text-neutral-500"
              style={{ fontSize: `${baseSize * Math.pow(ratioNum, 1)}px` }}
              layout
            >
              Subtitle goes here
            </motion.p>
            <motion.p
              className="text-neutral-600 dark:text-neutral-300"
              style={{ fontSize: `${baseSize}px`, lineHeight: 1.6 }}
              layout
            >
              Body text shows how readable content appears at this size. 
              Good typography creates comfortable reading.
            </motion.p>
            <motion.span
              className="mt-2 block text-neutral-400"
              style={{ fontSize: `${baseSize * Math.pow(ratioNum, -1)}px` }}
              layout
            >
              Caption text • 5 min read
            </motion.span>
          </article>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>{ratioNames[ratio]} ({ratio})</strong>:{" "}
          {ratio === "1.125" && "Subtle differences—good for dense UIs with many text levels"}
          {ratio === "1.2" && "Balanced scale—popular for web, clear but not dramatic"}
          {ratio === "1.25" && "Good contrast—works well for most content sites"}
          {ratio === "1.333" && "High contrast—impactful headings, good for marketing pages"}
        </p>
      </div>
    </ExampleWrapper>
  );
}
