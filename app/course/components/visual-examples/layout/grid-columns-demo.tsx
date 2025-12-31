"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type ColumnLayout = "full" | "half" | "thirds" | "quarters" | "sidebar";

const layouts: { value: ColumnLayout; label: string; columns: number[] }[] = [
  { value: "full", label: "1 Column", columns: [12] },
  { value: "half", label: "2 Columns", columns: [6, 6] },
  { value: "thirds", label: "3 Columns", columns: [4, 4, 4] },
  { value: "quarters", label: "4 Columns", columns: [3, 3, 3, 3] },
  { value: "sidebar", label: "Sidebar", columns: [8, 4] },
];

export function GridColumnsDemo() {
  const [layout, setLayout] = useState<ColumnLayout>("thirds");
  const [showGrid, setShowGrid] = useState(true);

  const currentLayout = layouts.find((l) => l.value === layout)!;

  return (
    <ExampleWrapper
      title="12-Column ViewGrid System"
      description="See how the 12-column grid enables flexible layouts"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Layout">
            {layouts.map((l) => (
              <ControlButton
                key={l.value}
                active={layout === l.value}
                onClick={() => setLayout(l.value)}
              >
                {l.label}
              </ControlButton>
            ))}
          </ControlGroup>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300"
            />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              Show grid
            </span>
          </label>
        </div>
      }
    >
      <div className="relative">
        {/* 12-column grid overlay */}
        {showGrid && (
          <div className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-full bg-[#ff4400]/10"
              />
            ))}
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-12 gap-4">
          {currentLayout.columns.map((colSpan, i) => (
            <motion.div
              key={`${layout}-${i}`}
              className="rounded-lg border-2 border-dashed border-neutral-300 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-800"
              style={{ gridColumn: `span ${colSpan}` }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
            >
              <div className="h-32 rounded bg-neutral-100 dark:bg-neutral-700" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-600" />
                <div className="h-3 w-full rounded bg-neutral-100 dark:bg-neutral-700" />
                <div className="h-3 w-2/3 rounded bg-neutral-100 dark:bg-neutral-700" />
              </div>
              <div className="mt-3 text-center text-xs font-mono text-neutral-500">
                {colSpan}/12 columns
              </div>
            </motion.div>
          ))}
        </div>

        {/* Column calculation */}
        <div className="mt-4 flex justify-center gap-2 text-xs text-neutral-500">
          {currentLayout.columns.map((col, i) => (
            <React.Fragment key={i}>
              <span className="font-mono">{col}</span>
              {i < currentLayout.columns.length - 1 && <span>+</span>}
            </React.Fragment>
          ))}
          <span>= 12</span>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          <strong className="text-neutral-900 dark:text-white">Why 12 columns?</strong> 12 is divisible by 2, 3, 4, and 6, making it 
          incredibly flexible for creating various layouts while maintaining alignment.
        </p>
      </div>
    </ExampleWrapper>
  );
}
