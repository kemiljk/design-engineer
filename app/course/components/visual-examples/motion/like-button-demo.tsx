"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageText as MessageCircle, ShareIos as Share2, Bookmark } from "iconoir-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

// Style 1: Bounce & Rotate - Heart pops with slight rotation and particle burst
function BounceRotateLike() {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleLike = () => {
    if (!liked) {
      const newParticles = Array.from({ length: 8 }, (_, i) => Date.now() + i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700);
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleLike}
      className="relative flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-6 shadow-md transition-transform active:scale-95"
    >
      {/* Burst particles */}
      <AnimatePresence>
        {particles.map((id, i) => (
          <motion.div
            key={id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.2, 0.8],
              opacity: [1, 0.8, 0],
              x: Math.cos((i / 8) * Math.PI * 2) * 28,
              y: Math.sin((i / 8) * Math.PI * 2) * 28,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        animate={liked 
          ? { 
              scale: [1, 0.8, 1.35, 0.95, 1.1, 1], 
              rotate: [0, -8, 8, -4, 0] 
            } 
          : { scale: 1, rotate: 0 }
        }
        transition={{ 
          duration: 0.5, 
          ease: [0.175, 0.885, 0.32, 1.275],
          times: [0, 0.15, 0.35, 0.55, 0.75, 1]
        }}
      >
        <Heart
          className="size-8 text-white transition-colors"
          style={{
            fill: liked ? "#fff" : "transparent",
            strokeWidth: 2,
          }}
        />
      </motion.div>
      <span className="text-xs font-semibold tracking-wide text-white/90">
        Bounce & Rotate
      </span>
    </button>
  );
}

// Style 2: Scale & Splat - Heart scales from center with expanding ring and splats
function ScaleSplatLike() {
  const [liked, setLiked] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setShowEffects(true);
      setTimeout(() => setShowEffects(false), 600);
    }
    setLiked(!liked);
  };

  // Generate splat positions
  const splats = [
    { x: -20, y: -18, delay: 0, size: 10 },
    { x: 22, y: -14, delay: 0.02, size: 8 },
    { x: -16, y: 20, delay: 0.04, size: 7 },
    { x: 18, y: 16, delay: 0.03, size: 9 },
    { x: 0, y: -24, delay: 0.01, size: 6 },
    { x: -24, y: 2, delay: 0.05, size: 5 },
    { x: 24, y: -2, delay: 0.02, size: 6 },
  ];

  return (
    <button
      onClick={handleLike}
      className="relative flex flex-col items-center gap-3 rounded-3xl bg-neutral-900 p-6 shadow-md transition-transform active:scale-95"
    >
      {/* Expanding ring */}
      <AnimatePresence>
        {showEffects && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-500"
            style={{ width: 32, height: 32 }}
          />
        )}
      </AnimatePresence>

      {/* Splat particles */}
      <AnimatePresence>
        {showEffects && splats.map((splat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{ 
              scale: [0, 1.2, 0.6],
              opacity: [1, 1, 0],
              x: splat.x,
              y: splat.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: splat.delay,
              ease: "easeOut" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500"
            style={{ width: splat.size, height: splat.size }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        animate={liked 
          ? { scale: [1, 0, 1.25, 0.95, 1] } 
          : { scale: 1 }
        }
        transition={{ 
          duration: 0.4, 
          times: [0, 0.2, 0.5, 0.75, 1],
          ease: [0.175, 0.885, 0.32, 1.275]
        }}
      >
        <Heart
          className={cn(
            "size-8 transition-colors duration-100",
            liked ? "text-rose-500" : "text-neutral-500"
          )}
          style={{
            fill: liked ? "currentColor" : "transparent",
            strokeWidth: 2,
          }}
        />
      </motion.div>
      <span className="text-xs font-semibold tracking-wide text-white/90">
        Scale & Splat
      </span>
    </button>
  );
}

// Style 3: Spring Physics - Bouncy spring-based animation with overshoot
function SpringBounceLike() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="relative flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 p-6 shadow-md transition-transform active:scale-95"
    >
      {/* Glow effect */}
      <AnimatePresence>
        {liked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-md"
            style={{ width: 40, height: 40 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={liked 
          ? { 
              scale: 1,
              y: [0, -6, 2, -2, 0]
            } 
          : { scale: 1, y: 0 }
        }
        transition={liked ? { 
          type: "spring",
          stiffness: 400,
          damping: 10,
          mass: 0.8
        } : { duration: 0.2 }}
        style={{ originY: 1 }}
      >
        <motion.div
          animate={liked ? { scale: [1, 1.3, 0.9, 1.05, 1] } : { scale: 1 }}
          transition={{ 
            duration: 0.45, 
            ease: [0.175, 0.885, 0.32, 1.275]
          }}
        >
          <Heart
            className="size-8 text-white transition-colors"
            style={{
              fill: liked ? "#fff" : "transparent",
              strokeWidth: 2,
              filter: liked ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none"
            }}
          />
        </motion.div>
      </motion.div>
      <span className="text-xs font-semibold tracking-wide text-white/90">
        Spring Physics
      </span>
    </button>
  );
}

export function LikeButtonDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);
  const [showCode, setShowCode] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const triggerConfetti = useCallback((x: number, y: number) => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ["#ec4899", "#f472b6", "#db2777"],
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
      const newParticles = Array.from({ length: 8 }, (_, i) => Date.now() + i);
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 700);
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
  border-radius: 12px;
  transition: background 0.2s;
}

.like-button:hover {
  background: rgba(236, 72, 153, 0.1);
}

.heart--liked {
  animation: heartPop 0.35s ease-out;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { Heart } from "iconoir-react";
import confetti from "canvas-confetti";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);

  const handleLike = (e: React.MouseEvent) => {
    if (!isLiked) {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { 
          x: (rect.left + rect.width / 2) / window.innerWidth, 
          y: (rect.top + rect.height / 2) / window.innerHeight 
        },
        colors: ["#ec4899", "#f472b6", "#db2777"],
      });
    }
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <button onClick={handleLike} className="group flex items-center gap-2">
      <motion.div
        animate={isLiked ? { scale: [1, 1.3, 0.95, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Heart className={isLiked ? "fill-pink-500 text-pink-500" : ""} />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.span
          key={likeCount}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
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
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Main interactive showcase - Social card */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex w-full justify-center bg-neutral-100 p-4 sm:p-8 dark:bg-neutral-900/50">
            {/* Social card */}
            <div className="relative w-full max-w-80 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-neutral-100 p-4 dark:border-neutral-800">
                <div className="h-10 w-10 overflow-hidden !rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                  <div className="h-full w-full !rounded-full bg-white p-0.5 dark:bg-neutral-900">
                    <div className="h-full w-full !rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    Design Engineer
                  </p>
                  <p className="text-xs text-neutral-500">
                    @designengineer • 2h
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  Just shipped a beautiful new animation library! The spring
                  physics make everything feel so much more alive. 🚀✨
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-neutral-100 px-2 py-2 dark:border-neutral-800">
                {/* Like button */}
                <button
                  onClick={handleLike}
                  className="group relative flex items-center gap-2 rounded-3xl px-3 py-2 transition-colors hover:bg-pink-50 dark:hover:bg-pink-900/20"
                >
                  {/* Particle burst */}
                  <AnimatePresence>
                    {particles.map((id, i) => (
                      <motion.div
                        key={id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                          scale: 2,
                          opacity: 0,
                          x: Math.cos((i / 8) * Math.PI * 2) * 30,
                          y: Math.sin((i / 8) * Math.PI * 2) * 30,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          background: "#ec4899",
                        }}
                      />
                    ))}
                  </AnimatePresence>

                  <motion.div
                    animate={
                      isLiked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }
                    }
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Heart
                      className={cn(
                        "size-[20px] transition-all duration-200",
                        isLiked
                          ? "fill-pink-500 text-pink-500"
                          : "text-neutral-400 group-hover:text-pink-500",
                      )}
                    />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={likeCount}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "text-sm font-medium tabular-nums transition-colors",
                        isLiked
                          ? "text-pink-600 dark:text-pink-400"
                          : "text-neutral-500",
                      )}
                    >
                      {likeCount}
                    </motion.span>
                  </AnimatePresence>
                </button>

                {/* Comment button */}
                <button className="flex items-center gap-2 rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-900/20 dark:hover:text-sky-400">
                  <MessageCircle className="size-[20px]" />
                  <span className="text-sm font-medium">24</span>
                </button>

                {/* Share button */}
                <button className="flex items-center gap-2 rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400">
                  <Share2 className="size-[20px]" />
                  <span className="text-sm font-medium">8</span>
                </button>

                {/* Bookmark */}
                <button className="flex items-center rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-amber-900/20 dark:hover:text-amber-400">
                  <Bookmark className="size-[20px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Animation breakdown */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Scale Pop",
                desc: "Heart bounces through 100% → 140% → 90% → 110% → 100%",
                color:
                  "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
                border: "border-pink-200 dark:border-pink-900/50",
              },
              {
                step: "2",
                title: "Colour Fill",
                desc: "Instant colour transition with glowing drop-shadow",
                color:
                  "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
                border: "border-violet-200 dark:border-violet-900/50",
              },
              {
                step: "3",
                title: "Confetti",
                desc: "Particle burst radiates outward from the heart",
                color:
                  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                border: "border-amber-200 dark:border-amber-900/50",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={cn(
                  "rounded-3xl border bg-white p-5 shadow-sm dark:bg-neutral-900",
                  item.border,
                )}
              >
                <div
                  className={cn(
                    "mb-3 flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold",
                    item.color,
                  )}
                >
                  {item.step}
                </div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animation style variants */}
        <div className="grid gap-4 sm:grid-cols-3">
          <BounceRotateLike />
          <ScaleSplatLike />
          <SpringBounceLike />
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
