"use client";

import React from "react";

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
  LayoutAnimationDemo,
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
    description: "Motion serves function: feedback, relationships, attention, and continuity.",
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
      { name: "Easing Playground", component: EasingPlaygroundDemo, flagship: true },
      { name: "Timing Comparison", component: TimingComparisonDemo },
      { name: "Stagger Choreography", component: StaggerChoreographyDemo },
      { name: "Spring Physics", component: SpringPhysicsDemo, flagship: true },
      { name: "Disney Principles", component: DisneyPrinciplesDemo },
    ],
  },
  {
    title: "Lesson 3: Micro-interactions",
    description: "Small, contained animations that provide feedback and delight.",
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
      { name: "Parallax Layers", component: ParallaxLayersDemo, flagship: true },
      { name: "Scroll Progress", component: ScrollProgressDemo },
      { name: "Scroll-Linked Header", component: ScrollLinkedHeaderDemo },
    ],
  },
  {
    title: "Lesson 6: Implementing Motion",
    description: "Practical implementation with CSS, Motion library, and accessibility.",
    demos: [
      { name: "CSS vs JS", component: CssVsJsDemo },
      { name: "AnimatePresence", component: AnimatePresenceDemo, flagship: true },
      { name: "Gesture Animation", component: GestureAnimationDemo, flagship: true },
      { name: "Layout Animation", component: LayoutAnimationDemo },
      { name: "Reduced Motion", component: ReducedMotionDemo },
    ],
  },
];

export default function MotionDemosPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
                Motion Demos
              </h1>
              <p className="text-sm text-neutral-500">
                25 interactive examples • Convergence Web Track
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-swiss-red/10 px-3 py-1 text-xs font-medium text-swiss-red">
                8 Flagship Demos
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-40 border-b border-neutral-200 bg-neutral-100/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {sections.map((section, index) => (
              <a
                key={section.title}
                href={`#lesson-${index + 1}`}
                className="flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                Lesson {index + 1}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <section key={section.title} id={`lesson-${sectionIndex + 1}`}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {section.description}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs text-neutral-500">
                    {section.demos.length} demos
                  </span>
                  {section.demos.some((d) => d.flagship) && (
                    <span className="text-xs text-swiss-red">
                      • {section.demos.filter((d) => d.flagship).length} flagship
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                {section.demos.map((demo) => (
                  <div key={demo.name} className="relative">
                    {demo.flagship && (
                      <div className="absolute -left-2 top-0 z-10 rounded-r-md bg-swiss-red px-2 py-0.5 text-xs font-medium text-white sm:-left-4">
                        ⭐ Flagship
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
        <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500">
            These demos are embedded in the course content via{" "}
            <code className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800">
              {"<!-- visual-example: demo-name -->"}
            </code>
          </p>
        </footer>
      </main>
    </div>
  );
}

