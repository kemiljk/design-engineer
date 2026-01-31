import { Suspense } from "react";
import PageTitle from "./components/page-title";
import {
  getHome,
  getSponsors,
  getPosts,
  getCourseAvailability,
} from "@/lib/cosmic";
import { getCourse } from "@/lib/course";
import * as Type from "@/lib/types";
import { RandomisedPosts } from "@/app/components/randomised-posts";
import { cn } from "@/lib/utils";
import SectionTitle from "./components/section-title";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui";
import { TrackLogo } from "@/app/components/track-logo";
import NextLink from "next/link";
import {
  NavArrowRight as ArrowRight,
  Book as BookOpen,
  Code as Code2,
  Gift,
  BounceRight,
  EaseCurveControlPoints,
  Text as TypeIcon,
  Wrench,
  Intersect as Blend,
  Combine as Layers,
  Palette,
  CursorPointer as Pointer,
  Label as Tags,
  StyleBorder,
  Union as Combine,
  ColorPicker,
} from "iconoir-react";
import SubmitArticle from "./components/submit-article";
import Image from "next/image";
import { HeroIllustrationWrapper } from "./components/hero-illustration-wrapper";
import { FAQAccordion } from "./course/faq/faq-accordion";
import { AnimatedSection } from "./components/animated-section";
import { AnimatedGrid } from "./components/animated-grid";
import { HowYoullLearnSection } from "./components/how-youll-learn";
import { WhoThisIsForSection } from "./components/who-this-is-for";
import { CurriculumPreviewHome } from "./components/curriculum-preview-home";
import Link from "next/link";

async function HeroSection({
  homePromise,
}: {
  homePromise: ReturnType<typeof getHome>;
}) {
  const home = await homePromise;

  return (
    <div className="w-full border-b border-neutral-200 py-12 md:py-24 lg:py-32 dark:border-neutral-800">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Illustration - top on mobile, right on desktop */}
          <div className="order-first flex items-center justify-center lg:order-last lg:col-span-5">
            <div className="w-full max-w-md lg:max-w-none">
              <HeroIllustrationWrapper />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-8 lg:col-span-7 lg:items-start">
            <PageTitle />
            <p className="max-w-2xl text-center text-lg text-neutral-500 md:text-xl lg:text-left dark:text-neutral-400">
              {home.metadata.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button
                href="/course"
                size="xl"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Start free lessons
              </Button>
              <Button href="/course/pricing" variant="outline" size="xl">
                View course pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 py-12 md:py-24 lg:py-32 dark:border-neutral-800">
      <div className="container-page">
        <div className="flex flex-col items-start gap-8">
          <div className="h-12 w-3/4 animate-pulse bg-neutral-100 lg:w-1/2 dark:bg-neutral-800" />
          <div className="h-24 w-full max-w-2xl animate-pulse bg-neutral-100 dark:bg-neutral-800" />
          <div className="flex gap-4">
            <div className="h-12 w-32 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-12 w-48 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function PostsSection({
  postsPromise,
}: {
  postsPromise: ReturnType<typeof getPosts>;
}) {
  const posts = await postsPromise;

  return <RandomisedPosts posts={posts} count={3} />;
}

function PostsSkeleton() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 w-full animate-pulse bg-neutral-100 dark:bg-neutral-800"
        />
      ))}
    </div>
  );
}

