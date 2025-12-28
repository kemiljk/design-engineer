"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Location = {
  id: string;
  name: string;
  location: string;
  image: string;
  desc: string;
};

const locations: Location[] = [
  { 
    id: "kyoto", 
    name: "Kyoto", 
    location: "Japan", 
    image: "bg-gradient-to-br from-indigo-500 to-purple-600",
    desc: "Experience the timeless beauty of ancient temples and bamboo forests."
  },
  { 
    id: "iceland", 
    name: "Iceland", 
    location: "Nordic", 
    image: "bg-gradient-to-br from-cyan-500 to-blue-600",
    desc: "Discover dramatic landscapes, waterfalls, and the northern lights."
  },
];

export function SharedElementDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `/* 
  True shared element transitions are difficult 
  with pure CSS. The View Transitions API 
  simplifies this but has limited support.
*/

::view-transition-group(card) {
  animation-duration: 0.5s;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function Gallery() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(item => (
        <motion.div
          layoutId={item.id} // The magic ID
          onClick={() => setSelectedId(item.id)}
          className="card"
        >
          <motion.img layoutId={\`img-\${item.id}\`} src={item.src} />
          <motion.h2 layoutId={\`title-\${item.id}\`}>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            layoutId={selectedId} 
            className="fullscreen-card"
          >
            <motion.img layoutId={\`img-\${selectedId}\`} />
            <motion.h2 layoutId={\`title-\${selectedId}\`} />
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedId(null)}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Shared Element Transitions"
      description="Elements seamlessly morph from one state to another, preserving their identity."
      controls={
        <div className="flex justify-end">
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="relative h-[400px] rounded-[12px] bg-neutral-100 p-8 dark:bg-neutral-900">
          <div className="grid grid-cols-2 gap-4">
            {locations.map((location) => (
              <motion.div
                layoutId={`card-${location.id}`}
                key={location.id}
                onClick={() => setSelectedId(location.id)}
                className="group relative cursor-pointer overflow-hidden rounded-[16px] bg-white shadow-sm transition-all hover:shadow-lg dark:bg-neutral-800"
                style={{ borderRadius: 16 }} // Explicitly setting border radius
              >
                <motion.div
                  layoutId={`image-${location.id}`}
                  className={cn("aspect-[4/3] w-full", location.image)}
                />
                <div className="p-4">
                  <motion.h3 
                    layoutId={`title-${location.id}`}
                    className="text-lg font-bold text-neutral-900 dark:text-white"
                  >
                    {location.name}
                  </motion.h3>
                  <motion.p 
                    layoutId={`location-${location.id}`}
                    className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    <MapPin className="size-3" />
                    {location.location}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedId && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedId(null)}
                  className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none">
                  {locations.filter(l => l.id === selectedId).map(location => (
                    <motion.div
                      layoutId={`card-${location.id}`}
                      key={location.id}
                      className="pointer-events-auto relative w-full max-w-sm overflow-hidden bg-white shadow-2xl dark:bg-neutral-800"
                      style={{ borderRadius: 24 }} // Explicit border radius for expanded state
                    >
                      <motion.div
                        layoutId={`image-${location.id}`}
                        className={cn("h-48 w-full", location.image)}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(null);
                          }}
                          className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                        >
                          <X className="size-5" />
                        </button>
                      </motion.div>

                      <div className="p-6">
                        <div className="mb-4">
                          <motion.h3 
                            layoutId={`title-${location.id}`}
                            className="text-2xl font-bold text-neutral-900 dark:text-white"
                          >
                            {location.name}
                          </motion.h3>
                          <motion.p 
                            layoutId={`location-${location.id}`}
                            className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400"
                          >
                            <MapPin className="size-4" />
                            {location.location}
                          </motion.p>
                        </div>

                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
                        >
                          {location.desc}
                        </motion.p>

                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                        >
                          Book Flight
                          <ArrowRight className="size-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Visual Explanation */}
        <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">i</span>
            How it works
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            By assigning the same <code className="rounded-[4px] bg-neutral-200 px-1 py-0.5 font-mono dark:bg-neutral-800">layoutId</code> to components in different parts of the tree, Motion automatically calculates the transform needed to morph one into the other. It's akin to "Magic Move" in Keynote.
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
