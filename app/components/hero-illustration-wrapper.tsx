"use client";

import dynamic from "next/dynamic";

const HeroIllustration = dynamic(
  () => import("./hero-illustration").then((m) => m.HeroIllustration),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="heroGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.25"
              />
            </pattern>
          </defs>
          <rect width="400" height="320" fill="url(#heroGrid)" />
          <text
            x="200"
            y="160"
            fontSize="14"
            fill="currentColor"
            textAnchor="middle"
            opacity="0.3"
            fontFamily="system-ui"
          >
            Design × Engineering
          </text>
        </svg>
      </div>
    ),
  }
);

export function HeroIllustrationWrapper() {
  return <HeroIllustration />;
}
