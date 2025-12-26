"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type ConsistencyLevel = "consistent" | "inconsistent";

const cardVariants = {
  consistent: [
    { bg: "bg-white dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700", radius: "rounded-lg", shadow: "shadow-sm" },
    { bg: "bg-white dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700", radius: "rounded-lg", shadow: "shadow-sm" },
    { bg: "bg-white dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700", radius: "rounded-lg", shadow: "shadow-sm" },
  ],
  inconsistent: [
    { bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-300 dark:border-blue-700", radius: "rounded-xl", shadow: "shadow-lg" },
    { bg: "bg-white dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700", radius: "rounded-none", shadow: "" },
    { bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", radius: "rounded-2xl", shadow: "shadow-md" },
  ],
};

const buttonVariants = {
  consistent: [
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-md px-4 py-2",
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-md px-4 py-2",
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-md px-4 py-2",
  ],
  inconsistent: [
    "bg-blue-500 text-white rounded-full px-6 py-3",
    "border-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white rounded-none px-3 py-1",
    "bg-green-600 text-white rounded-xl px-5 py-2 shadow-lg",
  ],
};

export function RepetitionDemo() {
  const [level, setLevel] = useState<ConsistencyLevel>("consistent");

  const cards = cardVariants[level];
  const buttons = buttonVariants[level];

  const items = [
    { title: "Design Basics", desc: "Learn the fundamentals" },
    { title: "Colour Theory", desc: "Master colour selection" },
    { title: "Typography", desc: "Text that communicates" },
  ];

  return (
    <ExampleWrapper
      title="Repetition Builds Consistency"
      description="Toggle consistency to see how repeated patterns aid recognition"
      controls={
        <ControlGroup label="Styling">
          <ControlButton
            active={level === "consistent"}
            onClick={() => setLevel("consistent")}
          >
            Consistent
          </ControlButton>
          <ControlButton
            active={level === "inconsistent"}
            onClick={() => setLevel("inconsistent")}
          >
            Inconsistent
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className={`border p-4 ${cards[i].bg} ${cards[i].border} ${cards[i].radius} ${cards[i].shadow}`}
            layout
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3 h-24 rounded bg-neutral-200 dark:bg-neutral-700" />
            <h4 className="mb-1 font-semibold text-neutral-900 dark:text-white">
              {item.title}
            </h4>
            <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
              {item.desc}
            </p>
            <motion.button
              className={`text-sm font-medium transition-all ${buttons[i]}`}
              layout
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Insight */}
      <div className="mt-6 text-center">
        {level === "consistent" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            ✓ Repeated patterns: Users learn that all cards behave the same way
          </p>
        )}
        {level === "inconsistent" && (
          <div className="space-y-1">
            <p className="text-sm text-red-500 dark:text-red-400">
              ✗ Inconsistent styling: Each card looks like a different component
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Are these all the same type of content? Which button is the primary action?
            </p>
          </div>
        )}
      </div>
    </ExampleWrapper>
  );
}
