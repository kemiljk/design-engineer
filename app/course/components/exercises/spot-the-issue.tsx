"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fireSuccessConfetti } from "@/lib/confetti";
import { ExerciseWrapper } from "./exercise-wrapper";
import type {
  SpotTheIssueExercise,
  SpotTheIssueElement,
} from "@/lib/exercise-types";

interface SpotTheIssueProps {
  exercise: SpotTheIssueExercise;
  onComplete?: (isCorrect: boolean) => void;
}

function MockElement({
  element,
  isSelected,
  showResult,
  onClick,
}: {
  element: SpotTheIssueElement;
  isSelected: boolean;
  showResult: boolean;
  onClick: () => void;
}) {
  const baseStyles: Record<string, string> = {
    heading: "text-2xl font-bold",
    subheading: "text-lg font-semibold",
    text: "text-base",
    button:
      "bg-neutral-900 text-white px-4 py-2 inline-block dark:bg-neutral-100 dark:text-neutral-900",
    label: "text-xs uppercase tracking-wide text-neutral-500",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: showResult ? 1 : 1.02 }}
      whileTap={{ scale: showResult ? 1 : 0.98 }}
      className={cn(
        "cursor-pointer rounded-none border-2 p-2 transition-all",
        !showResult &&
          !isSelected &&
          "border-transparent hover:border-neutral-400",
        !showResult &&
          isSelected &&
          "border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800",
        showResult &&
          element.isIssue &&
          isSelected &&
          "border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800",
        showResult &&
          element.isIssue &&
          !isSelected &&
          "border-swiss-red bg-red-50 dark:bg-red-950/30",
        showResult &&
          !element.isIssue &&
          isSelected &&
          "border-swiss-red bg-red-50 dark:bg-red-950/30",
        showResult &&
          !element.isIssue &&
          !isSelected &&
          "border-transparent opacity-50",
      )}
      style={element.styles}
    >
      <span className={baseStyles[element.type]}>{element.content}</span>

      {showResult && element.isIssue && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 text-xs text-neutral-700 dark:text-neutral-300"
        >
          ⚠️ {element.issueExplanation}
        </motion.p>
      )}
    </motion.div>
  );
}

export function SpotTheIssue({ exercise, onComplete }: SpotTheIssueProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const toggleSelection = (id: string) => {
    if (isComplete) return;

    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const handleSubmit = () => {
    const issueIds = new Set(
      exercise.layout.elements.filter((e) => e.isIssue).map((e) => e.id),
    );

    const correctlySelected = [...selectedIds].filter((id) =>
      issueIds.has(id),
    ).length;
    const wronglySelected = [...selectedIds].filter(
      (id) => !issueIds.has(id),
    ).length;

    const correct =
      correctlySelected === issueIds.size && wronglySelected === 0;

    setIsCorrect(correct);
    setIsComplete(true);

    if (correct) {
      fireSuccessConfetti();
    }

    onComplete?.(correct);
  };

  const handleReset = () => {
    setSelectedIds(new Set());
    setIsComplete(false);
    setIsCorrect(null);
  };

  const issueCount = exercise.layout.elements.filter((e) => e.isIssue).length;
  const foundCount = [...selectedIds].filter(
    (id) => exercise.layout.elements.find((e) => e.id === id)?.isIssue,
  ).length;

  return (
    <ExerciseWrapper
      title={exercise.title}
      description={`${exercise.description} (Find ${exercise.issueCount} issue${exercise.issueCount > 1 ? "s" : ""})`}
      difficulty={exercise.difficulty}
      isComplete={isComplete}
      isCorrect={isCorrect}
      canSubmit={selectedIds.size > 0}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="space-y-4">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span>Selected: {selectedIds.size}</span>
          {!isComplete && (
            <span>| Looking for {exercise.issueCount} issues</span>
          )}
          {isComplete && (
            <span>
              | Found {foundCount}/{issueCount} issues
            </span>
          )}
        </div>

        {/* Mock Layout */}
        <div className="rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="space-y-3">
            {exercise.layout.elements.map((element) => (
              <MockElement
                key={element.id}
                element={element}
                isSelected={selectedIds.has(element.id)}
                showResult={isComplete}
                onClick={() => toggleSelection(element.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </ExerciseWrapper>
  );
}
