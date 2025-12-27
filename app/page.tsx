import { Suspense } from "react";
import PageTitle from "./components/page-title";
import {
  getHome,
  getSponsors,
  getPosts,
  getCourseAvailability,
} from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { RandomisedPosts } from "@/app/components/randomised-posts";
import { cn } from "@/lib/utils";
import SectionTitle from "./components/section-title";
import { Button } from "@/app/components/ui";
import NextLink from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Layout,
  Sparkles,
  Activity,
  Spline,
  Type as TypeIcon,
  Wrench,
  Blend,
  Layers,
  Palette,
  Pointer,
} from "lucide-react";
import SubmitArticle from "./components/submit-article";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { HeroIllustration } from "./components/hero-illustration";
import { FAQAccordion } from "./course/faq/faq-accordion";
import { AnimatedSection } from "./components/animated-section";
import { AnimatedGrid } from "./components/animated-grid";

async function HeroSection() {
  const home = await getHome();

  return (
    <div className="w-full border-b border-neutral-200 py-12 md:py-24 lg:py-32 dark:border-neutral-800">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Illustration - top on mobile, right on desktop */}
          <div className="order-first flex items-center justify-center lg:order-last lg:col-span-5">
            <div className="w-full max-w-md lg:max-w-none">
              <HeroIllustration />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-8 lg:col-span-7 lg:items-start">
            <PageTitle />
            <p className="max-w-2xl text-center text-lg text-neutral-500 md:text-xl lg:text-left dark:text-neutral-400">
              {home.metadata.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <SignedOut>
                <Button href="/sign-up" size="xl">
                  Sign up
                </Button>
              </SignedOut>
              <Button
                href="/course"
                variant="outline"
                size="xl"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Explore the course
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

async function PostsSection() {
  const posts = await getPosts();

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

async function SponsorsSection() {
  const sponsors = await getSponsors();

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
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
            >
              <Image
                src={`${sponsor.metadata.logo.imgix_url}?w=200&auto=format`}
                alt={sponsor.title}
                width={200}
                height={48}
                className="h-8 w-auto md:h-10"
              />
            </div>
          ))}
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
    <AnimatedSection
      as="div"
      className="w-full border-t border-neutral-200 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="container-readable">
        <div className="mb-8 text-center">
          <p className="heading-eyebrow mb-2">Questions?</p>
          <h2 className="heading-section">Frequently Asked Questions</h2>
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
    icon: Activity,
    title: "Spring Physics",
    description:
      "Visualise and export spring animations for Motion, CSS, SwiftUI & Android",
    href: "/tools/spring-physics",
    category: "Animation",
  },
  {
    icon: Spline,
    title: "Easing Generator",
    description: "Design custom cubic-bezier curves with interactive controls",
    href: "/tools/easing-generator",
    category: "Animation",
  },
  {
    icon: Blend,
    title: "Gradient Generator",
    description: "Create linear, radial & conic gradients for web and mobile",
    href: "/tools/gradient-generator",
    category: "Visual",
  },
  {
    icon: Layers,
    title: "Shadow Generator",
    description:
      "Design shadows with export for CSS, Tailwind, SwiftUI & React Native",
    href: "/tools/shadow-generator",
    category: "Visual",
  },
  {
    icon: Palette,
    title: "Colour Converter",
    description:
      "Convert between HEX, RGB, HSL, OKLCH and native mobile formats",
    href: "/tools/colour-converter",
    category: "Visual",
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
    icon: Pointer,
    title: "Touch Targets",
    description:
      "Validate accessibility against iOS, Android & WCAG guidelines",
    href: "/tools/touch-target",
    category: "Mobile",
  },
  {
    icon: Code2,
    title: "Framework Converter",
    description: "Convert components between React, Vue, Svelte, Astro & Solid",
    href: "/tools/framework-converter",
    category: "Code",
  },
];

function ToolsSection() {
  return (
    <AnimatedSection
      as="div"
      className="w-full border-y border-neutral-200 bg-neutral-50 py-16 md:py-20 dark:border-neutral-800 dark:bg-neutral-900/50"
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
              className="group hover:border-swiss-red dark:hover:border-swiss-red relative flex flex-col border border-neutral-200 bg-white p-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="group-hover:bg-swiss-red flex h-10 w-10 items-center justify-center bg-neutral-100 transition-colors dark:bg-neutral-800">
                  <tool.icon className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400" />
                </div>
                <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">
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

async function CourseSection() {
  const { is_available: isCourseAvailable } = await getCourseAvailability();

  const tracks = [
    {
      icon: Layout,
      title: "Design Track",
      description:
        "Develop real design taste—visual fundamentals that AI can't teach",
      color: "bg-swiss-red",
    },
    {
      icon: Code2,
      title: "Engineering Track",
      description:
        "Go beyond Vibe Coding—build with real understanding, not just AI prompts",
      color: "bg-neutral-900 dark:bg-neutral-100",
    },
    {
      icon: Sparkles,
      title: "Convergence: All-Access",
      description:
        "Complete access - all tracks, all platforms, plus advanced topics like motion, prototyping, and workflow",
      color: "bg-neutral-500",
    },
  ];

  return (
    <AnimatedSection
      as="div"
      className="w-full border-b border-neutral-200 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/50"
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

        <AnimatedGrid className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group hover:border-swiss-red dark:hover:border-swiss-red relative flex h-full flex-col overflow-hidden border border-neutral-200 bg-white transition-colors dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 transition-all group-hover:h-2",
                  track.color,
                )}
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-50 transition-colors group-hover:bg-neutral-100 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                  <track.icon
                    className={cn(
                      "h-6 w-6 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none dark:text-white",
                    )}
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

        <div className="flex flex-col items-center gap-6 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-between dark:border-neutral-800">
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>150+ lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-swiss-red h-4 w-4" />
              <span>Free intro modules</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              href="/course"
              size="lg"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              {isCourseAvailable ? "Start Learning" : "Learn More"}
            </Button>
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
  return (
    <main className="min-h-screen w-full bg-white dark:bg-black">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<CourseSectionSkeleton />}>
        <CourseSection />
      </Suspense>

      <ToolsSection />

      <div className="container-page py-16 md:py-24">
        <AnimatedSection
          as="div"
          className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-neutral-200 pb-8 md:flex-row md:items-end dark:border-neutral-800"
        >
          <SectionTitle>Latest Insights</SectionTitle>

          <div className="flex items-center gap-4">
            <Button
              href="/posts"
              endContent={<ArrowRight className="h-4 w-4" />}
              variant="ghost"
              className="hover:text-swiss-red dark:hover:text-swiss-red px-0 text-sm font-bold tracking-wider text-neutral-600 uppercase hover:bg-transparent dark:text-neutral-400"
            >
              All articles
            </Button>
          </div>
        </AnimatedSection>

        <Suspense fallback={<PostsSkeleton />}>
          <PostsSection />
        </Suspense>

        <AnimatedSection
          as="div"
          className="mt-24 flex w-full items-center justify-center"
        >
          <SubmitArticle />
        </AnimatedSection>

        <Suspense fallback={<SponsorsSkeleton />}>
          <SponsorsSection />
        </Suspense>
      </div>

      <FAQSection />
    </main>
  );
}
