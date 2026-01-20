import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  NavArrowLeft as ArrowLeft,
  NavArrowRight as ArrowRight,
  Notes as StickyNote,
  Medal as Award,
  Folder as FolderKanban,
  Clock,
  Trophy,
  Book as BookOpen,
  Send,
  PlusCircle,
  OpenNewWindow as ExternalLink,
  User,
} from "iconoir-react";
import {
  getUserNotes,
  getUserProgress,
  getProgressStats,
  getUserEnrollment,
  normalizeAccessLevel,
  getLastActivity,
} from "@/lib/course";
import {
  getUserCertificates,
  checkCertificateEligibility,
} from "@/lib/certificate";
import { getUserGalleryProjects } from "@/lib/cosmic";
import { Button } from "@/app/components/ui";
import { GalleryProjectCard } from "./gallery-project-card";
import { ContinueLearning } from "../components/continue-learning";

export const metadata = {
  title: "My Dashboard | Design Engineer Course",
  description:
    "View your course progress, notes, certificates, and gallery submissions",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/course/dashboard");
  }

  const user = await currentUser();
  const [
    enrollment,
    progress,
    notes,
    certificates,
    galleryProjects,
    lastActivity,
  ] = await Promise.all([
    getUserEnrollment(userId),
    getUserProgress(userId),
    getUserNotes(userId),
    getUserCertificates(userId),
    getUserGalleryProjects(userId),
    getLastActivity(userId),
  ]);

  const accessLevel =
    normalizeAccessLevel(enrollment?.metadata.access_level) || "free";
  const stats = await getProgressStats(progress, accessLevel);

  const [webEligibility, iosEligibility, androidEligibility] =
    await Promise.all([
      checkCertificateEligibility(userId, "web"),
      checkCertificateEligibility(userId, "ios"),
      checkCertificateEligibility(userId, "android"),
    ]);

  const eligibleForCertificates = [
    webEligibility,
    iosEligibility,
    androidEligibility,
  ].filter((e) => e.eligible && !e.certificate).length;

  const recentNotes = notes.slice(0, 3);
  const approvedProjects = galleryProjects.filter(
    (p) => p.metadata.status === "approved" || p.metadata.status === "featured",
  );
  const pendingProjects = galleryProjects.filter(
    (p) => p.metadata.status === "pending",
  );

  return (
    <main className="min-h-dvh bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-page py-8">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-swiss-red/10 text-swiss-red flex h-16 w-16 items-center justify-center">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome back, {user?.firstName || "Learner"}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {enrollment ? (
                <>
                  {accessLevel === "full"
                    ? "Convergence"
                    : accessLevel.replace(/_/g, " ")}{" "}
                  access
                </>
              ) : (
                "Free access"
              )}
            </p>
          </div>
        </div>

        {/* Continue Learning Section */}
        {lastActivity && lastActivity.status !== "completed" && (
          <div className="mb-8">
            <ContinueLearning
              lessonPath={lastActivity.lessonPath}
              lessonTitle={lastActivity.lessonTitle}
            />
          </div>
        )}

        {/* Progress Overview */}
        <section className="mb-12 rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Trophy className="text-swiss-red h-5 w-5" />
              Your Progress
            </h2>
            <Link
              href="/course"
              className="text-swiss-red flex items-center gap-1 text-sm hover:underline"
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="text-swiss-red text-3xl font-bold tabular-nums">
                {stats.completedCount}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Lessons Completed
              </div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="text-3xl font-bold tabular-nums">
                {stats.completionPercentage}%
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Course Progress
              </div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex items-center gap-2 text-3xl font-bold">
                <Clock className="h-6 w-6 text-neutral-400" />
                {stats.totalTimeFormatted}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Time Invested
              </div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="text-3xl font-bold tabular-nums">
                {certificates.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Certificates Earned
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm text-neutral-500">
              <span className="tabular-nums">
                {stats.completedCount} of {stats.totalLessons} lessons
              </span>
              <span className="tabular-nums">
                {stats.completionPercentage}% complete
              </span>
            </div>
            <div className="h-2 w-full rounded-none bg-neutral-200 dark:bg-neutral-700">
              <div
                className="bg-swiss-red h-full transition-all"
                style={{ width: `${stats.completionPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/course/notes"
            className="group hover:border-swiss-red flex items-center gap-4 border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <StickyNote className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex-1">
              <h3 className="group-hover:text-swiss-red font-bold">My Notes</h3>
              <p className="text-sm text-neutral-500">{notes.length} notes</p>
            </div>
            <ArrowRight className="group-hover:text-swiss-red h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/course/certificate"
            className="group hover:border-swiss-red flex items-center gap-4 border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="bg-swiss-red/10 flex h-12 w-12 items-center justify-center">
              <Award className="text-swiss-red h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="group-hover:text-swiss-red font-bold">
                Certificates
              </h3>
              <p className="text-sm text-neutral-500">
                {certificates.length} earned
                {eligibleForCertificates > 0 && (
                  <span className="text-swiss-red ml-2">
                    ({eligibleForCertificates} to claim)
                  </span>
                )}
              </p>
            </div>
            <ArrowRight className="group-hover:text-swiss-red h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/course/gallery"
            className="group hover:border-swiss-red flex items-center gap-4 border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <FolderKanban className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex-1">
              <h3 className="group-hover:text-swiss-red font-bold">
                Project Gallery
              </h3>
              <p className="text-sm text-neutral-500">Browse student work</p>
            </div>
            <ArrowRight className="group-hover:text-swiss-red h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Recent Notes */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <StickyNote className="h-5 w-5 text-neutral-500" />
              Recent Notes
            </h2>
            {notes.length > 3 && (
              <Link
                href="/course/notes"
                className="text-swiss-red flex items-center gap-1 text-sm hover:underline"
              >
                View all ({notes.length})
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>

          {recentNotes.length === 0 ? (
            <div className="rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <StickyNote className="mx-auto h-10 w-10 text-neutral-300" />
              <p className="mt-3 text-neutral-500">No notes yet</p>
              <p className="mt-1 text-sm text-neutral-400">
                Take notes whilst learning to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  href={`/course/${note.metadata.lesson_path}`}
                  className="group hover:border-swiss-red block rounded-none border border-neutral-200 bg-white p-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <p className="text-xs text-neutral-400">
                    {note.metadata.lesson_path
                      .split("/")
                      .slice(-2)
                      .join(" / ")
                      .replace(/-/g, " ")}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm">
                    {note.metadata.content || (
                      <span className="text-neutral-400 italic">
                        Empty note
                      </span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Gallery Submissions */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <FolderKanban className="h-5 w-5 text-neutral-500" />
              My Project Submissions
            </h2>
            {enrollment && (
              <Button
                href="/course/gallery/submit"
                startContent={<PlusCircle className="h-4 w-4" />}
                className="text-sm"
              >
                Submit Project
              </Button>
            )}
          </div>

          {galleryProjects.length === 0 ? (
            <div className="rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <FolderKanban className="mx-auto h-10 w-10 text-neutral-300" />
              <p className="mt-3 text-neutral-500">No projects submitted yet</p>
              <p className="mt-1 text-sm text-neutral-400">
                Complete a capstone project and share your work with the
                community
              </p>
              {enrollment ? (
                <Button
                  href="/course/gallery/submit"
                  startContent={<Send className="h-4 w-4" />}
                  className="mt-4 text-sm"
                >
                  Submit Your First Project
                </Button>
              ) : (
                <p className="mt-4 text-sm text-neutral-500">
                  <Link
                    href="/course/pricing"
                    className="text-swiss-red hover:underline"
                  >
                    Enrol in the course
                  </Link>{" "}
                  to submit projects
                </p>
              )}
            </div>
          ) : (
            <>
              {pendingProjects.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-sm text-neutral-500">
                    Pending Review ({pendingProjects.length})
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pendingProjects.map((project) => (
                      <GalleryProjectCard
                        key={project.id}
                        project={project}
                        showStatus
                      />
                    ))}
                  </div>
                </div>
              )}
              {approvedProjects.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-neutral-500">
                    Published ({approvedProjects.length})
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {approvedProjects.map((project) => (
                      <GalleryProjectCard
                        key={project.id}
                        project={project}
                        showStatus
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Certificates Preview */}
        {certificates.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Award className="text-swiss-red h-5 w-5" />
                Earned Certificates
              </h2>
              <Link
                href="/course/certificate"
                className="text-swiss-red flex items-center gap-1 text-sm hover:underline"
              >
                Manage Certificates
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="border-swiss-red/20 bg-swiss-red/2.5 dark:border-swiss-red/30 dark:bg-swiss-red/5 flex items-center gap-3 border p-4"
                >
                  <Award className="text-swiss-red h-8 w-8" />
                  <div>
                    <p className="font-medium">
                      {cert.metadata.platform === "web" &&
                        "Web Design Engineer"}
                      {cert.metadata.platform === "ios" &&
                        "iOS Design Engineer"}
                      {cert.metadata.platform === "android" &&
                        "Android Design Engineer"}
                    </p>
                    <p className="text-swiss-red text-xs">
                      {new Date(cert.metadata.issued_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Help Section */}
        <section className="rounded-none border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 text-lg font-bold">Need Help?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/course/faq"
              className="hover:text-swiss-red flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <BookOpen className="h-4 w-4" />
              Frequently Asked Questions
            </Link>
            <a
              href="mailto:hello@designengineer.xyz"
              className="hover:text-swiss-red flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <ExternalLink className="h-4 w-4" />
              Contact Support
            </a>
            <Link
              href="/course/refund-policy"
              className="hover:text-swiss-red flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <BookOpen className="h-4 w-4" />
              Refund Policy
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
