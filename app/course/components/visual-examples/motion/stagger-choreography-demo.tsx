"use client";

import React, { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, RotateCcw, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import { easings } from "./motion-utils";

type Direction = "forward" | "reverse" | "center";

const cards = [
  { id: 1, title: "Dashboard", color: "bg-blue-500" },
  { id: 2, title: "Analytics", color: "bg-violet-500" },
  { id: 3, title: "Reports", color: "bg-emerald-500" },
  { id: 4, title: "Settings", color: "bg-amber-500" },
  { id: 5, title: "Profile", color: "bg-rose-500" },
  { id: 6, title: "Messages", color: "bg-cyan-500" },
];

export function StaggerChoreographyDemo() {
  const [staggerDelay, setStaggerDelay] = useState(80);
  const [direction, setDirection] = useState<Direction>("forward");
  const [showCode, setShowCode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const calculateDelay = (index: number) => {
    switch (direction) {
      case "forward":
        return index * staggerDelay;
      case "reverse":
        return (cards.length - 1 - index) * staggerDelay;
      case "center":
        const center = (cards.length - 1) / 2;
        return Math.abs(index - center) * staggerDelay;
    }
  };

  const replay = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  const cssCode = `.card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeSlideIn 0.4s ease-out forwards;
}

/* Stagger with nth-child */
.card:nth-child(1) { animation-delay: ${calculateDelay(0)}ms; }
.card:nth-child(2) { animation-delay: ${calculateDelay(1)}ms; }
.card:nth-child(3) { animation-delay: ${calculateDelay(2)}ms; }
.card:nth-child(4) { animation-delay: ${calculateDelay(3)}ms; }
.card:nth-child(5) { animation-delay: ${calculateDelay(4)}ms; }
.card:nth-child(6) { animation-delay: ${calculateDelay(5)}ms; }

@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

  const motionCode = `import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ${staggerDelay / 1000},
      ${direction === "reverse" ? "staggerDirection: -1," : ""}
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {cards.map((card) => (
    <motion.div key={card.id} variants={itemVariants}>
      {card.title}
    </motion.div>
  ))}
</motion.div>`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Stagger Choreography"
      description="Coordinate multiple elements with staggered delays for elegant list animations."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <SliderControl
              label="Stagger"
              value={staggerDelay}
              min={20}
              max={200}
              step={10}
              onChange={setStaggerDelay}
              unit="ms"
            />
            <ControlGroup label="Direction">
              {(["forward", "reverse", "center"] as const).map((dir) => (
                <ControlButton
                  key={dir}
                  active={direction === dir}
                  onClick={() => setDirection(dir)}
                >
                  {dir}
                </ControlButton>
              ))}
            </ControlGroup>
          </div>
          <ControlGroup label="">
            <button
              onClick={() => setShowCode(!showCode)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                showCode
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </button>
          </ControlGroup>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Replay button */}
        <div className="flex items-center gap-3">
          <button
            onClick={replay}
            className="flex h-8 items-center gap-2 rounded bg-swiss-red px-4 text-sm font-medium text-white transition-colors hover:bg-swiss-red/90"
          >
            <RotateCcw className="size-4" />
            Replay
          </button>
          <span className="text-xs text-neutral-500">
            Total duration: {(cards.length - 1) * staggerDelay + 400}ms
          </span>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {isVisible &&
            cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: calculateDelay(index) / 1000,
                  ease: easings.smooth as unknown as number[],
                }}
                className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div
                  className={cn(
                    "flex h-24 items-center justify-center",
                    card.color
                  )}
                >
                  <ImageIcon className="size-8 text-white/60" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {card.title}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Delay: {calculateDelay(index)}ms
                  </p>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Timing visualisation */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Timeline
          </p>
          <div className="space-y-2">
            {cards.map((card, index) => {
              const delay = calculateDelay(index);
              const totalDuration = (cards.length - 1) * staggerDelay + 400;
              const startPercent = (delay / totalDuration) * 100;
              const widthPercent = (400 / totalDuration) * 100;

              return (
                <div key={card.id} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-neutral-500">
                    Card {index + 1}
                  </span>
                  <div className="relative h-4 flex-1 rounded bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className={cn("absolute h-full rounded", card.color)}
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}

