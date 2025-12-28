"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface Card {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
}

const cards: Card[] = [
  { id: 1, title: "Mountain Retreat", category: "Nature", image: "🏔️", color: "from-blue-400 to-cyan-500" },
  { id: 2, title: "Urban Loft", category: "City", image: "🏙️", color: "from-violet-400 to-purple-500" },
  { id: 3, title: "Beach House", category: "Coastal", image: "🏖️", color: "from-amber-400 to-orange-500" },
  { id: 4, title: "Forest Cabin", category: "Woods", image: "🌲", color: "from-emerald-400 to-green-500" },
];

export function SharedElementDemo() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCode, setShowCode] = useState(false);

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function Gallery() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {/* Card Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            layoutId={\`card-\${card.id}\`}
            onClick={() => setSelectedCard(card)}
            className="cursor-pointer rounded-xl overflow-hidden"
          >
            <motion.div 
              layoutId={\`image-\${card.id}\`}
              className="h-32 bg-gradient-to-br"
            />
            <motion.h3 layoutId={\`title-\${card.id}\`}>
              {card.title}
            </motion.h3>
          </motion.div>
        ))}
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              layoutId={\`card-\${selectedCard.id}\`}
              className="fixed inset-4 z-50 rounded-2xl bg-white"
            >
              <motion.div 
                layoutId={\`image-\${selectedCard.id}\`}
                className="h-64 bg-gradient-to-br"
              />
              <motion.h3 layoutId={\`title-\${selectedCard.id}\`}>
                {selectedCard.title}
              </motion.h3>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}`;

  const cssCode = `/* View Transitions API (native CSS) */
.card-image {
  view-transition-name: hero-image;
}

.card-title {
  view-transition-name: hero-title;
}

::view-transition-old(hero-image),
::view-transition-new(hero-image) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Trigger with JavaScript */
document.startViewTransition(() => {
  // Update the DOM
  showDetailView(card);
});`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
    { label: "View Transitions", language: "css", code: cssCode },
  ];

  return (
    <ExampleWrapper
      title="Shared Element Transitions"
      description="Click a card to see it expand with smooth morphing between states."
      controls={
        <div className="flex items-center justify-end">
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
        {/* Card grid */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                onClick={() => setSelectedCard(card)}
                className="cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <motion.div
                  layoutId={`image-${card.id}`}
                  className={cn(
                    "flex h-28 items-center justify-center bg-gradient-to-br text-4xl",
                    card.color
                  )}
                >
                  {card.image}
                </motion.div>
                <div className="p-3">
                  <motion.p
                    layoutId={`category-${card.id}`}
                    className="text-xs font-medium text-neutral-500"
                  >
                    {card.category}
                  </motion.p>
                  <motion.h3
                    layoutId={`title-${card.id}`}
                    className="mt-1 text-sm font-bold text-neutral-900 dark:text-white"
                  >
                    {card.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expanded card overlay */}
          <AnimatePresence>
            {selectedCard && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCard(null)}
                  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                  layoutId={`card-${selectedCard.id}`}
                  className="fixed inset-4 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 sm:inset-8 md:inset-16 lg:inset-24"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                  >
                    <X className="size-5" />
                  </button>

                  {/* Hero image */}
                  <motion.div
                    layoutId={`image-${selectedCard.id}`}
                    className={cn(
                      "flex h-48 items-center justify-center bg-gradient-to-br text-7xl sm:h-64",
                      selectedCard.color
                    )}
                  >
                    {selectedCard.image}
                  </motion.div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.p
                      layoutId={`category-${selectedCard.id}`}
                      className="text-sm font-medium text-swiss-red"
                    >
                      {selectedCard.category}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${selectedCard.id}`}
                      className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white"
                    >
                      {selectedCard.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 text-neutral-600 dark:text-neutral-400"
                    >
                      Experience the perfect getaway in this stunning location. 
                      Book your stay today and create memories that last a lifetime.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 flex gap-3"
                    >
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-swiss-red py-3 font-semibold text-white transition-colors hover:bg-swiss-red/90">
                        Book Now
                      </button>
                      <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800">
                        <Heart className="size-5" />
                      </button>
                      <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800">
                        <Share2 className="size-5" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Explanation */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>How it works:</strong> The <code className="rounded bg-amber-200/50 px-1 font-mono text-xs dark:bg-amber-900/50">layoutId</code> prop 
            tells Motion that these elements are the "same" across states. It automatically 
            calculates and animates the size, position, and style differences—creating the 
            illusion of a single element morphing between views.
          </p>
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

