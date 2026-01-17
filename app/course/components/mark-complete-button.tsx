"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Check, CheckCircle as CheckCircle2, WarningCircle as AlertCircle } from "iconoir-react";

interface MarkCompleteButtonProps {
  lessonPath: string;
  initialCompleted?: boolean;
  onComplete?: () => void;
}

const MIN_TIME_FOR_AUTO_COMPLETE = 30;

export function MarkCompleteButton({
  lessonPath,
  initialCompleted = false,
  onComplete,
}: MarkCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const startTime = useRef(Date.now());
  const isCompletedRef = useRef(isCompleted);

  // Keep ref in sync with state
  useEffect(() => {
    isCompletedRef.current = isCompleted;
  }, [isCompleted]);

  const markComplete = useCallback(async (isAuto = false) => {
    if (isCompletedRef.current) return;

    if (!isAuto) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await fetch("/api/course/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonPath,
          status: "completed",
          timeSpent: Math.floor((Date.now() - startTime.current) / 1000),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save progress");
      }

      setIsCompleted(true);
      onComplete?.();
    } catch (err) {
      console.error("Error marking lesson complete:", err);
      if (!isAuto) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    } finally {
      setIsLoading(false);
    }
  }, [lessonPath, onComplete]);

  const handleClick = () => markComplete(false);

  // Timer to track time and auto-complete
  useEffect(() => {
    if (isCompletedRef.current) return;

    startTime.current = Date.now();
    setSecondsElapsed(0);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      setSecondsElapsed(elapsed);

      // Auto-complete after threshold
      if (elapsed >= MIN_TIME_FOR_AUTO_COMPLETE && !isCompletedRef.current) {
        markComplete(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lessonPath, initialCompleted, markComplete]);

  if (error) {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full md:w-auto items-center justify-center gap-2 rounded-none bg-red-100 px-6 py-3 font-medium text-red-700 transition-all hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
      >
        <AlertCircle className="h-5 w-5" />
        Retry
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading || isCompleted}
      whileHover={{ scale: isCompleted ? 1 : 1.02 }}
      whileTap={{ scale: isCompleted ? 1 : 0.98 }}
      className={`flex w-full md:w-auto items-center justify-center gap-2 rounded-none px-6 py-3 font-medium transition-all ${
        isCompleted
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-swiss-red text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
      }`}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin border-2 border-white border-t-transparent" />
      ) : isCompleted ? (
        <>
          <CheckCircle2 className="h-5 w-5" />
          Completed
        </>
      ) : (
        <>
          <Check className="h-5 w-5" />
          Mark as Complete
        </>
      )}
    </motion.button>
  );
}
