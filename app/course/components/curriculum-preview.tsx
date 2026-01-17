"use client";

import { useState } from "react";
import { TrackLogo, type Track } from "@/app/components/track-logo";
import {
  Sparks as Sparkles,
  CheckCircle,
} from "iconoir-react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@/app/components/ui/modal";

type Platform = "web" | "ios" | "android";

interface ModulePreview {
  title: string;
  topics: string[];
}

interface TrackPreview {
  id: Track;
  title: string;
  tagline: string;
  level: string;
  platforms: Platform[];
  modules: ModulePreview[];
  highlights: string[];
  convergenceExtras?: string[];
}

const trackPreviews: TrackPreview[] = [
  {
    id: "design",
    title: "Design Track",
    tagline: "For engineers who want to ship interfaces they're proud of",
    level: "Beginner → Advanced",
    platforms: ["web", "ios", "android"],
    highlights: [
      "No prior design experience needed",
      "Visual fundamentals & Gestalt principles",
      "Typography, colour & spacing",
      "Design systems & UX principles",
    ],
    modules: [
      {
        title: "Visual Foundations",
        topics: [
          "Gestalt principles & visual hierarchy",
          "Why some interfaces 'feel right'",
          "Training your design eye",
        ],
      },
      {
        title: "Typography & Colour",
        topics: [
          "Font pairing and typographic scale",
          "Colour theory for digital products",
          "Building accessible colour palettes",
        ],
      },
      {
        title: "Layout & Spacing",
        topics: [
          "Rhythm, whitespace, and breathing room",
          "Grid systems that actually work",
          "Responsive layout patterns",
        ],
      },
      {
        title: "Design Systems",
        topics: [
          "Design tokens and variables",
          "Component architecture",
          "Documentation that gets used",
        ],
      },
      {
        title: "UX Principles",
        topics: [
          "User-centred thinking",
          "Information architecture",
          "Usability heuristics",
        ],
      },
      {
        title: "Platform-Specific Design",
        topics: [
          "Human Interface Guidelines (iOS)",
          "Material Design (Android)",
          "Web design patterns",
        ],
      },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Track",
    tagline: "For designers ready to build it themselves",
    level: "Beginner → Intermediate",
    platforms: ["web", "ios", "android"],
    highlights: [
      "Start from absolute zero",
      "HTML, CSS & JavaScript fundamentals",
      "Build real UI components",
      "Design systems in code",
    ],
    modules: [
      {
        title: "Environment Setup",
        topics: [
          "Your new best friend: the terminal",
          "Installing development tools",
          "Creating your first project",
        ],
      },
      {
        title: "Core Languages",
        topics: [
          "HTML: Structure and semantics",
          "CSS: Styling and layout mastery",
          "JavaScript: Interactivity and logic",
        ],
      },
      {
        title: "CSS Deep Dive",
        topics: [
          "The cascade and specificity",
          "Flexbox and Grid layouts",
          "Transitions and animations",
        ],
      },
      {
        title: "JavaScript Essentials",
        topics: [
          "DOM manipulation",
          "Event handling",
          "Modern ES6+ patterns",
        ],
      },
      {
        title: "Building Components",
        topics: [
          "Buttons, cards, modals, forms",
          "Component thinking",
          "Composition patterns",
        ],
      },
      {
        title: "Design Systems in Code",
        topics: [
          "Implementing design tokens",
          "Component API design",
          "Documentation for developers",
        ],
      },
    ],
  },
  {
    id: "convergence",
    title: "Convergence",
    tagline: "Where design and engineering become one skillset",
    level: "Intermediate → Advanced",
    platforms: ["web", "ios", "android"],
    highlights: [
      "All Design + Engineering content",
      "Motion & micro-interactions",
      "Accessibility & performance",
      "Portfolio & career guidance",
    ],
    modules: [
      {
        title: "Motion & Interaction",
        topics: [
          "Why motion matters for UX",
          "Micro-interactions that delight",
          "Page transitions and scroll effects",
        ],
      },
      {
        title: "Prototyping",
        topics: [
          "From design to interactive prototype",
          "Prototype to production pipeline",
          "Selling ideas with prototypes",
        ],
      },
      {
        title: "Accessibility",
        topics: [
          "Keyboard navigation",
          "Screen reader experience",
          "Motion and accessibility",
        ],
      },
      {
        title: "Creative Visual Effects",
        topics: [
          "Beyond CSS animations",
          "Introduction to shaders",
          "Practical shader patterns for UI",
        ],
      },
      {
        title: "Performance & Polish",
        topics: [
          "Perceived performance tricks",
          "Image and CSS optimisation",
          "The details that matter",
        ],
      },
      {
        title: "Workflow & Portfolio",
        topics: [
          "The Design Engineer workflow",
          "Building side projects",
          "Finding DE roles",
        ],
      },
    ],
    convergenceExtras: [
      "All Design Track content (Web, iOS, Android)",
      "All Engineering Track content (Web, iOS, Android)",
      "Exclusive Convergence modules",
      "Capstone projects for each track",
    ],
  },
];

function TrackCard({
  track,
  onViewCurriculum,
}: {
  track: TrackPreview;
  onViewCurriculum: () => void;
}) {
  return (
    <div className="flex flex-col border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-start gap-4 p-6">
        <TrackLogo
          track={track.id}
          size={40}
          showLayer="track"
          className="shrink-0"
        />
        <div className="flex-1">
          <h3 className="font-bold text-neutral-900 dark:text-white">
            {track.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {track.tagline}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex-1 border-t border-neutral-100 px-6 py-4 dark:border-neutral-800">
        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          {track.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 bg-swiss-red" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-100 px-6 py-4 dark:border-neutral-800">
        <button
          onClick={onViewCurriculum}
          className="w-full text-sm font-medium text-swiss-red transition-colors hover:underline"
        >
          View curriculum
        </button>
      </div>
    </div>
  );
}

function CurriculumModal({
  track,
  isOpen,
  onClose,
}: {
  track: TrackPreview | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!track) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="2xl">
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-4">
            <TrackLogo track={track.id} size={32} showLayer="track" />
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                {track.title}
              </h2>
              <p className="text-sm text-neutral-500">
                {track.level} · Web, iOS, Android
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          {/* Convergence extras */}
          {track.convergenceExtras && (
            <div className="mb-6 border border-swiss-red/20 bg-swiss-red/[0.02] p-4 dark:bg-swiss-red/5">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-swiss-red">
                <Sparkles className="h-4 w-4" />
                Everything Included
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                {track.convergenceExtras.map((extra) => (
                  <li key={extra} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                    {extra}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modules grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {track.modules.map((module, index) => (
              <div key={module.title} className="module-item">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center bg-neutral-100 text-xs font-bold text-neutral-500 dark:bg-neutral-800">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-neutral-900 dark:text-white">
                    {module.title}
                  </h4>
                </div>
                <ul className="space-y-1 pl-7 text-sm text-neutral-600 dark:text-neutral-400">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-neutral-300 dark:bg-neutral-600" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function CurriculumPreview() {
  const [selectedTrack, setSelectedTrack] = useState<TrackPreview | null>(null);

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <p className="heading-eyebrow mb-3">Curriculum Preview</p>
            <h2 className="heading-subsection mb-3">What You'll Learn</h2>
            <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
              From absolute beginner to advanced techniques. Each track starts
              from fundamentals and builds to professional-level skills.
            </p>
          </div>

          {/* Track Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {trackPreviews.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onViewCurriculum={() => setSelectedTrack(track)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              Not sure which track is right for you?{" "}
              <a
                href="/course/00-introduction/03-choosing-your-path"
                className="font-medium text-swiss-red hover:underline"
              >
                Take our quick quiz
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Detail Modal */}
      <CurriculumModal
        track={selectedTrack}
        isOpen={!!selectedTrack}
        onClose={() => setSelectedTrack(null)}
      />
    </section>
  );
}