async function SponsorsSection({
  sponsorsPromise,
}: {
  sponsorsPromise: Promise<Awaited<ReturnType<typeof getSponsors>>>;
}) {
  const sponsors = await sponsorsPromise;

  return (
    <AnimatedSection
      as="div"
      className="mt-24 w-full border-t border-neutral-200 py-12 dark:border-neutral-800"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
          Supported by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <TooltipProvider>
            {sponsors.map((sponsor) => (
              <Tooltip key={sponsor.id}>
                <TooltipTrigger
                  render={
                    <Link
                      href={sponsor.metadata.url}
                      className="transition-saturate flex items-center gap-2 saturate-0 hover:saturate-100"
                    >
                      <Image
                        src={`${sponsor.metadata.logo.imgix_url}?w=200&auto=format`}
                        alt={sponsor.title}
                        width={200}
                        height={48}
                        className="h-8 w-auto md:h-10"
                      />
                    </Link>
                  }
                />
                <TooltipContent>
                  <p>{sponsor.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </AnimatedSection>
  );
}

function SponsorsSkeleton() {
  return (
    <div className="mt-24 w-full border-t border-neutral-200 py-12 dark:border-neutral-800">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="h-4 w-32 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-10 w-64 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

const homepageFaqs = [
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
    q: "Is there a free trial?",
    a: "Yes! The introduction module and the first lesson of each track are completely free—no credit card required. This lets you experience the course quality and teaching style before purchasing.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with the course for any reason, contact us within 14 days of purchase for a full refund—no questions asked.",
  },
];

function FAQSection() {
  return (
    <AnimatedSection as="div" variant="secondary">
      <div className="container-readable">
        <div className="mb-8 text-center">
          <p className="heading-eyebrow mb-2">About the course</p>
          <h2 className="heading-section">Common Questions</h2>
        </div>
        <FAQAccordion questions={homepageFaqs} />
        <div className="mt-8 text-center">
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
    </AnimatedSection>
  );
}

const featuredTools = [
  {
    icon: Code2,
    title: "Framework Converter",
    description: "Convert components between React, Vue, Svelte, Astro & Solid",
    href: "/tools/framework-converter",
    category: "Code",
  },
  {
    icon: BounceRight,
    title: "Spring Physics",
    description:
      "Visualise and export spring animations for Motion, CSS, SwiftUI & Android",
    href: "/tools/spring-physics",
    category: "Animation",
  },
  {
    icon: Tags,
    title: "Token Naming",
    description:
      "Build consistent semantic token names with auto-generated variants",
    href: "/tools/token-naming",
    category: "Systems",
  },
  {
    icon: TypeIcon,
    title: "Token Calculator",
    description:
      "Generate typography and spacing scales for Tailwind v4, CSS or SCSS",
    href: "/tools/token-calculator",
    category: "Systems",
  },
  {
    icon: StyleBorder,
    title: "Corner Radius Calculator",
    description:
      "Calculate harmonious nested corner radii for optically perfect components",
    href: "/tools/corner-radius",
    category: "Visual",
  },
  {
    icon: Combine,
    title: "Blend Mode Explorer",
    description:
      "Learn how blend modes work and experiment with stacking effects",
    href: "/tools/blend-mode-explorer",
    category: "Visual",
  },
  {
    icon: EaseCurveControlPoints,
    title: "Easing Generator",
    description: "Design custom cubic-bezier curves with interactive controls",
    href: "/tools/easing-generator",
    category: "Animation",
  },
  {
    icon: Pointer,
    title: "Touch Targets",
    description:
      "Validate accessibility against iOS, Android & WCAG guidelines",
    href: "/tools/touch-target",
    category: "Mobile",
  },
];

function ToolsSection() {
  return (
    <AnimatedSection
      as="div"
      className="w-full border-y border-neutral-200 py-16 md:py-20 dark:border-neutral-800"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-swiss-red flex h-8 w-8 items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="heading-eyebrow">Free Tools</span>
            </div>
            <h2 className="heading-section">Design Engineering Toolkit</h2>
            <p className="mt-2 max-w-xl text-neutral-500 dark:text-neutral-400">
              Professional utilities for animation, colour, typography, and
              cross-platform development. No sign-up required.
            </p>
          </div>
          <NextLink
            href="/tools"
            className="group flex items-center gap-2 bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            View all tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NextLink>
        </div>

        {/* Tools Grid */}
        <AnimatedGrid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <NextLink
              key={tool.title}
              href={tool.href}
              className="group hover:border-swiss-red dark:hover:border-swiss-red relative flex h-full flex-col border border-neutral-200 bg-white p-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="group-hover:bg-swiss-red flex h-10 w-10 items-center justify-center bg-neutral-100 transition-colors dark:bg-neutral-800">
                  <tool.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400"
                  />
                </div>
                <span className="text-xxs font-medium tracking-wider text-neutral-400 uppercase">
                  {tool.category}
                </span>
              </div>
              <h3 className="heading-card mb-1.5">{tool.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {tool.description}
              </p>
              <div className="text-swiss-red mt-3 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight className="h-3 w-3" />
              </div>
            </NextLink>
          ))}
        </AnimatedGrid>
      </div>
    </AnimatedSection>
  );
}

function DesignEngineeringSection() {
  return (
    <AnimatedSection as="div" variant="primary">
      <div className="container-page">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="heading-eyebrow mb-4">The discipline</p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            The space where design
            <br />
            <span className="text-neutral-500 dark:text-neutral-400">
              meets implementation.
            </span>
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
            Design Engineers operate in the overlap between design and code.
            Fluent in both languages, they translate between them without losing
            fidelity. Not just good at both. A distinct discipline.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              href="/design-engineering"
              variant="outline"
              size="lg"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              What is a Design Engineer?
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

const outcomes = [
  "Ship production animation systems in React, SwiftUI, and CSS",
  "Translate design specs into code without losing visual fidelity",
  "Build and maintain cross-platform design tokens",
  "Debug layout issues in browser and device inspectors",
  "Speak fluently to both designers and engineers",
];

async function CourseSection({
  coursePromise,
}: {
  coursePromise: Promise<
    [{ is_available: boolean }, Awaited<ReturnType<typeof getCourse>>]
  >;
}) {
  const [{ is_available: isCourseAvailable }, course] = await coursePromise;

  const tracks = [
    {
      track: "design" as const,
      title: "Design Track",
      description: "For engineers. Visual fundamentals that AI can't teach you",
      color: "bg-swiss-red",
    },
    {
      track: "engineering" as const,
      title: "Engineering Track",
      description: "For designers. Go beyond Vibe Coding and build it yourself",
      color: "bg-neutral-900 dark:bg-neutral-100",
    },
    {
      track: "convergence" as const,
      title: "Convergence: All-Access",
      description:
        "Starting out, or want both? All tracks, all platforms, plus advanced topics",
      color: "bg-neutral-500",
    },
  ];

  return (
    <AnimatedSection
      as="div"
      variant="secondary"
    >
      <div className="container-page">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="heading-eyebrow mb-2">Learn Design Engineering</p>
            <h2 className="heading-section">The Complete Course</h2>
          </div>
          <p className="max-w-md text-neutral-500 dark:text-neutral-400">
            For designers going beyond Vibe Coding, and engineers shipping
            beautiful, thoroughly considered interfaces.
          </p>
        </div>

        <div className="mb-16 grid gap-12 lg:grid-cols-12">
          {/* Tracks Grid */}
          <div className="lg:col-span-7">
            <AnimatedGrid className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className={cn(
                    "group hover:border-swiss-red dark:hover:border-swiss-red relative flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition-colors dark:border-neutral-800 dark:bg-neutral-900",
                    track.track === "convergence" ? "md:col-span-2" : "",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 transition-all group-hover:h-2",
                      track.color,
                    )}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-50 transition-colors group-hover:bg-neutral-100 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                      <TrackLogo
                        track={track.track}
                        showLayer="track"
                        size={28}
                        className="text-neutral-900 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none dark:text-white"
                      />
                    </div>
                    <h3 className="heading-card mb-2">{track.title}</h3>
                    <p className="flex-1 text-neutral-500 dark:text-neutral-400">
                      {track.description}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedGrid>
          </div>

          {/* Outcomes List */}
          <div className="flex flex-col justify-start lg:col-span-5 lg:pl-8">
            <h3 className="mb-6 text-lg font-bold">
              After this course, you&apos;ll be able to:
            </h3>
            <ul className="space-y-4">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <div className="bg-swiss-red/10 text-swiss-red mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-between dark:border-neutral-800">
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{course.totalLessons}+ lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="text-swiss-red h-4 w-4" />
              <span>Free intro modules</span>
            </div>
          </div>
          <div className="flex gap-4">
            <NextLink
              href={isCourseAvailable ? "/course" : "/course"}
              className="focus-ring group bg-swiss-red inline-flex h-10 items-center justify-center gap-2 px-6 text-sm font-semibold text-white transition-[color,background-color,transform] duration-150 ease-out hover:bg-neutral-900 active:translate-y-0.5 dark:hover:bg-white dark:hover:text-black"
            >
              {isCourseAvailable ? "Start Free Lessons" : "Learn More"}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
            </NextLink>
            <div className="flex flex-col items-start gap-1">
              <Button href="/course/pricing" variant="outline" size="lg">
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function CourseSectionSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="container-page">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="h-24 w-64 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-16 w-96 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 w-full animate-pulse bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const homePromise = getHome();
  const postsPromise = getPosts();
  const sponsorsPromise = getSponsors();
  const coursePromise = Promise.all([getCourseAvailability(), getCourse()]);

  return (
    <main className="min-h-dvh w-full bg-white dark:bg-black">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection homePromise={homePromise} />
      </Suspense>

      <DesignEngineeringSection />

      <Suspense fallback={<CourseSectionSkeleton />}>
        <CourseSection coursePromise={coursePromise} />
      </Suspense>

      <HowYoullLearnSection />

      <WhoThisIsForSection />

      <Suspense>
        <CurriculumPreviewHome />
      </Suspense>

      <FAQSection />

      <ToolsSection />

      <div className="container-page py-16 md:py-24">
        <AnimatedSection
          as="div"
          className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-neutral-200 pb-8 md:flex-row md:items-end dark:border-neutral-800"
        >
          <SectionTitle>Latest Insights</SectionTitle>

          <div className="flex items-center gap-4">
            <NextLink
              href="/posts"
              className="group flex items-center gap-2 bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              All articles
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </AnimatedSection>

        <Suspense fallback={<PostsSkeleton />}>
          <PostsSection postsPromise={postsPromise} />
        </Suspense>

        <AnimatedSection
          as="div"
          className="mt-24 flex w-full items-center justify-center"
        >
          <SubmitArticle />
        </AnimatedSection>

        <Suspense fallback={<SponsorsSkeleton />}>
          <SponsorsSection sponsorsPromise={sponsorsPromise} />
        </Suspense>
      </div>
    </main>
  );
}
