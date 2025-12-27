"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: {
    lessons: number;
    freeLessons: number;
    duration: string;
    level: string;
  };
  accessLevel: string | null;
}

// Map track IDs to access levels that grant access
const TRACK_ACCESS_MAP: Record<string, string[]> = {
  "design-track": ["design_web", "design_ios", "design_android", "full"],
  "engineering-track": ["engineering_web", "engineering_ios", "engineering_android", "full"],
  "convergence": ["full"],
};

// Map recommendation to track IDs
const RECOMMENDATION_TO_TRACK: Record<string, string> = {
  design: "design-track",
  engineering: "engineering-track",
  convergence: "convergence",
};

export function TrackCard({
  id,
  title,
  description,
  icon,
  color,
  stats,
  accessLevel,
}: TrackCardProps) {
  const [recommendedTrack, setRecommendedTrack] = useState<string | null>(null);

  useEffect(() => {
    // Read recommendation from localStorage
    const saved = localStorage.getItem("course-recommendation");
    if (saved) {
      try {
        const { track, timestamp } = JSON.parse(saved);
        // Only use recommendation if it's less than 30 days old
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < thirtyDays) {
          const trackId = RECOMMENDATION_TO_TRACK[track];
          if (trackId) {
            setRecommendedTrack(trackId);
          }
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Check if user has paid access to this track
  const hasPaidAccess = accessLevel
    ? TRACK_ACCESS_MAP[id]?.includes(accessLevel)
    : false;

  // Show free badge only if there are free lessons AND user hasn't paid for this track
  const showFreeBadge = stats.freeLessons > 0 && !hasPaidAccess;

  // Check if this track is recommended
  const isRecommended = recommendedTrack === id;

  return (
    <Link
      href={`/course/${id}`}
      className="group relative flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition-colors hover:border-swiss-red dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-swiss-red"
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded bg-swiss-red px-2 py-1 text-xs font-medium text-white shadow-sm">
          <Sparkles className="h-3 w-3" />
          Recommended
        </div>
      )}

      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 transition-all group-hover:h-2",
          color
        )}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-50 dark:bg-neutral-800">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-bold md:text-xl">
          {title}
        </h3>
        <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>

        <div className="mt-auto space-y-3 border-t border-neutral-100 pt-4 text-sm text-neutral-500 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{stats.lessons} lessons</span>
            {showFreeBadge && (
              <span className="ml-auto rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {stats.freeLessons} free
              </span>
            )}
            {hasPaidAccess && (
              <span className="ml-auto rounded bg-swiss-red/10 px-1.5 py-0.5 text-xs font-medium text-swiss-red">
                Enrolled
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{stats.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{stats.level}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
