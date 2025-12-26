"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type SimilarityType = "color" | "shape" | "size" | "none";

export function GestaltSimilarityDemo() {
  const [similarityType, setSimilarityType] = useState<SimilarityType>("color");

  const getItemStyle = (row: number, col: number) => {
    const isGroupA = col < 3;
    
    switch (similarityType) {
      case "color":
        return {
          shape: "rounded-full",
          size: "h-8 w-8",
          color: isGroupA 
            ? "bg-neutral-800 dark:bg-neutral-200" 
            : "bg-neutral-400 dark:bg-neutral-500",
        };
      case "shape":
        return {
          shape: isGroupA ? "rounded-full" : "rounded-none",
          size: "h-8 w-8",
          color: "bg-neutral-600 dark:bg-neutral-400",
        };
      case "size":
        return {
          shape: "rounded-full",
          size: isGroupA ? "h-10 w-10" : "h-5 w-5",
          color: "bg-neutral-600 dark:bg-neutral-400",
        };
      case "none":
        return {
          shape: "rounded-full",
          size: "h-8 w-8",
          color: "bg-neutral-500 dark:bg-neutral-500",
        };
    }
  };

  return (
    <ExampleWrapper
      title="Gestalt: Similarity"
      description="Elements that look similar are perceived as related"
      controls={
        <ControlGroup label="Similarity By">
          <ControlButton
            active={similarityType === "color"}
            onClick={() => setSimilarityType("color")}
          >
            Colour
          </ControlButton>
          <ControlButton
            active={similarityType === "shape"}
            onClick={() => setSimilarityType("shape")}
          >
            Shape
          </ControlButton>
          <ControlButton
            active={similarityType === "size"}
            onClick={() => setSimilarityType("size")}
          >
            Size
          </ControlButton>
          <ControlButton
            active={similarityType === "none"}
            onClick={() => setSimilarityType("none")}
          >
            None
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center gap-8">
        {/* Grid of elements */}
        <div className="grid grid-cols-6 gap-3">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => {
              const style = getItemStyle(row, col);
              return (
                <motion.div
                  key={`${row}-${col}`}
                  className={`flex items-center justify-center ${style.shape} ${style.size} ${style.color}`}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              );
            })
          )}
        </div>

        {/* Insight */}
        <div className="text-center">
          {similarityType === "color" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              The grid visually splits into two groups based on <strong>colour</strong> alone
            </p>
          )}
          {similarityType === "shape" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Circles vs squares create distinct groups through <strong>shape</strong>
            </p>
          )}
          {similarityType === "size" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Large vs small elements create groupings through <strong>size</strong>
            </p>
          )}
          {similarityType === "none" && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              With uniform styling, the grid appears as one undifferentiated group
            </p>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}
