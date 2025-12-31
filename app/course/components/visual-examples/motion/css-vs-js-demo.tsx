"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function CssVsJsDemo() {
  const [showCode, setShowCode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion/Spring Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 15 };
  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const cssCode = `/* CSS Transition */
.card {
  transition: transform 0.3s ease-out;
}

.card:hover {
  transform: perspective(1000px) rotateX(10deg) rotateY(-10deg);
}

/* 
  Limitations:
  - Fixed duration (doesn't account for velocity)
  - Robotic start/stop
  - Can't follow mouse position fluently
*/`;

  const motionCode = `import { motion, useSpring, useTransform } from "motion/react";

function SpringCard() {
  // Map mouse position to rotation
  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]));

  return (
    <motion.div
      style={{ 
        rotateX, 
        rotateY,
        perspective: 1000 
      }}
      // Springs automatically handle velocity
      // and interruptions smoothly.
    />
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="CSS vs Motion"
      description="Compare static CSS transitions with fluid, physics-based Motion. Hover over the cards."
      controls={
        <div className="flex justify-end">
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* CSS Example */}
          <div className="flex flex-col items-center gap-4">
            <div 
              className="group relative flex h-48 w-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-800"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className="flex h-32 w-32 items-center justify-center rounded-20 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-3"
              >
                <span className="font-bold">CSS</span>
              </div>
              <div className="absolute bottom-4 text-xs font-medium text-neutral-400">
                Hover me
              </div>
            </div>
            <p className="text-center text-xs text-neutral-500">
              Fixed duration (0.3s).<br/>
              Feels predictable but mechanical.
            </p>
          </div>

          {/* Motion Example */}
          <div className="flex flex-col items-center gap-4">
            <motion.div 
              className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-800"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <motion.div 
                style={{ rotateX, rotateY }}
                className="flex h-32 w-32 items-center justify-center rounded-20 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-xl"
              >
                <span className="font-bold">Motion</span>
              </motion.div>
              <div className="absolute bottom-4 text-xs font-medium text-neutral-400">
                Move cursor over me
              </div>
            </motion.div>
            <p className="text-center text-xs text-neutral-500">
              Physics-based response.<br/>
              Fluidly tracks input velocity.
            </p>
          </div>

        </div>

        {/* Feature Matrix */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 p-3 text-xs font-semibold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
            <div>Feature</div>
            <div className="text-center">CSS</div>
            <div className="text-center">Motion</div>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {[
              { label: "Interruptible", css: "❌ No (Jumps)", motion: "✅ Yes (Fluid)" },
              { label: "Physics/Springs", css: "❌ No", motion: "✅ Yes" },
              { label: "Gesture Tracking", css: "❌ No", motion: "✅ Yes" },
              { label: "Performance", css: "✅ Excellent", motion: "✅ Good" },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-3 p-3 text-xs">
                <div className="font-medium text-neutral-700 dark:text-neutral-300">{row.label}</div>
                <div className="text-center text-neutral-500">{row.css}</div>
                <div className="text-center text-neutral-900 dark:text-white font-medium">{row.motion}</div>
              </div>
            ))}
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
