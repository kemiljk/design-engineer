"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
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
  const [points, setPoints] = useState<[number, number, number, number]>([0.4, 0, 0.2, 1]);
  const [activePreset, setActivePreset] = useState<string>("snappy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const controls = useAnimationControls();
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<"p1" | "p2" | null>(null);

  const width = 280;
  const height = 280;
  const padding = 40;
  const gridSize = width - padding * 2;

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
    await controls.start({
      x: [0, 200],
      transition: { duration: 1, ease: points },
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    await controls.start({
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    });
    setIsPlaying(false);
  };

  const resetAnimation = async () => {
    setIsPlaying(false);
    await controls.set({ x: 0 });
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
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* SVG Curve Editor */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="touch-none select-none"
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
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
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
              <line x1={p0x} y1={p0y} x2={p1x} y2={p1y} stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.5" />
              <line x1={p3x} y1={p3y} x2={p2x} y2={p2y} stroke="#8b5cf6" strokeWidth="2" strokeOpacity="0.5" />

              {/* The curve */}
              <path
                d={curvePath}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Start and end points */}
              <circle cx={p0x} cy={p0y} r="4" fill="currentColor" className="text-neutral-400 dark:text-neutral-600" />
              <circle cx={p3x} cy={p3y} r="4" fill="currentColor" className="text-neutral-400 dark:text-neutral-600" />

              {/* Draggable control points */}
              <g onPointerDown={handlePointerDown("p1")} className="cursor-grab active:cursor-grabbing">
                <circle cx={p1x} cy={p1y} r="12" fill="transparent" /> {/* Hit target */}
                <circle cx={p1x} cy={p1y} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" className="shadow-sm" />
              </g>
              <g onPointerDown={handlePointerDown("p2")} className="cursor-grab active:cursor-grabbing">
                <circle cx={p2x} cy={p2y} r="12" fill="transparent" /> {/* Hit target */}
                <circle cx={p2x} cy={p2y} r="6" fill="#8b5cf6" stroke="white" strokeWidth="2" className="shadow-sm" />
              </g>

              {/* Axis labels */}
              <text x={padding - 8} y={padding + gridSize + 20} fill="currentColor" fontSize="10" className="text-neutral-400 dark:text-neutral-500">
                0
              </text>
              <text x={padding + gridSize} y={padding + gridSize + 20} fill="currentColor" fontSize="10" textAnchor="end" className="text-neutral-400 dark:text-neutral-500">
                time
              </text>
              <text x={padding - 12} y={padding + 4} fill="currentColor" fontSize="10" textAnchor="end" className="text-neutral-400 dark:text-neutral-500">
                prog
              </text>
            </svg>
          </div>

          {/* Value display */}
          <div
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
          >
            cubic-bezier(
            <span className="text-blue-500">{points[0].toFixed(2)}</span>,{" "}
            <span className="text-blue-500">{points[1].toFixed(2)}</span>,{" "}
            <span className="text-violet-500">{points[2].toFixed(2)}</span>,{" "}
            <span className="text-violet-500">{points[3].toFixed(2)}</span>)
          </div>
        </div>

        {/* Preview area */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Preview
              </span>
              <div className="flex gap-2">
                <button
                  onClick={resetAnimation}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  onClick={playAnimation}
                  disabled={isPlaying}
                  className="flex h-8 items-center gap-2 bg-neutral-900 px-3 text-xs font-medium text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-1 dark:ring-neutral-700/80 dark:hover:bg-neutral-700 dark:hover:text-white"
                >
                  <Play className="size-3.5 fill-current" />
                  {isPlaying ? "Playing..." : "Play"}
                </button>
              </div>
            </div>

            {/* Animation track */}
            <div className="relative h-24 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="absolute top-1/2 left-6 right-6 h-px bg-neutral-200 dark:bg-neutral-800" />
              <motion.div
                animate={controls}
                initial={{ x: 0 }}
                className="absolute left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
              />
            </div>
          </div>

          {/* More presets */}
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              More Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.slice(4).map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    activePreset === preset.name 
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" 
                      : "bg-white text-neutral-600 hover:bg-neutral-50 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-neutral-700"
                  )}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Code panel */}
          {showCode && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <CodePanel tabs={codeTabs} />
            </motion.div>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}
