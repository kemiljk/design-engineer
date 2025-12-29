"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Activity, FlagTriangleRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface Racer {
  id: string;
  label: string;
  desc: string;
  color: string;
  transition: any;
  bestFor: string;
}

export function TimingComparisonDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showTrails, setShowTrails] = useState(true);
  const [customCurve, setCustomCurve] = useState<
    [number, number, number, number]
  >([0.4, 0, 0.2, 1]);

  // Use a key to force re-mounting of motion components for clean replay
  const [key, setKey] = useState(0);
  const [finishOrder, setFinishOrder] = useState<string[]>([]);

  // Monochrome shades - only subtle differentiation
  const racers: Racer[] = [
    {
      id: "linear",
      label: "Linear",
      desc: "Constant speed",
      color: "#d4d4d4", // neutral-300
      transition: { duration: 1.5, ease: "linear" },
      bestFor: "Spinners, continuous scrolling",
    },
    {
      id: "ease",
      label: "Ease Out",
      desc: "Decelerates smoothly",
      color: "#a3a3a3", // neutral-400
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
      bestFor: "UI transitions, modals",
    },
    {
      id: "spring",
      label: "Spring",
      desc: "Physical bounce",
      color: "#737373", // neutral-500
      transition: { type: "spring", stiffness: 80, damping: 10 },
      bestFor: "Interactive elements, gestures",
    },
    {
      id: "custom",
      label: "Custom",
      desc: "Your easing curve",
      color: "#525252", // neutral-600
      transition: { duration: 1.5, ease: customCurve },
      bestFor: "Customized feel",
    },
  ];

  const togglePlay = async () => {
    if (isPlaying) return;
    setKey((k) => k + 1);
    setFinishOrder([]);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  const handleFinish = (racerId: string) => {
    setFinishOrder((prev) => {
      if (!prev.includes(racerId)) {
        return [...prev, racerId];
      }
      return prev;
    });
  };

  const cssCode = `.linear {
  transition: transform 1.5s linear;
}

.ease-out {
  transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.spring {
  /* Requires JavaScript for true physics */
  /* Spring physics calculate velocity and mass */
}

.custom {
  transition: transform 1.5s cubic-bezier(${customCurve.join(", ")});
}`;

  const motionCode = `import { motion } from "motion/react";

function Race() {
  return (
    <>
      {/* Linear: Robotic, unnatural */}
      <motion.div
        animate={{ x: "100%" }}
        transition={{ ease: "linear", duration: 1.5 }}
      />

      {/* Ease Out: Smooth, standard UI */}
      <motion.div
        animate={{ x: "100%" }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.5 }}
      />

      {/* Spring: Physical, energetic */}
      <motion.div
        animate={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 10
        }}
      />

      {/* Custom: Your curve */}
      <motion.div
        animate={{ x: "100%" }}
        transition={{
          ease: [${customCurve.join(", ")}],
          duration: 1.5
        }}
      />
    </>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Timing Functions Race"
      description="The same movement feels completely different depending on the easing or physics used. Watch how each timing function affects the motion personality."
      controls={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              disabled={isPlaying}
              className="flex items-center gap-2 bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              {isPlaying ? (
                <>
                  <Activity className="size-3.5 animate-pulse" />
                  Racing...
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-current" />
                  Start Race
                </>
              )}
            </button>

            <button
              onClick={() => setShowTrails(!showTrails)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-medium shadow-sm transition-all active:scale-[0.98]",
                showTrails
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "border border-neutral-200/60 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
              )}
            >
              {showTrails ? "Hide Trails" : "Show Trails"}
            </button>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium shadow-sm transition-all active:scale-[0.98]",
              showCode
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "border border-neutral-200/60 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
            )}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Interactive Demo */}
        <div className="rounded-3xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900">
          <div className="space-y-3">
            {racers.map((racer, index) => (
              <div key={racer.id} className="relative">
                {/* Track line with flags */}
                <div className="relative h-12 overflow-hidden rounded-2xl border border-neutral-200/40 bg-neutral-50 dark:border-neutral-800/40 dark:bg-neutral-900">
                  {/* Label overlay */}
                  <div className="absolute top-1/2 left-3 z-20 flex -translate-y-1/2 items-center gap-1.5">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {racer.label}
                    </span>
                    {finishOrder.length > 0 &&
                      finishOrder.includes(racer.id) && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[9px] font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                          {finishOrder.indexOf(racer.id) + 1}
                        </span>
                      )}
                  </div>

                  {/* Finish flag */}
                  <div className="absolute top-1/2 right-3 z-20 -translate-y-1/2">
                    <FlagTriangleRight className="h-3.5 w-3.5 text-neutral-300 dark:text-neutral-700" />
                  </div>

                  {/* 50% marker */}
                  <div className="absolute top-0 left-1/2 h-full w-px bg-neutral-200/50 dark:bg-neutral-800/50" />

                  {/* Track line */}
                  <div className="absolute top-1/2 right-10 left-24 h-px bg-neutral-200 dark:bg-neutral-800" />

                  {/* Trail effect */}
                  {showTrails && isPlaying && (
                    <motion.div
                      key={`trail-${racer.id}-${key}`}
                      initial={{ left: 96, opacity: 0 }}
                      animate={{
                        left: "calc(100% - 56px)",
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        ...racer.transition,
                        opacity: { duration: 0.8 },
                      }}
                      className="absolute top-1/2 h-1 w-24 -translate-y-1/2 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${racer.color} 50%, transparent 100%)`,
                      }}
                    />
                  )}

                  {/* Runner - full track animation using left position */}
                  <div className="absolute inset-y-0 right-10 left-24">
                    <motion.div
                      key={`${racer.id}-${key}`}
                      initial={{ left: 0 }}
                      animate={
                        isPlaying ? { left: "calc(100% - 16px)" } : { left: 0 }
                      }
                      transition={racer.transition}
                      onAnimationComplete={() => handleFinish(racer.id)}
                      className="absolute top-1/2 z-10 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-lg shadow-md"
                      style={{
                        backgroundColor: racer.color,
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded bg-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational comparison - compact horizontal layout */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {racers.map((racer) => (
            <div
              key={`card-${racer.id}`}
              className="rounded-xl border border-neutral-200/60 bg-neutral-50 px-3 py-2.5 dark:border-neutral-800/60 dark:bg-neutral-900/50"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded"
                  style={{ backgroundColor: racer.color }}
                />
                <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {racer.label}
                </h4>
              </div>
              <p className="text-[10px] leading-snug text-neutral-500 dark:text-neutral-400">
                {racer.bestFor}
              </p>
            </div>
          ))}
        </div>

        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
