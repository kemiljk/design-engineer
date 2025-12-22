"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type SpringConfig = {
  mass: number;
  stiffness: number;
  damping: number;
};

type OutputFormat = "framer" | "swift" | "css" | "android";

const PRESETS: Record<string, SpringConfig> = {
  Bouncy: { mass: 1, stiffness: 300, damping: 10 },
  Snappy: { mass: 1, stiffness: 500, damping: 20 },
  Gentle: { mass: 1, stiffness: 100, damping: 15 },
  Wobbly: { mass: 1, stiffness: 180, damping: 8 },
  Stiff: { mass: 1, stiffness: 200, damping: 50 },
};

const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "framer", label: "Framer Motion" },
  { value: "swift", label: "SwiftUI" },
  { value: "css", label: "CSS" },
  { value: "android", label: "Android" },
];

export default function SpringPhysicsPlayground() {
  const [config, setConfig] = useState<SpringConfig>(PRESETS.Bouncy);
  const [activePreset, setActivePreset] = useState<string>("Bouncy");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("framer");
  const [key, setKey] = useState(0);

  const handlePresetClick = (name: string) => {
    setConfig(PRESETS[name]);
    setActivePreset(name);
    setKey((prev) => prev + 1);
  };

  const handleSliderChange = (
    configKey: keyof SpringConfig,
    value: number
  ) => {
    setConfig((prev) => ({ ...prev, [configKey]: value }));
    setActivePreset("Custom");
    setKey((prev) => prev + 1);
  };

  // Generate CSS spring keyframes using physics simulation
  const generateCssSpring = useMemo(() => {
    const { mass, stiffness, damping } = config;
    const steps = 60;
    const duration = 1;
    const keyframes: number[] = [];
    
    // Physics simulation
    let position = 0;
    let velocity = 1;
    const dt = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      const springForce = -stiffness * (position - 1);
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;
      
      velocity += acceleration * dt;
      position += velocity * dt;
      keyframes.push(position);
    }
    
    // Generate linear() function values
    const linearValues = keyframes.map((v, i) => {
      const progress = (i / steps) * 100;
      return `${v.toFixed(3)}`;
    }).join(", ");
    
    // Calculate estimated duration based on settling time
    const settlingTime = Math.min(2, Math.max(0.3, 4 * mass / damping));
    
    return {
      linearValues,
      duration: settlingTime.toFixed(2)
    };
  }, [config]);

  // Code snippets for each format
  const codeSnippets: Record<OutputFormat, string> = {
    framer: `transition={{
  type: "spring",
  mass: ${config.mass},
  stiffness: ${config.stiffness},
  damping: ${config.damping}
}}`,
    swift: `.animation(.spring(
  response: ${calculateResponse(config.stiffness, config.mass).toFixed(2)},
  dampingFraction: ${calculateDampingRatio(config.stiffness, config.damping, config.mass).toFixed(2)}
))`,
    css: `/* CSS Spring Animation */
.element {
  transition: transform ${generateCssSpring.duration}s linear(${generateCssSpring.linearValues});
}

/* Or use keyframes for more control */
@keyframes spring-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.element {
  animation: spring-in ${generateCssSpring.duration}s linear(${generateCssSpring.linearValues});
}`,
    android: `// Jetpack Compose
import androidx.compose.animation.core.*

val springSpec = spring<Float>(
    dampingRatio = ${calculateDampingRatio(config.stiffness, config.damping, config.mass).toFixed(2)}f,
    stiffness = ${config.stiffness}f
)

// Usage
animateFloatAsState(
    targetValue = 1f,
    animationSpec = springSpec
)`,
  };

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
                  "rounded-none px-4 py-2 text-sm font-medium transition-colors",
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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Code</h2>
            <div className="flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setOutputFormat(option.value)}
                  className={clsx(
                    "rounded-md px-2 py-1 text-[10px] font-medium transition-colors",
                    outputFormat === option.value
                      ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <CodeBlock
            label={FORMAT_OPTIONS.find(f => f.value === outputFormat)?.label || ""}
            code={codeSnippets[outputFormat]}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="relative flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-950">
        <button
          onClick={() => setKey((prev) => prev + 1)}
          className="absolute right-4 top-4 rounded-none bg-white p-2 text-neutral-600 shadow-sm hover:text-neutral-900 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white"
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

// Helpers for SwiftUI/Android conversion
function calculateResponse(stiffness: number, mass: number): number {
  return 2 * Math.PI * Math.sqrt(mass / stiffness);
}

function calculateDampingRatio(stiffness: number, damping: number, mass: number): number {
  return damping / (2 * Math.sqrt(mass * stiffness));
}
