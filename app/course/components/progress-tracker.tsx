"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Circle, Clock, Trophy } from "iconoir-react";

interface ProgressStats {
  totalLessons: number;
  completedCount: number;
  inProgressCount: number;
  completionPercentage: number;
  totalTimeSpent: number;
  totalTimeFormatted: string;
}

export function ProgressTracker() {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      const response = await fetch("/api/course/progress");
      const data = await response.json();
      setStats(data.stats);
      setIsLoading(false);
    }
    fetchProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-swiss-red border-t-transparent" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Your Progress</h3>
        {stats.completionPercentage === 100 && (
          <Trophy className="h-5 w-5 text-swiss-red" />
        )}
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            {stats.completedCount} of {stats.totalLessons} lessons
          </span>
          <span className="font-medium">{stats.completionPercentage}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-none bg-neutral-200 dark:bg-neutral-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-swiss-red"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-1 text-swiss-red">
            <CheckCircle className="h-4 w-4" />
            <span className="text-lg font-bold">{stats.completedCount}</span>
          </div>
          <p className="text-xs text-neutral-500">Completed</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-neutral-900 dark:text-neutral-100">
            <Circle className="h-4 w-4" />
            <span className="text-lg font-bold">{stats.inProgressCount}</span>
          </div>
          <p className="text-xs text-neutral-500">In Progress</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-neutral-500">
            <Clock className="h-4 w-4" />
            <span className="text-lg font-bold">
              {stats.totalTimeFormatted}
            </span>
          </div>
          <p className="text-xs text-neutral-500">Time Spent</p>
        </div>
      </div>
    </div>
  );
}
