import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getUserEnrollment,
  normalizeAccessLevel,
  canAccessLesson,
  isFreeTierLesson,
} from "@/lib/course";
import { getUserProgress } from "@/lib/course";
import { formatTitle } from "@/lib/format";
import path from "path";
import fs from "fs/promises";

export interface SearchableLesson {
  path: string;
  title: string;
  track: "introduction" | "design" | "engineering" | "convergence";
  platform: "all" | "web" | "ios" | "android";
  module: string;
  moduleTitle: string;
  isFree: boolean;
}

type AccessLevel = string | null;

// Cache lesson data in memory (rebuilds on server restart)
let cachedLessons: Omit<SearchableLesson, "isCompleted" | "hasAccess">[] | null = null;

async function getAllLessons(): Promise<
  Omit<SearchableLesson, "isCompleted" | "hasAccess">[]
> {
  // Return cached data if available
  if (cachedLessons) {
    return cachedLessons;
  }

  const contentPath = path.join(process.cwd(), "content/course");
  const lessons: Omit<SearchableLesson, "isCompleted" | "hasAccess">[] = [];

  // Introduction lessons (no platform)
  const introPath = path.join(contentPath, "00-introduction");
  try {
    const introFiles = await fs.readdir(introPath);
    for (const file of introFiles.filter(
      (f) => f.endsWith(".md") && f !== "index.md"
    )) {
      const lessonSlug = file.replace(".md", "");
      lessons.push({
        path: `00-introduction/${lessonSlug}`,
        title: formatTitle(lessonSlug.replace(/^\d+-/, "")),
        track: "introduction",
        platform: "all",
        module: "00-introduction",
        moduleTitle: "Introduction",
        isFree: true,
      });
    }
  } catch {
    // Introduction folder may not exist
  }

  // Track-based lessons
  const tracks = [
    { dir: "design-track", track: "design" as const },
    { dir: "engineering-track", track: "engineering" as const },
    { dir: "convergence", track: "convergence" as const },
  ];

  const platforms = ["web", "ios", "android"] as const;

  for (const { dir, track } of tracks) {
    for (const platform of platforms) {
      const platformPath = path.join(contentPath, dir, platform);
      try {
        const modules = await fs.readdir(platformPath, { withFileTypes: true });
        for (const moduleEntry of modules.filter((e) => e.isDirectory())) {
          const modulePath = path.join(platformPath, moduleEntry.name);
          const moduleTitle = formatTitle(
            moduleEntry.name.replace(/^\d+-/, "")
          );

          try {
            const files = await fs.readdir(modulePath);
            for (const file of files.filter(
              (f) => f.endsWith(".md") && f !== "index.md"
            )) {
              const lessonSlug = file.replace(".md", "");
              const lessonPath = `${dir}/${platform}/${moduleEntry.name}/${lessonSlug}`;

              lessons.push({
                path: lessonPath,
                title: formatTitle(lessonSlug.replace(/^\d+-/, "")),
                track,
                platform,
                module: moduleEntry.name,
                moduleTitle,
                isFree: isFreeTierLesson(lessonPath),
              });
            }
          } catch {
            // Module folder may be empty
          }
        }
      } catch {
        // Platform folder may not exist
      }
    }
  }

  // Cache the results
  cachedLessons = lessons;
  return lessons;
}

export async function GET() {
  const { userId } = await auth();

  // Require authentication
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all lessons (cached)
  const allLessons = await getAllLessons();

  // Get user's access level and progress
  const [enrollment, progress] = await Promise.all([
    getUserEnrollment(userId),
    getUserProgress(userId),
  ]);

  const accessLevel: AccessLevel = normalizeAccessLevel(
    enrollment?.metadata.access_level
  );

  const completedLessons = new Set<string>();
  if (progress?.metadata.lessons) {
    for (const [lessonPath, data] of Object.entries(progress.metadata.lessons)) {
      if (data.status === "completed") {
        completedLessons.add(lessonPath);
      }
    }
  }

  // Enrich and filter lessons
  const accessibleLessons = allLessons
    .filter(
      (lesson) =>
        lesson.isFree || canAccessLesson(accessLevel as never, lesson.path)
    )
    .map((lesson) => ({
      ...lesson,
      hasAccess: true,
      isCompleted: completedLessons.has(lesson.path),
    }));

  return NextResponse.json({
    lessons: accessibleLessons,
    totalAccessible: accessibleLessons.length,
    totalCompleted: accessibleLessons.filter((l) => l.isCompleted).length,
    hasFullAccess: accessLevel === "full",
  });
}
