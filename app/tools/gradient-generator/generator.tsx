"use client";

import React, { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type Platform = "css" | "tailwind" | "swift" | "android";
type GradientType = "linear" | "radial" | "conic";

type ColorStop = {
  id: string;
  color: string;
  position: number;
};

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
];

const PRESETS: Record<string, { type: GradientType; angle: number; stops: ColorStop[] }> = {
  Sunset: {
    type: "linear",
    angle: 135,
    stops: [
      { id: "1", color: "#ff6b6b", position: 0 },
      { id: "2", color: "#feca57", position: 100 },
    ],
  },
  Ocean: {
    type: "linear",
    angle: 180,
    stops: [
      { id: "1", color: "#667eea", position: 0 },
      { id: "2", color: "#764ba2", position: 100 },
    ],
  },
  Forest: {
    type: "linear",
    angle: 120,
    stops: [
      { id: "1", color: "#11998e", position: 0 },
      { id: "2", color: "#38ef7d", position: 100 },
    ],
  },
  Fire: {
    type: "linear",
    angle: 45,
    stops: [
      { id: "1", color: "#f12711", position: 0 },
      { id: "2", color: "#f5af19", position: 100 },
    ],
  },
  Night: {
    type: "linear",
    angle: 135,
    stops: [
      { id: "1", color: "#0f0c29", position: 0 },
      { id: "2", color: "#302b63", position: 50 },
      { id: "3", color: "#24243e", position: 100 },
    ],
  },
  Radial: {
    type: "radial",
    angle: 0,
    stops: [
      { id: "1", color: "#ffffff", position: 0 },
      { id: "2", color: "#000000", position: 100 },
    ],
  },
};

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#FF4400", position: 0 },
    { id: "2", color: "#000000", position: 100 },
  ]);
  const [platform, setPlatform] = useState<Platform>("css");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handlePresetClick = (name: string) => {
    const preset = PRESETS[name];
    setGradientType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops.map((s, i) => ({ ...s, id: String(i + 1) })));
    setActivePreset(name);
  };

  const addStop = () => {
    const newId = String(Date.now());
    const lastPosition = stops[stops.length - 1]?.position || 0;
    const newPosition = Math.min(lastPosition + 20, 100);
    setStops([...stops, { id: newId, color: "#888888", position: newPosition }]);
    setActivePreset(null);
  };

  const removeStop = (id: string) => {
    if (stops.length > 2) {
      setStops(stops.filter((s) => s.id !== id));
      setActivePreset(null);
    }
  };

  const updateStop = (id: string, key: keyof ColorStop, value: string | number) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
    setActivePreset(null);
  };

  // Generate gradient string
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsString = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");

  const cssGradient = () => {
    switch (gradientType) {
      case "linear":
        return `linear-gradient(${angle}deg, ${stopsString})`;
      case "radial":
        return `radial-gradient(circle, ${stopsString})`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${stopsString})`;
    }
  };

  // Code generators
  const generateCSS = () => {
    return `background: ${cssGradient()};`;
  };

  const generateTailwind = () => {
    const gradient = cssGradient();
    return `/* Tailwind v4 @theme */
@theme {
  --gradient-custom: ${gradient};
}

/* Usage with arbitrary value */
<div class="bg-[${gradient.replace(/ /g, "_")}]">

/* Or use built-in gradient utilities */
<div class="bg-gradient-to-r from-[${sortedStops[0]?.color}] to-[${sortedStops[sortedStops.length - 1]?.color}]">`;
  };

  const generateSwiftUI = () => {
    const swiftStops = sortedStops
      .map((s) => {
        const r = parseInt(s.color.slice(1, 3), 16) / 255;
        const g = parseInt(s.color.slice(3, 5), 16) / 255;
        const b = parseInt(s.color.slice(5, 7), 16) / 255;
        return `Gradient.Stop(color: Color(red: ${r.toFixed(2)}, green: ${g.toFixed(2)}, blue: ${b.toFixed(2)}), location: ${(s.position / 100).toFixed(2)})`;
      })
      .join(",\n      ");

    if (gradientType === "linear") {
      return `LinearGradient(
    gradient: Gradient(stops: [
      ${swiftStops}
    ]),
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)`;
    } else if (gradientType === "radial") {
      return `RadialGradient(
    gradient: Gradient(stops: [
      ${swiftStops}
    ]),
    center: .center,
    startRadius: 0,
    endRadius: 200
)`;
    }
    return `AngularGradient(
    gradient: Gradient(stops: [
      ${swiftStops}
    ]),
    center: .center,
    angle: .degrees(${angle})
)`;
  };

  const generateAndroid = () => {
    const colors = sortedStops.map((s) => `Color.parseColor("${s.color}")`).join(", ");
    const positions = sortedStops.map((s) => `${(s.position / 100).toFixed(2)}f`).join(", ");

    if (gradientType === "linear") {
      return `// Jetpack Compose
Brush.linearGradient(
    colorStops = arrayOf(
        ${sortedStops.map((s) => `${(s.position / 100).toFixed(2)}f to Color(0xFF${s.color.slice(1)})`).join(",\n        ")}
    ),
    start = Offset(0f, 0f),
    end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
)

// XML Drawable
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:type="linear"
        android:angle="${angle}"
        android:startColor="${sortedStops[0]?.color}"
        android:endColor="${sortedStops[sortedStops.length - 1]?.color}" />
</shape>`;
    }
    return `// Jetpack Compose - Radial
Brush.radialGradient(
    colorStops = arrayOf(
        ${sortedStops.map((s) => `${(s.position / 100).toFixed(2)}f to Color(0xFF${s.color.slice(1)})`).join(",\n        ")}
    ),
    center = Offset(0.5f, 0.5f),
    radius = 200f
)`;
  };

  const getCode = () => {
    switch (platform) {
      case "css":
        return generateCSS();
      case "tailwind":
        return generateTailwind();
      case "swift":
        return generateSwiftUI();
      case "android":
        return generateAndroid();
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        {/* Presets */}
        <div>
          <h2 className="mb-4 text-lg font-bold">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(PRESETS).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={clsx(
                  "rounded-none px-3 py-2 text-sm font-medium transition-colors",
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

        {/* Gradient Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Type
          </label>
          <div className="flex gap-2">
            {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setGradientType(type);
                  setActivePreset(null);
                }}
                className={clsx(
                  "flex-1 rounded-none px-3 py-2 text-sm font-medium capitalize transition-colors",
                  gradientType === type
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Angle (for linear/conic) */}
        {(gradientType === "linear" || gradientType === "conic") && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Angle
              </label>
              <span className="font-mono text-sm">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => {
                setAngle(Number(e.target.value));
                setActivePreset(null);
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
            />
          </div>
        )}

        {/* Colour Stops */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Colour Stops
            </label>
            <button
              onClick={addStop}
              className="flex items-center gap-1 rounded-none bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {sortedStops.map((stop) => (
              <div key={stop.id} className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-neutral-300" />
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-neutral-200 dark:border-neutral-700"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                  className="w-20 rounded-none border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => updateStop(stop.id, "position", Number(e.target.value))}
                  className="w-16 rounded-none border border-neutral-200 bg-neutral-50 px-2 py-1 text-center font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800"
                />
                <span className="text-xs text-neutral-400">%</span>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                  className="p-1 text-neutral-400 hover:text-red-500 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Code</h2>
            <div className="flex flex-wrap rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
              {PLATFORM_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPlatform(option.value)}
                  className={clsx(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    platform === option.value
                      ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <CodeBlock label={PLATFORM_OPTIONS.find((p) => p.value === platform)?.label || ""} code={getCode()} />
        </div>
      </div>

      {/* Preview */}
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:min-h-[400px]">
        <div
          className="h-48 w-48 shadow-lg sm:h-64 sm:w-64"
          style={{ background: cssGradient() }}
        />
      </div>
    </div>
  );
}
