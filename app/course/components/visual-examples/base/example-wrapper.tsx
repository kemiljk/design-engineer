"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ExampleWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

export function ExampleWrapper({
  title,
  description,
  children,
  controls,
  className,
}: ExampleWrapperProps) {
  return (
    <figure
      className={cn(
        "not-prose my-8 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
    >
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
          {title}
        </h4>
        {description && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      
      <div className="p-4 sm:p-6">{children}</div>
      
      {controls && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
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
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      {children}
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
        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
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
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-neutral-300 dark:bg-neutral-700"
      />
      <span className="min-w-[3rem] text-right font-mono text-xs text-neutral-500">
        {value}{unit}
      </span>
    </div>
  );
}
