"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Logo } from "@/app/components/logo";
import { TrackLogo, type Track, type Platform } from "@/app/components/track-logo";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/motion";

const tracks: Track[] = ["design", "engineering", "convergence"];
const platforms: Platform[] = ["web", "ios", "android"];

const trackDescriptions: Record<Track, { name: string; shape: string; meaning: string }> = {
  design: {
    name: "Design",
    shape: "Circle",
    meaning: "Organic, creative, fluid thinking",
  },
  engineering: {
    name: "Engineering",
    shape: "Square",
    meaning: "Structured, logical, precise",
  },
  convergence: {
    name: "Convergence",
    shape: "Cross",
    meaning: "The intersection of both worlds",
  },
};

const platformDescriptions: Record<Platform, { name: string; treatment: string; meaning: string }> = {
  web: {
    name: "Web",
    treatment: "Horizontal bars",
    meaning: "Browser layers, responsive grids",
  },
  ios: {
    name: "iOS",
    treatment: "Rounded forms",
    meaning: "Apple's design language",
  },
  android: {
    name: "Android",
    treatment: "Angular cuts",
    meaning: "Material Design geometry",
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      duration: duration.normal,
      ease: ease.outQuint,
      delay: i * 0.008,
    },
  }),
};

const accentVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: duration.normal,
      ease: ease.outQuint,
      delay: 0.1,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: ease.outQuint,
      delay: 0.15,
    },
  },
};

// Navigation height (h-16 = 64px)
const NAV_HEIGHT = 64;

