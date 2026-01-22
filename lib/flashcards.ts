import "server-only";

import fs from "fs/promises";
import path from "path";
import { getUserProgress } from "@/lib/course";
import { Exercise, parseExerciseData } from "@/lib/exercise-types";

// Regex to extract exercise blocks from markdown
const EXERCISE_REGEX = /<!--\s*exercise:\s*([a-z-]+)\n([\s\S]*?)-->/g;

export type FlashcardExercise = {
  exercise: Exercise;
  lessonPath: string;
  lessonTitle: string; // We might want to show which lesson this is from
};

/**
 * Get all available exercises from lessons the user has completed.
 * Exercises are returned in a random order.
 */
export async function getFlashcardsForUser(
  userId: string,
): Promise<FlashcardExercise[]> {
  try {
    // 1. Get user progress
    const progress = await getUserProgress(userId);

    if (!progress || !progress.metadata.lessons) {
      return [];
    }

    // 2. Identify completed lessons
    const completedLessonPaths = Object.entries(progress.metadata.lessons)
      .filter(([_, data]) => data.status === "completed")
      .map(([path]) => path);

    if (completedLessonPaths.length === 0) {
      return [];
    }

    // 3. Extract exercises from each completed lesson
    const exercises: FlashcardExercise[] = [];

    // Process lessons in parallel
    await Promise.all(
      completedLessonPaths.map(async (lessonPath) => {
        try {
          const fullPath = path.join(
            process.cwd(),
            "content/course",
            `${lessonPath}.md`,
          );

          // Check if file exists
          try {
            await fs.access(fullPath);
          } catch {
            return; // File doesn't exist (might be a renamed lesson or old progress data)
          }

          const content = await fs.readFile(fullPath, "utf-8");

          // Reset regex state
          EXERCISE_REGEX.lastIndex = 0;

          let match;
          while ((match = EXERCISE_REGEX.exec(content)) !== null) {
            try {
              const jsonString = match[2].trim();
              const exercise = parseExerciseData(jsonString);

              // Only include exercises that make sense as flashcards/quizzes
              // Currently all types (multiple-choice, spot-the-issue, fix-the-code) work
              // but self-assessment might not be ideal for a quick flashcard flow.
              // For now, we'll exclude self-assessment.
              if (exercise.type !== "self-assessment") {
                exercises.push({
                  exercise,
                  lessonPath,
                  lessonTitle:
                    extractTitleRaw(content) || formatTitleFromPath(lessonPath),
                });
              }
            } catch (e) {
              console.error(`Failed to parse exercise in ${lessonPath}:`, e);
            }
          }
        } catch (e) {
          console.error(`Error processing lesson ${lessonPath}:`, e);
        }
      }),
    );

    // 4. Shuffle the exercises (Fisher-Yates shuffle)
    return shuffleArray(exercises);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper to get title from markdown content (first h1)
function extractTitleRaw(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function formatTitleFromPath(lessonPath: string): string {
  const parts = lessonPath.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart
    .replace(/^\d+-/, "") // Remove leading numbers
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words
}
