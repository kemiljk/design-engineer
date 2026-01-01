"use client";

import React, { useState } from "react";
import { Check, Xmark as X, WarningTriangle as AlertTriangle } from "iconoir-react";
import { clsx } from "clsx";

type Platform = "ios" | "android" | "web";

type ValidationResult = {
  status: "pass" | "warning" | "fail";
  message: string;
};

const PLATFORM_STANDARDS: Record<Platform, { minSize: number; recommendedSize: number; unit: string; name: string }> = {
  ios: { minSize: 44, recommendedSize: 44, unit: "pt", name: "iOS (Apple HIG)" },
  android: { minSize: 48, recommendedSize: 48, unit: "dp", name: "Android (Material)" },
  web: { minSize: 44, recommendedSize: 48, unit: "px", name: "Web (WCAG)" },
};

const COMMON_ELEMENTS = [
  { name: "Small icon button", width: 24, height: 24 },
  { name: "Standard button", width: 120, height: 44 },
  { name: "Icon button", width: 44, height: 44 },
  { name: "Large button", width: 160, height: 56 },
  { name: "Chip/Tag", width: 80, height: 32 },
  { name: "List item", width: 320, height: 48 },
  { name: "Checkbox", width: 20, height: 20 },
  { name: "Radio button", width: 20, height: 20 },
  { name: "Switch toggle", width: 51, height: 31 },
];

export default function TouchTargetCalculator() {
  const [width, setWidth] = useState(44);
  const [height, setHeight] = useState(44);
  const [platform, setPlatform] = useState<Platform>("ios");

  const standard = PLATFORM_STANDARDS[platform];

  const validateTarget = (): ValidationResult => {
    const minDimension = Math.min(width, height);
    
    if (minDimension >= standard.recommendedSize) {
      return {
        status: "pass",
        message: `Meets ${standard.name} guidelines (${standard.recommendedSize}${standard.unit})`,
      };
    } else if (minDimension >= standard.minSize * 0.75) {
      return {
        status: "warning",
        message: `Below recommended size. Consider increasing to ${standard.recommendedSize}${standard.unit}`,
      };
    } else {
      return {
        status: "fail",
        message: `Too small for comfortable touch. Minimum: ${standard.minSize}${standard.unit}`,
      };
    }
  };

  const validation = validateTarget();

  const getStatusIcon = () => {
    switch (validation.status) {
      case "pass":
        return <Check className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "fail":
        return <X className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (validation.status) {
      case "pass":
        return "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950";
      case "warning":
        return "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950";
      case "fail":
        return "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950";
    }
  };

  // Calculate the finger overlay (average adult finger is ~45px/11mm)
  const fingerSize = 45;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-6 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        {/* Platform Selection */}
        <div>
          <h2 className="mb-4 text-lg font-bold">Platform</h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLATFORM_STANDARDS) as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={clsx(
                  "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                  platform === p
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                )}
              >
                {PLATFORM_STANDARDS[p].name}
              </button>
            ))}
          </div>
        </div>

        {/* Size Input */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Target Size</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Width ({standard.unit})
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="1"
                className="w-full rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Height ({standard.unit})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="1"
                className="w-full rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>
          </div>
        </div>

        {/* Validation Result */}
        <div className={clsx("border p-4", getStatusColor())}>
          <div className="flex items-start gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="font-medium">
                {validation.status === "pass" && "Accessible"}
                {validation.status === "warning" && "Consider Improving"}
                {validation.status === "fail" && "Not Accessible"}
              </h3>
              <p className="mt-1 text-sm opacity-80">{validation.message}</p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Common Elements</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {COMMON_ELEMENTS.map((element) => {
              const minDim = Math.min(element.width, element.height);
              const passes = minDim >= standard.minSize;
              return (
                <button
                  key={element.name}
                  onClick={() => {
                    setWidth(element.width);
                    setHeight(element.height);
                  }}
                  className="flex items-center justify-between rounded-none border border-neutral-200 bg-neutral-50 px-3 py-2 text-left text-sm transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <span>{element.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-neutral-400">
                      {element.width}×{element.height}
                    </span>
                    {passes ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guidelines */}
        <div className="space-y-3 bg-neutral-50 p-4 dark:bg-neutral-800">
          <h3 className="font-medium">Platform Guidelines</h3>
          <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>iOS (Apple HIG)</span>
              <span className="font-mono">44pt minimum</span>
            </div>
            <div className="flex justify-between">
              <span>Android (Material 3)</span>
              <span className="font-mono">48dp minimum</span>
            </div>
            <div className="flex justify-between">
              <span>Web (WCAG 2.1 AAA)</span>
              <span className="font-mono">44px minimum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center justify-center border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
        <p className="mb-6 text-sm text-neutral-500">Touch target with finger overlay</p>
        
        <div className="relative">
          {/* Finger overlay (semi-transparent circle) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-neutral-400 bg-neutral-400/20"
            style={{
              width: `${fingerSize}px`,
              height: `${fingerSize}px`,
            }}
          />
          
          {/* Touch target */}
          <div
            className={clsx(
              "relative flex items-center justify-center border-2 transition-all",
              validation.status === "pass" && "border-green-500 bg-green-500/20",
              validation.status === "warning" && "border-amber-500 bg-amber-500/20",
              validation.status === "fail" && "border-red-500 bg-red-500/20"
            )}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            <span className="text-xxs font-medium text-neutral-600 dark:text-neutral-300">
              {width}×{height}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-400">
            Dashed circle = average finger size (~11mm)
          </p>
        </div>

        {/* Size comparison */}
        <div className="mt-8 w-full max-w-sm space-y-4">
          <p className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Size Comparison
          </p>
          <div className="flex items-end justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className="border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
                style={{ width: "24px", height: "24px" }}
              />
              <span className="text-xs text-neutral-500">24px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
                style={{ width: "44px", height: "44px" }}
              />
              <span className="text-xs text-neutral-500">44px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="border border-neutral-300 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
                style={{ width: "48px", height: "48px" }}
              />
              <span className="text-xs text-neutral-500">48px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={clsx(
                  "border-2",
                  validation.status === "pass" && "border-green-500 bg-green-100",
                  validation.status === "warning" && "border-amber-500 bg-amber-100",
                  validation.status === "fail" && "border-red-500 bg-red-100"
                )}
                style={{ width: `${Math.min(width, 80)}px`, height: `${Math.min(height, 80)}px` }}
              />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Yours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
