"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "iconoir-react";

type Point = { x: number; y: number };

const PRESETS = {
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  "linear": [0, 0, 1, 1],
  "swift-out": [0.4, 0.0, 0.2, 1.0], // Material Design standard
};

export default function EasingGenerator() {
  const [p1, setP1] = useState<Point>({ x: 0.42, y: 0 });
  const [p2, setP2] = useState<Point>({ x: 0.58, y: 1 });
  const [activePreset, setActivePreset] = useState<string>("ease-in-out");
  const [copied, setCopied] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const bezierString = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  const handlePresetChange = (name: string, values: number[]) => {
    setP1({ x: values[0], y: values[1] });
    setP2({ x: values[2], y: values[3] });
    setActivePreset(name);
    setAnimationKey(prev => prev + 1);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bezierString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Graph dimensions
  const size = 300;
  const padding = 40;
  const graphSize = size - padding * 2;

  // Coordinate conversion
  const toGraph = (val: number, isY = false) => {
    if (isY) return size - padding - val * graphSize;
    return padding + val * graphSize;
  };

  const fromGraph = (val: number, isY = false) => {
    if (isY) return (size - padding - val) / graphSize;
    return (val - padding) / graphSize;
  };

  // Drag logic would go here, simplified for this iteration to just sliders/inputs if drag is too complex without external libs like d3-drag or react-use-gesture.
  // Actually, let's use simple sliders for control points as "drag" on a canvas/svg in raw react can be verbose.
  // OR, we can just implement basic pointer events on the handles.

  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<"p1" | "p2" | null>(null);

  const handlePointerDown = (point: "p1" | "p2") => (e: React.PointerEvent) => {
    // Set pointer capture on the SVG so all move/up events are captured
    svgRef.current?.setPointerCapture(e.pointerId);
    setDragging(point);
    setActivePreset("custom");
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    // Scale client coordinates to SVG viewBox coordinates
    const scale = size / rect.width;
    const svgX = (e.clientX - rect.left) * scale;
    const svgY = (e.clientY - rect.top) * scale;
    
    const x = Math.max(0, Math.min(1, fromGraph(svgX)));
    // Allow y to go slightly outside 0-1 for elastic effects usually, but standard css cubic-bezier clamps somewhat visually. 
    // CSS bezier CAN go outside 0-1 range for Y.
    const y = fromGraph(svgY, true);

    if (dragging === "p1") setP1({ x, y });
    else setP2({ x, y });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Graph Visualizer */}
      <div className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${size} ${size}`}
          className="aspect-square w-full max-w-[400px] touch-none select-none overflow-visible"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Grid/Axes */}
          <line x1={padding} y1={size - padding} x2={size - padding} y2={size - padding} stroke="#e5e5e5" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={size - padding} stroke="#e5e5e5" strokeWidth="2" />
          <line x1={size - padding} y1={padding} x2={size - padding} y2={size - padding} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padding} y1={padding} x2={size - padding} y2={padding} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />

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
          <path
            d={`M ${padding} ${size - padding} C ${toGraph(p1.x)} ${toGraph(p1.y, true)}, ${toGraph(p2.x)} ${toGraph(p2.y, true)}, ${size - padding} ${padding}`}
            fill="none"
            stroke="#FF3333"
            strokeWidth="4"
          />

          {/* Control Lines */}
          <line
            x1={padding}
            y1={size - padding}
            x2={toGraph(p1.x)}
            y2={toGraph(p1.y, true)}
            stroke="#FF3333"
            strokeWidth="1"
            className="opacity-50"
          />
          <line
            x1={size - padding}
            y1={padding}
            x2={toGraph(p2.x)}
            y2={toGraph(p2.y, true)}
            stroke="#FF3333"
            strokeWidth="1"
            className="opacity-50"
          />

          {/* Handles - invisible larger hit area + visible handle */}
          <g className="cursor-pointer" onPointerDown={handlePointerDown("p1")}>
            <circle
              cx={toGraph(p1.x)}
              cy={toGraph(p1.y, true)}
              r="20"
              fill="transparent"
            />
            <circle
              cx={toGraph(p1.x)}
              cy={toGraph(p1.y, true)}
              r={dragging === "p1" ? 10 : 8}
              fill="#FF3333"
              className="pointer-events-none"
            />
          </g>
          <g className="cursor-pointer" onPointerDown={handlePointerDown("p2")}>
            <circle
              cx={toGraph(p2.x)}
              cy={toGraph(p2.y, true)}
              r="20"
              fill="transparent"
            />
            <circle
              cx={toGraph(p2.x)}
              cy={toGraph(p2.y, true)}
              r={dragging === "p2" ? 10 : 8}
              fill="#FF3333"
              className="pointer-events-none"
            />
          </g>
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
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-950 sm:p-6">
           <h3 className="mb-4 font-bold text-sm uppercase text-neutral-500">Preview</h3>
           <div className="relative h-8 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
              <motion.div
                key={animationKey}
                className="absolute top-0 left-0 h-8 w-8 rounded-full bg-swiss-red shadow-sm"
                initial={{ left: "0%" }}
                animate={{ left: "calc(100% - 32px)" }}
                transition={{
                    duration: 1,
                    ease: [p1.x, p1.y, p2.x, p2.y],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}
