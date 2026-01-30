import {
  getCourse,
  getCourseProgress,
  getEstimatedDuration,
  getLastActivity,
  getUserEnrollment,
  normalizeAccessLevel,
  getUserProgress,
  getProgressStats,
} from "@/lib/course";
import type { AccessLevel } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Book as BookOpen,
  Clock,
  Trophy,
  NavArrowRight as ArrowRight,
  Gift,
  Crown,
} from "iconoir-react";
import { Badge, Button } from "@/app/components/ui";
import { DiamondIcon } from "@/app/components/diamond-icon";
import { PageHeader } from "@/app/components/page-header";
import { ProgressTracker } from "./components/progress-tracker";
import { ContinueLearning } from "./components/continue-learning";
import { StudentCompanies } from "./components/student-companies";
import { TrackCard } from "./components/track-card";
import { TrackLogo } from "@/app/components/track-logo";
import { TestimonialsSection } from "./components/testimonials-section";
import { CurriculumPreview } from "./components/curriculum-preview";
import { CourseApproach } from "./components/course-approach";
import { TemporaryAccessRedeem } from "./components/temporary-access-redeem";
import { TemporaryAccessStatus } from "./components/temporary-access-status";

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

// ... imports
import { PurchaseVerification } from "./components/purchase-verification";

interface CoursePageProps {
  searchParams?: Promise<{
    purchase?: string;
  }>;
}

