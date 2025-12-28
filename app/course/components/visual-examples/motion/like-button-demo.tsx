"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function LikeButtonDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);
  const [showCode, setShowCode] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const triggerConfetti = useCallback((x: number, y: number) => {
    // Mini confetti burst
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ["#ff4400", "#ff6b35", "#ff8f66"],
      ticks: 50,
      gravity: 1.2,
      scalar: 0.8,
      shapes: ["circle"],
    });
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (!isLiked) {
      triggerConfetti(x, y);
      // Add particle IDs for the burst effect
      const newParticles = Array.from({ length: 6 }, (_, i) => Date.now() + i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }

    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const cssCode = `.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.heart {
  transition: transform 0.15s ease-out;
}

.heart--liked {
  animation: heartPop 0.35s ease-out;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.heart-icon {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 2;
  transition: fill 0.2s, stroke 0.2s;
}

.heart--liked .heart-icon {
  fill: #ff4400;
  stroke: #ff4400;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);

  const handleLike = (e: React.MouseEvent) => {
    if (!isLiked) {
      // Trigger confetti burst
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { 
          x: (rect.left + rect.width / 2) / window.innerWidth, 
          y: (rect.top + rect.height / 2) / window.innerHeight 
        },
        colors: ["#ff4400", "#ff6b35", "#ff8f66"],
      });
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-2">
      <motion.div
        animate={isLiked ? {
          scale: [1, 1.3, 0.95, 1],
        } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Heart
          className={cn(
            "size-6 transition-colors",
            isLiked 
              ? "fill-swiss-red stroke-swiss-red" 
              : "fill-transparent stroke-current"
          )}
        />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.span
          key={likeCount}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-sm font-medium tabular-nums"
        >
          {likeCount}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Like Button"
      description="Twitter/Instagram-style like button with pop animation and confetti burst."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <span className="text-xs text-neutral-500">
              {isLiked ? "Liked" : "Not liked"} • {likeCount} likes
            </span>
          </ControlGroup>
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              showCode
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            )}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Interactive like button */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <button
              onClick={handleLike}
              className="relative flex items-center gap-3 rounded-lg px-6 py-3 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              {/* Particle burst */}
              <AnimatePresence>
                {particles.map((id, i) => (
                  <motion.div
                    key={id}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: 1.5,
                      opacity: 0,
                      x: Math.cos((i / 6) * Math.PI * 2) * 30,
                      y: Math.sin((i / 6) * Math.PI * 2) * 30,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-swiss-red"
                  />
                ))}
              </AnimatePresence>

              <motion.div
                animate={
                  isLiked
                    ? {
                        scale: [1, 1.3, 0.95, 1],
                      }
                    : { scale: 1 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Heart
                  className={cn(
                    "size-8 transition-colors duration-200",
                    isLiked
                      ? "fill-swiss-red stroke-swiss-red"
                      : "fill-transparent stroke-neutral-600 dark:stroke-neutral-400"
                  )}
                />
              </motion.div>

              <div className="flex flex-col items-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={likeCount}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="font-mono text-lg font-bold tabular-nums text-neutral-900 dark:text-white"
                  >
                    {likeCount.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs text-neutral-500">likes</span>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Click the heart to see the animation and confetti burst
          </p>
        </div>

        {/* Animation breakdown */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-semibold text-swiss-red">1. Scale Pop</p>
            <p className="mt-1 text-xs text-neutral-500">
              Heart scales up to 130%, then overshoots down to 95%, settling at 100%
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-semibold text-swiss-red">2. Colour Fill</p>
            <p className="mt-1 text-xs text-neutral-500">
              Fill and stroke transition from transparent to swiss-red simultaneously
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-xs font-semibold text-swiss-red">3. Confetti</p>
            <p className="mt-1 text-xs text-neutral-500">
              canvas-confetti creates a burst of particles on first like
            </p>
          </div>
        </div>

        {/* Variants */}
        <div className="flex items-center justify-center gap-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          {/* Minimal */}
          <div className="flex flex-col items-center gap-2">
            <Heart className="size-6 fill-swiss-red stroke-swiss-red" />
            <span className="text-xs text-neutral-500">Minimal</span>
          </div>
          
          {/* With count */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Heart className="size-5 fill-swiss-red stroke-swiss-red" />
              <span className="text-sm font-medium">2.4k</span>
            </div>
            <span className="text-xs text-neutral-500">With count</span>
          </div>
          
          {/* Badge style */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-swiss-red/10 px-3 py-1.5">
              <Heart className="size-4 fill-swiss-red stroke-swiss-red" />
              <span className="text-sm font-medium text-swiss-red">Liked</span>
            </div>
            <span className="text-xs text-neutral-500">Badge</span>
          </div>
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}

