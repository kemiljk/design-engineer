"use client";

import React, { useState, useEffect } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type ComparisonMode = "alphabet" | "xheight" | "numbers" | "pangram";

interface FontOption {
  name: string;
  family: string;
  category: "sans" | "serif" | "mono";
}

const fonts: FontOption[] = [
  { name: "Inter", family: "'Inter', sans-serif", category: "sans" },
  { name: "Roboto", family: "'Roboto', sans-serif", category: "sans" },
  { name: "Source Sans 3", family: "'Source Sans 3', sans-serif", category: "sans" },
  { name: "Montserrat", family: "'Montserrat', sans-serif", category: "sans" },
  { name: "Playfair Display", family: "'Playfair Display', serif", category: "serif" },
  { name: "Merriweather", family: "'Merriweather', serif", category: "serif" },
  { name: "Source Serif 4", family: "'Source Serif 4', serif", category: "serif" },
  { name: "Lora", family: "'Lora', serif", category: "serif" },
  { name: "Source Code Pro", family: "'Source Code Pro', monospace", category: "mono" },
  { name: "JetBrains Mono", family: "'JetBrains Mono', monospace", category: "mono" },
];

const googleFontsUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Source+Sans+3:wght@400;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Source+Serif+4:wght@400;700&family=Lora:wght@400;700&family=Source+Code+Pro:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap";

const modeContent: Record<ComparisonMode, { label: string; text: string; size: string }> = {
  alphabet: { 
    label: "Alphabet", 
    text: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOo",
    size: "text-sm sm:text-base"
  },
  xheight: { 
    label: "x-Height", 
    text: "Hxp",
    size: "text-6xl sm:text-7xl md:text-8xl"
  },
  numbers: { 
    label: "Numbers", 
    text: "0123456789",
    size: "text-2xl sm:text-3xl"
  },
  pangram: { 
    label: "Pangram", 
    text: "The quick brown fox jumps over the lazy dog.",
    size: "text-base sm:text-lg"
  },
};

// Neutral overlay colours for x-height comparison
const overlayStyles = [
  { color: undefined, opacity: 1 },
  { color: "#ff4400", opacity: 0.85 },
  { color: "#737373", opacity: 0.6 },
  { color: "#a3a3a3", opacity: 0.4 },
];