export default async function CoursePage({ searchParams }: CoursePageProps) {
  // Await params correctly for Next.js 15+ (if applicable, best practice anyway)
  const params = await searchParams;
  const isPurchaseSuccess = params?.purchase === "success";

  const { userId } = await auth();
  const course = await getCourse();
  let progress: { completedLessons: string[]; raw: unknown } | null = null;
  let lastActivity = null;
  let introCompleted = false;
  let accessLevel: string | null = null;
  let filteredCompletedCount = 0;
  let enrollment: Awaited<ReturnType<typeof getUserEnrollment>> = null;

  if (userId) {
    const [progressData, lastActivityData, enrollmentData, userProgress] =
      await Promise.all([
        getCourseProgress(userId),
        getLastActivity(userId),
        getUserEnrollment(userId),
        getUserProgress(userId),
      ]);

    enrollment = enrollmentData;

    progress = progressData;
    lastActivity = lastActivityData;
    accessLevel = normalizeAccessLevel(enrollment?.metadata.access_level);

    // Get filtered stats based on actual access level
    const stats = await getProgressStats(
      userProgress,
      (accessLevel || "free") as AccessLevel,
    );
    filteredCompletedCount = stats.completedCount;

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

  // If user just purchased but doesn't have access yet, show verification
  if (isPurchaseSuccess && !hasPaidAccess && userId) {
    return (
      <>
        <PurchaseVerification />
        {/* Show skeleton or blurred background behind */}
        <main className="pointer-events-none min-h-dvh bg-linear-to-b from-neutral-50 to-white opacity-50 dark:from-black dark:to-neutral-900">
          <PageHeader
            title={
              <>
                Loading <span className="text-swiss-red">Course</span>
              </>
            }
            description="Please wait..."
          />
        </main>
      </>
    );
  }

  const tracks = [
    {
      id: "design-track",
      title: "Design Track",
      description:
        "For engineers. Learn typography, colour, and layout. Develop the design taste to ship interfaces you're proud of.",
      icon: (
        <TrackLogo
          track="design"
          showLayer="track"
          size={28}
          className="text-neutral-900 dark:text-white"
        />
      ),
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
        "For designers. Go beyond Vibe Coding and actually understand HTML, CSS, and JavaScript. Build it yourself.",
      icon: (
        <TrackLogo
          track="engineering"
          showLayer="track"
          size={28}
          className="text-neutral-900 dark:text-white"
        />
      ),
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
      title:
        accessLevel === "full"
          ? "Convergence Track"
          : "Convergence: All-Access",
      description:
        accessLevel === "full"
          ? "Exclusive advanced content on motion, prototyping, and accessibility."
          : "Starting your career, or want both skillsets? Everything included, plus exclusive content on motion, prototyping, and accessibility.",
      icon: (
        <TrackLogo
          track="convergence"
          showLayer="track"
          size={28}
          className="text-neutral-900 dark:text-white"
        />
      ),
      color: "bg-neutral-500",
      stats: {
        lessons:
          accessLevel === "full"
            ? course.tracks.convergence.totalLessons
            : course.totalLessons,
        freeLessons: 0,
        duration: getEstimatedDuration(
          accessLevel === "full"
            ? course.tracks.convergence.totalLessons
            : course.totalLessons,
        ),
        level: accessLevel === "full" ? "Advanced" : "Complete Course",
      },
    },
  ];

  return (
    <main className="min-h-dvh bg-linear-to-b from-neutral-50 to-white dark:from-black dark:to-neutral-900">
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
              <Gift className="text-swiss-red h-4 w-4" />
              <span>Free intro modules</span>
            </div>
          )}
        </div>
        <StudentCompanies />
      </PageHeader>

      {/* Pricing / Upgrade Callout Banner */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            {accessLevel === "full" ? (
              // Full Access State
              <div className="flex flex-col items-center gap-4">
                <Badge variant="success" className="gap-2 px-3 py-1.5">
                  <Crown className="h-4 w-4" />
                  Full Access Unlocked
                </Badge>
                <p className="text-neutral-600 dark:text-neutral-400">
                  You have access to everything. Enjoy your learning journey!
                </p>
              </div>
            ) : hasPaidAccess ? (
              // Partial Access / Upgrade State
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:text-left">
                <div>
                  <h2 className="text-xl font-bold md:text-2xl">
                    Complete your skillset
                  </h2>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    Upgrade to Convergence to unlock all tracks and advanced content.
                    <br />
                    <span className="text-sm text-neutral-500">
                      (You only pay the difference)
                    </span>
                  </p>
                </div>
                <Button
                  href="/course/pricing"
                  className="shrink-0 bg-swiss-red px-6 py-3 font-medium text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Upgrade Plan
                </Button>
              </div>
            ) : (
              // New User State
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:text-left">
                <div>
                  <div className="flex items-center gap-3 md:justify-start justify-center mb-2">
                    <Badge variant="default" className="gap-1.5">
                      <Gift className="h-3.5 w-3.5" />
                      Start for Free
                    </Badge>
                    <span className="text-sm text-neutral-500">•</span>
                    <span className="text-sm text-neutral-500">14-day guarantee</span>
                  </div>
                  <h2 className="text-xl font-bold md:text-2xl">
                    Ready to bridge the gap?
                  </h2>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    Join hundreds of design engineers building better products.
                  </p>
                </div>
                <Button
                  href="/course/pricing"
                  className="shrink-0 bg-swiss-red px-8 py-4 font-medium text-white shadow-lg shadow-swiss-red/20 transition-all hover:scale-105 hover:bg-neutral-900 hover:shadow-xl dark:hover:bg-white dark:hover:text-black"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Get Access
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {userId && (
        <div className="border-b border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container-page">
            <div className="mx-auto max-w-5xl space-y-6">
              {/* Temporary Access Status */}
              {enrollment?.metadata.is_temporary && (
                <div className="mb-4">
                  <TemporaryAccessStatus enrollment={enrollment} />
                </div>
              )}

              {/* Progress Tracker */}
              {progress && (
                <>
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="heading-subsection">Your Progress</h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Trophy className="text-swiss-red h-4 w-4" />
                      <span>{filteredCompletedCount} lessons completed</span>
                    </div>
                  </div>
                  <ProgressTracker />
                </>
              )}
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
                className="group hover:border-swiss-red dark:hover:border-swiss-red flex items-start gap-6 border border-neutral-200 bg-neutral-50 p-6 transition-colors dark:border-neutral-700 dark:bg-neutral-800/50"
              >
                <div className="bg-swiss-red/10 flex h-12 w-12 shrink-0 items-center justify-center">
                  <DiamondIcon className="text-swiss-red h-6 w-6" />
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
                      <span>
                        {course.structure.introduction.lessons} lessons
                      </span>
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

      {/* Course Approach - Why text-based interactive */}
      <CourseApproach />

      {/* Curriculum Preview - What You'll Learn */}
      <CurriculumPreview accessLevel={accessLevel} />

      {/* Free Content Callout - only show for non-enrolled users */}
      {(!accessLevel || accessLevel === "free") && (
        <div className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="success" className="mb-4 gap-2 px-4 py-2">
                <Gift className="h-4 w-4" />
                Start Free
              </Badge>
              <h2 className="heading-subsection mb-4">Try Before You Buy</h2>
              <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                {introCompleted
                  ? "The first module of each track is completely free. Start learning—no credit card required."
                  : "The Introduction and first module of each track are completely free. Understand what Design Engineering is and start learning—no credit card required."}
              </p>
              <div className="border-swiss-red/20 bg-swiss-red/2.5 text-swiss-red dark:border-swiss-red/30 dark:bg-swiss-red/5 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                🎓 Students get 30% off -{" "}
                <Link
                  href="/course/pricing"
                  className="font-medium underline hover:no-underline"
                >
                  learn more
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {!introCompleted && (
                  <Button
                    href="/course/00-introduction/01-welcome"
                    startContent={<DiamondIcon className="h-4 w-4" />}
                    className="px-4 py-2 text-sm font-medium"
                  >
                    Start Introduction
                  </Button>
                )}
                <Button
                  href="/course/design-track/web/01-foundations/01-what-is-visual-design"
                  variant="outline"
                  startContent={
                    <TrackLogo track="design" platform="web" size={16} />
                  }
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Design (Web)
                </Button>
                <Button
                  href="/course/engineering-track/web/00-environment-setup/01-your-new-best-friend-the-terminal"
                  variant="outline"
                  startContent={
                    <TrackLogo track="engineering" platform="web" size={16} />
                  }
                  className="px-4 py-2 text-sm font-medium"
                >
                  Start Engineering (Web)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Temporary Access Code Redemption - only show for non-enrolled users */}
      {(!accessLevel || accessLevel === "free") && (
        <div className="border-b border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="container-page">
            <div className="mx-auto max-w-2xl">
              <TemporaryAccessRedeem />
            </div>
          </div>
        </div>
      )}

      {/* Pricing Preview - show for everyone except full access users */}
      {accessLevel !== "full" && (
        <div id="pricing" className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="heading-subsection mb-2">
                  {hasPaidAccess ? "Complete Your Skillset" : "Simple, Transparent Pricing"}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {hasPaidAccess 
                    ? "Upgrade to the full Convergence track to unlock advanced content and all platforms." 
                    : "One-time payment. Lifetime access. No subscriptions."}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Design Full */}
                <div className={cn(
                  "rounded-none border p-6",
                  accessLevel?.startsWith("design_") ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50"
                )}>
                  <div className="text-swiss-red mb-1 text-xs font-medium tracking-wider uppercase">
                    Design Track
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                  {accessLevel?.startsWith("design_") ? (
                     <div className="mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                       <CheckCircle className="h-5 w-5" />
                       <span className="font-medium">You own this</span>
                     </div>
                  ) : (
                    <>
                      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                        All design content across Web, iOS & Android
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">£299</span>
                        <span className="text-neutral-500"> one-time</span>
                      </div>
                    </>
                  )}
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>
                      ✓ {course.tracks.design.totalLessons}+ design lessons
                    </li>
                    <li>✓ All 3 platforms</li>
                    <li>✓ Lifetime access</li>
                  </ul>
                </div>

                {/* Engineering Full */}
                <div className={cn(
                  "rounded-none border p-6",
                  accessLevel?.startsWith("engineering_") ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50"
                )}>
                  <div className="mb-1 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                    Engineering Track
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                  {accessLevel?.startsWith("engineering_") ? (
                     <div className="mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                       <CheckCircle className="h-5 w-5" />
                       <span className="font-medium">You own this</span>
                     </div>
                  ) : (
                    <>
                      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                        All engineering content across Web, iOS & Android
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">£349</span>
                        <span className="text-neutral-500"> one-time</span>
                      </div>
                    </>
                  )}
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>
                      ✓ {course.tracks.engineering.totalLessons}+ engineering
                      lessons
                    </li>
                    <li>✓ All 3 platforms</li>
                    <li>✓ Lifetime access</li>
                  </ul>
                </div>

                {/* Convergence */}
                <div className="border-swiss-red bg-swiss-red/2.5 dark:bg-swiss-red/5 rounded-none border-2 p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-swiss-red text-xs font-bold tracking-wider uppercase">
                      Best Value
                    </span>
                    <Crown className="text-swiss-red h-3 w-3" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    Convergence: All-Access
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    Everything — Design + Engineering + exclusive content
                  </p>
                  <div className="mb-4">
                    <span className="text-swiss-red text-3xl font-bold">
                      £599
                    </span>
                    <span className="text-neutral-500"> one-time</span>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>✓ All {course.totalLessons}+ lessons</li>
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
                  {hasPaidAccess ? "View Upgrade Options" : "View All Pricing Options"}
                </Button>
                <p className="mt-4 text-sm text-neutral-500">
                  {hasPaidAccess 
                    ? "Pay only the difference when you upgrade" 
                    : "14-day money-back guarantee • Individual platform tracks from £99"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Testimonials */}
      <TestimonialsSection />

      {/* Course Footer */}
      <div className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">
                  Course
                </h3>
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
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">
                  Support
                </h3>
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
                <h3 className="heading-eyebrow mb-3 text-neutral-900 dark:text-white">
                  Guarantee
                </h3>
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
