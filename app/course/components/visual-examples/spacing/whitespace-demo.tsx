"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

export function WhitespaceDemo() {
  const [density, setDensity] = useState(50);

  // Map density to spacing values
  const getSpacing = () => {
    const base = density / 100;
    return {
      padding: 8 + Math.round(24 * base),
      gap: 4 + Math.round(16 * base),
      sectionGap: 16 + Math.round(32 * base),
    };
  };

  const spacing = getSpacing();

  return (
    <ExampleWrapper
      title="The Power of Whitespace"
      description="Adjust density to see how whitespace affects perception"
      controls={
        <SliderControl
          label="Density"
          value={density}
          min={10}
          max={100}
          onChange={setDensity}
          unit="%"
        />
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dense vs Spacious comparison */}
        <motion.div
          className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
          style={{ padding: spacing.padding }}
          layout
          transition={{ duration: 0.2 }}
        >
          <motion.h3
            className="font-serif text-xl font-bold text-neutral-900 dark:text-white"
            style={{ marginBottom: spacing.gap }}
            layout
          >
            Premium Product
          </motion.h3>
          <motion.p
            className="text-sm text-neutral-600 dark:text-neutral-400"
            style={{ marginBottom: spacing.sectionGap }}
            layout
          >
            Experience the finest quality craftsmanship with our carefully curated selection.
          </motion.p>
          <div className="space-y-2">
            {["Feature one", "Feature two", "Feature three"].map((feature) => (
              <motion.div
                key={feature}
                className="flex items-center text-sm text-neutral-700 dark:text-neutral-300"
                style={{ gap: spacing.gap / 2 }}
                layout
              >
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
          <motion.button
            className="w-full rounded bg-neutral-900 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
            style={{ marginTop: spacing.sectionGap }}
            layout
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Quality perception scale */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Perception Scale
            </p>
            <div className="relative h-8 overflow-hidden rounded-full bg-gradient-to-r from-orange-100 via-neutral-100 to-blue-100 dark:from-orange-900/30 dark:via-neutral-800 dark:to-blue-900/30">
              <motion.div
                className="absolute top-0 h-8 w-2 rounded-full bg-neutral-900 dark:bg-white"
                animate={{ left: `calc(${density}% - 4px)` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>Dense / Functional</span>
              <span>Spacious / Premium</span>
            </div>
          </div>

          {/* Associations */}
          <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
            <p className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              Current density suggests:
            </p>
            <div className="flex flex-wrap gap-2">
              {density < 30 && (
                <>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">Utilitarian</span>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">Data-heavy</span>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">Dashboard</span>
                </>
              )}
              {density >= 30 && density < 60 && (
                <>
                  <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">Balanced</span>
                  <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">Professional</span>
                  <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">Versatile</span>
                </>
              )}
              {density >= 60 && density < 85 && (
                <>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Premium</span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Refined</span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Luxury</span>
                </>
              )}
              {density >= 85 && (
                <>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Editorial</span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Minimal</span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">High-end</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 text-center">
        <p className="text-xs text-neutral-500">
          Whitespace isn&apos;t wasted space—it communicates quality, focus, and importance.
        </p>
      </div>
    </ExampleWrapper>
  );
}
