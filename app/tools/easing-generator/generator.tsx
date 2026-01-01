"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useSpring } from "motion/react";
import { useDrag } from "@use-gesture/react";
import { Copy, Check } from "iconoir-react";

type Point = { x: number; y: number };

const PRESETS = {
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  "linear": [0, 0, 1, 1],
  "swift-out": [0.4, 0.0, 0.2, 1.0],
};

const SPRING_CONFIG = { stiffness: 600, damping: 40 };

function DragHandle({
  point,
  setPoint,
  graphSize,
  padding,
  size,
  onDragStart,
  onDragEnd,
  color = "#FF3333",
}: {
  point: Point;
  setPoint: (p: Point) => void;
  graphSize: number;
  padding: number;
  size: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  color?: string;
}) {
  const containerRef = useRef<SVGGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const toGraph = (val: number, isY = false) => {
    if (isY) return size - padding - val * graphSize;
    return padding + val * graphSize;
  };

  const fromGraph = (val: number, isY = false) => {
    if (isY) return (size - padding - val) / graphSize;
    return (val - padding) / graphSize;
  };

  const springX = useSpring(toGraph(point.x), SPRING_CONFIG);
  const springY = useSpring(toGraph(point.y, true), SPRING_CONFIG);

  React.useEffect(() => {
    if (!isDragging) {
      springX.set(toGraph(point.x));
      springY.set(toGraph(point.y, true));
    }
  }, [point.x, point.y, isDragging, springX, springY]);

  const bind = useDrag(
    ({ active, xy: [clientX, clientY], first, last, memo, event }) => {
      event?.preventDefault();
      event?.stopPropagation();

      if (first) {
        setIsDragging(true);
        onDragStart();
        const svg = containerRef.current?.ownerSVGElement;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        return { rect, offsetX: 0, offsetY: 0 };
      }

      const state = memo as { rect: DOMRect; offsetX: number; offsetY: number };
      if (!state?.rect) return memo;

      const { rect } = state;
      const scale = size / rect.width;
      const svgX = (clientX - rect.left) * scale;
      const svgY = (clientY - rect.top) * scale;

      const x = Math.max(0, Math.min(1, fromGraph(svgX)));
      const y = fromGraph(svgY, true);

      springX.set(toGraph(x));
      springY.set(toGraph(y, true));
      setPoint({ x, y });

      if (last) {
        setIsDragging(false);
        onDragEnd();
      }

      return memo;
    },
    {
      pointer: { touch: true },
      filterTaps: true,
      preventDefault: true,
    }
  );

  return (
    <g
      ref={containerRef}
      {...bind()}
      style={{ touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Large invisible hit area for easier touch/click targeting */}
      <motion.circle
        cx={springX}
        cy={springY}
        r="28"
        fill="transparent"
        className="pointer-events-auto"
      />
      {/* Visual handle with spring animation */}
      <motion.circle
        cx={springX}
        cy={springY}
        r={isDragging ? 12 : 8}
        fill={color}
        className="pointer-events-none"
        style={{
          filter: isDragging ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))" : "none",
        }}
        animate={{ scale: isDragging ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* Outer ring indicator when dragging */}
      {isDragging && (
        <motion.circle
          cx={springX}
          cy={springY}
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeOpacity={0.3}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        />
      )}
    </g>
  );
}

