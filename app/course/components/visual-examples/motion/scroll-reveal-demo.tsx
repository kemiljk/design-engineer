"use client";

import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type AnimationType = "fade" | "slideUp" | "slideLeft" | "scale";

const cards = [
  { id: 1, title: "Design Tokens", desc: "Consistent visual language", color: "bg-blue-500" },
  { id: 2, title: "Components", desc: "Reusable building blocks", color: "bg-violet-500" },
  { id: 3, title: "Patterns", desc: "Common UI solutions", color: "bg-emerald-500" },
  { id: 4, title: "Guidelines", desc: "Usage documentation", color: "bg-amber-500" },
  { id: 5, title: "Accessibility", desc: "Inclusive design", color: "bg-rose-500" },
  { id: 6, title: "Motion", desc: "Animation system", color: "bg-cyan-500" },
];

const animations: Record<AnimationType, { hidden: object; visible: object }> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

function RevealCard({ 
  card, 
  index, 
  animation 
}: { 
  card: typeof cards[0]; 
  index: number;
  animation: AnimationType;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const anim = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={anim}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className={cn("h-20", card.color)} />
      <div className="p-4">
        <h3 className="font-bold text-neutral-900 dark:text-white">{card.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{card.desc}</p>
      </div>
    </motion.div>
  );
}

export function ScrollRevealDemo() {
  const [animation, setAnimation] = useState<AnimationType>("slideUp");
  const [showCode, setShowCode] = useState(false);
  const [key, setKey] = useState(0);

  const resetAnimation = () => {
    setKey((prev) => prev + 1);
  };

  const cssCode = `.reveal-card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays with CSS */
.reveal-card:nth-child(1) { transition-delay: 0s; }
.reveal-card:nth-child(2) { transition-delay: 0.1s; }
.reveal-card:nth-child(3) { transition-delay: 0.2s; }
/* etc... */

/* Or use CSS Scroll-Driven Animations */
.reveal-card {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}`;

  const motionCode = `import { motion, useInView } from "motion/react";
import { useRef } from "react";

function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,      // Only animate once
    margin: "-50px"  // Trigger 50px before entering
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage with staggered delays
{cards.map((card, index) => (
  <RevealCard key={card.id} delay={index * 0.1}>
    <Card {...card} />
  </RevealCard>
))}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Scroll Reveal Animation"
      description="Cards animate in as they enter the viewport. Scroll to see the effect."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <ControlGroup label="Style">
              {(Object.keys(animations) as AnimationType[]).map((type) => (
                <ControlButton
                  key={type}
                  active={animation === type}
                  onClick={() => {
                    setAnimation(type);
                    resetAnimation();
                  }}
                >
                  {type}
                </ControlButton>
              ))}
            </ControlGroup>
            <button
              onClick={resetAnimation}
              className="rounded-md bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
            >
              Reset
            </button>
          </div>
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
      <div className="space-y-6">
        {/* Scrollable container */}
        <div className="h-80 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 rounded-lg bg-white p-4 dark:bg-neutral-800">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              👇 Scroll down to reveal cards
            </p>
          </div>
          
          <div className="h-32" /> {/* Spacer */}
          
          <div key={key} className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <RevealCard
                key={card.id}
                card={card}
                index={index}
                animation={animation}
              />
            ))}
          </div>
          
          <div className="h-32" /> {/* Spacer */}
        </div>

        {/* Animation types */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { type: "fade", desc: "Simple opacity fade" },
            { type: "slideUp", desc: "Fade + slide from below" },
            { type: "slideLeft", desc: "Fade + slide from right" },
            { type: "scale", desc: "Fade + scale up" },
          ].map((item) => (
            <div
              key={item.type}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                animation === item.type
                  ? "border-swiss-red bg-swiss-red/5"
                  : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              <p className="text-xs font-semibold capitalize text-neutral-900 dark:text-white">
                {item.type}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
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

