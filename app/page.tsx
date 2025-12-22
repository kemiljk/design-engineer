import { Suspense } from "react";
import PageTitle from "./components/page-title";
import { getHome, getSponsors, getPosts, getCourseAvailability } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { RandomisedPosts } from "@/app/components/randomised-posts";
import cn from "classnames";
import SectionTitle from "./components/section-title";
import { StyledButton } from "../app/components/styled-button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { ArrowRight, BookOpen, Code2, Layout, Sparkles, Activity, Spline, Type as TypeIcon, Wrench, Blend, Layers, Palette, Pointer } from "lucide-react";
import SubmitArticle from "./components/submit-article";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { HeroIllustration } from "./components/hero-illustration";
import { FAQAccordion } from "./course/faq/faq-accordion";

async function HeroSection() {
  const home = await getHome();

  return (
    <div className="w-full border-b border-neutral-200 py-12 dark:border-neutral-800 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
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
            <p className="max-w-2xl text-center text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-2xl lg:text-left">
              {home.metadata.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <SignedOut>
                <StyledButton
                  as={Link}
                  color="primary"
                  variant="stylised"
                  href="/sign-up"
                  className="h-12 px-8 text-base font-bold uppercase tracking-wider"
                >
                  Sign up
                </StyledButton>
              </SignedOut>
              <StyledButton
                as={Link}
                href="/course"
                variant="outline"
                endContent={<ArrowRight className="h-4 w-4" />}
                className="h-12 px-8 text-base font-medium uppercase tracking-wider"
              >
                Explore the course
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 py-12 dark:border-neutral-800 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-start gap-8">
          <div className="h-12 w-3/4 animate-pulse bg-neutral-100 dark:bg-neutral-800 lg:w-1/2" />
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
    <div className="mt-24 w-full border-t border-neutral-200 py-12 dark:border-neutral-800">
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Supported by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex items-center gap-2 grayscale transition-all hover:grayscale-0"
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
    </div>
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
    a: "No prior experience is required for the beginner tracks. The Design Track assumes no coding knowledge, and the Engineering Track starts from the fundamentals. However, you should be comfortable using a computer and have a genuine interest in building digital products.",
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
    <div className="w-full border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="mb-8 text-center">
          <p className="text-swiss-red mb-2 font-mono text-xs uppercase tracking-widest">
            Questions?
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
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
    </div>
  );
}

const featuredTools = [
  {
    icon: Activity,
    title: "Spring Physics",
    description: "Visualise and export spring animations for Framer Motion, CSS, SwiftUI & Android",
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
    description: "Design shadows with export for CSS, Tailwind, SwiftUI & React Native",
    href: "/tools/shadow-generator",
    category: "Visual",
  },
  {
    icon: Palette,
    title: "Colour Converter",
    description: "Convert between HEX, RGB, HSL, OKLCH and native mobile formats",
    href: "/tools/colour-converter",
    category: "Visual",
  },
  {
    icon: TypeIcon,
    title: "Token Calculator",
    description: "Generate typography and spacing scales for Tailwind v4, CSS or SCSS",
    href: "/tools/token-calculator",
    category: "Systems",
  },
  {
    icon: Pointer,
    title: "Touch Targets",
    description: "Validate accessibility against iOS, Android & WCAG guidelines",
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
    <div className="w-full border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-swiss-red">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-swiss-red">
                Free Tools
              </span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Design Engineering Toolkit
            </h2>
            <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
              Professional utilities for animation, colour, typography, and cross-platform development. No sign-up required.
            </p>
          </div>
          <NextLink
            href="/tools"
            className="group flex items-center gap-2 bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            View all 12 tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NextLink>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <NextLink
              key={tool.title}
              href={tool.href}
              className="group relative flex flex-col border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 transition-colors group-hover:bg-swiss-red dark:bg-neutral-800">
                  <tool.icon className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                  {tool.category}
                </span>
              </div>
              <h3 className="mb-1 font-bold text-neutral-900 dark:text-white">
                {tool.title}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                {tool.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-swiss-red opacity-0 transition-opacity group-hover:opacity-100">
                Open tool
                <ArrowRight className="h-3 w-3" />
              </div>
            </NextLink>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">100%</span>
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">Web + Mobile</span>
            <span>Platform support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">Tailwind v4</span>
            <span>Ready exports</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">No login</span>
            <span>Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function CourseSection() {
  const { is_available: isCourseAvailable } = await getCourseAvailability();
  
  const tracks = [
    {
      icon: Layout,
      title: "Design Track",
      description:
        "Go beyond Vibe Coding—develop real design taste that AI can't replicate",
      color: "bg-swiss-red",
    },
    {
      icon: Code2,
      title: "Engineering Track",
      description:
        "Ship beautiful, thoroughly considered UIs that users love",
      color: "bg-neutral-900 dark:bg-neutral-100",
      iconColor: "text-white dark:text-neutral-900",
    },
    {
      icon: Sparkles,
      title: "Convergence: All-Access",
      description:
        "Complete course access - all tracks, all platforms, plus advanced topics like motion, prototyping, and workflow",
      color: "bg-neutral-500",
    },
  ];

  return (
    <div className="w-full border-b border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-swiss-red mb-2 font-mono text-xs uppercase tracking-widest">
              Learn Design Engineering
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              The Complete Course
            </h2>
          </div>
          <p className="max-w-md text-neutral-600 dark:text-neutral-400">
            For designers going beyond Vibe Coding, and engineers shipping
            beautiful, thoroughly considered interfaces.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group relative overflow-hidden border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 transition-all group-hover:h-2",
                  track.color,
                )}
              />
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-neutral-50 dark:bg-neutral-800">
                  <track.icon className="h-6 w-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{track.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {track.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:flex-row sm:justify-between">
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
            <NextLink
              href="/course"
              className="bg-swiss-red flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
            >
              {isCourseAvailable ? "Start Learning" : "Learn More"}
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseSectionSkeleton() {
  return (
    <div className="w-full border-b border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
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

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-neutral-200 pb-8 dark:border-neutral-800 md:flex-row md:items-end">
          <SectionTitle>Latest Insights</SectionTitle>

          <div className="flex items-center gap-4">
            <StyledButton
              as={Link}
              href="/posts"
              endContent={<ArrowRight className="h-4 w-4" />}
              variant="light"
              className="hover:text-swiss-red dark:hover:text-swiss-red px-0 text-sm font-bold uppercase tracking-wider text-neutral-600 hover:bg-transparent dark:text-neutral-400"
            >
              All articles
            </StyledButton>
          </div>
        </div>

        <Suspense fallback={<PostsSkeleton />}>
          <PostsSection />
        </Suspense>

        <div className="mt-24 flex w-full items-center justify-center">
          <SubmitArticle />
        </div>

        <Suspense fallback={<SponsorsSkeleton />}>
          <SponsorsSection />
        </Suspense>
      </div>

      <FAQSection />
    </main>
  );
}
