"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";
import { easings, formatCubicBezier } from "./motion-utils";

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
  // Control points for cubic-bezier (x1, y1, x2, y2)
  const [points, setPoints] = useState<[number, number, number, number]>([
    0.4, 0, 0.2, 1,
  ]);
  const [activePreset, setActivePreset] = useState<string>("snappy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const controls = useAnimationControls();
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<"p1" | "p2" | null>(null);

  // SVG dimensions
  const width = 280;
  const height = 280;
  const padding = 40;
  const gridSize = width - padding * 2;

  // Convert normalised coords to SVG coords
  const toSvg = (x: number, y: number): [number, number] => [
    padding + x * gridSize,
    padding + (1 - y) * gridSize,
  ];

  // Convert SVG coords to normalised coords
  const fromSvg = (svgX: number, svgY: number): [number, number] => {
    const x = Math.max(0, Math.min(1, (svgX - padding) / gridSize));
    const y = Math.max(-0.5, Math.min(1.5, 1 - (svgY - padding) / gridSize));
    return [x, y];
  };

  // Handle mouse/touch drag
  const handlePointerDown = (point: "p1" | "p2") => (e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = point;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
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
    },
    []
  );

  const handlePointerUp = () => {
    draggingRef.current = null;
  };

  // Play animation
  const playAnimation = async () => {
    setIsPlaying(true);
    await controls.start({
      x: [0, 200],
      transition: {
        duration: 1,
        ease: points as unknown as number[],
      },
    });
    setIsPlaying(false);
  };

  // Reset animation
  const resetAnimation = async () => {
    setIsPlaying(false);
    await controls.set({ x: 0 });
  };

  // Apply preset
  const applyPreset = (preset: EasingPreset) => {
    setPoints([...preset.points] as [number, number, number, number]);
    setActivePreset(preset.name);
  };

  // Generate code
  const cssCode = `transition-timing-function: ${formatCubicBezier(points)};

/* Or with full transition shorthand */
transition: transform 1s ${formatCubicBezier(points)};`;

  const motionCode = `import { motion } from "motion/react";

<motion.div
  animate={{ x: 200 }}
  transition={{
    duration: 1,
    ease: [${points.map((p) => p.toFixed(2)).join(", ")}]
  }}
/>`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  // Build the bezier curve path
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
          <ControlGroup label="">
            <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
              {showCode ? "Hide Code" : "Show Code"}
            </ControlButton>
          </ControlGroup>
        </div>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* SVG Curve Editor */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-lg border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-900">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="touch-none"
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
                    strokeWidth="0.5"
                    className="text-neutral-200 dark:text-neutral-800"
                  />
                </pattern>
              </defs>
              <rect
                x={padding}
                y={padding}
                width={gridSize}
                height={gridSize}
                fill="url(#grid)"
                className="text-neutral-100 dark:text-neutral-900"
              />

              {/* Diagonal reference line */}
              <line
                x1={p0x}
                y1={p0y}
                x2={p3x}
                y2={p3y}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-neutral-300 dark:text-neutral-700"
              />

              {/* Control point lines */}
              <line
                x1={p0x}
                y1={p0y}
                x2={p1x}
                y2={p1y}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-400"
              />
              <line
                x1={p3x}
                y1={p3y}
                x2={p2x}
                y2={p2y}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-violet-400"
              />

              {/* The curve */}
              <path
                d={curvePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-swiss-red"
              />

              {/* Start and end points */}
              <circle
                cx={p0x}
                cy={p0y}
                r="4"
                className="fill-neutral-400 dark:fill-neutral-600"
              />
              <circle
                cx={p3x}
                cy={p3y}
                r="4"
                className="fill-neutral-400 dark:fill-neutral-600"
              />

              {/* Draggable control points */}
              <g
                onPointerDown={handlePointerDown("p1")}
                className="cursor-grab active:cursor-grabbing"
              >
                <circle
                  cx={p1x}
                  cy={p1y}
                  r="12"
                  className="fill-blue-500/20"
                />
                <circle
                  cx={p1x}
                  cy={p1y}
                  r="6"
                  className="fill-blue-500 stroke-white stroke-2"
                />
              </g>
              <g
                onPointerDown={handlePointerDown("p2")}
                className="cursor-grab active:cursor-grabbing"
              >
                <circle
                  cx={p2x}
                  cy={p2y}
                  r="12"
                  className="fill-violet-500/20"
                />
                <circle
                  cx={p2x}
                  cy={p2y}
                  r="6"
                  className="fill-violet-500 stroke-white stroke-2"
                />
              </g>

              {/* Axis labels */}
              <text
                x={padding - 8}
                y={padding + gridSize + 20}
                className="fill-neutral-500 text-[10px] font-medium"
                textAnchor="start"
              >
                0
              </text>
              <text
                x={padding + gridSize}
                y={padding + gridSize + 20}
                className="fill-neutral-500 text-[10px] font-medium"
                textAnchor="end"
              >
                time
              </text>
              <text
                x={padding - 12}
                y={padding + 4}
                className="fill-neutral-500 text-[10px] font-medium"
                textAnchor="end"
              >
                progress
              </text>
            </svg>
          </div>

          {/* Value display */}
          <div className="font-mono text-xs text-neutral-500">
            cubic-bezier(
            <span className="text-blue-500">{points[0].toFixed(2)}</span>,{" "}
            <span className="text-blue-500">{points[1].toFixed(2)}</span>,{" "}
            <span className="text-violet-500">{points[2].toFixed(2)}</span>,{" "}
            <span className="text-violet-500">{points[3].toFixed(2)}</span>)
          </div>
        </div>

        {/* Preview area */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Animation preview */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-800">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">
                Preview
              </span>
              <div className="flex gap-2">
                <button
                  onClick={resetAnimation}
                  className="flex h-7 w-7 items-center justify-center rounded bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
                  aria-label="Reset"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  onClick={playAnimation}
                  disabled={isPlaying}
                  className={cn(
                    "flex h-7 items-center gap-1.5 rounded px-3 text-xs font-medium transition-colors",
                    isPlaying
                      ? "bg-neutral-300 text-neutral-500 dark:bg-neutral-600"
                      : "bg-swiss-red text-white hover:bg-swiss-red/90"
                  )}
                >
                  <Play className="size-3" />
                  Play
                </button>
              </div>
            </div>

            {/* Animation track */}
            <div className="relative h-12 rounded bg-neutral-200 dark:bg-neutral-700">
              <motion.div
                animate={controls}
                initial={{ x: 0 }}
                className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded bg-swiss-red shadow-lg"
              />
            </div>
          </div>

          {/* More presets */}
          <div className="flex flex-wrap gap-1.5">
            {presets.slice(4).map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                  activePreset === preset.name
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Code panel */}
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CodePanel tabs={codeTabs} />
            </motion.div>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}

