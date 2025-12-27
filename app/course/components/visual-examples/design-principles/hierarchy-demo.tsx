"use client";

import React, { useState } from "react";
import {
  ExampleWrapper,
  ControlButton,
  ControlGroup,
} from "../base/example-wrapper";

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
          subtitle:
            "text-sm font-medium text-neutral-500 dark:text-neutral-400",
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
          title: "text-xl font-bold text-neutral-900 dark:text-white underline",
          subtitle:
            "text-xl font-bold text-neutral-700 dark:text-neutral-300 italic",
          body: "text-lg font-bold text-neutral-800 dark:text-neutral-200",
          meta: "text-lg font-bold text-neutral-600 dark:text-neutral-400 uppercase",
          cta: "bg-[#ff4400] text-white px-4 py-2 font-bold text-lg",
          secondary:
            "text-lg font-bold text-neutral-500 dark:text-neutral-400 underline decoration-2",
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
      <div className="max-w-md space-y-4">
        <div className={styles.meta}>12 December 2024 • 5 min read</div>

        <h3 className={styles.title}>Understanding Visual Design</h3>

        <p className={styles.subtitle}>A comprehensive guide for engineers</p>

        <p className={styles.body}>
          Visual design is about intentional communication. Every choice you
          make sends a message to users. Learn how to make those choices count.
        </p>

        <div className="flex items-center gap-4 pt-2">
          <button className={styles.cta}>Read Article</button>
          <button className={styles.secondary}>Save for Later</button>
        </div>
      </div>

      {mode === "clear" && (
        <p className="mt-6 text-xs text-neutral-600 italic dark:text-neutral-400">
          ✓ Clear hierarchy: Your eye naturally moves from title → subtitle →
          body → action
        </p>
      )}
      {mode === "flat" && (
        <p className="mt-6 text-xs text-[#ff4400] italic">
          ✗ No hierarchy: Everything looks equally important. Where should you
          look first?
        </p>
      )}
      {mode === "competing" && (
        <p className="mt-6 text-xs text-[#ff4400] italic">
          ✗ Competing elements: Multiple focal points fight for attention.
          Nothing wins.
        </p>
      )}
    </ExampleWrapper>
  );
}
