import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { ArrowLeft, ArrowRight, Lock, BookOpen } from "lucide-react";
import { 
  getUserEnrollment, 
  canAccessLesson, 
  isFreeTierLesson,
  getAdjacentLessonsAcrossModules,
  formatModuleName,
  isLessonCompleted,
  getEffectiveTestAccessLevel,
} from "@/lib/course";
import { hasPreviewAccess } from "@/lib/preview-access";
import { formatTitle } from "@/lib/format";
import { UpgradePrompt } from "../components/upgrade-prompt";
import { FloatingNotesPanel } from "../components/floating-notes-panel";
import { LessonTracker } from "../components/lesson-tracker";
import { MarkCompleteButton } from "../components/mark-complete-button";
import { getProductWithPrice } from "@/lib/lemonsqueezy";
import type { ProductKey } from "@/lib/types";
import { TrackPlatformSelector } from "../components/track-platform-selector";
import { LessonContent } from "./lesson-content";

function getRequiredAccess(lessonPath: string): ProductKey {
  if (lessonPath.startsWith("design-track/web")) return "design_web";
  if (lessonPath.startsWith("design-track/ios")) return "design_ios";
  if (lessonPath.startsWith("design-track/android")) return "design_android";
  if (lessonPath.startsWith("engineering-track/web")) return "engineering_web";
  if (lessonPath.startsWith("engineering-track/ios")) return "engineering_ios";
  if (lessonPath.startsWith("engineering-track/android")) return "engineering_android";
  return "full";
}

function getBackLink(lessonPath: string): { href: string; label: string } {
  const parts = lessonPath.split("/");
  const track = parts[0];
  
  // If we're at the track root (design-track, engineering-track, convergence), go back to the main course page
  if (parts.length === 1 && ["design-track", "engineering-track", "convergence"].includes(track)) {
    return {
      href: "/course",
      label: "Back to Courses",
    };
  }
  
  // If we're deeper in a track (design-track, engineering-track, convergence), go back to the track index
  if (["design-track", "engineering-track", "convergence"].includes(track)) {
    const trackName = track === "design-track" ? "Design Track" 
      : track === "engineering-track" ? "Engineering Track" 
      : "Convergence";
    return {
      href: `/course/${track}`,
      label: `Back to ${trackName}`,
    };
  }
  
  // Introduction or unknown - go to main course page
  return {
    href: "/course",
    label: "Back to Courses",
  };
}

interface LessonPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getLessonContent(slugPath: string[]) {
  const contentPath = path.join(process.cwd(), "content/course", ...slugPath);

  // Try with .md extension
  const mdPath = contentPath.endsWith(".md")
    ? contentPath
    : `${contentPath}.md`;

  // Check if it's a directory (index file)
  let filePath = mdPath;
  try {
    const stats = await fs.stat(contentPath);
    if (stats.isDirectory()) {
      // Look for index.md first, then first lesson
      const files = await fs.readdir(contentPath);
      const mdFiles = files.filter((f) => f.endsWith(".md")).sort();
      
      // Prioritize index.md if it exists
      if (mdFiles.includes("index.md")) {
        filePath = path.join(contentPath, "index.md");
      } else if (mdFiles.length > 0) {
        filePath = path.join(contentPath, mdFiles[0]);
      }
    }
  } catch {
    // Not a directory, use md path
  }

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content, filePath };
  } catch {
    return null;
  }
}


