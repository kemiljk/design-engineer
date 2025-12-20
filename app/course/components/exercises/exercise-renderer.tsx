"use client";

import { MultipleChoice } from "./multiple-choice";
import { SpotTheIssue } from "./spot-the-issue";
import { FixTheCode } from "./fix-the-code";
import { SelfAssessment } from "./self-assessment";
import { parseExerciseData, type Exercise } from "@/lib/exercise-types";

interface ExerciseRendererProps {
  type: string;
  data: string;
}

export function ExerciseRenderer({ type, data }: ExerciseRendererProps) {
  let exercise: Exercise;
  
  try {
    exercise = parseExerciseData(data);
  } catch (error) {
    return (
      <div className="my-8 border-2 border-dashed border-red-400 bg-red-50 p-4 text-center dark:bg-red-900/20">
        <p className="text-sm text-red-700 dark:text-red-400">
          Failed to parse exercise data
        </p>
      </div>
    );
  }

  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoice exercise={exercise} />;
    case 'spot-the-issue':
      return <SpotTheIssue exercise={exercise} />;
    case 'fix-the-code':
      return <FixTheCode exercise={exercise} />;
    case 'self-assessment':
      return <SelfAssessment exercise={exercise} />;
    default:
      return (
        <div className="my-8 border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Unknown exercise type: {type}
          </p>
        </div>
      );
  }
}
