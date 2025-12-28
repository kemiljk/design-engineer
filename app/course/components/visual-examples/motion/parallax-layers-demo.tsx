"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ParallaxLayersDemo() {
  const [bgSpeed, setBgSpeed] = useState(0.3);
  const [midSpeed, setMidSpeed] = useState(0.6);
  const [fgSpeed, setFgSpeed] = useState(1);
  const [showCode, setShowCode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200 * bgSpeed]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 200 * midSpeed]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 200 * fgSpeed]);

  const cssCode = `/* CSS-only parallax with perspective */
.parallax-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px;
  perspective-origin: center center;
}

.parallax-layer {
  position: absolute;
  inset: 0;
}

/* Slower = further away */
.layer-bg {
  transform: translateZ(-2px) scale(3);
}

.layer-mid {
  transform: translateZ(-1px) scale(2);
}

.layer-fg {
  transform: translateZ(0);
}`;

  const motionCode = `import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function ParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Different speeds for different layers
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto">
      <div className="relative h-[200vh]">
        {/* Background - slowest */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-x-0 top-0"
        >
          <Mountains />
        </motion.div>

        {/* Midground */}
        <motion.div 
          style={{ y: midY }}
          className="absolute inset-x-0 top-20"
        >
          <Trees />
        </motion.div>

        {/* Foreground - fastest */}
        <motion.div 
          style={{ y: fgY }}
          className="absolute inset-x-0 top-40"
        >
          <Content />
        </motion.div>
      </div>
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Parallax Layers"
      description="Multiple layers move at different speeds, creating depth. Scroll to see the effect."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <SliderControl
              label="BG"
              value={bgSpeed}
              min={0}
              max={1}
              step={0.1}
              onChange={setBgSpeed}
            />
            <SliderControl
              label="Mid"
              value={midSpeed}
              min={0}
              max={1}
              step={0.1}
              onChange={setMidSpeed}
            />
            <SliderControl
              label="FG"
              value={fgSpeed}
              min={0}
              max={1.5}
              step={0.1}
              onChange={setFgSpeed}
            />
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
        {/* Parallax scene */}
        <div
          ref={containerRef}
          className="relative h-80 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800"
        >
          <div className="relative h-[600px]">
            {/* Sky gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-orange-200 dark:from-indigo-900 dark:via-purple-900 dark:to-orange-900" />

            {/* Sun/Moon */}
            <motion.div
              style={{ y: bgY }}
              className="absolute right-12 top-8"
            >
              <div className="h-16 w-16 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50 dark:bg-yellow-100 dark:shadow-yellow-100/30" />
            </motion.div>

            {/* Background mountains */}
            <motion.div
              style={{ y: bgY }}
              className="absolute inset-x-0 top-24"
            >
              <svg viewBox="0 0 400 120" className="w-full">
                <path
                  d="M0 120 L50 60 L100 90 L150 40 L200 80 L250 30 L300 70 L350 50 L400 90 L400 120 Z"
                  className="fill-blue-600/40 dark:fill-indigo-800/60"
                />
              </svg>
            </motion.div>

            {/* Mid mountains */}
            <motion.div
              style={{ y: midY }}
              className="absolute inset-x-0 top-32"
            >
              <svg viewBox="0 0 400 120" className="w-full">
                <path
                  d="M0 120 L30 70 L80 100 L120 50 L180 85 L220 35 L280 75 L320 55 L380 80 L400 60 L400 120 Z"
                  className="fill-emerald-700/60 dark:fill-emerald-900/70"
                />
              </svg>
            </motion.div>

            {/* Foreground hills */}
            <motion.div
              style={{ y: fgY }}
              className="absolute inset-x-0 top-44"
            >
              <svg viewBox="0 0 400 100" className="w-full">
                <path
                  d="M0 100 L40 80 L100 90 L160 70 L220 85 L280 65 L340 80 L400 75 L400 100 Z"
                  className="fill-emerald-600 dark:fill-emerald-800"
                />
              </svg>
            </motion.div>

            {/* Trees */}
            <motion.div
              style={{ y: fgY }}
              className="absolute inset-x-0 bottom-0"
            >
              <div className="flex justify-around px-4 pb-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center"
                    style={{ transform: `scale(${0.6 + Math.random() * 0.4})` }}
                  >
                    <div className="h-0 w-0 border-x-8 border-b-16 border-x-transparent border-b-green-700 dark:border-b-green-900" />
                    <div className="h-0 w-0 -mt-2 border-x-10 border-b-20 border-x-transparent border-b-green-600 dark:border-b-green-800" />
                    <div className="h-4 w-2 bg-amber-800 dark:bg-amber-900" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
              <p className="text-xs font-medium">↓ Scroll</p>
            </div>
          </div>
        </div>

        {/* Layer explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              Background ({bgSpeed}x)
            </p>
            <p className="mt-1 text-xs text-blue-600/70 dark:text-blue-400/70">
              Moves slowest—appears furthest away
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-900/20">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Midground ({midSpeed}x)
            </p>
            <p className="mt-1 text-xs text-emerald-600/70 dark:text-emerald-400/70">
              Middle speed—creates depth
            </p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">
              Foreground ({fgSpeed}x)
            </p>
            <p className="mt-1 text-xs text-green-600/70 dark:text-green-400/70">
              Moves fastest—appears closest
            </p>
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

