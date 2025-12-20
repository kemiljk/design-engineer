"use client";

import { useEffect, useRef } from "react";

interface LessonTrackerProps {
  lessonPath: string;
  initialCompleted?: boolean;
}

export function LessonTracker({ lessonPath, initialCompleted = false }: LessonTrackerProps) {
  const startTime = useRef(Date.now());
  const isAlreadyCompleted = useRef(initialCompleted);

  useEffect(() => {
    startTime.current = Date.now();
    isAlreadyCompleted.current = initialCompleted;

    // Mark as in_progress on mount (only if not already completed)
    if (!initialCompleted) {
      fetch("/api/course/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonPath,
          status: "in_progress",
          timeSpent: 0,
        }),
      });
    }

    // Handle tab close - save time spent (completion handled by MarkCompleteButton)
    const handleUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      navigator.sendBeacon(
        "/api/course/progress",
        JSON.stringify({
          lessonPath,
          status: isAlreadyCompleted.current ? "completed" : "in_progress",
          timeSpent,
        })
      );
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [lessonPath, initialCompleted]);

  return null;
}
