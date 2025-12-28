"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  SliderControl,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function GestureAnimationDemo() {
  const [dragElastic, setDragElastic] = useState(0.5);
  const [showCode, setShowCode] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // We use springs for the x/y values so they return smoothly
  const springConfig = { stiffness: 400, damping: 25 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Derived values for rotation and overlays
  const rotate = useTransform(xSpring, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(xSpring, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(xSpring, [-50, -150], [0, 1]);

  // Transform x to absolute value first, then map to scale
  const xAbs = useTransform(xSpring, (latest) => Math.abs(latest));
  const scale = useTransform(xAbs, [0, 200], [1, 1.1]);

  const motionCode = `import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function SwipeCard() {
  const x = useMotionValue(0);
  
  // Create a spring that follows x, but returns to 0 smoothly
  const xSpring = useSpring(x, { stiffness: 400, damping: 25 });
  
  // Map x position to rotation (-25 to 25 degrees)
  const rotate = useTransform(xSpring, [-200, 200], [-25, 25]);
  
  // Map x position to opacity for feedback labels
  const likeOpacity = useTransform(xSpring, [50, 150], [0, 1]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5} // Resistance strength
      style={{ x: xSpring, rotate }}
      whileDrag={{ cursor: "grabbing" }}
    >
      <motion.span style={{ opacity: likeOpacity }}>LIKE</motion.span>
    </motion.div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Gesture Animation"
      description="Direct manipulation makes interfaces feel tangible. Drag the card to feel the physics."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SliderControl
            label="Drag Elasticity"
            value={dragElastic}
            min={0.1}
            max={1}
            step={0.1}
            onChange={setDragElastic}
          />
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo Area */}
        <div className="relative flex h-[400px] items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          {/* Background Placeholder Cards */}
          <div className="absolute h-[340px] w-[260px] translate-y-2 scale-95 rounded-[20px] bg-white opacity-50 shadow-sm dark:bg-neutral-800" />
          <div className="absolute h-[340px] w-[260px] translate-y-4 scale-90 rounded-[20px] bg-white opacity-30 shadow-sm dark:bg-neutral-800" />

          {/* Draggable Card */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={dragElastic}
            style={{ x: xSpring, y: ySpring, rotate }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.05, cursor: "grabbing" }}
            className="absolute h-[340px] w-[260px] cursor-grab rounded-[20px] bg-white shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10"
          >
            {/* Card Content */}
            <div className="h-full overflow-hidden rounded-[20px]">
              <div className="h-3/5 w-full bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl">🏔️</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Swiss Alps
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Zurich, Switzerland
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                    Nature
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                    Hiking
                  </span>
                </div>
              </div>
            </div>

            {/* "LIKE" Overlay */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 -rotate-12 rounded-lg border-4 border-emerald-500 px-2 py-1"
            >
              <span className="text-2xl font-black text-emerald-500">LIKE</span>
            </motion.div>

            {/* "NOPE" Overlay */}
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 rotate-12 rounded-lg border-4 border-rose-500 px-2 py-1"
            >
              <span className="text-2xl font-black text-rose-500">NOPE</span>
            </motion.div>
          </motion.div>

          <p className="absolute bottom-0 text-xs text-neutral-400">
            Drag to swipe • Release to snap back
          </p>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[16px] border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Constraint & Elasticity
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              We constrain the drag area to <code className="font-mono">0</code>{" "}
              but allow movement via{" "}
              <code className="font-mono">dragElastic</code>. This creates a
              rubber-band effect where the card fights to return to center.
            </p>
          </div>
          <div className="rounded-[16px] border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Value Mapping
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              We map the x-position to rotation and overlay opacity. As you drag
              further, the card tilts more and the feedback becomes clearer.
            </p>
          </div>
        </div>

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