export default function EasingGenerator() {
  const [p1, setP1] = useState<Point>({ x: 0.42, y: 0 });
  const [p2, setP2] = useState<Point>({ x: 0.58, y: 1 });
  const [activePreset, setActivePreset] = useState<string>("ease-in-out");
  const [copied, setCopied] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const bezierString = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  const handlePresetChange = (name: string, values: number[]) => {
    setP1({ x: values[0], y: values[1] });
    setP2({ x: values[2], y: values[3] });
    setActivePreset(name);
    setAnimationKey((prev) => prev + 1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bezierString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setActivePreset("custom");
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const size = 300;
  const padding = 40;
  const graphSize = size - padding * 2;

  const toGraph = (val: number, isY = false) => {
    if (isY) return size - padding - val * graphSize;
    return padding + val * graphSize;
  };

  const controlLineSpringX1 = useSpring(toGraph(p1.x), SPRING_CONFIG);
  const controlLineSpringY1 = useSpring(toGraph(p1.y, true), SPRING_CONFIG);
  const controlLineSpringX2 = useSpring(toGraph(p2.x), SPRING_CONFIG);
  const controlLineSpringY2 = useSpring(toGraph(p2.y, true), SPRING_CONFIG);

  React.useEffect(() => {
    controlLineSpringX1.set(toGraph(p1.x));
    controlLineSpringY1.set(toGraph(p1.y, true));
    controlLineSpringX2.set(toGraph(p2.x));
    controlLineSpringY2.set(toGraph(p2.y, true));
  }, [p1.x, p1.y, p2.x, p2.y]);

  return (
    <div className="space-y-8">
      {/* Graph Visualiser */}
      <div className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="aspect-square w-full max-w-[400px] select-none overflow-visible"
          style={{ touchAction: "none" }}
        >
          {/* Grid/Axes */}
          <line
            x1={padding}
            y1={size - padding}
            x2={size - padding}
            y2={size - padding}
            stroke="#e5e5e5"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={size - padding}
            stroke="#e5e5e5"
            strokeWidth="2"
          />
          <line
            x1={size - padding}
            y1={padding}
            x2={size - padding}
            y2={size - padding}
            stroke="#e5e5e5"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={padding}
            y1={padding}
            x2={size - padding}
            y2={padding}
            stroke="#e5e5e5"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Linear Reference */}
          <line
            x1={padding}
            y1={size - padding}
            x2={size - padding}
            y2={padding}
            stroke="#e5e5e5"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Bezier Curve */}
          <motion.path
            d={`M ${padding} ${size - padding} C ${toGraph(p1.x)} ${toGraph(p1.y, true)}, ${toGraph(p2.x)} ${toGraph(p2.y, true)}, ${size - padding} ${padding}`}
            fill="none"
            stroke="#FF3333"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Control Lines with spring animation */}
          <motion.line
            x1={padding}
            y1={size - padding}
            x2={controlLineSpringX1}
            y2={controlLineSpringY1}
            stroke="#FF3333"
            strokeWidth="1.5"
            strokeOpacity={0.5}
            strokeLinecap="round"
          />
          <motion.line
            x1={size - padding}
            y1={padding}
            x2={controlLineSpringX2}
            y2={controlLineSpringY2}
            stroke="#FF3333"
            strokeWidth="1.5"
            strokeOpacity={0.5}
            strokeLinecap="round"
          />

          {/* Start and end points */}
          <circle cx={padding} cy={size - padding} r="4" fill="#999" />
          <circle cx={size - padding} cy={padding} r="4" fill="#999" />

          {/* Drag Handles */}
          <DragHandle
            point={p1}
            setPoint={setP1}
            graphSize={graphSize}
            padding={padding}
            size={size}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <DragHandle
            point={p2}
            setPoint={setP2}
            graphSize={graphSize}
            padding={padding}
            size={size}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-8 sm:p-6">
        <div>
          <h2 className="mb-4 text-lg font-bold">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([name, values]) => (
              <button
                key={name}
                onClick={() => handlePresetChange(name, values)}
                className={`rounded-none px-4 py-2 text-sm font-medium transition-colors ${
                  activePreset === name
                    ? "bg-swiss-red text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Value</h2>
          <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950 sm:p-4">
            <code className="min-w-0 break-all font-mono text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
              {bezierString}
            </code>
            <button
              onClick={copyToClipboard}
              className="shrink-0 text-neutral-400 hover:text-swiss-red"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-950 sm:p-6">
          <h3 className="mb-4 text-sm font-bold uppercase text-neutral-500">
            Preview
          </h3>
          <div className="relative h-8 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
            <motion.div
              key={animationKey}
              className="absolute left-0 top-0 h-8 w-8 rounded-full bg-swiss-red shadow-sm"
              initial={{ left: "0%" }}
              animate={{ left: "calc(100% - 32px)" }}
              transition={{
                duration: 1,
                ease: [p1.x, p1.y, p2.x, p2.y],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
