"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function TimingComparisonDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);
  
  // Use a key to force re-mounting of motion components for clean replay
  const [key, setKey] = useState(0);

  const togglePlay = () => {
    if (isPlaying) return;
    setKey(k => k + 1);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const cssCode = `.linear {
  transition: transform 1.5s linear;
}

.ease-out {
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.spring {
  /* Requires JS/Motion for true physics */
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
          stiffness: 100, 
          damping: 12 
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
      title="Timing Functions"
      description="The same movement feels completely different depending on the easing or physics used."
      controls={
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            disabled={isPlaying}
            className="flex items-center gap-2 bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-1 dark:ring-neutral-700/80 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            {isPlaying ? (
              <>
                <Activity className="size-3.5 animate-pulse" />
                Running...
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                Start Race
              </>
            )}
          </button>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="rounded-[24px] border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <div className="space-y-10">
            
            {/* Tracks */}
            {[
              { id: "linear", label: "Linear", desc: "Constant speed (Robotic)", color: "bg-neutral-400" },
              { id: "ease", label: "Ease Out", desc: "Decelerates (Natural)", color: "bg-indigo-500" },
              { id: "spring", label: "Spring", desc: "Overshoots (Playful)", color: "bg-emerald-500" },
            ].map((track) => (
              <div key={track.id} className="relative">
                <div className="mb-2 flex items-baseline justify-between">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{track.label}</h4>
                  <span className="text-[10px] font-medium text-neutral-500">{track.desc}</span>
                </div>
                
                {/* Track line */}
                <div className="relative h-14 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50">
                  {/* Ticks */}
                  <div className="absolute inset-0 flex justify-between px-7">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-full w-px bg-neutral-200/50 dark:bg-neutral-700/30" />
                    ))}
                  </div>

                  {/* Runner */}
                  <div className="absolute inset-y-0 left-0 right-14 flex items-center">
                    <motion.div
                      key={`${track.id}-${key}`}
                      initial={{ x: 0 }}
                      animate={isPlaying ? { x: "100%" } : { x: 0 }}
                      transition={
                        track.id === "linear" ? { duration: 1.5, ease: "linear" } :
                        track.id === "ease" ? { duration: 1.5, ease: [0.22, 1, 0.36, 1] } :
                        { type: "spring", stiffness: 80, damping: 10 } // Spring
                      }
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-[12px] shadow-lg transition-shadow"
                      style={{
                        backgroundColor: track.id === "linear" ? "#9ca3af" : 
                                       track.id === "ease" ? "#6366f1" : "#10b981"
                      }}
                    >
                      <div className="h-2 w-2 rounded-full bg-white/90" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Linear</h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Good for: Spinners, scrolling marquees.<br/>
              Bad for: Anything that moves from A to B.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Ease Out</h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Good for: Modals entering, cards sliding in.<br/>
              Why: Mimics friction slowing objects down.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Spring</h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Good for: Interactions, toggles, gestures.<br/>
              Why: Responds to velocity, feels "heavy".
            </p>
          </div>
        </div>

        {showCode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
