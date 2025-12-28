"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import { springs, formatSpringConfig, approximateSpringDuration } from "./motion-utils";

type SpringPreset = keyof typeof springs;

export function SpringPhysicsDemo() {
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(1);
  const [activePreset, setActivePreset] = useState<SpringPreset | "">("");
  const [showCode, setShowCode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const springValue = useSpring(0, { stiffness, damping, mass });
  const x = useTransform(springValue, [0, 1], [0, 220]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<number[]>([]);

  // Update spring config when params change
  useEffect(() => {
    springValue.set(springValue.get(), { stiffness, damping, mass });
  }, [stiffness, damping, mass, springValue]);

  // Draw spring visualisation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const unsubscribe = springValue.on("change", (latest) => {
      historyRef.current.push(latest);
      if (historyRef.current.length > 100) {
        historyRef.current.shift();
      }

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw target line
      ctx.strokeStyle = "#ff440030";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(canvas.width, 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw history line
      if (historyRef.current.length > 1) {
        ctx.strokeStyle = "#ff4400";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        historyRef.current.forEach((val, i) => {
          const x = (i / 100) * canvas.width;
          const y = 20 + (1 - val) * 60;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  const applyPreset = (preset: SpringPreset) => {
    const config = springs[preset];
    setStiffness(config.stiffness);
    setDamping(config.damping);
    setActivePreset(preset);
  };

  const triggerSpring = () => {
    historyRef.current = [];
    springValue.set(0);
    setTimeout(() => springValue.set(1), 50);
  };

  const reset = () => {
    historyRef.current = [];
    springValue.set(0);
  };

  const duration = approximateSpringDuration(stiffness, damping, mass);
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const isOverdamped = dampingRatio >= 1;
  const isUnderdamped = dampingRatio < 1;

  const motionCode = `import { motion } from "motion/react";

<motion.div
  animate={{ x: 220 }}
  transition={{
    type: "spring",
    stiffness: ${stiffness},
    damping: ${damping},${mass !== 1 ? `\n    mass: ${mass},` : ""}
  }}
/>

// Or use useSpring for imperative control
import { useSpring } from "motion/react";

const springValue = useSpring(0, {
  stiffness: ${stiffness},
  damping: ${damping},${mass !== 1 ? `\n  mass: ${mass},` : ""}
});`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Spring Physics"
      description="Explore spring animations by adjusting stiffness, damping, and mass parameters."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Presets">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(springs) as SpringPreset[]).slice(0, 4).map((preset) => (
                <ControlButton
                  key={preset}
                  active={activePreset === preset}
                  onClick={() => applyPreset(preset)}
                >
                  {preset}
                </ControlButton>
              ))}
            </div>
          </ControlGroup>
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
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Controls */}
          <div className="space-y-4 lg:w-56">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">
                  Stiffness
                </span>
                <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  {stiffness}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={stiffness}
                onChange={(e) => {
                  setStiffness(Number(e.target.value));
                  setActivePreset("");
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
              />
              <p className="text-[10px] text-neutral-400">
                Higher = faster, snappier
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">
                  Damping
                </span>
                <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  {damping}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={damping}
                onChange={(e) => {
                  setDamping(Number(e.target.value));
                  setActivePreset("");
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
              />
              <p className="text-[10px] text-neutral-400">
                Lower = more bounce
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">
                  Mass
                </span>
                <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  {mass}
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={5}
                step={0.1}
                value={mass}
                onChange={(e) => {
                  setMass(Number(e.target.value));
                  setActivePreset("");
                }}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
              />
              <p className="text-[10px] text-neutral-400">
                Higher = slower, heavier
              </p>
            </div>

            {/* Physics info */}
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Damping Ratio</span>
                  <span
                    className={cn(
                      "font-mono",
                      isOverdamped ? "text-amber-500" : "text-blue-500"
                    )}
                  >
                    {dampingRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Type</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {isOverdamped ? "Overdamped" : "Underdamped"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">≈ Duration</span>
                  <span className="font-mono text-neutral-700 dark:text-neutral-300">
                    {(duration * 1000).toFixed(0)}ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 space-y-4">
            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={reset}
                className="flex h-8 w-8 items-center justify-center rounded bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
                aria-label="Reset"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                onClick={triggerSpring}
                className="flex h-8 items-center gap-2 rounded bg-swiss-red px-4 text-sm font-medium text-white transition-colors hover:bg-swiss-red/90"
              >
                <Play className="size-4" />
                Trigger
              </button>
            </div>

            {/* Animation track */}
            <div className="relative h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <motion.div
                style={{ x }}
                className="absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-lg bg-swiss-red shadow-lg"
                drag="x"
                dragConstraints={{ left: 0, right: 220 }}
                dragElastic={0}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false);
                  historyRef.current = [];
                  springValue.set(info.point.x > 110 ? 1 : 0);
                }}
              />
              <div className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600" />
            </div>

            {/* Spring graph */}
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-2 text-xs font-medium text-neutral-500">
                Spring Response
              </p>
              <canvas
                ref={canvasRef}
                width={300}
                height={80}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* More presets */}
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(springs) as SpringPreset[]).slice(4).map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                activePreset === preset
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {preset}
            </button>
          ))}
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

