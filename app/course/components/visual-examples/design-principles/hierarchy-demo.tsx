"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type HierarchyMode = "clear" | "flat" | "competing";

const modes: { value: HierarchyMode; label: string }[] = [
  { value: "clear", label: "Clear Hierarchy" },
  { value: "flat", label: "Flat (No Hierarchy)" },
  { value: "competing", label: "Competing Elements" },
];

export function HierarchyDemo() {
  const [mode, setMode] = useState<HierarchyMode>("clear");

  const getStyles = () => {
    switch (mode) {
      case "clear":
        return {
          title: "text-2xl font-bold text-neutral-900 dark:text-white",
          subtitle: "text-sm font-medium text-neutral-500 dark:text-neutral-400",
          body: "text-base text-neutral-600 dark:text-neutral-300",
          meta: "text-xs text-neutral-400 dark:text-neutral-500",
          cta: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-medium",
          secondary: "text-sm text-neutral-500 underline",
        };
      case "flat":
        return {
          title: "text-base text-neutral-600 dark:text-neutral-300",
          subtitle: "text-base text-neutral-600 dark:text-neutral-300",
          body: "text-base text-neutral-600 dark:text-neutral-300",
          meta: "text-base text-neutral-600 dark:text-neutral-300",
          cta: "text-base text-neutral-600 dark:text-neutral-300 px-4 py-2 border border-neutral-300 dark:border-neutral-600",
          secondary: "text-base text-neutral-600 dark:text-neutral-300",
        };
      case "competing":
        return {
          title: "text-xl font-bold text-blue-600 dark:text-blue-400",
          subtitle: "text-xl font-bold text-red-600 dark:text-red-400",
          body: "text-lg font-bold text-green-600 dark:text-green-400",
          meta: "text-lg font-bold text-purple-600 dark:text-purple-400",
          cta: "bg-orange-500 text-white px-4 py-2 font-bold text-lg",
          secondary: "text-lg font-bold text-pink-600 dark:text-pink-400 underline",
        };
    }
  };

  const styles = getStyles();

  return (
    <ExampleWrapper
      title="Visual Hierarchy"
      description="Toggle between modes to see how hierarchy guides attention"
      controls={
        <ControlGroup label="Mode">
          {modes.map((m) => (
            <ControlButton
              key={m.value}
              active={mode === m.value}
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <motion.div
        className="max-w-md space-y-4"
        layout
        transition={{ duration: 0.3 }}
      >
        <motion.div layout className={styles.meta}>
          12 December 2024 • 5 min read
        </motion.div>
        
        <motion.h3 layout className={styles.title}>
          Understanding Visual Design
        </motion.h3>
        
        <motion.p layout className={styles.subtitle}>
          A comprehensive guide for engineers
        </motion.p>
        
        <motion.p layout className={styles.body}>
          Visual design is about intentional communication. Every choice you make 
          sends a message to users. Learn how to make those choices count.
        </motion.p>
        
        <motion.div layout className="flex items-center gap-4 pt-2">
          <button className={styles.cta}>Read Article</button>
          <button className={styles.secondary}>Save for Later</button>
        </motion.div>
      </motion.div>

      {mode === "clear" && (
        <p className="mt-6 text-xs italic text-neutral-500 dark:text-neutral-400">
          ✓ Clear hierarchy: Your eye naturally moves from title → subtitle → body → action
        </p>
      )}
      {mode === "flat" && (
        <p className="mt-6 text-xs italic text-red-500 dark:text-red-400">
          ✗ No hierarchy: Everything looks equally important. Where should you look first?
        </p>
      )}
      {mode === "competing" && (
        <p className="mt-6 text-xs italic text-red-500 dark:text-red-400">
          ✗ Competing elements: Multiple focal points fight for attention. Nothing wins.
        </p>
      )}
    </ExampleWrapper>
  );
}
