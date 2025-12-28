"use client";

import { useState, useCallback, useRef } from "react";
import CourseMarkdown from "../components/course-markdown";
import { SideNav, MobileSectionNav } from "../components/lesson-layout";

interface LessonContentProps {
  content: string;
  lessonPath?: string;
}

export function LessonContent({ content, lessonPath }: LessonContentProps) {
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
      <MobileSectionNav sections={sections} />
      <CourseMarkdown
        content={content}
        lessonPath={lessonPath}
        onSectionsDetected={handleSectionsDetected}
      />
    </>
  );
}
