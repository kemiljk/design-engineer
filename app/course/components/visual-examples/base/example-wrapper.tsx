"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ExampleWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
  allowOverflow?: boolean;
}

export function ExampleWrapper({
  title,
  description,
  children,
  controls,
  className,
  allowOverflow = false,
}: ExampleWrapperProps) {
  return (
    <figure
      className={cn(
        "not-prose my-8 w-full max-w-full border border-neutral-200/60 bg-white shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900",
        !allowOverflow && "overflow-hidden",
        className
      )}
    >
      <div className="border-b border-neutral-200/60 bg-gradient-to-b from-neutral-50/50 to-white/50 px-6 py-5 dark:border-neutral-800/60 dark:from-neutral-900/50 dark:to-neutral-950/50">
        <h4 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      
      <div className="p-6 sm:p-8">{children}</div>
      
      {controls && (
        <div className="border-t border-neutral-200/60 bg-neutral-50/50 px-6 py-4 dark:border-neutral-800/60 dark:bg-neutral-950/30">
          {controls}
        </div>
      )}
    </figure>
  );
}

interface ControlGroupProps {
  label: string;
  children: React.ReactNode;
}

export function ControlGroup({ label, children }: ControlGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface ControlButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function ControlButton({ active, onClick, children }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-xs font-medium transition-all duration-200",
        active
          ? "bg-neutral-900 text-white shadow-md shadow-neutral-900/10 dark:bg-white dark:text-neutral-900 dark:shadow-white/10"
          : "bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-900 hover:shadow hover:ring-neutral-300/80 active:scale-[0.98] dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700/80 dark:hover:bg-neutral-700 dark:hover:text-white dark:hover:ring-neutral-600/80"
      )}
    >
      {children}
    </button>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = "",
}: SliderControlProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="shrink-0 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-neutral-200 accent-neutral-900 sm:w-32 dark:bg-neutral-700 dark:accent-white"
        />
      </div>
      <span className="min-w-[3rem] shrink-0 rounded-lg bg-white px-2 py-1 text-center font-mono text-xs text-neutral-600 shadow-sm ring-1 ring-neutral-200/50 sm:min-w-[3.5rem] dark:bg-neutral-800 dark:text-neutral-400 dark:ring-neutral-700/50">
        {value}{unit}
      </span>
    </div>
  );
}