export function FontComparisonDemo() {
  const [selectedFonts, setSelectedFonts] = useState<string[]>(["Inter", "Playfair Display"]);
  const [mode, setMode] = useState<ComparisonMode>("xheight");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const existingLink = document.querySelector(`link[href*="fonts.googleapis.com"]`);
    if (!existingLink) {
      const link = document.createElement("link");
      link.href = googleFontsUrl;
      link.rel = "stylesheet";
      link.onload = () => setFontsLoaded(true);
      document.head.appendChild(link);
    } else {
      setFontsLoaded(true);
    }
  }, []);

  const toggleFont = (fontName: string) => {
    setSelectedFonts(prev => {
      if (prev.includes(fontName)) {
        if (prev.length <= 1) return prev;
        return prev.filter(f => f !== fontName);
      }
      if (prev.length >= 4) return prev;
      return [...prev, fontName];
    });
  };

  // Category labels using neutral + accent
  const categoryLabels: Record<string, string> = {
    sans: "Sans",
    serif: "Serif",
    mono: "Mono",
  };

  return (
    <ExampleWrapper
      title="Font Comparison"
      description="Compare fonts side-by-side to see how they differ"
      controls={
        <div className="flex flex-col gap-4">
          <ControlGroup label="View">
            {(Object.keys(modeContent) as ComparisonMode[]).map((m) => (
              <ControlButton
                key={m}
                active={mode === m}
                onClick={() => setMode(m)}
              >
                {modeContent[m].label}
              </ControlButton>
            ))}
          </ControlGroup>
        </div>
      }
    >
      {/* Font Selector */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Select fonts to compare (max 4)
        </p>
        <div className="flex flex-wrap gap-2">
          {fonts.map((font) => {
            const isSelected = selectedFonts.includes(font.name);
            return (
              <button
                key={font.name}
                onClick={() => toggleFont(font.name)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {font.name}
                <span className="ml-1.5 text-[10px] opacity-60">
                  {categoryLabels[font.category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* x-Height Mode: Overlaid comparison */}
      {mode === "xheight" ? (
        <div className="overflow-hidden border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800">
          {/* Overlaid text - all fonts on same baseline */}
          <div className="relative flex items-end justify-center" style={{ minHeight: "120px" }}>
            {selectedFonts.map((fontName, index) => {
              const style = overlayStyles[index];
              return (
                <span
                  key={fontName}
                  className={`absolute bottom-0 ${modeContent.xheight.size} font-normal leading-none`}
                  style={{
                    fontFamily: fontsLoaded ? fonts.find(f => f.name === fontName)!.family : "inherit",
                    color: style.color || (index === 0 ? undefined : "#525252"),
                    opacity: style.opacity,
                  }}
                >
                  {modeContent.xheight.text}
                </span>
              );
            })}
          </div>

          {/* Legend - neutral with accent for first comparison */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {selectedFonts.map((fontName, index) => {
              const style = overlayStyles[index];
              return (
                <div key={fontName} className="flex items-center gap-2">
                  <span 
                    className="h-3 w-3"
                    style={{ 
                      backgroundColor: style.color || (index === 0 ? "#171717" : "#525252"),
                      opacity: style.opacity 
                    }} 
                  />
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {fontName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Visual guide */}
          <p className="mt-4 text-center text-xs text-neutral-500">
            Fonts overlaid on the same baseline. Compare where <strong>x</strong> (lowercase) 
            sits relative to <strong>H</strong> (cap height) and <strong>p</strong> (descender).
          </p>
        </div>
      ) : (
        /* Other modes: Stacked comparison */
        <div className="space-y-0 overflow-hidden border border-neutral-200 dark:border-neutral-700">
          {selectedFonts.map((fontName, index) => {
            const font = fonts.find(f => f.name === fontName)!;
            return (
              <div
                key={fontName}
                className={`relative flex items-center gap-4 p-4 ${
                  index !== selectedFonts.length - 1
                    ? "border-b border-neutral-200 dark:border-neutral-700"
                    : ""
                }`}
              >
                {/* Font name */}
                <div className="w-28 shrink-0 sm:w-36">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {font.name}
                  </span>
                  <span className="ml-1 text-[10px] text-neutral-400">
                    {categoryLabels[font.category]}
                  </span>
                </div>
                
                {/* Sample text */}
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p
                    className={`truncate text-neutral-900 dark:text-white ${modeContent[mode].size}`}
                    style={{
                      fontFamily: fontsLoaded ? font.family : "inherit",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {modeContent[mode].text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Insight based on mode */}
      <div className="mt-4 bg-neutral-100 p-3 dark:bg-neutral-800">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {mode === "xheight" && (
            <>
              <strong className="text-neutral-900 dark:text-white">x-Height:</strong>{" "}
              Notice how the lowercase &quot;x&quot; reaches different heights relative to the capital &quot;H&quot;. 
              Fonts with similar x-heights pair well—they share visual weight at the same size.
            </>
          )}
          {mode === "alphabet" && (
            <>
              <strong className="text-neutral-900 dark:text-white">Letterforms:</strong>{" "}
              Compare rounded vs geometric shapes, open vs closed counters, 
              and stroke contrast. These affect readability and personality.
            </>
          )}
          {mode === "numbers" && (
            <>
              <strong className="text-neutral-900 dark:text-white">Numerals:</strong>{" "}
              Compare tabular (fixed-width) vs proportional figures. Monospace fonts have 
              tabular figures by default—ideal for data tables.
            </>
          )}
          {mode === "pangram" && (
            <>
              <strong className="text-neutral-900 dark:text-white">In context:</strong>{" "}
              Notice how some fonts feel warmer, others more neutral. 
              This affects the tone of your interface.
            </>
          )}
        </p>
      </div>
    </ExampleWrapper>
  );
}

