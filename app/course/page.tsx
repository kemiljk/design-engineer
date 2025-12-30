import {
  getCourse,
  getCourseProgress,
  getEstimatedDuration,
  getLastActivity,
  getUserEnrollment,
  normalizeAccessLevel,
} from "@/lib/course";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge, Button } from "@/app/components/ui";
import { PageHeader } from "@/app/components/page-header";
import { ProgressTracker } from "./components/progress-tracker";
import { ContinueLearning } from "./components/continue-learning";
import { StudentCompanies } from "./components/student-companies";
import { TrackCard } from "./components/track-card";
import { TrackLogo } from "@/app/components/track-logo";

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
    accessLevel = normalizeAccessLevel(enrollment?.metadata.access_level);

    // Check if all intro lessons are completed
    if (progress?.completedLessons) {
      const completedLessons = progress.completedLessons;
      introCompleted = INTRO_LESSONS.every((lesson) =>
        completedLessons.includes(lesson),
      );
    }
  }

  // Check if user has any paid access (not free, not null)
  const hasPaidAccess = accessLevel && accessLevel !== "free";

  const tracks = [
    {
      id: "design-track",
      title: "Design Track",
      description:
        "Develop real design taste. Learn visual design fundamentals that make your work beautiful—typography, colour, layout, and the principles behind great interfaces.",
      icon: <TrackLogo track="design" platform="web" size={28} className="text-neutral-900 dark:text-white" />,
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
        "Go beyond Vibe Coding. Learn to build interfaces properly—not just prompting AI, but understanding HTML, CSS, and JavaScript from the ground up.",
      icon: <TrackLogo track="engineering" platform="web" size={28} className="text-neutral-900 dark:text-white" />,
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
      icon: <TrackLogo track="convergence" platform="web" size={28} className="text-neutral-900 dark:text-white" />,
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
      <PageHeader
        title={
          <>
            Become a <span className="text-swiss-red">Design Engineer</span>
          </>
        }
        description="Bridge the gap between design and engineering. Master the skills to conceptualise, design, and build world-class digital products."
      >
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500 md:gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{getEstimatedDuration(course.totalLessons)}</span>
          </div>
          {!hasPaidAccess && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-swiss-red" />
              <span>Free intro modules</span>
            </div>
          )}
        </div>
        <StudentCompanies />
      </PageHeader>

      {/* Progress Section */}
      {userId && progress && (
        <div className="border-b border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container-page">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="heading-subsection">Your Progress</h2>
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
          <div className="container-page">
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
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-swiss-red flex h-8 w-8 items-center justify-center text-sm font-bold text-white">
                  1
                </div>
                <h2 className="heading-subsection">Start Here</h2>
                {!hasPaidAccess && <Badge variant="success">Free</Badge>}
              </div>

              <Link
                href="/course/00-introduction/01-welcome"
                className="group flex items-start gap-6 border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:border-swiss-red dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-swiss-red"
              >
                <div className="bg-swiss-red/10 flex h-12 w-12 shrink-0 items-center justify-center">
                  <Sparkles className="text-swiss-red h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="group-hover:text-swiss-red mb-2 text-lg font-bold md:text-xl">
                    Introduction to Design Engineering
                  </h3>
                  <p className="mb-4 text-neutral-500 dark:text-neutral-400">
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
      <div className="container-page py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-neutral-200 text-sm font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
            {introCompleted ? "1" : "2"}
          </div>
          <h2 className="heading-subsection">Choose Your Track</h2>
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
              icon={track.icon}
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
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="success" className="mb-4 gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4" />
                Start Free
              </Badge>
              <h2 className="heading-subsection mb-4">Try Before You Buy</h2>
              <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                {introCompleted
                  ? "The first module of each track is completely free. Start learning—no credit card required."
                  : "The Introduction and first module of each track are completely free. Understand what Design Engineering is and start learning—no credit card required."}
              </p>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-swiss-red/20 bg-swiss-red/[0.025] px-4 py-2 text-sm text-swiss-red dark:border-swiss-red/30 dark:bg-swiss-red/5">
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
                  href="/course/design-track/web/01-foundations/01-what-is-visual-design"
                  variant="outline"
                  startContent={<TrackLogo track="design" platform="web" size={16} />}
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Design (Web)
                </Button>
                <Button
                  href="/course/engineering-track/web/00-environment-setup/01-your-new-best-friend-the-terminal"
                  variant="outline"
                  startContent={<TrackLogo track="engineering" platform="web" size={16} />}
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Engineering (Web)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Preview - only show for non-enrolled users */}
      {(!accessLevel || accessLevel === "free") && (
        <div className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="heading-subsection mb-2">Simple, Transparent Pricing</h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  One-time payment. Lifetime access. No subscriptions.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Design Full */}
                <div className="rounded-none border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-800/50">
                  <div className="mb-1 text-xs font-medium uppercase tracking-wider text-swiss-red">
                    Design Track
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                  <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    All design content across Web, iOS & Android
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">£299</span>
                    <span className="text-neutral-500"> one-time</span>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>✓ 48+ design lessons</li>
                    <li>✓ All 3 platforms</li>
                    <li>✓ Lifetime access</li>
                  </ul>
                </div>

                {/* Engineering Full */}
                <div className="rounded-none border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-800/50">
                  <div className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Engineering Track
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                  <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    All engineering content across Web, iOS & Android
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">£349</span>
                    <span className="text-neutral-500"> one-time</span>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>✓ 67+ engineering lessons</li>
                    <li>✓ All 3 platforms</li>
                    <li>✓ Lifetime access</li>
                  </ul>
                </div>

                {/* Convergence */}
                <div className="rounded-none border-2 border-swiss-red bg-swiss-red/[0.025] p-6 dark:bg-swiss-red/5">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-swiss-red">
                      Best Value
                    </span>
                    <Sparkles className="h-3 w-3 text-swiss-red" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Convergence</h3>
                  <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    Everything — Design + Engineering + exclusive content
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-swiss-red">£599</span>
                    <span className="text-neutral-500"> one-time</span>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>✓ ALL 156+ lessons</li>
                    <li>✓ Exclusive advanced content</li>
                    <li>✓ Lifetime access + updates</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  href="/course/pricing"
                  endContent={<ArrowRight className="h-4 w-4" />}
                  className="px-6 py-3 font-medium"
                >
                  View All Pricing Options
                </Button>
                <p className="mt-4 text-sm text-neutral-500">
                  14-day money-back guarantee • Individual platform tracks from £99
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Course Footer */}
      <div className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">Course</h3>
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
                  <li>
                    <Link
                      href="/course/gallery"
                      className="hover:text-swiss-red"
                    >
                      Project Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/course/dashboard"
                      className="hover:text-swiss-red"
                    >
                      My Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">Support</h3>
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
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">Guarantee</h3>
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
