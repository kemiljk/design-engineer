"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function GestureAnimationDemo() {
  const [dragElastic, setDragElastic] = useState(0.3);
  const [showCode, setShowCode] = useState(false);

  // Motion values for dragging
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth return
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Rotate based on horizontal position
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);

  // Scale while dragging
  const scale = useTransform(
    [x, y] as any,
    ([latestX, latestY]: [number, number]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
      return 1 + distance * 0.0005;
    }
  );

  const motionCode = `import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function DraggableCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth animations
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  // Transform values based on position
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);
  
  return (
    <motion.div
      drag
      dragElastic={${dragElastic}}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ x: springX, y: springY, rotate }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="cursor-grab rounded-xl bg-white p-6 shadow-lg"
    >
      <h3>Drag me around!</h3>
    </motion.div>
  );
}

// Gesture props available:
// - drag: Enable dragging (true, "x", or "y")
// - dragConstraints: Boundaries for dragging
// - dragElastic: Resistance when dragging past constraints
// - dragMomentum: Enable momentum after release
// - whileDrag: Styles while dragging
// - onDragStart, onDrag, onDragEnd: Callbacks`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Gesture Animation"
      description="Drag the card around. It rotates based on position and springs back with physics."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SliderControl
            label="Elasticity"
            value={dragElastic}
            min={0}
            max={1}
            step={0.1}
            onChange={setDragElastic}
          />
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
        {/* Drag area */}
        <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, #00000010 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Center indicator */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-600" />

          {/* Draggable card */}
          <motion.div
            drag
            dragElastic={dragElastic}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragMomentum={true}
            style={{
              x: springX,
              y: springY,
              rotate,
              scale,
            }}
            whileDrag={{ cursor: "grabbing" }}
            className="relative z-10 cursor-grab rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
          >
            {/* Glass effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-white/0 dark:from-white/10 dark:to-white/0" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-swiss-red to-red-600 text-3xl shadow-lg">
                🎯
              </div>
              <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-white">
                Drag Me!
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Springs back with physics
              </p>
            </div>
          </motion.div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-neutral-400">
            Click and drag • Releases with momentum
          </div>
        </div>

        {/* Feature breakdown */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Spring Physics", desc: "Smooth return to origin" },
            { title: "Rotate on Drag", desc: "Tilts based on X position" },
            { title: "Scale on Drag", desc: "Grows slightly when dragging" },
            { title: "Elastic Constraints", desc: "Resistance at boundaries" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>useSpring vs animate:</strong> Using <code className="rounded bg-amber-200/50 px-1 font-mono text-xs dark:bg-amber-900/50">useSpring</code> on 
            motion values creates continuous physics-based animation that feels more natural 
            than keyframe animations. The card doesn't just move—it has weight and momentum.
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

