"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type GradientPreset = {
  name: string;
  gradient: string;
  colors: [string, string];
};

type NeutralGrey = {
  name: string;
  value: string;
};

const NEUTRAL_GREYS: NeutralGrey[] = [
  { name: "50", value: "#fafafa" },
  { name: "100", value: "#f5f5f5" },
  { name: "200", value: "#e5e5e5" },
  { name: "300", value: "#d4d4d4" },
  { name: "400", value: "#a3a3a3" },
  { name: "500", value: "#737373" },
  { name: "600", value: "#525252" },
  { name: "700", value: "#404040" },
  { name: "800", value: "#262626" },
  { name: "900", value: "#171717" },
  { name: "950", value: "#0a0a0a" },
];

const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "Sunset",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
    colors: ["#ff6b6b", "#feca57"],
  },
  {
    name: "Ocean",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    colors: ["#667eea", "#764ba2"],
  },
  {
    name: "Forest",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    colors: ["#11998e", "#38ef7d"],
  },
  {
    name: "Fire",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    colors: ["#f12711", "#f5af19"],
  },
  {
    name: "Night",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    colors: ["#0f0c29", "#24243e"],
  },
  {
    name: "Peach",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    colors: ["#ffecd2", "#fcb69f"],
  },
  {
    name: "Sky",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    colors: ["#a1c4fd", "#c2e9fb"],
  },
  {
    name: "Grape",
    gradient: "linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)",
    colors: ["#5f2c82", "#49a09d"],
  },
];

