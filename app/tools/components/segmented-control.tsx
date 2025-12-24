"use client";

import React from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  layoutId?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  layoutId = "segmented-control-indicator",
}: SegmentedControlProps<T>) {
  return (
    <div
      className={clsx(
        "relative flex bg-neutral-100 p-1 dark:bg-neutral-800",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={clsx(
              "relative z-10 flex-1 px-3 py-1.5 text-xs font-medium transition-colors",
              isSelected
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-white shadow-sm dark:bg-neutral-700"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
