"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, SliderControl, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function DisneyPrinciplesDemo() {
  const [showCode, setShowCode] = useState(false);
  const [elasticity, setElasticity] = useState(0.5);
  const [key, setKey] = useState(0);

  const reset = () => setKey(k => k + 1);

  // Calculate deformation based on elasticity slider
  const squash = 1 - (0.4 * elasticity); // Max squash 0.6
  const stretch = 1 + (0.4 * elasticity); // Max stretch 1.4

  const cssCode = `/* 
  Parametric physics simulations are extremely 
  hard in CSS. You'd need complex keyframes 
  for every possible elasticity value.
*/`;

  const motionCode = `import { motion } from "motion/react";

function BouncingBall({ elasticity }) {
  const stretch = 1 + (0.4 * elasticity);
  const squash = 1 - (0.4 * elasticity);

  return (
    <motion.div
      animate={{
        y: [0, -180, 0],
        scaleY: [squash, stretch, squash], 
        scaleX: [stretch, squash, stretch], 
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 1]
      }}
    />
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Squash and Stretch"
      description="Objects deform when they move fast or hit a surface, emphasizing speed and weight."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SliderControl
            label="Elasticity"
            value={elasticity}
            min={0}
            max={1}
            step={0.1}
            onChange={setElasticity}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
            <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
              {showCode ? "Hide Code" : "Show Code"}
            </ControlButton>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="relative h-[320px] overflow-hidden rounded-[24px] border border-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
          <div className="absolute inset-0 flex items-end justify-center pb-12">
            {/* The Ball */}
            <motion.div
              key={key}
              animate={{
                y: [0, -200, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: [0.3, 0.7, 0.4, 1], // Custom bounce easing
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  scaleY: [squash, stretch, squash],
                  scaleX: [stretch, squash, stretch],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1] // Sync deformation with jump apex
                }}
                className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.2)]"
              >
                {/* Specular Highlight */}
                <div className="absolute left-3 top-3 h-5 w-5 rounded-full bg-white/30 blur-[2px]" />
              </motion.div>
            </motion.div>
            
            {/* Dynamic Shadow */}
            <motion.div
              animate={{
                scale: [1, 0.4, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: [0.3, 0.7, 0.4, 1],
              }}
              className="absolute bottom-12 h-3 w-16 rounded-[100%] bg-black blur-md"
            />
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Anticipation & Follow Through
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The ball stretches vertically as it accelerates upwards (fighting gravity) and squashes horizontally when it impacts the ground (absorbing energy).
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Volume Conservation
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Critically, volume must be maintained. If an object gets flatter (squash), it must also get wider (stretch).
            </p>
          </div>
        </div>

        {showCode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
