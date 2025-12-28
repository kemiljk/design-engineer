"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Shield, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ScrollRevealDemo() {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef(null);
  
  // We use key to force re-render/re-animation for the demo replay
  const [replayKey, setReplayKey] = useState(0);

  const features = [
    { title: "Fast", desc: "Optimized for speed", icon: Zap, color: "bg-amber-500" },
    { title: "Secure", desc: "Bank-grade security", icon: Shield, color: "bg-emerald-500" },
    { title: "Global", desc: "CDN edge network", icon: Globe, color: "bg-blue-500" },
    { title: "Smart", desc: "AI-powered automation", icon: Cpu, color: "bg-purple-500" },
  ];

  const cssCode = `.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}`;

  const motionCode = `import { motion } from "motion/react";

function FeatureList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1,
            ease: "easeOut" 
          }}
          className="card"
        >
          {feature.title}
        </motion.div>
      ))}
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Scroll Reveal"
      description="Elements fade and slide in as they enter the viewport, creating a sense of arrival."
      controls={
        <div className="flex items-center justify-between">
          <button
            onClick={() => setReplayKey(k => k + 1)}
            className="bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-1 dark:ring-neutral-700/80 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Reset Demo
          </button>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="relative h-[400px] overflow-hidden border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
          <div 
            key={replayKey}
            className="absolute inset-0 overflow-y-auto p-8 scroll-smooth"
            ref={containerRef}
          >
            <div className="mx-auto max-w-md space-y-24 pb-24">
              {/* Hero Section */}
              <div className="space-y-4 text-center">
                <div className="mx-auto h-12 w-12 rounded-[12px] bg-neutral-200 dark:bg-neutral-800" />
                <div className="mx-auto h-6 w-32 rounded-[8px] bg-neutral-200 dark:bg-neutral-800" />
                <div className="mx-auto h-4 w-48 rounded-[6px] bg-neutral-100 dark:bg-neutral-900" />
                <p className="pt-8 text-sm text-neutral-400">↓ Scroll down</p>
              </div>

              {/* Reveal Section */}
              <div className="space-y-8">
                <h3 className="text-center text-lg font-bold text-neutral-900 dark:text-white">
                  Why Choose Us
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ root: containerRef, margin: "-10% 0px -10% 0px", once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.1,
                        ease: [0.21, 0.47, 0.32, 0.98] 
                      }}
                      className="flex flex-col items-center gap-3 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800"
                    >
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md", feature.color)}>
                        <feature.icon className="size-5" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">{feature.title}</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer Section */}
              <div className="space-y-4 text-center opacity-50">
                <div className="mx-auto h-4 w-24 rounded-[6px] bg-neutral-200 dark:bg-neutral-800" />
                <div className="mx-auto h-3 w-40 rounded-[6px] bg-neutral-100 dark:bg-neutral-900" />
              </div>
            </div>
          </div>
          
          {/* Scroll fade overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-950" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-950" />
        </div>

        {/* Visual Explanation */}
        <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">i</span>
            Staggered Entry
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            Notice how the cards don't appear all at once. The <code className="rounded-[6px] bg-neutral-200 px-1 py-0.5 font-mono dark:bg-neutral-800">delay: i * 0.1</code> creates a "waterfall" effect that makes the content feel lighter and more elegant.
          </p>
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