export default function BorderComparison() {
  const [selectedPreset, setSelectedPreset] = useState<GradientPreset>(
    GRADIENT_PRESETS[0]
  );
  const [customColor1, setCustomColor1] = useState("#ff6b6b");
  const [customColor2, setCustomColor2] = useState("#feca57");
  const [useCustom, setUseCustom] = useState(false);
  const [selectedGrey, setSelectedGrey] = useState<NeutralGrey>(NEUTRAL_GREYS[2]); // Default to neutral-200
  const [blackOpacity, setBlackOpacity] = useState(0.1);
  const [borderWidth, setBorderWidth] = useState(2);
  const [showShadow, setShowShadow] = useState(false);

  const activeGradient = useCustom
    ? `linear-gradient(135deg, ${customColor1} 0%, ${customColor2} 100%)`
    : selectedPreset.gradient;

  const greyBorderColor = selectedGrey.value;
  const blackBorderColor = `rgba(0, 0, 0, ${blackOpacity})`;

  const greyBorderCSS = `/* Grey inner border */
.card {
  border: ${borderWidth}px solid ${greyBorderColor}; /* neutral-${selectedGrey.name} */
  background: white;${showShadow ? `
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);` : ""}
}`;

  const blackBorderCSS = `/* Semi-transparent outer border */
.card {
  box-shadow: 0 0 0 ${borderWidth}px ${blackBorderColor}${showShadow ? `,
              0 10px 40px -10px rgba(0, 0, 0, 0.2)` : ""};
  background: white;
}

/* Or using inset for inner */
.card-inset {
  box-shadow: inset 0 0 0 ${borderWidth}px ${blackBorderColor};
  background: white;
}`;

  return (
    <div className="space-y-8">
      {/* Background Controls */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Background</h2>

        {/* Preset Gradients */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Preset Gradients
          </label>
          <div className="flex flex-wrap gap-2">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setSelectedPreset(preset);
                  setUseCustom(false);
                }}
                className={clsx(
                  "flex items-center gap-2 rounded-none px-3 py-2 text-sm font-medium transition-colors",
                  !useCustom && selectedPreset.name === preset.name
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ background: preset.gradient }}
                />
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Gradient */}
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Use custom colours
            </span>
          </label>

          {useCustom && (
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Colour 1
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColor1}
                    onChange={(e) => setCustomColor1(e.target.value)}
                    className="h-10 w-14 cursor-pointer border border-neutral-200 dark:border-neutral-800"
                  />
                  <input
                    type="text"
                    value={customColor1}
                    onChange={(e) => setCustomColor1(e.target.value)}
                    className="w-24 rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Colour 2
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColor2}
                    onChange={(e) => setCustomColor2(e.target.value)}
                    className="h-10 w-14 cursor-pointer border border-neutral-200 dark:border-neutral-800"
                  />
                  <input
                    type="text"
                    value={customColor2}
                    onChange={(e) => setCustomColor2(e.target.value)}
                    className="w-24 rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Border Controls */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Border Settings</h2>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Border Width
                </label>
                <span className="font-mono text-sm">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Black Opacity
                </label>
                <span className="font-mono text-sm">
                  {(blackOpacity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.3"
                step="0.01"
                value={blackOpacity}
                onChange={(e) => setBlackOpacity(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>
          </div>

          {/* Grey Color Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Grey Border Colour
              </label>
              <span className="font-mono text-xs text-neutral-500">
                neutral-{selectedGrey.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {NEUTRAL_GREYS.map((grey) => (
                <button
                  key={grey.name}
                  onClick={() => setSelectedGrey(grey)}
                  className={clsx(
                    "group relative h-8 w-8 transition-transform hover:scale-110",
                    selectedGrey.name === grey.name &&
                      "ring-2 ring-swiss-red ring-offset-2"
                  )}
                  style={{ backgroundColor: grey.value }}
                  title={`neutral-${grey.name}`}
                >
                  <span className="sr-only">neutral-{grey.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shadow Toggle */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={showShadow}
              onChange={(e) => setShowShadow(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Show card shadow
            </span>
          </label>
        </div>
      </div>

      {/* Comparison Preview */}
      <div
        className="relative min-h-[400px] p-6 sm:min-h-[500px] sm:p-12"
        style={{ background: activeGradient }}
      >
        <div className="grid h-full gap-8 md:grid-cols-2">
          {/* Grey Border Card */}
          <div className="flex flex-col">
            <div className="mb-4 text-center">
              <span className="inline-block rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-neutral-900 shadow-sm backdrop-blur-sm">
                Grey Border
              </span>
            </div>
            <div
              className="flex flex-1 flex-col justify-between bg-white p-6 font-sans sm:p-6"
              style={{
                border: `${borderWidth}px solid ${greyBorderColor}`,
                borderRadius: "20px",
                boxShadow: showShadow ? "0 10px 40px -10px rgba(0,0,0,0.2)" : "none",
              }}
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-swiss-red to-orange-400 text-sm font-bold text-white">
                    AH
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Alex Harper
                    </p>
                    <p className="text-xs text-neutral-500">Product Designer</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  Just shipped the new dashboard redesign! The team did an
                  incredible job bringing this together in just two weeks.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4">
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
                  Like
                </button>
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
                  Reply
                </button>
                <span className="text-xs text-neutral-400">2 min ago</span>
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-medium text-white/90 drop-shadow-sm">
              border: {borderWidth}px solid neutral-{selectedGrey.name}
            </p>
          </div>

          {/* Semi-transparent Border Card */}
          <div className="flex flex-col">
            <div className="mb-4 text-center">
              <span className="inline-block rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-neutral-900 shadow-sm backdrop-blur-sm">
                Semi-transparent Border
              </span>
            </div>
            <div
              className="flex flex-1 flex-col justify-between bg-white p-6 font-sans sm:p-6"
              style={{
                boxShadow: showShadow 
                  ? `0 0 0 ${borderWidth}px ${blackBorderColor}, 0 10px 40px -10px rgba(0,0,0,0.2)`
                  : `0 0 0 ${borderWidth}px ${blackBorderColor}`,
                borderRadius: "20px",
              }}
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-swiss-red to-orange-400 text-sm font-bold text-white">
                    AH
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      Alex Harper
                    </p>
                    <p className="text-xs text-neutral-500">Product Designer</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  Just shipped the new dashboard redesign! The team did an
                  incredible job bringing this together in just two weeks.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4">
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
                  Like
                </button>
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-900">
                  Reply
                </button>
                <span className="text-xs text-neutral-400">2 min ago</span>
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-medium text-white/90 drop-shadow-sm">
              box-shadow: 0 0 0 {borderWidth}px {blackBorderColor}
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Why This Matters</h2>
        <div className="prose prose-neutral max-w-none text-sm dark:prose-invert">
          <p>
            When placing UI cards on colourful backgrounds, a solid grey border
            can look out of place because grey is essentially a desaturated
            colour that doesn&apos;t relate to the background.
          </p>
          <p>
            Using a semi-transparent black border (via{" "}
            <code>box-shadow</code> or <code>rgba</code>) creates a border
            that&apos;s always slightly darker than whatever&apos;s behind it.
            This makes the card feel more naturally integrated with any
            background colour.
          </p>
          <ul>
            <li>
              <strong>Grey border:</strong> A fixed colour that may clash with
              vibrant backgrounds
            </li>
            <li>
              <strong>Semi-transparent black:</strong> Adapts to any background,
              always providing subtle definition
            </li>
          </ul>
          <p>
            This technique is particularly useful for design systems where
            components need to work across many different contexts and colour
            schemes.
          </p>
        </div>
      </div>

      {/* Code Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CodeBlock label="Grey Border (CSS)" code={greyBorderCSS} />
        <CodeBlock label="Semi-transparent Border (CSS)" code={blackBorderCSS} />
      </div>
    </div>
  );
}
