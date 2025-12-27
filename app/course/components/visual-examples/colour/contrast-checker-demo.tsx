"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper } from "../base/example-wrapper";

export function ContrastCheckerDemo() {
  const [textColour, setTextColour] = useState("#1a1a1a");
  const [bgColour, setBgColour] = useState("#ffffff");

  // Calculate relative luminance
  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  // Calculate contrast ratio
  const getContrastRatio = (hex1: string, hex2: string): number => {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = getContrastRatio(textColour, bgColour);
  const passesAA = ratio >= 4.5;
  const passesAALarge = ratio >= 3;
  const passesAAA = ratio >= 7;

  return (
    <ExampleWrapper
      title="Colour Contrast Checker"
      description="Test text and background colour combinations for accessibility"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Text Colour
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColour}
                  onChange={(e) => setTextColour(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-neutral-200 dark:border-neutral-700"
                />
                <input
                  type="text"
                  value={textColour}
                  onChange={(e) => setTextColour(e.target.value)}
                  className="flex-1 rounded border border-neutral-200 bg-neutral-50 px-2 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Background Colour
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColour}
                  onChange={(e) => setBgColour(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-neutral-200 dark:border-neutral-700"
                />
                <input
                  type="text"
                  value={bgColour}
                  onChange={(e) => setBgColour(e.target.value)}
                  className="flex-1 rounded border border-neutral-200 bg-neutral-50 px-2 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800"
                />
              </div>
            </div>
          </div>

          {/* Contrast ratio display */}
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <div className="mb-3 text-center">
              <div className="text-4xl font-bold text-neutral-900 dark:text-white">
                {ratio.toFixed(2)}:1
              </div>
              <div className="text-xs text-neutral-500">Contrast Ratio</div>
            </div>

            {/* WCAG compliance */}
            <div className="space-y-2">
              <div className={`flex items-center justify-between rounded p-2 ${
                passesAA ? "bg-neutral-200 dark:bg-neutral-700" : "bg-[#ff4400]/10"
              }`}>
                <span className="text-xs font-medium">AA Normal Text (4.5:1)</span>
                <span className={`text-xs font-bold ${
                  passesAA ? "text-neutral-900 dark:text-white" : "text-[#ff4400]"
                }`}>
                  {passesAA ? "PASS" : "FAIL"}
                </span>
              </div>
              <div className={`flex items-center justify-between rounded p-2 ${
                passesAALarge ? "bg-neutral-200 dark:bg-neutral-700" : "bg-[#ff4400]/10"
              }`}>
                <span className="text-xs font-medium">AA Large Text (3:1)</span>
                <span className={`text-xs font-bold ${
                  passesAALarge ? "text-neutral-900 dark:text-white" : "text-[#ff4400]"
                }`}>
                  {passesAALarge ? "PASS" : "FAIL"}
                </span>
              </div>
              <div className={`flex items-center justify-between rounded p-2 ${
                passesAAA ? "bg-neutral-200 dark:bg-neutral-700" : "bg-neutral-100 dark:bg-neutral-800"
              }`}>
                <span className="text-xs font-medium">AAA Normal Text (7:1)</span>
                <span className={`text-xs font-bold ${
                  passesAAA ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
                }`}>
                  {passesAAA ? "PASS" : "FAIL"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col justify-center">
          <motion.div
            className="rounded-lg p-6"
            style={{ backgroundColor: bgColour }}
            animate={{ backgroundColor: bgColour }}
          >
            <motion.h3
              className="mb-2 text-2xl font-bold"
              style={{ color: textColour }}
              animate={{ color: textColour }}
            >
              Sample Heading
            </motion.h3>
            <motion.p
              className="mb-4"
              style={{ color: textColour, fontSize: "16px" }}
              animate={{ color: textColour }}
            >
              This is body text at 16px. Good contrast ensures all users can 
              read your content comfortably.
            </motion.p>
            <motion.p
              className="text-sm"
              style={{ color: textColour, opacity: 0.7 }}
              animate={{ color: textColour }}
            >
              This is smaller text that also needs to be readable.
            </motion.p>
          </motion.div>

          {/* Quick suggestions */}
          <div className="mt-4 text-center text-xs text-neutral-500">
            {!passesAA && (
              <p>
                💡 Try increasing the contrast by making text darker or background lighter
              </p>
            )}
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
