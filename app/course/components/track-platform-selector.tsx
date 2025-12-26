"use client";

import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, BookOpen, Clock } from "lucide-react";
import { COURSE_STRUCTURE, getEstimatedDuration } from "@/lib/course-shared";
import { cn } from "@/lib/utils";

type TrackKey = keyof typeof COURSE_STRUCTURE;
// Exclude 'introduction' as it doesn't have platforms in the same way
type PlatformTrackKey = Exclude<TrackKey, "introduction">;

interface TrackPlatformSelectorProps {
  trackSlug: string;
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
  // Map slug to structure key
  const trackKey = trackSlug.replace("-track", "") as PlatformTrackKey;
  
  if (!COURSE_STRUCTURE[trackKey]) return null;

  const trackData = COURSE_STRUCTURE[trackKey];
  // We know these tracks have web/ios/android structure
  const platforms = ["web", "ios", "android"] as const;

  return (
    <div className="my-12 grid gap-6 md:grid-cols-3">
      {platforms.map((platform) => {
        // @ts-ignore - we know the structure matches
        const platformData = trackData[platform];
        const startLink = START_LINKS[trackKey][platform];
        const Icon = PLATFORM_ICONS[platform];

        return (
          <Link
            key={platform}
            href={startLink}
            className="group relative flex flex-col justify-between overflow-hidden rounded-none border border-neutral-200 bg-white p-6 no-underline transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Top accent border on hover - Swiss Red */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-swiss-red opacity-0 transition-opacity group-hover:opacity-100"
              )}
            />
            
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-50 dark:bg-neutral-800">
                <Icon className="h-6 w-6 text-neutral-900 dark:text-white" />
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">{platformData.title}</h3>
              
              <div className="mb-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{platformData.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{getEstimatedDuration(platformData.lessons)}</span>
                </div>
              </div>

              <div className="mb-6 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <p className="mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Modules</p>
                <ul className="m-0 list-none space-y-1 p-0 text-sm text-neutral-600 dark:text-neutral-400">
                  {/* @ts-ignore */}
                  {platformData.modules.map((m) => (
                    <li key={m.id} className="m-0 flex items-center gap-2 p-0">
                       <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                       <span className="truncate">{m.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 font-medium text-swiss-red transition-colors group-hover:text-neutral-900 dark:group-hover:text-white">
              Start {platform === "ios" ? "iOS" : platform.charAt(0).toUpperCase() + platform.slice(1)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
