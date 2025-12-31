"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, ColorPicker as Pipette } from "iconoir-react";
import { clsx } from "clsx";

type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "swift" | "android" | "tailwind";

type ColorValues = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  oklch: { l: number; c: number; h: number };
};

const FORMAT_INFO: Record<ColorFormat, { label: string; platform: string }> = {
  hex: { label: "HEX", platform: "Web" },
  rgb: { label: "RGB", platform: "Web" },
  hsl: { label: "HSL", platform: "Web" },
  oklch: { label: "OKLCH", platform: "Web (Modern)" },
  swift: { label: "SwiftUI", platform: "iOS/macOS" },
  android: { label: "Android", platform: "Android" },
  tailwind: { label: "Tailwind", platform: "Web" },
};

export default function ColourConverter() {
  const [inputColor, setInputColor] = useState("#FF4400");
  const [colorValues, setColorValues] = useState<ColorValues | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parseColor(inputColor);
    if (parsed) {
      setColorValues(parsed);
    }
  }, [inputColor]);

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
  };

  if (!colorValues) {
    return <div>Invalid colour</div>;
  }

  const formats: { format: ColorFormat; value: string }[] = [
    { format: "hex", value: colorValues.hex },
    { format: "rgb", value: `rgb(${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b})` },
    { format: "hsl", value: `hsl(${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%)` },
    { format: "oklch", value: `oklch(${colorValues.oklch.l.toFixed(2)} ${colorValues.oklch.c.toFixed(3)} ${colorValues.oklch.h.toFixed(1)})` },
    { 
      format: "swift", 
      value: `Color(red: ${(colorValues.rgb.r / 255).toFixed(3)}, green: ${(colorValues.rgb.g / 255).toFixed(3)}, blue: ${(colorValues.rgb.b / 255).toFixed(3)})` 
    },
    { 
      format: "android", 
      value: `Color.rgb(${colorValues.rgb.r}, ${colorValues.rgb.g}, ${colorValues.rgb.b})\n// Or: #FF${colorValues.hex.slice(1).toUpperCase()} (ARGB)` 
    },
    {
      format: "tailwind",
      value: `/* Tailwind v4 @theme */\n--color-custom: ${colorValues.hex};\n\n/* Or arbitrary value */\nclass="bg-[${colorValues.hex}]"`
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Preview & Input */}
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Colour</h2>
          
          {/* Colour Preview */}
          <div
            className="mb-6 aspect-video w-full rounded-lg shadow-inner"
            style={{ backgroundColor: colorValues.hex }}
          />

          {/* Colour Picker */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputColor}
                  onChange={(e) => setInputColor(e.target.value)}
                  placeholder="#FF4400 or rgb(255, 68, 0)"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 font-mono text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>
              <label className="flex cursor-pointer items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 px-3 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
                <Pipette className="h-5 w-5 text-neutral-500" />
                <input
                  type="color"
                  value={colorValues.hex}
                  onChange={handlePickerChange}
                  className="sr-only"
                />
              </label>
            </div>

            <p className="text-xs text-neutral-500">
              Enter a colour in any format: HEX, RGB, HSL, or named colours
            </p>
          </div>
        </div>

        {/* Colour Info */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <h2 className="mb-4 text-lg font-bold">Values</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Red</span>
              <span className="font-mono">{colorValues.rgb.r}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Green</span>
              <span className="font-mono">{colorValues.rgb.g}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Blue</span>
              <span className="font-mono">{colorValues.rgb.b}</span>
            </div>
            <div className="border-t border-neutral-100 pt-3 dark:border-neutral-800">
              <div className="flex justify-between">
                <span className="text-neutral-500">Hue</span>
                <span className="font-mono">{colorValues.hsl.h}°</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Saturation</span>
              <span className="font-mono">{colorValues.hsl.s}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Lightness</span>
              <span className="font-mono">{colorValues.hsl.l}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output Formats */}
      <div className="lg:col-span-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <h2 className="mb-6 text-lg font-bold">Export Formats</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {formats.map(({ format, value }) => (
              <div
                key={format}
                className="group rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {FORMAT_INFO[format].label}
                    </span>
                    <span className="ml-2 text-xs text-neutral-400">
                      {FORMAT_INFO[format].platform}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(value, format)}
                    className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    {copiedFormat === format ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xxs text-neutral-600 dark:text-neutral-400 sm:whitespace-pre sm:break-normal sm:text-xs">
                  {value}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Colour Variations */}
        <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
          <h2 className="mb-6 text-lg font-bold">Variations</h2>
          
          <div className="space-y-4">
            {/* Lightness Scale */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-neutral-500">Lightness</h3>
              <div className="flex overflow-hidden rounded-none">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      const newHex = hslToHex(colorValues.hsl.h, colorValues.hsl.s, l);
                      setInputColor(newHex);
                    }}
                    className="h-12 flex-1 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: `hsl(${colorValues.hsl.h}, ${colorValues.hsl.s}%, ${l}%)`,
                    }}
                    title={`${l}% lightness`}
                  />
                ))}
              </div>
            </div>

            {/* Saturation Scale */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-neutral-500">Saturation</h3>
              <div className="flex overflow-hidden rounded-none">
                {[0, 12, 25, 37, 50, 62, 75, 87, 100].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      const newHex = hslToHex(colorValues.hsl.h, s, colorValues.hsl.l);
                      setInputColor(newHex);
                    }}
                    className="h-12 flex-1 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: `hsl(${colorValues.hsl.h}, ${s}%, ${colorValues.hsl.l}%)`,
                    }}
                    title={`${s}% saturation`}
                  />
                ))}
              </div>
            </div>

            {/* Complementary */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-neutral-500">Harmony</h3>
              <div className="flex gap-2">
                {[0, 30, 60, 120, 180, 240, 300].map((offset) => {
                  const h = (colorValues.hsl.h + offset) % 360;
                  return (
                    <button
                      key={offset}
                      onClick={() => {
                        const newHex = hslToHex(h, colorValues.hsl.s, colorValues.hsl.l);
                        setInputColor(newHex);
                      }}
                      className="h-12 flex-1 rounded-none transition-transform hover:scale-105"
                      style={{
                        backgroundColor: `hsl(${h}, ${colorValues.hsl.s}%, ${colorValues.hsl.l}%)`,
                      }}
                      title={`+${offset}° hue`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Colour conversion utilities
function parseColor(input: string): ColorValues | null {
  const trimmed = input.trim().toLowerCase();

  // HEX
  const hexMatch = trimmed.match(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return calculateAllFormats(r, g, b);
  }

  // RGB
  const rgbMatch = trimmed.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return calculateAllFormats(r, g, b);
  }

  // HSL
  const hslMatch = trimmed.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]);
    const s = parseInt(hslMatch[2]);
    const l = parseInt(hslMatch[3]);
    const { r, g, b } = hslToRgb(h, s, l);
    return calculateAllFormats(r, g, b);
  }

  // Named colours - basic support
  const namedColors: Record<string, string> = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    white: "#ffffff",
    black: "#000000",
    yellow: "#ffff00",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    orange: "#ffa500",
    purple: "#800080",
    pink: "#ffc0cb",
  };

  if (namedColors[trimmed]) {
    return parseColor(namedColors[trimmed]);
  }

  return null;
}

function calculateAllFormats(r: number, g: number, b: number): ColorValues {
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const oklch = rgbToOklch(r, g, b);

  return {
    hex,
    rgb: { r, g, b },
    hsl,
    oklch,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  // Simplified OKLCH conversion
  // First convert to linear RGB
  const linearR = r / 255;
  const linearG = g / 255;
  const linearB = b / 255;

  // Convert to OKLab (simplified)
  const l = 0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB;
  const m = 0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB;
  const s = 0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bVal = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return {
    l: L,
    c: C,
    h: H,
  };
}
