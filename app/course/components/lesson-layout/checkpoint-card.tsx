"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, RotateCcw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckpointItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckpointCardProps {
  items: string[];
  storageKey: string;
  title?: string;
}

export function CheckpointCard({ items, storageKey, title = "Checklist" }: CheckpointCardProps) {
  const [checklistItems, setChecklistItems] = useState<CheckpointItem[]>(() =>
    items.map((label, i) => ({
      id: `${storageKey}-${i}`,
      label,
      checked: false,
    }))
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`checkpoint-${storageKey}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        setChecklistItems((prev) =>
          prev.map((item) => ({
            ...item,
            checked: parsed[item.id] ?? false,
          }))
        );
      } catch {
        // Invalid JSON, use defaults
      }
    }
    setIsHydrated(true);
  }, [storageKey]);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      const state = checklistItems.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.checked,
        }),
        {} as Record<string, boolean>
      );
      localStorage.setItem(`checkpoint-${storageKey}`, JSON.stringify(state));
    }
  }, [checklistItems, storageKey, isHydrated]);

  const toggleItem = useCallback((itemId: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const resetChecklist = useCallback(() => {
    setChecklistItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  }, []);

  const checkedCount = checklistItems.filter((i) => i.checked).length;
  const totalCount = checklistItems.length;
  const isComplete = checkedCount === totalCount;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  if (!isHydrated) {
    return (
      <div className="my-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-32 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
          {items.map((_, i) => (
            <div key={i} className="h-8 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-8">
      <div
        className={cn(
          "rounded-xl border bg-white transition-colors dark:bg-neutral-900",
          isComplete
            ? "border-swiss-red/30 bg-swiss-red/5 dark:border-swiss-red/20 dark:bg-swiss-red/5"
            : "border-neutral-200 dark:border-neutral-800"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                isComplete
                  ? "bg-swiss-red text-white"
                  : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </div>
            <div>
              <h4
                className={cn(
                  "text-sm font-semibold",
                  isComplete
                    ? "text-swiss-red"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                {isComplete ? `${title} Complete!` : title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isComplete
                  ? "You're ready to move on"
                  : "Track your progress:"}
              </p>
            </div>
          </div>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            aria-label="Reset checkpoint"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-600 dark:text-neutral-400">
              Progress
            </span>
            <span className="font-mono text-neutral-500">
              {checkedCount}/{totalCount}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isComplete ? "bg-swiss-red" : "bg-neutral-400 dark:bg-neutral-500"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-1 p-4">
          {checklistItems.map((item) => (
            <label
              key={item.id}
              className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all",
                  item.checked
                    ? "border-swiss-red bg-swiss-red"
                    : "border-neutral-300 bg-white group-hover:border-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-neutral-500"
                )}
              >
                {item.checked && <Check className="h-3 w-3 text-white" />}
              </div>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  "text-sm leading-relaxed transition-colors",
                  item.checked
                    ? "text-neutral-400 line-through dark:text-neutral-500"
                    : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

