"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LightBulb as Lightbulb,
  Eye,
  EyeClosed as EyeOff,
} from "iconoir-react";
import { cn } from "@/lib/utils";
import { fireSuccessConfetti } from "@/lib/confetti";
import { ExerciseWrapper } from "./exercise-wrapper";
import type { FixTheCodeExercise } from "@/lib/exercise-types";

interface FixTheCodeProps {
  exercise: FixTheCodeExercise;
  onComplete?: (isCorrect: boolean) => void;
}

export function FixTheCode({ exercise, onComplete }: FixTheCodeProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);

  const normalizeCode = (c: string) => c.trim().replace(/\s+/g, " ");

  const handleSubmit = () => {
    const userNormalized = normalizeCode(code);
    const solutionNormalized = normalizeCode(exercise.solution);

    const correct = userNormalized === solutionNormalized;

    setIsCorrect(correct);
    setIsComplete(true);

    if (correct) {
      fireSuccessConfetti();
    }

    onComplete?.(correct);
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setIsComplete(false);
    setIsCorrect(null);
    setHintIndex(-1);
    setShowSolution(false);
  };

  const showNextHint = () => {
    if (hintIndex < exercise.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  return (
    <ExerciseWrapper
      title={exercise.title}
      description={exercise.description}
      difficulty={exercise.difficulty}
      isComplete={isComplete}
      isCorrect={isCorrect}
      canSubmit={code !== exercise.starterCode}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="space-y-4">
        {/* Code Editor */}
        <div className="overflow-hidden rounded-none border border-neutral-300 dark:border-neutral-700">
          <div className="flex items-center justify-between bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
            <span className="text-xs font-medium text-neutral-500 uppercase">
              {exercise.language}
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isComplete && isCorrect === true}
            className={cn(
              "w-full bg-neutral-100 p-4 font-mono text-sm text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
              "min-h-[200px] resize-y focus:ring-2 focus:ring-neutral-500 focus:outline-none",
              isComplete && isCorrect && "opacity-75",
            )}
            spellCheck={false}
          />
        </div>

        {/* Hints */}
        <div className="flex items-center gap-2">
          <button
            onClick={showNextHint}
            disabled={hintIndex >= exercise.hints.length - 1}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 disabled:opacity-50 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <Lightbulb className="h-4 w-4" />
            {hintIndex === -1
              ? "Show Hint"
              : `Hint ${hintIndex + 1}/${exercise.hints.length}`}
          </button>

          {isComplete && !isCorrect && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {showSolution ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showSolution ? "Hide Solution" : "Show Solution"}
            </button>
          )}
        </div>

        {/* Hints Display */}
        <AnimatePresence>
          {hintIndex >= 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {exercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-none border border-neutral-300 bg-neutral-100 p-3 text-sm dark:border-neutral-600 dark:bg-neutral-800"
                >
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {hint}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution Display */}
        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-none border border-neutral-300 dark:border-neutral-600"
            >
              <div className="bg-neutral-200 px-3 py-2 dark:bg-neutral-700">
                <span className="text-xs font-medium text-neutral-700 uppercase dark:text-neutral-300">
                  Solution
                </span>
              </div>
              <pre className="bg-neutral-100 p-4 font-mono text-sm text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
                {exercise.solution}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ExerciseWrapper>
  );
}
