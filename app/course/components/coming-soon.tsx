import { PageHeader } from "@/app/components/page-header";
import {
  Book as BookOpen,
  Code as Code2,
  LayoutLeft as Layout,
  Bell,
  CheckCircle as CheckCircle2,
  Crown,
} from "iconoir-react";
import { StudentCompanies } from "./student-companies";
import { NewsletterSignup } from "./newsletter-signup";
import { FAQAccordion } from "../faq/faq-accordion";
import { CurriculumPreview } from "./curriculum-preview";

const faqs = [
  {
    q: "What is Design Engineering?",
    a: "Design Engineering sits at the intersection of design and front-end development. Design Engineers can take a concept from idea to shipped product—they understand visual design principles, can prototype interactions, and write production-ready code. This course teaches you both disciplines so you can bridge the gap between design and engineering teams.",
  },
  {
    q: "Who is this course for?",
    a: "The Design Track is for engineers who want to develop design skills. The Engineering Track is for designers who want to learn to code properly, not just Vibe Code. Convergence is for people starting their career or those who want to master both disciplines.",
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
    a: "Yes! Students with a valid university email (.edu, .ac.uk, etc.) receive 30% off any purchase. Enter your student email in the discount form on our pricing page — we'll automatically verify it and instantly email you a unique discount code to use at checkout. No manual verification needed.",
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

      {/* Curriculum Preview */}
      <CurriculumPreview />

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Highlights */}
          <div className="mb-16 border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-6 text-xl font-bold">What&apos;s Included</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="text-swiss-red mt-0.5 h-5 w-5 shrink-0" />
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
                <div className="text-swiss-red mb-1 text-xs font-medium tracking-wider uppercase">
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
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    48+ design lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    All 3 platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              {/* Engineering Full */}
              <div className="border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-1 text-xs font-medium tracking-wider text-neutral-500 uppercase">
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
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    67+ engineering lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    All 3 platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              {/* Convergence */}
              <div className="border-swiss-red bg-swiss-red/[0.025] dark:bg-swiss-red/5 border-2 p-6">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-swiss-red text-xs font-bold tracking-wider uppercase">
                    Best Value
                  </span>
                  <Crown className="text-swiss-red h-3 w-3" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Convergence</h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  Everything — Design + Engineering + exclusive content
                </p>
                <div className="mb-4">
                  <span className="text-swiss-red text-3xl font-bold">
                    £599
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    ALL 156+ lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    Exclusive advanced content
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-swiss-red h-4 w-4" />
                    Lifetime access + updates
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Individual platform tracks from £99 · Students get 30% off ·
              14-day money-back guarantee
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="border-swiss-red mb-16 border bg-white p-8 dark:bg-neutral-900">
            <div className="flex flex-col items-center text-center">
              <div className="bg-swiss-red mb-4 flex h-12 w-12 items-center justify-center">
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
            <h2 className="mb-6 text-xl font-bold">
              Frequently Asked Questions
            </h2>
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
