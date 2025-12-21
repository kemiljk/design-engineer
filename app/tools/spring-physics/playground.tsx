"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { clsx } from "clsx";

type SpringConfig = {
  mass: number;
  stiffness: number;
  damping: number;
};

const PRESETS: Record<string, SpringConfig> = {
  Bouncy: { mass: 1, stiffness: 300, damping: 10 },
  Snappy: { mass: 1, stiffness: 500, damping: 20 },
  Gentle: { mass: 1, stiffness: 100, damping: 15 },
  Wobbly: { mass: 1, stiffness: 180, damping: 8 },
  Stiff: { mass: 1, stiffness: 200, damping: 50 },
};

export default function SpringPhysicsPlayground() {
  const [config, setConfig] = useState<SpringConfig>(PRESETS.Bouncy);
  const [activePreset, setActivePreset] = useState<string>("Bouncy");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  
  // Animation trigger state
  const [key, setKey] = useState(0);

  const handlePresetClick = (name: string) => {
    setConfig(PRESETS[name]);
    setActivePreset(name);
    setKey((prev) => prev + 1);
  };

  const handleSliderChange = (
    key: keyof SpringConfig,
    value: number
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setActivePreset("Custom");
    setKey((prev) => prev + 1);
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Generate code snippets
  const framerCode = `transition={{
  type: "spring",
  mass: ${config.mass},
  stiffness: ${config.stiffness},
  damping: ${config.damping}
}}`;

  const swiftCode = `.animation(.spring(
  response: ${calculateResponse(config.stiffness, config.mass).toFixed(2)},
  dampingFraction: ${calculateDampingRatio(config.stiffness, config.damping, config.mass).toFixed(2)}
))`;

  const cssCode = `/* CSS Linear Approximation */
transition: all 0.5s linear(
  /* Complex calculation required for accurate CSS spring approximation */
  /* This is a placeholder as direct mapping is non-trivial without a generator library */
  0, 0.009, 0.035, 0.076, 0.133, 0.203, 0.284, 0.373, 0.468, 0.566,
  0.664, 0.759, 0.85, 0.933, 1
);`;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls Section */}
      <div className="space-y-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div>
          <h2 className="mb-4 text-lg font-bold">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(PRESETS).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activePreset === preset
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold">Configuration</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Stiffness
                </label>
                <span className="font-mono text-sm">{config.stiffness}</span>
              </div>
              <input
                type="range"
                min="1"
                max="1000"
                value={config.stiffness}
                onChange={(e) =>
                  handleSliderChange("stiffness", Number(e.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Damping
                </label>
                <span className="font-mono text-sm">{config.damping}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={config.damping}
                onChange={(e) =>
                  handleSliderChange("damping", Number(e.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Mass
                </label>
                <span className="font-mono text-sm">{config.mass}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={config.mass}
                onChange={(e) =>
                  handleSliderChange("mass", Number(e.target.value))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Code</h2>
          
          <div className="space-y-3">
            <CodeBlock
              label="Framer Motion / React"
              code={framerCode}
              onCopy={() => copyToClipboard(framerCode, "framer")}
              copied={copiedFormat === "framer"}
            />
            <CodeBlock
              label="SwiftUI"
              code={swiftCode}
              onCopy={() => copyToClipboard(swiftCode, "swift")}
              copied={copiedFormat === "swift"}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-950">
        <button
          onClick={() => setKey((prev) => prev + 1)}
          className="absolute right-4 top-4 rounded-full bg-white p-2 text-neutral-600 shadow-sm hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          title="Replay Animation"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        <div className="flex w-full flex-col gap-12">
          {/* Scale Animation */}
          <div className="flex flex-col items-center gap-4">
             <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Scale</span>
             <motion.div
              key={`scale-${key}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                mass: config.mass,
                stiffness: config.stiffness,
                damping: config.damping,
              }}
              className="h-24 w-24 rounded-2xl bg-swiss-red shadow-lg"
            />
          </div>

          {/* Slide Animation */}
          <div className="flex flex-col items-center gap-4">
             <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Slide</span>
             <div className="w-full max-w-xs rounded-full bg-neutral-200 dark:bg-neutral-800 h-2 relative">
                <motion.div 
                  key={`slide-${key}`}
                  initial={{ x: -100 }}
                  animate={{ x: 100 }}
                  transition={{
                    type: "spring",
                    mass: config.mass,
                    stiffness: config.stiffness,
                    damping: config.damping,
                  }}
                  className="absolute top-1/2 left-1/2 -mt-4 -ml-4 h-8 w-8 rounded-full bg-blue-600 shadow-md"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({
  label,
  code,
  onCopy,
  copied,
}: {
  label: string;
  code: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="group relative rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-500">{label}</span>
        <button
          onClick={onCopy}
          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
          {code}
        </pre>
      </div>
    </div>
  );
}

// Helpers for SwiftUI conversion
// Approximate formulas for converting stiffness/mass/damping to response/dampingFraction
function calculateResponse(stiffness: number, mass: number): number {
  // T = 2 * pi * sqrt(mass / stiffness)
  // response is roughly the period T
  return 2 * Math.PI * Math.sqrt(mass / stiffness);
}

function calculateDampingRatio(stiffness: number, damping: number, mass: number): number {
  // dampingRatio = damping / (2 * sqrt(mass * stiffness))
  return damping / (2 * Math.sqrt(mass * stiffness));
}
