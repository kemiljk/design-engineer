"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface LessonKeyboardNavProps {
  prevPath: string | null;
  nextPath: string | null;
}

export function LessonKeyboardNav({ prevPath, nextPath }: LessonKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement) {
        const isInputFocused =
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable;
        
        if (isInputFocused) {
          return;
        }
      }

      if (event.key === "ArrowLeft" && prevPath) {
        event.preventDefault();
        router.push(`/course/${prevPath}`);
      } else if (event.key === "ArrowRight" && nextPath) {
        event.preventDefault();
        router.push(`/course/${nextPath}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevPath, nextPath, router]);

  return null;
}
