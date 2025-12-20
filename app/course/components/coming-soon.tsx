import { PageHeader } from "@/app/components/page-header";
import {
  BookOpen,
  Code2,
  Layout,
  Zap,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { StudentCompanies } from "./student-companies";
import { NewsletterSignup } from "./newsletter-signup";

export function ComingSoon() {
  const tracks = [
    {
      icon: Layout,
      title: "Design Track",
      description:
        "Master visual design, typography, layout, and platform-specific design patterns.",
      color: "bg-swiss-red",
    },
    {
      icon: Code2,
      title: "Engineering Track",
      description:
        "Learn HTML, CSS, JavaScript, Swift, SwiftUI, Kotlin, and Compose.",
      color: "bg-neutral-900 dark:bg-neutral-100",
    },
    {
      icon: Zap,
      title: "Convergence",
      description:
        "Where design meets code. Motion, prototyping, accessibility, and polish.",
      color: "bg-neutral-500",
    },
  ];

  const highlights = [
    "Platform-specific tracks for Web, iOS, and Android",
    "Real-world projects and exercises",
    "Certificate upon completion",
    "Learn at your own pace",
    "Built by Design Engineers, for Design Engineers",
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title={
          <>
            Become a <span className="text-swiss-red">Design Engineer</span>
          </>
        }
        description="A comprehensive course to master the intersection of design and engineering. Coming soon."
      >
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>50+ lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>3 tracks</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            <span>Web, iOS, Android</span>
          </div>
        </div>

        <StudentCompanies />
      </PageHeader>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Tracks Preview */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Three Tracks to Mastery
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center ${track.color}`}
                  >
                    <track.icon className="h-5 w-5 text-white dark:text-black" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{track.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {track.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-16 border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-6 text-xl font-bold">What&apos;s Included</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-swiss-red" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border border-swiss-red bg-white p-8 dark:bg-neutral-900">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-swiss-red">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h2 className="mb-2 text-xl font-bold">Get Notified at Launch</h2>
              <p className="mb-6 max-w-md text-neutral-600 dark:text-neutral-400">
                Be the first to know when the course launches. Early subscribers
                get exclusive access and launch pricing.
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
