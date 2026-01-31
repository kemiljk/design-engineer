import NextLink from "next/link";
import { NavArrowRight as ArrowRight } from "iconoir-react";
import {
  getDynamicCourseStructure,
  type PlatformInfo,
} from "@/lib/course-structure";
import { AnimatedSection } from "./animated-section";

const MODULES_TO_SHOW = 4;

function TrackModuleList({
  title,
  platform,
  accentClass,
}: {
  title: string;
  platform: PlatformInfo;
  accentClass: string;
}) {
  const visible = platform.modules.slice(0, MODULES_TO_SHOW);
  const remaining = platform.modules.length - MODULES_TO_SHOW;

  return (
    <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 p-5 dark:border-neutral-800">
        <div className="mb-1 flex items-center gap-2">
          <div className={`h-2 w-2 ${accentClass}`} />
          <h3 className="heading-card">{title}</h3>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {platform.lessons} lessons &middot; {platform.modules.length} modules
        </p>
      </div>
      <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {visible.map((mod) => (
          <li
            key={mod.id}
            className="flex items-center justify-between px-5 py-3"
          >
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {mod.title}
            </span>
            <span className="text-xs text-neutral-400">
              {mod.lessons} {mod.lessons === 1 ? "lesson" : "lessons"}
            </span>
          </li>
        ))}
        {remaining > 0 && (
          <li className="px-5 py-3 text-sm text-neutral-500 dark:text-neutral-400">
            + {remaining} more {remaining === 1 ? "module" : "modules"}
          </li>
        )}
      </ul>
    </div>
  );
}

export async function CurriculumPreviewHome() {
  const structure = await getDynamicCourseStructure();

  return (
    <AnimatedSection
      as="div"
      className="w-full border-b border-neutral-200 py-16 md:py-24 dark:border-neutral-800"
    >
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="heading-eyebrow mb-2">What&apos;s inside</p>
            <h2 className="heading-section">Curriculum Preview</h2>
          </div>
          <NextLink
            href="/course"
            className="group flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-swiss-red dark:text-white dark:hover:text-swiss-red"
          >
            View full curriculum
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NextLink>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TrackModuleList
            title="Design Track"
            platform={structure.design.web}
            accentClass="bg-swiss-red"
          />
          <TrackModuleList
            title="Engineering Track"
            platform={structure.engineering.web}
            accentClass="bg-neutral-900 dark:bg-neutral-100"
          />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Covering React, SwiftUI, CSS, Figma, and design tokens.
          Available for Web, iOS, and Android.
        </p>
      </div>
    </AnimatedSection>
  );
}
