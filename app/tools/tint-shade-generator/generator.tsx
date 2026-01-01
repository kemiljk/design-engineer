"use client";

import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Copy, Check, ColorPicker as Pipette } from "iconoir-react";
import { clsx } from "clsx";
import { CodeBlock } from "../components";

type OutputFormat = "css" | "tailwind" | "swift" | "android";

const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind" },
  { value: "swift", label: "SwiftUI" },
  { value: "android", label: "Android" },
];

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

type ColourScale = {
  step: number;
  oklch: { l: number; c: number; h: number };
  hex: string;
  rgb: { r: number; g: number; b: number };
  isInput?: boolean;
};

export default function SpectrumGenerator() {
  const [inputColour, setInputColour] = useState("#FF4400");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("css");
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [colourName, setColourName] = useState("primary");

  const baseOklch = useMemo(() => hexToOklch(inputColour), [inputColour]);
  
  // Find which step the input colour is closest to
  const inputStep = useMemo(() => {
    if (!baseOklch) return 500;
    return findClosestStep(baseOklch.l);
  }, [baseOklch]);

  const colourScale = useMemo((): ColourScale[] => {
    if (!baseOklch) return [];
    
    const inputRgb = hexToRgb(inputColour);

    return SCALE_STEPS.map((step) => {
      // Use the input colour verbatim at its closest step
      if (step === inputStep && inputRgb) {
        return {
          step,
          oklch: baseOklch,
          hex: inputColour.toUpperCase().startsWith('#') ? inputColour.toUpperCase() : `#${inputColour.toUpperCase()}`,
          rgb: inputRgb,
          isInput: true,
        };
      }
      
      const targetLightness = stepToLightness(step);
      
      // Scale chroma proportionally based on distance from optimal lightness
      // Use the input's chroma as reference, scaled by the lightness relationship
      const inputChromaAtTargetLightness = calculateChromaForLightness(
        baseOklch.c,
        baseOklch.l,
        targetLightness
      );
      
      const oklch = {
        l: targetLightness,
        c: inputChromaAtTargetLightness,
        h: baseOklch.h,
      };
      
      // Clamp to displayable gamut
      const clampedOklch = clampToGamut(oklch);
      const rgb = oklchToRgb(clampedOklch);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      return { step, oklch: clampedOklch, hex, rgb, isInput: false };
    });
  }, [baseOklch, inputColour, inputStep]);

  const handleCopyStep = (hex: string, step: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColour(e.target.value);
  };

  const generateCSS = () => {
    const vars = colourScale
      .map((c) => `  --${colourName}-${c.step}: oklch(${c.oklch.l.toFixed(3)} ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(1)});`)
      .join("\n");

    const hexFallback = colourScale
      .map((c) => `  --${colourName}-${c.step}: ${c.hex};`)
      .join("\n");

    return `:root {
  /* OKLCH (Modern Browsers) */
${vars}
}

/* HEX Fallback */
@supports not (color: oklch(0% 0 0)) {
  :root {
${hexFallback}
  }
}`;
  };

  const generateTailwind = () => {
    const colourEntries = colourScale
      .map((c) => `      ${c.step}: 'oklch(${c.oklch.l.toFixed(3)} ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(1)})',`)
      .join("\n");

    return `/* tailwind.config.js (Tailwind v3) */
module.exports = {
  theme: {
    extend: {
      colors: {
        '${colourName}': {
${colourEntries}
        },
      },
    },
  },
}

/* Tailwind v4 @theme */
@theme {
${colourScale.map((c) => `  --color-${colourName}-${c.step}: oklch(${c.oklch.l.toFixed(3)} ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(1)});`).join("\n")}
}

/* Usage */
<div class="bg-${colourName}-500 text-${colourName}-50">...</div>`;
  };

  const generateSwiftUI = () => {
    const extensions = colourScale
      .map((c) => {
        const r = (c.rgb.r / 255).toFixed(3);
        const g = (c.rgb.g / 255).toFixed(3);
        const b = (c.rgb.b / 255).toFixed(3);
        return `    static let ${colourName}${c.step} = Color(red: ${r}, green: ${g}, blue: ${b})`;
      })
      .join("\n");

    return `import SwiftUI

extension Color {
${extensions}
}

// Usage
Text("Hello")
    .foregroundColor(.${colourName}500)
    .background(.${colourName}100)`;
  };

  const generateAndroid = () => {
    const xmlColours = colourScale
      .map((c) => `    <color name="${colourName}_${c.step}">${c.hex}</color>`)
      .join("\n");

    const composeColours = colourScale
      .map((c) => `    val ${colourName.charAt(0).toUpperCase() + colourName.slice(1)}${c.step} = Color(0xFF${c.hex.slice(1).toUpperCase()})`)
      .join("\n");

    return `<!-- res/values/colors.xml -->
<resources>
${xmlColours}
</resources>

/* Jetpack Compose */
object ${colourName.charAt(0).toUpperCase() + colourName.slice(1)}Palette {
${composeColours}
}

// Usage
Text(
    text = "Hello",
    color = ${colourName.charAt(0).toUpperCase() + colourName.slice(1)}Palette.${colourName.charAt(0).toUpperCase() + colourName.slice(1)}500
)`;
  };

  const getCode = () => {
    switch (outputFormat) {
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
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Base Colour</h2>

            {/* Colour Preview */}
            <div
              className="mb-6 aspect-video w-full shadow-inner"
              style={{ backgroundColor: inputColour }}
            />

            {/* Colour Input */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputColour}
                    onChange={(e) => setInputColour(e.target.value)}
                    placeholder="#FF4400"
                    className="w-full border border-neutral-200 bg-neutral-50 px-3 py-3 font-mono text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>
                <label className="flex cursor-pointer items-center justify-center border border-neutral-200 bg-neutral-50 px-3 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
                  <Pipette className="h-5 w-5 text-neutral-500" />
                  <input
                    type="color"
                    value={inputColour}
                    onChange={handlePickerChange}
                    className="sr-only"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Colour Name
                </label>
                <input
                  type="text"
                  value={colourName}
                  onChange={(e) => setColourName(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="primary"
                  className="w-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>

              {baseOklch && (
                <div className="space-y-3">
                  <div className="bg-neutral-50 p-3 dark:bg-neutral-950">
                    <p className="mb-1 text-xs font-medium uppercase text-neutral-500">Input OKLCH</p>
                    <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                      L: {baseOklch.l.toFixed(3)} C: {baseOklch.c.toFixed(3)} H: {baseOklch.h.toFixed(1)}°
                    </p>
                  </div>
                  <div className="bg-neutral-50 p-3 dark:bg-neutral-950">
                    <p className="mb-1 text-xs font-medium uppercase text-neutral-500">Closest Step</p>
                    <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                      ~{findClosestStep(baseOklch.l)} (L: {baseOklch.l.toFixed(2)})
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scale Preview */}
        <div className="lg:col-span-8">
          <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <h2 className="mb-4 text-lg font-bold">Generated Scale</h2>

            <div className="space-y-2">
              {colourScale.map((colour) => (
                <div
                  key={colour.step}
                  className={clsx(
                    "group flex items-center gap-3 p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800",
                    colour.isInput && "ring-2 ring-swiss-red ring-offset-2 dark:ring-offset-neutral-900"
                  )}
                >
                  <button
                    onClick={() => handleCopyStep(colour.hex, colour.step)}
                    className="h-12 w-12 shrink-0 shadow-sm transition-transform hover:scale-105 sm:h-14 sm:w-14"
                    style={{ backgroundColor: colour.hex }}
                    title={`Copy ${colour.hex}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                        {colour.step}
                      </span>
                      {colour.isInput && (
                        <span className="rounded bg-swiss-red px-1.5 py-0.5 text-xxs font-bold uppercase text-white">
                          Input
                        </span>
                      )}
                      <span className="font-mono text-xs text-neutral-500">
                        {colour.hex}
                      </span>
                    </div>
                    <p className="truncate font-mono text-xs text-neutral-400">
                      oklch({colour.oklch.l.toFixed(3)} {colour.oklch.c.toFixed(3)} {colour.oklch.h.toFixed(1)})
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyStep(colour.hex, colour.step)}
                    className="shrink-0 p-2 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:hover:text-white"
                  >
                    {copiedStep === colour.step ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Scale Bar */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Scale Preview</h2>
        <div className="flex h-16 overflow-hidden shadow-inner sm:h-20">
          {colourScale.map((colour) => (
            <button
              key={colour.step}
              onClick={() => handleCopyStep(colour.hex, colour.step)}
              className="flex-1 transition-transform hover:scale-y-110"
              style={{ backgroundColor: colour.hex }}
              title={`${colour.step}: ${colour.hex}${colour.isInput ? " (Input)" : ""}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-neutral-500">
          <span>Lightest (50)</span>
          <span>Darkest (950)</span>
        </div>
      </div>

      {/* Code Output */}
      <div className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Code</h2>
          <div className="relative flex bg-neutral-100 p-1 dark:bg-neutral-800">
            {FORMAT_OPTIONS.map((option) => {
              const isSelected = outputFormat === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setOutputFormat(option.value)}
                  className={clsx(
                    "relative z-10 flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
                    isSelected
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="tint-shade-format-indicator"
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
        <CodeBlock
          label={FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.label || ""}
          code={getCode()}
        />
      </div>
    </div>
  );
}

// OKLCH Colour Utilities

function stepToLightness(step: number): number {
  // Perceptually uniform lightness distribution
  const lightnessMap: Record<number, number> = {
    50: 0.97,
    100: 0.93,
    200: 0.87,
    300: 0.78,
    400: 0.68,
    500: 0.58,
    600: 0.48,
    700: 0.39,
    800: 0.30,
    900: 0.22,
    950: 0.14,
  };
  return lightnessMap[step] ?? 0.5;
}

function calculateChromaForLightness(
  inputChroma: number,
  inputLightness: number,
  targetLightness: number
): number {
  // Calculate how chroma should scale based on lightness
  // Chroma naturally decreases at the extremes (very light or very dark)
  
  const getMaxChromaAtLightness = (l: number): number => {
    // Approximate max displayable chroma at a given lightness
    // Peaks around 0.5-0.65, reduces towards 0 and 1
    if (l <= 0.5) {
      return 0.4 * (l / 0.5);
    } else {
      return 0.4 * ((1 - l) / 0.5);
    }
  };
  
  const inputMaxChroma = getMaxChromaAtLightness(inputLightness);
  const targetMaxChroma = getMaxChromaAtLightness(targetLightness);
  
  // Scale the input chroma proportionally
  if (inputMaxChroma < 0.001) {
    return targetMaxChroma * 0.5;
  }
  
  const chromaRatio = inputChroma / inputMaxChroma;
  return Math.min(targetMaxChroma, targetMaxChroma * chromaRatio);
}

function findClosestStep(lightness: number): number {
  let closestStep = 500;
  let closestDistance = Infinity;
  
  for (const step of SCALE_STEPS) {
    const stepLightness = stepToLightness(step);
    const distance = Math.abs(lightness - stepLightness);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestStep = step;
    }
  }
  
  return closestStep;
}

function clampToGamut(oklch: { l: number; c: number; h: number }): { l: number; c: number; h: number } {
  // Reduce chroma until the colour is within sRGB gamut
  let { l, c, h } = oklch;
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts && c > 0.001) {
    const rgb = oklchToRgb({ l, c, h });
    const inGamut = rgb.r >= -0.5 && rgb.r <= 255.5 &&
                    rgb.g >= -0.5 && rgb.g <= 255.5 &&
                    rgb.b >= -0.5 && rgb.b <= 255.5;
    
    if (inGamut) break;
    
    c *= 0.95; // Reduce chroma by 5%
    attempts++;
  }
  
  return { l, c, h };
}

function hexToOklch(hex: string): { l: number; c: number; h: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return rgbToOklch(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    const shortMatch = hex.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
    if (!shortMatch) return null;
    return {
      r: parseInt(shortMatch[1] + shortMatch[1], 16),
      g: parseInt(shortMatch[2] + shortMatch[2], 16),
      b: parseInt(shortMatch[3] + shortMatch[3], 16),
    };
  }
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return "#" + [clamp(r), clamp(g), clamp(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  const lr = linearize(r / 255);
  const lg = linearize(g / 255);
  const lb = linearize(b / 255);

  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_val = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.sqrt(a * a + b_val * b_val);
  let H = (Math.atan2(b_val, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

function oklchToRgb(oklch: { l: number; c: number; h: number }): { r: number; g: number; b: number } {
  const { l: L, c: C, h: H } = oklch;

  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b_rgb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return {
    r: delinearize(r) * 255,
    g: delinearize(g) * 255,
    b: delinearize(b_rgb) * 255,
  };
}

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
