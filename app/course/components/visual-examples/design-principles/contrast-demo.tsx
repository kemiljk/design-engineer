"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup, SliderControl } from "../base/example-wrapper";

type ContrastType = "size" | "weight" | "colour";

export function ContrastDemo() {
  const [contrastType, setContrastType] = useState<ContrastType>("size");
  const [contrastLevel, setContrastLevel] = useState(100);

  const getContrastStyles = () => {
    const factor = contrastLevel / 100;
    
    switch (contrastType) {
      case "size":
        const baseSize = 16;
        const largeSize = baseSize + (24 * factor);
        return {
          primary: { fontSize: `${largeSize}px`, fontWeight: 600 },
          secondary: { fontSize: `${baseSize}px`, fontWeight: 400 },
          tertiary: { fontSize: `${baseSize - 2}px`, fontWeight: 400 },
        };
      case "weight":
        const baseWeight = 400;
        const boldWeight = Math.round(baseWeight + (500 * factor));
        return {
          primary: { fontSize: "18px", fontWeight: boldWeight },
          secondary: { fontSize: "16px", fontWeight: baseWeight },
          tertiary: { fontSize: "14px", fontWeight: baseWeight },
        };
      case "colour":
        const primaryOpacity = 0.5 + (0.5 * factor);
        const secondaryOpacity = 0.3 + (0.3 * factor);
        const tertiaryOpacity = 0.2 + (0.2 * factor);
        return {
          primary: { fontSize: "18px", fontWeight: 600, opacity: primaryOpacity },
          secondary: { fontSize: "16px", fontWeight: 400, opacity: secondaryOpacity },
          tertiary: { fontSize: "14px", fontWeight: 400, opacity: tertiaryOpacity },
        };
    }
  };

  const styles = getContrastStyles();

  return (
    <ExampleWrapper
      title="Contrast Creates Differentiation"
      description="Adjust contrast type and level to see how elements stand apart"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Type">
            <ControlButton
              active={contrastType === "size"}
              onClick={() => setContrastType("size")}
            >
              Size
            </ControlButton>
            <ControlButton
              active={contrastType === "weight"}
              onClick={() => setContrastType("weight")}
            >
              Weight
            </ControlButton>
            <ControlButton
            active={contrastType === "colour"}
            onClick={() => setContrastType("colour")}
            >
              Colour
            </ControlButton>
          </ControlGroup>
          <SliderControl
            label="Contrast"
            value={contrastLevel}
            min={0}
            max={100}
            onChange={setContrastLevel}
            unit="%"
          />
        </div>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Example Card */}
        <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <motion.div
            layout
            style={styles.primary}
            className="text-neutral-900 dark:text-white"
          >
            Primary Heading
          </motion.div>
          <motion.div
            layout
            style={styles.secondary}
            className="text-neutral-700 dark:text-neutral-300"
          >
            Secondary supporting text that provides context for the heading above.
          </motion.div>
          <motion.div
            layout
            style={styles.tertiary}
            className="text-neutral-500 dark:text-neutral-400"
          >
            Tertiary details: 12 Dec 2024 • 5 min
          </motion.div>
        </div>

        {/* Visual Indicator */}
        <div className="flex items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="flex items-end justify-center gap-2">
              <motion.div
                className="w-8 rounded bg-neutral-900 dark:bg-white"
                animate={{ height: 20 + 60 * (contrastLevel / 100) }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-8 rounded bg-neutral-400 dark:bg-neutral-500"
                animate={{ height: 30 + 10 * (1 - contrastLevel / 100) }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-8 rounded bg-neutral-300 dark:bg-neutral-600"
                animate={{ height: 20 + 5 * (1 - contrastLevel / 100) }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-xs text-neutral-500">
              {contrastLevel < 30 && "Low contrast: Elements blend together"}
              {contrastLevel >= 30 && contrastLevel < 70 && "Medium contrast: Some differentiation"}
              {contrastLevel >= 70 && "High contrast: Clear distinction"}
            </p>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
