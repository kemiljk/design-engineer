"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { COURSE_STRUCTURE, getEstimatedDuration } from "@/lib/course-shared";
import { cn } from "@/lib/utils";

type TrackKey = keyof typeof COURSE_STRUCTURE;
// Exclude 'introduction' as it doesn't have platforms in the same way
type PlatformTrackKey = Exclude<TrackKey, "introduction">;

interface TrackPlatformSelectorProps {
  trackSlug: string;
}

interface PlatformProgress {
  completed: number;
  total: number;
}

const START_LINKS: Record<PlatformTrackKey, Record<string, string>> = {
  design: {
    web: "/course/design-track/web/01-foundations/01-what-is-visual-design",
    ios: "/course/design-track/ios/01-hig-fundamentals/01-ios-design-philosophy",
    android: "/course/design-track/android/01-material-design/01-material-design-philosophy",
  },
  engineering: {
    web: "/course/engineering-track/web/00-environment-setup/01-your-new-best-friend-the-terminal",
    ios: "/course/engineering-track/ios/00-environment-setup/01-getting-started-with-xcode",
    android: "/course/engineering-track/android/00-environment-setup/01-getting-started-with-android-studio",
  },
  convergence: {
    web: "/course/convergence/web/01-motion-and-interaction/01-why-motion-matters",
    ios: "/course/convergence/ios/01-ios-motion-and-animation/01-swiftui-animation",
    android: "/course/convergence/android/01-android-motion-and-animation/01-compose-animation",
  },
};

const PLATFORM_ICONS = {
  web: Monitor,
  ios: Smartphone,
  android: Smartphone,
};

export function TrackPlatformSelector({ trackSlug }: TrackPlatformSelectorProps) {
  const [progress, setProgress] = useState<Record<string, PlatformProgress>>({});
  const [hasMounted, setHasMounted] = useState(false);
  
  // Map slug to structure key
  const trackKey = trackSlug.replace("-track", "") as PlatformTrackKey;
  
  useEffect(() => {
    setHasMounted(true);
    
    async function fetchProgress() {
      try {
        const response = await fetch("/api/course/progress");
        if (!response.ok) return;
        
        const data = await response.json();
        const lessons = data.progress?.metadata?.lessons || {};
        
        // Calculate progress for each platform
        const platformProgress: Record<string, PlatformProgress> = {};
        const platforms = ["web", "ios", "android"];
        
        for (const platform of platforms) {
          const trackPrefix = `${trackSlug}/${platform}`;
          const platformLessons = Object.entries(lessons).filter(
            ([path]) => path.startsWith(trackPrefix)
          );
          const completedCount = platformLessons.filter(
            ([, lessonData]: [string, any]) => lessonData.status === "completed"
          ).length;
          
          // Get total from course structure
          const structureKey = trackSlug.replace("-track", "") as PlatformTrackKey;
          // @ts-ignore
          const totalLessons = COURSE_STRUCTURE[structureKey]?.[platform]?.lessons || 0;
          
          platformProgress[platform] = {
            completed: completedCount,
            total: totalLessons,
          };
        }
        
        setProgress(platformProgress);
      } catch {
        // User not logged in or error - just show cards without progress
      }
    }
    
    fetchProgress();
  }, [trackSlug]);
  
  if (!COURSE_STRUCTURE[trackKey]) return null;

  const trackData = COURSE_STRUCTURE[trackKey];
  // We know these tracks have web/ios/android structure
  const platforms = ["web", "ios", "android"] as const;

  return (
    <div className="not-prose my-12 flex flex-col gap-4">
      {platforms.map((platform) => {
        // @ts-ignore - we know the structure matches
        const platformData = trackData[platform];
        const startLink = START_LINKS[trackKey][platform];
        const Icon = PLATFORM_ICONS[platform];
        
        // Only use progress data after client mount to avoid hydration mismatch
        const platformProgress = hasMounted ? progress[platform] : undefined;
        const isCompleted = platformProgress && platformProgress.completed === platformProgress.total && platformProgress.total > 0;
        const hasStarted = platformProgress && platformProgress.completed > 0;

        return (
          <Link
            key={platform}
            href={startLink}
            className={cn(
              "group relative flex items-center gap-4 overflow-hidden border bg-white p-4 no-underline transition-colors sm:gap-6 sm:p-5 dark:bg-neutral-900",
              isCompleted
                ? "border-swiss-red/30 hover:border-swiss-red"
                : "border-neutral-200 hover:border-swiss-red dark:border-neutral-800 dark:hover:border-swiss-red"
            )}
          >
            {/* Left accent border on hover - Swiss Red */}
            <div
              className={cn(
                "absolute inset-y-0 left-0 w-1 bg-swiss-red transition-opacity",
                isCompleted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            />
            
            <div className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center",
              isCompleted
                ? "bg-swiss-red/10 dark:bg-swiss-red/20"
                : "bg-neutral-50 dark:bg-neutral-800"
            )}>
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-swiss-red" />
              ) : (
                <Icon className="h-6 w-6 text-neutral-900 dark:text-white" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{platformData.title}</h3>
                {isCompleted && (
                  <span className="text-xs font-medium text-swiss-red">Completed</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  {platformData.lessons} lessons
                </span>
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {getEstimatedDuration(platformData.lessons)}
                </span>
                {hasMounted && hasStarted && !isCompleted && platformProgress && (
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-swiss-red">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {platformProgress.completed}/{platformProgress.total} done
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 font-medium text-swiss-red transition-colors group-hover:text-neutral-900 dark:group-hover:text-white">
              <span className="hidden sm:inline">{isCompleted ? "Review" : hasStarted ? "Continue" : "Start"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
