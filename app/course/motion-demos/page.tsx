"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Lesson 1: Why Motion Matters
import {
  MotionFeedbackDemo,
  MotionRelationshipsDemo,
  MotionAttentionDemo,
  MotionContinuityDemo,
} from "../components/visual-examples/motion";

// Lesson 2: Principles of UI Animation
import {
  EasingPlaygroundDemo,
  TimingComparisonDemo,
  StaggerChoreographyDemo,
  SpringPhysicsDemo,
  DisneyPrinciplesDemo,
} from "../components/visual-examples/motion";

// Lesson 3: Micro-interactions
import {
  ButtonStatesDemo,
  FloatingLabelDemo,
  ToggleSwitchDemo,
  LikeButtonDemo,
  SkeletonLoadingDemo,
  FormValidationDemo,
} from "../components/visual-examples/motion";

// Lesson 4: Page Transitions
import {
  PageTransitionTypesDemo,
  SharedElementDemo,
  NavigationDirectionDemo,
} from "../components/visual-examples/motion";

// Lesson 5: Scroll-Based Animation
import {
  ScrollRevealDemo,
  ParallaxLayersDemo,
  ScrollProgressDemo,
  ScrollLinkedHeaderDemo,
} from "../components/visual-examples/motion";

// Lesson 6: Implementing Motion
import {
  CssVsJsDemo,
  AnimatePresenceDemo,
  GestureAnimationDemo,
  ReducedMotionDemo,
} from "../components/visual-examples/motion";

interface DemoSection {
  title: string;
  description: string;
  demos: { name: string; component: React.ComponentType; flagship?: boolean }[];
}

const sections: DemoSection[] = [
  {
    title: "Lesson 1: Why Motion Matters",
    description:
      "Motion serves function: feedback, relationships, attention, and continuity.",
    demos: [
      { name: "Motion Feedback", component: MotionFeedbackDemo },
      { name: "Motion Relationships", component: MotionRelationshipsDemo },
      { name: "Motion Attention", component: MotionAttentionDemo },
      { name: "Motion Continuity", component: MotionContinuityDemo },
    ],
  },
  {
    title: "Lesson 2: Principles of UI Animation",
    description: "Timing, easing, choreography, and physics-based motion.",
    demos: [
      {
        name: "Easing Playground",
        component: EasingPlaygroundDemo,
        flagship: true,
      },
      { name: "Timing Comparison", component: TimingComparisonDemo },
      { name: "Stagger Choreography", component: StaggerChoreographyDemo },
      { name: "Spring Physics", component: SpringPhysicsDemo, flagship: true },
      { name: "Disney Principles", component: DisneyPrinciplesDemo },
    ],
  },
  {
    title: "Lesson 3: Micro-interactions",
    description:
      "Small, contained animations that provide feedback and delight.",
    demos: [
      { name: "Button States", component: ButtonStatesDemo, flagship: true },
      { name: "Floating Label", component: FloatingLabelDemo },
      { name: "Toggle Switch", component: ToggleSwitchDemo },
      { name: "Like Button", component: LikeButtonDemo, flagship: true },
      { name: "Skeleton Loading", component: SkeletonLoadingDemo },
      { name: "Form Validation", component: FormValidationDemo },
    ],
  },
  {
    title: "Lesson 4: Page Transitions",
    description: "Smooth navigation experiences with shared element morphing.",
    demos: [
      { name: "Page Transition Types", component: PageTransitionTypesDemo },
      { name: "Shared Element", component: SharedElementDemo, flagship: true },
      { name: "Navigation Direction", component: NavigationDirectionDemo },
    ],
  },
  {
    title: "Lesson 5: Scroll-Based Animation",
    description: "Scroll-triggered reveals, parallax, and progress indicators.",
    demos: [
      { name: "Scroll Reveal", component: ScrollRevealDemo },
      {
        name: "Parallax Layers",
        component: ParallaxLayersDemo,
        flagship: true,
      },
      { name: "Scroll Progress", component: ScrollProgressDemo },
      { name: "Scroll-Linked Header", component: ScrollLinkedHeaderDemo },
    ],
  },
  {
    title: "Lesson 6: Implementing Motion",
    description:
      "Practical implementation with CSS, Motion library, and accessibility.",
    demos: [
      { name: "CSS vs JS", component: CssVsJsDemo },
      {
        name: "AnimatePresence",
        component: AnimatePresenceDemo,
        flagship: true,
      },
      {
        name: "Gesture Animation",
        component: GestureAnimationDemo,
        flagship: true,
      },
      { name: "Reduced Motion", component: ReducedMotionDemo },
    ],
  },
];

export default function MotionDemosPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/90">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-display text-2xl text-neutral-900 md:text-3xl dark:text-white">
                Motion Demos
              </h1>
              <p className="mt-1 text-sm font-medium text-neutral-500">
                24 interactive examples • Convergence Web Track
              </p>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="bg-swiss-red/10 text-swiss-red ring-swiss-red/20 dark:bg-swiss-red/20 dark:ring-swiss-red/30 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 dark:text-orange-400">
                <span className="text-[10px]">★</span> 8 Flagship Demos
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[126px] z-40 border-b border-neutral-200/60 bg-neutral-50/90 backdrop-blur-lg dark:border-neutral-800/60 dark:bg-neutral-950/90">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3">
            {sections.map((section, index) => (
              <a
                key={section.title}
                href={`#lesson-${index + 1}`}
                className="flex-shrink-0 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm ring-1 ring-neutral-200/80 transition-all hover:bg-neutral-50 hover:text-neutral-900 hover:ring-neutral-300 active:scale-[0.98] dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white dark:hover:ring-neutral-700"
              >
                Lesson {index + 1}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.title}
              id={`lesson-${sectionIndex + 1}`}
              className="scroll-mt-48"
            >
              <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-5">
                  <div className="from-swiss-red shadow-swiss-red/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br to-orange-600 text-xl font-bold text-white shadow-xl">
                    {sectionIndex + 1}
                  </div>
                  <div>
                    <h2 className="heading-subsection mb-2 text-neutral-900 dark:text-white">
                      {section.title.replace(/^Lesson \d+: /, "")}
                    </h2>
                    <p className="max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-[76px] md:pl-0">
                  <span className="rounded-lg bg-neutral-200/50 px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {section.demos.length} demos
                  </span>
                </div>
              </div>

              <div className="grid gap-12 lg:grid-cols-1">
                {section.demos.map((demo) => (
                  <div key={demo.name} className="group relative">
                    {demo.flagship && (
                      <div className="absolute -top-3 right-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg shadow-orange-500/20">
                        <span>★</span>
                        <span>Flagship</span>
                      </div>
                    )}
                    <demo.component />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-neutral-200 pt-12 pb-12 dark:border-neutral-800">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Interactive demos built for the{" "}
              <strong className="text-neutral-900 dark:text-white">
                Design Engineer
              </strong>{" "}
              course.
            </p>
            <p className="mt-4 text-xs text-neutral-400">
              Use code references like{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {"<!-- visual-example: demo-name -->"}
              </code>{" "}
              to embed these in MDX content.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
