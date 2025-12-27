"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowDown, ImageIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction = "horizontal" | "vertical";
type Alignment = "start" | "center" | "end";

export function AutoLayoutDemo() {
  const [direction, setDirection] = useState<Direction>("vertical");
  const [gap, setGap] = useState(12);
  const [padding, setPadding] = useState(16);
  const [alignMain, setAlignMain] = useState<Alignment>("start");
  const [alignCross, setAlignCross] = useState<Alignment>("start");

  // Fixed container size so alignment has visible effect
  const containerSize =
    direction === "vertical"
      ? { width: 240, height: 380 }
      : { width: 480, height: 180 };

  return (
    <figure className="not-prose my-8">
      {/* Header - constrained width */}
      <div className="rounded-t-xl border border-b-0 border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Auto Layout in Practice
        </h4>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Adjust the properties to see how auto layout affects the card
        </p>
      </div>

      {/* Content area - full bleed */}
      <div className="relative right-1/2 left-1/2 -mx-[50vw] w-screen border-y border-neutral-200 bg-white py-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
          {/* Live Preview - fixed size container to prevent layout shift */}
          <div className="flex h-[420px] w-[520px] shrink-0 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 dark:border-neutral-600 dark:bg-neutral-800/50">
            <div
              className={cn(
                "flex overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800",
                direction === "vertical" ? "flex-col" : "flex-row",
                alignMain === "start" && "justify-start",
                alignMain === "center" && "justify-center",
                alignMain === "end" && "justify-end",
                alignCross === "start" && "items-start",
                alignCross === "center" && "items-center",
                alignCross === "end" && "items-end",
              )}
              style={{
                gap: `${gap}px`,
                padding: `${padding}px`,
                width: containerSize.width,
                height: containerSize.height,
              }}
            >
              {/* Image placeholder */}
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600",
                  direction === "vertical" ? "h-32 w-full" : "h-full w-32",
                )}
              >
                <ImageIcon className="h-10 w-10 text-neutral-400 dark:text-neutral-500" />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex min-w-0 flex-col gap-2",
                  direction === "vertical" ? "w-full" : "flex-1",
                )}
              >
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  Product Title
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < 4
                          ? "fill-amber-400 text-amber-400"
                          : "fill-neutral-200 text-neutral-200 dark:fill-neutral-600 dark:text-neutral-600",
                      )}
                    />
                  ))}
                  <span className="ml-1 text-sm text-neutral-500">4.0</span>
                </div>
                <div className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  A brief description of the product goes here with more detail.
                </div>
              </div>

              {/* Button */}
              <button
                className={cn(
                  "bg-swiss-red hover:bg-swiss-red/90 shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors",
                  direction === "vertical" ? "w-full" : "",
                )}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Interactive Figma-style Panel */}
          <div className="w-full max-w-xs shrink-0 rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
            {/* Panel Header */}
            <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-neutral-500"
              >
                <rect
                  x="2"
                  y="2"
                  width="12"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M5 8h6M8 5v6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Auto layout
              </span>
            </div>

            <div className="space-y-4 p-3">
              {/* Direction */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  Direction
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDirection("horizontal")}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded border transition-colors",
                      direction === "horizontal"
                        ? "border-swiss-red bg-swiss-red/10 text-swiss-red"
                        : "border-neutral-300 text-neutral-400 hover:border-neutral-400 dark:border-neutral-600",
                    )}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDirection("vertical")}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded border transition-colors",
                      direction === "vertical"
                        ? "border-swiss-red bg-swiss-red/10 text-swiss-red"
                        : "border-neutral-300 text-neutral-400 hover:border-neutral-400 dark:border-neutral-600",
                    )}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Gap */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  Gap
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-600"
                  />
                  <div className="flex h-7 w-12 items-center justify-center rounded border border-neutral-300 bg-white font-mono text-xs text-neutral-700 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                    {gap}px
                  </div>
                </div>
              </div>

              {/* Padding */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  Padding
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-600"
                  />
                  <div className="flex h-7 w-12 items-center justify-center rounded border border-neutral-300 bg-white font-mono text-xs text-neutral-700 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                    {padding}px
                  </div>
                </div>
              </div>

              {/* Main Axis Alignment */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  {direction === "horizontal" ? "Horizontal" : "Vertical"}
                </span>
                <div className="flex gap-1">
                  {(["start", "center", "end"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setAlignMain(align)}
                      className={cn(
                        "flex h-6 items-center justify-center rounded px-2 text-[10px] font-medium transition-colors",
                        alignMain === align
                          ? "bg-swiss-red text-white"
                          : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400",
                      )}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cross Axis Alignment */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  {direction === "horizontal" ? "Vertical" : "Horizontal"}
                </span>
                <div className="flex gap-1">
                  {(["start", "center", "end"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setAlignCross(align)}
                      className={cn(
                        "flex h-6 items-center justify-center rounded px-2 text-[10px] font-medium transition-colors",
                        alignCross === align
                          ? "bg-swiss-red text-white"
                          : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400",
                      )}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Children indicator */}
              <div className="space-y-1.5 border-t border-neutral-200 pt-3 dark:border-neutral-700">
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">
                  Children
                </span>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 dark:bg-neutral-900">
                    <div className="h-2.5 w-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
                    <span className="text-[10px] text-neutral-500">Image</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 dark:bg-neutral-900">
                    <div className="h-2.5 w-2.5 rounded-sm bg-neutral-500" />
                    <span className="text-[10px] text-neutral-500">
                      Content
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 dark:bg-neutral-900">
                    <div className="bg-swiss-red h-2.5 w-2.5 rounded-sm" />
                    <span className="text-[10px] text-neutral-500">Button</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hint - constrained width */}
      <div className="rounded-b-xl border border-t-0 border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-center text-xs text-neutral-500">
          This mirrors CSS Flexbox: direction sets flex-direction, gap sets gap,
          alignment sets justify-content and align-items
        </p>
      </div>
    </figure>
  );
}
