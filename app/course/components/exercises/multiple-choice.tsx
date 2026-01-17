"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle as CheckCircle2, XmarkCircle as XCircle } from "iconoir-react";
import { cn } from "@/lib/utils";
import { fireSuccessConfetti } from "@/lib/confetti";
import { ExerciseWrapper } from "./exercise-wrapper";
import type { MultipleChoiceExercise } from "@/lib/exercise-types";

// Seeded random number generator for deterministic shuffling
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return (hash >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle with seeded random
function shuffleArray<T>(array: T[], seed: string): T[] {
  const shuffled = [...array];
  const random = seededRandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
}

export function MultipleChoice({ exercise }: MultipleChoiceProps) {
  // Shuffle options deterministically using exercise ID as seed
  // This ensures same order on server and client
  const shuffledOptions = useMemo(
    () => shuffleArray(exercise.options, exercise.id),
    [exercise.id, exercise.options]
  );
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSubmit = () => {
    if (!selectedId) return;
    
    const selected = shuffledOptions.find(o => o.id === selectedId);
    const correct = selected?.isCorrect ?? false;
    
    setIsCorrect(correct);
    setIsComplete(true);
    
    if (correct) {
      fireSuccessConfetti();
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsComplete(false);
    setIsCorrect(null);
  };

  return (
    <ExerciseWrapper
      title={exercise.title}
      description={exercise.description}
      difficulty={exercise.difficulty}
      isComplete={isComplete}
      isCorrect={isCorrect}
      canSubmit={selectedId !== null}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="space-y-2">
        <p className="mb-4 font-medium">{exercise.question}</p>
        
        {shuffledOptions.map((option, index) => {
          const isSelected = selectedId === option.id;
          const showResult = isComplete;
          
          return (
            <motion.button
              key={option.id}
              onClick={() => !isComplete && setSelectedId(option.id)}
              disabled={isComplete}
              whileHover={!isComplete && !prefersReducedMotion ? { scale: 1.01 } : {}}
              whileTap={!isComplete && !prefersReducedMotion ? { scale: 0.99 } : {}}
              className={cn(
                "flex w-full items-center gap-3 rounded-none border-2 p-4 text-left transition-colors",
                !isComplete && isSelected && "border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800",
                !isComplete && !isSelected && "border-neutral-200 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500",
                showResult && option.isCorrect && "border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800",
                showResult && !option.isCorrect && isSelected && "border-swiss-red bg-red-50 dark:bg-red-950/30",
                showResult && !option.isCorrect && !isSelected && "border-neutral-200 opacity-50 dark:border-neutral-700"
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 border-current text-xs font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option.text}</span>
              {showResult && option.isCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-neutral-900 dark:text-neutral-100" />
              )}
              {showResult && !option.isCorrect && isSelected && (
                <XCircle className="h-5 w-5 shrink-0 text-swiss-red" />
              )}
            </motion.button>
          );
        })}

        {/* Show explanation after completion */}
        {isComplete && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="mt-4 rounded-none border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            {shuffledOptions
              .filter(o => o.isCorrect || o.id === selectedId)
              .map(o => o.explanation && (
                <p key={o.id} className="text-sm text-neutral-600 dark:text-neutral-400">
                  <strong>{o.isCorrect ? "✓" : "✗"} {o.text}:</strong> {o.explanation}
                </p>
              ))}
          </motion.div>
        )}
      </div>
    </ExerciseWrapper>
  );
}
