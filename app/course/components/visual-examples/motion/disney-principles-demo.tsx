"use client";

import React, { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Principle = "squashStretch" | "anticipation" | "followThrough" | "secondary";

interface PrincipleConfig {
  label: string;
  description: string;
  enabled: boolean;
}

export function DisneyPrinciplesDemo() {
  const [principles, setPrinciples] = useState<Record<Principle, boolean>>({
    squashStretch: true,
    anticipation: true,
    followThrough: true,
    secondary: true,
  });
  const [showCode, setShowCode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const controls = useAnimationControls();

  const principleInfo: Record<Principle, { label: string; description: string }> = {
    squashStretch: {
      label: "Squash & Stretch",
      description: "Elements compress and expand to show weight and impact",
    },
    anticipation: {
      label: "Anticipation",
      description: "Small wind-up motion before the main action",
    },
    followThrough: {
      label: "Follow Through",
      description: "Elements overshoot and settle into final position",
    },
    secondary: {
      label: "Secondary Action",
      description: "Supporting motion that reinforces the main action",
    },
  };

  const togglePrinciple = (key: Principle) => {
    setPrinciples((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const playAnimation = async () => {
    setIsAnimating(true);
    
    // Reset
    await controls.set({ 
      scale: 1, 
      y: 0, 
      scaleX: 1, 
      scaleY: 1,
      rotate: 0,
    });

    const sequence: Array<{
      animate: Record<string, number | number[]>;
      transition: Record<string, unknown>;
    }> = [];

    // Anticipation - small wind-up
    if (principles.anticipation) {
      sequence.push({
        animate: { 
          y: 8, 
          scaleY: principles.squashStretch ? 0.92 : 1,
          scaleX: principles.squashStretch ? 1.08 : 1,
        },
        transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
      });
    }

    // Main action - jump up
    sequence.push({
      animate: { 
        y: -60, 
        scaleY: principles.squashStretch ? 1.15 : 1,
        scaleX: principles.squashStretch ? 0.9 : 1,
      },
      transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
    });

    // Follow through - overshoot and settle
    if (principles.followThrough) {
      sequence.push({
        animate: { 
          y: 5, 
          scaleY: principles.squashStretch ? 0.88 : 1,
          scaleX: principles.squashStretch ? 1.12 : 1,
        },
        transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
      });
      sequence.push({
        animate: { 
          y: 0, 
          scaleY: 1,
          scaleX: 1,
        },
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 15 
        },
      });
    } else {
      sequence.push({
        animate: { 
          y: 0, 
          scaleY: 1,
          scaleX: 1,
        },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      });
    }

    // Play sequence
    for (const step of sequence) {
      await controls.start(step.animate, step.transition);
    }

    setIsAnimating(false);
  };

  const motionCode = `import { motion, useAnimationControls } from "motion/react";

const controls = useAnimationControls();

async function playAnimation() {
${principles.anticipation ? `  // Anticipation - wind up
  await controls.start({ 
    y: 8, ${principles.squashStretch ? "\n    scaleY: 0.92, scaleX: 1.08," : ""}
  }, { duration: 0.15 });
` : ""}
  // Main action - jump
  await controls.start({ 
    y: -60, ${principles.squashStretch ? "\n    scaleY: 1.15, scaleX: 0.9," : ""}
  }, { duration: 0.2 });
${principles.followThrough ? `
  // Follow through - overshoot
  await controls.start({ 
    y: 5, ${principles.squashStretch ? "\n    scaleY: 0.88, scaleX: 1.12," : ""}
  }, { duration: 0.15 });

  // Settle with spring
  await controls.start({ 
    y: 0, scaleY: 1, scaleX: 1,
  }, { type: "spring", stiffness: 400, damping: 15 });` : `
  // Return to rest
  await controls.start({ 
    y: 0, scaleY: 1, scaleX: 1,
  }, { duration: 0.2 });`}
}

<motion.button animate={controls}>
  Click Me${principles.secondary ? `
  <motion.span className="ripple" />` : ""}
</motion.button>`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Disney's 12 Principles"
      description="Toggle principles to see how they affect the animation's personality and appeal."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(principles) as Principle[]).map((key) => (
              <button
                key={key}
                onClick={() => togglePrinciple(key)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  principles[key]
                    ? "bg-swiss-red text-white"
                    : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {principleInfo[key].label}
              </button>
            ))}
          </div>
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
        </div>
      }
    >
      <div className="space-y-6">
        {/* Animation preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-40 w-full items-end justify-center rounded-lg bg-gradient-to-b from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
            {/* Shadow */}
            <motion.div
              animate={controls}
              className="absolute bottom-6 h-3 w-16 rounded-full bg-neutral-900/10 blur-sm dark:bg-black/20"
              style={{ 
                transformOrigin: "center bottom",
              }}
            />
            
            {/* Button */}
            <motion.button
              animate={controls}
              onClick={playAnimation}
              disabled={isAnimating}
              className={cn(
                "relative mb-6 flex h-14 w-40 items-center justify-center gap-2 rounded-lg font-semibold text-white shadow-lg transition-colors",
                "bg-gradient-to-b from-swiss-red to-red-600",
                "hover:from-red-500 hover:to-red-700",
                isAnimating && "pointer-events-none"
              )}
              style={{ transformOrigin: "center bottom" }}
              whileHover={!isAnimating ? { scale: 1.02 } : undefined}
            >
              <Play className="size-4" />
              Click Me
              
              {/* Secondary action - ripple */}
              {principles.secondary && isAnimating && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-lg bg-white"
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Principle explanations */}
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(principles) as Principle[]).map((key) => (
            <div
              key={key}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                principles[key]
                  ? "border-swiss-red/30 bg-swiss-red/5"
                  : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    principles[key] ? "bg-swiss-red" : "bg-neutral-400"
                  )}
                />
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {principleInfo[key].label}
                </p>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {principleInfo[key].description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Try it:</strong> Turn off all principles and compare. Without them, 
            the animation feels robotic and lifeless. These subtle touches make motion 
            feel natural and engaging.
          </p>
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

