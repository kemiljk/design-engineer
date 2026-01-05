"use client";

import { motion, AnimatePresence } from "motion/react";
import { CheckCircle as CheckCircle2, XmarkCircle as XCircle, Undo as RotateCcw, Compass as Target } from "iconoir-react";
import { cn } from "@/lib/utils";
import type { ExerciseDifficulty } from "@/lib/exercise-types";

interface ExerciseWrapperProps {
  title: string;
  description?: string;
  difficulty: ExerciseDifficulty;
  isComplete: boolean;
  isCorrect: boolean | null;
  canSubmit: boolean;
  onSubmit: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

const difficultyColors = {
  easy: "bg-neutral-400 dark:bg-neutral-600",
  medium: "bg-neutral-600 dark:bg-neutral-500",
  hard: "bg-swiss-red",
};

export function ExerciseWrapper({
  title,
  description,
  difficulty,
  isComplete,
  isCorrect,
  canSubmit,
  onSubmit,
  onReset,
  children,
}: ExerciseWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 overflow-hidden border-2 border-neutral-900 bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-900 bg-neutral-900 px-4 py-3 dark:border-neutral-100 dark:bg-neutral-100">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-white dark:text-neutral-900" />
          <span className="font-semibold text-white dark:text-neutral-900">{title}</span>
        </div>
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium text-white",
          difficultyColors[difficulty]
        )}>
          {difficulty}
        </span>
      </div>

      {/* Description */}
      {description && (
        <div className="border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        </div>
      )}

      {/* Content */}
      <div className="p-6">{children}</div>

      {/* Feedback */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "border-t-2 px-4 py-4",
              isCorrect
                ? "border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800"
                : "border-swiss-red bg-red-50 dark:bg-red-950/30"
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    Correct! Great job!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-swiss-red" />
                  <span className="font-medium text-swiss-red">
                    Not quite right. Try again!
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || (isComplete && isCorrect === true)}
          className={cn(
            "rounded-none px-4 py-2 text-sm font-medium transition-colors",
            canSubmit && !(isComplete && isCorrect)
              ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
              : "cursor-not-allowed bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500"
          )}
        >
          Check Answer
        </button>
      </div>
    </motion.div>
  );
}
