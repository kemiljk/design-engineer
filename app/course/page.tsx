import {
  getCourse,
  getCourseProgress,
  getEstimatedDuration,
  getLastActivity,
  getUserEnrollment,
} from "@/lib/course";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Code2,
  Layout,
  Trophy,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/app/components/ui";
import { ProgressTracker } from "./components/progress-tracker";
import { ContinueLearning } from "./components/continue-learning";
import { StudentCompanies } from "./components/student-companies";
import { TrackCard } from "./components/track-card";

export const metadata = {
  title: "Design Engineer Course",
  description:
    "Master the intersection of design and engineering. Learn to build beautiful, functional, and performant web and mobile applications.",
};

// Introduction lesson paths
const INTRO_LESSONS = [
  "00-introduction/01-welcome",
  "00-introduction/02-what-is-design-engineering",
  "00-introduction/03-choosing-your-path",
  "00-introduction/04-how-this-course-works",
];

export default async function CoursePage() {
  const { userId } = await auth();
  const course = await getCourse();
  let progress: { completedLessons: string[]; raw: unknown } | null = null;
  let lastActivity = null;
  let introCompleted = false;
  let accessLevel: string | null = null;

  if (userId) {
    const [progressData, lastActivityData, enrollment] = await Promise.all([
      getCourseProgress(userId),
      getLastActivity(userId),
      getUserEnrollment(userId),
    ]);

    progress = progressData;
    lastActivity = lastActivityData;
    accessLevel = enrollment?.metadata.access_level || null;

    // Check if all intro lessons are completed
    if (progress?.completedLessons) {
      const completedLessons = progress.completedLessons;
      introCompleted = INTRO_LESSONS.every((lesson) =>
        completedLessons.includes(lesson),
      );
    }
  }

  const tracks = [
    {
      id: "design-track",
      title: "Design Track",
      description:
        "Go beyond Vibe Coding. Learn the visual design fundamentals that AI can't teach—develop real taste, understand why designs work, and build skills that last.",
      icon: Layout,
      color: "bg-swiss-red",
      stats: {
        lessons: course.tracks.design.totalLessons,
        freeLessons: course.tracks.design.freeLessons,
        duration: getEstimatedDuration(course.tracks.design.totalLessons),
        level: "Beginner to Advanced",
      },
    },
    {
      id: "engineering-track",
      title: "Engineering Track",
      description:
        "Ship beautiful, thoroughly considered UIs. Learn to build interfaces that users love—not just functional code, but polished, professional experiences.",
      icon: Code2,
      color: "bg-neutral-900 dark:bg-neutral-100",
      stats: {
        lessons: course.tracks.engineering.totalLessons,
        freeLessons: course.tracks.engineering.freeLessons,
        duration: getEstimatedDuration(course.tracks.engineering.totalLessons),
        level: "Beginner to Intermediate",
      },
    },
    {
      id: "convergence",
      title: "Convergence: All-Access",
      description:
        "EVERYTHING INCLUDED: All Design + Engineering tracks across all platforms, PLUS exclusive advanced content on motion, prototyping, accessibility, and workflow.",
      icon: Zap,
      color: "bg-neutral-500",
      stats: {
        lessons: course.totalLessons,
        freeLessons: 0,
        duration: getEstimatedDuration(course.totalLessons),
        level: "Complete Course",
      },
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-black dark:to-neutral-900">
      {/* Test Mode Banner */}
      {course.testMode && (
        <div className="bg-yellow-500 px-4 py-2 text-center text-sm font-medium text-black">
          🧪 Test Mode Active — Access Level:{" "}
          {course.testAccessLevel || "none (free only)"}
        </div>
      )}

      {/* Hero Section */}
      <div className="border-b border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-black md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Become a <span className="text-swiss-red">Design Engineer</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Bridge the gap between design and engineering. Master the skills
              to conceptualize, design, and build world-class digital products.
            </p>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{getEstimatedDuration(course.totalLessons)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-swiss-red h-4 w-4" />
                <span>Free intro modules</span>
              </div>
            </div>

            {/* Student Companies */}
            <StudentCompanies />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {userId && progress && (
        <div className="border-b border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Progress</h2>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Trophy className="text-swiss-red h-4 w-4" />
                  <span>
                    {progress.completedLessons.length} lessons completed
                  </span>
                </div>
              </div>
              <ProgressTracker />
            </div>
          </div>
        </div>
      )}

      {/* Continue Learning Section */}
      {lastActivity && lastActivity.status !== "completed" && (
        <div className="border-b border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <ContinueLearning
                lessonPath={lastActivity.lessonPath}
                lessonTitle={lastActivity.lessonTitle}
              />
            </div>
          </div>
        </div>
      )}

      {/* Start Here - Introduction (only show if not completed) */}
      {!introCompleted && (
        <div className="border-b border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-swiss-red flex h-8 w-8 items-center justify-center text-sm font-bold text-white">
                  1
                </div>
                <h2 className="text-2xl font-bold">Start Here</h2>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Free
                </span>
              </div>

              <Link
                href="/course/00-introduction/01-welcome"
                className="hover:border-swiss-red group flex items-start gap-6 border border-neutral-200 bg-neutral-50 p-6 transition-all hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/50"
              >
                <div className="bg-swiss-red/10 flex h-12 w-12 shrink-0 items-center justify-center">
                  <Sparkles className="text-swiss-red h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="group-hover:text-swiss-red mb-2 text-xl font-bold">
                    Introduction to Design Engineering
                  </h3>
                  <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                    Before diving into the tracks, understand what Design
                    Engineering is, how this course works, and which path is
                    right for you.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>4 lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>~15 minutes</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="group-hover:text-swiss-red h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tracks Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-neutral-200 text-sm font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            {introCompleted ? "1" : "2"}
          </div>
          <h2 className="text-2xl font-bold">Choose Your Track</h2>
          {!userId && (
            <Button
              href="/sign-in"
              endContent={<ArrowRight className="h-4 w-4" />}
              className="ml-auto px-4 py-2 text-sm font-medium"
            >
              Sign in to track progress
            </Button>
          )}
        </div>

        <div className="grid auto-rows-fr gap-8 md:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              id={track.id}
              title={track.title}
              description={track.description}
              icon={
                <track.icon className="h-6 w-6 text-neutral-900 dark:text-white" />
              }
              color={track.color}
              stats={track.stats}
              accessLevel={accessLevel}
            />
          ))}
        </div>
      </div>

      {/* Free Content Callout - only show for non-enrolled users */}
      {(!accessLevel || accessLevel === "free") && (
        <div className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <Sparkles className="h-4 w-4" />
                Start Free
              </div>
              <h2 className="mb-4 text-2xl font-bold">Try Before You Buy</h2>
              <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                {introCompleted
                  ? "The first module of each track is completely free. Start learning—no credit card required."
                  : "The Introduction and first module of each track are completely free. Understand what Design Engineering is and start learning—no credit card required."}
              </p>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-swiss-red/20 bg-swiss-red/5 px-4 py-2 text-sm text-swiss-red dark:border-swiss-red/30 dark:bg-swiss-red/10">
                🎓 Students get 30% off -{" "}
                <Link href="/course/pricing" className="font-medium underline hover:no-underline">
                  learn more
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {!introCompleted && (
                  <Button
                    href="/course/00-introduction/01-welcome"
                    startContent={<Sparkles className="h-4 w-4" />}
                    className="px-4 py-2 text-sm font-medium"
                  >
                    Start Introduction
                  </Button>
                )}
                <Button
                  href="/course/design-track/web/00-environment-setup/01-your-new-best-friend-the-terminal"
                  variant="outline"
                  startContent={<Layout className="h-4 w-4" />}
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Design (Web)
                </Button>
                <Button
                  href="/course/engineering-track/web/01-html-fundamentals/01-what-is-html"
                  variant="outline"
                  startContent={<Code2 className="h-4 w-4" />}
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Engineering (Web)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Introduction Section (only show if not completed) */}
      {!introCompleted && (
        <div className="border-t border-neutral-200 py-16 dark:border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold">Getting Started</h2>
              <Link
                href="/course/00-introduction/01-welcome"
                className="hover:border-swiss-red dark:hover:border-swiss-red group flex items-center justify-between border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Free
                    </span>
                    <span className="text-xs text-neutral-500">
                      {course.structure.introduction.lessons} lessons
                    </span>
                  </div>
                  <h3 className="group-hover:text-swiss-red text-lg font-semibold">
                    Introduction to Design Engineering
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Learn what Design Engineering is, why it matters, and how
                    this course will help you master both disciplines.
                  </p>
                </div>
                <ArrowRight className="group-hover:text-swiss-red h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Course Footer */}
      <div className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 font-bold">Course</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>
                    <Link
                      href="/course/00-introduction/01-welcome"
                      className="hover:text-swiss-red"
                    >
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/design-track"
                      className="hover:text-swiss-red"
                    >
                      Design Track
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/engineering-track"
                      className="hover:text-swiss-red"
                    >
                      Engineering Track
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/convergence"
                      className="hover:text-swiss-red"
                    >
                      Convergence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/certificate"
                      className="hover:text-swiss-red"
                    >
                      Certificates
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-bold">Support</h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>
                    <Link href="/course/faq" className="hover:text-swiss-red">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/pricing"
                      className="hover:text-swiss-red"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@designengineer.xyz"
                      className="hover:text-swiss-red"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/course/refund-policy"
                      className="hover:text-swiss-red"
                    >
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/course/terms" className="hover:text-swiss-red">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/privacy"
                      className="hover:text-swiss-red"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-bold">Guarantee</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  14-day money-back guarantee. If you&apos;re not satisfied with
                  the course, contact us within 14 days for a full refund—no
                  questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
