"use client";

import React, { useState } from "react";
import { motion, type MotionStyle, type Transition } from "motion/react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

function BorderBeam({
  className,
  size = 200,
  delay = 0,
  duration = 15,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border-width:var(--border-beam-width)] border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}

function BorderBeamCard({
  duration,
  label,
}: {
  duration: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <BorderBeam size={200} duration={duration} borderWidth={1.5} />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-800">
            <Zap className="h-8 w-8 text-neutral-400" />
          </div>
          <span className="text-xs font-medium text-neutral-400">{label}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="font-mono text-xs text-neutral-400">{duration}s</div>
      </div>
    </div>
  );
}

export function BorderBeamDemo() {
  const [speed, setSpeed] = useState(15);
  const [borderWidth, setBorderWidth] = useState(1.5);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `/* Container with border masking */
.border-beam-container {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
}

/* Border beam element */
.border-beam {
  position: absolute;
  inset: 0;
  border-width: ${borderWidth}px;
  border-color: transparent;
  border-radius: inherit;

  /* Mask to show only border area */
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  mask-image:
    linear-gradient(transparent, transparent),
    linear-gradient(#000, #000);
}

/* Animated gradient element */
.border-beam-gradient {
  position: absolute;
  aspect-ratio: 1;
  width: 200px;
  background: linear-gradient(
    to left,
    #ffaa40,
    #9c40ff,
    transparent
  );

  /* Follow the border path */
  offset-path: rect(0 auto auto 0 round 200px);
  animation: border-beam-animate ${speed}s linear infinite;
}

@keyframes border-beam-animate {
  to {
    offset-distance: 100%;
  }
}`;

  const motionCode = `import { motion } from "motion/react";

function BorderBeam({ duration = ${speed} }) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
      <motion.div
        className="absolute aspect-square"
        style={{
          width: 200,
          offsetPath: "rect(0 auto auto 0 round 200px)",
          background: "linear-gradient(to left, #ffaa40, #9c40ff, transparent)",
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      />
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Rotating Border Beam"
      description="An animated gradient that travels along the border path. Uses CSS offset-path for smooth, performant animation."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SliderControl
              label="Speed"
              value={speed}
              min={5}
              max={60}
              step={5}
              onChange={setSpeed}
              unit="s"
            />
            <SliderControl
              label="Width"
              value={Math.round(borderWidth * 10) / 10}
              min={0.5}
              max={3}
              step={0.5}
              onChange={setBorderWidth}
              unit="px"
            />
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "rounded-2xl px-4 py-2.5 text-xs font-medium shadow-sm transition-all active:scale-[0.98]",
              showCode
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "border border-neutral-200/60 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
            )}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Demo cards */}
        <div className="flex flex-wrap items-center justify-center gap-12">
          <BorderBeamCard duration={30} label="Slow" />
          <BorderBeamCard duration={speed} label="Custom" />
          <BorderBeamCard duration={8} label="Fast" />
        </div>

        {/* Info */}
        <div className="rounded-2xl border border-neutral-200/60 bg-neutral-50 p-5 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-white">
              Technique:{" "}
            </span>
            Uses CSS{" "}
            <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-xs dark:bg-neutral-800">
              offset-path
            </code>{" "}
            to animate a gradient along the border. The gradient follows a
            rectangular path with rounded corners, creating a smooth border beam
            effect.
          </p>
        </div>

        {/* Code */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
