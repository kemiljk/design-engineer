"use client";

import Image from "next/image";
import { Compass as Target, EmojiSad as Frown, Computer as Monitor, Dashboard as Gauge } from "iconoir-react";

interface Persona {
  name: string;
  role: string;
  avatar: string;
  goals: string[];
  frustrations: string[];
  context: string;
  technicalLevel: string;
}

const defaultPersona: Persona = {
  name: "Sarah Chen",
  role: "Marketing Manager",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  goals: [
    "Create campaigns quickly",
    "Track performance metrics",
    "Collaborate with team",
  ],
  frustrations: [
    "Too many clicks for simple tasks",
    "Confusing analytics dashboards",
    "Slow report generation",
  ],
  context: "Uses product on laptop, often in meetings, frequently interrupted",
  technicalLevel: "Comfortable with web apps, not with code",
};

export function PersonaCardDemo() {
  const persona = defaultPersona;

  return (
    <div className="not-prose my-8">
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          {/* Avatar */}
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={persona.avatar}
              alt={persona.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            {/* Decorative ring */}
            <div className="absolute -inset-0.5 rounded-full border-2 border-swiss-red/30" />
          </div>
          
          {/* Name & Role */}
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {persona.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {persona.role}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {/* Goals */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-100 dark:bg-green-900/30">
                <Target className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Goals
              </span>
            </div>
            <ul className="space-y-1">
              {persona.goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-500" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          {/* Frustrations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-red-100 dark:bg-red-900/30">
                <Frown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Frustrations
              </span>
            </div>
            <ul className="space-y-1">
              {persona.frustrations.map((frustration, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                  {frustration}
                </li>
              ))}
            </ul>
          </div>

          {/* Context */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30">
                <Monitor className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Context
              </span>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {persona.context}
            </p>
          </div>

          {/* Technical Level */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-100 dark:bg-purple-900/30">
                <Gauge className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Technical Level
              </span>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {persona.technicalLevel}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-center text-xs text-neutral-500">
            Personas help teams align on who they&apos;re designing for
          </p>
        </div>
      </div>
    </div>
  );
}

