"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import {
  easings,
  formatCubicBezier,
  getThemeGradient,
  getThemeColors,
} from "./motion-utils";

type EasingPreset = {
  name: string;
  points: readonly [number, number, number, number];
};

const presets: EasingPreset[] = [
  { name: "ease", points: easings.ease },
  { name: "ease-out", points: easings.easeOut },
  { name: "ease-in", points: easings.easeIn },
  { name: "ease-in-out", points: easings.easeInOut },
  { name: "linear", points: easings.linear },
  { name: "snappy", points: easings.snappy },
  { name: "bounce", points: easings.bounce },
  { name: "expo-out", points: easings.expOut },
];

export function EasingPlaygroundDemo() {
  const [points, setPoints] = useState<[number, number, number, number]>([
    0.4, 0, 0.2, 1,
  ]);
  const [activePreset, setActivePreset] = useState<string>("snappy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [loopMode, setLoopMode] = useState(false);
  const [progress, setProgress] = useState(0);

  const controls = useAnimationControls();
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<"p1" | "p2" | null>(null);

  const width = 400;
  const height = 400;
  const padding = 50;
  const gridSize = width - padding * 2;

  // Use velocity theme colors
  const [velocityFrom, velocityTo] = getThemeColors("velocity");

  const toSvg = (x: number, y: number): [number, number] => [
    padding + x * gridSize,
    padding + (1 - y) * gridSize,
  ];

  const fromSvg = (svgX: number, svgY: number): [number, number] => {
    const x = Math.max(0, Math.min(1, (svgX - padding) / gridSize));
    const y = Math.max(-0.5, Math.min(1.5, 1 - (svgY - padding) / gridSize));
    return [x, y];
  };

  const handlePointerDown = (point: "p1" | "p2") => (e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = point;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current || !svgRef.current) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const [normX, normY] = fromSvg(x, y);

    setPoints((prev) => {
      const next = [...prev] as [number, number, number, number];
      if (draggingRef.current === "p1") {
        next[0] = normX;
        next[1] = normY;
      } else {
        next[2] = normX;
        next[3] = normY;
      }
      return next;
    });
    setActivePreset("");
  }, []);

  const handlePointerUp = () => {
    draggingRef.current = null;
  };

  const playAnimation = async () => {
    setIsPlaying(true);
    setProgress(0);

    do {
      // Animate progress for visual feedback
      const startTime = Date.now();
      const duration = 1000; // 1 second

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
      }, 16); // ~60fps

      await controls.start({
        left: "calc(100% - 64px)",
        transition: { duration: 1, ease: points },
      });

      clearInterval(progressInterval);
      setProgress(100);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await controls.start({
        left: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      setProgress(0);

      if (loopMode) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    } while (loopMode && isPlaying);

    setIsPlaying(false);
    setProgress(0);
  };

  const resetAnimation = async () => {
    setIsPlaying(false);
    setProgress(0);
    await controls.set({ left: 0 });
  };

  const applyPreset = (preset: EasingPreset) => {
    setPoints([...preset.points] as [number, number, number, number]);
    setActivePreset(preset.name);
  };

  const cssCode = `transition-timing-function: ${formatCubicBezier(points)};

/* Or with full transition shorthand */
transition: transform 1s ${formatCubicBezier(points)};`;

  const motionCode = `import { motion } from "motion/react";

<motion.div
  animate={{ x: "100%" }}
  transition={{
    duration: 1,
    ease: [${points.map((p) => p.toFixed(2)).join(", ")}]
  }}
/>`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  const [p0x, p0y] = toSvg(0, 0);
  const [p1x, p1y] = toSvg(points[0], points[1]);
  const [p2x, p2y] = toSvg(points[2], points[3]);
  const [p3x, p3y] = toSvg(1, 1);
  const curvePath = `M ${p0x} ${p0y} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${p3x} ${p3y}`;

  return (
    <ExampleWrapper
      title="Easing Curve Playground"
      description="Drag the control points to create custom easing curves. See the effect in real-time."
      controls={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Presets">
            <div className="flex flex-wrap gap-1.5">
              {presets.slice(0, 4).map((preset) => (
                <ControlButton
                  key={preset.name}
                  active={activePreset === preset.name}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </ControlButton>
              ))}
            </div>
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
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* SVG Curve Editor */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              className="h-auto w-full touch-none select-none"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Grid */}
              <defs>
                <pattern
                  id="grid"
                  width={gridSize / 10}
                  height={gridSize / 10}
                  patternUnits="userSpaceOnUse"
                  x={padding}
                  y={padding}
                >
                  <path
                    d={`M ${gridSize / 10} 0 L 0 0 0 ${gridSize / 10}`}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient
                  id="curveGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={velocityFrom} />
                  <stop offset="100%" stopColor={velocityTo} />
                </linearGradient>
              </defs>
              <rect
                x={padding}
                y={padding}
                width={gridSize}
                height={gridSize}
                fill="url(#grid)"
                className="text-neutral-900 dark:text-white"
              />

              {/* Diagonal reference line */}
              <line
                x1={p0x}
                y1={p0y}
                x2={p3x}
                y2={p3y}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-neutral-900 dark:text-white"
              />

              {/* Control point lines */}
              <line
                x1={p0x}
                y1={p0y}
                x2={p1x}
                y2={p1y}
                stroke={velocityFrom}
                strokeWidth="2"
                strokeOpacity="0.5"
              />
              <line
                x1={p3x}
                y1={p3y}
                x2={p2x}
                y2={p2y}
                stroke={velocityTo}
                strokeWidth="2"
                strokeOpacity="0.5"
              />

              {/* The curve */}
              <path
                d={curvePath}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Start and end points */}
              <circle
                cx={p0x}
                cy={p0y}
                r="4"
                fill="currentColor"
                className="text-neutral-400 dark:text-neutral-600"
              />
              <circle
                cx={p3x}
                cy={p3y}
                r="4"
                fill="currentColor"
                className="text-neutral-400 dark:text-neutral-600"
              />

              {/* Draggable control points */}
              <g
                onPointerDown={handlePointerDown("p1")}
                className="cursor-grab active:cursor-grabbing"
              >
                <circle cx={p1x} cy={p1y} r="14" fill="transparent" />{" "}
                {/* Hit target */}
                <circle
                  cx={p1x}
                  cy={p1y}
                  r="7"
                  fill={velocityFrom}
                  stroke="white"
                  strokeWidth="2.5"
                  className="shadow-sm"
                />
              </g>
              <g
                onPointerDown={handlePointerDown("p2")}
                className="cursor-grab active:cursor-grabbing"
              >
                <circle cx={p2x} cy={p2y} r="14" fill="transparent" />{" "}
                {/* Hit target */}
                <circle
                  cx={p2x}
                  cy={p2y}
                  r="7"
                  fill={velocityTo}
                  stroke="white"
                  strokeWidth="2.5"
                  className="shadow-sm"
                />
              </g>

              {/* Axis labels */}
              <text
                x={padding - 8}
                y={padding + gridSize + 20}
                fill="currentColor"
                fontSize="10"
                className="text-neutral-400 dark:text-neutral-500"
              >
                0
              </text>
              <text
                x={padding + gridSize}
                y={padding + gridSize + 20}
                fill="currentColor"
                fontSize="10"
                textAnchor="end"
                className="text-neutral-400 dark:text-neutral-500"
              >
                time
              </text>
              <text
                x={padding - 12}
                y={padding + 4}
                fill="currentColor"
                fontSize="10"
                textAnchor="end"
                className="text-neutral-400 dark:text-neutral-500"
              >
                prog
              </text>
            </svg>
          </div>

          {/* Value display */}
          <div className="border border-neutral-200/60 bg-neutral-50 px-4 py-3 font-mono text-xs text-neutral-600 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400">
            cubic-bezier(
            <span style={{ color: velocityFrom }}>
              {points[0].toFixed(2)}
            </span>,{" "}
            <span style={{ color: velocityFrom }}>{points[1].toFixed(2)}</span>,{" "}
            <span style={{ color: velocityTo }}>{points[2].toFixed(2)}</span>,{" "}
            <span style={{ color: velocityTo }}>{points[3].toFixed(2)}</span>)
          </div>
        </div>

        {/* Preview area */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="space-y-6">
            {/* Controls at top */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={playAnimation}
                disabled={isPlaying}
                className="flex h-10 items-center gap-2 bg-neutral-900 px-5 text-xs font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <Play className="size-3.5 fill-current" />
                {isPlaying ? "Playing..." : "Play Animation"}
              </button>
              <button
                onClick={resetAnimation}
                className="flex h-10 w-10 items-center justify-center border border-neutral-200/60 text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.98] dark:border-neutral-800/60 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                onClick={() => setLoopMode(!loopMode)}
                className={cn(
                  "flex h-10 items-center gap-2 px-4 text-xs font-medium shadow-sm transition-all active:scale-[0.98]",
                  loopMode
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "border border-neutral-200/60 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
                )}
              >
                Loop {loopMode ? "On" : "Off"}
              </button>
            </div>

            {/* Animation track */}
            <div className="relative h-32 overflow-hidden rounded-3xl border border-neutral-200/60 bg-neutral-50 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
              {/* Progress bar */}
              {isPlaying && progress > 0 && (
                <div className="absolute top-4 right-6 left-6 h-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="h-full transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      background: getThemeGradient("velocity"),
                    }}
                  />
                </div>
              )}

              {/* Track line */}
              <div className="absolute top-1/2 right-6 left-6 h-px bg-neutral-200 dark:bg-neutral-800" />

              {/* Animation container - full track width */}
              <div className="absolute inset-y-0 right-6 left-6">
                <motion.div
                  animate={controls}
                  initial={{ left: 0 }}
                  className="absolute top-1/2 h-16 w-16 -translate-y-1/2 rounded-3xl shadow-lg"
                  style={{
                    background: getThemeGradient("velocity"),
                    boxShadow: `0 10px 30px -10px ${velocityFrom}40`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* More presets */}
          <div>
            <span className="mb-3 block text-[10px] font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              More Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.slice(4).map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "px-4 py-2 text-xs font-medium shadow-sm transition-all active:scale-[0.98]",
                    activePreset === preset.name
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "border border-neutral-200/60 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
                  )}
                >
                  {preset.name}
                </button>
              ))}
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
      </div>
    </ExampleWrapper>
  );
}
