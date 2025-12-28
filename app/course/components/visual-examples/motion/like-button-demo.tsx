"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

// Reusable Platform Button
function PlatformLikeButton({
  name,
  icon: Icon,
  bg,
  color = "text-white",
}: {
  name: string;
  icon: any;
  bg: string;
  color?: string;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="flex flex-col items-center gap-3 rounded-[24px] p-6 shadow-md transition-transform active:scale-95"
      style={{ background: bg }}
    >
      <motion.div
        animate={liked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Icon
          className={cn("size-8 transition-colors", color)}
          style={{
            fill: liked ? "currentColor" : "transparent",
            strokeWidth: 2,
          }}
        />
      </motion.div>
      <span
        className={cn(
          "text-xs font-bold tracking-wider uppercase opacity-90",
          color,
        )}
      >
        {name}
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
import { Heart } from "lucide-react";
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
            <div className="relative w-full max-w-80 overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
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
                  className="group relative flex items-center gap-2 rounded-[24px] px-3 py-2 transition-colors hover:bg-pink-50 dark:hover:bg-pink-900/20"
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
                <button className="flex items-center gap-2 rounded-[24px] px-3 py-2 text-neutral-400 transition-colors hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-900/20 dark:hover:text-sky-400">
                  <MessageCircle className="size-[20px]" />
                  <span className="text-sm font-medium">24</span>
                </button>

                {/* Share button */}
                <button className="flex items-center gap-2 rounded-[24px] px-3 py-2 text-neutral-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400">
                  <Share2 className="size-[20px]" />
                  <span className="text-sm font-medium">8</span>
                </button>

                {/* Bookmark */}
                <button className="flex items-center rounded-[24px] px-3 py-2 text-neutral-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-amber-900/20 dark:hover:text-amber-400">
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
                  "rounded-[24px] border bg-white p-5 shadow-sm dark:bg-neutral-900",
                  item.border,
                )}
              >
                <div
                  className={cn(
                    "mb-3 flex h-7 w-7 items-center justify-center rounded-[8px] text-xs font-bold",
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

        {/* Platform variants - Interactive */}
        <div className="grid gap-4 sm:grid-cols-3">
          <PlatformLikeButton
            name="Instagram"
            icon={Heart}
            bg="linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)"
          />
          <PlatformLikeButton name="X" icon={Heart} bg="#000000" />
          <PlatformLikeButton
            name="YouTube"
            icon={({ className, style }: any) => (
              <svg className={className} style={style} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            )}
            bg="linear-gradient(135deg, #FF0000 0%, #cc0000 100%)"
          />
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
