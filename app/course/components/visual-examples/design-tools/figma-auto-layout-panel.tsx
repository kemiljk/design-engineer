"use client";

import React from "react";
import { 
  ArrowRight, 
  ArrowDown,
  AlignTopBox,
  AlignVerticalCenters,
  AlignBottomBox,
  AlignLeftBox,
  AlignHorizontalCenters,
  AlignRightBox,
} from "iconoir-react";
import { cn } from "@/lib/utils";

interface AutoLayoutPanelProps {
  direction?: "horizontal" | "vertical";
  gap?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  padding?: number | string;
  alignPrimary?: "start" | "center" | "end" | "space-between";
  alignCross?: "start" | "center" | "end" | "stretch";
  title?: string;
  children?: string[];
}

export function FigmaAutoLayoutPanel({
  direction = "horizontal",
  gap = 8,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  padding,
  alignPrimary = "start",
  alignCross = "center",
  title,
  children = [],
}: AutoLayoutPanelProps) {
  // Handle uniform padding
  const pTop = paddingTop ?? padding ?? 0;
  const pRight = paddingRight ?? padding ?? 0;
  const pBottom = paddingBottom ?? padding ?? 0;
  const pLeft = paddingLeft ?? padding ?? 0;

  const hasUniformPadding = pTop === pRight && pRight === pBottom && pBottom === pLeft;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
      {/* Panel Header - mimics Figma section header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-500">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Auto layout
          </span>
        </div>
        {title && (
          <span className="text-[10px] font-medium text-neutral-400">
            {title}
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Direction & Alignment */}
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              Direction
            </span>
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded border",
                direction === "horizontal" 
                  ? "border-swiss-red bg-swiss-red/10 text-swiss-red" 
                  : "border-neutral-300 text-neutral-400 dark:border-neutral-600"
              )}>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded border",
                direction === "vertical" 
                  ? "border-swiss-red bg-swiss-red/10 text-swiss-red" 
                  : "border-neutral-300 text-neutral-400 dark:border-neutral-600"
              )}>
                <ArrowDown className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Gap */}
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              Gap
            </span>
            <div className="flex h-7 items-center rounded border border-neutral-300 bg-white px-2 dark:border-neutral-600 dark:bg-neutral-900">
              <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
                {gap}
              </span>
            </div>
          </div>

          {/* Alignment - Primary Axis */}
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {direction === "horizontal" ? "Horizontal" : "Vertical"}
            </span>
            <div className="flex items-center gap-1">
              {direction === "horizontal" ? (
                <>
                  <AlignButton active={alignPrimary === "start"} icon={<AlignLeftBox className="h-3 w-3" />} />
                  <AlignButton active={alignPrimary === "center"} icon={<AlignHorizontalCenters className="h-3 w-3" />} />
                  <AlignButton active={alignPrimary === "end"} icon={<AlignRightBox className="h-3 w-3" />} />
                </>
              ) : (
                <>
                  <AlignButton active={alignPrimary === "start"} icon={<AlignTopBox className="h-3 w-3" />} />
                  <AlignButton active={alignPrimary === "center"} icon={<AlignVerticalCenters className="h-3 w-3" />} />
                  <AlignButton active={alignPrimary === "end"} icon={<AlignBottomBox className="h-3 w-3" />} />
                </>
              )}
              <div className={cn(
                "flex h-6 w-6 items-center justify-center rounded",
                alignPrimary === "space-between" 
                  ? "bg-swiss-red/10 text-swiss-red" 
                  : "text-neutral-400"
              )}>
                <SpaceBetweenIcon horizontal={direction === "horizontal"} />
              </div>
            </div>
          </div>

          {/* Alignment - Cross Axis */}
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {direction === "horizontal" ? "Vertical" : "Horizontal"}
            </span>
            <div className="flex items-center gap-1">
              {direction === "horizontal" ? (
                <>
                  <AlignButton active={alignCross === "start"} icon={<AlignTopBox className="h-3 w-3" />} />
                  <AlignButton active={alignCross === "center"} icon={<AlignVerticalCenters className="h-3 w-3" />} />
                  <AlignButton active={alignCross === "end"} icon={<AlignBottomBox className="h-3 w-3" />} />
                </>
              ) : (
                <>
                  <AlignButton active={alignCross === "start"} icon={<AlignLeftBox className="h-3 w-3" />} />
                  <AlignButton active={alignCross === "center"} icon={<AlignHorizontalCenters className="h-3 w-3" />} />
                  <AlignButton active={alignCross === "end"} icon={<AlignRightBox className="h-3 w-3" />} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Padding */}
        <div className="mt-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            Padding
          </span>
          {hasUniformPadding ? (
            <div className="flex h-7 w-20 items-center rounded border border-neutral-300 bg-white px-2 dark:border-neutral-600 dark:bg-neutral-900">
              <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
                {pTop}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PaddingInput value={pTop} label="T" />
              <PaddingInput value={pRight} label="R" />
              <PaddingInput value={pBottom} label="B" />
              <PaddingInput value={pLeft} label="L" />
            </div>
          )}
        </div>

        {/* Children Preview */}
        {children.length > 0 && (
          <div className="mt-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              Children
            </span>
            <div className="rounded border border-neutral-300 bg-white p-2 dark:border-neutral-600 dark:bg-neutral-900">
              <div className={cn(
                "flex gap-1",
                direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
              )}>
                {children.map((child, i) => (
                  <div 
                    key={i}
                    className="rounded bg-swiss-red/10 px-2 py-1 text-[10px] font-medium text-swiss-red"
                  >
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AlignButton({ active, icon }: { active: boolean; icon: React.ReactNode }) {
  return (
    <div className={cn(
      "flex h-6 w-6 items-center justify-center rounded",
      active ? "bg-swiss-red/10 text-swiss-red" : "text-neutral-400"
    )}>
      {icon}
    </div>
  );
}

function PaddingInput({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-neutral-400">{label}</span>
      <div className="flex h-6 w-10 items-center justify-center rounded border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900">
        <span className="font-mono text-[10px] text-neutral-700 dark:text-neutral-300">
          {value}
        </span>
      </div>
    </div>
  );
}

function SpaceBetweenIcon({ horizontal }: { horizontal: boolean }) {
  if (horizontal) {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="4" width="2" height="4" fill="currentColor" />
        <rect x="5" y="4" width="2" height="4" fill="currentColor" />
        <rect x="9" y="4" width="2" height="4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="4" y="1" width="4" height="2" fill="currentColor" />
      <rect x="4" y="5" width="4" height="2" fill="currentColor" />
      <rect x="4" y="9" width="4" height="2" fill="currentColor" />
    </svg>
  );
}

