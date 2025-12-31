"use client";

import React, { useState } from "react";
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
        {/* ViewGrid of elements - fixed cell size to prevent layout shift */}
        <div className="grid grid-cols-6 gap-3">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => {
              const style = getItemStyle(row, col);
              return (
                <div
                  key={`${row}-${col}`}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <div
                    className={`${style.shape} ${style.size} ${style.color} transition-all duration-200`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Insight - fixed height to prevent layout shift */}
        <div className="min-h-[2.5rem] text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {similarityType === "color" && (
              <>The grid visually splits into two groups based on <strong>colour</strong> alone</>
            )}
            {similarityType === "shape" && (
              <>Circles vs squares create distinct groups through <strong>shape</strong></>
            )}
            {similarityType === "size" && (
              <>Large vs small elements create groupings through <strong>size</strong></>
            )}
            {similarityType === "none" && (
              <>With uniform styling, the grid appears as one undifferentiated group</>
            )}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
