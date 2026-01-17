"use client";

import { useEffect, useState, useRef } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Home,
  Page as FileText,
  Wrench,
  Book as BookOpen,
  Group as Users,
  InfoCircle as Info,
  Search,
  OpenNewWindow as ExternalLink,
  Suitcase as Briefcase,
  UserPlus,
  Intersect as Blend,
  GraduationCap,
  CheckCircle,
  Globe,
  Apple,
  AppleImac2021Side as Android,
} from "iconoir-react";
import { motion, AnimatePresence } from "motion/react";
import { ease, duration } from "@/lib/motion";
import { TrackLogo } from "@/app/components/track-logo";

interface CommandPaletteProps {
  posts?: { title: string; slug: string }[];
}

interface SearchableLesson {
  path: string;
  title: string;
  track: "introduction" | "design" | "engineering" | "convergence";
  platform: "all" | "web" | "ios" | "android";
  module: string;
  moduleTitle: string;
  isFree: boolean;
  isCompleted: boolean;
  hasAccess: boolean;
}

interface CourseSearchResponse {
  lessons: SearchableLesson[];
  totalAccessible: number;
  totalCompleted: number;
  hasFullAccess: boolean;
}

type SearchMode = "all" | "course";

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "web":
      return <Globe className="h-3 w-3" />;
    case "ios":
      return <Apple className="h-3 w-3" />;
    case "android":
      return <Android className="h-3 w-3" />;
    default:
      return null;
  }
};

