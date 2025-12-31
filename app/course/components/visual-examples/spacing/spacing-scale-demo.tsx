"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type BaseUnit = 4 | 8;

export function SpacingScaleDemo() {
  const [baseUnit, setBaseUnit] = useState<BaseUnit>(8);

  const generateScale = (base: number) => [
    { name: "1", value: base * 0.5, usage: "Tight icon padding" },
    { name: "2", value: base * 1, usage: "Between related items" },
    { name: "3", value: base * 1.5, usage: "Small padding" },
    { name: "4", value: base * 2, usage: "Standard padding" },
    { name: "6", value: base * 3, usage: "Large padding" },
    { name: "8", value: base * 4, usage: "Section padding" },
    { name: "12", value: base * 6, usage: "Between sections" },
    { name: "16", value: base * 8, usage: "Major divisions" },
  ];

  const scale = generateScale(baseUnit);

  return (
    <ExampleWrapper
      title="The 8-Point ViewGrid"
      description="All spacing values as multiples of a base unit"
      controls={
        <ControlGroup label="Base Unit">
          <ControlButton
            active={baseUnit === 4}
            onClick={() => setBaseUnit(4)}
          >
            4px (fine-tuning)
          </ControlButton>
          <ControlButton
            active={baseUnit === 8}
            onClick={() => setBaseUnit(8)}
          >
            8px (standard)
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Visual scale */}
        <div className="space-y-3">
          {scale.map((step) => (
            <div key={step.name} className="flex items-center gap-3">
              <span className="w-8 text-right font-mono text-xs text-neutral-500">
                {step.name}
              </span>
              <div
                className="h-6 rounded bg-neutral-800 dark:bg-neutral-200"
                style={{ width: step.value }}
              />
              <span className="font-mono text-xs text-neutral-400">
                {step.value}px
              </span>
              <span className="hidden text-xs text-neutral-500 sm:block">
                {step.usage}
              </span>
            </div>
          ))}
        </div>

        {/* UI Application */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Card Component
            </p>
            <div
              className="rounded-lg bg-white shadow-sm dark:bg-neutral-900"
              style={{ padding: scale[3].value }}
            >
              <div className="flex items-start" style={{ gap: scale[2].value }}>
                <div 
                  className="h-12 w-12 shrink-0 rounded bg-neutral-200 dark:bg-neutral-700"
                  style={{ padding: scale[0].value }}
                />
                <div className="flex-1" style={{ gap: scale[1].value }}>
                  <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div 
                    className="h-3 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800"
                    style={{ marginTop: scale[1].value }}
                  />
                </div>
              </div>
              <div 
                className="h-8 w-24 rounded bg-neutral-900 dark:bg-white"
                style={{ marginTop: scale[3].value }}
              />
            </div>
          </div>

          {/* Spacing annotations */}
          <div className="border-t border-neutral-200 p-3 dark:border-neutral-700">
            <p className="text-xs text-neutral-500">
              <span className="font-mono">space-4</span> ({scale[3].value}px) for card padding,{" "}
              <span className="font-mono">space-2</span> ({scale[1].value}px) between elements
            </p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          <strong className="text-neutral-900 dark:text-white">Why {baseUnit}px?</strong>{" "}
          {baseUnit === 8 
            ? "8 divides evenly by 2 and 4, aligns with most screen sizes, and is used by Material Design, iOS, and most design systems."
            : "4px allows finer control for dense UIs while still maintaining a consistent system."}
        </p>
      </div>
    </ExampleWrapper>
  );
}