export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lessonPath = slug.join("/");
  const lesson = await getLessonContent(slug);

  if (!lesson) {
    notFound();
  }

  const { userId } = await auth();
  const isFree = isFreeTierLesson(lessonPath);
  const backLink = getBackLink(lessonPath);

  // Check for test mode (works even when logged out)
  const testMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";
  const testAccessLevel = testMode ? await getEffectiveTestAccessLevel() : null;

  // Check for preview access (secret token for friends/reviewers)
  const previewAccess = await hasPreviewAccess();

  let hasAccess = isFree;
  let enrollment = null;

  if (previewAccess) {
    // Preview token grants full access
    hasAccess = true;
  } else if (testMode && testAccessLevel && testAccessLevel !== "free") {
    // Test mode override - grant access based on test access level
    hasAccess = canAccessLesson(testAccessLevel as Parameters<typeof canAccessLesson>[0], lessonPath);
  } else if (userId) {
    enrollment = await getUserEnrollment(userId);
    const accessLevel = enrollment?.metadata.access_level || "free";
    hasAccess = canAccessLesson(accessLevel, lessonPath);
  }

  // If no access, show upgrade prompt
  if (!hasAccess) {
    const requiredAccess = getRequiredAccess(lessonPath);
    const [trackProduct, fullProduct] = await Promise.all([
      requiredAccess !== "full" ? getProductWithPrice(requiredAccess) : null,
      getProductWithPrice("full"),
    ]);

    return (
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Link
            href={backLink.href}
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLink.label}
          </Link>

          <div className="rounded-none border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-none bg-neutral-100 dark:bg-neutral-800">
              <Lock className="h-6 w-6 text-neutral-500" />
            </div>
              <div>
                <h1 className="text-xl font-bold">Premium Content</h1>
                <p className="text-sm text-neutral-500">
                  This lesson requires a paid subscription
                </p>
              </div>
            </div>

            <UpgradePrompt 
              currentLessonPath={lessonPath} 
              requiredAccess={requiredAccess}
              trackProduct={trackProduct}
              fullProduct={fullProduct}
            />
          </div>
        </div>
      </main>
    );
  }

  const [adjacentLessons, lessonCompleted] = await Promise.all([
    getAdjacentLessonsAcrossModules(lessonPath),
    userId ? isLessonCompleted(userId, lessonPath) : Promise.resolve(false),
  ]);
  const { prev, next, currentModule, totalInModule, currentInModule } = adjacentLessons;

  // Extract title from content (first h1) and remove it from content to avoid duplication
  const titleMatch = lesson.content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug[slug.length - 1];
  const contentWithoutTitle = lesson.content.replace(/^#\s+.+\n*/m, "");

  const isTrackIndex = slug.length === 1 && ["design-track", "engineering-track", "convergence"].includes(slug[0]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLink.label}
          </Link>

          {isFree && (
            <span className="rounded-none bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              Free Lesson
            </span>
          )}
        </div>

        <article className="rounded-none border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="border-b border-neutral-200 p-6 dark:border-neutral-800">
            <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
              <BookOpen className="h-4 w-4" />
              <span>{lessonPath.replace(/\//g, " › ")}</span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>

          <div className="p-6">
            <LessonContent content={contentWithoutTitle} />
            {isTrackIndex && <TrackPlatformSelector trackSlug={slug[0]} />}
          </div>

          <div className="border-t border-neutral-200 p-6 dark:border-neutral-800">
            {currentModule && totalInModule > 0 && (
              <div className="mb-6 text-center">
                <span className="text-sm text-neutral-500">
                  Lesson {currentInModule} of {totalInModule} in {formatModuleName(currentModule)}
                </span>
                <div className="mt-2 mx-auto h-1 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-swiss-red transition-all" 
                    style={{ width: `${(currentInModule / totalInModule) * 100}%` }} 
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link
                  href={`/course/${prev.path}`}
                  className="group flex-1 max-w-[45%] rounded-none bg-neutral-100 p-4 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                    <ArrowLeft className="h-3 w-3" />
                    <span>Previous</span>
                  </div>
                  <p className="text-sm font-medium truncate">
                    {formatTitle(prev.title)}
                  </p>
                </Link>
              ) : (
                <div className="flex-1 max-w-[45%]" />
              )}

              {userId && <MarkCompleteButton lessonPath={lessonPath} initialCompleted={lessonCompleted} />}

              {next ? (
                next.isNewModule ? (
                  <Link
                    href={`/course/${next.path}`}
                    className="group flex-1 max-w-[45%] rounded-none border-2 border-swiss-red bg-swiss-red/5 p-4 transition-all hover:bg-swiss-red hover:text-white"
                  >
                    <div className="flex items-center justify-end gap-2 text-xs text-swiss-red group-hover:text-white mb-1">
                      <span>Next Module: {formatModuleName(next.module)}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="text-sm font-medium text-right truncate">
                      {formatTitle(next.title)}
                    </p>
                  </Link>
                ) : (
                  <Link
                    href={`/course/${next.path}`}
                    className="group flex-1 max-w-[45%] rounded-none bg-swiss-red p-4 text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                  >
                    <div className="flex items-center justify-end gap-2 text-xs opacity-80 mb-1">
                      <span>Next</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <p className="text-sm font-medium text-right truncate">
                      {formatTitle(next.title)}
                    </p>
                  </Link>
                )
              ) : lessonPath.startsWith("00-introduction") ? (
                <Link
                  href="/course"
                  className="group flex-1 max-w-[45%] rounded-none bg-swiss-red p-4 text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                >
                  <div className="flex items-center justify-end gap-2 text-xs opacity-80 mb-1">
                    <span>You&apos;re ready!</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <p className="text-sm font-medium text-right">
                    Choose Your Track
                  </p>
                </Link>
              ) : (
                <div className="flex-1 max-w-[45%]" />
              )}
            </div>
          </div>
        </article>
      </div>

      {userId && (
        <>
          <FloatingNotesPanel lessonPath={lessonPath} lessonTitle={title} />
          <LessonTracker lessonPath={lessonPath} initialCompleted={lessonCompleted} />
        </>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await getLessonContent(slug);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  const titleMatch = lesson.content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug[slug.length - 1];

  return {
    title: `${title} | Design Engineer Course`,
    description: `Learn ${title} in the Design Engineer Course`,
  };
}
