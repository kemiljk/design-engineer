"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type RegionType = "none" | "background" | "border" | "both";

export function GestaltCommonRegionDemo() {
  const [regionType, setRegionType] = useState<RegionType>("background");

  // Always include p-4 and rounded-lg to prevent layout shift
  // Use ring (box-shadow) instead of border to avoid affecting box model
  const getGroupStyle = () => {
    const base = "p-4 rounded-lg transition-all duration-200";
    switch (regionType) {
      case "none":
        return base; // Keep padding but no visual boundary
      case "background":
        return `${base} bg-neutral-100 dark:bg-neutral-800`;
      case "border":
        return `${base} ring-2 ring-neutral-300 dark:ring-neutral-600`;
      case "both":
        return `${base} bg-neutral-100 dark:bg-neutral-800 ring-2 ring-neutral-300 dark:ring-neutral-600`;
    }
  };

  // Card styles that reflect each state
  // Use ring/shadow instead of border to avoid layout shift
  const getCardStyle = () => {
    const base = "flex max-w-[180px] flex-col gap-3 p-4 rounded-lg transition-all duration-200";
    switch (regionType) {
      case "none":
        return base; // Keep padding but no visual boundary
      case "background":
        return `${base} bg-white shadow-md dark:bg-neutral-800`;
      case "border":
        return `${base} ring-1 ring-neutral-200 dark:ring-neutral-700`;
      case "both":
        return `${base} ring-1 ring-neutral-200 bg-white shadow-md dark:ring-neutral-700 dark:bg-neutral-800`;
    }
  };

  const items = [
    { label: "Home", icon: "🏠" },
    { label: "Profile", icon: "👤" },
    { label: "Settings", icon: "⚙️" },
    { label: "Help", icon: "❓" },
    { label: "About", icon: "ℹ️" },
    { label: "Logout", icon: "🚪" },
  ];

  return (
    <ExampleWrapper
      title="Gestalt: Common Region"
      description="Elements within the same bounded area are perceived as a group"
      controls={
        <ControlGroup label="Boundary">
          <ControlButton
            active={regionType === "none"}
            onClick={() => setRegionType("none")}
          >
            None
          </ControlButton>
          <ControlButton
            active={regionType === "background"}
            onClick={() => setRegionType("background")}
          >
            Background
          </ControlButton>
          <ControlButton
            active={regionType === "border"}
            onClick={() => setRegionType("border")}
          >
            Border
          </ControlButton>
          <ControlButton
            active={regionType === "both"}
            onClick={() => setRegionType("both")}
          >
            Both
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-8">
        {/* Navigation example */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary navigation group */}
          <div className={`flex gap-2 ${getGroupStyle()}`}>
            {items.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="flex h-12 w-12 flex-col items-center justify-center rounded bg-white shadow-sm dark:bg-neutral-900"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[8px] text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Secondary navigation group */}
          <div className={`flex gap-2 ${getGroupStyle()}`}>
            {items.slice(3).map((item) => (
              <div
                key={item.label}
                className="flex h-12 w-12 flex-col items-center justify-center rounded bg-white shadow-sm dark:bg-neutral-900"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[8px] text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="min-h-[2.5rem] text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {regionType === "none" && "Without boundaries, all items appear equally related (or unrelated)"}
            {regionType === "background" && "Background colour creates distinct regions that group related items"}
            {regionType === "border" && "Borders explicitly define the boundary of each group"}
            {regionType === "both" && "Combined background and border create the strongest grouping"}
          </p>
        </div>

        {/* Card example */}
        <div className="space-y-3">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Card Component Example
          </p>
          <div className="flex justify-center gap-4">
            <div className={getCardStyle()}>
              <div className="h-20 w-full rounded bg-neutral-200 dark:bg-neutral-600" />
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Card Title</h4>
              <p className="text-xs text-neutral-500">Card description text</p>
              <button className="rounded bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
                Action
              </button>
            </div>
          </div>
          <p className="min-h-[2.5rem] text-center text-xs text-neutral-500">
            {regionType === "none" && "Without a card boundary, elements feel disconnected"}
            {regionType === "background" && "Background creates a subtle container for the content"}
            {regionType === "border" && "Border explicitly defines the card boundary"}
            {regionType === "both" && "Combined background and border create the strongest grouping"}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}
