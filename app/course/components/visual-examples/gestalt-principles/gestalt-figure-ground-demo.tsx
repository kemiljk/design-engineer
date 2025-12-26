"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup, SliderControl } from "../base/example-wrapper";

export function GestaltFigureGroundDemo() {
  const [showModal, setShowModal] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(60);

  return (
    <ExampleWrapper
      title="Gestalt: Figure-Ground"
      description="We perceive elements as either foreground (figure) or background (ground)"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Demo">
            <ControlButton
              active={showModal}
              onClick={() => setShowModal(!showModal)}
            >
              {showModal ? "Hide Modal" : "Show Modal"}
            </ControlButton>
          </ControlGroup>
          <SliderControl
            label="Overlay"
            value={overlayOpacity}
            min={0}
            max={100}
            onChange={setOverlayOpacity}
            unit="%"
          />
        </div>
      }
    >
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        {/* Background "page" content */}
        <div className="absolute inset-0 bg-white p-4 dark:bg-neutral-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-6 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
          <div className="mb-3 h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mb-2 h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mb-2 h-4 w-5/6 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mb-4 h-4 w-2/3 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-16 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-16 rounded bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>

        {/* Overlay */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Modal (Figure) */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white">
                Modal Title
              </h3>
              <p className="mb-4 text-sm text-neutral-500">
                This modal is the figure—your focus shifts here automatically.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded bg-neutral-900 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
              >
                Close Modal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Insight */}
      <div className="mt-4 space-y-2 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {showModal
            ? overlayOpacity >= 40
              ? "The dimmed background becomes the 'ground' while the modal becomes the 'figure'"
              : "With low overlay opacity, the separation between figure and ground is unclear"
            : "Click 'Show Modal' to see figure-ground separation in action"}
        </p>
        {showModal && (
          <p className="text-xs text-neutral-500">
            Overlay at {overlayOpacity}%: {
              overlayOpacity >= 60 ? "Strong separation" :
              overlayOpacity >= 30 ? "Moderate separation" :
              "Weak separation—modal doesn't stand out enough"
            }
          </p>
        )}
      </div>
    </ExampleWrapper>
  );
}
