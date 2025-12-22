"use client";

import React from "react";
import { clsx } from "clsx";

export type CssFormat = "tailwind" | "css" | "scss";

type CssFormatToggleProps = {
  value: CssFormat;
  onChange: (format: CssFormat) => void;
  formats?: CssFormat[];
  className?: string;
};

const FORMAT_LABELS: Record<CssFormat, string> = {
  tailwind: "Tailwind",
  css: "CSS",
  scss: "SCSS",
};

export function CssFormatToggle({
  value,
  onChange,
  formats = ["tailwind", "css"],
  className,
}: CssFormatToggleProps) {
  return (
    <div className={clsx("flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", className)}>
      {formats.map((format) => (
        <button
          key={format}
          onClick={() => onChange(format)}
          className={clsx(
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            value === format
              ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
              : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
        >
          {FORMAT_LABELS[format]}
        </button>
      ))}
    </div>
  );
}
