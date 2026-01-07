"use client";

import { useState } from "react";
import {
  Brain,
  Book,
  RefreshDouble,
  LightBulb,
  NavArrowDown,
  MediaVideoList,
  Text,
  MessageText,
} from "iconoir-react";

interface ResearchCitation {
  authors: string;
  year: number;
  title: string;
  journal: string;
  finding: string;
}

const researchCitations: ResearchCitation[] = [
  {
    authors: "Szpunar, Khan & Schacter",
    year: 2013,
    title: "Interpolated memory tests reduce mind wandering",
    journal: "Proceedings of the National Academy of Sciences",
    finding:
      "Students watching video lectures without embedded questions showed significantly more mind wandering and less note-taking. Adding interpolated questions increased engagement and improved test performance.",
  },
  {
    authors: "Zhang et al.",
    year: 2006,
    title: "Instructional video in e-learning",
    journal: "Information & Management",
    finding:
      "Non-interactive, linear video produced lower learning outcomes and satisfaction compared to formats that give learners interactive control.",
  },
  {
    authors: "Freeman et al.",
    year: 2014,
    title: "Active learning increases student performance",
    journal: "PNAS",
    finding:
      "Meta-analysis of 225 studies: active learning (problem-solving, questions, interaction) significantly outperforms passive lecture formats in exam scores and reduces failure rates by 55%.",
  },
  {
    authors: "Brame",
    year: 2016,
    title: "Effective educational videos",
    journal: "CBE—Life Sciences Education",
    finding:
      '"Watching a video can be a passive experience, much as reading can be. To make the most of our educational videos, we need to help students do the processing and self-evaluation that will lead to the learning we want to see."',
  },
];

const approachFeatures = [
  {
    icon: Brain,
    title: "Active over passive",
    description:
      "Each lesson embeds questions, exercises, and reflections. You think and apply, rather than passively watch.",
  },
  {
    icon: RefreshDouble,
    title: "Your pace, your control",
    description:
      "Skim what you know, linger on what's tricky, jump to what you need. Text gives you control that video can't.",
  },
  {
    icon: LightBulb,
    title: "Retention through doing",
    description:
      "Short explanations followed by exercises reduce mind wandering and boost long-term retention.",
  },
  {
    icon: Book,
    title: "Reference-friendly",
    description:
      "Search, bookmark, and revisit specific concepts. Text becomes a lasting resource, not a one-time watch.",
  },
];

function ComparisonVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Video - Passive */}
      <div className="border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-800/50">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-neutral-200 dark:bg-neutral-700">
            <MediaVideoList className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </div>
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Typical video course
          </span>
        </div>
        <ul className="space-y-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            Watch → forget
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            Linear, hard to skim
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
            Mind wanders during playback
          </li>
        </ul>
      </div>

      {/* Text + Interactive - Active */}
      <div className="border border-swiss-red/30 bg-swiss-red/[0.02] p-5 dark:border-swiss-red/40 dark:bg-swiss-red/5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-swiss-red/10 dark:bg-swiss-red/20">
            <Text className="h-4 w-4 text-swiss-red" />
          </div>
          <span className="text-sm font-medium text-swiss-red">
            This course
          </span>
        </div>
        <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-300">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-swiss-red" />
            Read → do → remember
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-swiss-red" />
            Searchable, skimmable, scannable
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-swiss-red" />
            Questions keep you engaged
          </li>
        </ul>
      </div>
    </div>
  );
}

function ResearchSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <MessageText className="h-4 w-4 text-neutral-400" />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Why this approach? The research
          </span>
        </div>
        <NavArrowDown
          className={`h-4 w-4 text-neutral-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Research consistently characterises plain video as a{" "}
            <em>passive learning context</em> unless interactive elements are
            added.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {researchCitations.map((citation) => (
              <div
                key={citation.title}
                className="border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <p className="mb-2 text-xs text-neutral-500">
                  {citation.authors} ({citation.year}) · {citation.journal}
                </p>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {citation.finding}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500">
            Text-based courses built around short explanations and frequent
            questions align with the well-established benefits of active
            learning.
          </p>
        </div>
      )}
    </div>
  );
}

export function CourseApproach() {
  return (
    <section className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <p className="heading-eyebrow mb-3">Our Approach</p>
            <h2 className="heading-subsection mb-4">
              Text-based. Interactive. Effective.
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
              No hour-long videos. Concise written lessons with embedded
              exercises, questions, and hands-on practice. Research shows this
              format works best for learning technical skills.
            </p>
          </div>

          {/* Comparison Visual */}
          <div className="mb-10">
            <ComparisonVisual />
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {approachFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                  <feature.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Research Section */}
          <ResearchSection />
        </div>
      </div>
    </section>
  );
}

