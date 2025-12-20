"use client";

import { useState, useCallback, useRef } from "react";
import CourseMarkdown from "../components/course-markdown";
import { SideNav } from "../components/lesson-layout";

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const hasInitialized = useRef(false);

  const handleSectionsDetected = useCallback(
    (detected: { id: string; label: string }[]) => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        setSections(detected);
      }
    },
    []
  );

  return (
    <>
      <SideNav sections={sections} />
      <CourseMarkdown content={content} onSectionsDetected={handleSectionsDetected} />
    </>
  );
}
