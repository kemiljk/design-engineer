"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type Platform = "css" | "tailwind" | "swift" | "android" | "react-native";

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
  { value: "react-native", label: "React Native" },
];

type ShadowConfig = {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
};

const PRESETS: Record<string, ShadowConfig> = {
  Subtle: { offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: "#000000", opacity: 0.05, inset: false },
  Small: { offsetX: 0, offsetY: 2, blur: 4, spread: -1, color: "#000000", opacity: 0.1, inset: false },
  Medium: { offsetX: 0, offsetY: 4, blur: 6, spread: -2, color: "#000000", opacity: 0.1, inset: false },
  Large: { offsetX: 0, offsetY: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false },
  Elevated: { offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.1, inset: false },
  Floating: { offsetX: 0, offsetY: 25, blur: 50, spread: -12, color: "#000000", opacity: 0.25, inset: false },
  Inset: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: "#000000", opacity: 0.05, inset: true },
};

export default function ShadowGenerator() {
  const [config, setConfig] = useState<ShadowConfig>(PRESETS.Medium);
  const [activePreset, setActivePreset] = useState("Medium");
  const [platform, setPlatform] = useState<Platform>("css");

  const handlePresetClick = (name: string) => {
    setConfig(PRESETS[name]);
    setActivePreset(name);
  };

  const handleChange = (key: keyof ShadowConfig, value: number | string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setActivePreset("Custom");
  };

  // Convert hex color with opacity to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Generate code for each platform
  const generateCSS = () => {
    const rgba = hexToRgba(config.color, config.opacity);
    const inset = config.inset ? "inset " : "";
    return `box-shadow: ${inset}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${rgba};`;
  };

  const generateTailwind = () => {
    // Tailwind v4 arbitrary shadow
    const rgba = hexToRgba(config.color, config.opacity);
    const inset = config.inset ? "inset_" : "";
    return `/* Tailwind v4 Arbitrary Value */
class="shadow-[${inset}${config.offsetX}px_${config.offsetY}px_${config.blur}px_${config.spread}px_${rgba.replace(/ /g, "")}]"

/* Or define in @theme */
@theme {
  --shadow-custom: ${config.inset ? "inset " : ""}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${rgba};
}

/* Usage */
class="shadow-custom"`;
  };

  const generateSwiftUI = () => {
    // SwiftUI uses radius (blur/2 approximately) and offset
    const radius = config.blur / 2;
    const r = parseInt(config.color.slice(1, 3), 16) / 255;
    const g = parseInt(config.color.slice(3, 5), 16) / 255;
    const b = parseInt(config.color.slice(5, 7), 16) / 255;
    
    return `.shadow(
    color: Color(red: ${r.toFixed(2)}, green: ${g.toFixed(2)}, blue: ${b.toFixed(2)}).opacity(${config.opacity}),
    radius: ${radius},
    x: ${config.offsetX},
    y: ${config.offsetY}
)`;
  };

  const generateAndroid = () => {
    // Android uses elevation for Material shadows
    // Approximate elevation from blur
    const elevation = Math.round(config.blur / 2);
    
    return `<!-- XML Layout -->
<View
    android:elevation="${elevation}dp"
    android:translationZ="${config.offsetY}dp"
    android:outlineSpotShadowColor="@color/shadow_color"
    android:outlineAmbientShadowColor="@color/shadow_color" />

<!-- In colors.xml -->
<color name="shadow_color">${config.color}${Math.round(config.opacity * 255).toString(16).padStart(2, "0")}</color>

/* Jetpack Compose */
Modifier.shadow(
    elevation = ${elevation}.dp,
    shape = RoundedCornerShape(8.dp),
    ambientColor = Color.Black.copy(alpha = ${config.opacity}f),
    spotColor = Color.Black.copy(alpha = ${config.opacity}f)
)`;
  };

  const generateReactNative = () => {
    // React Native shadow properties
    return `/* iOS */
shadowColor: "${config.color}",
shadowOffset: {
  width: ${config.offsetX},
  height: ${config.offsetY},
},
shadowOpacity: ${config.opacity},
shadowRadius: ${config.blur / 2},

/* Android */
elevation: ${Math.round(config.blur / 2)},

/* Cross-platform with react-native-shadow-2 */
<Shadow
  distance={${config.blur}}
  startColor="${hexToRgba(config.color, config.opacity)}"
  offset={[${config.offsetX}, ${config.offsetY}]}
>
  <View />
</Shadow>`;
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
      case "react-native":
        return generateReactNative();
    }
  };

  // Generate preview shadow style
  const previewShadow = useMemo(() => {
    const rgba = hexToRgba(config.color, config.opacity);
    return `${config.inset ? "inset " : ""}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${rgba}`;
  }, [config.inset, config.offsetX, config.offsetY, config.blur, config.spread, config.color, config.opacity]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-6 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:space-y-8 sm:p-6">
        {/* Presets */}
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

        {/* Sliders */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Configuration</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Offset X
                </label>
                <span className="font-mono text-sm">{config.offsetX}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={config.offsetX}
                onChange={(e) => handleChange("offsetX", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Offset Y
                </label>
                <span className="font-mono text-sm">{config.offsetY}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={config.offsetY}
                onChange={(e) => handleChange("offsetY", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Blur
                </label>
                <span className="font-mono text-sm">{config.blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.blur}
                onChange={(e) => handleChange("blur", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Spread
                </label>
                <span className="font-mono text-sm">{config.spread}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={config.spread}
                onChange={(e) => handleChange("spread", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Colour
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="h-10 w-14 cursor-pointer border border-neutral-200 dark:border-neutral-800"
                />
                <input
                  type="text"
                  value={config.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="flex-1 border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Opacity
                </label>
                <span className="font-mono text-sm">{(config.opacity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={config.opacity}
                onChange={(e) => handleChange("opacity", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.inset}
              onChange={(e) => handleChange("inset", e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Inset shadow
            </span>
          </label>
        </div>

        {/* Code Output */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Code</h2>
            <div className="relative flex bg-neutral-100 p-1 dark:bg-neutral-800">
              {PLATFORM_OPTIONS.map((option) => {
                const isSelected = platform === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setPlatform(option.value)}
                    className={clsx(
                      "relative z-10 flex-1 px-2 py-1.5 text-xs font-medium transition-colors",
                      isSelected
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="shadow-generator-platform-indicator"
                        className="absolute inset-0 bg-white shadow-sm dark:bg-neutral-700"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <CodeBlock label={PLATFORM_OPTIONS.find((p) => p.value === platform)?.label || ""} code={getCode()} />
        </div>
      </div>

      {/* Preview */}
      <div className="flex min-h-[200px] items-center justify-center border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:min-h-[300px] sm:p-8">
        <div
          key={previewShadow}
          className="flex h-32 w-32 items-center justify-center bg-white dark:bg-neutral-800 sm:h-48 sm:w-48"
          style={{ boxShadow: previewShadow }}
        >
          <span className="text-sm font-medium text-neutral-400">Preview</span>
        </div>
      </div>
    </div>
  );
}
