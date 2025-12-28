import { PageHeader } from "@/app/components/page-header";
import {
  BookOpen,
  Code2,
  Layout,
  Zap,
  Bell,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { StudentCompanies } from "./student-companies";
import { NewsletterSignup } from "./newsletter-signup";
import { FAQAccordion } from "../faq/faq-accordion";

const faqs = [
  {
    q: "What is Design Engineering?",
    a: "Design Engineering sits at the intersection of design and front-end development. Design Engineers can take a concept from idea to shipped product—they understand visual design principles, can prototype interactions, and write production-ready code. This course teaches you both disciplines so you can bridge the gap between design and engineering teams.",
  },
  {
    q: "Who is this course for?",
    a: "This course is designed for two types of learners: (1) Designers who want to go beyond Vibe Coding—instead of prompting AI and hoping for the best, you'll develop real skills to understand implementation, own the build process, and create work that stands up to scrutiny. (2) Engineers who want to ship beautiful, thoroughly considered UIs—not just functional code, but polished interfaces that users love, with the design taste to make confident visual decisions.",
  },
  {
    q: "Do I need any prior experience?",
    a: "No prior experience is required for the beginner tracks. The Engineering Track assumes no design tool knowledge and starts from terminal basics. The Design Track assumes no prior design knowledge and teaches visual fundamentals from scratch. However, you should be comfortable using a computer and have a genuine interest in building digital products.",
  },
  {
    q: "What platforms does the course cover?",
    a: "The course covers three platforms: Web (HTML, CSS, JavaScript), iOS (Swift, SwiftUI), and Android (Kotlin, Jetpack Compose). Each platform has its own Design Track, Engineering Track, and Convergence modules so you can specialise in your preferred platform.",
  },
  {
    q: "How does pricing work?",
    a: "We offer flexible pricing options: individual platform tracks (e.g., Design Web only) from £99, full track access (all platforms within Design or Engineering) from £299, or Convergence All-Access at £599 which includes everything plus exclusive advanced content. All purchases are one-time payments with lifetime access—no subscriptions.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes! Students with a valid .edu or university email address receive 30% off any purchase. Simply sign up with your student email and we'll send you a discount code.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! The introduction module and the first lesson of each track are completely free—no credit card required. This lets you experience the course quality and teaching style before purchasing.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with the course for any reason, contact us within 14 days of purchase for a full refund—no questions asked.",
  },
];

export function ComingSoon() {
  const tracks = [
    {
      icon: Layout,
      title: "Design Track",
      description:
        "Develop real design taste—visual fundamentals that AI can't teach.",
      color: "bg-swiss-red",
    },
    {
      icon: Code2,
      title: "Engineering Track",
      description:
        "Go beyond Vibe Coding—build with real understanding, not just AI prompts.",
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

          {/* Pricing Preview */}
          <div className="mb-16">
            <h2 className="mb-2 text-center text-2xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="mb-8 text-center text-neutral-600 dark:text-neutral-400">
              One-time payment. Lifetime access. No subscriptions.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Design Full */}
              <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-swiss-red">
                  Design Track
                </div>
                <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  All design content across Web, iOS & Android
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">£299</span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    48+ design lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    All 3 platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              {/* Engineering Full */}
              <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Engineering Track
                </div>
                <h3 className="mb-2 text-lg font-bold">Full Access</h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  All engineering content across Web, iOS & Android
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">£349</span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    67+ engineering lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    All 3 platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              {/* Convergence */}
              <div className="border-2 border-swiss-red bg-swiss-red/5 p-6 dark:bg-swiss-red/10">
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
                </div>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    ALL 156+ lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    Exclusive advanced content
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-swiss-red" />
                    Lifetime access + updates
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Individual platform tracks from £99 · Students get 30% off · 14-day money-back guarantee
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-16 border border-swiss-red bg-white p-8 dark:bg-neutral-900">
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

          {/* FAQ Section */}
          <div className="border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-6 text-xl font-bold">Frequently Asked Questions</h2>
            <FAQAccordion questions={faqs} />
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-500">
                Have more questions?{" "}
                <a
                  href="mailto:hello@designengineer.xyz"
                  className="text-swiss-red hover:underline"
                >
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
