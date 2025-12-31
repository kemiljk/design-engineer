"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CursorPointer as MousePointer2 } from "iconoir-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ParallaxLayersDemo() {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer transforms - background stays fixed, other layers move at different speeds
  const middleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const frontLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const frontRightX = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const cssCode = `.layer-back {
  transform: translateY(var(--scroll-y * 0.2));
}

.layer-mid {
  transform: translateY(var(--scroll-y * 0.5));
}

.layer-front {
  transform: translateY(var(--scroll-y * 1.0));
}`;

  const motionCode = `import { motion, useScroll, useTransform } from "motion/react";

function ParallaxScene() {
  const { scrollYProgress } = useScroll();
  
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="scene">
      <motion.div style={{ y: yBack }} className="layer back" />
      <motion.div style={{ y: yMid }} className="layer mid" />
      <motion.div style={{ y: yFront }} className="layer front" />
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Parallax Scrolling"
      description="Layers moving at different speeds create an illusion of depth (3D space) on a 2D screen."
      controls={
        <div className="flex justify-end">
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="relative h-[400px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 dark:border-neutral-800">
          <div 
            ref={containerRef}
            className="absolute inset-0 overflow-y-auto scroll-smooth"
          >
            <div className="h-[200%]">
              {/* Sticky Container */}
              <div className="sticky top-0 h-[400px] overflow-hidden">
                
                {/* Background Layer (Static) - z-0 */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-b from-indigo-900 to-black">
                  <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
                  />
                  <div className="h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]" />
                </div>

                {/* Middle Layer (Medium Speed) - z-10 */}
                <motion.div 
                  style={{ y: middleY }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                  <div className="absolute left-10 top-20 h-24 w-24 rounded-3xl bg-gradient-to-br from-purple-500/30 to-purple-600/30 backdrop-blur-sm border border-white/10" />
                  <div className="absolute right-20 bottom-40 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-600/20 backdrop-blur-sm border border-white/10" />
                </motion.div>

                {/* Front Layer (Fastest) - z-20 */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <motion.div 
                    style={{ y: frontY, x: frontLeftX }}
                    className="absolute -bottom-10 -left-10 h-48 w-48 rounded-4xl bg-gradient-to-br from-neutral-800 to-black shadow-2xl border border-white/5 rotate-12" 
                  />
                  <motion.div 
                    style={{ y: frontY, x: frontRightX }}
                    className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-tl from-neutral-800 to-black shadow-2xl border border-white/5" 
                  />
                </div>

                {/* Text Layer (Fast fade out) - z-30, highest to be visible on load */}
                <motion.div 
                  style={{ y: textY, opacity: textOpacity }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white"
                >
                  <h3 className="text-4xl font-bold tracking-tight">Depth</h3>
                  <p className="mt-2 text-indigo-200">Scroll to explore</p>
                  <MousePointer2 className="mt-8 animate-bounce text-white/50" />
                </motion.div>

              </div>
            </div>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { layer: "Background", speed: "Fixed", desc: "Stays static, creating a stable reference point." },
            { layer: "Midground", speed: "0.5x", desc: "Moves at moderate speed, establishing context." },
            { layer: "Foreground", speed: "1.0x", desc: "Moves at scroll speed, appearing closest." },
          ].map((item) => (
            <div key={item.layer} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{item.layer}</h4>
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-xxs font-mono font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                  {item.speed}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          ))}
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
