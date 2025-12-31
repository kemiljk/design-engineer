"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Xmark } from "iconoir-react";
import { ExampleWrapper, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const items: Item[] = [
  {
    id: "1",
    title: "Mountain Lake",
    subtitle: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80",
  },
  {
    id: "2",
    title: "Cherry Blossoms",
    subtitle: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&auto=format&q=80",
  },
  {
    id: "3",
    title: "Northern Lights",
    subtitle: "Iceland",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop&auto=format&q=80",
  },
  {
    id: "4",
    title: "Tropical Beach",
    subtitle: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop&auto=format&q=80",
  },
];

export function SharedElementDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedId);

  const cssCode = `/* 
  True shared element transitions are difficult 
  with pure CSS. The View Transitions API 
  simplifies this but has limited support.
*/

::view-transition-group(card) {
  animation-duration: 0.5s;
}`;

  const motionCode = `import { motion, AnimatePresence, MotionConfig } from "motion/react";

function Gallery() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
      <div className="grid grid-cols-2 gap-3">
        {items.map(item => (
          <motion.div
            layoutId={\`card-\${item.id}\`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer"
          >
            <motion.img layoutId={\`image-\${item.id}\`} src={item.image} />
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
              className="overlay"
              onClick={() => setSelectedId(null)}
            />
            <motion.div layoutId={\`card-\${selectedId}\`} className="modal">
              <motion.img layoutId={\`image-\${selectedId}\`} />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
              >
                <Xmark />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
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
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
          <div className="relative h-[480px] overflow-hidden rounded-[16px] bg-neutral-900 p-6">
            {/* ViewGrid */}
            <div className="grid h-full grid-cols-2 gap-3">
              {items.map((item) => (
                <motion.div
                  layoutId={`card-${item.id}`}
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="relative cursor-pointer overflow-hidden rounded-[12px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    layoutId={`image-container-${item.id}`}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
              {selectedId && selectedItem && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedId(null)}
                    className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6">
                    <motion.div
                      layoutId={`card-${selectedId}`}
                      className="pointer-events-auto relative w-full max-w-[280px] overflow-hidden rounded-[16px] bg-neutral-800"
                    >
                      <motion.div
                        layoutId={`image-container-${selectedId}`}
                        className="relative aspect-[4/3] w-full"
                      >
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setSelectedId(null)}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                      >
                        <Xmark className="size-4" />
                      </motion.button>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {selectedItem.title}
                        </h3>
                        <p className="text-sm text-neutral-400">
                          {selectedItem.subtitle}
                        </p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.15 }}
                          className="mt-3 text-sm leading-relaxed text-neutral-300"
                        >
                          Discover the breathtaking beauty of this destination
                          and create unforgettable memories.
                        </motion.p>

                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4 w-full rounded-[10px] bg-white py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                        >
                          Explore
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        </MotionConfig>

        {/* Visual Explanation */}
        <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              i
            </span>
            How it works
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            By assigning the same{" "}
            <code className="rounded-[4px] bg-neutral-200 px-1 py-0.5 font-mono dark:bg-neutral-800">
              layoutId
            </code>{" "}
            to components in different parts of the tree, Motion automatically
            calculates the transform needed to morph one into the other. The{" "}
            <code className="rounded-[4px] bg-neutral-200 px-1 py-0.5 font-mono dark:bg-neutral-800">
              MotionConfig
            </code>{" "}
            wrapper applies consistent spring physics to all children.
          </p>
        </div>

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