export default function BrandPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [invertTheme, setInvertTheme] = useState(false);

  return (
    <main className={cn(
      "min-h-screen transition-colors duration-300",
      invertTheme ? "bg-black dark:bg-white" : "bg-white dark:bg-black"
    )}>
      {/* Hero Section - matches PageHeader structure */}
      <section
        className={cn(
          "relative overflow-hidden border-b transition-colors duration-300",
          invertTheme 
            ? "border-neutral-800 dark:border-neutral-200" 
            : "border-neutral-200 dark:border-neutral-800"
        )}
        style={{ paddingTop: NAV_HEIGHT }}
      >
        {/* Main container - defines the content width */}
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          {/* Swiss Grid Container */}
          <div
            className="relative grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12"
            style={{ gridTemplateRows: "auto auto auto auto" }}
          >
            {/* Vertical Grid Lines - Mobile */}
            <div className="pointer-events-none absolute inset-0 z-0 md:hidden" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`m-${i}`}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "absolute top-0 h-full w-px origin-top transition-colors duration-300",
                    invertTheme 
                      ? "bg-neutral-800 dark:bg-neutral-200" 
                      : "bg-neutral-200 dark:bg-neutral-800"
                  )}
                  style={{ left: `${(i / 4) * 100}%` }}
                />
              ))}
            </div>

            {/* Vertical Grid Lines - Tablet */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden md:block lg:hidden" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={`t-${i}`}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "absolute top-0 h-full w-px origin-top transition-colors duration-300",
                    invertTheme 
                      ? "bg-neutral-800 dark:bg-neutral-200" 
                      : "bg-neutral-200 dark:bg-neutral-800"
                  )}
                  style={{ left: `${(i / 6) * 100}%` }}
                />
              ))}
            </div>

            {/* Vertical Grid Lines - Desktop */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <motion.div
                  key={`d-${i}`}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "absolute top-0 h-full w-px origin-top transition-colors duration-300",
                    invertTheme 
                      ? "bg-neutral-800 dark:bg-neutral-200" 
                      : "bg-neutral-200 dark:bg-neutral-800"
                  )}
                  style={{ left: `${(i / 12) * 100}%` }}
                />
              ))}
            </div>

            {/* Theme Toggle - positioned in grid */}
            <div className="relative z-20 col-span-full flex justify-end pt-4">
              <button
                onClick={() => setInvertTheme(!invertTheme)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  invertTheme
                    ? "bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                )}
              >
                {invertTheme ? "Reset Theme" : "Invert Theme"}
              </button>
            </div>

            {/* Accent bar */}
            <div className="relative z-10 col-span-full pt-8 pb-4 md:pt-10 lg:pt-12">
              <motion.div
                className="h-1 w-10 origin-left bg-swiss-red md:w-12 lg:w-14"
                variants={accentVariants}
                initial="hidden"
                animate="visible"
                aria-hidden="true"
              />
            </div>

            {/* Eyebrow */}
            <motion.p
              className="relative z-10 col-span-full text-xs font-bold uppercase tracking-[0.3em] text-swiss-red pb-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              Brand Identity
            </motion.p>

            {/* Title */}
            <motion.h1
              className={cn(
                "relative z-10 col-span-full pb-5 text-5xl font-bold tracking-tight md:pb-6 md:text-6xl lg:text-7xl transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              Logo System
            </motion.h1>

            {/* Description */}
            <motion.p
              className={cn(
                "relative z-10 col-span-full pb-4 text-xl leading-relaxed md:col-span-5 lg:col-span-7 transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-400 dark:text-neutral-600" 
                  : "text-neutral-600 dark:text-neutral-400"
              )}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              A Bauhaus-inspired identity system built on geometric primitives. 
              Each logo combines a track shape with a platform treatment, 
              unified by Swiss Red at the intersection.
            </motion.p>

            {/* Bottom spacing */}
            <div className="relative z-10 col-span-full pb-8 md:pb-10 lg:pb-12" />

            {/* Corner markers */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-swiss-red"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, duration: 0.15, ease: ease.outQuint }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 translate-x-1/2 translate-y-1/2 bg-swiss-red"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.15, ease: ease.outQuint }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-swiss-red/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: duration.slow, ease: ease.outQuint }}
          aria-hidden="true"
        />
      </section>

      {/* Master Logo Section */}
      <section className={cn(
        "border-b transition-colors duration-300",
        invertTheme 
          ? "border-neutral-800 dark:border-neutral-200" 
          : "border-neutral-200 dark:border-neutral-800"
      )}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-8">
            {/* Text content - left */}
            <div className="col-span-4 md:col-span-3 lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-4">
                The Mark
              </p>
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                Design Engineer
              </h2>
              <p className={cn(
                "text-lg leading-relaxed mb-6 transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-400 dark:text-neutral-600" 
                  : "text-neutral-600 dark:text-neutral-400"
              )}>
                The primary mark is an X—two paths crossing at a central red diamond. 
                It represents the intersection where design and engineering converge.
              </p>
              <ul className={cn(
                "space-y-3 text-sm transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-500 dark:text-neutral-500" 
                  : "text-neutral-500"
              )}>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-swiss-red" />
                  Swiss Red centre: the point of convergence
                </li>
                <li className="flex items-center gap-3">
                  <span className={cn(
                    "h-2 w-2 transition-colors duration-300",
                    invertTheme 
                      ? "bg-white dark:bg-neutral-900" 
                      : "bg-neutral-900 dark:bg-white"
                  )} />
                  Four arms: design, engineering, craft, code
                </li>
                <li className="flex items-center gap-3">
                  <span className={cn(
                    "h-2 w-2 border transition-colors duration-300",
                    invertTheme 
                      ? "border-neutral-600 dark:border-neutral-400" 
                      : "border-neutral-400 dark:border-neutral-600"
                  )} />
                  45° rotation: dynamic, forward-moving
                </li>
              </ul>
            </div>

            {/* Logo - right */}
            <div className={cn(
              "col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8 flex items-center justify-center p-12 md:p-16 transition-colors duration-300",
              invertTheme 
                ? "bg-neutral-900 dark:bg-neutral-100" 
                : "bg-neutral-100 dark:bg-neutral-900"
            )}>
              <Logo 
                size={160} 
                className={cn(
                  "transition-colors duration-300",
                  invertTheme 
                    ? "text-white dark:text-neutral-900" 
                    : "text-neutral-900 dark:text-white"
                )} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* The System Section */}
      <section className={cn(
        "border-b transition-colors duration-300",
        invertTheme 
          ? "border-neutral-800 dark:border-neutral-200" 
          : "border-neutral-200 dark:border-neutral-800"
      )}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-4">
                The System
              </p>
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                Track × Platform
              </h2>
              <p className={cn(
                "text-lg leading-relaxed transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-400 dark:text-neutral-600" 
                  : "text-neutral-600 dark:text-neutral-400"
              )}>
                Nine unique logos emerge from combining three track shapes with three platform treatments.
              </p>
            </div>
          </div>

          {/* Formula builder */}
          <div className={cn(
            "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 mb-12 transition-colors duration-300",
            invertTheme 
              ? "bg-neutral-900 dark:bg-neutral-100" 
              : "bg-neutral-100 dark:bg-neutral-900"
          )}>
            {/* Track shapes */}
            <div className="col-span-4 md:col-span-2 lg:col-span-4">
              <p className={cn(
                "text-xs font-bold uppercase tracking-[0.15em] mb-4 transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-500 dark:text-neutral-500" 
                  : "text-neutral-500"
              )}>
                Track Shape
              </p>
              <div className="space-y-2">
                {tracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(selectedTrack === track ? null : track)}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 text-left transition-all",
                      selectedTrack === track
                        ? "bg-swiss-red text-white"
                        : invertTheme
                          ? "bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                          : "bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                    )}
                  >
                    <span className="text-lg">
                      {track === "design" ? "◯" : track === "engineering" ? "▢" : "✕"}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{trackDescriptions[track].name}</p>
                      <p className={cn(
                        "text-xs",
                        selectedTrack === track 
                          ? "text-white/70" 
                          : invertTheme
                            ? "text-neutral-500 dark:text-neutral-500"
                            : "text-neutral-500"
                      )}>
                        {trackDescriptions[track].shape}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Multiply sign */}
            <div className="col-span-4 md:col-span-2 lg:col-span-4 flex items-center justify-center">
              <span className={cn(
                "text-4xl font-light transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-600 dark:text-neutral-400" 
                  : "text-neutral-400 dark:text-neutral-600"
              )}>
                ×
              </span>
            </div>

            {/* Platform treatments */}
            <div className="col-span-4 md:col-span-2 lg:col-span-4">
              <p className={cn(
                "text-xs font-bold uppercase tracking-[0.15em] mb-4 transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-500 dark:text-neutral-500" 
                  : "text-neutral-500"
              )}>
                Platform Treatment
              </p>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(selectedPlatform === platform ? null : platform)}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 text-left transition-all",
                      selectedPlatform === platform
                        ? "bg-swiss-red text-white"
                        : invertTheme
                          ? "bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                          : "bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                    )}
                  >
                    <span className="text-lg">
                      {platform === "web" ? "≡" : platform === "ios" ? "⌢" : "◢"}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{platformDescriptions[platform].name}</p>
                      <p className={cn(
                        "text-xs",
                        selectedPlatform === platform 
                          ? "text-white/70" 
                          : invertTheme
                            ? "text-neutral-500 dark:text-neutral-500"
                            : "text-neutral-500"
                      )}>
                        {platformDescriptions[platform].treatment}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result preview */}
          {selectedTrack && selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col items-center justify-center p-12 transition-colors duration-300",
                invertTheme 
                  ? "bg-neutral-900 dark:bg-neutral-100" 
                  : "bg-neutral-100 dark:bg-neutral-900"
              )}
            >
              <TrackLogo
                track={selectedTrack}
                platform={selectedPlatform}
                size={120}
                className={cn(
                  "transition-colors duration-300",
                  invertTheme 
                    ? "text-white dark:text-neutral-900" 
                    : "text-neutral-900 dark:text-white"
                )}
              />
              <p className={cn(
                "mt-6 font-semibold transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                {trackDescriptions[selectedTrack].name} × {platformDescriptions[selectedPlatform].name}
              </p>
              <p className={cn(
                "text-sm transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-500 dark:text-neutral-500" 
                  : "text-neutral-500"
              )}>
                {trackDescriptions[selectedTrack].shape} + {platformDescriptions[selectedPlatform].treatment}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Full Grid Section */}
      <section className={cn(
        "border-b transition-colors duration-300",
        invertTheme 
          ? "border-neutral-800 dark:border-neutral-200" 
          : "border-neutral-200 dark:border-neutral-800"
      )}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-4">
                Complete Set
              </p>
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                All Nine Variants
              </h2>
            </div>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-4 gap-4">
            {/* Header row */}
            <div />
            {platforms.map((platform) => (
              <div key={platform} className="text-center py-2">
                <p className={cn(
                  "text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300",
                  invertTheme 
                    ? "text-neutral-500 dark:text-neutral-500" 
                    : "text-neutral-500"
                )}>
                  {platformDescriptions[platform].name}
                </p>
              </div>
            ))}

            {/* Logo rows */}
            {tracks.map((track) => (
              <>
                <div key={`label-${track}`} className="flex items-center">
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300",
                    invertTheme 
                      ? "text-neutral-500 dark:text-neutral-500" 
                      : "text-neutral-500"
                  )}>
                    {trackDescriptions[track].name}
                  </p>
                </div>
                {platforms.map((platform) => (
                  <div
                    key={`${track}-${platform}`}
                    className={cn(
                      "aspect-square flex items-center justify-center transition-all hover:scale-105 cursor-pointer",
                      invertTheme 
                        ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200" 
                        : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    )}
                    onClick={() => {
                      setSelectedTrack(track);
                      setSelectedPlatform(platform);
                    }}
                  >
                    <TrackLogo
                      track={track}
                      platform={platform}
                      size={48}
                      className={cn(
                        "transition-colors duration-300",
                        invertTheme 
                          ? "text-white dark:text-neutral-900" 
                          : "text-neutral-900 dark:text-white"
                      )}
                    />
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Scalability Section */}
      <section className={cn(
        "border-b transition-colors duration-300",
        invertTheme 
          ? "border-neutral-800 dark:border-neutral-200" 
          : "border-neutral-200 dark:border-neutral-800"
      )}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-4">
                Scalability
              </p>
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                Any Size, Every Context
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {[16, 24, 32, 48, 64, 96, 128].map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <TrackLogo
                  track="convergence"
                  platform="web"
                  size={size}
                  className={cn(
                    "transition-colors duration-300",
                    invertTheme 
                      ? "text-white dark:text-neutral-900" 
                      : "text-neutral-900 dark:text-white"
                  )}
                />
                <span className={cn(
                  "text-xs font-mono transition-colors duration-300",
                  invertTheme 
                    ? "text-neutral-600 dark:text-neutral-400" 
                    : "text-neutral-400 dark:text-neutral-600"
                )}>
                  {size}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colour Section */}
      <section>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-swiss-red mb-4">
                Colour
              </p>
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-300",
                invertTheme 
                  ? "text-white dark:text-neutral-900" 
                  : "text-neutral-900 dark:text-white"
              )}>
                Swiss Red
              </h2>
              <p className={cn(
                "text-lg leading-relaxed transition-colors duration-300",
                invertTheme 
                  ? "text-neutral-400 dark:text-neutral-600" 
                  : "text-neutral-600 dark:text-neutral-400"
              )}>
                The only accent colour in the system. Used exclusively for the centre intersection 
                point—the heart of every logo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
            <div className="col-span-4 md:col-span-2 lg:col-span-4 bg-swiss-red p-6 md:p-8 text-white">
              <p className="font-bold mb-2">Swiss Red</p>
              <p className="text-sm opacity-80 font-mono">#ff4400</p>
              <p className="text-sm opacity-80 font-mono">rgb(255, 68, 0)</p>
            </div>
            <div className={cn(
              "col-span-4 md:col-span-2 lg:col-span-4 p-6 md:p-8 transition-colors duration-300",
              invertTheme 
                ? "bg-white text-black dark:bg-black dark:text-white" 
                : "bg-neutral-900 text-white dark:bg-white dark:text-black"
            )}>
              <p className="font-bold mb-2">Primary</p>
              <p className="text-sm opacity-80">Logo colour</p>
              <p className="text-sm opacity-80">Adapts to theme</p>
            </div>
            <div className={cn(
              "col-span-4 md:col-span-2 lg:col-span-4 p-6 md:p-8 border transition-colors duration-300",
              invertTheme 
                ? "border-neutral-700 text-white dark:border-neutral-300 dark:text-neutral-900" 
                : "border-neutral-300 text-neutral-900 dark:border-neutral-700 dark:text-white"
            )}>
              <p className="font-bold mb-2">Background</p>
              <p className="text-sm opacity-60">Adapts to context</p>
              <p className="text-sm opacity-60">Light or dark</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "py-8 border-t text-center transition-colors duration-300",
        invertTheme 
          ? "border-neutral-800 text-neutral-600 dark:border-neutral-200 dark:text-neutral-400" 
          : "border-neutral-200 text-neutral-400 dark:border-neutral-800 dark:text-neutral-600"
      )}>
        <p className="text-sm">
          Design Engineer Brand System · Bauhaus-Inspired · Swiss Typography
        </p>
      </footer>
    </main>
  );
}
