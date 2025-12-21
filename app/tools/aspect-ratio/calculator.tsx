"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";

type AspectRatio = {
  w: number;
  h: number;
  label: string;
};

const PRESETS: AspectRatio[] = [
  { w: 16, h: 9, label: "16:9 (Video)" },
  { w: 4, h: 3, label: "4:3 (Classic)" },
  { w: 1, h: 1, label: "1:1 (Square)" },
  { w: 9, h: 16, label: "9:16 (Social)" },
  { w: 21, h: 9, label: "21:9 (Ultrawide)" },
  { w: 3, h: 2, label: "3:2 (Photo)" },
];

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [ratioW, setRatioW] = useState<number>(16);
  const [ratioH, setRatioH] = useState<number>(9);
  
  // To avoid circular dependency loops when typing, we track what was last edited
  // 'dim' = dimensions changed, 'ratio' = ratio changed
  const [mode, setMode] = useState<"dim" | "ratio">("dim");

  const handleDimensionChange = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    // Try to simplify ratio? Naive approach:
    // Actually, usually users want to lock ratio and find missing dim
    // But let's keep it simple: if you change dims, we just display the decimal ratio
  };

  const calculateMissing = (target: "w" | "h", value: number) => {
    if (target === "w") {
      // New Width provided, calc height based on current ratio
      setWidth(value);
      setHeight(Math.round(value * (ratioH / ratioW)));
    } else {
      setHeight(value);
      setWidth(Math.round(value * (ratioW / ratioH)));
    }
  };

  const applyPreset = (preset: AspectRatio) => {
    setRatioW(preset.w);
    setRatioH(preset.h);
    // Recalculate height based on current width and new ratio
    setHeight(Math.round(width * (preset.h / preset.w)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div>
          <h2 className="mb-4 text-lg font-bold">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  ratioW === preset.w && ratioH === preset.h
                    ? "bg-swiss-red text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-950">
             <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500">Ratio Width</label>
                <input 
                    type="number" 
                    value={ratioW}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setRatioW(val);
                        setHeight(Math.round(width * (ratioH / val)));
                    }}
                    className="w-full bg-transparent text-xl font-bold outline-none"
                />
             </div>
             <span className="text-xl font-bold text-neutral-300">:</span>
             <div className="flex-1 space-y-2 text-right">
                <label className="text-xs font-bold uppercase text-neutral-500">Ratio Height</label>
                 <input 
                    type="number" 
                    value={ratioH}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setRatioH(val);
                        setHeight(Math.round(width * (val / ratioW)));
                    }}
                    className="w-full bg-transparent text-xl font-bold outline-none text-right"
                />
             </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => calculateMissing("w", Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => calculateMissing("h", Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
          </div>
          
           <div className="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-800">
             <span className="text-sm text-neutral-500">Result CSS</span>
             <code className="mt-2 block font-mono font-bold">aspect-ratio: {ratioW} / {ratioH};</code>
           </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 p-8 dark:border-neutral-800 dark:bg-neutral-900">
         <div 
            className="flex items-center justify-center bg-swiss-red text-white shadow-lg transition-all duration-300"
            style={{
                aspectRatio: `${ratioW}/${ratioH}`,
                width: ratioW >= ratioH ? '100%' : 'auto',
                height: ratioH > ratioW ? '100%' : 'auto',
                maxWidth: '100%',
                maxHeight: '400px'
            }}
         >
            <div className="text-center">
                <div className="text-2xl font-bold">{width} x {height}</div>
                <div className="text-sm opacity-80">{ratioW}:{ratioH}</div>
            </div>
         </div>
      </div>
    </div>
  );
}
