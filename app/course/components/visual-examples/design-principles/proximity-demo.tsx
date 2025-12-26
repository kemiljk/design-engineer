"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, SliderControl } from "../base/example-wrapper";

export function ProximityDemo() {
  const [groupSpacing, setGroupSpacing] = useState(32);
  const [itemSpacing, setItemSpacing] = useState(8);

  return (
    <ExampleWrapper
      title="Proximity Creates Relationships"
      description="Adjust spacing to see how proximity groups related items"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <SliderControl
            label="Within groups"
            value={itemSpacing}
            min={2}
            max={24}
            onChange={setItemSpacing}
            unit="px"
          />
          <SliderControl
            label="Between groups"
            value={groupSpacing}
            min={8}
            max={64}
            onChange={setGroupSpacing}
            unit="px"
          />
        </div>
      }
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Form example */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Form Fields
          </h4>
          <motion.div
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
            layout
          >
            {/* Personal Info Group */}
            <div style={{ marginBottom: `${groupSpacing}px` }}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Personal Info
              </div>
              <motion.div layout style={{ marginBottom: `${itemSpacing}px` }}>
                <label className="mb-1 block text-xs text-neutral-500">First Name</label>
                <div className="h-8 rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              </motion.div>
              <motion.div layout>
                <label className="mb-1 block text-xs text-neutral-500">Last Name</label>
                <div className="h-8 rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              </motion.div>
            </div>

            {/* Contact Group */}
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Contact
              </div>
              <motion.div layout style={{ marginBottom: `${itemSpacing}px` }}>
                <label className="mb-1 block text-xs text-neutral-500">Email</label>
                <div className="h-8 rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              </motion.div>
              <motion.div layout>
                <label className="mb-1 block text-xs text-neutral-500">Phone</label>
                <div className="h-8 rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Visual dots example */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Visual Grouping
          </h4>
          <div className="flex h-48 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center" style={{ gap: `${groupSpacing}px` }}>
              {/* Group A */}
              <motion.div layout className="flex flex-col" style={{ gap: `${itemSpacing}px` }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`a-${i}`}
                    className="h-4 w-4 rounded-full bg-neutral-800 dark:bg-neutral-200"
                    layout
                  />
                ))}
              </motion.div>
              
              {/* Group B */}
              <motion.div layout className="flex flex-col" style={{ gap: `${itemSpacing}px` }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`b-${i}`}
                    className="h-4 w-4 rounded-full bg-neutral-500 dark:bg-neutral-400"
                    layout
                  />
                ))}
              </motion.div>
              
              {/* Group C */}
              <motion.div layout className="flex flex-col" style={{ gap: `${itemSpacing}px` }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`c-${i}`}
                    className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-600"
                    layout
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>Insight:</strong> When group spacing ({groupSpacing}px) is significantly larger than 
          item spacing ({itemSpacing}px), groupings become clear without needing borders or backgrounds.
          {groupSpacing > itemSpacing * 2 
            ? " ✓ Your spacing creates clear groups."
            : " Try increasing the difference for clearer grouping."}
        </p>
      </div>
    </ExampleWrapper>
  );
}
