"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { Play, Undo as RotateCcw, Activity, Settings } from "iconoir-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import { springs, approximateSpringDuration } from "./motion-utils";

type SpringPreset = keyof typeof springs;

function SpringRunner({
  springValue,
  trackRef,
  onDragEnd,
}: {
  springValue: ReturnType<typeof useSpring>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onDragEnd: (target: number) => void;
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const elementSize = 48; // h-12 w-12 = 48px

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [trackRef]);

  // Map spring value (0-1) to pixel position
  const xPosition = useTransform(
    springValue,
    [0, 1],
    [0, Math.max(0, trackWidth - elementSize)],
  );

  return (
    <motion.div
      style={{ x: xPosition }}
      className="absolute top-1/2 h-12 w-12 -translate-y-1/2 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        const target = info.offset.x > 50 ? 1 : 0;
        onDragEnd(target);
      }}
    >
      <div className="h-full w-full rounded-2xl bg-linear-to-br from-neutral-700 to-neutral-900 shadow-xl ring-2 ring-white dark:from-neutral-300 dark:to-neutral-100 dark:ring-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center text-white dark:text-neutral-900">
          <Activity className="size-5" />
        </div>
      </div>
    </motion.div>
  );
}

export function SpringPhysicsDemo() {
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(1);
  const [activePreset, setActivePreset] = useState<SpringPreset | "">("");
  const [showCode, setShowCode] = useState(false);

  // Motion Value for the spring
  const springValue = useSpring(0, { stiffness, damping, mass });

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<number[]>([]);
  const frameRef = useRef<number>(0);

  // Trigger spring animation when config changes
  useEffect(() => {
    // Re-trigger the spring to the current value to show the new physics
    springValue.set(springValue.get());
  }, [stiffness, damping, mass, springValue]);

  // Canvas Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Subscribe to spring changes
    const unsubscribe = springValue.on("change", (latest) => {
      historyRef.current.push(latest);
      if (historyRef.current.length > 300) {
        historyRef.current.shift();
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;

      // Target line (1.0)
      const targetY = height * 0.3;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, targetY);
      ctx.lineTo(width, targetY);
      ctx.stroke();

      // Baseline (0.0)
      const baseY = height * 0.8;
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // Draw the curve
      if (historyRef.current.length > 1) {
        // Gradient stroke
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(99, 102, 241, 0)"); // Fade in
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 1)"); // Solid indigo

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        const history = historyRef.current;
        const len = history.length;

        // Draw last 300 points
        for (let i = 0; i < len; i++) {
          const val = history[i];
          // Map index to x (right aligned)
          const xPos = width - (len - 1 - i) * 2;

          // Map value to y
          // val 0 -> baseY
          // val 1 -> targetY
          // range = baseY - targetY
          const yPos = baseY - val * (baseY - targetY);

          if (i === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            ctx.lineTo(xPos, yPos);
          }
        }
        ctx.stroke();

        // Draw leading dot
        const lastVal = history[len - 1];
        const lastY = baseY - lastVal * (baseY - targetY);

        ctx.fillStyle = "#6366f1";
        ctx.beginPath();
        ctx.arc(width, lastY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
        ctx.beginPath();
        ctx.arc(width, lastY, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      unsubscribe();
      cancelAnimationFrame(frameRef.current);
    };
  }, [springValue]);

  const applyPreset = (preset: SpringPreset) => {
    const config = springs[preset];
    setStiffness(config.stiffness);
    setDamping(config.damping);
    setActivePreset(preset);
    // Reset history for visual clarity
    historyRef.current = [];
  };

  const duration = approximateSpringDuration(stiffness, damping, mass);

  const trigger = () => {
    springValue.jump(0);
    historyRef.current = [];
    setTimeout(() => springValue.set(1), 50);
    // Reset back to start after animation completes (instant, no animation)
    setTimeout(
      () => {
        springValue.jump(0);
        historyRef.current = [];
      },
      50 + duration * 1000 + 2000,
    ); // animation start delay + duration + 2s pause
  };

  const reset = () => {
    springValue.jump(0);
    historyRef.current = [];
  };

  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const isOverdamped = dampingRatio >= 1;

  const motionCode = `import { motion } from "motion/react";

<motion.div
  animate={{ x: "100%" }}
  transition={{
    type: "spring",
    stiffness: ${stiffness},
    damping: ${damping},${mass !== 1 ? `\n    mass: ${mass},` : ""}
  }}
/>`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Spring Physics Playground"
      description="Springs create natural, interruptible motion. Adjust mass, tension, and friction to see how the curve changes."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Presets">
            {(Object.keys(springs) as SpringPreset[])
              .slice(0, 4)
              .map((preset) => (
                <ControlButton
                  key={preset}
                  active={activePreset === preset}
                  onClick={() => applyPreset(preset)}
                >
                  {preset}
                </ControlButton>
              ))}
          </ControlGroup>
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Controls */}
        <div className="flex shrink-0 flex-col gap-6 lg:w-64">
          <div className="rounded-3xl border border-neutral-200/60 bg-neutral-50 p-5 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/50">
            <div className="mb-4 flex items-center gap-2 text-neutral-900 dark:text-white">
              <Settings className="size-4" />
              <h4 className="text-sm font-bold">Parameters</h4>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Stiffness",
                  val: stiffness,
                  set: setStiffness,
                  min: 10,
                  max: 500,
                  step: 10,
                },
                {
                  label: "Damping",
                  val: damping,
                  set: setDamping,
                  min: 1,
                  max: 100,
                  step: 1,
                },
                {
                  label: "Mass",
                  val: mass,
                  set: setMass,
                  min: 0.1,
                  max: 5,
                  step: 0.1,
                },
              ].map((ctrl) => (
                <div key={ctrl.label} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-neutral-500">
                      {ctrl.label}
                    </span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      {ctrl.val}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={ctrl.val}
                    onChange={(e) => {
                      ctrl.set(Number(e.target.value));
                      setActivePreset("");
                    }}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-neutral-900 dark:bg-neutral-700 dark:accent-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-3 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
              <div className="text-xxs tracking-wider text-neutral-400 uppercase">
                Response
              </div>
              <div
                className={cn(
                  "mt-1 text-sm font-bold",
                  isOverdamped ? "text-amber-500" : "text-emerald-500",
                )}
              >
                {isOverdamped ? "Overdamped" : "Bouncy"}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-3 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
              <div className="text-xxs tracking-wider text-neutral-400 uppercase">
                Duration
              </div>
              <div className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
                ~{(duration * 1000).toFixed(0)}ms
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              Simulation
            </h4>
            <div className="flex gap-2">
              <button
                onClick={reset}
                aria-label="Reset spring"
                className="flex h-10 w-10 items-center justify-center border border-neutral-200/60 bg-white text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 active:scale-[0.98] dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                data-demo-trigger
                onClick={trigger}
                className="flex h-10 items-center gap-2 bg-neutral-900 px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <Play className="size-3.5 fill-current" />
                Trigger
              </button>
            </div>
          </div>

          {/* Physical Track */}
          <div className="relative h-32 overflow-hidden rounded-3xl border border-neutral-200/60 bg-neutral-50 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
            {/* Markers */}
            <div className="absolute top-0 bottom-0 left-6 w-px border-l border-dashed border-neutral-300 dark:border-neutral-700" />
            <div className="absolute top-0 right-6 bottom-0 w-px border-l border-dashed border-neutral-300 dark:border-neutral-700" />

            {/* Track line */}
            <div className="absolute top-1/2 right-6 left-6 h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Track container - full width for edge-to-edge animation */}
            <div ref={trackRef} className="absolute inset-y-0 right-6 left-6">
              <SpringRunner
                springValue={springValue}
                trackRef={trackRef}
                onDragEnd={(target) => {
                  springValue.set(target);
                  historyRef.current = [];
                }}
              />
            </div>
          </div>

          {/* Real-time Graph */}
          <div className="relative h-64 overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-sm dark:border-neutral-800/60 dark:bg-neutral-950">
            <div className="absolute top-3 left-4 text-xxs font-bold tracking-wider text-neutral-400 uppercase">
              Velocity Graph
            </div>
            <canvas ref={canvasRef} className="h-full w-full" />
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
      </div>
    </ExampleWrapper>
  );
}
