import Image from "next/image";
import NextLink from "next/link";
import { NavArrowRight as ArrowRight } from "iconoir-react";
import { AnimatedSection } from "./animated-section";
import Link from "next/link";

export function InstructorSection() {
  return (
    <AnimatedSection
      as="div"
      className="w-full border-b border-neutral-200 py-16 md:py-24 dark:border-neutral-800"
    >
      <div className="container-page">
        <p className="heading-eyebrow mb-8">Your Instructor</p>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Headshot */}
          <div className="lg:col-span-4">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden border border-neutral-200 bg-neutral-100 lg:max-w-none dark:border-neutral-800 dark:bg-neutral-900">
              <Image
                src="/headshot.png"
                alt="Karl Koch — Design Engineer and course instructor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 384px, 33vw"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-8">
            <h2 className="heading-section mb-4">Karl Koch</h2>
            <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-400">
              Design Engineer with over a decade of experience shipping
              interfaces across web, iOS, and Android. Previously at startups
              and agencies, now at{" "}
              <Link
                href="https://duckduckgo.com"
                className="text-swiss-red dark:text-swiss-red hover:underline"
              >
                DuckDuckGo
              </Link>
              .
            </p>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              This course exists because Design Engineering is too often learned
              the hard way through years of trial and error, scattered blog
              posts, and outdated tutorials. Every module is built from
              real-world experience shipping production products, not academic
              theory.
            </p>
            <NextLink
              href="/course"
              className="group hover:text-swiss-red dark:hover:text-swiss-red inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors dark:text-white"
            >
              Explore the course
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NextLink>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