export function CommandPalette({ posts = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SearchMode>("all");
  const [courseData, setCourseData] = useState<CourseSearchResponse | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { isSignedIn } = useUser();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetch course data once when signed in and palette opens
  useEffect(() => {
    if (!open || !isSignedIn || hasFetchedRef.current || courseData) return;

    hasFetchedRef.current = true;
    setIsLoadingCourse(true);

    fetch("/api/course/search")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then((data) => setCourseData(data))
      .catch(() => {
        // Silent fail - user just won't see course results
      })
      .finally(() => setIsLoadingCourse(false));
  }, [open, isSignedIn, courseData]);

  // Reset to "all" mode when closing if not signed in
  useEffect(() => {
    if (!open) {
      setSearchValue("");
      if (!isSignedIn) {
        setMode("all");
      }
    }
  }, [open, isSignedIn]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const pages = [
    { name: "Home", href: "/", icon: Home, keywords: "home main landing" },
    {
      name: "Design Engineering",
      href: "/design-engineering",
      icon: Blend,
      keywords: "what is design engineer role career",
    },
    {
      name: "Course",
      href: "/course",
      icon: GraduationCap,
      keywords: "learn convergence track lessons",
    },
    {
      name: "Posts",
      href: "/posts",
      icon: FileText,
      keywords: "articles blog content read",
    },
    {
      name: "Tools",
      href: "/tools",
      icon: Wrench,
      keywords: "task builder practice",
    },
    {
      name: "Hiring",
      href: "https://designengineer.io",
      icon: Briefcase,
      external: true,
      keywords: "jobs careers work",
    },
    {
      name: "Resources",
      href: "/resources",
      icon: BookOpen,
      keywords: "links learning",
    },
    { name: "About", href: "/about", icon: Info, keywords: "who what" },
    {
      name: "Stories",
      href: "/stories",
      icon: Users,
      keywords: "interviews people",
    },
  ];

  const actions = [
    {
      name: "Sign Up",
      href: "/sign-up",
      icon: UserPlus,
      keywords: "register join",
    },
  ];

  // Group lessons by track for course mode
  const groupedLessons = courseData?.lessons.reduce(
    (acc, lesson) => {
      const key = lesson.track;
      if (!acc[key]) acc[key] = [];
      acc[key].push(lesson);
      return acc;
    },
    {} as Record<string, SearchableLesson[]>
  );

  const trackOrder = ["introduction", "design", "engineering", "convergence"];
  const trackLabels: Record<string, string> = {
    introduction: "Introduction",
    design: "Design Track",
    engineering: "Engineering Track",
    convergence: "Convergence",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="focus-ring hidden items-center gap-2 border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-500 transition-[background-color,border-color,transform] duration-150 ease-out hover:border-neutral-300 hover:bg-neutral-100 active:translate-y-px md:flex dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search…</span>
        <kbd className="ml-2 bg-neutral-200 px-1.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Command Menu"
            className="fixed inset-0 z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -4 }}
              transition={{ duration: duration.normal, ease: ease.outQuint }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Mode Tabs - only show if signed in */}
              {isSignedIn && (
                <div className="flex border-b border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setMode("all")}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                      mode === "all"
                        ? "border-b-2 border-swiss-red text-swiss-red"
                        : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("course")}
                    className={`flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                      mode === "course"
                        ? "border-b-2 border-swiss-red text-swiss-red"
                        : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    Course
                    {courseData && (
                      <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {courseData.totalAccessible}
                      </span>
                    )}
                  </button>
                </div>
              )}

              <Command.Input
                placeholder={
                  mode === "course"
                    ? "Search lessons…"
                    : "Type a command or search…"
                }
                value={searchValue}
                onValueChange={setSearchValue}
                className="focus-ring w-full border-b border-neutral-200 bg-transparent px-4 py-3 text-base outline-none placeholder:text-neutral-400 dark:border-neutral-800 dark:text-foreground"
              />
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-500">
                  {mode === "course" && isLoadingCourse
                    ? "Loading lessons…"
                    : "No results found."}
                </Command.Empty>

                {mode === "all" ? (
                  <>
                    <Command.Group
                      heading="Navigation"
                      className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-neutral-400"
                    >
                      {pages.map((page) => (
                        <Command.Item
                          key={page.href}
                          value={`${page.name} ${page.keywords}`}
                          onSelect={() =>
                            runCommand(() => {
                              if (page.external) {
                                window.open(
                                  page.href,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              } else {
                                router.push(page.href);
                              }
                            })
                          }
                          className="focus-ring flex cursor-pointer items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-neutral-700 aria-selected:border-swiss-red aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                        >
                          <page.icon className="h-4 w-4 text-neutral-400" />
                          <span>{page.name}</span>
                          {page.external && (
                            <ExternalLink className="ml-auto h-3 w-3 text-neutral-400" />
                          )}
                        </Command.Item>
                      ))}
                    </Command.Group>

                    {posts.length > 0 && (
                      <Command.Group
                        heading="Recent Posts"
                        className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-neutral-400"
                      >
                        {posts.slice(0, 5).map((post) => (
                          <Command.Item
                            key={post.slug}
                            value={post.title}
                            onSelect={() =>
                              runCommand(() => router.push(`/posts/${post.slug}`))
                            }
                            className="focus-ring flex cursor-pointer items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-neutral-700 aria-selected:border-swiss-red aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                          >
                            <FileText className="h-4 w-4 text-neutral-400" />
                            <span className="line-clamp-1">{post.title}</span>
                          </Command.Item>
                        ))}
                      </Command.Group>
                    )}

                    {!isSignedIn && (
                      <Command.Group
                        heading="Actions"
                        className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-neutral-400"
                      >
                        {actions.map((action) => (
                          <Command.Item
                            key={action.href}
                            value={`${action.name} ${action.keywords}`}
                            onSelect={() =>
                              runCommand(() => router.push(action.href))
                            }
                            className="focus-ring flex cursor-pointer items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-neutral-700 aria-selected:border-swiss-red aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                          >
                            <action.icon className="h-4 w-4 text-neutral-400" />
                            <span>{action.name}</span>
                          </Command.Item>
                        ))}
                      </Command.Group>
                    )}
                  </>
                ) : (
                  <>
                    {/* Course Mode */}
                    {courseData &&
                      groupedLessons &&
                      trackOrder.map((trackKey) => {
                        const lessons = groupedLessons[trackKey];
                        if (!lessons || lessons.length === 0) return null;

                        return (
                          <Command.Group
                            key={trackKey}
                            heading={trackLabels[trackKey]}
                            className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-neutral-400"
                          >
                            {lessons.map((lesson) => (
                              <Command.Item
                                key={lesson.path}
                                value={`${lesson.title} ${lesson.moduleTitle} ${lesson.track} ${lesson.platform}`}
                                onSelect={() =>
                                  runCommand(() =>
                                    router.push(`/course/${lesson.path}`)
                                  )
                                }
                                className="focus-ring flex cursor-pointer items-center gap-3 border-l-2 border-transparent px-3 py-2 text-sm text-neutral-700 aria-selected:border-swiss-red aria-selected:bg-neutral-100 dark:text-neutral-300 dark:aria-selected:bg-neutral-800"
                              >
                                {/* Track Icon */}
                                {lesson.track === "introduction" ? (
                                  <GraduationCap className="h-4 w-4 shrink-0 text-neutral-400" />
                                ) : (
                                  <TrackLogo
                                    track={lesson.track}
                                    platform={
                                      lesson.platform === "all"
                                        ? "web"
                                        : lesson.platform
                                    }
                                    size={16}
                                    className="shrink-0"
                                  />
                                )}

                                {/* Lesson Info */}
                                <div className="min-w-0 flex-1">
                                  <span className="line-clamp-1">
                                    {lesson.title}
                                  </span>
                                  <span className="line-clamp-1 text-xs text-neutral-400">
                                    {lesson.moduleTitle}
                                  </span>
                                </div>

                                {/* Platform + Status */}
                                <div className="flex shrink-0 items-center gap-2">
                                  {lesson.platform !== "all" && (
                                    <span className="text-neutral-400">
                                      <PlatformIcon platform={lesson.platform} />
                                    </span>
                                  )}
                                  {lesson.isCompleted && (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                  {lesson.isFree && !lesson.isCompleted && (
                                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                      Free
                                    </span>
                                  )}
                                </div>
                              </Command.Item>
                            ))}
                          </Command.Group>
                        );
                      })}

                    {/* Progress Summary */}
                    {courseData && courseData.totalAccessible > 0 && (
                      <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <span>
                            {courseData.totalCompleted} of{" "}
                            {courseData.totalAccessible} completed
                          </span>
                          <span className="tabular-nums">
                            {Math.round(
                              (courseData.totalCompleted /
                                courseData.totalAccessible) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                          <div
                            className="h-full bg-swiss-red transition-all"
                            style={{
                              width: `${(courseData.totalCompleted / courseData.totalAccessible) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Command.List>

              <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 text-xs text-neutral-400 dark:border-neutral-800">
                <span>Navigate with ↑↓ • Select with ↵</span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </Command.Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
